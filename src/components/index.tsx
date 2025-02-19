import * as elements from 'typed-html';

export default (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Random tech blog" />
      <meta name="author" content="Matthew Morrison" />
      <title>Matthew Morrison's blog</title>
      <link rel="stylesheet" href="styles.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
    </head>

    <body hx-ext="preload" class="bg-dark">
      <main class="flex h-full items-center justify-center">
        <h1 class="rainbow-text p-4 font-['Bangers'] text-[10vw]">mattymo.dev</h1>
      </main>
      <footer></footer>
    </body>
  </html>
);
