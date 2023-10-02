import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Follow } from './follow.entity';
import { FollowDto } from './dto/follow.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';

@Serialize(FollowDto)
@UseGuards(AuthGuard)
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) { }

  @Post('/')
  async followUser(@Body('following_id') followingId: string, @CurrentUser() follower: User) {
    return this.followService.startUserFollowing(followingId, follower);
  }

  @Get('/followers/:id')
  async getUserFollowers(@Param('id') userId: string): Promise<Follow[]> {
    return this.followService.getUserFollowers(userId);
  }

  @Get('/following/:id')
  async getUserFollowing(@Param('id') userId: string): Promise<Follow[]> {
    return this.followService.getUserFollowing(userId);
  }

  @Patch('/unfollow')
  async unFollowUser(@Body('following_id') followingId: string, @CurrentUser() follower: User) {
    return this.followService.unFollowUser(followingId, follower);
  }
}
