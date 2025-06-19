import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersService } from '../../services/userService';
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
      });
  },
});

export default userSlice.reducer; 