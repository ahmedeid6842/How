import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepo: Repository<Profile>) { }

    createProfile(profile: CreateProfileDto): Promise<Profile> {
        const newProfile = this.profileRepo.create(profile);

        return this.profileRepo.save(newProfile);
    }
}
