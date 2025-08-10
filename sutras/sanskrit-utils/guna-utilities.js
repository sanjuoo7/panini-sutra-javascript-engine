/**
 * Shared guṇa utilities for Sanskrit phonological transformations
 * 
 * This module provides common guṇa transformation functions that can be used
 * across multiple sutras without creating forward dependencies between sutra modules.
 */

import { isIkVowel } from './classification.js';
import { applyGunaTransformation } from './vowel-analysis.js';

/**
 * Gets the guṇa form of a given vowel
 * @param {string} vowel - Sanskrit vowel in IAST or Devanagari
 * @returns {string|null} The guṇa form if applicable, null otherwise
 */
export function getGunaForm(vowel) {
  if (!isIkVowel(vowel)) {
    return null;
  }
  
  return applyGunaTransformation(vowel);
}

/**
 * Applies guṇa transformation to a vowel
 * @param {string} vowel - Sanskrit vowel in IAST or Devanagari
 * @returns {string} The transformed vowel (unchanged if not ik vowel)
 */
export function applyGuna(vowel) {
  // Handle special cases for non-ik vowels that tests expect
  if (vowel === 'a' || vowel === 'अ') return vowel; // already guṇa
  if (vowel === 'e' || vowel === 'ए') return vowel; // already guṇa  
  if (vowel === 'o' || vowel === 'ओ') return vowel; // already guṇa
  if (vowel === 'ā' || vowel === 'आ') return vowel; // vṛddhi, no change
  if (vowel === 'ai' || vowel === 'ऐ') return vowel; // vṛddhi, no change
  if (vowel === 'au' || vowel === 'औ') return vowel; // vṛddhi, no change
  
  const gunaForm = getGunaForm(vowel);
  return gunaForm !== null ? gunaForm : vowel;
}

/**
 * Checks if a vowel is a valid guṇa vowel (e, o, ar, al)
 * @param {string} vowel - Sanskrit vowel to check
 * @returns {boolean} True if it's a guṇa vowel
 */
export function isGunaVowel(vowel) {
  const gunaVowels = ['e', 'o', 'ar', 'al'];
  return gunaVowels.includes(vowel);
}

/**
 * Checks if a transformation from source to target is a valid guṇa transformation
 * @param {string} source - Source vowel
 * @param {string} target - Target vowel
 * @returns {boolean} True if it's a valid guṇa transformation
 */
export function isValidGunaTransformation(source, target) {
  const expectedGuna = getGunaForm(source);
  return expectedGuna === target;
}
