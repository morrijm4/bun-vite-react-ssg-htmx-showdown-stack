import * as elements from 'typed-html';
import { ThemeToggle } from './theme-toggle';
import { pages } from '../../pages/index';

export function Nav() {
  return (
    <nav class="mb-lg lg:mb-2xl flex items-center justify-between">
      <ol class="gap-sm lg:gap-lg lg:text-md flex text-sm">
        {pages.map(({ title, path }) => {
          return (
            <li id={path} class="nav hover:cursor-pointer hover:underline">
              {title}
            </li>
          );
        })}
      </ol>
      <ThemeToggle />
    </nav>
  );
}
