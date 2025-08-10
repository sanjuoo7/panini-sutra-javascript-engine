/**
 * Sutra 1.1.10: नाज्झलौ (najahaslau)
 * "There is however no homogeneity between vowels and consonants, though their place and effort be equal."
 * 
 * This is a sañjñā (definition) sutra that establishes that vowels and consonants
 * cannot be homogeneous (savarṇa) even if they share the same place of articulation.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.10
 */

import { isVowel, isConsonant } from '../sanskrit-utils/index.js';

/**
 * Checks if two phonemes are homogeneous (savarṇa) according to Sutra 1.1.10.
 * Vowels and consonants can never be savarṇa, even if they share articulation place.
 * 
 * @param {string} phoneme1 - First phoneme to compare
 * @param {string} phoneme2 - Second phoneme to compare
 * @returns {boolean} - False if vowel-consonant pair (not homogeneous), 
 *                     true if same type (further analysis needed)
 */
export function checkHomogeneityRestriction(phoneme1, phoneme2) {
  if (!phoneme1 || !phoneme2) {
    return false;
  }

  try {
    const vowel1 = isVowel(phoneme1);
    const vowel2 = isVowel(phoneme2);
    const consonant1 = isConsonant(phoneme1);
    const consonant2 = isConsonant(phoneme2);

    // If one is vowel and other is consonant, they cannot be savarṇa
    // Return false to indicate they are not homogeneous
    if ((vowel1 && consonant2) || (consonant1 && vowel2)) {
      return false;
    }

    // If either phoneme is unknown (neither vowel nor consonant), 
    // assume no homogeneity possible
    if ((!vowel1 && !consonant1) || (!vowel2 && !consonant2)) {
      return false;
    }

    // If both are vowels or both are consonants, this sutra doesn't apply
    // Return true to indicate further analysis is needed
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Determines if vowel-consonant homogeneity is blocked by Sutra 1.1.10
 * 
 * @param {string} phoneme1 - First phoneme
 * @param {string} phoneme2 - Second phoneme
 * @returns {boolean} - True if homogeneity is blocked by this sutra
 */
export function isHomogeneityBlocked(phoneme1, phoneme2) {
  return !checkHomogeneityRestriction(phoneme1, phoneme2);
}

/**
 * Analyzes the types of two phonemes and their compatibility
 * 
 * @param {string} phoneme1 - First phoneme
 * @param {string} phoneme2 - Second phoneme
 * @returns {Object} Analysis of phoneme types and restrictions
 */
export function analyzePhonemeTypes(phoneme1, phoneme2) {
  if (!phoneme1 || !phoneme2) {
    return { 
      phoneme1Type: 'unknown', 
      phoneme2Type: 'unknown', 
      restriction: 'invalid_input' 
    };
  }

  try {
    const type1 = isVowel(phoneme1) ? 'vowel' : (isConsonant(phoneme1) ? 'consonant' : 'unknown');
    const type2 = isVowel(phoneme2) ? 'vowel' : (isConsonant(phoneme2) ? 'consonant' : 'unknown');
    
    let restriction = 'none';
    
    if ((type1 === 'vowel' && type2 === 'consonant') || 
        (type1 === 'consonant' && type2 === 'vowel')) {
      restriction = 'vowel_consonant_incompatible';
    }
    
    return {
      phoneme1Type: type1,
      phoneme2Type: type2,
      restriction: restriction,
      homogeneityBlocked: restriction === 'vowel_consonant_incompatible'
    };
  } catch (error) {
    return { 
      phoneme1Type: 'unknown', 
      phoneme2Type: 'unknown', 
      restriction: 'error' 
    };
  }
}

/**
 * Gets examples for educational purposes
 * 
 * @returns {Object} Examples of different phoneme combinations
 */
export function getHomogeneityExamples() {
  return {
    vowelConsonantPairs: [
      ['a', 'k'], ['i', 't'], ['u', 'p'], ['e', 'c'], ['o', 'ṭ'],
      ['ā', 'g'], ['ī', 'd'], ['ū', 'b'], ['ai', 'j'], ['au', 'ḍ']
    ],
    allowedVowelPairs: [
      ['a', 'ā'], ['i', 'ī'], ['u', 'ū'], ['e', 'ai'], ['o', 'au']
    ],
    allowedConsonantPairs: [
      ['k', 'g'], ['c', 'j'], ['t', 'd'], ['p', 'b'], ['ṭ', 'ḍ']
    ]
  };
}
