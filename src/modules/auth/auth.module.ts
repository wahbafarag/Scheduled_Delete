import { Module } from '@nestjs/common';
import { LoginService } from './service/login.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { DeletedUsersModule } from '../deleted-users/deleted-users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SignupService } from './service/signup.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    DeletedUsersModule,
  ],
  providers: [LoginService, SignupService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
