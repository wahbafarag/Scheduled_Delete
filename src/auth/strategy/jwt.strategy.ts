import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  }
}
