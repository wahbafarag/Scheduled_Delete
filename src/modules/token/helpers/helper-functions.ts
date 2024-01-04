import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../common/hash/service/hash.service';
import { TokenTypeEnum } from '../../auth/enums/enums';
import { envConfigurations } from '../../../../env/env.configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperFunctions {
  constructor(
    private readonly jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async createNewTokens(payload: any) {
    const accessTokenPayload = {
      userId: payload.userId,
      token_type: TokenTypeEnum.Access,
    };

    const refreshTokenPayload = {
      userId: payload.userId,
      token_type: TokenTypeEnum.Refresh,
    };

    //
    const accessT = this.jwtService.sign(accessTokenPayload, {
      expiresIn: envConfigurations().tokens.access.expiresIn,
      secret: envConfigurations().tokens.access.secret,
    });

    const refreshT = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: envConfigurations().tokens.refresh.expiresIn,
      secret: envConfigurations().tokens.refresh.secret,
    });

    return {
      accessToken: accessT,
      refreshToken: refreshT,
    };
  }

  async hashRefreshToken(refreshToken: string) {
    return await this.hashService.cryptoHash(
      refreshToken,
      envConfigurations().hash.secret,
    );
  }
}
