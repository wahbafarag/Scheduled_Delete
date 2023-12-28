import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPayloadWithUsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
