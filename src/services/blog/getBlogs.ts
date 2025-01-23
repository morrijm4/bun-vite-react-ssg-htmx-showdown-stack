import path from 'path';
import { readdirSync } from 'fs';
import { blogDir, srcDir } from '../../constants';
import type { Blog } from './types';

let blogs: Blog[] | undefined;

export function getBlogs(): Blog[] {
    if (blogs == null) {
        const fileNames = readdirSync(blogDir);

        blogs = fileNames.map((fileName) => {
            const publicPath = path.join('blog', fileName.replace('.md', '.html'));

            return {
                title: fileName.replace('.md', ''),
                path: publicPath,
                absolutePath: {
                    md: path.join(blogDir, fileName),
                    html: path.join(srcDir, 'public', publicPath),
                },
            };
        });
    }

    return blogs;
}
