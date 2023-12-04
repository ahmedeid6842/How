import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/user.entity';
import { UserDto } from 'src/auth/dto/user.dto';
import { FollowService } from 'src/follow/follow.service';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepo: Repository<Profile>, private followService: FollowService) { }

    async createProfile(profile: CreateProfileDto, user: User): Promise<Profile> {
        const newProfile = this.profileRepo.create({ ...profile, user });

        return await this.profileRepo.save(newProfile);
    }

    async getProfile(userId: string, currentUser: User) {
        const profile = await this.profileRepo.findOne({ where: { user: { id: userId } } })
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
        await this.profileRepo.update({ user: { id: userId } }, profile);
    }

    async updateProfileStatistics(userId: string, field: string, increaseBy: number) {
        const updateQuery = {
            [field]: () => `${field} + ${increaseBy}`,
        };

        await this.profileRepo.update({ user: { id: userId } }, updateQuery);
    }
}
