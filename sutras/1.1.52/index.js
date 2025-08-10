import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

/**
 * Sutra 1.1.52: alo'ntyasya (अलोऽन्त्यस्य)
 * "The substitute takes the place of only the final letter (of that which is denoted by a term exhibited in the Genitive 6th-Case)."
 *
 * This rule specifies that when a substitution is prescribed for a word or a group of phonemes,
 * the substitute replaces only the *last* phoneme of the original.
 *
 * @param {string} originalWord - The word or sequence of phonemes whose last phoneme is to be replaced.
 * @param {string} substitute - The phoneme that replaces the last phoneme of the originalWord.
 * @param {string} script - The script of the input ('IAST' or 'Devanagari').
 * @returns {string} The modified word with the last phoneme replaced by the substitute.
 *
 * @example
 * // IAST examples
 * applyAlontyasya('rāma', 'e', 'IAST'); // returns 'rāme'
 * applyAlontyasya('devau', 'i', 'IAST'); // returns 'devi'
 *
 * // Devanagari examples
 * applyAlontyasya('राम', 'ए', 'Devanagari'); // returns 'रामे'
 * applyAlontyasya('देवौ', 'इ', 'Devanagari'); // returns 'देवइ'
 */
export function applyAlontyasya(originalWord, substitute, script) {
  if (!originalWord || typeof originalWord !== 'string' || !substitute || typeof substitute !== 'string' || !script || typeof script !== 'string') {
    throw new Error('Invalid input: originalWord, substitute, and script must be non-empty strings.');
  }

  const { phonemes } = tokenizePhonemes(originalWord);

  if (phonemes.length === 0) {
    return originalWord; // No phonemes to replace
  }

  // Replace the last phoneme
  phonemes[phonemes.length - 1] = substitute;

  // Reconstruct the word. We need to ensure the script is maintained.
  // tokenizePhonemes returns an array of phonemes in the detected script.
  // We need to join them back, potentially transliterating if the original script was different
  // or if the substitute changed the script. For simplicity, we assume the substitute is in the same script.
  // A more robust solution might involve transliterating the substitute to the original script first.
  // For now, we'll just join and assume consistency.

  // This is a simplification. A full implementation might need to re-transliterate the entire phoneme array
  // if the script of the substitute is different or if the original word was mixed script.
  // For the purpose of this rule, we assume the substitute is provided in the target script.
  return phonemes.join('');
}