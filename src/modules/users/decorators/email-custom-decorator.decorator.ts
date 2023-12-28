import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../services/users.service';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { errorCodes } from '../../../utils/error-codes';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}

  async validate(email: string) {
    const isTaken = await this.userService.findOne({ email });
    if (isTaken) throw new BadRequestException(errorCodes.EMAIL_INUSE);
    return true;
  }
}
