import * as elements from 'typed-html';

type BlogCardProps = {
  title: string;
  subtitle: string;
  emoji: string;
  href: string;
};

export function BlogCard({ title, subtitle, emoji, href }: BlogCardProps) {
  return (
    <div class="gap-md text-md flex items-center lg:text-lg">
      <div>{emoji}</div>
      <a class="flex flex-col hover:cursor-pointer hover:underline" href={href}>
        <div>{title}</div>
        <div class="text-sm lg:text-sm">{subtitle}</div>
      </a>
    </div>
  );
}
