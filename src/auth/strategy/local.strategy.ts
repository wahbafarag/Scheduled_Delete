import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../services/login.service';
import { errorCodes } from '../../constants/error-codes';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: LoginService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException(errorCodes.UNAUTHORIZED);
    }
    return user;
  }
}
