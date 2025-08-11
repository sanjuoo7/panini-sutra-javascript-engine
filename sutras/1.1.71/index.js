import { tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.71: आदिरन्त्येन सहेता
 * "An initial letter, with a final इत् letter, is the name of itself and of the intervening letters."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.71 - The fundamental pratyāhāra rule
 */

/**
 * Constructs a pratyāhāra (group of letters) based on start and end markers.
 * According to the sutra, a pratyāhāra consists of all letters from the initial letter
 * up to and including the letter before the इत् marker.
 *
 * @param {string} startLetter - The initial letter of the pratyāhāra
 * @param {string} itMarker - The इत् marker letter
 * @param {string[]} alphabet - Array of phonemes to search within
 * @returns {string[]} Array of letters included in the pratyāhāra
 */
export function getPratyahara(startLetter, itMarker, alphabet = null) {
  if (typeof startLetter !== 'string' || typeof itMarker !== 'string') {
    return [];
  }

  if (startLetter.length === 0 || itMarker.length === 0) {
    return [];
  }

  // Use Śivasūtras with इत् markers as default alphabet
  const phonemes = alphabet || SHIVA_SUTRAS_WITH_IT;

  const startIndex = phonemes.indexOf(startLetter);
  const itIndex = phonemes.indexOf(itMarker);

  if (startIndex === -1 || itIndex === -1 || startIndex >= itIndex) {
    return [];
  }

  // Include all phonemes from start up to (but not including) the इत् marker
  return phonemes.slice(startIndex, itIndex);
}

/**
 * Standard Sanskrit alphabet for pratyāhāra construction (Śivasūtras)
 * These are the 14 Śivasūtras that form the basis of Panini's grammar
 * Each sūtra ends with an इत् letter that is used as a marker
 */
export const SHIVA_SUTRAS = [
  // Sūtra 1: अइउण् (a i u ṇ)
  'a', 'i', 'u',
  // Sūtra 2: ऋऌक् (ṛ ḷ k)  
  'ṛ', 'ḷ',
  // Sūtra 3: एओङ् (e o ṅ)
  'e', 'o',
  // Sūtra 4: ऐऔच् (ai au c)
  'ai', 'au',
  // Sūtra 5: हयवरट् (h y v r ṭ)
  'h', 'y', 'v', 'r',
  // Sūtra 6: लण् (l ṇ) - Note: second ṇ is the इत्
  'l',
  // Sūtra 7: ञमङणनम् (ñ m ṅ ṇ n m) - m is the इत्
  'ñ', 'm', 'ṅ', 'ṇ', 'n',
  // Sūtra 8: झभञ् (jh bh ñ) - ñ is the इत्
  'jh', 'bh',
  // Sūtra 9: घढधष् (gh ḍh dh ṣ) - ṣ is the इत्
  'gh', 'ḍh', 'dh',
  // Sūtra 10: जबगडदश् (j b g ḍ d ś) - ś is the इत्
  'j', 'b', 'g', 'ḍ', 'd',
  // Sūtra 11: खफछठथचटतव् (kh ph ch ṭh th c ṭ t v) - v is the इत्
  'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't',
  // Sūtra 12: कपय् (k p y) - y is the इत्
  'k', 'p',
  // Sūtra 13: शषसर् (ś ṣ s r) - r is the इत्
  'ś', 'ṣ', 's',
  // Sūtra 14: हल् (h l) - l is the इत्
  'h'
];

/**
 * Include the इत् markers for pratyāhāra construction
 */
export const SHIVA_SUTRAS_WITH_IT = [
  // Sūtra 1: अइउण्
  'a', 'i', 'u', 'ṇ',
  // Sūtra 2: ऋऌक्  
  'ṛ', 'ḷ', 'k',
  // Sūtra 3: एओङ्
  'e', 'o', 'ṅ',
  // Sūtra 4: ऐऔच्
  'ai', 'au', 'c',
  // Sūtra 5: हयवरट्
  'h', 'y', 'v', 'r', 'ṭ',
  // Sūtra 6: लण्
  'l', 'ṇ',
  // Sūtra 7: ञमङणनम्
  'ñ', 'm', 'ṅ', 'ṇ', 'n', 'm',
  // Sūtra 8: झभञ्
  'jh', 'bh', 'ñ',
  // Sūtra 9: घढधष्
  'gh', 'ḍh', 'dh', 'ṣ',
  // Sūtra 10: जबगडदश्
  'j', 'b', 'g', 'ḍ', 'd', 'ś',
  // Sūtra 11: खफछठथचटतव्
  'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't', 'v',
  // Sūtra 12: कपय्
  'k', 'p', 'y',
  // Sūtra 13: शषसर्
  'ś', 'ṣ', 's', 'r',
  // Sūtra 14: हल्
  'h', 'l'
];

/**
 * Common pratyāhāras used in Paninian grammar
 */
export const COMMON_PRATYAHARAS = {
  'ac': ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au'], // All vowels (अच्)
  'hal': ['h', 'y', 'v', 'r', 'l', 'ñ', 'm', 'ṅ', 'ṇ', 'n', 'jh', 'bh', 'gh', 'ḍh', 'dh', 'j', 'b', 'g', 'ḍ', 'd', 'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't', 'k', 'p', 'ś', 'ṣ', 's', 'h'], // All consonants (हल्)
  'ik': ['i', 'u', 'ṛ', 'ḷ'], // इक् vowels
  'aṇ': ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au', 'h', 'y', 'v', 'r'], // अण् (vowels + semivowels)
};

/**
 * Gets a pratyāhāra from the standard Śivasūtras
 *
 * @param {string} startLetter - The initial letter
 * @param {string} itMarker - The इत् marker
 * @returns {string[]} The pratyāhāra letters
 */
export function getShivaSutraPratyahara(startLetter, itMarker) {
  return getPratyahara(startLetter, itMarker, SHIVA_SUTRAS_WITH_IT);
}

/**
 * Gets a well-known pratyāhāra by name
 *
 * @param {string} name - The name of the pratyāhāra (e.g., 'ac', 'hal', 'ik', 'aṇ')
 * @returns {string[]} The letters in the pratyāhāra, or empty array if not found
 */
export function getCommonPratyahara(name) {
  return COMMON_PRATYAHARAS[name] || [];
}

/**
 * Validates if a given letter sequence forms a valid pratyāhāra
 *
 * @param {string} startLetter - The proposed start letter
 * @param {string} itMarker - The proposed इत् marker
 * @param {string[]} alphabet - The alphabet to validate against (defaults to Śivasūtras)
 * @returns {boolean} True if it forms a valid pratyāhāra
 */
export function isValidPratyahara(startLetter, itMarker, alphabet = null) {
  const pratyahara = getPratyahara(startLetter, itMarker, alphabet);
  return pratyahara.length > 0;
}
