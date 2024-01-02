import { Injectable } from '@nestjs/common';
import { SendGridService } from './sendGrid.service';
import { IMailInterface } from '../interface/mail.interface';
import { MailPayload } from '../dto/mail-payload.dto';

@Injectable()
export class SendGridAdapterService implements IMailInterface {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendWelcomeEmail(payload: MailPayload) {
    await this.sendGrid.sendWelcomeEmail({
      email: payload.email,
      username: payload.username,
    });
  }

  async sendAccountDeletionEmail(payload: MailPayload) {
    await this.sendGrid.sendAccountDeletedEmail({
      email: payload.email,
      username: payload.username,
    });
  }
}
