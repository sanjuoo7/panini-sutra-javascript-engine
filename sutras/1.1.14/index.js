/**
 * Sutra 1.1.14: निपात एकाजनाङ् (nipāta ekājanāṅ)
 * "A particle (निपात) consisting of a single vowel, with the exception of the particle आङ् is प्रगृह्य।"
 * 
 * This extends प्रगृह्य to single-vowel particles except आङ्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.14
 */

import { detectScript } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.13/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaSingleVowelParticle as isPragrhyaSingleVowelParticleShared,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

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

  // Use shared implementation with proper context
  const context = { isParticle: isParticle };
  return isPragrhyaSingleVowelParticleShared(word, context);
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

  // Use shared pragrhya analysis, but limit to sutras up to 1.1.14
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12', '1.1.13', '1.1.14']);
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

  return preventsSandhiShared(firstWord, secondWord, context);
}
