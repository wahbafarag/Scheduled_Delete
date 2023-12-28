import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from './response';
import { ResponseErrorTypes } from './constants';

@Injectable()
export class BadRequestResponse extends Response<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.BAD_REQUEST,
      false,
      ResponseErrorTypes.BAD_REQUEST,
      null,
      feedback,
    );
  }
}
