import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersService, updateUser as updateUserService } from '../../services/userService';
import { UsersState } from './interfaces';
import { User } from '../../types/User';
import { getStoredUsers, setStoredUsers } from '../../utils';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  updateLoading: false,
};

export const fetchUsers = createAsyncThunk<User[], void>('users/fetchUsers', async () => {
  const users = await fetchUsersService();
  const storedUsers = getStoredUsers();
  
  if (storedUsers) {
    return users.map((user: User) => {
      const storedUser = storedUsers.find(u => u.id === user.id);
      return storedUser ? { ...user, ...storedUser } : user;
    });
  }
  
  return users;
});

export const fetchUserById = createAsyncThunk<User, number>('users/fetchUserById', async (id) => {
  const users = await fetchUsersService();
  const user = users.find((user: User) => user.id === id);
  if (!user) console.log('User not found');
  return user;
});

export const updateUser = createAsyncThunk<User, { id: number; data: any }>('users/updateUser', async ({ id, data }) => {
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
        setStoredUsers(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user: User) => user.id === action.payload.id);
        if (index >= 0) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
        setStoredUsers(state.users);
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user: User) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user));
        state.updateLoading = false;
        setStoredUsers(state.users);
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});

export default userSlice.reducer; 