import { Injectable } from '@nestjs/common';
import { PaytabsProvider } from '../providers/paytabs.provider';
import {
  IPaymentExecutor,
  ExecutionContext,
  ExecutionResult,
} from './payment-executor.interface';

@Injectable()
export class PaytabsSdkExecutor implements IPaymentExecutor {
  constructor(private readonly paytabsProvider: PaytabsProvider) {}

  async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const credentials = await this.paytabsProvider.getCredentials(
      context.amount,
      context.currency,
      context.metadata,
    );

    return {
      providerTransactionId: credentials.providerTransactionId,
      sdkCredentials: {
        profileId: credentials.profileId,
        serverKey: credentials.serverKey,
        clientKey: credentials.clientKey,
      },
    };
  }
}
