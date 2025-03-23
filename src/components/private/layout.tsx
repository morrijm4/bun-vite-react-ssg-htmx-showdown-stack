import * as elements from 'typed-html';

export function Layout({ children, ...rest }: elements.Attributes): string {
  return (
    <body class="bg-dark text-white" {...rest}>
      {children}
    </body>
  );
}
