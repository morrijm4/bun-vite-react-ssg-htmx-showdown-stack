import * as elements from 'typed-html';
import { mc } from '../../services/merge-classes/merge-classes';

export function Button({ children, class: className, ...rest }: elements.Attributes) {
  return (
    <button
      class={mc(
        'bg-light-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover dark:bg-dark-primary px-sm lg:px-lg py-2xs lg:py-xs text-md rounded-3xl text-white hover:cursor-pointer dark:text-black',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
