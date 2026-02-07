import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();

        return next.handle().pipe(map((body) => {
            return { requestId: request.requestId, data: body };
        }));
    }
}
