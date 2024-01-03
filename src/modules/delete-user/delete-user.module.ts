import { Module } from '@nestjs/common';
import { DeletedUserService } from './service/delete-user.service';
import { DeletedUserRepository } from './repository/deleted-users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DELETED_USER_COLLECTION_NAME,
  deletedUserSchema,
} from './schema/deleted-users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DELETED_USER_COLLECTION_NAME,
        schema: deletedUserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [DeletedUserService, DeletedUserRepository],
  exports: [DeletedUserService],
})
export class DeletedUserModule {}
