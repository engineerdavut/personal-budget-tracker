import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
  categoryId: string;
  type: 'income' | 'expense'
}

const initialState: Transaction[] = []

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.push({ ...action.payload, id: Date.now().toString() })
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      return state.filter((transaction) => transaction.id !== action.payload)
    },
  },
})

export const { addTransaction, deleteTransaction } = transactionsSlice.actions
export default transactionsSlice.reducer
