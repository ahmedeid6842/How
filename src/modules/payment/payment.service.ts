import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/database/repositories';
import {
  BadRequestError,
  NotFoundError,
  PAYMENT_ERRORS,
} from 'src/common/exceptions';
import { QuestionService } from 'src/modules/question/question.service';
import { PaymentProviderFactory } from './providers/payment-provider.factory';
import { InitiatePaymentDto } from './dto/request/initiate-payment.dto';
import { PaymentProviderName, PaymentStatus } from './enums';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly questionService: QuestionService,
    private readonly providerFactory: PaymentProviderFactory,
  ) {}

  async initiatePayment(userId: string, dto: InitiatePaymentDto) {
    const [question] = await this.questionService.getQuestion({
      questionId: dto.questionId,
    });

    if (!question) {
      throw new NotFoundError(
        PAYMENT_ERRORS.PREFIX.BUSINESS,
        PAYMENT_ERRORS.NUMBER.QUESTION_NOT_FOUND,
        'payment.question_not_found',
      );
    }

    const provider = this.providerFactory.getProvider(dto.provider);

    const result = await provider.initiatePayment(
      dto.amount,
      dto.currency || 'USD',
      { questionId: dto.questionId, userId },
    );

    return this.paymentRepository.create({
      amount: dto.amount,
      currency: dto.currency || 'USD',
      provider: dto.provider,
      status: PaymentStatus.PENDING,
      providerTransactionId: result.providerTransactionId,
      redirectUrl: result.redirectUrl,
      buyer: { id: userId } as any,
      question: { id: dto.questionId } as any,
    });
  }

  async handleCallback(providerName: PaymentProviderName, payload: any) {
    const provider = this.providerFactory.getProvider(providerName);
    const result = provider.parseCallback(payload);

    const payment = await this.paymentRepository.findByProviderTransactionId(
      result.providerTransactionId,
    );

    if (!payment) {
      throw new NotFoundError(
        PAYMENT_ERRORS.PREFIX.BUSINESS,
        PAYMENT_ERRORS.NUMBER.PAYMENT_NOT_FOUND,
        'payment.payment_not_found',
      );
    }

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new BadRequestError(
        PAYMENT_ERRORS.PREFIX.BUSINESS,
        PAYMENT_ERRORS.NUMBER.PAYMENT_ALREADY_COMPLETED,
        'payment.payment_already_completed',
      );
    }

    payment.status = result.status;
    return this.paymentRepository.save(payment);
  }
}
