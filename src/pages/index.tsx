import * as elements from 'typed-html';
import { Layout } from '../components/private/layout';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';

export default (
  <Html>
    <Head>
      <title>mattymo.dev</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="/public/styles/index.css" rel="stylesheet" />
    </Head>
    <Layout>
      <main class="flex h-full items-center justify-center text-white">
        {ShakyText('mattymo.dev')}
      </main>
    </Layout>
  </Html>
);

function ShakyText(text: string) {
  return text
    ?.toString()
    .split('')
    .map((char) => <h1 class="rainbow-text text-[10vw]">{char}</h1>);
}
