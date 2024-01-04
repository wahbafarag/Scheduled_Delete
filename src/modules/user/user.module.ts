import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, userSchema } from './schema/user.schema';
import { DeletedUserModule } from '../delete-user/delete-user.module';
import {
  IsEmailAlreadyExistConstraint,
  IsUsernameAlreadyExistConstraint,
} from './decorators/custom.decorators';
import { SendGridModule } from '../mail/send-grid/send-grid.module';
import { NodeMailerModule } from '../mail/node-mailer/node-mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_COLLECTION_NAME,
        schema: userSchema,
      },
    ]),
    DeletedUserModule,
    SendGridModule,
    NodeMailerModule,
  ],
  providers: [
    UserService,
    UserRepository,
    IsEmailAlreadyExistConstraint,
    IsUsernameAlreadyExistConstraint,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
