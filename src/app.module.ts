import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { envConfigurations } from '../env/env.configuration';
import { UserModule } from './modules/user/user.module';
import { DeletedUserModule } from './modules/delete-user/delete-user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { HashModule } from './modules/common/hash/hash.module';
import { MailModule } from './modules/mail/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfigurations],
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: envConfigurations().mongodb.MONGO_URI,
      }),
    }),
    UserModule,
    DeletedUserModule,
    AuthModule,
    TokenModule,
    HashModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
