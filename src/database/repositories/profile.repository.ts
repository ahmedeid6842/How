import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
    constructor(@InjectRepository(Profile) repository: Repository<Profile>) {
        super(repository);
    }

    async findByUserId(userId: string): Promise<Profile | null> {
        return this.repository.findOne({ where: { user: { id: userId } } });
    }

    async updateByUserId(userId: string, data: Partial<Profile>): Promise<void> {
        await this.repository.update({ user: { id: userId } }, data);
    }

    async updateStatistics(userId: string, field: string, increaseBy: number): Promise<void> {
        const updateQuery = {
            [field]: () => `${field} + ${increaseBy}`,
        };

        await this.repository.update({ user: { id: userId } }, updateQuery);
    }
}
