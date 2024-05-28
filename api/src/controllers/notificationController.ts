import { Request, Response } from "express";
import { NotificationService } from "../services/notificationService";
import { CreateNotificationDto } from "../dto/notificationDto";

export class NotificationController {
  private notificationService = new NotificationService();

  sendNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      const createNotificationDto: CreateNotificationDto = req.body;
      await this.notificationService.sendNotification(createNotificationDto);
      res.status(200).json({ message: "Notification sent" });
    } catch (error) {
      res.status(500).json({ message: (error as Record<string, string>).message });
    }
  };
}
