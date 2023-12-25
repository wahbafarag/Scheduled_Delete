import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DELETED_USER_COLLECTION_NAME,
  DeletedUsers,
} from './schemas/deleted-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeletedUsersRepository {
  constructor(
    @InjectModel(DELETED_USER_COLLECTION_NAME)
    private readonly deletedUserModel: Model<DeletedUsers>,
  ) {}

  async Create(user: any): Promise<DeletedUsers> {
    return await this.deletedUserModel.create(user);
  }

  findOne(filter: any): Promise<DeletedUsers> {
    return this.deletedUserModel.findOne(filter);
  }

  findOneAndDelete(filter: any): Promise<DeletedUsers> {
    return this.deletedUserModel.findOneAndDelete(filter);
  }
}
