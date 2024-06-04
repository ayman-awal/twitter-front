import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    tweetUser: null,
    singleTweetId: null,
    user: null
};


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
        state.posts = action.payload;
      },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    setSingleTweetId: (state, action) => {
      state.singleTweetId = action.payload;
    },
    setTweetUser: (state, action) => {
      state.tweetUser = action.payload;
    }
  },
});

export const { setPosts, addPost, setSingleTweetId, setTweetUser } = postsSlice.actions;

export default postsSlice.reducer;