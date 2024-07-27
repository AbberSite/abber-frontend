const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './components/**/*.{js,vue,ts,tsx}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Readex Pro', ...defaultTheme.fontFamily.sans],
                      satoshi: ['Satoshi', 'sans-serif'],

            },
            scale: {
                flip: '-1',
            },
            screens: {
                xs: '414px', // iphone 6/7/8 plus
                '2xl': '1440px',
            },
            colors: {
        primary: '#030712',
        secondary: '#FFF2C1',
        light: '#111827',
        light2: '#1f2937',
        light3: '#374151',
      },
             
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
