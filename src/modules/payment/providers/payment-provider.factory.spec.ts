import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProviderFactory } from './payment-provider.factory';
import { PaytabsProvider } from './paytabs.provider';
import { StripeProvider } from './stripe.provider';
import { PaytabsRedirectExecutor } from '../executors/paytabs-redirect.executor';
import { PaytabsSdkExecutor } from '../executors/paytabs-sdk.executor';
import { StripeRedirectExecutor } from '../executors/stripe-redirect.executor';
import { PaymentProviderName, PaymentMethod } from '../enums';
import { BadRequestError } from 'src/common/exceptions';

describe('PaymentProviderFactory', () => {
  let factory: PaymentProviderFactory;
  let paytabsProvider: jest.Mocked<Partial<PaytabsProvider>>;
  let stripeProvider: jest.Mocked<Partial<StripeProvider>>;
  let paytabsRedirectExecutor: jest.Mocked<Partial<PaytabsRedirectExecutor>>;
  let paytabsSdkExecutor: jest.Mocked<Partial<PaytabsSdkExecutor>>;
  let stripeRedirectExecutor: jest.Mocked<Partial<StripeRedirectExecutor>>;

  beforeEach(async () => {
    paytabsProvider = { parseCallback: jest.fn() };
    stripeProvider = { parseCallback: jest.fn() };
    paytabsRedirectExecutor = { execute: jest.fn() };
    paytabsSdkExecutor = { execute: jest.fn() };
    stripeRedirectExecutor = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentProviderFactory,
        { provide: PaytabsProvider, useValue: paytabsProvider },
        { provide: StripeProvider, useValue: stripeProvider },
        { provide: PaytabsRedirectExecutor, useValue: paytabsRedirectExecutor },
        { provide: PaytabsSdkExecutor, useValue: paytabsSdkExecutor },
        { provide: StripeRedirectExecutor, useValue: stripeRedirectExecutor },
      ],
    }).compile();

    factory = module.get<PaymentProviderFactory>(PaymentProviderFactory);
  });

  describe('getExecutor', () => {
    it('should return PaytabsRedirectExecutor for paytabs + redirect', () => {
      const executor = factory.getExecutor(PaymentProviderName.PAYTABS, PaymentMethod.REDIRECT);
      expect(executor).toBe(paytabsRedirectExecutor);
    });

    it('should return PaytabsSdkExecutor for paytabs + sdk', () => {
      const executor = factory.getExecutor(PaymentProviderName.PAYTABS, PaymentMethod.SDK);
      expect(executor).toBe(paytabsSdkExecutor);
    });

    it('should return StripeRedirectExecutor for stripe + redirect', () => {
      const executor = factory.getExecutor(PaymentProviderName.STRIPE, PaymentMethod.REDIRECT);
      expect(executor).toBe(stripeRedirectExecutor);
    });

    it('should throw BadRequestError for unsupported provider+method combo', () => {
      expect(() =>
        factory.getExecutor(PaymentProviderName.STRIPE, PaymentMethod.SDK),
      ).toThrow(BadRequestError);
    });
  });

  describe('getProvider', () => {
    it('should return PaytabsProvider for paytabs', () => {
      const provider = factory.getProvider(PaymentProviderName.PAYTABS);
      expect(provider).toBe(paytabsProvider);
    });

    it('should return StripeProvider for stripe', () => {
      const provider = factory.getProvider(PaymentProviderName.STRIPE);
      expect(provider).toBe(stripeProvider);
    });

    it('should throw BadRequestError for unsupported provider', () => {
      expect(() =>
        factory.getProvider('unknown' as PaymentProviderName),
      ).toThrow(BadRequestError);
    });
  });
});
