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
  UseInterceptors,
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
import { Roles, USER_ROLE } from 'src/constants/UserRoles.enum';
import { ReqDurationInterceptor } from 'src/interceptors/req-duration.interceptor';
import { User } from 'src/decorators/user.decorator';

@UseInterceptors(ReqDurationInterceptor)
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
  /* async */
  findAll(
    @Query('limit') limit: number,
    @User() user: any,
  ): /* Promise< */ Dog[] /* > */ {
    /* await new Promise((resolve) => setTimeout(resolve, 6000)); */
    console.log('user' + user);

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
  @Roles([USER_ROLE.ADMIN])
  @UseGuards(AuthGuard)
  @Header('Cache-Control', 'none')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.dogsService.delete(id);
  }
}
