import * as elements from 'typed-html';
import { ThemeToggle } from './theme-toggle';
import { pages } from '../../pages/index';

export function Nav() {
  return (
    <nav class="flex items-center justify-between">
      <ol class="gap-lg text-md flex">
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
