import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts as getUserPostsService } from '../../services/userService';
import { Post } from '../../types/Post';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchUserPosts = createAsyncThunk<Post[], number>('posts/fetchUserPosts', async (userId) => {
  return await getUserPostsService(userId);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const { id, data } = action.payload;
      state.posts = state.posts.map((post) => (post.id === id ? { ...post, ...data } : post));
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export const { updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer; 