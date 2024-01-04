import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { TokenSourceEnum, UserRolesEnum } from '../../auth/enums/enums';
import {
  IsEmailAlreadyExistConstraint,
  IsUsernameAlreadyExistConstraint,
} from '../decorators/custom.decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUsernameAlreadyExistConstraint)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsEmailAlreadyExistConstraint)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRolesEnum)
  role: string;

  @IsEnum(TokenSourceEnum)
  source: string;
}
