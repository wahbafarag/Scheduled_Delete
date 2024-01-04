import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TOKEN_COLLECTION_NAME } from '../schema/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TOKEN_COLLECTION_NAME)
    private readonly tokenModel: Model<Token>,
  ) {}

  async createToken(token: any): Promise<Token> {
    return await this.tokenModel.create(token);
  }

  findOne(filters: any): Promise<Token> {
    if (
      Object.keys(filters).length === 0 ||
      !Object.keys(filters).includes('deletedAt')
    ) {
      filters.deletedAt = null;
    }
    return this.tokenModel.findOne(filters).exec();
  }

  findOneAndUpdate(filters: any, token: any): Promise<Token> {
    return this.tokenModel.findOneAndUpdate(filters, token, { new: true });
  }

  findOneAndDelete(filters: any): Promise<any> {
    return this.tokenModel.findOneAndDelete(filters);
  }
}
