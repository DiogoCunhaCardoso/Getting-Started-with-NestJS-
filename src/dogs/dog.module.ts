import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DogsController } from './dog.controller';
import { DogsService } from './dog.service';
import { loggerMiddleware } from 'src/middleware/logger.middleware';
/* import { RolesMiddleware } from 'src/middleware/roles.middleware'; */
/* import { AuthModule } from 'src/auth/auth.module'; */

@Module({
  /* imports: [AuthModule], */
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware /* RolesMiddleware */)
      .exclude(
        { path: 'dogs', method: RequestMethod.GET },
        { path: 'dogs/:id', method: RequestMethod.GET },
        { path: 'dogs/:id', method: RequestMethod.DELETE },
      )
      .forRoutes(DogsController);
  }
}
