import { Module } from '@nestjs/common';
import { DogsController } from './dog.controller';
import { DogsService } from './dog.service';
/* import { AuthModule } from 'src/auth/auth.module'; */

@Module({
  /* imports: [AuthModule], */
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
