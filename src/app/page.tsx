'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTasksStore } from '@/store/tasksStore';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Mock API
const fetchTasks = async (): Promise<Task[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, title: 'Learn Tailwind', completed: false },
          { id: 2, title: 'Setup Zustand', completed: true },
        ]),
      500
    )
  );

export default function Page() {
  const { tasks, addTask, toggleTask } = useTasksStore();

  const { data: apiTasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // ✅ Use effect to safely update Zustand store after data is fetched
  useEffect(() => {
    if (apiTasks && tasks.length === 0) {
      apiTasks.forEach(addTask);
    }
  }, [apiTasks, tasks.length, addTask]);

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks Widget</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded-lg shadow ${task.completed ? 'bg-green-200' : 'bg-gray-200'}`}
          >
            <label className="flex items-center space-x-2 cursor-pointer text-black">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="accent-green-500"
              />
              <span>{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
