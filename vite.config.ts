// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config';

// export default defineConfig({
//   plugins: [vue()],
//   test: {
//     ...configDefaults,
//     globals: true,
//     environment: 'jsdom',
//   },
// })
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
