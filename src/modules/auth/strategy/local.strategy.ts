import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../service/login.service';
import { UnauthorizedException } from '../../../exceptions/unauthorized.exception';
import { errorCodes } from '../../../utils/error-codes';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly loginService: LoginService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('LocalStrategy.validate()');
    const user = await this.loginService.validateUser(email, password);
    if (!user) throw new UnauthorizedException(errorCodes.INVALID_CREDENTIALS);
    return {
      userId: user.userId,
      email: user.email,
      source: user.source,
      role: user.role,
      token_type: user.token_type,
    };
  }
}
