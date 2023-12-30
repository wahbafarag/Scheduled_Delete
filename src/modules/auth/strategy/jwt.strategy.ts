import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from '../service/login.service';
import { UsersService } from '../../users/services/users.service';
import { errorCodes } from '../../../utils/error-codes';
import { UnauthorizedException } from '../../../exceptions/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: LoginService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne({ id: payload._id });
    // console.log(user);
    // check if user have requested to delete his account, and still have a valid token
    if (user.deletedAt !== null)
      throw new UnauthorizedException(errorCodes.INVALID_USER);

    return {
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
