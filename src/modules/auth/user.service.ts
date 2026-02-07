import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/database/entities";
import { UserRepository } from "src/database/repositories";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    create(email: string, userName: string, password: string, verificationCode: string, verificationCodeExpiresAt: Date) {
        return this.userRepository.create({ email, userName, password, verificationCode, verificationCodeExpiresAt });
    }

    findOne(id: string) {
        if (!id) {
            return null;
        }

        return this.userRepository.findById(id);
    }

    find(email?: string, userName?: string) {
        if (!email && !userName) {
            throw new BadRequestException("At least one of email or userName must be provided.")
        }

        return this.userRepository.findByFilter(email, userName);
    }

    async update(userId: string, attrs: Partial<User>) {
        const user = await this.findOne(userId);

        if (!user) {
            throw new NotFoundException('user not found');
        }

        Object.assign(user, attrs);

        return this.userRepository.save(user);
    }
}
