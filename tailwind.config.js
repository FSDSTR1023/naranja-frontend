/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/keep-react/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [import('keep-react/preset')],
  theme: {
    extend: {
      height: {
        custom: 'calc(100vh - 175px)',
      },
    },
  },
  plugins: [],
};
