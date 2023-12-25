import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, userSchema } from './schemas/user.schema';
import { DeletedUsersModule } from '../deleted-users/deleted-users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_COLLECTION_NAME,
        schema: userSchema,
      },
    ]),
    DeletedUsersModule,
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
