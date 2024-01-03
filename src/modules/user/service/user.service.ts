import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { ServiceRes } from '../../common/service-response.interface';
import { DeletedUserService } from '../../delete-user/service/delete-user.service';
import { deletionTime } from '../constants/constants';
import { SendGridAdapterService } from '../../mail/mail/service/sendGrid-adapter.service';
import { NodemailerAdapterService } from '../../mail/mail/service/nodemailer-adapter.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectConnection() private nativeMongooseConnection: Connection,
    private readonly deleteUsersService: DeletedUserService,
    private readonly sendGridAdapterService: SendGridAdapterService,
    private readonly nodeMailerAdapterService: NodemailerAdapterService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.Create(user);
  }

  async findOne(filter: any): Promise<User> {
    return await this.userRepository.FindOne(filter);
  }

  async findAll(filter: any) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      serviceResponse.data = await this.userRepository.FindAll(filter);
    } catch (err) {
      serviceResponse.error = err;
    }
    return serviceResponse;
  }

  async findOneAndUpdate(filter: any, update: any): Promise<User> {
    return await this.userRepository.FindOneAndUpdate(filter, update);
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

        await this.userRepository.FindOneAndUpdate(
          { _id: user.userId },
          { deletedAt: deletedAtTime },
        );

        await this.deleteUsersService.createDeletedUser({
          ...userDoc['_doc'],
          deletedAt: deletedAtTime,
        });

        await session.endSession();
      });

      // await this.nodeMailerAdapterService.sendAccountDeletionEmail({
      //   email: userDoc.email,
      //   username: userDoc.username,
      // });

      await this.sendGridAdapterService.sendAccountDeletionEmail({
        email: userDoc.email,
        username: userDoc.username,
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
