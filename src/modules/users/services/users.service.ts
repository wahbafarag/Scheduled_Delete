import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/users.repository';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../schema/user.schema';
import { ServiceRes } from '../../auth/interface/service-response.interface';
import { deletionTime } from '../constants/constants';
import { DeletedUsersService } from '../../deleted-users/service/deleted-users.service';

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

  async findAll(filter: any) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      serviceResponse.data = await this.usersRepository.FindAll(filter);
    } catch (err) {
      serviceResponse.error = err;
    }
    return serviceResponse;
  }

  async findOneAndUpdate(filter: any, update: any): Promise<User> {
    return await this.usersRepository.FindOneAndUpdate(filter, update);
  }

  async requestUserDeletion(user: any) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      const userDoc = await this.findOne({ _id: user.userId });
      const session = await this.nativeMongooseConnection.startSession();

      //

      await session.withTransaction(async () => {
        const deletedAtTime = new Date(
          new Date().getTime() + deletionTime,
        ).toISOString();

        await this.usersRepository.FindOneAndUpdate(
          { _id: user.userId },
          { deletedAt: deletedAtTime },
        );

        await this.deleteUsersService.createDeletedUser({
          ...userDoc['_doc'],
          deletedAt: deletedAtTime,
        });

        await session.endSession();
      });

      serviceResponse.data = {
        message:
          'Your Account is set to be deleted in 30 days. Come back soon!',
      };
      //
    } catch (err) {
      serviceResponse.error = err;
    }
    return serviceResponse;
  }
}
