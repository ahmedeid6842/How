import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import {
  DomainError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from 'src/common/exceptions/domain.exception';

@Catch(DomainError)
@Injectable()
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const lang = request.headers['accept-language']?.startsWith('ar')
      ? 'ar'
      : 'en';
    const statusCode = this.getHttpStatus(exception);

    response.status(statusCode).json({
      requestId: request.requestId,
      errorCode: exception.errorCode,
      message: this.i18n.t(exception.messageKey, { lang }),
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
