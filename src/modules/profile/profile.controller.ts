import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/database/entities';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { Serialize } from 'src/core/interceptors/serialize.interceptor';
import { ProfileDto } from './dto/response/profile.dto';

@Serialize(ProfileDto)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:userId')
  async getProfile(
    @Param('userId') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    return await this.profileService.getProfile(userId, currentUser);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @CurrentUser() user: User,
  ) {
    return await this.profileService.updateProfile(user.id, body);
  }
}
