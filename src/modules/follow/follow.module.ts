import { Module, forwardRef } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { DatabaseModule } from 'src/database';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ProfileModule } from 'src/modules/profile/profile.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => ProfileModule),
  ],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
