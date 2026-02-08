import { Injectable } from '@nestjs/common';
import { StripeProvider } from '../providers/stripe.provider';
import {
  IPaymentExecutor,
  ExecutionContext,
  ExecutionResult,
} from './payment-executor.interface';

@Injectable()
export class StripeRedirectExecutor implements IPaymentExecutor {
  constructor(private readonly stripeProvider: StripeProvider) {}

  async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const result = await this.stripeProvider.createCheckoutSession(
      context.amount,
      context.currency,
      context.metadata,
    );

    return {
      providerTransactionId: result.providerTransactionId,
      redirectUrl: result.redirectUrl,
    };
  }
}
