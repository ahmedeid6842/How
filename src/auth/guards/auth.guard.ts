import { Request } from "express";
import { BaseGuard } from "./base.guard";

export class AuthGuard extends BaseGuard {

    canActivateInternal(request: Request) {
      return request.session.userId ? true : false;
    }
  
  }