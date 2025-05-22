import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ReqDurationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // logic
    const now = performance.now();

    return next.handle().pipe(
      tap(() => {
        const duration = performance.now() - now;
        console.log(duration);
      }),
    );
  }
}
