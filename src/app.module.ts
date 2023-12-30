import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DeletedUsersModule } from './modules/deleted-users/deleted-users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './modules/token/token.module';
import { HashModule } from './modules/common/hash/hash.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
