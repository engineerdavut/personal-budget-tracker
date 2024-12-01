import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Income {
  description: string;
  amount: number;
  date: string;
}

const initialState: { items: Income[] } = {
  items: [],
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncome(state, action: PayloadAction<Income>) {
      state.items.push(action.payload);
    },
  },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
