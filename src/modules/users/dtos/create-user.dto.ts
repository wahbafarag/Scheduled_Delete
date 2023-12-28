import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UserRoles } from '../enums/user-role.enum';
import { IsUsernameAlreadyExistConstraint } from '../decorators/username_custom-decorator.decorator';
import { IsEmailAlreadyExistConstraint } from '../decorators/email-custom-decorator.decorator';

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
  @IsEnum(UserRoles)
  role: string;
}
