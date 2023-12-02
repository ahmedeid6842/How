import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepo: Repository<Profile>) { }

    async createProfile(profile: CreateProfileDto): Promise<Profile> {
        const newProfile = this.profileRepo.create(); 
        newProfile.name = profile.name;  

        return await this.profileRepo.save(newProfile); 
    }
}
