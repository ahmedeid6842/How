import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Follow, User } from 'src/database/entities';
import { FollowRepository } from 'src/database/repositories';
import { BadRequestError, FOLLOW_ERRORS } from 'src/common/exceptions';
import { UsersService } from 'src/modules/auth/user.service';
import { ProfileService } from 'src/modules/profile/profile.service';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  async startUserFollowing(followingId: string, follower: User) {
    const following = await this.userService.findOne(followingId);

    if (followingId == follower.id) {
      throw new BadRequestError(
        FOLLOW_ERRORS.PREFIX.BUSINESS,
        FOLLOW_ERRORS.NUMBER.CANNOT_FOLLOW_SELF,
        'follow.cannot_follow_self',
      );
    }

    if (!following) {
      throw new BadRequestError(
        FOLLOW_ERRORS.PREFIX.BUSINESS,
        FOLLOW_ERRORS.NUMBER.INVALID_USER_ID_FOLLOW,
        'follow.invalid_user_id',
      );
    }

    const isFollowExists = await this.followExist(followingId, follower.id);

    if (isFollowExists.length) {
      throw new BadRequestError(
        FOLLOW_ERRORS.PREFIX.BUSINESS,
        FOLLOW_ERRORS.NUMBER.ALREADY_FOLLOWING,
        'follow.already_following',
      );
    }

    await this.followRepository.create({
      user: following,
      follower,
    });

    await this.profileService.updateProfileStatistics(
      followingId,
      'numFollowers',
      1,
    );
    await this.profileService.updateProfileStatistics(
      follower.id,
      'numFollowing',
      1,
    );
  }

  async getUserFollowers(userId: string) {
    return this.followRepository.findFollowers(userId);
  }

  async getUserFollowing(userId: string) {
    return this.followRepository.findFollowing(userId);
  }

  async unFollowUser(followingId: string, follower: User) {
    const following = await this.userService.findOne(followingId);

    if (!following) {
      throw new BadRequestError(
        FOLLOW_ERRORS.PREFIX.BUSINESS,
        FOLLOW_ERRORS.NUMBER.INVALID_USER_ID_UNFOLLOW,
        'follow.invalid_user_id',
      );
    }

    const follow = await this.followExist(followingId, follower.id);

    if (!follow.length) {
      throw new BadRequestError(
        FOLLOW_ERRORS.PREFIX.BUSINESS,
        FOLLOW_ERRORS.NUMBER.NOT_FOLLOWING,
        'follow.not_following',
      );
    }

    await this.profileService.updateProfileStatistics(
      followingId,
      'numFollowers',
      -1,
    );
    await this.profileService.updateProfileStatistics(
      follower.id,
      'numFollowing',
      -1,
    );

    await this.followRepository.remove(follow);
  }

  async followExist(userId, followerId): Promise<Follow[]> {
    return this.followRepository.findByUserAndFollower(userId, followerId);
  }
}
