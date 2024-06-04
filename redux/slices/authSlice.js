import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  username: null,
  name: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.username = "@" + action.payload.username;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
