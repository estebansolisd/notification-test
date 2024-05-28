export interface Log {
  id: number;
  category: string;
  message: string;
  timestamp: string;
}

export interface MessageForm {
  category: string;
  message: string;
}
