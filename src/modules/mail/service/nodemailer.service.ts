import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { envConfigurations } from '../../../../env/env.configuration';
import { MailPayload } from '../dto/mail-payload.dto';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(payload: MailPayload) {
    await this.mailerService.sendMail({
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
    console.log('sending account deletion email', payload.email);
    await this.mailerService.sendMail({
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
