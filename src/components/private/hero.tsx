import * as elements from 'typed-html';

export function Hero() {
  return (
    <div class="relative min-h-[439px] min-w-[408px]">
      <div class="bg-light-shadow dark:bg-dark-shadow absolute top-[69px] size-96 rounded-full shadow-xl"></div>
      <div class="bg-light-tertiary dark:bg-dark-tertiary absolute top-[208px] left-[204px] size-52 rounded-full shadow-xl"></div>
      <div class="bg-light-primary dark:bg-dark-primary absolute left-[204px] size-44 rounded-full shadow-xl"></div>
      <div class="bg-light-secondary dark:bg-dark-secondary absolute top-[37px] left-[79px] size-32 rounded-full shadow-xl"></div>
      <img
        src="/images/profile-pic.png"
        alt="profile-pic"
        width="255"
        height="255"
        class="absolute top-[100px] right-[76px] rounded-full shadow-xl"
      />
    </div>
  );
}
