import Log from "../models/log";
import { CreateLogDto } from "../dto/logDto";
import { ILog } from "../interfaces/logInterface";
import { LogRepository } from "../repositories/logRepository";

export class LogService {
  private logRepository: LogRepository;

  constructor() {
    this.logRepository = new LogRepository();
  }

  async createLog(createLogDto: CreateLogDto): Promise<ILog> {
    const log = await this.logRepository.createLog(createLogDto);
    return log;
  }

  async getAllLogs(): Promise<ILog[]> {
    return await this.logRepository.getAllLogs();
  }

  async getLogsByUserId(userId: number): Promise<ILog[]> {
    return await this.logRepository.getLogsByUserId(userId);
  }
}
