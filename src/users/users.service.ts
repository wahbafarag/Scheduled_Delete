import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DeletedUsersService } from '../deleted-users/deleted-users.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly deleteUsersService: DeletedUsersService,
    @InjectConnection() private nativeMongooseConnection: Connection,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.Create(user);
  }

  async findOne(filter: any): Promise<User> {
    return await this.usersRepository.FindOne(filter);
  }

  async findOneAndDelete(filter: any): Promise<User> {
    return await this.usersRepository.FindOneAndDelete(filter);
  }

  async requestUserDeletion(user: any) {
    // 1- set deletion time
    // 2- clone user to deleted users collection
    // ttl index

    const userDoc = await this.findOne({ _id: user.userId });
    const session = await this.nativeMongooseConnection.startSession();

    await session.withTransaction(async () => {
      user.deletedAt = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString();
      userDoc.deletedAt = user.deletedAt;
      await userDoc.save();
      console.log('userDoc', userDoc);
      console.log('---------------------');
      await this.deleteUsersService.createDeletedUser({
        ...userDoc['_doc'],
        deletedAt: user.deletedAt,
      });
    });
    await session.endSession();
    return {
      message: 'Your Account is set to be deleted in 30 days. Come back soon!',
    };
  }
}
