import * as elements from 'typed-html';

export function Body({ children, ...rest }: elements.Attributes): string {
  return (
    <body class="" {...rest}>
      {children}
    </body>
  );
}
