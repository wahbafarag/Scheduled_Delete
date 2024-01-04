import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridService } from './service/sendGrid.service';
import { SendGridAdapterService } from '../adpters/sendGrid-adapter.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [SendGridService, SendGridAdapterService],
  exports: [SendGridAdapterService],
})
export class SendGridModule {}
