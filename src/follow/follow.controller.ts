import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
  constructor(private readonly followeService: FollowService) { }

  @Post('/')
  async followUser(@Body('following_id') followingId: number, @CurrentUser() user: User) {
    return this.followeService.startUserFollowing(user.id, followingId);
  }

  @Get('/followers/:id')
  async getUserFollowers(@Param('id') userId: number): Promise<Follow[]> {
    return this.followeService.getUserFollowers(userId);
  }

  @Get('/following/:id')
  async getUserFollowing(@Param('id') userId: number): Promise<Follow[]> {
    return this.followeService.getUserFollowing(userId);
  }

}
