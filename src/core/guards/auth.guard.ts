import { Request } from "express";
import { BaseGuard } from "./base.guard";
import { ForbiddenError, AUTH_ERRORS } from "src/common/exceptions";

export class AuthGuard extends BaseGuard {

  canActivateInternal(request: Request) {
    if (!request.session.userId) {
      return false;
    }

    if (!request.currentUser.isVerified) {
      throw new ForbiddenError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.USER_NOT_VERIFIED, 'auth.user_not_verified');
    }

    return true;
  }

}