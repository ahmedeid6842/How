import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/auth/user.service';
import { User } from 'src/auth/user.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow) private readonly followRepository: Repository<Follow>,
        private readonly userService: UsersService,
        @Inject(forwardRef(() => ProfileService)) private readonly profileService: ProfileService
    ) { }

    async startUserFollowing(followingId: string, follower: User) {
        const following = await this.userService.findOne(followingId);

        if (followingId == follower.id) {
            throw new BadRequestException("you can't follow yourself")
        }

        if (!following) {
            throw new BadRequestException("Invalid user id")
        }

        const isFollowExists = await this.followExist(followingId, follower.id);

        if (isFollowExists.length) {
            throw new BadRequestException("you already a follwer")
        }

        const follow = await this.followRepository.create({
            user: following,
            follower
        });

        await this.profileService.updateProfileStatistics(followingId, 'numFollowers', 1)
        await this.profileService.updateProfileStatistics(follower.id, 'numFollowing', 1)

        await this.followRepository.save(follow);
    }

    async getUserFollowers(userId: string) {
        const follows = await this.followRepository.find({
            where: { user: { id: userId } },
            relations: ['follower'],
        });
        return follows;
    }

    async getUserFollowing(userId: string) {
        const follows = await this.followRepository.find({
            where: { follower: { id: userId } },
            relations: ['user'],
        });

        return follows;
    }

    async unFollowUser(followingId: string, follower: User) {
        const following = await this.userService.findOne(followingId);

        if (!following) {
            throw new BadRequestException("Invalid user id");
        }

        const follow = await this.followExist(followingId, follower.id);

        if (!follow.length) {
            throw new BadRequestException("You are not following this user");
        }

        await this.profileService.updateProfileStatistics(followingId, 'numFollowers', -1)
        await this.profileService.updateProfileStatistics(follower.id, 'numFollowing', -1)

        await this.followRepository.remove(follow);
    }

    async followExist(userId, followerId): Promise<Follow[]> {
        const follow = await this.followRepository.find({
            where: {
                user: { id: userId },
                follower: { id: followerId },
            },
        });
        return follow;
    }
}
