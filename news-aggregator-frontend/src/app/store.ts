import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import newsReducer from './features/news/newsSlice';
import preferencesReducer from './features/preferences/preferencesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    preferences: preferencesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
