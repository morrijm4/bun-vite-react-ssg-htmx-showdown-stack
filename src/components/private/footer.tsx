import * as elements from 'typed-html';

export function Footer() {
  return (
    <footer class="dark:bg-dark-secondary bg-light-primary p-xl flex items-center justify-between text-white">
      <div>Walls are meant for climbing.</div>
      <div class="gap-sm flex items-center">
        <a href="https://www.linkedin.com/in/james-matthew-morrison/">
          <img src="/icons/InBug-White.png" alt="LinkedIn" height="36" width="36" />
        </a>
        <a href="https://github.com/morrijm4">
          <img src="/icons/github-mark.svg" alt="GitHub" height="36" width="36" />
        </a>
      </div>
    </footer>
  );
}
