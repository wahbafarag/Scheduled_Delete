import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from '../interface/token-payload.interface';
import { TokenTypeEnum } from '../enums/enums';

@Injectable()
export class AccessGuard
  extends AuthGuard('jwt-access')
  implements CanActivate
{
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const mainCanActivate = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    const user: TokenPayload = request.user;

    let isAccessT = false;
    if (user && user.token_type === TokenTypeEnum.Access) {
      isAccessT = true;
    }
    return mainCanActivate && isAccessT;
  }
}
