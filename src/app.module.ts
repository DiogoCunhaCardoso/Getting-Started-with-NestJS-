import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dog.controller';
import { DogsService } from './dogs/dog.service';

@Module({
  imports: [],
  controllers: [AppController, DogsController],
  providers: [AppService, DogsService],
})
export class AppModule {}
