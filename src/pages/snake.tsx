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
            class="play-button cursor-pointer rounded-2xl bg-blue-500 text-white hover:bg-blue-600"
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
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
          </div>
          <div class="flex w-full justify-between">
            <img
              id="left"
              width="64px"
              height="64px"
              src="/public/icons/left-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
            <img
              id="right"
              width="64px"
              height="64px"
              src="/public/icons/right-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
          </div>
          <div>
            <img
              id="down"
              width="64px"
              height="64px"
              src="/public/icons/down-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
          </div>
        </div>
      </main>
    </Body>
  </Html>
);
