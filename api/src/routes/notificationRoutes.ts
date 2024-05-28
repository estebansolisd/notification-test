import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';

const notificationController = new NotificationController();
const router = Router();

router.post('/send', notificationController.sendNotification);

export { router as notificationRouter };
