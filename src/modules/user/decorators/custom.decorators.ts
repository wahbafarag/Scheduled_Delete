import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../service/user.service';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { errorCodes } from '../../../utils/error-codes';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(email: string) {
    const emailTaken = await this.userService.findOne({ email });
    if (emailTaken) throw new BadRequestException(errorCodes.EMAIL_INUSE);
    return true;
  }
}

@ValidatorConstraint({ name: 'username', async: true })
@Injectable()
export class IsUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(username: string) {
    const isTaken = await this.userService.findOne({ username });
    if (isTaken) throw new BadRequestException(errorCodes.EMAIL_INUSE);
    return true;
  }
}
