import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentStatus } from '../enums';
import {
  IPaymentProvider,
  RedirectResult,
  CallbackResult,
} from './payment-provider.interface';

@Injectable()
export class StripeProvider implements IPaymentProvider {
  async createCheckoutSession(
    amount: number,
    currency: string,
    metadata: Record<string, any>,
  ): Promise<RedirectResult> {
    const providerTransactionId = randomUUID();

    return {
      providerTransactionId,
      redirectUrl: `https://checkout.stripe.com/pay/${providerTransactionId}`,
    };
  }

  parseCallback(payload: any): CallbackResult {
    const providerTransactionId = payload?.data?.object?.id;
    const status =
      payload.type === 'checkout.session.completed'
        ? PaymentStatus.COMPLETED
        : PaymentStatus.FAILED;

    return { providerTransactionId, status };
  }
}
