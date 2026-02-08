import { PaymentStatus } from '../enums';

export interface RedirectResult {
  providerTransactionId: string;
  redirectUrl: string;
}

export interface SdkCredentials {
  providerTransactionId: string;
  profileId: string;
  serverKey: string;
  clientKey: string;
}

export interface CallbackResult {
  providerTransactionId: string;
  status: PaymentStatus;
}

export interface IPaymentProvider {
  parseCallback(payload: any): CallbackResult;
}
