import { Injectable } from '@nestjs/common';
import { IMailInterface } from '../interface/mail-adapter.interface';
import { NodemailerService } from '../node-mailer/service/nodemailer.service';
import { MailPayload } from '../interface/mail-payload.interface';
import { envConfigurations } from '../../../../env/env.configuration';

@Injectable()
export class NodemailerAdapterService implements IMailInterface {
  constructor(private readonly nodemailer: NodemailerService) {}

  async sendWelcomeEmail(payload: MailPayload) {
    await this.nodemailer.sendEmail({
      to: payload.email,
      from: envConfigurations().mail.from,
      subject: 'Welcome to Unknown App',
      text: `Welcome to the app, ${payload.username}. Let me know how you get along with the app.`,
      // template: './templates/welcome',
      // context: {
      //   username: payload.username,
      // },
    });
  }

  async sendAccountDeletionEmail(payload: MailPayload) {
    await this.nodemailer.sendEmail({
      to: payload.email,
      from: envConfigurations().mail.from,
      subject: 'Account deletion',
      text: `Your account is set to be deleted after 30 days ${payload.username}. come back soon mf!`,
      // template: './templates/account-deletion',
      // context: {
      //   username: payload.username,
      // },
    });
  }
}
