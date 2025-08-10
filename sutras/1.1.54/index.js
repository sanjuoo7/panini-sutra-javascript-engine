import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

/**
 * Sutra 1.1.54: ādeḥ parasya (आदेः परस्य)
 * "That which is enjoined to come in the room of what follows is to be understood as coming in the room only of the first letter thereof."
 *
 * This rule specifies that when a substitution is prescribed for a subsequent word or a group of phonemes,
 * the substitute replaces only the *first* phoneme of that subsequent element.
 *
 * @param {string} targetWord - The word or sequence of phonemes whose first phoneme is to be replaced.
 * @param {string} substitute - The phoneme that replaces the first phoneme of the targetWord.
 * @param {string} script - The script of the input ('IAST' or 'Devanagari').
 * @returns {string} The modified word with the first phoneme replaced by the substitute.
 *
 * @example
 * // IAST examples
 * applyAadehParasya('iti', 'a', 'IAST'); // returns 'ati'
 * applyAadehParasya('gacchati', 'a', 'IAST'); // returns 'acchati'
 *
 * // Devanagari examples
 * applyAadehParasya('इति', 'अ', 'Devanagari'); // returns 'अति'
 * applyAadehParasya('गच्छति', 'अ', 'Devanagari'); // returns 'अच्छति'
 */
export function applyAadehParasya(targetWord, substitute, script) {
  if (!targetWord || typeof targetWord !== 'string' || !substitute || typeof substitute !== 'string' || !script || typeof script !== 'string') {
    throw new Error('Invalid input: targetWord, substitute, and script must be non-empty strings.');
  }

  const { phonemes } = tokenizePhonemes(targetWord);

  if (phonemes.length === 0) {
    return targetWord; // No phonemes to replace
  }

  // Replace the first phoneme
  phonemes[0] = substitute;

  // Reconstruct the word
  return phonemes.join('');
}