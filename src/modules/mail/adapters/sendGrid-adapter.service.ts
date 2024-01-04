import { Injectable } from '@nestjs/common';
import { SendGridService } from '../../sendGrid/service/sendGrid.service';
import { IMailInterface } from '../interface/mail-adapter.interface';
import { MailPayload } from '../interface/mail-payload.interface';
import { envConfigurations } from '../../../../env/env.configuration';

@Injectable()
export class SendGridAdapterService implements IMailInterface {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendWelcomeEmail(payload: MailPayload) {
    await this.sendGrid.send({
      to: payload.email,
      from: envConfigurations().mail.from,
      subject: 'Welcome Email',
      text: `Welcome to the app, ${payload.username}. Enjoy!.`,
      // templateId: envConfigurations().mail.sendGrid.W_tempID,
      // dynamic_template_data: {
      //   subject: 'Welcome to Unknown App',
      //   text: `Welcome to the app, ${payload.username}. Let me know how you get along with the app.`,
      // },
    });
  }

  async sendAccountDeletionEmail(payload: MailPayload) {
    await this.sendGrid.send({
      to: payload.email,
      from: envConfigurations().mail.from,
      subject: 'Account Delete Request',
      text: `Your account is set to be deleted after 30 days, ${payload.username}.Come back soon!`,
      // templateId: envConfigurations().mail.sendGrid.A_tempID,
      // dynamic_template_data: {
      //   subject: 'Account Deleted',
      //   text: `Your account has been deleted, ${payload.username}. Let me know how you get along with the app.`,
      // },
    });
  }
}
