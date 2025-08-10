/**
 * Sutra 1.1.12: अदसो मात् (adaso māt)
 * "The same letters after the म् of the pronoun अदस् are प्रगृह्य।"
 * 
 * This extends the प्रगृह्य definition to include certain forms of the pronoun अदस्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.12
 */

import { detectScript } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaBase } from '../1.1.11/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaAdasForm as isPragrhyaAdasFormShared,
  analyzePragrhya,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

/**
 * Checks if a form of अदस् ending after म् is प्रगृह्य according to Sutra 1.1.12
 * 
 * @param {string} word - The word to check
 * @returns {boolean} - True if the word is a प्रगृह्य form of अदस्
 */
export function isPragrhyaAdasForm(word) {
  if (!word) {
    return false;
  }

  // Use shared implementation
  return isPragrhyaAdasFormShared(word);
}

/**
 * Extended प्रगृह्य checker that includes अदस् forms
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word is प्रगृह्य
 */
export function isPragrhya(word, context = {}) {
  if (!word) {
    return false;
  }

  // Use shared pragrhya analysis, but limit to sutras up to 1.1.12
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12']);
}

/**
 * Checks if sandhi should be prevented due to प्रगृह्य status (including अदस् forms)
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
