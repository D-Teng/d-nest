import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('AllExceptionFilter', exception);
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    const path = request.url;
    const timestamp = new Date().toISOString();
    //TODO requestId
    //TODO requestContext

    let stack: any;
    let statusCode: HttpStatus;
    let errorName: string;
    let message: string;
    let details: string | Record<string, any>;
    // TODO : Based on language value in header, return a localized message.
    // const acceptedLanguage = 'ja';
    // let localizedMessage: string;

    // TODO : Refactor the below cases into a switch case and tidy up error response creation.
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errorName = exception.constructor.name;
      message = exception.message;
      details = exception.getResponse();
    } else if (exception instanceof Error) {
      errorName = exception.constructor.name;
      message = exception.message;
      stack = exception.stack;
    }

    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    errorName = errorName || 'InternalException';
    message = message || 'Internal server error';

    // NOTE: For reference, please check https://cloud.google.com/apis/design/errors
    const error = {
      statusCode,
      message,
      // localizedMessage,
      errorName,
      details,
      // Additional meta added by us.
      path,
      // requestId,
      timestamp,
    };

    // Suppress original internal server error details in prod mode
    // const isProMood = this.config.get<string>('env') !== 'development';
    // if (isProMood && statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
    //   error.message = 'Internal server error';
    // }

    response.status(statusCode).json(error);
  }
}
