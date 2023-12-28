import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from './response';
import { ResponseErrorTypes } from './constants';

@Injectable()
export class UnauthorizedResponseService extends Response<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.UNAUTHORIZED,
      false,
      ResponseErrorTypes.UNAUTHORIZED,
      null,
      feedback,
    );
  }
}
