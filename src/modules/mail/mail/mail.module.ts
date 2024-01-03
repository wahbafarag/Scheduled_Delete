import { Module } from '@nestjs/common';
import { SendGridService } from './service/sendGrid.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { envConfigurations } from '../../../../env/env.configuration';
import { NodemailerAdapterService } from './service/nodemailer-adapter.service';
import { NodemailerService } from './service/nodemailer.service';
import { SendGridAdapterService } from './service/sendGrid-adapter.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: envConfigurations().mail.nodeMailer.host,
        port: envConfigurations().mail.nodeMailer.port || 465,
        secure: envConfigurations().mail.nodeMailer.secure || true,
        service: envConfigurations().mail.nodeMailer.service,
        auth: {
          user: envConfigurations().mail.nodeMailer.auth.user,
          pass: envConfigurations().mail.nodeMailer.auth.pass,
        },
      },
      defaults: {
        from: `"No Reply" - <${envConfigurations().mail.from}>`,
      },
    }),
  ],
  providers: [
    SendGridService,
    SendGridAdapterService,
    NodemailerService,
    NodemailerAdapterService,
  ],
  exports: [SendGridAdapterService, NodemailerAdapterService],
})
export class MailModule {}
