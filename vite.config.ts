import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // The canonical deployment uses the custom root domain.
  base: '/',
  plugins: [react(), {
    name: 'route-loading-evidence',
    generateBundle(_options, bundle) {
      const report = Object.fromEntries(Object.entries(bundle).flatMap(([file, output]) => output.type === 'chunk' ? [[file, {
        modules: Object.keys(output.modules).map(id => id.replaceAll('\\', '/').replace(`${process.cwd().replaceAll('\\', '/')}/`, '')),
        imports: output.imports,
        dynamicImports: output.dynamicImports,
      }]] : []));
      this.emitFile({ type: 'asset', fileName: '.vite/route-loading.json', source: JSON.stringify(report, null, 2) });
    },
  }],
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replaceAll('\\', '/');
          if (normalized.includes('/node_modules/')) return 'vendor';
          if (normalized.includes('/src/catalogue-') && normalized.endsWith('.json')) return 'catalogue-data';
        },
      },
    },
  },
});
