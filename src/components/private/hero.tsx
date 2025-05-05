import * as elements from 'typed-html';

export function Hero() {
  return (
    <div class="mb-lg relative min-h-[190px] min-w-[194px] md:mb-0 lg:min-h-[439px] lg:min-w-[408px]">
      <div class="float-wiggle float-ease-in-out float-slow bg-light-shadow dark:bg-dark-shadow absolute top-[30px] size-40 rounded-full opacity-70 shadow-xl lg:top-[69px] lg:size-96"></div>
      <div class="float-wiggle float-ease-in-out float-mid bg-light-tertiary dark:bg-dark-tertiary absolute top-[92px] left-[90px] size-24 rounded-full opacity-70 shadow-xl lg:top-[208px] lg:left-[204px] lg:size-52"></div>
      <div class="float-wiggle float-ease-in-out float-mid bg-light-primary dark:bg-dark-primary absolute left-[90px] size-20 rounded-full opacity-70 shadow-xl lg:left-[204px] lg:size-44"></div>
      <div class="float-wiggle float-ease-in-out float-fast bg-light-secondary dark:bg-dark-secondary absolute top-[16px] left-[35px] size-14 rounded-full opacity-70 shadow-xl lg:top-[37px] lg:left-[79px] lg:size-32"></div>
      <div class="float-wiggle float-ease-in-out float-slow absolute top-[44px] left-[33px] size-28 lg:top-[100px] lg:left-[76px] lg:size-64">
        <img
          src="/images/profile-pic.png"
          alt="profile-pic"
          class="h-auto w-full rounded-full shadow-xl"
        />
      </div>
    </div>
  );
}
