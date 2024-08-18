import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  root: './',
  build: {
    outDir: '../deploy',
  },
  plugins: [react()],

});