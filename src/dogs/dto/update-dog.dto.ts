import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateDogDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  age?: number;
  @IsOptional()
  @IsString()
  breed?: string;
  @IsOptional()
  @IsBoolean()
  isGoodBoy?: boolean;
}
