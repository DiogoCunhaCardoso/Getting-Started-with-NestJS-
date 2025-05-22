import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomFilter } from './filter/custom.filter';
import { ValidationPipe } from '@nestjs/common';
import { FormatResInterceptor } from './interceptors/format-res.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomFilter());

  app.useGlobalInterceptors(
    new FormatResInterceptor(),
    new TimeoutInterceptor(),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
