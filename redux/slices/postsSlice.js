import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    tweetUser: null,
    singleTweetId: null,
    user: null,
    clickedUser: null
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
    },
    setClickedUser: (state, action) => {
      state.clickedUser = action.payload;
    }
  },
});

export const { setPosts, addPost, setSingleTweetId, setTweetUser, setClickedUser } = postsSlice.actions;

export default postsSlice.reducer;