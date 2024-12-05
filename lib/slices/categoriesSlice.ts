import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Category {
  id: string
  name: string
  budgetLimit: number
  type: 'income' | 'expense'
}

const initialState: Category[] = []

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      state.push({ ...action.payload, id: Date.now().toString() })
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.findIndex((category) => category.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return state.filter((category) => category.id !== action.payload)
    },
  },
})

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
export type CategoriesState = ReturnType<typeof categoriesSlice.reducer>


