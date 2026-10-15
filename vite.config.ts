import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // The canonical deployment uses the custom root domain.
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replaceAll('\\', '/');
          if (normalized.includes('/node_modules/')) return 'vendor';
          if (/\/src\/wearable-market-(?:data|additions|offer-updates)\.json$/.test(normalized)) return 'wearable-data';
          if (normalized.includes('/src/catalogue-') && normalized.endsWith('.json')) return 'catalogue-data';
          if (/\/src\/(?:buying-guides|niche-guides-[ab]|milk-guides)\.(?:ts|json)$/.test(normalized)) return 'editorial-content';
        },
      },
    },
  },
});
