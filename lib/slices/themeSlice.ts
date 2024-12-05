import { createSlice } from '@reduxjs/toolkit'

interface ThemeStateInterface {
  darkMode: boolean
}

const initialState: ThemeStateInterface = {
  darkMode: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
  },
})

export const { toggleDarkMode } = themeSlice.actions
export default themeSlice.reducer
export type ThemeState = ReturnType<typeof themeSlice.reducer>




