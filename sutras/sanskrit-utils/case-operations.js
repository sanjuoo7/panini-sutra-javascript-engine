/**
 * Case Operations Utility
 * 
 * Centralizes common case-related operations used across multiple sutras
 * Eliminates redundancy in case ending detection, base extraction, etc.
 */

import { SanskritWordLists } from './constants.js';

/**
 * Extracts the base form of a Sanskrit word by removing case endings
 * @param {string} word - The inflected word
 * @returns {string} Base form without case endings
 */
export function getWordBase(word) {
  if (!word || typeof word !== 'string') {
    return '';
  }
  
  let base = word.toLowerCase();
  
  // Try IAST case endings first
  for (const ending of SanskritWordLists.caseEndings.iast) {
    if (base.endsWith(ending)) {
      base = base.slice(0, -ending.length);
      break;
    }
  }
  
  return base;
}

/**
 * Checks if a word has a specific affix pattern
 * @param {string} word - The word to check
 * @param {string[]} patterns - Array of affix patterns to check for
 * @param {Object} context - Additional context (may contain affix information)
 * @returns {boolean} True if word has the affix
 */
export function hasAffixPattern(word, patterns, context = {}) {
  if (!word || !patterns) {
    return false;
  }
  
  // Check context for explicit affix information
  if (context.affixes) {
    return patterns.some(pattern => context.affixes.includes(pattern));
  }
  
  // Check word for pattern inclusion
  return patterns.some(pattern => word.includes(pattern));
}

/**
 * Validates if a word is in a specific word list
 * @param {string} word - The word to check
 * @param {Object} wordList - Word list object with iast and devanagari arrays
 * @returns {boolean} True if word is found in the list
 */
export function isInWordList(word, wordList) {
  if (!word || !wordList) {
    return false;
  }
  
  const base = getWordBase(word);
  
  // Check both IAST and Devanagari lists
  return wordList.iast.includes(base) || 
         wordList.devanagari.includes(word) ||
         wordList.iast.includes(word) ||
         wordList.devanagari.includes(base);
}

/**
 * Checks if a word has Taya affix (specifically for 1.1.33)
 * @param {string} word - The word to check
 * @param {Object} context - Context with potential affix information
 * @returns {boolean} True if word has taya affix
 */
export function hasTayaAffix(word, context = {}) {
  return hasAffixPattern(word, SanskritWordLists.tayaAffixPatterns.iast, context);
}

/**
 * Validates if a word qualifies under ordinal/quantitative rules (1.1.33)
 * @param {string} word - Word to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result with detailed information
 */
export function validatePrathmaadi(word, context = {}) {
  if (!word) {
    return {
      is_prathmaadi: false,
      has_taya_affix: false,
      word_base: '',
      qualifies: false,
      reason: 'Invalid word input'
    };
  }
  
  const word_base = getWordBase(word);
  const is_prathmaadi = isInWordList(word, SanskritWordLists.prathmaadi);
  const has_taya = hasTayaAffix(word, context);
  
  return {
    is_prathmaadi,
    has_taya_affix: has_taya,
    word_base,
    qualifies: is_prathmaadi || has_taya,
    reason: is_prathmaadi ? 'Word is in prathmaadi list' : 
            has_taya ? 'Word has taya affix' : 
            'Word does not qualify under 1.1.33'
  };
}

/**
 * Checks if a word is followed by nominative plural (jas)
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} True if followed by jas
 */
export function isFollowedByJas(word, context = {}) {
  // Check explicit context first
  if (context.case && context.case.vibhakti === 'prathama' && context.case.vacana === 'bahuvacana') {
    return true;
  }
  
  if (context.vibhakti === 'prathama' && context.vacana === 'bahuvacana') {
    return true;
  }
  
  // Only check word endings if no explicit context is provided
  if (!context.case && !context.vibhakti) {
    const jasPatterns = ['āḥ', 'ān', 'as', 'āni'];
    return jasPatterns.some(pattern => word.endsWith(pattern));
  }
  
  return false;
}
