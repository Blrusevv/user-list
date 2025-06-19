import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersService, updateUser as updateUserService } from '../../services/userService';
import { UsersState } from './interfaces';
import { User } from '../../types/User';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void>('users/fetchUsers', async () => {
  return await fetchUsersService();
});

export const updateUser = createAsyncThunk<User, { id: number; data: Partial<User> }>('users/updateUser', async ({ id, data }) => {
  return await updateUserService(id, data);
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user));
      });
  },
});

export default userSlice.reducer; 