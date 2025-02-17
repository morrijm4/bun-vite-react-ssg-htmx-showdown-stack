import path from 'path';
import fsp from 'fs/promises';
import fs from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { srcDir } from '../../constants';

export function createStaticSiteGenerator(): Promise<void>[] {
  const componentsDir = path.join(srcDir, 'components');
  const components = fs.readdirSync(componentsDir);

  console.log('componentsDir', componentsDir);
  console.log('components', components);

  for (const fileName of components) {
      const srcPath = path.join(componentsDir, fileName);
      delete require.cache[srcPath];
  };

  return components.map(async (fileName) => {
    if (!fileName.endsWith('.tsx')) {
      console.warn(`Invalid extention for file: ${fileName}`);
      return;
    }

    const srcPath = path.join(componentsDir, fileName);
    console.log('srcPath', srcPath);

    const { default: Component } = await import(`${srcPath}?t=${Date.now()}`);

    const html = renderToStaticMarkup(<Component />);

    console.log(`Read ${fileName}`);

    if (fileName !== 'index.tsx') {
      fileName = `public/${fileName}`;
    }

    const distPath = path.join(srcDir, fileName.replace('.tsx', '.html'));

    await Bun.write(distPath, html);

    console.log(`Writing ${srcPath} to ${distPath}`);
  });

}
