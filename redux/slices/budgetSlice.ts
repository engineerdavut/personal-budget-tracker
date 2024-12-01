import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  name: string;
  limit: number;
  spent: number;
}

interface BudgetState {
  categories: Category[];
}

const initialState: BudgetState = {
  categories: [
    { name: 'Rent', limit: 1000, spent: 0 },
    { name: 'Food', limit: 500, spent: 0 },
    { name: 'Transportation', limit: 300, spent: 0 },
  ],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setCategoryLimit(
      state,
      action: PayloadAction<{ category: string; limit: number }>
    ) {
      const category = state.categories.find(
        (cat) => cat.name === action.payload.category
      );
      if (category) {
        category.limit = action.payload.limit;
      }
    },
    addSpent(
      state,
      action: PayloadAction<{ category: string; amount: number }>
    ) {
      const category = state.categories.find(
        (cat) => cat.name === action.payload.category
      );
      if (category) {
        category.spent += action.payload.amount;
      }
    },
  },
});

export const { setCategoryLimit, addSpent } = budgetSlice.actions;
export default budgetSlice.reducer;
