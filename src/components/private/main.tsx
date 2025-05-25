import * as elements from 'typed-html';

export function Main({ children, ...rest }: elements.Attributes) {
  return (
    <main class="h-[3000px]" {...rest}>
      {children}
    </main>
  );
}
