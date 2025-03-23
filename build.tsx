import chokidar from 'chokidar';
import * as vite from 'vite';
import { createBlog } from './src/services/blog/blogs';
import { convertBlog } from './src/services/blog/converter';
import { createStaticSiteGenerator } from './src/services/ssg/ssg';
import { Builder } from './src/services/builder/builder';
import viteConfig from './vite.config';

const builder = new Builder({
  onBuild: async () => {
    console.log('================= Building the website =================');

    await vite.build(viteConfig);
  },
});

chokidar
  .watch('./blog')
  .on('add', (path) => {
    console.log(`Running add for ${path}`);
    builder.buildAfter([convertBlog(createBlog(path))]);
  })
  .on('change', (path) => {
    console.log(`Running change for ${path}`);
    builder.buildAfter([convertBlog(createBlog(path))]);
  });

chokidar
  .watch('./src')
  .on('add', (path) => {
    console.log(`Running root add for ${path}`);
    builder.buildAfter([]);
  })
  .on('change', (path) => {
    console.log(`Running root change for ${path}`);
    builder.buildAfter([]);
  });

let isSSGReady = false;

chokidar
  .watch(['./src/components/public', './src/pages'])
  .on('ready', () => {
    builder.buildAfter([
      ...createStaticSiteGenerator('components/public', 'public/'),
      ...createStaticSiteGenerator('pages', '/'),
    ]);
    isSSGReady = true;
  })
  .on('add', (path) => {
    console.log(`Running add for ${path}`);
    if (isSSGReady) {
      builder.buildAfter([
        ...createStaticSiteGenerator('components/public', 'public/'),
        ...createStaticSiteGenerator('pages', '/'),
      ]);
    }
  })
  .on('change', (path) => {
    console.log(`Running change for ${path}`);
    if (isSSGReady) {
      builder.buildAfter([
        ...createStaticSiteGenerator('components/public', 'public/'),
        ...createStaticSiteGenerator('pages', '/'),
      ]);
    }
  });

await vite.preview();
