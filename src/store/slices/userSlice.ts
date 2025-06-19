import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersService } from '../../services/userService';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await fetchUsersService();
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null as string | null,
  },
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