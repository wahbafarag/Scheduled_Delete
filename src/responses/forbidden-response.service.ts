import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from './response';
import { ResponseErrorTypes } from './constants';

@Injectable()
export class ForbiddenResponseService extends Response<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.FORBIDDEN,
      false,
      ResponseErrorTypes.FORBIDDEN,
      null,
      feedback,
    );
  }
}
