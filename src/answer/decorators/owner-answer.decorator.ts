import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const OwnerAnswer = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        return request.ownerAnswer;
    }
)