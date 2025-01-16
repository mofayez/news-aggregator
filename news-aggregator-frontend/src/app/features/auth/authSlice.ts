import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

interface User {
  email: string;
  token: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
  validationErrors: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, password_confirmation }: { name: string; email: string; password: string; password_confirmation: string }, { rejectWithValue }) => {
    try {
      const response = await authService.register(name, email, password, password_confirmation);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string, errors?: string[] } } };
      return rejectWithValue(err.response?.data?.errors || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.validationErrors = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.validationErrors = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.validationErrors = action.payload as ValidationErrors;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;