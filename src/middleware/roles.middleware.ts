import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== 'admin') {
      return res.status(401).send('Unauthorized');
    }

    next();
  }
}
