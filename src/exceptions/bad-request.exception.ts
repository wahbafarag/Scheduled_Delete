import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(feedback?: any) {
    super(feedback, HttpStatus.BAD_REQUEST);
  }
}
