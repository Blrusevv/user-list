import api from './api';

export const fetchUsers = async () => {
  const response = await api.get('users');
  return response.data;
};

export const updateUser = async (userId: number, data: any) => {
  const response = await api.patch(`users/${userId}`, data);
  return response.data;
};

export const getUserPosts = async (userId: number) => {
  const response = await api.get('posts', { params: { userId } });
  return response.data;
}; 