import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { envConfigurations } from '../../../../../env/env.configuration';

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
}
