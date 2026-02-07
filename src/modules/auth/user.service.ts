import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities';
import { UserRepository } from 'src/database/repositories';
import {
  BadRequestError,
  NotFoundError,
  AUTH_ERRORS,
} from 'src/common/exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(
    email: string,
    userName: string,
    password: string,
    verificationCode: string,
    verificationCodeExpiresAt: Date,
  ) {
    return this.userRepository.create({
      email,
      userName,
      password,
      verificationCode,
      verificationCodeExpiresAt,
    });
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }

    return this.userRepository.findById(id);
  }

  find(email?: string, userName?: string) {
    if (!email && !userName) {
      throw new BadRequestError(
        AUTH_ERRORS.PREFIX.BUSINESS,
        AUTH_ERRORS.NUMBER.MISSING_EMAIL_OR_USERNAME,
        'auth.missing_email_or_username',
      );
    }

    return this.userRepository.findByFilter(email, userName);
  }

  async update(userId: string, attrs: Partial<User>) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundError(
        AUTH_ERRORS.PREFIX.BUSINESS,
        AUTH_ERRORS.NUMBER.USER_NOT_FOUND_UPDATE,
        'auth.user_not_found',
      );
    }

    Object.assign(user, attrs);

    return this.userRepository.save(user);
  }
}
