import { ForbiddenException, Injectable } from '@nestjs/common';
import { Profile, User } from 'src/database/entities';
import { ProfileRepository } from 'src/database/repositories';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FollowService } from 'src/modules/follow/follow.service';

@Injectable()
export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private followService: FollowService
    ) { }

    async createProfile(profile: CreateProfileDto, user: User): Promise<Profile> {
        return this.profileRepository.create({ ...profile, user });
    }

    async getProfile(userId: string, currentUser: User) {
        const profile = await this.profileRepository.findByUserId(userId);
        if (profile.isPublic == false) {
            if (
                (await this.followService.followExist(userId, currentUser.id)).length ||
                (await this.followService.followExist(currentUser.id, userId)).length ||
                userId == currentUser.id
            ) {
                return profile;
            }
            throw new ForbiddenException('This account is private');
        }

        return profile;
    }

    async updateProfile(userId: string, profile: Partial<CreateProfileDto>) {
        await this.profileRepository.updateByUserId(userId, profile as any);
    }

    async updateProfileStatistics(userId: string, field: string, increaseBy: number) {
        await this.profileRepository.updateStatistics(userId, field, increaseBy);
    }
}
