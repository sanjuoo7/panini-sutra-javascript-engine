import { tokenizePhonemes, isVowel } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.64: aco'ntyādi ṭi
 * "The final portion of a word, beginning with the last among the vowels in the word, is called ṭi."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.64
 */

/**
 * Finds the 'ṭi' part of a Sanskrit word.
 * The 'ṭi' is defined as the segment of a word starting from its last vowel to the end.
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {string} The 'ṭi' part of the word, or an empty string if no vowel is found or input is invalid.
 */
export function getTi(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }

  const tokenizationResult = tokenizePhonemes(word);
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];

  if (phonemes.length === 0) {
    return '';
  }

  let lastVowelIndex = -1;
  for (let i = phonemes.length - 1; i >= 0; i--) {
    if (isVowel(phonemes[i])) {
      lastVowelIndex = i;
      break;
    }
  }

  if (lastVowelIndex === -1) {
    return ''; // No vowel found in the word.
  }

  return phonemes.slice(lastVowelIndex).join('');
}
