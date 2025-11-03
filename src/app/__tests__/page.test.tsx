import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from '../page';

// Mock Zustand store
jest.mock('@/store/tasksStore', () => {
  const tasks = [
    { id: 1, title: 'Learn Tailwind', completed: false },
    { id: 2, title: 'Setup Zustand', completed: true },
  ];
  const addTask = jest.fn();
  const toggleTask = jest.fn();
  return {
    useTasksStore: jest.fn(() => ({ tasks, addTask, toggleTask })),
  };
});

describe('Page component', () => {
  it('renders tasks from mock API', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    // Initially shows loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for tasks to appear after mock fetch resolves
    await waitFor(() => {
      expect(screen.getByText(/learn tailwind/i)).toBeInTheDocument();
      expect(screen.getByText(/setup zustand/i)).toBeInTheDocument();
    });
  });
});
