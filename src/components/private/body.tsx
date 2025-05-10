import * as elements from 'typed-html';
import { Nav } from './nav';

export function Body({ children, ...rest }: elements.Attributes): string {
  return (
    <body
      class="bg-light dark:bg-dark font-roboto mx-auto max-w-300 text-black dark:text-white"
      {...rest}
    >
      <Nav />
      {children}
    </body>
  );
}
