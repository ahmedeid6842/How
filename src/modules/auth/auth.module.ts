import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/database';
import { EmailService } from 'src/modules/email/email.service';
import { IsValidToken } from 'src/core/middleware/is-valid-token.middleware';
import { CurrentUserMiddleware } from 'src/core/middleware/current-user.middleware';
import { ProfileModule } from 'src/modules/profile/profile.module';

@Module({
  imports: [DatabaseModule, ProfileModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmailService],
  exports: [UsersService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidToken)
      .forRoutes({
        path: 'auth/reset-password/:token',
        method: RequestMethod.POST,
      })
      .apply(CurrentUserMiddleware)
      .forRoutes('*');
  }
}
