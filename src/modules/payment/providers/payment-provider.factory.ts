import { Injectable } from '@nestjs/common';
import { BadRequestError, PAYMENT_ERRORS } from 'src/common/exceptions';
import { PaymentMethod, PaymentProviderName } from '../enums';
import { IPaymentProvider } from './payment-provider.interface';
import { IPaymentExecutor } from '../executors/payment-executor.interface';
import { PaytabsProvider } from './paytabs.provider';
import { StripeProvider } from './stripe.provider';
import { PaytabsRedirectExecutor } from '../executors/paytabs-redirect.executor';
import { PaytabsSdkExecutor } from '../executors/paytabs-sdk.executor';
import { StripeRedirectExecutor } from '../executors/stripe-redirect.executor';

@Injectable()
export class PaymentProviderFactory {
  constructor(
    private readonly paytabsProvider: PaytabsProvider,
    private readonly stripeProvider: StripeProvider,
    private readonly paytabsRedirectExecutor: PaytabsRedirectExecutor,
    private readonly paytabsSdkExecutor: PaytabsSdkExecutor,
    private readonly stripeRedirectExecutor: StripeRedirectExecutor,
  ) {}

  getExecutor(
    provider: PaymentProviderName,
    method: PaymentMethod,
  ): IPaymentExecutor {
    const key = `${provider}:${method}`;

    const executors: Record<string, IPaymentExecutor> = {
      [`${PaymentProviderName.PAYTABS}:${PaymentMethod.REDIRECT}`]:
        this.paytabsRedirectExecutor,
      [`${PaymentProviderName.PAYTABS}:${PaymentMethod.SDK}`]:
        this.paytabsSdkExecutor,
      [`${PaymentProviderName.STRIPE}:${PaymentMethod.REDIRECT}`]:
        this.stripeRedirectExecutor,
    };

    const executor = executors[key];

    if (!executor) {
      throw new BadRequestError(
        PAYMENT_ERRORS.PREFIX.BUSINESS,
        PAYMENT_ERRORS.NUMBER.UNSUPPORTED_METHOD,
        'payment.unsupported_method',
      );
    }

    return executor;
  }

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
