import api from './api';

export const fetchTasks = async () => {
  const response = await api.get('todos');
  return response.data;
};

export const updateTaskStatus = async (taskId: number, completed: boolean) => {
  const response = await api.patch(`todos/${taskId}`, { completed });
  return response.data;
}; 