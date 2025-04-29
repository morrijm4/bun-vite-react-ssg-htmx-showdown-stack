import { $ } from 'bun';
import chokidar from 'chokidar';

await $`bun ssg`;

const watcher = chokidar.watch('./src', {
  ignored: (file) => file.endsWith('.html'),
});

watcher.on('change', async (event) => {
  console.log('change', event);
  await $`bun ssg`;
});
