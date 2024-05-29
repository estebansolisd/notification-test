import { Request, Response } from 'express';
import { LogController } from '../../controllers/logController';
import { LogService } from '../../services/logService';
import { ILog } from '../../interfaces/logInterface';

jest.mock('../../services/logService');

describe('LogController', () => {
  let logController: LogController;
  let logService: jest.Mocked<LogService>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    logController = new LogController();
    logService = new LogService() as jest.Mocked<LogService>;
    logController['logService'] = logService;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLog', () => {
    it('should create a log and return 201 status', async () => {
      const mockRequest = {
        body: {
          userId: 1,
          messageType: 'Test',
          notificationType: 'Email',
          content: 'Test Content',
          sentAt: new Date().toISOString()
        }
      } as Partial<Request>;

      const mockLog: ILog = {
        id: 1,
        ...mockRequest.body
      };

      logService.createLog.mockResolvedValue(mockLog);

      await logController.createLog(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLog);
      expect(logService.createLog).toHaveBeenCalledWith(mockRequest.body);
    });

    it('should handle errors and return 500 status', async () => {
      const mockRequest = {
        body: {}
      } as Partial<Request>;

      const mockError = new Error('Test Error');

      logService.createLog.mockRejectedValue(mockError);

      await logController.createLog(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('getAllLogs', () => {
    it('should return all logs and return 200 status', async () => {
      const mockLogs: ILog[] = [
        { id: 1, userId: 1, userName:"Example 1", messageType: 'Test', notificationType: 'Email', content: 'Test Content', sentAt: new Date() },
        { id: 2, userId: 2, userName: "Example 2", messageType: 'Test2', notificationType: 'SMS', content: 'Test Content 2', sentAt: new Date(1) }
      ];

      logService.getAllLogs.mockResolvedValue(mockLogs);

      await logController.getAllLogs({} as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLogs);
      expect(logService.getAllLogs).toHaveBeenCalled();
    });

    it('should handle errors and return 500 status', async () => {
      const mockError = new Error('Test Error');

      logService.getAllLogs.mockRejectedValue(mockError);

      await logController.getAllLogs({} as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('getLogsByUserId', () => {
    it('should return logs by user id and return 200 status', async () => {
      const mockRequest = {
        params: {
          userId: '1'
        }
      } as Partial<Request>;

      const mockLogs: ILog[] = [
        { id: 1, userId: 1, userName: "Example 1", messageType: 'Test', notificationType: 'Email', content: 'Test Content', sentAt: new Date() }
      ];

      logService.getLogsByUserId.mockResolvedValue(mockLogs);

      await logController.getLogsByUserId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLogs);
      expect(logService.getLogsByUserId).toHaveBeenCalledWith(1);
    });

    it('should handle errors and return 500 status', async () => {
      const mockRequest = {
        params: {
          userId: '1'
        }
      } as Partial<Request>;

      const mockError = new Error('Test Error');

      logService.getLogsByUserId.mockRejectedValue(mockError);

      await logController.getLogsByUserId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });
});
