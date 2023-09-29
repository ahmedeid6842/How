import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepository: Repository<Follow>,
    ) { }


    async getUserFollowers(userId: number) {
        const follows = await this.followRepository.find({
            where: { user: { id: userId } },
            relations: ['follower'],
        });
        return follows.map((follow) => follow.follower);
    }

    async getUserFollowing(userId: number) {
      return "following"
    }
}
