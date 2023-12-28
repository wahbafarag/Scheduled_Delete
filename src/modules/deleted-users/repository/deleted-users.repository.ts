import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DELETED_USER_COLLECTION_NAME,
  DeletedUsers,
} from '../schema/deleted-users.schema';

@Injectable()
export class DeletedUsersRepository {
  constructor(
    @InjectModel(DELETED_USER_COLLECTION_NAME)
    private readonly deletedUserModel: Model<DeletedUsers>,
  ) {}

  async Create(user: any): Promise<DeletedUsers> {
    return await this.deletedUserModel.create(user);
  }

  findOneAndDelete(filter: any): Promise<DeletedUsers> {
    return this.deletedUserModel.findOneAndDelete(filter);
  }
}
