/**
 * Escapes the RegExp special characters.
 * @param {string} string The string to escape.
 * @returns {string} The escaped string.
 */
export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
