import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer, { TransactionsState } from './slices/transactionsSlice'
import categoriesReducer, { CategoriesState } from './slices/categoriesSlice'
import themeReducer, { ThemeState } from './slices/themeSlice'
import { localStorageMiddleware } from './localStorageMiddleware'

export interface RootState {
  transactions: TransactionsState
  categories: CategoriesState
  theme: ThemeState
}

const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('reduxState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState) as RootState
  } catch (err) {
    return undefined
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    theme: themeReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type AppDispatch = typeof store.dispatch

