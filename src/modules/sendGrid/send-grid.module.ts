import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridService } from './service/sendGrid.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [SendGridService],
  exports: [SendGridService],
})
export class SendGridModule {}
