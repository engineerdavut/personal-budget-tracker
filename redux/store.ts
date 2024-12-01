import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './slices/incomeSlice';
import expenseReducer from './slices/expenseSlice';
import budgetReducer from './slices/budgetSlice';

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expenseReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
