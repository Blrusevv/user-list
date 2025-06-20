import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks as fetchTasksService, updateTaskStatus as updateTaskStatusService } from '../../services/taskService';
import { Task } from '../../types/Task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updatingTaskIds: number[];
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  updateLoading: false,
  updatingTaskIds: [],
};

export const fetchTasks = createAsyncThunk<Task[], void>('tasks/fetchTasks', async () => {
  return await fetchTasksService();
});

export const updateTaskStatus = createAsyncThunk<Task, { taskId: number; completed: boolean }>('tasks/updateTaskStatus', async ({ taskId, completed }) => {
  return await updateTaskStatusService(taskId, completed);
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(updateTaskStatus.pending, (state, action) => {
        const taskId = action.meta.arg.taskId;
        if (!state.updatingTaskIds.includes(taskId)) {
          state.updatingTaskIds.push(taskId);
        }
        state.updateLoading = true;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task));
        state.updatingTaskIds = state.updatingTaskIds.filter(id => id !== updatedTask.id);
        state.updateLoading = false;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        const taskId = action.meta.arg.taskId;
        state.updatingTaskIds = state.updatingTaskIds.filter(id => id !== taskId);
        state.updateLoading = false;
      });
  },
});

export default taskSlice.reducer; 