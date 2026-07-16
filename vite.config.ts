import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // The canonical deployment uses the custom root domain.
  base: '/',
  plugins: [react()],
});
