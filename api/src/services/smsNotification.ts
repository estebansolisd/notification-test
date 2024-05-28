import { INotification } from '../interfaces/notificationInterface';

export class SMSNotification implements INotification {
  send(user: any, message: string): void {
    console.log(`Sending SMS to ${user.phoneNumber}: ${message}`);
  }
}
