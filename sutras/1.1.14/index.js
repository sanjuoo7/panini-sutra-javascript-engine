/**
 * Sutra 1.1.14: निपात एकाजनाङ् (nipāta ekājanāṅ)
 * "A particle (निपात) consisting of a single vowel, with the exception of the particle आङ् is प्रगृह्य।"
 * 
 * This extends प्रगृह्य to single-vowel particles except आङ्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.14
 */

import { detectScript, isVowel } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.13/index.js';

/**
 * Checks if a word is a single-vowel particle (निपात) that is प्रगृह्य
 * 
 * @param {string} word - The word to check
 * @param {boolean} isParticle - Whether the word is classified as a particle
 * @returns {boolean} - True if it's a प्रगृह्य single-vowel particle
 */
export function isPragrhyaSingleVowelParticle(word, isParticle = true) {
  if (!word || !isParticle) {
    return false;
  }

  try {
    const script = detectScript(word);
    
    // Exception: आङ् is not प्रगृह्य
    if (script === 'Devanagari' && word === 'आङ्') {
      return false;
    }
    if (script === 'IAST' && word === 'āṅ') {
      return false;
    }

    // Check if it's a single vowel
    if (word.length === 1 && isVowel(word)) {
      return true;
    }

    // Handle vowels with anusvāra or visarga in Devanagari
    if (script === 'Devanagari') {
      const vowelPart = word.replace(/[ंः]$/, '');
      return vowelPart.length === 1 && isVowel(vowelPart);
    }

    // Handle vowels with anusvāra or visarga in IAST
    const vowelPart = word.replace(/[ṃḥ]$/, '');
    return vowelPart.length === 1 && isVowel(vowelPart);
  } catch (error) {
    return false;
  }
}

/**
 * Extended प्रगृह्य checker that includes single-vowel particles
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including particle status
 * @returns {boolean} - True if the word is प्रगृह्य
 */
export function isPragrhya(word, context = {}) {
  if (!word) {
    return false;
  }

  // Check previous प्रगृह्य definitions (1.1.11-1.1.13)
  if (isPragrhyaExtended(word, context)) {
    return true;
  }

  // Check single-vowel particles (1.1.14)
  // Only if explicitly marked as particle
  if (context.isParticle === true) {
    return isPragrhyaSingleVowelParticle(word, context.isParticle);
  }

  return false;
}

/**
 * Checks if sandhi should be prevented due to प्रगृह्य status
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
