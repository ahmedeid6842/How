import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.repository.find({ where: { email } });
  }

  async findByUserName(userName: string): Promise<User[]> {
    return this.repository.find({ where: { userName } });
  }

  async findByFilter(email?: string, userName?: string): Promise<User[]> {
    const where: FindManyOptions<User>['where'] = {};

    if (email) {
      where.email = email;
    }

    if (userName) {
      where.userName = userName;
    }

    return this.repository.find({ where });
  }
}
