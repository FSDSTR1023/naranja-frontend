import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VITE_PUBLIC_LK_SERVER_URL': JSON.stringify(
        env.VITE_PUBLIC_LK_SERVER_URL
      ),
    },
    test: {
      environment: 'happy-dom',
    },
    plugins: [react()],
  };
});
