/**
 * Sutra 1.1.13: शे (śe)
 * "The affix शे (the Vedic substitute of the case-affixes) is a प्रगृह्य।"
 * 
 * This extends the प्रगृह्य definition to include the Vedic affix शे.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.13
 */

import { detectScript } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.12/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaSheAffix as isPragrhyaSheAffixShared,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

/**
 * Checks if a word ends with the Vedic affix शे which is प्रगृह्य
 * 
 * @param {string} word - The word to check
 * @returns {boolean} - True if the word ends with प्रगृह्य शे
 */
export function isPragrhyaSheAffix(word) {
  if (!word) {
    return false;
  }

  // Use shared implementation
  return isPragrhyaSheAffixShared(word);
}

/**
 * Extended प्रगृह्य checker that includes शे affix
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word is प्रगृह्य
 */
export function isPragrhya(word, context = {}) {
  if (!word) {
    return false;
  }

  // Use shared pragrhya analysis, but limit to sutras up to 1.1.13
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12', '1.1.13']);
}

/**
 * Checks if sandhi should be prevented due to प्रगृह्य status (including शे affix)
 * 
 * @param {string} firstWord - First word in potential sandhi
 * @param {string} secondWord - Second word in potential sandhi
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if sandhi should be prevented
 */
export function preventsSandhi(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  return preventsSandhiShared(firstWord, secondWord, context);
}
