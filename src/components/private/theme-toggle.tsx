import * as elements from 'typed-html';

export function ThemeToggle() {
  return (
    <div
      id="theme-toggle"
      class="bg-light-shadow dark:bg-dark-shadow p-sm dark:hover:bg-dark-shadow-hover hover:bg-light-shadow-hover rounded-xl hover:cursor-pointer"
    >
      <img src="/icons/dark-mode.svg" alt="Dark Mode" id="dark" class="hidden" />
      <img src="/icons/light-mode.svg" alt="Light Mode" id="light" class="hidden" />
    </div>
  );
}
