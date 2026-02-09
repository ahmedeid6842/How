import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { SYSTEM_ERRORS } from 'src/common/exceptions/error-codes';
import { DomainError } from 'src/common/exceptions/domain.exception';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly i18n: I18nService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof DomainError) throw exception;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const lang = request.headers['accept-language']?.startsWith('ar')
      ? 'ar'
      : 'en';

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorCode = `${SYSTEM_ERRORS.PREFIX.TECHNICAL}-${String(
      statusCode,
    ).padStart(3, '0')}`;

    this.logger.error(
      `[${errorCode}] ${
        exception instanceof Error ? exception.message : exception
      }`,
      exception instanceof Error ? exception.stack : undefined,
    );

    let message = this.i18n.t('common.something_went_wrong', { lang });

    if (
      exception instanceof HttpException &&
      statusCode !== HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as Record<string, any>;
        message = Array.isArray(res.message)
          ? res.message.join(', ')
          : res.message || message;
      }
    }

    response.status(statusCode).json({
      requestId: request.requestId,
      errorCode,
      message,
    });
  }
}
