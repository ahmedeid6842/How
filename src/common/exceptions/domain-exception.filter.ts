import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
    DomainError,
    BadRequestError,
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
} from './domain.exception';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = this.getHttpStatus(exception);

        response.status(statusCode).json({
            statusCode,
            errorCode: exception.errorCode,
            message: exception.message,
        });
    }

    private getHttpStatus(exception: DomainError): number {
        if (exception instanceof NotFoundError) return HttpStatus.NOT_FOUND;
        if (exception instanceof BadRequestError) return HttpStatus.BAD_REQUEST;
        if (exception instanceof ForbiddenError) return HttpStatus.FORBIDDEN;
        if (exception instanceof UnauthorizedError) return HttpStatus.UNAUTHORIZED;
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
