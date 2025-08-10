/**
 * Sutra 1.1.59: द्विर्वचनेऽचि (dvirvacane'ci)
 * "Before an affix having an initial vowel, which causes reduplication, the substitute which takes the place of a vowel is like the original vowel even in form, only for the purpose of reduplication and no further."
 *
 * RULE TYPE: atidesha (specific type of sthānivadbhāva for dvirvacana)
 * SCOPE: Applies to ādeśa of ac specifically for dvirvacana when an ac follows.
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.59
 */

import { isVowel } from '../sanskrit-utils/classification.js';

/**
 * Determines if Sthānivadbhāva (treating a substitute as its original) applies
 * specifically for the purpose of Dvirvacana (reduplication) according to Sutra 1.1.59.
 * This sutra states that when a substitute (ādeśa) replaces a vowel (ac),
 * and this occurs in the context of reduplication (dvirvacana) where a vowel (ac)
 * follows, then the substitute is treated as the original vowel, even in form,
 * but only for the purpose of that reduplication.
 *
 * @param {string} adesha - The substitute (आदेश).
 * @param {string} sthani - The original (स्थानी) that was replaced.
 * @param {object} context - An object containing contextual information.
 * @param {boolean} [context.isDvirvacanaContext=false] - True if the current context is for reduplication.
 * @param {string} [context.followingElement=''] - The element immediately following the substitute/original position.
 * @returns {boolean} True if Sthānivadbhāva applies for Dvirvacana, false otherwise.
 *
 * @example
 * // Example where Sthānivadbhāva applies for Dvirvacana
 * // 'y' (adesha) replaces 'i' (sthani - vowel), in dvirvacana context, with a vowel following.
 * appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: true, followingElement: 'a' }); // true
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (sthani is not a vowel)
 * appliesSthanivadbhavaForDvirvacana('k', 't', { isDvirvacanaContext: true, followingElement: 'a' }); // false
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (not dvirvacana context)
 * appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: false, followingElement: 'a' }); // false
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (following element is not a vowel)
 * appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: true, followingElement: 'k' }); // false
 */
export function appliesSthanivadbhavaForDvirvacana(adesha, sthani, context = {}) {
  const { isDvirvacanaContext = false, followingElement = '' } = context;

  // Condition 1: The original (sthani) must be a vowel (ac).
  if (!isVowel(sthani)) {
    return false;
  }

  // Condition 2: The current context must be for Dvirvacana (reduplication).
  if (!isDvirvacanaContext) {
    return false;
  }

  // Condition 3: A vowel (ac) must follow.
  if (!isVowel(followingElement)) {
    return false;
  }

  // If all conditions are met, Sthānivadbhāva applies for Dvirvacana according to 1.1.59.
  return true;
}
