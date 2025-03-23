import * as elements from 'typed-html';

export function Html({ children }: elements.Attributes) {
  return <html>{children}</html>;
}
