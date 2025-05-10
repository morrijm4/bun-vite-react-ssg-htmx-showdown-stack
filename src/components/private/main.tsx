import * as elements from 'typed-html';

export function Main({ children, ...rest }: elements.Attributes) {
  return (
    <main class="px-lg lg:px-2xl flex flex-col" {...rest}>
      {children}
    </main>
  );
}
