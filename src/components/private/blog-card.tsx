import * as elements from 'typed-html';

type BlogCardProps = {
  title: string;
  subtitle: string;
  emoji: string;
};

export function BlogCard({ title, subtitle, emoji }: BlogCardProps) {
  return (
    <div class="gap-md flex items-center text-lg">
      <div>{emoji}</div>
      <a class="flex flex-col hover:cursor-pointer hover:underline" href="/snake">
        <div>{title}</div>
        <div class="text-sm">{subtitle}</div>
      </a>
    </div>
  );
}
