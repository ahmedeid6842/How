import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database';
import { QuestionModule } from 'src/modules/question/question.module';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentProviderFactory } from './providers/payment-provider.factory';
import { PaytabsProvider } from './providers/paytabs.provider';
import { StripeProvider } from './providers/stripe.provider';
import { PaytabsRedirectExecutor } from './executors/paytabs-redirect.executor';
import { PaytabsSdkExecutor } from './executors/paytabs-sdk.executor';
import { StripeRedirectExecutor } from './executors/stripe-redirect.executor';

@Module({
  imports: [DatabaseModule, QuestionModule],
  providers: [
    PaymentService,
    PaymentProviderFactory,
    PaytabsProvider,
    StripeProvider,
    PaytabsRedirectExecutor,
    PaytabsSdkExecutor,
    StripeRedirectExecutor,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
