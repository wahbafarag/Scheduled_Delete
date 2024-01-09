import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { statusEnum } from '../enum/enums';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(statusEnum)
  status: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsDate()
  @IsNotEmpty()
  expirationDate: any;

  @IsEmpty()
  owner: string;
}
