import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      LIVEKIT_API_KEY: 'process.env.LIVEKIT_API_KEY',
      LIVEKIT_API_SECRET: 'process.env.LIVEKIT_API_SECRET',
      'process.env.NODE_ENV': 'production',
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
