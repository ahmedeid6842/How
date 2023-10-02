// this decorator to return the current question assigned to incoming request,
// in another word the question that are assigned by Question Ownser guard

import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const OwnerQuestion = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        return request.ownerQuestion;
    }
)