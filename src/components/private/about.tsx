import * as elements from 'typed-html';
import { Hero } from './hero';

export function About() {
  return (
    <section class="gap-md flex text-3xl text-black dark:text-white">
      <div class="text-md gap-lg flex flex-col leading-[64px]">
        <p>
          My name is Matthew Morrison. I am a software engineer, climber, guitarist, and golfer. I
          live in Nashville, Tennessee and I work for Asurion.
        </p>
        <p>
          I let my curiosity and interest direct my ambitions and I pursue my passions with great
          intensity. I focus on the journey and cherish what I learn from my experiences. I firmly
          believe I can accomplish anything when my mind is set on a goal.
        </p>
        <p>Feel free to email me at james.m.morrison@vanderbilt.edu.</p>
      </div>
      <Hero />
    </section>
  );
}
