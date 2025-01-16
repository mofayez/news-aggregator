import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import preferencesService from './preferencesService.ts';

interface Preferences {
  id: number;
  user_id: number;
  preferred_sources: string[];
  preferred_categories: string[];
  preferred_authors: string[];
  created_at: string;
  updated_at: string;
}

interface PreferencesState {
  preferences: Preferences | null;
  loading: boolean;
  error: string | null;
}

const initialState: PreferencesState = {
  preferences: null,
  loading: false,
  error: null,
};

// Async thunk to fetch preferences
export const fetchPreferences = createAsyncThunk(
  'preferences/fetchPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await preferencesService.fetchPreferences();
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch preferences');
    }
  }
);

// Async thunk to save preferences
export const savePreferences = createAsyncThunk(
  'preferences/savePreferences',
  async (preferences: { preferred_sources: string[]; preferred_categories: string[]; preferred_authors: string[] }, { rejectWithValue }) => {
    try {
      const response = await preferencesService.savePreferences(preferences);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to save preferences');
    }
  }
);

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Preferences
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Save Preferences
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default preferencesSlice.reducer;