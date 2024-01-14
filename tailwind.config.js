/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        custom: 'calc(100vh - 175px)',
      },
    },
  },
  plugins: [],
};
