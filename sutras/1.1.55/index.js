import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

/**
 * Sutra 1.1.55: anekāla śit sarvasya (अनेकाल्शित्सर्वस्य)
 * "A substitute consisting of more than one letter and a substitute having an indicatory श् take the place of the whole of the original expression exhibited in the Genitive 6th-Case."
 *
 * This rule specifies that if a substitute is either:
 * 1. Composed of more than one phoneme (anekāla - multi-letter), OR
 * 2. Has an indicatory 'ś' (śit),
 * then it replaces the *entire* original expression, overriding rules like 1.1.52 (alo'ntyasya)
 * and 1.1.54 (ādeḥ parasya) which replace only a part of the original.
 *
 * @param {string} originalWord - The word or expression to be replaced.
 * @param {string} substitute - The substitute phoneme(s) or word.
 * @param {boolean} isShit - A boolean indicating if the substitute has an indicatory 'ś' (śit).
 * @param {string} script - The script of the input ('IAST' or 'Devanagari').
 * @returns {string} The substitute if the rule applies (i.e., the whole originalWord is replaced), otherwise the originalWord.
 *                   Note: This function returns the substitute if the rule applies, otherwise the originalWord.
 *                   It's up to the calling function to decide what to do if the rule doesn't apply.
 *
 * @example
 * // Multi-letter substitute (anekāla)
 * applyAnekalShitSarvasya('rāma', 'devau', false, 'IAST'); // returns 'devau'
 * applyAnekalShitSarvasya('राम', 'देवौ', false, 'Devanagari'); // returns 'देवौ'
 *
 * // Śit substitute
 * applyAnekalShitSarvasya('rāma', 'e', true, 'IAST'); // returns 'e' (assuming 'e' is a śit substitute in context)
 * applyAnekalShitSarvasya('राम', 'ए', true, 'Devanagari'); // returns 'ए' (assuming 'ए' is a śit substitute in context)
 *
 * // Rule does not apply
 * applyAnekalShitSarvasya('rāma', 'a', false, 'IAST'); // returns 'rāma' (single letter, not śit)
 */
export function applyAnekalShitSarvasya(originalWord, substitute, isShit, script) {
  if (!originalWord || typeof originalWord !== 'string' || !substitute || typeof substitute !== 'string' || typeof isShit !== 'boolean' || !script || typeof script !== 'string') {
    throw new Error('Invalid input: originalWord, substitute, and script must be non-empty strings, and isShit must be a boolean.');
  }

  const { phonemes: substitutePhonemes } = tokenizePhonemes(substitute);

  // Check if substitute is anekāla (multi-letter) or śit
  if (substitutePhonemes.length > 1 || isShit) {
    return substitute; // Replaces the whole originalWord
  }

  return originalWord; // Rule does not apply, originalWord remains
}