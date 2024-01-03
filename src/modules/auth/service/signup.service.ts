import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/service/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ServiceRes } from '../../common/service-response.interface';
import { TokenService } from '../../token/service/token.service';

@Injectable()
export class SignupService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(payload: CreateUserDto) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);
      const user = await this.userService.create(payload);

      const tokens = await this.tokenService.generateNewTokens({
        userId: user._id,
        source: payload.source,
      });
     
      serviceResponse.data = {
        user,
        tokens,
      };
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }
}
