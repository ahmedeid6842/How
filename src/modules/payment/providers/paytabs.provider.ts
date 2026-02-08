import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentStatus } from '../enums';
import {
  IPaymentProvider,
  RedirectResult,
  SdkCredentials,
  CallbackResult,
} from './payment-provider.interface';

@Injectable()
export class PaytabsProvider implements IPaymentProvider {
  async createPaymentPage(
    amount: number,
    currency: string,
    metadata: Record<string, any>,
  ): Promise<RedirectResult> {
    const providerTransactionId = randomUUID();

    return {
      providerTransactionId,
      redirectUrl: `https://secure.paytabs.sa/payment/page/${providerTransactionId}`,
    };
  }

  async getCredentials(
    amount: number,
    currency: string,
    metadata: Record<string, any>,
  ): Promise<SdkCredentials> {
    const providerTransactionId = randomUUID();

    return {
      providerTransactionId,
      profileId: `profile_${randomUUID().slice(0, 8)}`,
      serverKey: `srv_key_${randomUUID().slice(0, 8)}`,
      clientKey: `cli_key_${randomUUID().slice(0, 8)}`,
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
