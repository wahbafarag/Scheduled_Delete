import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../services/users.service';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { errorCodes } from '../../../utils/error-codes';

@ValidatorConstraint({ name: 'username', async: true })
@Injectable()
export class IsUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}

  async validate(username: string) {
    const isTaken = await this.userService.findOne({ username });
    if (isTaken) throw new BadRequestException(errorCodes.EMAIL_INUSE);
    return true;
  }
}
