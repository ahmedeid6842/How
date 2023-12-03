import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { FollowModule } from 'src/follow/follow.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), FollowModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})

export class ProfileModule { }
