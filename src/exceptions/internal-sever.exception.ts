import { HttpException, HttpStatus } from '@nestjs/common';
import { errorCodes } from '../utils/error-codes';

export class InternalSeverException extends HttpException {
  constructor(feedback?: any) {
    super(
      feedback || errorCodes.UNEXPECTED_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
