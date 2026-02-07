import { Injectable, NestMiddleware } from "@nestjs/common";
import { BadRequestError, UnauthorizedError, AUTH_ERRORS } from "src/common/exceptions";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt"



@Injectable()
export class IsValidToken implements NestMiddleware {
    constructor(private jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { token } = req.params || {}
        if (!token) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.NO_TOKEN_PROVIDED, "No token provided");
        }
        try {
            await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );
            
            next()
        } catch (error) {
            throw new UnauthorizedError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.INVALID_TOKEN, "Invalid or expired token");
        }
    }
}