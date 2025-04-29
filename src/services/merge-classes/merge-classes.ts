import type { Attributes } from 'typed-html';

export function mc(...classes: (Attributes[string] | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
