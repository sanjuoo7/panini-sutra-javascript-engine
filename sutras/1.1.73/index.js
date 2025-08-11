import { tokenizePhonemes, isVrddhi, isVowel } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.73: वृद्धिर्यस्याचामादिस्तद् वृद्धम्
 * "That word, among the vowels of which the first is a वृद्धि, is called वृद्धम्।"
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.73
 */

/**
 * Determines if a Sanskrit word is वृद्धम् (vṛddham).
 * A word is वृद्धम् if its first vowel is a वृद्धि vowel (आ, ऐ, औ).
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {boolean} True if the word is वृद्धम्, false otherwise.
 */
export function isVrddham(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return false;
  }

  const tokenizationResult = tokenizePhonemes(word, { accurate: true });
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];

  if (phonemes.length === 0) {
    return false;
  }

  // Find the first vowel in the word
  for (const phoneme of phonemes) {
    if (isVrddhi(phoneme)) {
      return true; // First vowel found and it's vṛddhi
    }
    // If we encounter any other vowel first, it's not vṛddham
    if (isVowel(phoneme) && !isVrddhi(phoneme)) {
      return false;
    }
  }

  return false; // No vowel found
}
