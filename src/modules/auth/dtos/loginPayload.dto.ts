import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TokenSourceEnum } from '../../token/constants/token.enum';

export class LoginPayloadWithUsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsEnum(TokenSourceEnum)
  source: string;
}
