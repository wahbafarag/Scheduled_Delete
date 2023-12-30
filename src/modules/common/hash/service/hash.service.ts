import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto-js';
import { sortObjFields } from '../../helpers/sort';

@Injectable()
export class HashService {
  async cryptoHash(payload: any, secret: string) {
    const payloadAsString = JSON.stringify(sortObjFields(payload));

    return Crypto.HmacSHA256(payloadAsString, secret).toString(Crypto.enc.Hex);
  }

  // async compareHash(hash: string, payload: any, secret: string) {
  //   const newHash = await this.cryptoHash(payload, secret);
  //   return newHash === hash;
  // }
}
