import { getBlogs } from '../services/blog/getBlogs';

export default function Home() {
    const blogs = getBlogs();
    return (
        <>
            <h1>Blog posts</h1>
            <ul id="blog-list">
                {blogs.map(({ title, path }) => {
                    return (
                        <li key={title} hx-get={path} hx-swap="innerHTML" hx-target="#main">
                            {title}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
