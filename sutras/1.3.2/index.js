// Sutra 1.3.2: उपदेशेऽजनुनासिक इत्
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isVowel, isNasalizedVowel } from '../sanskrit-utils/classification.js';
import { normalizeScript } from '../sanskrit-utils/transliteration.js';
import { sanitizeInput } from '../sanskrit-utils/validation.js';

/**
 * Determines if a given character is a non-nasalized vowel (it marker) in upadeśa context.
 * @param {string} form - The input character or string.
 * @param {object} [options] - Optional context.
 * @returns {{ isIt: boolean, vowel: string|null, script: string, reason: string }}
 */
function isNonNasalizedVowelItMarker(form, options = {}) {
  if (!form || typeof form !== 'string') {
    return { isIt: false, vowel: null, script: null, reason: 'invalid-input' };
  }

  const script = detectScript(form);
  // Use the raw form for vowel checks since normalizeScript might affect nasalization
  const trimmed = form.trim();

  if (!trimmed) {
    return { isIt: false, vowel: null, script, reason: 'invalid-input' };
  }

  // First check if it's a vowel
  if (!isVowel(trimmed)) {
    return { isIt: false, vowel: trimmed, script, reason: 'not-vowel' };
  }

  // Then check for nasalization
  if (isNasalizedVowel(trimmed)) {
    return { isIt: false, vowel: trimmed, script, reason: 'nasalized-vowel' };
  }

  // Valid non-nasalized vowel found - normalize for consistency in return value
  const norm = normalizeScript(trimmed);
  return { isIt: true, vowel: norm, script, reason: 'non-nasalized-vowel' };
}

export { isNonNasalizedVowelItMarker };
