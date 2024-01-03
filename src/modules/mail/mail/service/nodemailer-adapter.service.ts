import { Injectable } from '@nestjs/common';
import { IMailInterface } from '../interface/mail.interface';
import { NodemailerService } from './nodemailer.service';
import { MailPayload } from '../interface/mail-payload.interface';

@Injectable()
export class NodemailerAdapterService implements IMailInterface {
  constructor(private readonly nodemailer: NodemailerService) {}

  async sendWelcomeEmail(payload: MailPayload) {
    await this.nodemailer.sendWelcomeEmail({
      email: payload.email,
      username: payload.username,
    });
  }

  async sendAccountDeletionEmail(payload: MailPayload) {
    await this.nodemailer.sendAccountDeletionEmail({
      email: payload.email,
      username: payload.username,
    });
  }
}
