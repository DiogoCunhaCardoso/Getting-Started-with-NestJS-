import {
  /* ArgumentMetadata, */ BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseDatePipe implements PipeTransform {
  transform(value: string /* , metadata: ArgumentMetadata */): Date {
    if (!value) return undefined;
    const isDate = (value: string): boolean => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    };

    if (!isDate(value)) {
      throw new BadRequestException('Invalid Date');
    }

    return new Date(value);
  }
}
