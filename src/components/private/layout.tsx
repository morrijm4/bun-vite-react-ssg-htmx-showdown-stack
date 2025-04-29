import * as elements from 'typed-html';
import { Nav } from './nav';

export function Layout({ children, ...rest }: elements.Attributes): string {
  return (
    <body
      class="bg-light dark:bg-dark font-roboto py-lg px-2xl mx-auto flex max-w-300 flex-col justify-center text-black dark:text-white"
      {...rest}
    >
      <Nav />
      {children}
    </body>
  );
}
