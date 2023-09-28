import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EmailService } from '../email/email.service';
import { IsValidToken } from './middleware/is-valid-token.middelware';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmailService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidToken)
      .forRoutes({ path: 'auth/reset-password/:token', method: RequestMethod.POST })
      .apply(CurrentUserMiddleware)
      .forRoutes("*");
  }
}
