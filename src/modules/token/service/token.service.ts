import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../repository/token.repository';
import { HelperFunctions } from '../helpers/helper-functions';
import { ServiceRes } from '../../common/service-response.interface';
import { errorCodes } from '../../../utils/error-codes';
import { Types } from 'mongoose';
import { envConfigurations } from '../../../../env/env.configuration';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly helperFunctions: HelperFunctions,
  ) {}

  async generateNewTokens(payload: any) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      //
      const tokens = await this.helperFunctions.createNewTokens(payload);

      const refreshTokenHash = await this.helperFunctions.hashRefreshToken(
        tokens.refreshToken,
      );

      await this.tokenRepository.createToken({
        userId: payload.userId,
        refreshTokenHash,
        source: payload.source,
      });

      serviceResponse.data = tokens;
      //
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }

  async renewTokens(payload: any) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      //
      const refreshTokenHash = await this.helperFunctions.hashRefreshToken(
        payload.refreshToken,
      );

      const validRefT = await this.tokenRepository.findOne({
        refreshTokenHash,
        userId: new Types.ObjectId(payload.userId),
        source: payload.source,
      });
      if (!validRefT) {
        serviceResponse.error = errorCodes.UNAUTHORIZED;
        return serviceResponse;
      }
      //

      const tokens = await this.helperFunctions.createNewTokens(payload);

      await this.tokenRepository.findOneAndUpdate(
        {
          refreshTokenHash,
          userId: new Types.ObjectId(payload.userId),
          source: payload.source,
        },
        {
          refreshTokenHash: await this.helperFunctions.hashRefreshToken(
            tokens.refreshToken,
          ),
          expiresAt: new Date(
            Date.now() +
              parseInt(envConfigurations().tokens.refresh.expiresIn, 10),
          ),
        },
      );

      serviceResponse.data = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };

      //
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }

  async invalidateToken(payload: any) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    
    try {
      const refreshTokenHash = await this.helperFunctions.hashRefreshToken(
        payload.refreshToken,
      );

      const validRefT = await this.tokenRepository.findOneAndDelete({
        refreshTokenHash,
        userId: new Types.ObjectId(payload.userId),
      });

      if (!validRefT) {
        serviceResponse.error = errorCodes.ALREADY_LOGGED_OUT;
        return serviceResponse;
      }

      await this.tokenRepository.findOneAndDelete({
        userId: new Types.ObjectId(payload.userId),
        refreshTokenHash: refreshTokenHash,
      });

      serviceResponse.data = 'You Logged Out Successfully!';
      return serviceResponse;

      //
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }
}
