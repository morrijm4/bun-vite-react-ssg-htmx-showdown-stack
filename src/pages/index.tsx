import * as elements from 'typed-html';
import { Layout } from '../components/private/layout';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';
import { Home } from '../components/private/home';
import { Router, type Page } from '../components/private/router';
import { About } from '../components/private/about';
import { Blog } from '../components/private/blog';

export const pages: Page[] = [
  {
    title: 'Home',
    content: <Home />,
    path: '/',
  },
  {
    title: 'About',
    content: <About />,
    path: '/about',
  },
  {
    title: 'Blog',
    content: <Blog />,
    path: '/blog',
  },
];

export default (
  <Html>
    <Head>
      <title>mattymo.dev</title>
    </Head>
    <Layout>
      <main>
        <Router pages={pages} />
      </main>
    </Layout>
  </Html>
);
