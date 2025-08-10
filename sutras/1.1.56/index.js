/**
 * Sutra 1.1.56: स्थानिवदादेशोऽनल्विधौ (sthānivadādeśo'nalavidhau)
 * "A substitute (आदेश) is like the former occupant (स्थानी) but not in the case of a rule the occasion for the operation of which is furnished by the letters of the original term."
 *
 * RULE TYPE: atidesha (transfer of properties)
 * SCOPE: General rule for sthānivadbhāva (treating substitute as original).
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.56
 */

/**
 * Determines if the principle of Sthānivadbhāva (treating a substitute as its original) applies.
 * According to Sutra 1.1.56, a substitute (ādeśa) is treated like the original (sthānī)
 * for all purposes, except when the rule (vidhi) depends on the specific phonetic properties
 * (letters - al) of the original (analvidhau).
 *
 * @param {string} adesha - The substitute (आदेश).
 * @param {string} sthani - The original (स्थानी) that was replaced.
 * @param {object} ruleContext - An object containing context about the rule being applied.
 * @param {boolean} [ruleContext.isAlvidhi=false] - True if the rule depends on the specific letters of the original (alvidhi), false otherwise (analvidhi).
 * @returns {boolean} True if Sthānivadbhāva applies, false otherwise.
 *
 * @example
 * // Example where Sthānivadbhāva applies (analvidhi)
 * // If a rule applies to "any vowel" and the substitute is a vowel, sthanivadbhava applies.
 * // Here, the rule doesn't care about the specific vowel, just that it's a vowel.
 * appliesSthanivadbhava('i', 'y', { isAlvidhi: false }); // true
 *
 * @example
 * // Example where Sthānivadbhāva does NOT apply (alvidhi)
 * // If a rule specifically applies to the letter 'a' and the substitute is 'i',
 * // sthanivadbhava does not apply because the rule is 'alvidhi'.
 * appliesSthanivadbhava('i', 'a', { isAlvidhi: true }); // false
 *
 * @example
 * // Default case: if isAlvidhi is not specified, it defaults to false (analvidhi).
 * appliesSthanivadbhava('a', 'i', {}); // true
 */
export function appliesSthanivadbhava(adesha, sthani, ruleContext = {}) {
  const { isAlvidhi = false } = ruleContext;

  // According to Sutra 1.1.56, Sthānivadbhāva applies unless the rule is an 'alvidhi'.
  // If isAlvidhi is true, it means the rule depends on the specific letters of the original,
  // so Sthānivadbhāva does not apply.
  return !isAlvidhi;
}