import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, USER_COLLECTION_NAME } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_COLLECTION_NAME) private readonly userModel: Model<User>,
  ) {}

  async Create(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  FindOneAndDelete(filter: any): Promise<User> {
    return this.userModel.findOneAndDelete(filter);
  }

  FindOne(filter: any): Promise<User> {
    return this.userModel.findOne(filter);
  }
}
