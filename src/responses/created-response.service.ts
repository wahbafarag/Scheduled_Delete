import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from './response';

// Created Response 201
@Injectable()
export class CreatedResponseService extends Response<any> {
  constructor(data?: any) {
    super(HttpStatus.CREATED, true, null, data, null);
  }
}
