import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import newsService from './newsService';

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  source: string;
  category: string;
  author: string | null;
  url: string;
  image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface NewsState {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  selectedAuthor: string;
  selectedSource: string;
  selectedCategory: string;
  selectedDate: string | '';
  query: string;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  currentPage: 1,
  totalPages: 1,
  selectedAuthor: '',
  selectedSource: '',
  selectedCategory: '',
  selectedDate: '',
  query: '',
  loading: false,
  error: null,
};

// Async thunk to fetch news articles with filters
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (
    { page, author, category, source, date, query }: { page: number; author?: string; category?: string; source?: string; date?: string; query?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await newsService.fetchNews(page, author, category, source, date, query);
      return response; // The API response is nested under `data`
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // Reset articles when filters change
    resetArticles(state) {
      state.articles = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
    setSelectedAuthor(state, action: PayloadAction<string>) {
      state.selectedAuthor = action.payload;
      state.currentPage = 1;
    },
    setSelectedSource(state, action: PayloadAction<string>) {
      state.selectedSource = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setSelectedDate(state, action: PayloadAction<string | ''>) {
      state.selectedDate = action.payload;
      state.currentPage = 1;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.current_page === 1) {
          // Replace articles for the first page
          state.articles = action.payload.data;
        } else {
          state.articles = [...state.articles, ...action.payload.data];
        }        
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.last_page;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, resetArticles, setSelectedAuthor, setSelectedSource, setSelectedCategory, setSelectedDate, setQuery } = newsSlice.actions;
export default newsSlice.reducer;
