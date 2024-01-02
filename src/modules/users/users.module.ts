import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repository/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, userSchema } from './schema/user.schema';
import { IsEmailAlreadyExistConstraint } from './decorators/email-custom-decorator.decorator';
import { IsUsernameAlreadyExistConstraint } from './decorators/username_custom-decorator.decorator';
import { DeletedUsersModule } from '../deleted-users/deleted-users.module';
import { MailModule } from '../mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN_MS },
    }),
    MongooseModule.forFeature([
      {
        name: USER_COLLECTION_NAME,
        schema: userSchema,
      },
    ]),
    DeletedUsersModule,
    MailModule,
  ],
  exports: [UsersService],
  providers: [
    UsersService,
    UserRepository,
    IsEmailAlreadyExistConstraint,
    IsUsernameAlreadyExistConstraint,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
