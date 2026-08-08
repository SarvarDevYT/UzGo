import { createSlice } from '@reduxjs/toolkit';

const getUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('uzgo_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const getTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('uzgo_token') || null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('uzgo_user', JSON.stringify(user));
        localStorage.setItem('uzgo_token', token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('uzgo_user');
        localStorage.removeItem('uzgo_token');
      }
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('uzgo_user', JSON.stringify(state.user));
        }
      }
    }
  },
});

export const { setCredentials, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
