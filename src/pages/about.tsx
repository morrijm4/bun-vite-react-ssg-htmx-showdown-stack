import * as elements from 'typed-html';
import { Head } from '../components/private/head';
import { Html } from '../components/private/html';
import { Body } from '../components/private/body';
import { Main } from '../components/private/Main';
import { Hero } from '../components/private/hero';

export default (
  <Html>
    <Head />
    <Body>
      <Main>
        <section class="gap-md flex flex-col-reverse items-center text-3xl text-black md:flex-row md:items-start dark:text-white">
          <div class="lg:text-md gap-lg flex flex-col text-sm leading-[24px] lg:leading-[64px]">
            <p>
              My name is Matthew Morrison. I am a software engineer, climber, guitarist, and golfer.
              I live in Nashville, Tennessee and I work for Asurion.
            </p>
            <p>
              I let my curiosity and interest direct my ambitions and I pursue my passions with
              great intensity. I focus on the journey and cherish what I learn from my experiences.
              I firmly believe I can accomplish anything when my mind is set on a goal.
            </p>
            <p>Feel free to email me at james.m.morrison@vanderbilt.edu.</p>
          </div>
          <Hero />
        </section>
      </Main>
    </Body>
  </Html>
);
