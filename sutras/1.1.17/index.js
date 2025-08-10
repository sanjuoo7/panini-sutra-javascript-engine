/**
 * Sutra 1.1.17: उञः (uñaḥ)
 * "The particle ऊञ् before इति, according to Śākalya is pragṛhya."
 * 
 * This sutra extends pragṛhya rules to the specific particle ऊञ्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.17
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.16/index.js';

/**
 * Checks if the particle ऊञ् before 'iti' is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including next word
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaUnj(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    const { nextWord } = context;
    
    // Must be followed by 'iti'
    if (nextWord !== 'iti' && nextWord !== 'इति') {
      return false;
    }
    
    // Check for the specific particle ऊञ्
    if (script === 'Devanagari') {
      return word === 'ऊञ्' || word === 'ऊञ';
    } else {
      return word === 'ūñ' || word === 'uñ';
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
  return isPragrhyaUnj(word, context);
}

/**
 * Gets the particle forms covered by this sutra
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of particle forms
 */
export function getUnjParticles(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['ऊञ्', 'ऊञ'];
  } else {
    return ['ūñ', 'uñ'];
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
