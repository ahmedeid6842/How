import { Controller, Get, Param } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Follow } from './follow.entity';
import { FollowDto } from './dto/follow.dto';

@Serialize(FollowDto)
@Controller('follow')
export class FollowController {
  constructor(private readonly followersService: FollowService) { }

  @Get('/followers/:id')
  async getUserFollowers(@Param('id') userId: number): Promise<Follow[]> {
    return this.followersService.getUserFollowers(userId);
  }

  @Get('/following/:id')
  async getUserFollowing(@Param('id') userId: number): Promise<Follow[]> {
    return this.followersService.getUserFollowing(userId);
  }

}
