import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async thunks
export const sendOTP = createAsyncThunk('auth/sendOTP', async (phone, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/send-otp', { phone });
    return { ...data, phone };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async ({ phone, otp }, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/verify-otp', { phone, otp });
    if (data.token && typeof window !== 'undefined') {
      localStorage.setItem('uzgo_token', data.token);
      localStorage.setItem('uzgo_user', JSON.stringify(data.user));
    }
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    return await api.get('/auth/profile');
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, { rejectWithValue }) => {
  try {
    return await api.put('/auth/profile', data);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const getInitialUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const storedUser = localStorage.getItem('uzgo_user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('uzgo_token') || null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
    token: getInitialToken(),
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('uzgo_token') : false,
    loading: false,
    otpSent: false,
    pendingPhone: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.pendingPhone = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('uzgo_token');
        localStorage.removeItem('uzgo_user');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetOTP: (state) => {
      state.otpSent = false;
      state.pendingPhone = null;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('uzgo_token', action.payload.token);
        localStorage.setItem('uzgo_user', JSON.stringify(action.payload.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // sendOTP
      .addCase(sendOTP.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.pendingPhone = action.payload.phone;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // verifyOTP
      .addCase(verifyOTP.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpSent = false;
        state.pendingPhone = null;
        if (typeof window !== 'undefined') {
          localStorage.setItem('uzgo_user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchProfile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem('uzgo_user', JSON.stringify(action.payload.user));
        }
      })
      // updateProfile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem('uzgo_user', JSON.stringify(action.payload.user));
        }
      });
  },
});

export const { logout, clearError, resetOTP, setAuth } = authSlice.actions;
export default authSlice.reducer;
