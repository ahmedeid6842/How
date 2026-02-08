import { Injectable } from '@nestjs/common';
import { BadRequestError, PAYMENT_ERRORS } from 'src/common/exceptions';
import { PaymentProviderName } from '../enums';
import { IPaymentProvider } from './payment-provider.interface';
import { PaytabsProvider } from './paytabs.provider';
import { StripeProvider } from './stripe.provider';

@Injectable()
export class PaymentProviderFactory {
  constructor(
    private readonly paytabsProvider: PaytabsProvider,
    private readonly stripeProvider: StripeProvider,
  ) {}

  getProvider(name: PaymentProviderName): IPaymentProvider {
    const providers: Record<PaymentProviderName, IPaymentProvider> = {
      [PaymentProviderName.PAYTABS]: this.paytabsProvider,
      [PaymentProviderName.STRIPE]: this.stripeProvider,
    };

    const provider = providers[name];

    if (!provider) {
      throw new BadRequestError(
        PAYMENT_ERRORS.PREFIX.BUSINESS,
        PAYMENT_ERRORS.NUMBER.UNSUPPORTED_PROVIDER,
        'payment.unsupported_provider',
      );
    }

    return provider;
  }
}
