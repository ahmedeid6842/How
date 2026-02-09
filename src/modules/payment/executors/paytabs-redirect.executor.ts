import { Injectable } from '@nestjs/common';
import { PaytabsProvider } from '../providers/paytabs.provider';
import {
  IPaymentExecutor,
  ExecutionContext,
  ExecutionResult,
} from './payment-executor.interface';

@Injectable()
export class PaytabsRedirectExecutor implements IPaymentExecutor {
  constructor(private readonly paytabsProvider: PaytabsProvider) {}

  async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const result = await this.paytabsProvider.createPaymentPage(
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
