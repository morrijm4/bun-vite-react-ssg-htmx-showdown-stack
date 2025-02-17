import { getBlogsSync } from '../services/blog/blogs';

export default function Index() {
  const blogs = getBlogsSync();

  return (
    <html lang="en">

      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Random tech blog" />
        <meta name="author" content="Matthew Morrison" />
        <title>Matthew Morrison's blog</title>
        <link rel="stylesheet" href="styles.css" />
      </head>

      <body hx-ext='preload'>
        <header>
          <nav>
            <ul id="blog-list">
              <li key='home' hx-get="home.html" hx-swap="innerHTML" hx-target="#main" preload="mouseover">Home</li>
              {blogs.map(({ title, path }) => {
                return (
                  <li key={title} hx-get={`blog/${path}`} hx-swap="innerHTML" hx-target="#main" preload="mouseover">
                    {title}
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <main id="main">
          <h1>HIIIIIII</h1>
        </main>
        <footer>
        </footer>
        <script defer type="module" src="app.ts"></script>
      </body>
    </html>
  );
}
