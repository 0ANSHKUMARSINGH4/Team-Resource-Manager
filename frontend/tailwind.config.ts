import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#A5B4FC',
        dark: '#1E1E2F',
        light: '#F3F4F6',
      },
    },
  },
  plugins: [],
}

export default config
