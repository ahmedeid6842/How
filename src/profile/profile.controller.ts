import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Patch()
    @UseGuards(AuthGuard)
    async updateProfile(@Body() body: UpdateProfileDto, @CurrentUser() user: User) {
        return await this.profileService.updateProfile(user.id, body);
    }
}
