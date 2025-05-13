import * as elements from 'typed-html';

export function Footer() {
  return (
    <footer class="dark:bg-dark-secondary bg-light-primary py-lg px-md lg:py-lg lg:px-xl flex items-center justify-between text-white">
      <div class="text-[12px] lg:text-sm">Walls are meant for climbing.</div>
      <div class="gap-sm flex items-center">
        <a href="https://www.linkedin.com/in/james-matthew-morrison/" class="size-6 lg:size-8">
          <img
            src="/icons/InBug-White.png"
            alt="LinkedIn"
            height="36"
            width="36"
            class="h-full w-auto"
          />
        </a>
        <a href="https://github.com/morrijm4" class="size-6 lg:size-8">
          <img
            src="/icons/github-mark.svg"
            alt="GitHub"
            height="36"
            width="36"
            class="h-full w-auto"
          />
        </a>
      </div>
    </footer>
  );
}
