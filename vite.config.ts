import type { UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default {
  root: './src',
  plugins: [tailwindcss()],
  preview: {
    port: 4000,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // minify: false,
  },
  esbuild: {
    // treeShaking: false,
  },
} satisfies UserConfig;
