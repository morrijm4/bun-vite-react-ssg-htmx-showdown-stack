import * as elements from 'typed-html';

export function Main({ children, ...rest }: elements.Attributes) {
  return (
    <main class="mb-xl px-lg lg:px-2xl mx-auto flex max-w-300 flex-col" {...rest}>
      {children}
    </main>
  );
}
