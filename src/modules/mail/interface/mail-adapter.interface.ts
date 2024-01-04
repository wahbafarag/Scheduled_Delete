import { MailPayload } from './mail-payload.interface';

export interface IMailInterface {
  sendWelcomeEmail(payload: MailPayload): Promise<any>;

  sendAccountDeletionEmail(payload: MailPayload): Promise<any>;
}
