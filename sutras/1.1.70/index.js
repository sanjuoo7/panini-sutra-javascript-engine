import { SanskritVowels } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.70: taparas tatkālasya
 * "The letter which has त् (t) after or before it, besides referring to its own form, refers
 * to those homogeneous letters which have the same prosodial length or time."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.70
 */

// Define vowel lengths for filtering
const vowelLengths = {
  short: ['a', 'i', 'u', 'ṛ', 'ḷ', 'अ', 'इ', 'उ', 'ऋ', 'ऌ'],
  long: ['ā', 'ī', 'ū', 'ṝ', 'ḹ', 'e', 'o', 'ai', 'au', 'आ', 'ई', 'ऊ', 'ॠ', 'ॡ', 'ए', 'ओ', 'ऐ', 'औ']
};

/**
 * Determines if a vowel is short.
 * @param {string} vowel The vowel to check.
 * @returns {boolean} True if the vowel is short.
 */
const isShort = (vowel) => vowelLengths.short.includes(vowel);

/**
 * Applies the 'tapara' rule to a phoneme.
 * This rule restricts a vowel to representing only its homogeneous (`savarṇa`) variations
 * of the same length. For example, 'at' (a followed by t) refers only to the short 'a',
 * not the long 'ā'. 'āt' refers only to the long 'ā'.
 *
 * @param {string} taparaPhoneme - The phoneme with the 't' marker (e.g., 'at', 'āt').
 * @returns {string[]} An array containing only the phoneme of the specified length.
 */
export function applyTapara(taparaPhoneme) {
  if (typeof taparaPhoneme !== 'string' || taparaPhoneme.length < 2) {
    return [taparaPhoneme];
  }

  const hasTAfter = taparaPhoneme.endsWith('t');
  const vowel = hasTAfter ? taparaPhoneme.slice(0, -1) : null;

  if (!vowel || !SanskritVowels.all.iast.includes(vowel)) {
      // If it's not a vowel followed by 't', the rule doesn't apply in its typical way.
      // A full implementation would also check for 't' before the vowel.
      // For now, we return the original term.
      return [taparaPhoneme];
  }

  // The rule restricts to the length of the vowel in the 'tapara' term.
  if (isShort(vowel)) {
    return [vowel];
  } else {
    // It's a long vowel. It refers only to itself.
    return [vowel];
  }
}
