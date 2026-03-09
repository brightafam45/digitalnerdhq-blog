import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#180f41',
        accent: '#ef4d50',
        blue: {
          DEFAULT: '#4a90e2',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4a90e2',
          600: '#3b82f6',
          700: '#2563eb',
          800: '#1d4ed8',
          900: '#1e3a8a',
          950: '#172554',
        },
        surface: '#f6f7f7',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        ui: ['system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#180f41',
            a: {
              color: '#4a90e2',
              '&:hover': {
                color: '#ef4d50',
              },
            },
            h1: { fontFamily: 'Inter, sans-serif', fontWeight: '800' },
            h2: { fontFamily: 'Inter, sans-serif', fontWeight: '700' },
            h3: { fontFamily: 'Inter, sans-serif', fontWeight: '600' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
