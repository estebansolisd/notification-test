import { Request, Response } from "express";
import { NotificationController } from "../../controllers/notificationController";
import { NotificationService } from "../../services/notificationService";

jest.mock("../../services/notificationService");

describe("NotificationController", () => {
  let notificationController: NotificationController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    notificationController = new NotificationController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendNotification", () => {
    it("should send notification and return 200 status with message", async () => {
      const mockSendNotificationDto = {
        userId: "123",
        messageType: "Sports",
        content: "Sample content",
        notificationType: "Email",
      };

      mockRequest.body = mockSendNotificationDto as any; // Simulate request body

      await notificationController.sendNotification(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Notification sent" });
    });

  });
});
