import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { envConfigurations } from '../../../env/env.configuration';
import { NodemailerService } from './service/nodemailer.service';

@Module({
  imports: [
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
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodeMailerModule {}
