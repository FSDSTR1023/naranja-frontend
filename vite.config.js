import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_PUBLIC_LK_SERVER_URL: JSON.stringify(
        process.env.VITE_PUBLIC_LK_SERVER_URL ||
          'wss://team-chat-app-7keim926.livekit.cloud'
      ),
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
