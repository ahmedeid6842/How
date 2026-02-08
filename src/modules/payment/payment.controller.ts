import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/database/entities';
import { Serialize } from 'src/core/interceptors/serialize.interceptor';
import { InitiatePaymentDto } from './dto/request/initiate-payment.dto';
import { PaymentDto } from './dto/response/payment.dto';
import { PaymentProviderName } from './enums';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  @UseGuards(AuthGuard)
  @Serialize(PaymentDto)
  async initiatePayment(
    @Body() dto: InitiatePaymentDto,
    @CurrentUser() user: User,
  ) {
    return this.paymentService.initiatePayment(user.id, dto);
  }

  @Post('callback/:provider')
  @Serialize(PaymentDto)
  async handleCallback(
    @Param('provider') provider: PaymentProviderName,
    @Body() payload: any,
  ) {
    return this.paymentService.handleCallback(provider, payload);
  }
}
