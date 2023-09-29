import { Controller, Get, Param } from '@nestjs/common';
import { FollowService } from './follow.service';
import { User } from 'src/auth/user.entity';


@Controller('follow')
export class FollowController {
  constructor(private readonly followersService: FollowService) { }

  @Get('/followers/:id')
  async getUserFollowers(@Param('id') userId: number): Promise<User[]> {
    return this.followersService.getUserFollowers(userId);
  }

  @Get('/following/:id')
  async getUserFollowing(@Param('id') userId: number): Promise<User[]> {
    return this.followersService.getUserFollowing(userId);
  }

}
