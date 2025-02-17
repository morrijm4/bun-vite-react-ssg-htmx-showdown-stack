import { readdirSync } from 'fs';
import { readdir } from 'fs/promises';
import type { Blog } from './types';
import path from 'path';
import { blogDir, srcDir } from '../../constants';

let blogs: Blog[] | undefined;

export function getBlogsSync(): Blog[] {
    if (blogs == null) {
        blogs = readdirSync(blogDir).map(createBlog);
    }
    return blogs;
}

export async function getBlogs(): Promise<Blog[]> {
    if (blogs == null) {
        blogs = (await readdir(blogDir)).map(createBlog);
    }
    return blogs;
}

export function createBlog(fileName: string): Blog {
  const publicPath = fileName.replace('.md', '.html');

  return {
    title: fileName.replace('.md', ''),
    path: publicPath,
    absolutePath: {
      md: path.join(fileName),
      html: path.join(srcDir, 'public', publicPath),
    },
  };
}

export function addBlogSync(fileName: string): void {
  getBlogsSync().push(createBlog(fileName));
}
