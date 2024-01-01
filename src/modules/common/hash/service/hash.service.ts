import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto-js';
import { sortObjFields } from '../../../../utils/helpers/sort';

@Injectable()
export class HashService {
  async cryptoHash(payload: any, secret: string) {
    const payloadAsString = JSON.stringify(sortObjFields(payload));

    return Crypto.HmacSHA256(payloadAsString, secret).toString(Crypto.enc.Hex);
  }
}
