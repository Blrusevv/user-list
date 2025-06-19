import api from './api';

export const fetchUsers = async () => {
  const response = await api.get('users');
  return response.data;
};

export const updateUser = async (id: number, data: any) => {
  const response = await api.patch(`users/${id}`, data);
  return response.data;
}; 