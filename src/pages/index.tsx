import * as elements from 'typed-html';
import { Body } from '../components/private/body';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';
import { Main } from '../components/private/main';
import { Hero } from '../components/private/hero';

export default (
  <Html>
    <Head />
    <Body>
      <Main>
        <div class="text-md flex flex-col-reverse items-center justify-between text-black md:flex-row md:items-center dark:text-white">
          <div class="gap-md lg:gap-lg flex flex-col items-start">
            <h1>Hello!👋</h1>
            <p>Check out my place to share projects, thoughts, and games.</p>
            <a
              class="gap-2xs lg:gap-sm bg-light-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover dark:bg-dark-secondary px-md lg:px-lg py-2xs lg:py-xs flex items-center rounded-3xl text-white hover:cursor-pointer"
              href="/blog"
            >
              Go
            </a>
          </div>
          <Hero />
        </div>
      </Main>
    </Body>
  </Html>
);
