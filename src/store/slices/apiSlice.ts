import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../../types/Task';

const getStoredTasks = (): Task[] | null => {
  try {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setStoredTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    timeout: 5000
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'todos',
      providesTags: ['Task'],
      transformResponse: (response: Task[]) => {
        const storedTasks = getStoredTasks();
        if (storedTasks) {
          return response.map(task => {
            const storedTask = storedTasks.find(t => t.id === task.id);
            return storedTask ? { ...task, ...storedTask } : task;
          });
        }
        return response;
      },
    }),
    updateTaskStatus: builder.mutation<Task, { taskId: number; completed: boolean }>({
      query: ({ taskId, completed }) => ({
        url: `todos/${taskId}`,
        method: 'PATCH',
        body: { completed },
      }),
      async onQueryStarted({ taskId, completed }, { dispatch, queryFulfilled, getState }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
            const task = draft.find(t => t.id === taskId);
            if (task) {
              task.completed = completed;
            }
          })
        );
        
        const state = getState() as any;
        const tasks = state.api.queries['getTasks()']?.data;
        if (tasks) {
          setStoredTasks(tasks);
        }
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          const state = getState() as any;
          const tasks = state.api.queries['getTasks()']?.data;
          if (tasks) {
            setStoredTasks(tasks);
          }
        }
      },
    }),
  }),
});

export const { useGetTasksQuery, useUpdateTaskStatusMutation } = apiSlice; 