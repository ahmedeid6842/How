import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { Follow } from './follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/auth/user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), AuthModule],
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule { }
