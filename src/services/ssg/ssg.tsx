import path from 'path';
import fs from 'fs';
import { srcDir } from '../../constants';

export function createStaticSiteGenerator(src: string, dst: string): Promise<void>[] {
  const componentsDir = path.join(srcDir, src);
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

    const { default: html } = await import(`${srcPath}?t=${Date.now()}`);

    if (typeof html !== 'string') {
      return console.log(`Module ${fileName} is not a string`);
    }

    console.log(`Read ${fileName}`);

    fileName = `${dst}${fileName}`;

    const distPath = path.join(srcDir, fileName.replace('.tsx', '.html'));

    await Bun.write(distPath, html);

    console.log(`Writing ${srcPath} to ${distPath}`);
  });

}
