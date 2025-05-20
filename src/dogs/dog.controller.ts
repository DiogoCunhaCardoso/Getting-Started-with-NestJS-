import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,

  /*  Query,
  Redirect, */
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dog.service';
import { Dog } from './interface/dog.interface';
import { UpdateDogDto } from './dto/update-dog.dto';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { USER_ROLE } from 'src/contants/UserRoles.enum';

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

  @UsePipes(new DefaultValuePipe(5))
  @Get()
  findAll(@Query('limit') limit: number): Dog[] {
    return this.dogsService.findAll(limit);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseFloatPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query('bday', ParseDatePipe) bday: Date,
  ): Dog {
    return this.dogsService.findOne(id, bday);
  }

  @Post()
  create(@Body() body: CreateDogDto): Dog {
    return this.dogsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDogDto,
  ): Dog {
    return this.dogsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard([USER_ROLE.ADMIN]))
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.dogsService.delete(id);
  }
}
