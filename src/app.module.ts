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
import { NodeMailerModule } from './modules/mail/node-mailer/node-mailer.module';
import { SendGridModule } from './modules/mail/send-grid/send-grid.module';

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
    NodeMailerModule,
    SendGridModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
