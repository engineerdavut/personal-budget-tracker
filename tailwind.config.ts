module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        light: '#ffffff',
        dark: '#1a202c',
      },
      textColor: {
        light: '#1a202c',
        dark: '#ffffff',
      },
    },
  },
  plugins: [],
}

