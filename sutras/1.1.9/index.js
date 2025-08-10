
import { Phoneme } from '../sanskrit-utils/phoneme.js';

/**
 * Checks if two phonemes are savarna (homogeneous) according to Sutra 1.1.9.
 * @param {string} char1 The first phoneme character (IAST or Devanagari).
 * @param {string} char2 The second phoneme character (IAST or Devanagari).
 * @returns {boolean} True if the phonemes are savarna, false otherwise.
 */
export function isSavarna(char1, char2) {
  try {
    const phoneme1 = new Phoneme(char1);
    const phoneme2 = new Phoneme(char2);

    // Sutra 1.1.10 (nājjhalau) prohibits savarna relationship between vowels and consonants.
    if (phoneme1.type !== phoneme2.type) {
      return false;
    }

    return (
      phoneme1.placeOfArticulation === phoneme2.placeOfArticulation &&
      phoneme1.mannerOfArticulation === phoneme2.mannerOfArticulation
    );
  } catch (error) {
    // If either phoneme is not found in the matrix, they are not savarna.
    return false;
  }
}
