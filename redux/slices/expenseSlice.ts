import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  description: string;
  amount: number;
  category: string;
  date: string;
}

const initialState: { items: Expense[] } = {
  items: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.items.push(action.payload);
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
