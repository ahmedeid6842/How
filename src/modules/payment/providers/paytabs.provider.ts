import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentStatus } from '../enums';
import {
  IPaymentProvider,
  InitiateResult,
  CallbackResult,
} from './payment-provider.interface';

@Injectable()
export class PaytabsProvider implements IPaymentProvider {
  async initiatePayment(
    amount: number,
    currency: string,
    metadata: Record<string, any>,
  ): Promise<InitiateResult> {
    const providerTransactionId = randomUUID();

    return {
      providerTransactionId,
      redirectUrl: `https://secure.paytabs.sa/payment/page/${providerTransactionId}`,
    };
  }

  parseCallback(payload: any): CallbackResult {
    const providerTransactionId = payload.tran_ref;
    const status =
      payload.response_status === 'A'
        ? PaymentStatus.COMPLETED
        : PaymentStatus.FAILED;

    return { providerTransactionId, status };
  }
}
