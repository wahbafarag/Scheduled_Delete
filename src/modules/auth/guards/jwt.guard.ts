import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { errorCodes } from '../../../utils/error-codes';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const isAccessToken = this.isAccessToken(request.headers.authorization);

      if (!isAccessToken) {
        throw new UnauthorizedException(errorCodes.INVALID_TOKEN);
      }
    }

    if (request.body && request.body.refreshToken) {
      const isRefreshToken = this.isRefreshToken(request.body.refreshToken);

      if (!isRefreshToken) {
        throw new UnauthorizedException(errorCodes.INVALID_TOKEN);
      }
    }

    return super.handleRequest(err, user, info, context);
  }

  private isAccessToken(authorizationHeader: string): boolean {
    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
      const token = authorizationHeader.split(' ')[1];

      try {
        const decodedToken = this.jwtService.decode(token) as any;
        console.log('decodedToken', decodedToken.token_type);
        return decodedToken && decodedToken.token_type === 'access';
      } catch (error) {
        return false;
      }
    }

    return false;
  }

  private isRefreshToken(refreshToken: string): boolean {
    try {
      const decodedToken = this.jwtService.decode(refreshToken) as any;
      console.log('decodedRefreshToken', decodedToken.token_type);
      return decodedToken && decodedToken.token_type === 'refresh';
    } catch (error) {
      return false;
    }
  }
}
