import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../repository/token.repository';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../common/hash/service/hash.service';
import { Types } from 'mongoose';
import { errorCodes } from '../../../utils/error-codes';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  // 1- gen token

  async generateTokens(payload: any) {
    const serviceResponse = { data: null, error: null };

    try {
      const { accessToken, refreshToken } = await this.createNewTokens(payload);

      const refreshTokenHash = await this.createRefreshTokenHash(refreshToken);

      await this.tokenRepository.createToken({
        userId: payload.userId,
        refreshTokenHash: refreshTokenHash,
        source: payload.source,
      });

      serviceResponse.data = { accessToken, refreshToken };

      //
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }

  // 2- renew tokens

  async renewTokens(payload: any) {
    // check if refresh token is valid, gen new access, refresh tokens, update old refresh token in db
    const serviceResponse = { data: null, error: null };
    try {
      const refreshTokenHash = await this.createRefreshTokenHash(
        payload.refreshToken,
      );

      // const valid = await this.hashService.compareHash(
      //   refreshTokenHash,
      //   payload.userId,
      //   process.env.HASH_SECRET,
      // );

      const validToken = await this.tokenRepository.findOne({
        userId: new Types.ObjectId(payload.userId),
        refreshTokenHash: refreshTokenHash,
        source: payload.source,
      });
      if (!validToken) {
        serviceResponse.error = errorCodes.UNAUTHORIZED;
        return serviceResponse;
      }

      const { accessToken, refreshToken } = await this.createNewTokens({
        userId: payload.userId,
      });

      await this.tokenRepository.findOneAndUpdate(
        {
          userId: new Types.ObjectId(payload.userId),
          refreshTokenHash: refreshTokenHash,
        },
        {
          refreshTokenHash: await this.createRefreshTokenHash(refreshToken),
          expiresAt: new Date(
            Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_MS, 10),
          ),
        },
      );

      serviceResponse.data = { accessToken, refreshToken };

      //
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }

  // 3- invalidate token

  async invalidateToken(payload: any) {
    const serviceResponse = { data: null, error: null };
    try {
      const refreshTokenHash = await this.createRefreshTokenHash(
        payload.refreshToken,
      );

      const validToken = await this.tokenRepository.findOne({
        userId: new Types.ObjectId(payload.userId),
        refreshTokenHash: refreshTokenHash,
      });
      if (!validToken) {
        // no refresh token found - already logged out or invalidated
        serviceResponse.error = errorCodes.ALREADY_LOGGED_OUT;
        return serviceResponse;
      }

      await this.tokenRepository.findOneAndDelete({
        userId: new Types.ObjectId(payload.userId),
        refreshTokenHash: refreshTokenHash,
      });

      serviceResponse.data = 'You Logged Out Successfully!';
      return serviceResponse;
    } catch (error) {
      serviceResponse.error = error;
      return serviceResponse;
    }
  }

  // helper functions
  async createNewTokens(payload: any) {
    const accessToken = this.jwtService.sign(
      { sub: payload.userId },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_MS,
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: payload.userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_MS,
      },
    );

    return { accessToken, refreshToken };
  }

  async createRefreshTokenHash(refreshToken: any) {
    return await this.hashService.cryptoHash(
      refreshToken,
      process.env.HASH_SECRET,
    );
  }
}
