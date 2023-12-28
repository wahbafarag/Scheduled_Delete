import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { ServiceRes } from '../interface/service-response.interface';

@Injectable()
export class SignupService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(payload: CreateUserDto) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);
      const user = await this.userService.create(payload);
      serviceResponse.data = {
        user: user,
        token: this.jwtService.sign({ id: user._id }),
      };
    } catch (err) {
      serviceResponse.error = err;
    }
    return serviceResponse;
  }
}
