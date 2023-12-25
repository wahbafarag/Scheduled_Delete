import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { errorCodes } from '../../constants/error-codes';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SignUpService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: CreateUserDto) {
    if (
      (await this.usersService.findOne({ email: payload.email })) ||
      (await this.usersService.findOne({ username: payload.username }))
    )
      throw new BadRequestException(errorCodes.EMAIL_INUSE);

    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const user = await this.usersService.create(payload);

    return {
      user: user,
      token: this.jwtService.sign({ id: user._id }),
    };
  }
}
