import { Module } from '@nestjs/common';
import { DeletedUsersService } from './service/deleted-users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DELETED_USER_COLLECTION_NAME,
  deletedUserSchema,
} from './schema/deleted-users.schema';
import { DeletedUsersRepository } from './repository/deleted-users.repository';

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
  exports: [DeletedUsersService],
})
export class DeletedUsersModule {}
