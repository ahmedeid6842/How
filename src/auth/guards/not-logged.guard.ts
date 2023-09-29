import { Request } from "express";
import { BaseGuard } from "./base.guard";

export class NotLoggedGuard extends BaseGuard {

    canActivateInternal(request: Request) {
        return request.session.userId ? false : true;
    }

}