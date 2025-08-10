import { SanskritVowels, SanskritConsonants } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.69: aṇudit savarṇasya cāpratyayaḥ
 * "The letters of the pratyāhāra अण् (aṇ) i.e. the vowels and semi-vowels and a term having
 * उ for its indicatory letter (udit), refer to their own form as well as to their homogeneous
 * letters, except when they are used as pratyaya-s or affixes."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.69
 */

// Define the 'aṇ' pratyāhāra letters (vowels and semi-vowels)
const anPratyahara = {
  iast: [...SanskritVowels.all.iast, ...SanskritConsonants.semivowels.iast, 'h'],
  devanagari: [...SanskritVowels.all.devanagari, ...SanskritConsonants.semivowels.devanagari, 'ह']
};

/**
 * Finds all homogeneous (`savarṇa`) phonemes for a given phoneme.
 *
 * @param {string} phoneme - The phoneme to find savarṇa for.
 * @param {Object} [options={}] - Options for the operation.
 * @param {boolean} [options.isPratyaya=false] - If true, the rule does not apply, and only the phoneme itself is returned.
 * @param {boolean} [options.isUdit=false] - If true, the phoneme is treated as an 'udit' (having an indicatory 'u').
 * @returns {string[]} An array of savarṇa phonemes.
 */
export function getSavarna(phoneme, options = {}) {
  const { isPratyaya = false, isUdit = false } = options;

  if (!phoneme || typeof phoneme !== 'string') {
    return [];
  }

  // If the phoneme is an affix (pratyaya), it does not represent its savarṇa.
  if (isPratyaya) {
    return [phoneme];
  }

  const isAn = anPratyahara.iast.includes(phoneme) || anPratyahara.devanagari.includes(phoneme);

  // The rule applies to 'aṇ' letters and 'udit' terms.
  if (!isAn && !isUdit) {
    return [phoneme];
  }

  // This is a simplified implementation. A full implementation would require a detailed
  // phonetic feature matrix to determine savarṇa based on 'tulyāsya-prayatnam' (1.1.9).
  // For now, we will handle the most common cases for vowels.
  // For example, 'a' represents 'ā', 'i' represents 'ī', etc.

  const vowelPairs = {
    'a': ['a', 'ā'], 'ā': ['a', 'ā'],
    'i': ['i', 'ī'], 'ī': ['i', 'ī'],
    'u': ['u', 'ū'], 'ū': ['u', 'ū'],
    'ṛ': ['ṛ', 'ṝ'], 'ṝ': ['ṛ', 'ṝ'],
    'ḷ': ['ḷ', 'ḹ'], 'ḹ': ['ḷ', 'ḹ'],
    'अ': ['अ', 'आ'], 'आ': ['अ', 'आ'],
    'इ': ['इ', 'ई'], 'ई': ['इ', 'ई'],
    'उ': ['उ', 'ऊ'], 'ऊ': ['उ', 'ऊ'],
    'ऋ': ['ऋ', 'ॠ'], 'ॠ': ['ऋ', 'ॠ'],
    'ऌ': ['ऌ', 'ॡ'], 'ॡ': ['ऌ', 'ॡ']
  };

  if (vowelPairs[phoneme]) {
    return vowelPairs[phoneme];
  }

  // For udit consonants, like 'ku', 'cu', 'ṭu', 'tu', 'pu', they represent their entire class.
  // This is a more complex feature that would require more data from constants.
  // For now, we return the phoneme itself if it's not a vowel with a clear pair.
  if (isUdit) {
      // Placeholder for udit logic
      if (phoneme === 'ku') return SanskritConsonants.stops.velars.iast;
      if (phoneme === 'cu') return SanskritConsonants.stops.palatals.iast;
      if (phoneme === 'ṭu') return SanskritConsonants.stops.retroflexes.iast;
      if (phoneme === 'tu') return SanskritConsonants.stops.dentals.iast;
      if (phoneme === 'pu') return SanskritConsonants.stops.labials.iast;
  }


  return [phoneme];
}
