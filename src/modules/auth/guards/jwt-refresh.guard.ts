import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { errorCodes } from '../../../utils/error-codes';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.refreshToken) {
      const isRefreshToken = this.isRefreshToken(request.body.refreshToken);

      if (!isRefreshToken) {
        throw new UnauthorizedException(errorCodes.INVALID_TOKEN);
      }
    }

    return super.handleRequest(err, user, info, context);
  }

  private isRefreshToken(token: string): boolean {
    try {
      const decodedToken = this.jwtService.decode(token) as any;
      return decodedToken && decodedToken.token_type === 'refresh';
    } catch (error) {
      return false;
    }
  }
}
