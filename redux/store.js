import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import bookmarksSlice from "./slices/bookmarksSlice";

const store = configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer,
      bookmarks: bookmarksSlice
    },
  });
  
export default store;

