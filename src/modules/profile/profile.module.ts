import { Module, forwardRef } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule } from 'src/database';
import { FollowModule } from 'src/modules/follow/follow.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => FollowModule)],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
