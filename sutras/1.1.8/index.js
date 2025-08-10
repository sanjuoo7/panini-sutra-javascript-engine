import { Phoneme } from '../sanskrit-utils/phoneme.js';

/**
 * Checks if a phoneme is an anunasika (nasal) according to Sutra 1.1.8.
 * @param {string} char The phoneme character (IAST or Devanagari).
 * @returns {boolean} True if the phoneme is an anunasika, false otherwise.
 */
export function isAnunasika(char) {
  try {
    const phoneme = new Phoneme(char);
    return phoneme.isAnunasika();
  } catch (error) {
    // If the phoneme is not found in the matrix, it's not an anunasika.
    return false;
  }
}