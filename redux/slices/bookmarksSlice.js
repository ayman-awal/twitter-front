import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookmarks: []
};


const bookmarksSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
        state.bookmarks = action.payload;
      },
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action) => {
        state.bookmarks = state.bookmarks.filter(bookmark => bookmark !== action.payload);
    }
  },
});

export const { setBookmarks, addBookmark, removeBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;