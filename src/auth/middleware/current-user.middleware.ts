import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../user.service";
import { User } from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }

        next()
    }
}