import { PaymentStatus } from '../enums';

export interface InitiateResult {
  providerTransactionId: string;
  redirectUrl: string;
}

export interface CallbackResult {
  providerTransactionId: string;
  status: PaymentStatus;
}

export interface IPaymentProvider {
  initiatePayment(
    amount: number,
    currency: string,
    metadata: Record<string, any>,
  ): Promise<InitiateResult>;

  parseCallback(payload: any): CallbackResult;
}
