import chokidar from 'chokidar'
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

chokidar.watch('./blog')
  .on('add', (path) => {
    console.log(`Running add for ${path}`)
    builder.buildAfter([convertBlog(createBlog(path))]);
  })
  .on('change', (path) => {
    console.log(`Running change for ${path}`)
    builder.buildAfter([convertBlog(createBlog(path))]);
  })

chokidar.watch('./src')
  .on('add', (path) => {
    console.log(`Running root add for ${path}`);
    builder.buildAfter([]);
  })
  .on('change', (path) => {
    console.log(`Running root change for ${path}`);
    builder.buildAfter([]);
  })

let isSSGReady = false;

chokidar.watch('./src/components')
  .on('ready', () => {
    builder.buildAfter(createStaticSiteGenerator());
    isSSGReady = true;
  })
  .on('add', (path) => {
    console.log(`Running add for ${path}`)
    if (isSSGReady) builder.buildAfter(createStaticSiteGenerator());
  })
  .on('change', (path) => {
    console.log(`Running change for ${path}`)
    if (isSSGReady) builder.buildAfter(createStaticSiteGenerator());
  })

await vite.preview();
