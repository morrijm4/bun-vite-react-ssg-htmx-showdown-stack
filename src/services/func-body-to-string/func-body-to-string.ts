/**
 * Extracts the body of a given function as a string.
 *
 * @template T - The return type of the function.
 * @param {() => T} fn - The function whose body is to be extracted.
 * @returns {string} - The body of the function as a string.
 * @throws {Error} - Throws an error if no function body is found or if the function body is undefined.
 */
export function ts<T>(fn: () => T): string {
  const match = fn.toString().match(/\{([\s\S]*)\}/);

  if (match == null) {
    throw new Error('No function body found');
  }

  const [, body] = match;

  if (body == null) {
    throw new Error('Function body is undefined');
  }

  return body.trim();
}
