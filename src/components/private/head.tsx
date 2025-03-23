import * as elements from 'typed-html';

export function Head({ children }: elements.Attributes) {
  return (
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Random tech blog" />
        <meta name="author" content="Matthew Morrison" />
        <title>Matthew Morrison's blog</title>
        <link href="/styles.css" rel="stylesheet" />
        {children}
      </head>
  );
}
