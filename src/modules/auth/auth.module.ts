import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { DeletedUserModule } from '../delete-user/delete-user.module';
import { LoginService } from './service/login.service';
import { SignupService } from './service/signup.service';
import { AccessStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { RefreshStrategy } from './strategy/refresh.strategy';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail/mail.module';

@Module({
  imports: [UserModule, DeletedUserModule, TokenModule, MailModule],
  providers: [
    LoginService,
    SignupService,
    AccessStrategy,
    LocalStrategy,
    RefreshStrategy,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
