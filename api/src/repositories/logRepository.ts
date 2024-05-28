import Log from '../models/log';

export class LogRepository {
  async createLog(newLog: Partial<Log>): Promise<Log> {
    const log = await Log.create(newLog);
    return log;
  }

  async getAllLogs(): Promise<Log[]> {
    return await Log.findAll();
  }

  async getLogsByUserId(userId: number): Promise<Log[]> {
    return await Log.findAll({ where: { userId } });
  }
}
