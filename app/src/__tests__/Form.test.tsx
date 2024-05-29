import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import Form from '@/components/Form';
import axios from '@/utils/axiosInstance';
import { User } from '@/types';

vi.mock('@/utils/axiosInstance');

describe('Form Component', () => {
  const mockFetchLogs = vi.fn();
  const mockUsers: User[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders the form', async () => {
    render(<Form fetchLogs={mockFetchLogs} />);
    await waitFor(() => expect(screen.getByLabelText(/user/i)).toBeInTheDocument())
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('fetches and displays users', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });
    render(<Form fetchLogs={mockFetchLogs} />);

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/users'));
    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());

    mockUsers.forEach(user => {
      expect(screen.getByRole('option', { name: user.name })).toBeInTheDocument();
    });
  });

  test('handles form submission with valid input', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });
    (axios.post as Mock).mockResolvedValueOnce({});

    render(<Form fetchLogs={mockFetchLogs} />);

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Sports' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/notifications/send', {
      messageType: 'Sports',
      content: 'This is a test message',
      userId: '1',
    }));

    expect(mockFetchLogs).toHaveBeenCalled();
  });

  test('shows an alert when form is submitted with empty fields', () => {
    window.alert = vi.fn();

    render(<Form fetchLogs={mockFetchLogs} />);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(window.alert).toHaveBeenCalledWith('You should select all the fields');
  });

  test('resets form after successful submission', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });
    (axios.post as Mock).mockResolvedValueOnce({});

    render(<Form fetchLogs={mockFetchLogs} />);

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Sports' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByLabelText(/user/i)).toHaveValue(''));
    await waitFor(() => expect(screen.getByLabelText(/category/i)).toHaveValue(''));
    await waitFor(() => expect(screen.getByLabelText(/message/i)).toHaveValue(''));
  });

  test('displays error message when fetching users fails', async () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    (axios.get as Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<Form fetchLogs={mockFetchLogs} />);

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());
    await waitFor(() => expect(consoleErrorMock).toHaveBeenCalledWith(expect.any(Error), 'error loading users'));
    consoleErrorMock.mockRestore();
    
  });

  test('does not submit the form if a field is empty', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });

    render(<Form fetchLogs={mockFetchLogs} />);

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Sports' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(axios.post).not.toHaveBeenCalled());
  });

  test('displays loading state when fetching users', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });

    render(<Form fetchLogs={mockFetchLogs} />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());
  });

  test('displays error message when sending message fails', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });
    (axios.post as Mock).mockRejectedValueOnce(new Error('Network error'));

    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Form fetchLogs={mockFetchLogs} />);

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Sports' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(consoleErrorMock).toHaveBeenCalledWith('Error sending message:', expect.any(Error)));

    consoleErrorMock.mockRestore();
  });

  test('clears error message after successful submission', async () => {
    (axios.get as Mock).mockResolvedValueOnce({ data: mockUsers });
    (axios.post as Mock).mockRejectedValueOnce(new Error('Network error'));
    (axios.post as Mock).mockResolvedValueOnce({});

    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Form fetchLogs={mockFetchLogs} />);

    await waitFor(() => expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Sports' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(consoleErrorMock).toHaveBeenCalledWith('Error sending message:', expect.any(Error)));
    consoleErrorMock.mockReset(); 

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(consoleErrorMock).not.toHaveBeenCalled());
    consoleErrorMock.mockRestore();
  });
});
