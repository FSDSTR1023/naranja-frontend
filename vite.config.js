import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      ...loadEnv('', process.cwd()),
      return: 'process.env',
    },
  },

  test: {
    environment: 'happy-dom',
  },
});
