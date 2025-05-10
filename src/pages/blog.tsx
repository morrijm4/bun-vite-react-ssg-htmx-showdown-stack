import * as elements from 'typed-html';
import { Head } from '../components/private/head';
import { Html } from '../components/private/html';
import { Body } from '../components/private/body';
import { Main } from '../components/private/Main';
import { BlogCard } from '../components/private/blog-card';

export default (
  <Html>
    <Head />
    <Body>
      <Main>
        <section>
          <BlogCard title="Snake" subtitle="April 21st, 11:38 pm" emoji="🕹️" href="/snake" />
        </section>
      </Main>
    </Body>
  </Html>
);
