import type { UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import path from 'path';

export default {
  root: './src',
  plugins: [
    tailwindcss(),
    {
      name: 'rename-html-files',
      async closeBundle() {
        const distDir = 'dist';
        fs.readdirSync(distDir).forEach((file) => {
          if (file.endsWith('.html')) {
            const oldPath = path.join(distDir, file);
            const newPath = path.join(distDir, file.replace('.html', ''));
            fs.renameSync(oldPath, newPath);
          }
        });
      },
    },
  ],
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: await getEntryPoints(),
    },
  },
  esbuild: {
    treeShaking: true,
    minifyIdentifiers: false,
  },
} satisfies UserConfig;

async function getEntryPoints(): Promise<Record<string, string>> {
  const fileNames = await fsp.readdir('src/pages');
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
