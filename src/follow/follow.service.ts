import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/auth/user.service';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepository: Repository<Follow>,
        private readonly userService: UsersService
    ) { }

    async startUserFollowing(followingId: number, follower: User) {
        const following = await this.userService.findOne(followingId);
        if (!following) {
            throw new BadRequestException("Invalid user id")
        }

        const isFollowExists = await this.followExist(followingId, follower.id);

        if (isFollowExists) {
            throw new BadRequestException("you already a follwer")
        }

        const follow = await this.followRepository.create({
            user: following,
            follower
        });

        return (await this.followRepository.save(follow)).follower;
    }

    async getUserFollowers(userId: number) {
        const follows = await this.followRepository.find({
            where: { user: { id: userId } },
            relations: ['follower'],
        });
        return follows;
    }

    async getUserFollowing(userId: number) {
        const follows = await this.followRepository.find({
            where: { follower: { id: userId } },
            relations: ['user'],
        });

        return follows;
    }


    private async followExist(userId, followerId): Promise<boolean> {
        const follow = await this.followRepository.find({
            where: {
                user: { id: userId },
                follower: { id: followerId },
            },
        });
        console.log(follow.length ? true : false)
        return follow.length ? true : false;
    }
}
