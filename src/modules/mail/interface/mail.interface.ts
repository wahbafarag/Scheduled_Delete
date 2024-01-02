import { MailPayload } from '../dto/mail-payload.dto';

export interface IMailInterface {
  sendWelcomeEmail(payload: MailPayload): Promise<any>;

  sendAccountDeletionEmail(payload: MailPayload): Promise<any>;
}
