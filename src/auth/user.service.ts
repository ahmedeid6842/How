import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

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
}