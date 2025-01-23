import Home from './home';

export default function Index() {
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
            <body>
                <header>
                    <h1>Welcome to My Website</h1>
                    <nav>
                        <ul>
                            <li hx-get="/home.html" hx-swap="innerHTML" hx-target="#main">
                                Home
                            </li>
                        </ul>
                    </nav>
                </header>
                <main id="main">
                    <Home />
                </main>
                <footer>
                    <p>&copy; 2025 Matthew Morrison. All rights reserved.</p>
                </footer>
                <script type="module" src="app.ts"></script>
            </body>
        </html>
    );
}
