import { ILog } from '../interfaces/logInterface';

export class CreateLogDto implements ILog {
  userId!: number;
  userName!: string;
  messageType!: string;
  notificationType!: string;
  content!: string;
  sentAt!: Date;
}
