import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
/* import { Request } from 'express';
 */ import { Observable } from 'rxjs';
import { Roles /* USER_ROLE */ } from 'src/constants/UserRoles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) return false;

    const ctx = context.switchToHttp();

    const request = ctx.getRequest();

    const token = {
      userId: 1,
      username: 'diogo',
      role: 'ADMIN',
    };

    request.user = token;

    /*     const authHeader = request.headers['authorization']; */

    return roles.includes(request.user.role);
  }
}
