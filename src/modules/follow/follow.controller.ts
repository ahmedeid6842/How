import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { Serialize } from 'src/core/interceptors/serialize.interceptor';
import { Follow, User } from 'src/database/entities';
import { FollowDto } from './dto/follow.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Serialize(FollowDto)
@UseGuards(AuthGuard)
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('/')
  async followUser(
    @Body('following_id') followingId: string,
    @CurrentUser() follower: User,
  ) {
    return this.followService.startUserFollowing(followingId, follower);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/followers/:id')
  async getUserFollowers(@Param('id') userId: string): Promise<Follow[]> {
    return this.followService.getUserFollowers(userId);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/following/:id')
  async getUserFollowing(@Param('id') userId: string): Promise<Follow[]> {
    return this.followService.getUserFollowing(userId);
  }

  @Patch('/unfollow')
  async unFollowUser(
    @Body('following_id') followingId: string,
    @CurrentUser() follower: User,
  ) {
    return this.followService.unFollowUser(followingId, follower);
  }
}
