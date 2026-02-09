import { Expose } from 'class-transformer';

export class PaymentDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  currency: string;

  @Expose()
  provider: string;

  @Expose()
  method: string;

  @Expose()
  status: string;

  @Expose()
  providerTransactionId: string;

  @Expose()
  redirectUrl: string;

  @Expose()
  createdAt: Date;
}
