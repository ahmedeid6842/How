import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class FollowRepository extends BaseRepository<Follow> {
  constructor(@InjectRepository(Follow) repository: Repository<Follow>) {
    super(repository);
  }

  async findFollowers(userId: string): Promise<Follow[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['follower'],
    });
  }

  async findFollowing(userId: string): Promise<Follow[]> {
    return this.repository.find({
      where: { follower: { id: userId } },
      relations: ['user'],
    });
  }

  async findByUserAndFollower(
    userId: string,
    followerId: string,
  ): Promise<Follow[]> {
    return this.repository.find({
      where: {
        user: { id: userId },
        follower: { id: followerId },
      },
    });
  }
}
