import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TokenSourceEnum } from '../enums/enums';

export class LoginPayload {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(TokenSourceEnum)
  source: string;
}
