/**
 * Sutra 1.1.61: pratyayasya lukślulupaḥ
 * "The disappearance of an affix when it is caused by the words लुक् , श्लु or लुप् are designated by those terms respectively."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.61
 */

/**
 * Checks if an elision type is one of 'luk', 'ślu', or 'lup'.
 *
 * @param {string} elisionType - The type of elision to check.
 * @returns {boolean} - True if the elision type is 'luk', 'ślu', or 'lup'.
 */
export function isLukSluLup(elisionType) {
  if (typeof elisionType !== 'string') {
    return false;
  }
  const validTypes = new Set(['luk', 'ślu', 'lup']);
  return validTypes.has(elisionType);
}
