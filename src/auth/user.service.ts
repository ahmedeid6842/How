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
}