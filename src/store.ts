import { configureStore } from '@reduxjs/toolkit';
import { taskRtkApi } from './services/taskRtkApi';

export const store = configureStore({
  reducer: {
    [taskRtkApi.reducerPath]: taskRtkApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskRtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
