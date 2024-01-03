import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  //
  // async canActivate(context: ExecutionContext) {
  //   const mainCanActivate = (await super.canActivate(context)) as boolean;
  //   const request = context.switchToHttp().getRequest();
  //
  //   const user = request.user;
  // }
}
