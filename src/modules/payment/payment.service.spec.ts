import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PaymentRepository } from 'src/database/repositories';
import { QuestionService } from 'src/modules/question/question.service';
import { PaymentProviderFactory } from './providers/payment-provider.factory';
import { PaymentProviderName, PaymentMethod, PaymentStatus } from './enums';
import { NotFoundError, BadRequestError } from 'src/common/exceptions';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: jest.Mocked<Partial<PaymentRepository>>;
  let questionService: jest.Mocked<Partial<QuestionService>>;
  let providerFactory: jest.Mocked<Partial<PaymentProviderFactory>>;

  const mockExecutor = { execute: jest.fn() };
  const mockProvider = { parseCallback: jest.fn() };

  beforeEach(async () => {
    paymentRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findByProviderTransactionId: jest.fn(),
    };

    questionService = {
      getQuestion: jest.fn(),
    };

    providerFactory = {
      getExecutor: jest.fn().mockReturnValue(mockExecutor),
      getProvider: jest.fn().mockReturnValue(mockProvider),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PaymentRepository, useValue: paymentRepository },
        { provide: QuestionService, useValue: questionService },
        { provide: PaymentProviderFactory, useValue: providerFactory },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('initiatePayment', () => {
    const userId = 'user-123';
    const dto = {
      questionId: 'question-456',
      amount: 100,
      currency: 'USD',
      provider: PaymentProviderName.PAYTABS,
      method: PaymentMethod.REDIRECT,
    };

    it('should create a payment when question exists', async () => {
      const question = { id: dto.questionId, title: 'Test Question' };
      questionService.getQuestion.mockResolvedValue([question] as any);

      mockExecutor.execute.mockResolvedValue({
        providerTransactionId: 'txn-789',
        redirectUrl: 'https://pay.example.com/checkout',
      });

      const savedPayment = { id: 'payment-1', ...dto, status: PaymentStatus.PENDING };
      paymentRepository.create.mockReturnValue(savedPayment as any);

      const result = await service.initiatePayment(userId, dto);

      expect(questionService.getQuestion).toHaveBeenCalledWith({ questionId: dto.questionId });
      expect(providerFactory.getExecutor).toHaveBeenCalledWith(dto.provider, dto.method);
      expect(mockExecutor.execute).toHaveBeenCalledWith({
        amount: dto.amount,
        currency: 'USD',
        metadata: { questionId: dto.questionId, userId },
      });
      expect(paymentRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: dto.amount,
          currency: 'USD',
          provider: dto.provider,
          method: dto.method,
          status: PaymentStatus.PENDING,
          providerTransactionId: 'txn-789',
          redirectUrl: 'https://pay.example.com/checkout',
        }),
      );
      expect(result).toEqual(savedPayment);
    });

    it('should throw NotFoundError when question does not exist', async () => {
      questionService.getQuestion.mockResolvedValue([undefined] as any);

      await expect(service.initiatePayment(userId, dto)).rejects.toThrow(NotFoundError);
      expect(providerFactory.getExecutor).not.toHaveBeenCalled();
    });

    it('should default currency to USD when not provided', async () => {
      const dtoWithoutCurrency = { ...dto, currency: undefined };
      questionService.getQuestion.mockResolvedValue([{ id: dto.questionId }] as any);
      mockExecutor.execute.mockResolvedValue({ providerTransactionId: 'txn-1', redirectUrl: '' });
      paymentRepository.create.mockReturnValue({} as any);

      await service.initiatePayment(userId, dtoWithoutCurrency);

      expect(mockExecutor.execute).toHaveBeenCalledWith(
        expect.objectContaining({ currency: 'USD' }),
      );
    });
  });

  describe('handleCallback', () => {
    it('should update payment status on valid callback', async () => {
      const payment = { id: 'p-1', status: PaymentStatus.PENDING };
      mockProvider.parseCallback.mockReturnValue({
        providerTransactionId: 'txn-100',
        status: PaymentStatus.COMPLETED,
      });
      paymentRepository.findByProviderTransactionId.mockResolvedValue(payment as any);
      paymentRepository.save.mockResolvedValue({ ...payment, status: PaymentStatus.COMPLETED } as any);

      const result = await service.handleCallback(PaymentProviderName.PAYTABS, { raw: 'data' });

      expect(providerFactory.getProvider).toHaveBeenCalledWith(PaymentProviderName.PAYTABS);
      expect(paymentRepository.findByProviderTransactionId).toHaveBeenCalledWith('txn-100');
      expect(paymentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: PaymentStatus.COMPLETED }),
      );
      expect(result.status).toBe(PaymentStatus.COMPLETED);
    });

    it('should throw NotFoundError when payment is not found', async () => {
      mockProvider.parseCallback.mockReturnValue({
        providerTransactionId: 'txn-unknown',
        status: PaymentStatus.COMPLETED,
      });
      paymentRepository.findByProviderTransactionId.mockResolvedValue(null);

      await expect(
        service.handleCallback(PaymentProviderName.STRIPE, {}),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw BadRequestError when payment is already completed', async () => {
      const payment = { id: 'p-2', status: PaymentStatus.COMPLETED };
      mockProvider.parseCallback.mockReturnValue({
        providerTransactionId: 'txn-200',
        status: PaymentStatus.COMPLETED,
      });
      paymentRepository.findByProviderTransactionId.mockResolvedValue(payment as any);

      await expect(
        service.handleCallback(PaymentProviderName.PAYTABS, {}),
      ).rejects.toThrow(BadRequestError);
      expect(paymentRepository.save).not.toHaveBeenCalled();
    });
  });
});
