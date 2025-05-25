import * as elements from 'typed-html';
import { Head } from '../components/private/head';

export default (
  <html>
    <Head />
    <body class="overflow-hidden">
      <nav class="absolute inset-0 z-0">
        <div class="font-source-code text-xl font-bold tracking-widest">
          <a
            href="/"
            class="absolute left-[calc(128px*2)] h-[126px] w-[126px] hover:cursor-pointer hover:bg-red-400"
          >
            <h1 class="flex h-full items-end p-4">HOME</h1>
          </a>
          <div class="absolute left-[calc(128px*3)] h-[126px] w-[126px] bg-blue-400 hover:cursor-pointer hover:bg-red-400">
            <h1 class="flex h-full items-end p-4">ABOUT</h1>
          </div>
          <a class="absolute left-[calc(128px*4)] h-[126px] w-[126px] hover:cursor-pointer hover:bg-red-400">
            <h1 class="flex h-full items-end p-4">PLAY</h1>
          </a>
          <a class="absolute left-[calc(128px*5)] h-[126px] w-[126px] hover:cursor-pointer hover:bg-red-400">
            <h1 class="flex h-full items-end p-4">LEARN</h1>
          </a>
        </div>
      </nav>
      <a class="font-modak text-border-lg absolute right-16 bottom-4 z-50 cursor-default text-9xl text-yellow-300">
        M
      </a>
      <img
        src="/images/me.png"
        alt="Me"
        class="absolute right-48 bottom-[-32px] z-40"
        width="450"
        height="450"
      />
      <img
        src="/images/me.png"
        alt="Me"
        class="absolute right-32 bottom-[-16px] z-30 opacity-75"
        width="450"
        height="450"
      />
      <img
        src="/images/me.png"
        alt="Me"
        class="absolute right-16 bottom-0 z-20 opacity-50"
        width="450"
        height="450"
      />
      <main class="relative z-10 mt-[128px] flex h-[500px] pl-[5%]">
        <div class="mt-12 flex w-[800px] flex-col items-start gap-8 border-8 border-black bg-red-400 px-8 pt-24 shadow-[30px_30px_0_0_black]">
          <h1 class="text-border-lg font-modak flex cursor-default text-9xl leading-20 tracking-[0.075em] text-yellow-300">
            ABOUT
          </h1>
          <p class="font-source-code text-2xl font-bold">
            Check out my place to share projects, thoughts, and games.
          </p>
        </div>
      </main>
    </body>
  </html>
);
