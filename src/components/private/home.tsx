import * as elements from 'typed-html';
import { Button } from './button';
import { RightArrow } from '../../public/icons/black-right-arrow';
import { Hero } from './hero';

export function Home() {
  return (
    <section class="flex items-center justify-center text-3xl text-black dark:text-white">
      <div class="gap-lg flex flex-col items-start">
        <h1>Hello! 👋</h1>
        <p>Check out my place to share projects, thoughts, and games.</p>
        <Button id="go" class="gap-sm flex items-center">
          <span>Go</span>
          <RightArrow />
        </Button>
      </div>
      <Hero />
    </section>
  );
}
