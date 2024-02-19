import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      ...loadEnv('', process.cwd()),
      NODE_ENV: process.env.NODE_ENV,
      LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY,
      LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET,
      PUBLIC_LIVEKIT_URL: process.env.PUBLIC_LIVEKIT_URL,
    },
  },

  test: {
    environment: 'happy-dom',
  },
});
