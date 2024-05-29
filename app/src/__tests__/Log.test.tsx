import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LogHistory from '@/components/LogHistory';
import { Log } from '@/types';

describe('LogHistory Component', () => {
  const mockLogs: Log[] = [
    {
      userId: 1,
      userName: 'John Doe',
      messageType: 'Sports',
      notificationType: 'Email',
      content: 'This is a test message',
      sentAt: new Date().toISOString(),
    },
    {
      userId: 2,
      userName: 'Jane Smith',
      messageType: 'Movies',
      notificationType: 'SMS',
      content: 'This is another test message',
      sentAt: new Date(1).toISOString(),
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders LogHistory component', () => {
    render(<LogHistory logs={mockLogs} />);
    expect(screen.getByText(/log history/i)).toBeInTheDocument();
  });

  it('displays the correct headers', () => {
    render(<LogHistory logs={mockLogs} />);
    const headers = ['User Id', 'User Name', 'Message Type', 'Notification Type', 'Message Content', 'Sent At'];
    headers.forEach(header => {
      expect(screen.getByText(new RegExp(header, 'i'))).toBeInTheDocument();
    });
  });

  it('displays logs correctly', () => {
    render(<LogHistory logs={mockLogs} />);
    mockLogs.forEach(log => {
      expect(screen.getByText(log.userId)).toBeInTheDocument();
      expect(screen.getByText(log.userName)).toBeInTheDocument();
      expect(screen.getByText(log.messageType)).toBeInTheDocument();
      expect(screen.getByText(log.notificationType)).toBeInTheDocument();
      expect(screen.getByText(log.content)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(new Date(log.sentAt).toLocaleString(), 'i'))).toBeInTheDocument();
    });
  });

  it('handles empty logs gracefully', () => {
    render(<LogHistory logs={[]} />);
    expect(screen.getByText(/log history/i)).toBeInTheDocument();
    // Optionally, you can check if there's a specific message or lack of rows
    expect(screen.queryByText(/no logs available/i)).toBeNull(); // Assuming no message for empty state
  });

});
