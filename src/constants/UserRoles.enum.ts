import { Reflector } from '@nestjs/core';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PAID_USER = 'PAID_USER',
}

export const Roles = Reflector.createDecorator<[USER_ROLE]>();
