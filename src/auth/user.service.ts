import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, FindManyOptions } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    create(email: string, userName: string, password: string) {
        const user = this.userRepo.create({ email, userName, password });

        return this.userRepo.save(user);
    }

    findOne(id: number) {
        if (!id) { // this condition is added becuase the default behaviour of findOne, if you pass null it will return the first record
            return null;
        }

        return this.userRepo.findOne({ where: { id } })
    }

    find(email?: string, userName?: string) {
        if (!email && !userName) {
            throw new BadRequestException("At least one of email or userName must be provided.")
        }

        const where: FindManyOptions<User>['where'] = {}; //Define the type of the where object. It represents the conditions used for finding entities in the find method.

        if (email) {
            where.email = email
        }

        if (userName) {
            where.userName = userName
        }

        return this.userRepo.find({ where });
    }

    async update(userId: number, attrs: Partial<User>) { // Patial to make the property is optional
        const user = await this.findOne(userId);

        if (!user) {
            throw new NotFoundException('user not found');
        }

        Object.assign(user, attrs); // assign will override the property which exists at the attributes 

        return this.userRepo.save(user); // save the update user
    }

}