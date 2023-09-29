import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/auth/user.service';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepository: Repository<Follow>,
        private readonly userService: UsersService
    ) { }

    async startUserFollowing(userId: number, followingId: number) {
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
}
