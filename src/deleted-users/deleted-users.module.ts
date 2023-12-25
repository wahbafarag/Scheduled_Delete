import { Module } from '@nestjs/common';
import { DeletedUsersService } from './deleted-users.service';
import { DeletedUsersController } from './deleted-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DELETED_USER_COLLECTION_NAME,
  deletedUserSchema,
} from './schemas/deleted-user.schema';
import { DeletedUsersRepository } from './deleted-users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DELETED_USER_COLLECTION_NAME,
        schema: deletedUserSchema,
      },
    ]),
  ],
  providers: [DeletedUsersService, DeletedUsersRepository],
  controllers: [DeletedUsersController],
  exports: [DeletedUsersService],
})
export class DeletedUsersModule {}
