import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, USER_COLLECTION_NAME } from '../schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_COLLECTION_NAME) private readonly userModel: Model<User>,
  ) {}

  async Create(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async FindAll(filter: any): Promise<User[]> {
    return this.userModel.find(filter);
  }

  FindOne(filter: any): Promise<User> {
    return this.userModel.findOne(filter);
  }

  FindOneAndUpdate(filter: any, update: any): Promise<User> {
    return this.userModel.findOneAndUpdate(filter, update, { new: true });
  }
}
