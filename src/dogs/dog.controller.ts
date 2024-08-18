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

@Controller('dogs')
export class DogsController {
  //
  /* @Redirect()
  @Get('redirect')
  redirect(@Query('lang') lang: string): object {
    const baseUrl = 'https://nike.com';
    const targetUrl = lang ? `${baseUrl}/${lang}` : baseUrl;
    return { url: targetUrl, statusCode: 301 };
  } */

  @Get()
  findAll(): string {
    return 'this route returns all dogs';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `this route returns a dog with an id of ${id}`;
  }

  @Post()
  create(@Body() body: CreateDogDto): CreateDogDto {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string): string {
    return `this route updates a dog with an id of ${id}`;
  }

  @Delete(':id')
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(/* @Param('id') id: string */): void {}
}
