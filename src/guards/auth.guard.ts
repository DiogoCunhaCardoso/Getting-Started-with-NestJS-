import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { USER_ROLE } from 'src/contants/UserRoles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly allowedRoles: USER_ROLE[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest<Request>();

    const authHeader = request.headers['authorization'];

    if (!this.allowedRoles.includes(authHeader as USER_ROLE)) return false;

    return true;
  }
}
