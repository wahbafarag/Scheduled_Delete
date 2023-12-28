import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from './response';
import { ResponseErrorTypes } from './constants';
import { errorCodes } from '../utils/error-codes';

@Injectable()
export class InternalServerResponseService extends Response<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      ResponseErrorTypes.INTERNAL_SERVER_ERROR,
      null,
      feedback || errorCodes.UNEXPECTED_ERROR,
    );
  }
}
