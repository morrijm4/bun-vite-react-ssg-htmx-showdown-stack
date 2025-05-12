import * as elements from 'typed-html';
import { ThemeToggle } from './theme-toggle';

export function Nav() {
  return (
    <nav class="pt-lg pb-2xl px-lg lg:px-2xl mx-auto flex max-w-300 items-center justify-between">
      <ol class="gap-md lg:gap-lg lg:text-md flex text-sm">
        {pages.map(({ title, path }) => {
          return (
            <li class="hover:cursor-pointer hover:underline">
              <a href={path}>{title}</a>
            </li>
          );
        })}
      </ol>
      <ThemeToggle />
    </nav>
  );
}

const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
];
