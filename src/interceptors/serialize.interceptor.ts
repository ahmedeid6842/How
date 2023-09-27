import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // Run code for incoming request before handler excuted

        return next.handle().pipe(map((data: never) => {
            // Run code for responses after sending the handler

            return plainToInstance(this.dto, data, { excludeExtraneousValues: true })
        }))
    }
}