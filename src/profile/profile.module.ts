import { Module, forwardRef } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { FollowModule } from 'src/follow/follow.module';
import { FollowService } from 'src/follow/follow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    forwardRef(() =>FollowModule)
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule { }