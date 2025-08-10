/**
 * Sutra 1.1.18: ऊँ (ūṃ)
 * "The particle ऊँ replaces उञ in non-Vedic literature and it is pragṛhya in the opinion of Śākalya."
 * 
 * This sutra introduces ऊँ as a pragṛhya particle replacing ऊञ्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.18
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.17/index.js';

/**
 * Checks if the particle ऊँ is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaOm(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    const { isVedic = false } = context;
    
    // This rule applies particularly in non-Vedic literature
    // but we'll allow it generally as per Śākalya's opinion
    
    // Check for the specific particle ऊँ (Om with anusvara)
    if (script === 'Devanagari') {
      return word === 'ऊँ' || word === 'ओम्' || word === 'ओं';
    } else {
      return word === 'ūṃ' || word === 'oṃ' || word === 'om';
    }
  } catch (error) {
    return false;
  }
}

/**
 * Main pragṛhya check that includes this sutra's rule
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word is pragṛhya
 */
export function isPragrhya(word, context = {}) {
  // Check base pragṛhya rules from previous sutras
  if (basePragrhya(word, context)) {
    return true;
  }
  
  // Check this sutra's specific rule
  return isPragrhyaOm(word, context);
}

/**
 * Gets the Om particle forms covered by this sutra
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of Om forms
 */
export function getOmForms(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['ऊँ', 'ओम्', 'ओं'];
  } else {
    return ['ūṃ', 'oṃ', 'om'];
  }
}

/**
 * Checks if a word is the sacred Om particle
 * 
 * @param {string} word - The word to check
 * @returns {boolean} - True if it's an Om form
 */
export function isOmParticle(word) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    if (script === 'Devanagari') {
      return ['ऊँ', 'ओम्', 'ओं'].includes(word);
    } else {
      return ['ūṃ', 'oṃ', 'om'].includes(word);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Checks if pragṛhya behavior should apply according to this sutra
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if pragṛhya rules apply
 */
export function hasPragrhyaBehavior(word, context = {}) {
  return isPragrhya(word, context);
}
