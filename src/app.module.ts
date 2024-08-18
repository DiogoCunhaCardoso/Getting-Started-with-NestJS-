import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dog.controller';

@Module({
  imports: [],
  controllers: [AppController, DogsController],
  providers: [AppService],
})
export class AppModule {}
