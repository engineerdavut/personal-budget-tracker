module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f8f9fa',
          dark: '#1a202c',
        },
        text: {
          light: '#1a202c',
          dark: '#f8f9fa',
        },
      },
    },
  },
  plugins: [],
}

