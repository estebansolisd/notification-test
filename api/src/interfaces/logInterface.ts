export interface ILog {
  id?: number;
  userId: number;
  userName: string;
  messageType: string;
  notificationType: string;
  content: string;
  sentAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
