import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomFilter } from './filter/custom.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomFilter());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
