import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(feedback?: any) {
    super(feedback, HttpStatus.UNAUTHORIZED);
  }
}
