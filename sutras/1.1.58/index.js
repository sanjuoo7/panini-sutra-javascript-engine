/**
 * Sutra 1.1.58: न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु (na padāntadvirvacanavarayalopasvarasavarṇānusvāradīrghajaścaravidhiṣu)
 * "Not so, in rules relating to the finals of words, to the doubling of letters, to the affixing of वरच् , to the elision of य , to accent, to homogenous letters, to अनुस्वर , to the lengthening of vowels and to the substitution of जस् and चर् characters."
 *
 * RULE TYPE: pratiṣedha (prohibition/exception)
 * SCOPE: Defines specific contexts where sthānivadbhāva is blocked.
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.58
 */

/**
 * Enum for rule types that block Sthānivadbhāva according to Sutra 1.1.58.
 * These are the nine categories where the substitute is NOT treated as the original.
 */
export const SthanivadbhavaBlockingRuleTypes = {
  PADANTA_VIDHI: 'padanta_vidhi', // Rules relating to the finals of words
  DVIRVACANA_VIDHI: 'dvirvacana_vidhi', // Rules relating to the doubling of letters
  VARAYA_VIDHI: 'varaya_vidhi', // Rules relating to the affixing of varac
  LOPA_VIDHI: 'lopa_vidhi', // Rules relating to the elision of ya
  SVARA_VIDHI: 'svara_vidhi', // Rules relating to accent
  SAVARNA_VIDHI: 'savarna_vidhi', // Rules relating to homogenous letters
  ANUSVARA_VIDHI: 'anusvara_vidhi', // Rules relating to anusvara
  DIRGHA_VIDHI: 'dirgha_vidhi', // Rules relating to the lengthening of vowels
  JAS_CAR_VIDHI: 'jas_car_vidhi', // Rules relating to the substitution of jas and car characters
};

/**
 * Determines if Sthānivadbhāva (treating a substitute as its original) is blocked
 * according to Sutra 1.1.58.
 * This sutra lists nine specific types of rules where Sthānivadbhāva does NOT apply.
 *
 * @param {string} ruleType - The type of rule being applied. Should be one of the values from `SthanivadbhavaBlockingRuleTypes`.
 * @returns {boolean} True if Sthānivadbhāva is blocked for the given rule type, false otherwise.
 *
 * @example
 * // Sthānivadbhāva is blocked for a Dvirvacana rule
 * isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.DVIRVACANA_VIDHI); // true
 *
 * @example
 * // Sthānivadbhāva is not blocked for a general rule (not in the list)
 * isSthanivadbhavaBlocked('general_rule'); // false
 *
 * @example
 * // Sthānivadbhāva is blocked for a Lopa rule
 * isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.LOPA_VIDHI); // true
 */
export function isSthanivadbhavaBlocked(ruleType) {
  const blockingTypes = Object.values(SthanivadbhavaBlockingRuleTypes);
  return blockingTypes.includes(ruleType);
}
