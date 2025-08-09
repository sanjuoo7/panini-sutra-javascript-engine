/**
 * Sutra 1.1.12: अदसो मात् (adaso māt)
 * "The same letters after the म् of the pronoun अदस् are प्रगृह्य।"
 * 
 * This extends the प्रगृह्य definition to include certain forms of the pronoun अदस्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.12
 */

import { detectScript } from '../shared/index.js';
import { isPragrhya as isPragrhyaBase } from '../1.1.11/index.js';

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

  try {
    const script = detectScript(word);
    
    if (script === 'Devanagari') {
      // Check for forms like अमी, अमू, अमे (exactly "अम" + vowel)
      return /^अम[ीूे]$/.test(word);
    } else {
      // IAST forms like amī, amū, ame (exactly "am" + vowel)
      return /^am[īūe]$/.test(word);
    }
  } catch (error) {
    return false;
  }
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

  // Check base प्रगृह्य definition (1.1.11)
  if (isPragrhyaBase(word, context)) {
    return true;
  }

  // Check अदस् forms (1.1.12)
  return isPragrhyaAdasForm(word);
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

  return isPragrhya(firstWord, context);
}
