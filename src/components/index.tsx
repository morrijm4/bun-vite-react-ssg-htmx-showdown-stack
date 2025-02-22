import * as elements from 'typed-html';

export default (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Random tech blog" />
      <meta name="author" content="Matthew Morrison" />
      <title>Matthew Morrison's blog</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="stylesheet" href="styles.css" />
    </head>

    <body hx-ext="preload" class="bg-dark">
      <main class="flex h-full items-center justify-center text-white">
        {ShakyText('mattymo.dev')}
      </main>
    </body>
  </html>
);

function ShakyText(text: string) {
  return text
    ?.toString()
    .split('')
    .map((char) => <h1 class="rainbow-text text-[10vw]">{char}</h1>);
}
