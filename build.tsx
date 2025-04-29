import path from 'path';
import fs from 'fs';

const src = path.join(import.meta.dir, './src/pages');
const dst = path.join(import.meta.dir, './src');

await Promise.all(
  fs.readdirSync(src).map(async (fileName) => {
    if (!fileName.endsWith('.tsx')) {
      console.warn(`Invalid extension for file: ${fileName}`);
      return;
    }

    const { default: html } = await import(path.join(src, fileName));

    if (typeof html !== 'string') {
      return console.log(`Module ${fileName} is not a string`);
    }

    const distPath = path.join(dst, fileName.replace('.tsx', '.html'));

    await Bun.write(distPath, html);
  }),
);
