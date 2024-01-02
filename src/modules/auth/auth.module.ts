import { Module } from '@nestjs/common';
import { LoginService } from './service/login.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { DeletedUsersModule } from '../deleted-users/deleted-users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SignupService } from './service/signup.service';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [UsersModule, DeletedUsersModule, TokenModule, MailModule],
  providers: [LoginService, SignupService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
