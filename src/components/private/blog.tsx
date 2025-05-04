import * as elements from 'typed-html';
import { BlogCard } from './blog-card';

export function Blog() {
  return (
    <section>
      <BlogCard title="Snake" subtitle="April 21st, 11:38 pm" emoji="🕹️" />
    </section>
  );
}
