import { INotification } from '../interfaces/notificationInterface';

export class EmailNotification implements INotification {
  send(user: any, message: string): void {
    console.log(`Sending Email to ${user.email}: ${message}`);
  }
}