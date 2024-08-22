import { HttpException, HttpStatus } from '@nestjs/common';

export class DogNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Dog with id of ${id} does not exist`,
        error: 'NOT_FOUND',
        date: new Date().toLocaleString(),
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
