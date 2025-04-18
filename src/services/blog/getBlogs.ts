import { readdirSync } from 'fs';
import type { Blog } from './types';
import path from 'path';
import { blogDir, srcDir } from '../../constants';

let blogs: Blog[] | undefined;

export function getBlogs(): Blog[] {
    if (blogs == null) {
        blogs = readdirSync(blogDir).map(createBlog);
    }

    return blogs;
}

export function createBlog(fileName: string): Blog {
  const publicPath = path.join('blog', fileName.replace('.md', '.html'));

  return {
    title: fileName.replace('.md', ''),
    path: publicPath,
    absolutePath: {
      md: path.join(blogDir, fileName),
      html: path.join(srcDir, 'public', publicPath),
    },
  };
}

