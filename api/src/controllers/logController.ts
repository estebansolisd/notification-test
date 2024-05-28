import { Request, Response } from 'express';
import { LogService } from '../services/logService';
import { CreateLogDto } from '../dto/logDto';
import { ILog } from '../interfaces/logInterface';

export class LogController {
  private logService = new LogService();

  createLog = async (req: Request, res: Response): Promise<void> => {
    try {
      const createLogDto: CreateLogDto = req.body;
      const log: ILog = await this.logService.createLog(createLogDto);
      res.status(201).json(log);
    } catch (error) {
      res.status(500).json({ message: (error as Record<string, string>).message });
    }
  };

  getAllLogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const logs: ILog[] = await this.logService.getAllLogs();
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: (error as Record<string, string>).message });
    }
  };

  getLogsByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);
      const logs: ILog[] = await this.logService.getLogsByUserId(userId);
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: (error as Record<string, string>).message });
    }
  };
}
