import * as elements from 'typed-html';
import { Body } from '../components/private/body';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';

export default (
  <Html>
    <Head>
      <title>Snake</title>
      <link href="/styles/snake.css" rel="stylesheet" />
      <script src="/scripts/snake.ts" type="module"></script>
    </Head>
    <Body>
      <main class="mb-md lg:text-md m-auto flex max-w-fit flex-col items-start gap-4 px-4 text-sm">
        <div class="flex w-full justify-between">
          <h1 id="title"></h1>
          <button
            class="play-button bg-light-primary dark:bg-dark-primary hover:bg-light-primary-hover hover:dark:bg-dark-primary-hover cursor-pointer rounded-2xl text-white"
            id="play-button"
          >
            Play
          </button>
        </div>
        <div class="flex" id="root"></div>
        <div class="flex w-full justify-between">
          <h1>
            Score:&nbsp;<span id="score">0</span>
          </h1>
          <h1>
            High score:&nbsp;<span id="high-score">0</span>
          </h1>
        </div>
        <div class="m-auto flex w-48 flex-col items-center gap-1">
          <div>
            <img
              id="up"
              width="64px"
              height="64px"
              src="/public/icons/up-arrow.svg"
              class="dark:bg-dark-primary bg-light-primary hover:light-primary-hover hover:dark:bg-dark-primary-hover cursor-pointer rounded-full p-4"
            />
          </div>
          <div class="flex w-full justify-between">
            <img
              id="left"
              width="64px"
              height="64px"
              src="/public/icons/left-arrow.svg"
              class="bg-light-primary dark:bg-dark-primary hover:light-primary-hover hover:dark:bg-dark-primary-hover cursor-pointer rounded-full p-4"
            />
            <img
              id="right"
              width="64px"
              height="64px"
              src="/public/icons/right-arrow.svg"
              class="bg-light-primary dark:bg-dark-primary hover:light-primary-hover hover:dark:bg-dark-primary-hover cursor-pointer rounded-full p-4"
            />
          </div>
          <div>
            <img
              id="down"
              width="64px"
              height="64px"
              src="/public/icons/down-arrow.svg"
              class="bg-light-primary dark:bg-dark-primary hover:light-primary-hover hover:dark:bg-dark-primary-hover cursor-pointer rounded-full p-4"
            />
          </div>
        </div>
      </main>
    </Body>
  </Html>
);
