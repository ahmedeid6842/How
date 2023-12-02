import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/user.entity';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepo: Repository<Profile>) { }

    async createProfile(profile: CreateProfileDto, user: User): Promise<Profile> {
        const newProfile = this.profileRepo.create({ ...profile, user });

        return await this.profileRepo.save(newProfile);
    }

    async updateProfile(userId: string, profile: Partial<CreateProfileDto>) {
        await this.profileRepo.update({ user: { id: userId } }, profile);
    }
}
