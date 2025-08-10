/**
 * Sutra 1.1.22: तरप्तमपौ घः (taraptamapau ghaḥ)
 * "The affixes तरप् and तमप् are called घ।"
 * 
 * This is a saṃjñā (definition) sutra that defines the technical term घ
 * for the comparative (तरप्) and superlative (तमप्) affixes.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.22
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';

/**
 * List of affixes that are classified as घ
 */
const GHA_AFFIXES = {
  iast: ['tarap', 'tamap'],
  devanagari: ['तरप्', 'तमप्']
};

/**
 * Checks if an affix is classified as घ according to Sutra 1.1.22
 * 
 * @param {string} affix - The affix to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the affix is घ
 */
export function isGha(affix, context = {}) {
  if (!affix) {
    return false;
  }

  try {
    const script = detectScript(affix);
    
    if (script === 'Devanagari') {
      return GHA_AFFIXES.devanagari.includes(affix);
    } else {
      return GHA_AFFIXES.iast.includes(affix);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Gets all घ affixes
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of घ affixes
 */
export function getGhaAffixes(script = 'IAST') {
  if (script === 'Devanagari') {
    return [...GHA_AFFIXES.devanagari];
  } else {
    return [...GHA_AFFIXES.iast];
  }
}

/**
 * Checks if a word contains a घ affix
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Morphological context
 * @returns {boolean} - True if word contains घ affix
 */
export function hasGhaAffix(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    const affixes = script === 'Devanagari' ? GHA_AFFIXES.devanagari : GHA_AFFIXES.iast;
    
    return affixes.some(affix => word.includes(affix));
  } catch (error) {
    return false;
  }
}

/**
 * Identifies the type of घ affix in a word
 * 
 * @param {string} word - The word to analyze
 * @returns {Object} - Information about the घ affix
 */
export function identifyGhaType(word) {
  if (!word) {
    return { hasGha: false, type: null, degree: null };
  }

  try {
    const script = detectScript(word);
    
    if (script === 'Devanagari') {
      if (word.includes('तरप्')) {
        return { hasGha: true, type: 'तरप्', degree: 'comparative', script: 'Devanagari' };
      }
      if (word.includes('तमप्')) {
        return { hasGha: true, type: 'तमप्', degree: 'superlative', script: 'Devanagari' };
      }
    } else {
      if (word.includes('tarap')) {
        return { hasGha: true, type: 'tarap', degree: 'comparative', script: 'IAST' };
      }
      if (word.includes('tamap')) {
        return { hasGha: true, type: 'tamap', degree: 'superlative', script: 'IAST' };
      }
    }
    
    return { hasGha: false, type: null, degree: null };
  } catch (error) {
    return { hasGha: false, type: null, degree: null };
  }
}

/**
 * Checks if घ rules should apply to a word or affix
 * 
 * @param {string} input - The input to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if घ rules apply
 */
export function hasGhaBehavior(input, context = {}) {
  return isGha(input, context) || hasGhaAffix(input, context);
}

/**
 * Gets examples of words formed with घ affixes
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {Object} - Examples organized by affix type
 */
export function getGhaExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return {
      tarap: ['गुरुतरप्', 'लघुतरप्', 'श्रेष्ठतरप्'],
      tamap: ['गुरुतमप्', 'लघुतमप्', 'श्रेष्ठतमप्']
    };
  } else {
    return {
      tarap: ['gurutarap', 'laghutarap', 'śreṣṭhatarap'],
      tamap: ['gurutamap', 'laghutamap', 'śreṣṭhatamap']
    };
  }
}
