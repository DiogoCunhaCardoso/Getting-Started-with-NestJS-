import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Catch } from '@nestjs/common';

@Catch()
export class CustomFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const message = exception.message || 'an error occurred';
    const codeName = this.getCodename(statusCode);

    response.status(statusCode).json({
      statusCode,
      message,
      codeName,
      timestamp: new Date().toISOString(),
    });
  }

  private getCodename(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
        break;
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
        break;
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
        break;
      case HttpStatus.NOT_FOUND:
        return 'RESOURCE_NOT_FOUND';
        break;
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
        break;
      case HttpStatus.NOT_ACCEPTABLE:
        return 'WRONG_FORMAT';
        break;
      case HttpStatus.REQUEST_TIMEOUT:
        return 'REQUEST_TIMEOUT';
        break;

      default:
        return 'GENERAL_ERROR';
    }
  }
}
