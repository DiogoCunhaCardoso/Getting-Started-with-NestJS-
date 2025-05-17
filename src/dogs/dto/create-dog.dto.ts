import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(30)
  age: number;
  @IsNotEmpty()
  @IsString()
  breed: string;
  @IsNotEmpty()
  @IsBoolean()
  isGoodBoy: boolean;
}
