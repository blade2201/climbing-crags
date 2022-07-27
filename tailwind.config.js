/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        8: '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
        16: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        white: {
          DEFAULT: 'rgba(255, 255, 255, 0.6)',
          high: 'rgba(255, 255, 255, 0.87)',
          true: '#fff',
        },
        primary: {
          100: 'rgba(112, 239, 222, 1)',
          300: '#00C4B4',
          400: 'rgba(0, 179, 166, 1)',
          600: 'rgba(1, 149, 146, 1)',
          700: 'rgba(1, 135, 134, 1)',
        },
        dark: {
          DEFAULT: 'rgba(41, 41, 41, 1)',
          card: 'rgba(51, 51, 51, 1)',
        },
      },
    },
  },
  plugins: [],
};
