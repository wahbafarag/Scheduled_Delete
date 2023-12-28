import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from './response';

// Success responses
@Injectable()
export class OkResponseService extends Response<any> {
  constructor(data?: any) {
    super(HttpStatus.OK, true, null, data, null);
  }
}
