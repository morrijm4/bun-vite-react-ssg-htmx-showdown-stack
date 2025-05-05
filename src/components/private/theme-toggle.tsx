import * as elements from 'typed-html';

export function ThemeToggle() {
  return (
    <div
      id="theme-toggle"
      class="bg-light-shadow dark:bg-dark-shadow p-xs lg:p-sm dark:hover:bg-dark-shadow-hover hover:bg-light-shadow-hover rounded-xl hover:cursor-pointer"
    >
      <div class="size-4 lg:size-8">
        <img src="/icons/dark-mode.svg" alt="Dark Mode" id="dark" class="hidden h-auto w-full" />
        <img src="/icons/light-mode.svg" alt="Light Mode" id="light" class="hidden h-auto w-full" />
      </div>
    </div>
  );
}
