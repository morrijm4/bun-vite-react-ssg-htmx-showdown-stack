import type { Blog } from "./types";
import showdown from 'showdown';

export function convertBlogs(blogs: Blog[]): Promise<void>[] {
  return blogs.map(convertBlog);
}

export async function convertBlog(blog: Blog) {
  // Convert blog markdown files to HTML strings
  const markdown = await Bun.file(blog.absolutePath.md).text();
  const html = getConverter().makeHtml(markdown);

  // Write HTML strings to .html files in src/public/blog/ folder
  await Bun.write(blog.absolutePath.html, html);
}

let converter: showdown.Converter;

function getConverter(): showdown.Converter {
  if (converter == null) {
    converter = new showdown.Converter({
      ghCompatibleHeaderId: true,
    });
  }
  return converter;
}
