import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(feedback?: any) {
    super(feedback, HttpStatus.FORBIDDEN);
  }
}
