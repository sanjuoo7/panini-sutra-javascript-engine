import { isLukSluLup } from '../1.1.61/index.js';

/**
 * Sutra 1.1.63: na lumatā'ṅgasya
 * "Of the base (aṅga), whose affix has been elided by the use of the three words containing lu
 * (i.e., luk, ślu, lup), the operations dependant on it do not take place, regarding such base."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.63
 */

/**
 * This sutra is a `paribhāṣā` (meta-rule) that acts as a `pratiṣedha` (prohibition) to Sutra 1.1.62.
 * It blocks the `pratyayalakṣaṇam` principle when an affix has been elided by `luk`, `ślu`, or `lup`.
 *
 * This function determines if a grammatical operation on the base (`aṅga`) should be blocked
 * based on the type of elision that occurred.
 *
 * @param {string} elisionType - The type of elision that occurred (e.g., 'luk', 'lopa').
 * @returns {boolean} - True if the `aṅga` operation should be blocked.
 */
export function shouldBlockAngaOperation(elisionType) {
  // The rule `na lumatā'ṅgasya` applies only when the elision is caused by a term
  // containing 'lu', which are defined by 1.1.61 as 'luk', 'ślu', and 'lup'.
  return isLukSluLup(elisionType);
}
