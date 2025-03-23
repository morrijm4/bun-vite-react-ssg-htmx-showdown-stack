import type { UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import * as fs from 'fs/promises';

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
    rollupOptions: {
      input: await getEntryPoints(),
    },
  },
  esbuild: {
    // treeShaking: false,
  },
} satisfies UserConfig;

async function getEntryPoints(): Promise<Record<string, string>> {
  const fileNames = await fs.readdir('src/pages');
  return fileNames.reduce(
    (pageNames, fileName) => {
      const pageName = fileName.split('.')[0];

      if (typeof pageName !== 'string') throw new Error('Page name not a string');

      pageNames[pageName] = `src/${pageName}.html`;
      return pageNames;
    },
    {} as Record<string, string>,
  );
}
