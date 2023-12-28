import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DeletedUsersModule } from './modules/deleted-users/deleted-users.module';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
