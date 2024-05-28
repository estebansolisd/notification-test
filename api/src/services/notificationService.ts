import User from '../models/user';
import { CreateNotificationDto } from '../dto/notificationDto';
import { SMSNotification } from './smsNotification';
import { EmailNotification } from './emailNotification';
import { PushNotification } from './pushNotification';
import { CreateLogDto } from '../dto/logDto';
import { LogService } from './logService';

export class NotificationService {
  private smsNotification = new SMSNotification();
  private emailNotification = new EmailNotification();
  private pushNotification = new PushNotification();
  private logService = new LogService();


  async sendNotification(notificationDto: CreateNotificationDto): Promise<void> {
    const user = await User.findByPk(notificationDto.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const channels = user.channels;
    const messageType = notificationDto.messageType;
    const content = notificationDto.content;

    channels.forEach(channel => {
      if (channel === 'SMS') {
        this.smsNotification.send(user, content);
      } else if (channel === 'E-Mail') {
        this.emailNotification.send(user, content);
      } else if (channel === 'Push Notification') {
        this.pushNotification.send(user, content);
      }

      const newLog: CreateLogDto = {
        userId: user.id,
        userName: user.name,
        messageType,
        notificationType: channel,
        content,
        sentAt: new Date()
      }

      this.logService.createLog(newLog);
    });
  }
}
