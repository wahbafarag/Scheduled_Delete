import { Module } from '@nestjs/common';
import { NodeMailerModule } from '../nodemailer/node-mailer.module';
import { SendGridModule } from '../sendGrid/send-grid.module';
import { NodemailerAdapterService } from './adapters/nodemailer-adapter.service';
import { SendGridAdapterService } from './adapters/sendGrid-adapter.service';

@Module({
  imports: [NodeMailerModule, SendGridModule],
  providers: [NodemailerAdapterService, SendGridAdapterService],
  exports: [NodemailerAdapterService, SendGridAdapterService],
})
export class MailModule {}
