import { INotification } from '../interfaces/notificationInterface';

export class PushNotification implements INotification {
  send(user: any, message: string): void {
    console.log(`Sending Push Notification to ${user.name}: ${message}`);
  }
}
