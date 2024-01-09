import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { statusEnum } from '../enum/enums';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(statusEnum)
  status: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsDate()
  @IsOptional()
  expirationDate: Date;
}
