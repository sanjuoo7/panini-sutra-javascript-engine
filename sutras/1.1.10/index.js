/**
 * Sutra 1.1.10: नाज्झलौ
 * "There is no savarṇa between vowels (अच्) and consonants (हल्)"
 * 
 * This crucial prohibition sutra restricts the application of savarṇa (homogeneity)
 * defined in 1.1.9. Even if a vowel and consonant share the same place of 
 * articulation and manner, they cannot be considered savarṇa.
 * 
 * The sutra uses the term अज्झलौ (ajjhalau) where:
 * - अच् (ac) = vowels
 * - हल् (hal) = consonants
 */

import { isVowel, isConsonant } from '../sanskrit-utils/index.js';
import { detectScript, normalizeScript } from '../sanskrit-utils/index.js';

// Comprehensive vowel-consonant articulation data for educational examples
const ARTICULATION_EXAMPLES = {
  'कण्ठ': {
    vowels: ['अ', 'आ'],
    consonants: ['क', 'ख', 'ग', 'घ', 'ङ', 'ह'],
    description: 'Guttural/velar sounds'
  },
  'तालु': {
    vowels: ['इ', 'ई', 'ए', 'ऐ'],
    consonants: ['च', 'छ', 'ज', 'झ', 'ञ', 'य', 'श'],
    description: 'Palatal sounds'
  },
  'मूर्धा': {
    vowels: ['ऋ', 'ॠ'],
    consonants: ['ट', 'ठ', 'ड', 'ढ', 'ण', 'र', 'ष'],
    description: 'Retroflex/cerebral sounds'
  },
  'दन्त': {
    vowels: [],
    consonants: ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
    description: 'Dental sounds'
  },
  'ओष्ठ': {
    vowels: ['उ', 'ऊ', 'ओ', 'औ'],
    consonants: ['प', 'फ', 'ब', 'भ', 'म', 'व'],
    description: 'Labial sounds'
  }
};

/**
 * Enhanced educational function implementing Sutra 1.1.10
 * @param {string} phoneme1 - First phoneme to analyze
 * @param {string} phoneme2 - Second phoneme to analyze
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive prohibition analysis
 */
export function sutra1110(phoneme1, phoneme2, options = {}) {
  const {
    includeExamples = true,
    includeArticulation = true,
    includeTradition = true,
    explainException = true
  } = options;

  // Handle invalid input
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string') {
    return {
      input: { phoneme1, phoneme2 },
      sutraApplied: '1.1.10',
      sutraName: 'nājjhalau',
      sutraText: 'नाज्झलौ',
      applies: false,
      isProhibited: false,
      error: 'invalid_phoneme_input',
      explanation: 'Both phonemes must be valid strings for prohibition analysis'
    };
  }

  const script1 = detectScript(phoneme1);
  const script2 = detectScript(phoneme2);
  const normalized1 = normalizeScript(phoneme1);
  const normalized2 = normalizeScript(phoneme2);

  // Analyze phoneme types
  let type1, type2;
  try {
    type1 = isVowel(phoneme1) ? 'vowel' : (isConsonant(phoneme1) ? 'consonant' : 'unknown');
    type2 = isVowel(phoneme2) ? 'vowel' : (isConsonant(phoneme2) ? 'consonant' : 'unknown');
  } catch (error) {
    type1 = type2 = 'unknown';
  }

  // Check if prohibition applies
  const isVowelConsonantPair = (type1 === 'vowel' && type2 === 'consonant') || 
                              (type1 === 'consonant' && type2 === 'vowel');
  const isProhibited = isVowelConsonantPair;

  // Find articulation place if available
  let articulationPlace = null;
  let sharedPlace = false;
  
  if (includeArticulation) {
    for (const [place, data] of Object.entries(ARTICULATION_EXAMPLES)) {
      const hasVowel = data.vowels.includes(phoneme1) || data.vowels.includes(phoneme2);
      const hasConsonant = data.consonants.includes(phoneme1) || data.consonants.includes(phoneme2);
      
      if (hasVowel && hasConsonant) {
        articulationPlace = place;
        sharedPlace = true;
        break;
      }
    }
  }

  // Build comprehensive analysis
  const analysis = {
    input: { phoneme1, phoneme2 },
    sutraApplied: '1.1.10',
    sutraName: 'nājjhalau',
    sutraText: 'नाज्झलौ',
    applies: isProhibited,
    isProhibited: isProhibited,
    
    // Classification details
    phonemeTypes: { phoneme1: type1, phoneme2: type2 },
    prohibitionReason: isProhibited ? 'vowel_consonant_incompatibility' : 'same_type_phonemes',
    
    // Script information
    scripts: { phoneme1: script1, phoneme2: script2 },
    normalizedForms: { phoneme1: normalized1, phoneme2: normalized2 },
    
    // Detailed explanation
    explanation: isProhibited 
      ? `Sutra 1.1.10 prohibits savarṇa between '${phoneme1}' (${type1}) and '${phoneme2}' (${type2}), even though they may share articulation properties`
      : `Sutra 1.1.10 does not apply to '${phoneme1}' and '${phoneme2}' as they are both ${type1}s - further savarṇa analysis by 1.1.9 is needed`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'न अच् हलौ सवर्णे',
      translation: 'Vowels and consonants are not savarṇa',
      commentary: 'This prohibition ensures that even articulatorily similar vowels and consonants remain distinct phonological classes'
    } : null,
    
    // Articulation analysis
    articulationAnalysis: includeArticulation ? {
      sharedPlace: sharedPlace,
      articulationPlace: articulationPlace,
      explanation: sharedPlace 
        ? `Despite sharing ${articulationPlace} place of articulation, savarṇa is prohibited`
        : 'No shared articulation place detected'
    } : null,
    
    // Educational examples
    examples: includeExamples ? {
      prohibitedPairs: [
        { pair: ['अ', 'क'], place: 'कण्ठ', explanation: 'Both guttural but अ is vowel, क is consonant' },
        { pair: ['इ', 'च'], place: 'तालु', explanation: 'Both palatal but इ is vowel, च is consonant' },
        { pair: ['उ', 'प'], place: 'ओष्ठ', explanation: 'Both labial but उ is vowel, प is consonant' }
      ],
      allowedVowelPairs: [
        { pair: ['अ', 'आ'], explanation: 'Both vowels, savarṇa analysis by 1.1.9 applies' },
        { pair: ['इ', 'ई'], explanation: 'Both vowels, savarṇa analysis by 1.1.9 applies' }
      ],
      allowedConsonantPairs: [
        { pair: ['क', 'ख'], explanation: 'Both consonants, savarṇa analysis by 1.1.9 applies' },
        { pair: ['त', 'द'], explanation: 'Both consonants, savarṇa analysis by 1.1.9 applies' }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.9', name: 'tulyāsyaprayatnaṃ savarṇam', relation: 'defines savarṇa, restricted by this prohibition' },
      { sutra: '1.1.8', name: 'mukhanāsikāvacano\'nunāsikaḥ', relation: 'anunāsika classification relevant for consonant analysis' },
      { sutra: '6.1.101', name: 'akaḥ savarṇe dīrghaḥ', relation: 'savarṇa operations apply only within same phoneme class' }
    ],
    
    // Exception analysis
    exceptionAnalysis: explainException && !isProhibited ? {
      reason: 'same_phoneme_type',
      nextStep: 'apply_sutra_1_1_9',
      explanation: 'Since both phonemes are the same type, proceed with standard savarṇa analysis'
    } : null,
    
    // Confidence scoring
    confidence: (type1 !== 'unknown' && type2 !== 'unknown') ? 1.0 : 0.5,
    analysisMethod: 'phoneme_type_classification'
  };

  return analysis;
}

// Maintain backward compatibility functions
export function checkHomogeneityRestriction(phoneme1, phoneme2) {
  const result = sutra1110(phoneme1, phoneme2);
  return !result.isProhibited;
}

export function isHomogeneityBlocked(phoneme1, phoneme2) {
  const result = sutra1110(phoneme1, phoneme2);
  return result.isProhibited;
}

export function analyzePhonemeTypes(phoneme1, phoneme2) {
  const result = sutra1110(phoneme1, phoneme2);
  return {
    phoneme1Type: result.phonemeTypes.phoneme1,
    phoneme2Type: result.phonemeTypes.phoneme2,
    restriction: result.isProhibited ? 'vowel_consonant_incompatible' : 'none',
    homogeneityBlocked: result.isProhibited
  };
}

export function getHomogeneityExamples() {
  const result = sutra1110('अ', 'क', { includeExamples: true });
  return {
    vowelConsonantPairs: result.examples.prohibitedPairs.map(ex => ex.pair),
    allowedVowelPairs: result.examples.allowedVowelPairs.map(ex => ex.pair),
    allowedConsonantPairs: result.examples.allowedConsonantPairs.map(ex => ex.pair)
  };
}

export default sutra1110;
