import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt"



@Injectable()
export class IsValidToken implements NestMiddleware {
    constructor(private jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { token } = req.params || {}
        console.log("here*************");
        if (!token) {
            throw new BadRequestException("not token provided");
        }
        try {
            await this.jwtService.verifyAsync(
                token,
                {
                    secret: "ThisIsMySecert"
                }
            );

            next()
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}