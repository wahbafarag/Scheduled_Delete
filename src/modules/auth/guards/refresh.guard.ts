import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenTypeEnum } from '../enums/enums';
import { TokenPayload } from '../interface/token-payload.interface';

@Injectable()
export class RefreshGuard
  extends AuthGuard('jwt-refresh')
  implements CanActivate
{
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const mainCanActivate = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    const user: TokenPayload = request.user;

    let isRefreshT = false;
    if (user && user.token_type === TokenTypeEnum.Refresh) {
      isRefreshT = true;
    }

    return mainCanActivate && isRefreshT;
  }
}
