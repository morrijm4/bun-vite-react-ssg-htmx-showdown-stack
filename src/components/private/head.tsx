import * as elements from 'typed-html';
import { PostHog } from './post-hog';

interface HeadProps extends Partial<elements.Attributes> {
  title?: string;
}

export function Head({ children, title = 'mattymo.dev' }: HeadProps) {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Random tech blog" />
      <meta name="author" content="Matthew Morrison" />
      <title>{title}</title>
      <link href="/styles/global.css" rel="stylesheet" />
      <script src="/scripts/theme.ts" type="module"></script>
      <PostHog />
      {children}
    </head>
  );
}
