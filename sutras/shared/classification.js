/**
 * Vowel and Consonant Classification Utilities
 * 
 * This module provides classification functions for Sanskrit phonemes:
 * - Vowel classification (vṛddhi, guṇa, ik)
 * - Consonant classification
 * - Phoneme validation
 * 
 * Created: August 8, 2025
 */

import { SanskritVowels, SanskritConsonants } from './constants.js';

// ==================== VOWEL CLASSIFICATION ====================

/**
 * Checks if a character/string is a vṛddhi vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if vṛddhi vowel
 */
export function isVrddhi(vowel) {
  if (!vowel) return false;
  return SanskritVowels.vrddhi.iast.includes(vowel) || 
         SanskritVowels.vrddhi.devanagari.includes(vowel);
}

/**
 * Checks if a character/string is a guṇa vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if guṇa vowel
 */
export function isGuna(vowel) {
  if (!vowel) return false;
  return SanskritVowels.guna.iast.includes(vowel) || 
         SanskritVowels.guna.devanagari.includes(vowel);
}

/**
 * Checks if a character/string is an ik vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if ik vowel
 */
export function isIkVowel(vowel) {
  if (!vowel) return false;
  return SanskritVowels.ik.iast.includes(vowel) || 
         SanskritVowels.ik.devanagari.includes(vowel);
}

/**
 * Checks if a character/string is any Sanskrit vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if Sanskrit vowel
 */
export function isVowel(vowel) {
  if (!vowel) return false;
  return SanskritVowels.all.iast.includes(vowel) || 
         SanskritVowels.all.devanagari.includes(vowel) ||
         SanskritVowels.all.diacritics.includes(vowel);
}

/**
 * Checks if a character/string is a Sanskrit consonant
 * @param {string} consonant - Consonant to check
 * @returns {boolean} - True if Sanskrit consonant
 */
export function isConsonant(consonant) {
  if (!consonant) return false;
  return SanskritConsonants.all.iast.includes(consonant) || 
         SanskritConsonants.all.devanagari.includes(consonant) ||
         SanskritConsonants.special.devanagari.includes(consonant);
}

// ==================== ADVANCED CLASSIFICATION ====================

/**
 * Gets the vowel category for detailed classification
 * @param {string} vowel - Vowel to categorize
 * @returns {string|null} - Category name or null
 */
export function getVowelCategory(vowel) {
  if (!vowel) return null;
  
  // IAST categories
  if (vowel === 'ā' || vowel === 'आ') return 'long-a';
  if (vowel === 'ai' || vowel === 'ऐ') return 'diphthong-ai';
  if (vowel === 'au' || vowel === 'औ') return 'diphthong-au';
  if (vowel === 'a' || vowel === 'अ') return 'basic-a';
  if (vowel === 'e' || vowel === 'ए') return 'front-mid';
  if (vowel === 'o' || vowel === 'ओ') return 'back-mid';
  if (vowel === 'i' || vowel === 'इ') return 'high-front-short';
  if (vowel === 'ī' || vowel === 'ई') return 'high-front-long';
  if (vowel === 'u' || vowel === 'उ') return 'high-back-short';
  if (vowel === 'ū' || vowel === 'ऊ') return 'high-back-long';
  if (vowel === 'ṛ' || vowel === 'ऋ') return 'vocalic-r-short';
  if (vowel === 'ṝ' || vowel === 'ॠ') return 'vocalic-r-long';
  if (vowel === 'ḷ' || vowel === 'ऌ') return 'vocalic-l-short';
  if (vowel === 'ḹ' || vowel === 'ॡ') return 'vocalic-l-long';
  
  return null;
}

/**
 * Gets the primary classification of a vowel
 * @param {string} vowel - Vowel to classify
 * @returns {string} - Primary classification
 */
export function getPrimaryVowelClassification(vowel) {
  if (isVrddhi(vowel)) return 'vṛddhi';
  if (isGuna(vowel)) return 'guṇa';
  if (isIkVowel(vowel)) return 'ik';
  if (isVowel(vowel)) return 'vowel';
  return 'unknown';
}

/**
 * Gets comprehensive vowel classifications
 * @param {string} vowel - Vowel to analyze
 * @returns {Object} - All classification results
 */
export function getVowelClassifications(vowel) {
  return {
    isVrddhi: isVrddhi(vowel),
    isGuna: isGuna(vowel),
    isIk: isIkVowel(vowel),
    isVowel: isVowel(vowel),
    category: getVowelCategory(vowel),
    primary: getPrimaryVowelClassification(vowel)
  };
}

// ==================== CONSONANT CLASSIFICATION ====================

/**
 * Gets the place of articulation for a consonant
 * @param {string} consonant - Consonant to analyze
 * @returns {string|null} - Place of articulation or null
 */
export function getConsonantArticulation(consonant) {
  if (!consonant) return null;
  
  // Check each category
  const { stops, semivowels, sibilants, special } = SanskritConsonants;
  
  if (stops.velars.iast.includes(consonant) || stops.velars.devanagari.includes(consonant)) {
    return 'velar';
  }
  if (stops.palatals.iast.includes(consonant) || stops.palatals.devanagari.includes(consonant)) {
    return 'palatal';
  }
  if (stops.retroflexes.iast.includes(consonant) || stops.retroflexes.devanagari.includes(consonant)) {
    return 'retroflex';
  }
  if (stops.dentals.iast.includes(consonant) || stops.dentals.devanagari.includes(consonant)) {
    return 'dental';
  }
  if (stops.labials.iast.includes(consonant) || stops.labials.devanagari.includes(consonant)) {
    return 'labial';
  }
  if (semivowels.iast.includes(consonant) || semivowels.devanagari.includes(consonant)) {
    return 'semivowel';
  }
  if (sibilants.iast.includes(consonant) || sibilants.devanagari.includes(consonant)) {
    return 'sibilant';
  }
  if (special.iast.includes(consonant) || special.devanagari.includes(consonant)) {
    return 'special';
  }
  
  return null;
}

/**
 * Gets comprehensive consonant analysis
 * @param {string} consonant - Consonant to analyze
 * @returns {Object} - Detailed consonant information
 */
export function analyzeConsonant(consonant) {
  const isConsonantResult = isConsonant(consonant);
  const articulation = getConsonantArticulation(consonant);
  
  return {
    consonant,
    isConsonant: isConsonantResult,
    articulation,
    type: articulation || 'unknown',
    isValid: isConsonantResult,
    analysis: isConsonantResult ? 
      `${consonant} is a ${articulation} consonant` : 
      `${consonant} is not a Sanskrit consonant`
  };
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Gets all vowels of a specific classification
 * @param {'vrddhi'|'guna'|'ik'|'all'} classification - Classification type
 * @returns {Object} - Vowels in IAST and Devanagari
 */
export function getVowelsByClassification(classification) {
  const validClassifications = ['vrddhi', 'guna', 'ik', 'all'];
  if (!validClassifications.includes(classification)) {
    throw new Error(`Invalid classification: ${classification}. Must be one of: ${validClassifications.join(', ')}`);
  }
  
  return {
    iast: [...SanskritVowels[classification].iast],
    devanagari: [...SanskritVowels[classification].devanagari],
    description: SanskritVowels[classification].description
  };
}

/**
 * Gets all consonants of a specific type
 * @param {'stops'|'semivowels'|'sibilants'|'special'|'all'} type - Consonant type
 * @returns {Object} - Consonants in IAST and Devanagari
 */
export function getConsonantsByType(type) {
  if (type === 'all') {
    return {
      iast: [...SanskritConsonants.all.iast],
      devanagari: [...SanskritConsonants.all.devanagari]
    };
  }
  
  if (type === 'stops') {
    const allStops = {
      iast: [],
      devanagari: []
    };
    
    Object.values(SanskritConsonants.stops).forEach(stopGroup => {
      allStops.iast.push(...stopGroup.iast);
      allStops.devanagari.push(...stopGroup.devanagari);
    });
    
    return allStops;
  }
  
  if (SanskritConsonants[type]) {
    return {
      iast: [...SanskritConsonants[type].iast],
      devanagari: [...SanskritConsonants[type].devanagari]
    };
  }
  
  throw new Error(`Invalid consonant type: ${type}`);
}
