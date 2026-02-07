import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export abstract class BaseGuard implements CanActivate {

    abstract canActivateInternal(request: Request): boolean;

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        
        return this.canActivateInternal(request);
    }
}