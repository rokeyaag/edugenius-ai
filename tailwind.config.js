/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        themeRed: {
          light: '#ff4d4f',
          DEFAULT: '#e61e25',
          dark: '#b31217',
          deep: '#2a080c',
          bg: '#140608'
        },
        themeYellow: {
          light: '#fef08a',
          DEFAULT: '#facc15',
          dark: '#ca8a04',
          glow: '#fbbf24',
          tint: '#362402'
        },
        themeWhite: {
          DEFAULT: '#ffffff',
          dim: '#f8fafc',
          muted: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -4px rgba(230, 30, 37, 0.45)',
        'glow-yellow': '0 0 25px -4px rgba(250, 204, 21, 0.45)',
        'glow-white': '0 0 20px -3px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
