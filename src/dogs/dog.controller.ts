import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  /*  Query,
  Redirect, */
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dog.service';
import { Dog } from './interface/dog.interface';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}
  //
  /* @Redirect()
  @Get('redirect')
  redirect(@Query('lang') lang: string): object {
    const baseUrl = 'https://nike.com';
    const targetUrl = lang ? `${baseUrl}/${lang}` : baseUrl;
    return { url: targetUrl, statusCode: 301 };
  } */

  @Get()
  findAll(): Dog[] {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Dog {
    return this.dogsService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateDogDto): Dog {
    return this.dogsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateDogDto): Dog {
    return this.dogsService.update(+id, body);
  }

  @Delete(':id')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    return this.dogsService.delete(+id);
  }
}
