/**
 * Sutra 1.1.15: ओत् (ot)
 * "The final ओ of a particle is a प्रगृह्य।"
 * 
 * This extends प्रगृह्य to particles ending in ओ.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.15
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.14/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaParticleEndingInO as isPragrhyaParticleEndingInOShared,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

/**
 * Checks if a particle ending in ओ is प्रगृह्य according to Sutra 1.1.15
 * 
 * @param {string} word - The word to check
 * @param {boolean} isParticle - Whether the word is classified as a particle
 * @returns {boolean} - True if it's a प्रगृह्य particle ending in ओ
 */
export function isPragrhyaParticleEndingInO(word, isParticle = true) {
  if (!word || !isParticle) {
    return false;
  }

  try {
    const script = detectScript(word);
    
    if (script === 'Devanagari') {
      return word.endsWith('ो'); // diacritic form of 'o'
    } else {
      // IAST
      return word.endsWith('o');
    }
  } catch (error) {
    return false;
  }
}

/**
 * Extended प्रगृह्य checker that includes particles ending in ओ
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including particle status
 * @returns {boolean} - True if the word is प्रगृह्य
 */
export function isPragrhya(word, context = {}) {
  if (!word) {
    return false;
  }

  // Check previous प्रगृह्य definitions (1.1.11-1.1.14)
  if (isPragrhyaExtended(word, context)) {
    return true;
  }

  // Check particles ending in ओ (1.1.15)
  // Only if explicitly marked as particle
  if (context.isParticle === true) {
    return isPragrhyaParticleEndingInO(word, context.isParticle);
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
