import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Category {
  id: string
  name: string
  budgetLimit: number
}

const initialState: Category[] = []

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      state.push({ ...action.payload, id: Date.now().toString() })
    },
    updateCategory: (state, action: PayloadAction<{ id: string; budgetLimit: number }>) => {
      const index = state.findIndex((category) => category.id === action.payload.id)
      if (index !== -1) {
        state[index].budgetLimit = action.payload.budgetLimit
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return state.filter((category) => category.id !== action.payload)
    },
  },
})

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer

