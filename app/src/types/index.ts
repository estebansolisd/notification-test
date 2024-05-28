export interface Log {
  userId: number;
  userName: string;
  messageType: string;
  notificationType: string;
  content: string;
  sentAt: string;
}

export interface MessageForm {
  category: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
}