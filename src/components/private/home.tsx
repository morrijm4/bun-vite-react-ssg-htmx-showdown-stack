import * as elements from 'typed-html';
import { Button } from './button';
import { Hero } from './hero';

export function Home() {
  return (
    <section class="lg:text-md flex flex-col-reverse items-center justify-between text-sm text-black md:flex-row md:items-start dark:text-white">
      <div class="gap-md lg:gap-lg flex flex-col items-start">
        <h1>Hello! 👋</h1>
        <p>Check out my place to share projects, thoughts, and games.</p>
        <Button id="go" class="gap-2xs lg:gap-sm lg:text-md flex items-center text-sm">
          <span>Go</span>
        </Button>
      </div>
      <Hero />
    </section>
  );
}
