/* eslint-disable security/detect-object-injection */
const cache: { [id: string]: boolean | undefined } = {};

/**
 * Generates a short id.
 *
 * Description:
 * 	A 5-character alphanumeric sequence (364 = 1.6 million)
 * 	This should only be used for JavaScript specific models.
 * 	http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 * 	Example: `aebgf`
 */
export const id = (): string => {
  // eslint-disable-next-line no-bitwise
  let newId = ('0000' + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-4);

  // append a 'a' because neo gets mad
  newId = `a${newId}`;

  // ensure not already used
  /* istanbul ignore else */
  if (!cache[newId]) {
    cache[newId] = true;
    return newId;
  }

  /* istanbul ignore next */
  return id();
};
