import { Router } from 'express';
import { LogController } from '../controllers/logController';

const logController = new LogController();
const router = Router();

router.post('/', logController.createLog);

router.get('/', logController.getAllLogs);

router.get('/user/:userId', logController.getLogsByUserId);

export { router as logRouter };
