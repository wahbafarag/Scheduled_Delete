import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { ServiceRes } from '../interface/service-response.interface';
import { TokenService } from '../../token/service/token.service';
import { SendGridAdapterService } from '../../mail/service/sendGrid-adapter.service';

@Injectable()
export class SignupService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly sendGridAdapter: SendGridAdapterService,
  ) {}

  async signup(payload: CreateUserDto) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);
      const user = await this.userService.create(payload);
      const tokens = await this.tokenService.generateTokens({
        userId: user._id,
        source: payload.source,
      });

      // send email - adapter
      await this.sendGridAdapter.sendWelcomeEmail({
        email: user.email,
        username: user.username,
      });

      serviceResponse.data = {
        user: user,
        accessToken: tokens.data.accessToken,
        refreshToken: tokens.data.refreshToken,
      };
    } catch (err) {
      serviceResponse.error = err;
    }
    return serviceResponse;
  }
}
