/**
 * Pratyāhāra Construction Utilities
 * 
 * This module provides utilities for constructing and working with pratyāhāras
 * (phoneme groups) according to Pāṇini's system. Based on Sutra 1.1.71: आदिरन्त्येन सहेता
 * 
 * The pratyāhāra system allows referring to groups of sounds using just two letters:
 * the first sound of the group and an इत् (marker) letter from the Śivasūtras.
 * 
 * Used by: Sutra 1.1.71, and extensively throughout Pāṇinian grammar for
 * phonological classifications and rules.
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * The 14 Śivasūtras that form the basis of Pāṇini's grammar.
 * Each sūtra contains phonemes followed by an इत् (marker) letter.
 */
export const SHIVA_SUTRAS = [
  // Sūtra 1: अइउण् (a i u ṇ) - vowels with ṇ as इत्
  'a', 'i', 'u',
  // Sūtra 2: ऋऌक् (ṛ ḷ k) - vocalic r/l with k as इत्
  'ṛ', 'ḷ',
  // Sūtra 3: एओङ् (e o ṅ) - compound vowels with ṅ as इत्
  'e', 'o',
  // Sūtra 4: ऐऔच् (ai au c) - diphthongs with c as इत्
  'ai', 'au',
  // Sūtra 5: हयवरट् (h y v r ṭ) - semivowels with ṭ as इत्
  'h', 'y', 'v', 'r',
  // Sūtra 6: लण् (l ṇ) - l with ṇ as इत्
  'l',
  // Sūtra 7: ञमङणनम् (ñ m ṅ ṇ n m) - nasals with m as इत्
  'ñ', 'm', 'ṅ', 'ṇ', 'n',
  // Sūtra 8: झभञ् (jh bh ñ) - aspirated voiced stops with ñ as इत्
  'jh', 'bh',
  // Sūtra 9: घढधष् (gh ḍh dh ṣ) - aspirated voiced stops with ṣ as इत्
  'gh', 'ḍh', 'dh',
  // Sūtra 10: जबगडदश् (j b g ḍ d ś) - unaspirated voiced stops with ś as इत्
  'j', 'b', 'g', 'ḍ', 'd',
  // Sūtra 11: खफछठथचटतव् (kh ph ch ṭh th c ṭ t v) - unaspirated voiceless stops with v as इत्
  'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't',
  // Sūtra 12: कपय् (k p y) - unaspirated voiceless stops with y as इत्
  'k', 'p',
  // Sūtra 13: शषसर् (ś ṣ s r) - sibilants with r as इत्
  'ś', 'ṣ', 's',
  // Sūtra 14: हल् (h l) - h with l as इत्
  'h'
];

/**
 * Complete Śivasūtras including इत् markers for pratyāhāra construction
 * Structured to match traditional Śivasūtra sequence
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
 * Common pratyāhāras used frequently in Pāṇinian grammar
 * Note: इत् markers are excluded from the pratyāhāra as per Sutra 1.1.71
 */
export const COMMON_PRATYAHARAS = {
  // अच् - All vowels (from 'a' to इत् 'c', excluding 'c')
  'ac': ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au'],
  
  // हल् - All consonants (from 'h' to इत् 'l', excluding 'l')
  'hal': ['h', 'y', 'v', 'r', 'ñ', 'm', 'ṅ', 'ṇ', 'n', 'jh', 'bh', 'gh', 'ḍh', 'dh', 'j', 'b', 'g', 'ḍ', 'd', 'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't', 'k', 'p', 'ś', 'ṣ', 's', 'h'],
  
  // इक् - Close vowels (from 'i' to इत् 'k', excluding 'k')
  'ik': ['i', 'u', 'ṛ', 'ḷ'],
  
  // अण् - Vowels and semivowels (from 'a' to इत् 'ṇ', excluding 'ṇ')
  'aṇ': ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au', 'h', 'y', 'v', 'r', 'l'],
  
  // यञ् - Semivowels (from 'y' to इत् 'ñ', excluding 'ñ')
  'yañ': ['y', 'v', 'r', 'l'],
  
  // झल् - All consonants except nasals (from 'jh' to इत् 'l', excluding 'l')
  'jhal': ['jh', 'bh', 'gh', 'ḍh', 'dh', 'j', 'b', 'g', 'ḍ', 'd', 'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't', 'k', 'p', 'ś', 'ṣ', 's', 'h'],
  
  // शल् - Sibilants and h (from 'ś' to इत् 'l', excluding 'l')
  'śal': ['ś', 'ṣ', 's', 'h']
};

/**
 * Positions of इत् markers in SHIVA_SUTRAS_WITH_IT array
 * These specific positions should be excluded from pratyāhāras
 */
export const IT_MARKER_POSITIONS = [
  3,   // ṇ from Sūtra 1 (अइउण्)
  6,   // k from Sūtra 2 (ऋऌक्)
  9,   // ṅ from Sūtra 3 (एओङ्)
  12,  // c from Sūtra 4 (ऐऔच्)
  17,  // ṭ from Sūtra 5 (हयवरट्)
  19,  // ṇ from Sūtra 6 (लण्)
  25,  // m from Sūtra 7 (ञमङणनम्)
  28,  // ñ from Sūtra 8 (झभञ्)
  32,  // ṣ from Sūtra 9 (घढधष्)
  38,  // ś from Sūtra 10 (जबगडदश्)
  47,  // v from Sūtra 11 (खफछठथचटतव्)
  50,  // y from Sūtra 12 (कपय्)
  54,  // r from Sūtra 13 (शषसर्)
  56   // l from Sūtra 14 (हल्)
];

/**
 * IT_MARKERS found in the Śivasūtras
 */
export const IT_MARKERS = ['ṇ', 'k', 'ṅ', 'c', 'ṭ', 'ṇ', 'm', 'ñ', 'ṣ', 'ś', 'v', 'y', 'r', 'l'];

/**
 * Constructs a pratyāhāra (group of phonemes) based on start and end markers.
 * According to Sutra 1.1.71, a pratyāhāra consists of all phonemes from the 
 * initial phoneme up to (but not including) the इत् marker.
 * 
 * @param {string} startPhoneme - The initial phoneme of the pratyāhāra
 * @param {string} itMarker - The इत् marker phoneme
 * @param {string[]} [alphabet=null] - Custom alphabet to search within (defaults to Śivasūtras)
 * @returns {Object} Object containing the pratyāhāra phonemes and metadata
 */
export function constructPratyahara(startPhoneme, itMarker, alphabet = null) {
  // Input validation
  if (!startPhoneme || !itMarker || 
      typeof startPhoneme !== 'string' || typeof itMarker !== 'string') {
    return {
      pratyahara: [],
      valid: false,
      error: 'Invalid input: start phoneme and इत् marker must be non-empty strings'
    };
  }

  // Use Śivasūtras with इत् markers as default alphabet
  const phonemes = alphabet || SHIVA_SUTRAS_WITH_IT;

  // Handle special case for traditional pratyāhāras with multiple occurrences
  let startIndex = -1;
  let itIndex = -1;

  // Special handling for अण् (a to ṇ) - use ṇ from Sūtra 6 (position 19)
  if (startPhoneme === 'a' && itMarker === 'ṇ') {
    startIndex = phonemes.indexOf('a'); // First a
    // Find the ṇ that's the इत् of Sūtra 6 (after 'l')
    const lIndex = phonemes.indexOf('l');
    itIndex = phonemes.indexOf('ṇ', lIndex);
  }
  // Special handling for हल् (h to l) - use first h and last l
  else if (startPhoneme === 'h' && itMarker === 'l') {
    startIndex = phonemes.indexOf('h'); // First h
    itIndex = phonemes.lastIndexOf('l'); // Last l
  } else {
    // For most pratyāhāras, use first occurrence of start and the appropriate इत्
    startIndex = phonemes.indexOf(startPhoneme);
    
    // For the इत् marker, we need to find the correct occurrence
    // Usually the first occurrence after the start phoneme
    itIndex = phonemes.indexOf(itMarker, startIndex);
    
    // If not found after start, try the first occurrence
    if (itIndex === -1) {
      itIndex = phonemes.indexOf(itMarker);
    }
  }

  if (startIndex === -1) {
    return {
      pratyahara: [],
      valid: false,
      error: `Start phoneme '${startPhoneme}' not found in alphabet`
    };
  }

  if (itIndex === -1) {
    return {
      pratyahara: [],
      valid: false,
      error: `इत् marker '${itMarker}' not found in alphabet`
    };
  }

  if (startIndex >= itIndex) {
    return {
      pratyahara: [],
      valid: false,
      error: `Start phoneme must come before इत् marker in the alphabet`
    };
  }

  // Include all phonemes from start up to (but not including) the इत् marker
  const pratyaharaPhonemes = phonemes.slice(startIndex, itIndex);
  
  // Filter out इत् markers based on whether we're using Śivasūtras or custom alphabet
  let filteredPhonemes;
  
  if (alphabet === null || alphabet === SHIVA_SUTRAS_WITH_IT) {
    // For Śivasūtras, use traditional rules:
    // 1. Filter out specific इत् marker positions
    // 2. Only filter out the इत् marker phoneme if it matches the ending इत् marker
    //    (e.g., only remove 'l' from हल् pratyāhāra, not from अण् pratyāhāra)
    filteredPhonemes = pratyaharaPhonemes.filter((phoneme, index) => {
      const absoluteIndex = startIndex + index;
      const isAtItMarkerPosition = IT_MARKER_POSITIONS.includes(absoluteIndex);
      const isEndingItMarkerPhoneme = phoneme === itMarker;
      return !isAtItMarkerPosition && !isEndingItMarkerPhoneme;
    });
  } else {
    // For custom alphabets, don't filter इत् markers since they may be valid phonemes
    filteredPhonemes = pratyaharaPhonemes;
  }

  return {
    pratyahara: filteredPhonemes,
    valid: true,
    startPhoneme,
    itMarker,
    length: filteredPhonemes.length,
    type: determinePratyaharaType(filteredPhonemes),
    traditional: isTraditionalPratyahara(startPhoneme, itMarker)
  };
}

/**
 * Gets a well-known pratyāhāra by its traditional name
 * 
 * @param {string} name - The traditional name of the pratyāhāra (e.g., 'ac', 'hal', 'ik')
 * @returns {Object} Object containing the pratyāhāra phonemes and metadata
 */
export function getCommonPratyahara(name) {
  if (!name || typeof name !== 'string') {
    return {
      pratyahara: [],
      valid: false,
      error: 'Invalid pratyāhāra name'
    };
  }

  const normalizedName = name.toLowerCase();
  const phonemes = COMMON_PRATYAHARAS[normalizedName];

  if (!phonemes) {
    return {
      pratyahara: [],
      valid: false,
      error: `Unknown pratyāhāra name: ${name}`
    };
  }

  return {
    pratyahara: phonemes,
    valid: true,
    name: normalizedName,
    length: phonemes.length,
    type: determinePratyaharaType(phonemes),
    traditional: true
  };
}

/**
 * Validates if a given phoneme sequence forms a valid pratyāhāra
 * 
 * @param {string} startPhoneme - The proposed start phoneme
 * @param {string} itMarker - The proposed इत् marker
 * @param {string[]} [alphabet=null] - Custom alphabet to validate against
 * @returns {Object} Validation result with details
 */
export function validatePratyahara(startPhoneme, itMarker, alphabet = null) {
  const result = constructPratyahara(startPhoneme, itMarker, alphabet);
  
  return {
    valid: result.valid,
    pratyahara: result.pratyahara,
    length: result.length || 0,
    error: result.error || null,
    type: result.type || null
  };
}

/**
 * Checks if a phoneme belongs to a specific pratyāhāra
 * 
 * @param {string} phoneme - The phoneme to check
 * @param {string} pratyaharaName - Name of the pratyāhāra or start+इत्
 * @returns {Object} Membership result
 */
export function isPhonemeInPratyahara(phoneme, pratyaharaName) {
  if (!phoneme || !pratyaharaName || 
      typeof phoneme !== 'string' || typeof pratyaharaName !== 'string') {
    return {
      belongs: false,
      error: 'Invalid input parameters'
    };
  }

  // Try as common pratyāhāra name first
  let result = getCommonPratyahara(pratyaharaName);
  
  // If not found, try to parse as start+इत् combination
  if (!result.valid && pratyaharaName.length >= 2) {
    const startPhoneme = pratyaharaName.slice(0, -1);
    const itMarker = pratyaharaName.slice(-1);
    result = constructPratyahara(startPhoneme, itMarker);
  }

  if (!result.valid) {
    return {
      belongs: false,
      error: `Invalid pratyāhāra: ${pratyaharaName}`
    };
  }

  return {
    belongs: result.pratyahara.includes(phoneme),
    pratyahara: result.pratyahara,
    pratyaharaName
  };
}

/**
 * Finds all pratyāhāras that contain a given phoneme
 * 
 * @param {string} phoneme - The phoneme to search for
 * @returns {Object} Object containing all matching pratyāhāras
 */
export function findPratyaharasContaining(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return {
      matches: [],
      error: 'Invalid phoneme'
    };
  }

  const matches = [];

  // Check common pratyāhāras
  for (const [name, phonemes] of Object.entries(COMMON_PRATYAHARAS)) {
    if (phonemes.includes(phoneme)) {
      matches.push({
        name,
        type: 'common',
        pratyahara: phonemes
      });
    }
  }

  return {
    matches,
    phoneme,
    count: matches.length
  };
}

/**
 * Determines the type/category of a pratyāhāra based on its phonemes
 * 
 * @param {string[]} phonemes - Array of phonemes in the pratyāhāra
 * @returns {string} The type category
 */
function determinePratyaharaType(phonemes) {
  if (!phonemes || !Array.isArray(phonemes) || phonemes.length === 0) {
    return 'empty';
  }

  const vowels = ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au'];
  const consonants = ['h', 'y', 'v', 'r', 'l', 'ñ', 'm', 'ṅ', 'ṇ', 'n', 'jh', 'bh', 'gh', 'ḍh', 'dh', 'j', 'b', 'g', 'ḍ', 'd', 'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't', 'k', 'p', 'ś', 'ṣ', 's'];
  const semivowels = ['y', 'v', 'r', 'l'];
  const nasals = ['ñ', 'm', 'ṅ', 'ṇ', 'n'];

  const allVowels = phonemes.every(p => vowels.includes(p));
  const allConsonants = phonemes.every(p => consonants.includes(p));
  const allSemivowels = phonemes.every(p => semivowels.includes(p));
  const allNasals = phonemes.every(p => nasals.includes(p));

  if (allVowels) return 'vowels';
  if (allConsonants) return 'consonants';
  if (allSemivowels) return 'semivowels';
  if (allNasals) return 'nasals';
  
  return 'mixed';
}

/**
 * Checks if a start+इत् combination represents a traditional pratyāhāra
 * 
 * @param {string} startPhoneme - The start phoneme
 * @param {string} itMarker - The इत् marker
 * @returns {boolean} True if it's a traditional pratyāhāra
 */
function isTraditionalPratyahara(startPhoneme, itMarker) {
  const traditional = {
    'ac': ['a', 'c'],
    'hal': ['h', 'l'],
    'ik': ['i', 'k'],
    'aṇ': ['a', 'ṇ'],
    'yañ': ['y', 'ñ'],
    'jhal': ['jh', 'l'],
    'śal': ['ś', 'l']
  };

  for (const [name, [start, it]] of Object.entries(traditional)) {
    if (start === startPhoneme && it === itMarker) {
      return true;
    }
  }

  return false;
}

/**
 * Gets traditional examples of pratyāhāra usage in Pāṇinian grammar
 * 
 * @returns {Object} Examples and explanations
 */
export function getPratyaharaExamples() {
  return {
    principle: 'आदिरन्त्येन सहेता - Initial with final इत् denotes the group',
    
    common: {
      description: 'Most frequently used pratyāhāras in Pāṇinian grammar',
      examples: [
        {
          name: 'अच्',
          construction: ['a', 'c'],
          phonemes: ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au'],
          meaning: 'All vowels',
          usage: 'Used in rules about vowel changes, sandhi, etc.'
        },
        {
          name: 'हल्',
          construction: ['h', 'l'],
          phonemes: ['h', 'y', 'v', 'r', 'l', 'ñ', 'm', 'ṅ', 'ṇ', 'n', 'jh', 'bh', 'gh', 'ḍh', 'dh', 'j', 'b', 'g', 'ḍ', 'd', 'kh', 'ph', 'ch', 'ṭh', 'th', 'c', 'ṭ', 't', 'k', 'p', 'ś', 'ṣ', 's', 'h'],
          meaning: 'All consonants',
          usage: 'Used in rules about consonant modifications'
        },
        {
          name: 'इक्',
          construction: ['i', 'k'],
          phonemes: ['i', 'u', 'ṛ', 'ḷ'],
          meaning: 'Close vowels',
          usage: 'Used in guṇa and vṛddhi rules'
        }
      ]
    },
    
    construction: {
      description: 'How pratyāhāras are constructed from Śivasūtras',
      process: [
        'Take the initial phoneme (आदि)',
        'Take the इत् marker from a later sūtra',
        'Include all phonemes between them (excluding the इत्)',
        'The result is the pratyāhāra group'
      ],
      example: {
        input: 'To get vowels: start with अ (a), end with च् (c)',
        śivasūtras: 'अइउण् ऋऌक् एओङ् ऐऔच्',
        result: 'अ इ उ ऋ ऌ ए ओ ऐ औ (all vowels)',
        notation: 'अच्'
      }
    },
    
    traditionalNote: 'The pratyāhāra system provides an efficient way to refer to ' +
                    'phoneme groups, enabling concise grammatical rules that would ' +
                    'otherwise require lengthy enumerations.'
  };
}

export default {
  constructPratyahara,
  getCommonPratyahara,
  validatePratyahara,
  isPhonemeInPratyahara,
  findPratyaharasContaining,
  getPratyaharaExamples,
  SHIVA_SUTRAS,
  SHIVA_SUTRAS_WITH_IT,
  COMMON_PRATYAHARAS,
  IT_MARKERS
};
