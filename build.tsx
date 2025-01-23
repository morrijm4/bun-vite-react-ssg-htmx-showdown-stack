import path from 'path';
import showdown from 'showdown';
import { readdir } from 'fs/promises';
import { build } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import { getBlogs } from './src/services/blog/getBlogs';
import { srcDir } from './src/constants';

const converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
});

// read list of files in blog/ folder
const blogGen = getBlogs().map(async (blog) => {
    // Convert blog markdown files to HTML strings
    const markdown = await Bun.file(blog.absolutePath.md).text();
    const html = converter.makeHtml(markdown);

    // Write HTML strings to .html files in src/public/blog/ folder
    await Bun.write(blog.absolutePath.html, html);
});

const componentsDir = path.join(srcDir, 'components');
const components = await readdir(componentsDir);
const ssg = components.map(async (fileName) => {
    if (!fileName.endsWith('.tsx')) {
        return;
    }

    const { default: Component } = await import(path.join(componentsDir, fileName));
    const html = renderToStaticMarkup(<Component />);

    if (fileName !== 'index.tsx') {
        fileName = `public/${fileName}`;
    }

    await Bun.write(path.join(srcDir, fileName.replace('.tsx', '.html')), html);
});

await Promise.all([...blogGen, ...ssg]);

await build({
    root: 'src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
});
