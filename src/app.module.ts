import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DeletedUsersModule } from './modules/deleted-users/deleted-users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './modules/token/token.module';
import { HashModule } from './modules/common/hash/hash.module';
import { ConfigModule } from '@nestjs/config';
import { envConfigurations } from '../env/env.configuration';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfigurations],
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    UsersModule,
    AuthModule,
    DeletedUsersModule,
    TokenModule,
    HashModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
