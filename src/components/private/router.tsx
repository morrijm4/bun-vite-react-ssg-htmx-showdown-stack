import * as elements from 'typed-html';

export type Page = {
  title: string;
  content: string;
  path: string;
};

interface RouterProps {
  pages: Page[];
}

export function Router(props: RouterProps) {
  return (
    <div>
      {props.pages.map(({ content, path }) => {
        return (
          <div id={path} class="router hidden">
            {content}
          </div>
        );
      })}
    </div>
  );
}
