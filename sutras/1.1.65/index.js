import { tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.65: alo'ntyāt pūrva upadhā
 * "The letter immediately preceding the last letter of a word is called penultimate (upadhā)."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.65
 */

/**
 * Finds the 'upadhā' (penultimate letter) of a Sanskrit word.
 * The 'upadhā' is the phoneme immediately preceding the final phoneme of a word.
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {string} The 'upadhā' of the word, or an empty string if the word has fewer than two phonemes.
 */
export function getUpadha(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }

  const tokenizationResult = tokenizePhonemes(word, { accurate: true });
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];

  if (phonemes.length < 2) {
    return '';
  }

  return phonemes[phonemes.length - 2];
}
