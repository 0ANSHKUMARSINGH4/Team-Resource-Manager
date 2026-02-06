/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- This enables the Dark Mode feature
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Your brand purple
        secondary: '#A5B4FC',
        dark: '#1E1E2F',
        light: '#F3F4F6'
      }
    },
  },
  plugins: [],
}