/**
 * Sutra 1.1.57: अचः परस्मिन् पूर्वविधौ (acaḥ parasmin pūrvavidhau)
 * "A substitute in the room of a vowel caused by something that follows, should be regarded as that whose place it takes when a rule would else take effect on what stands anterior to the original vowel."
 *
 * RULE TYPE: atidesha (specific type of sthānivadbhāva)
 * SCOPE: Applies to ādeśa of ac (vowel) when caused by a following element, specifically for pūrvavidhi (rules applying to the preceding element).
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.57
 */

import { isVowel } from '../sanskrit-utils/classification.js';

/**
 * Determines if Sthānivadbhāva (treating a substitute as its original) applies
 * specifically under the conditions of Sutra 1.1.57.
 * This sutra states that a substitute (ādeśa) replacing a vowel (ac),
 * when the substitution is caused by a following element (parasmin),
 * should be regarded as the original vowel for rules that apply to what precedes
 * the original vowel (pūrvavidhi).
 *
 * @param {string} adesha - The substitute (आदेश).
 * @param {string} sthani - The original (स्थानी) that was replaced.
 * @param {object} context - An object containing contextual information.
 * @param {boolean} [context.isCausedByFollowing=false] - True if the substitution was caused by a following element.
 * @param {boolean} [context.isPurvavidhi=false] - True if the rule being applied is a pūrvavidhi (applies to what precedes).
 * @returns {boolean} True if Sthānivadbhāva applies according to 1.1.57, false otherwise.
 *
 * @example
 * // Example where Sthānivadbhāva applies according to 1.1.57
 * // 'y' (adesha) replaces 'i' (sthani - vowel), caused by following, for a purvavidhi.
 * appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: true, isPurvavidhi: true }); // true
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (sthani is not a vowel)
 * appliesSthanivadbhavaForPurvavidhi('k', 't', { isCausedByFollowing: true, isPurvavidhi: true }); // false
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (not caused by following)
 * appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: false, isPurvavidhi: true }); // false
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (not a purvavidhi)
 * appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: true, isPurvavidhi: false }); // false
 */
export function appliesSthanivadbhavaForPurvavidhi(adesha, sthani, context = {}) {
  const { isCausedByFollowing = false, isPurvavidhi = false } = context;

  // Condition 1: The original (sthani) must be a vowel (ac).
  if (!isVowel(sthani)) {
    return false;
  }

  // Condition 2: The substitution must be caused by a following element (parasmin).
  if (!isCausedByFollowing) {
    return false;
  }

  // Condition 3: The rule being applied must be a pūrvavidhi (applies to what precedes).
  if (!isPurvavidhi) {
    return false;
  }

  // If all conditions are met, Sthānivadbhāva applies according to 1.1.57.
  return true;
}
