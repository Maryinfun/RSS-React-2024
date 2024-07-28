import { configDefaults } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  root: './src',
  build: {
    outDir: '../deploy',
  },
  plugins: [react()],
  test: {
    ...configDefaults,
    globals: true,
    environment: 'jsdom',
  },
});
