import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { envConfigurations } from '../../../../../env/env.configuration';
import { MailPayload } from '../interface/mail-payload.interface';

@Injectable()
export class SendGridService {
  constructor() {
    SendGrid.setApiKey(envConfigurations().mail.sendGrid.apiKey);
    SendGrid.setSubstitutionWrappers('{{', '}}');
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log('email sent to ', mail.to);
    return transport;
  }

  async sendWelcomeEmail(payload: MailPayload) {
    const mailData = {
      to: payload.email,
      from: envConfigurations().mail.from,
      subject: 'Welcome Email',
      text: `Welcome to the app, ${payload.username}. Enjoy!.`,
      // templateId: envConfigurations().mail.sendGrid.W_tempID,
      // dynamic_template_data: {
      //   subject: 'Welcome to Unknown App',
      //   text: `Welcome to the app, ${payload.username}. Let me know how you get along with the app.`,
      // },
    };
    return await this.send(mailData);
  }

  async sendAccountDeletedEmail(payload: MailPayload) {
    const mailData = {
      to: payload.email,
      from: envConfigurations().mail.from,
      subject: 'Account Delete Request',
      text: `Your account is set to be deleted after 30 days, ${payload.username}.Come back soon!`,
      // templateId: envConfigurations().mail.sendGrid.A_tempID,
      // dynamic_template_data: {
      //   subject: 'Account Deleted',
      //   text: `Your account has been deleted, ${payload.username}. Let me know how you get along with the app.`,
      // },
    };
    return await this.send(mailData);
  }
}
