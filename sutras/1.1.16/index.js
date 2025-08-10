/**
 * Sutra 1.1.16: सम्बुद्धौ शाकल्यस्येतावनार्षे (sambuddhau śākalyasyetāvanārṣe)
 * "The final ओ of a vocative singular before इति according to Śākalya, in non-Vedic literature is pragṛhya."
 * 
 * This extends the pragṛhya rules for specific vocative contexts.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.16
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.15/index.js';

/**
 * Checks if a vocative singular ending in 'o' before 'iti' is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including next word and case
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaVocativeO(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    const { nextWord, grammaticalCase, isVedic = false } = context;
    
    // Only applies in non-Vedic literature
    if (isVedic) {
      return false;
    }
    
    // Must be vocative case
    if (grammaticalCase !== 'vocative') {
      return false;
    }
    
    // Must be followed by 'iti'
    if (nextWord !== 'iti' && nextWord !== 'इति') {
      return false;
    }
    
    // Check for final 'o' or 'ो' (vowel sign, not independent vowel)
    if (script === 'Devanagari') {
      return word.endsWith('ो'); // vowel sign attached to consonant
    } else {
      return word.endsWith('o');
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
  return isPragrhyaVocativeO(word, context);
}

/**
 * Gets examples of vocative forms that are pragṛhya before 'iti'
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of example words
 */
export function getVocativeOExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['रामो', 'देवो', 'पुत्रो', 'गुरो'];
  } else {
    return ['rāmo', 'devo', 'putro', 'guro'];
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
