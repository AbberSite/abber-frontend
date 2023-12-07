const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '414px', // iphone 6/7/8 plus
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}