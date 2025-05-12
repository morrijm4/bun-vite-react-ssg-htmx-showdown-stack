import * as elements from 'typed-html';
import { Nav } from './nav';
import { Footer } from './footer';

export function Body({ children, ...rest }: elements.Attributes): string {
  return (
    <body class="bg-light dark:bg-dark font-roboto text-black dark:text-white" {...rest}>
      <div class="min-h-full">
        <Nav />
        {children}
      </div>
      <Footer />
    </body>
  );
}
