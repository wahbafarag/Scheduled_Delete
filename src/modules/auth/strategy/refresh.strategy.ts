import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfigurations } from '../../../../env/env.configuration';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('authorization'),
      ]),
      ignoreExpiration: false,
      algorithms: ['HS256'],
      passReqToCallback: true,
      secretOrKey: envConfigurations().tokens.refresh.secret,
    });
  }

  async validate(request: any, payload: any): Promise<any> {
    return {
      userId: payload.userId,
      email: payload.email,
      source: payload.source,
      role: payload.role,
      token_type: payload.token_type,
      token: request.headers.authorization.split(' ')[1],
    };
  }
}
