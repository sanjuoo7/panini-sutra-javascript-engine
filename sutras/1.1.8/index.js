/**
 * Sutra 1.1.8: मुखनासिकावचनो'नुनासिकः
 * "A sound pronounced through both mouth and nose is called anunāsika"
 * 
 * This foundational sutra defines the technical term 'anunāsika' for nasal sounds.
 * It establishes that sounds requiring simultaneous oral and nasal airflow
 * receive the designation अनुनासिक (anunāsika).
 */

import { Phoneme } from '../sanskrit-utils/phoneme.js';
import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';

// Comprehensive anunāsika phoneme data
const ANUNASIKA_PHONEMES = {
  devanagari: ['ङ्', 'ञ्', 'ण्', 'न्', 'म्', 'ङ', 'ञ', 'ण', 'न', 'म', 'ं'],
  iast: ['ṅ', 'ñ', 'ṇ', 'n', 'm', 'ṃ']
};

// Articulatory classification data
const ARTICULATION_DATA = {
  'ङ': { place: 'कण्ठ (kaṇṭha)', manner: 'स्पर्श (sparśa)', class: 'कवर्ग (kavarga)' },
  'ञ': { place: 'तालु (tālu)', manner: 'स्पर्श (sparśa)', class: 'चवर्ग (cavarga)' },
  'ण': { place: 'मूर्धा (mūrdhā)', manner: 'स्पर्श (sparśa)', class: 'टवर्ग (ṭavarga)' },
  'न': { place: 'दन्त (danta)', manner: 'स्पर्श (sparśa)', class: 'तवर्ग (tavarga)' },
  'म': { place: 'ओष्ठ (oṣṭha)', manner: 'स्पर्श (sparśa)', class: 'पवर्ग (pavarga)' },
  'ं': { place: 'अनुस्वार (anusvāra)', manner: 'अनुनासिक (anunāsika)', class: 'विशेष (viśeṣa)' }
};

/**
 * Enhanced educational function implementing Sutra 1.1.8
 * @param {string} phoneme - The phoneme to analyze for anunāsika classification
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive educational analysis
 */
export function sutra118(phoneme, options = {}) {
  const {
    includeExamples = true,
    includeArticulation = true,
    includeTradition = true,
    scriptPreference = null
  } = options;

  // Handle empty input
  if (typeof phoneme !== 'string' || phoneme.trim() === '') {
    return {
      input: phoneme,
      sutraApplied: '1.1.8',
      sutraName: 'mukhanāsikāvacano\'nunāsikaḥ',
      sutraText: 'मुखनासिकावचनो\'नुनासिकः',
      applies: false,
      isAnunasika: false,
      error: phoneme === '' ? 'empty_input' : 'invalid_phoneme_input',
      explanation: 'Invalid input provided for anunāsika analysis'
    };
  }

  const script = detectScript(phoneme);
  const normalizedPhoneme = normalizeScript(phoneme);
  
  // Core anunāsika analysis
  let isAnunasika = false;
  let articulationDetails = null;
  
  try {
    const phonemeObj = new Phoneme(phoneme);
    isAnunasika = phonemeObj.isAnunasika();
    
    // Get detailed articulation information
    if (includeArticulation && isAnunasika) {
      const phonemeKey = script === 'devanagari' ? phoneme : normalizedPhoneme;
      articulationDetails = ARTICULATION_DATA[phonemeKey] || null;
    }
  } catch (error) {
    isAnunasika = false;
  }

  // Alternative method: Direct classification check
  if (!isAnunasika) {
    isAnunasika = ANUNASIKA_PHONEMES.devanagari.includes(phoneme) || 
                  ANUNASIKA_PHONEMES.iast.includes(phoneme) ||
                  ANUNASIKA_PHONEMES.iast.includes(normalizedPhoneme);
  }

  // Build comprehensive analysis
  const analysis = {
    input: phoneme,
    sutraApplied: '1.1.8',
    sutraName: 'mukhanāsikāvacano\'nunāsikaḥ',
    sutraText: 'मुखनासिकावचनो\'नुनासिकः',
    applies: isAnunasika,
    isAnunasika: isAnunasika,
    
    // Classification details
    classification: isAnunasika ? 'अनुनासिक (anunāsika)' : 'अननुनासिक (ananunāsika)',
    phoneticNature: isAnunasika ? 'nasal_sound' : 'oral_sound',
    
    // Script information
    script: script,
    normalizedForm: normalizedPhoneme,
    
    // Linguistic explanation
    explanation: isAnunasika 
      ? `The phoneme '${phoneme}' is classified as अनुनासिक (anunāsika) because it requires simultaneous pronunciation through both mouth (मुख) and nose (नासिका)`
      : `The phoneme '${phoneme}' is not अनुनासिक (anunāsika) as it does not require nasal airflow during pronunciation`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'मुखनासिकावचनः अनुनासिकः',
      translation: 'That which is pronounced through mouth and nose is anunāsika',
      commentary: 'This sutra establishes the technical definition for nasal sounds in Sanskrit phonology'
    } : null,
    
    // Detailed phonetic analysis
    phoneticAnalysis: includeArticulation && articulationDetails ? {
      placeOfArticulation: articulationDetails.place,
      mannerOfArticulation: articulationDetails.manner,
      phoneticClass: articulationDetails.class,
      nasalAirflow: isAnunasika ? 'required' : 'not_required',
      oralAirflow: 'always_required'
    } : null,
    
    // Educational examples
    examples: includeExamples ? {
      anunasika: [
        { phoneme: 'ङ', word: 'अङ्गम्', meaning: 'limb', context: 'kavarga nasal' },
        { phoneme: 'ञ', word: 'यज्ञ', meaning: 'sacrifice', context: 'cavarga nasal' },
        { phoneme: 'ण', word: 'गुण', meaning: 'quality', context: 'ṭavarga nasal' },
        { phoneme: 'न', word: 'नाम', meaning: 'name', context: 'tavarga nasal' },
        { phoneme: 'म', word: 'माम', meaning: 'me', context: 'pavarga nasal' }
      ],
      nonAnunasika: [
        { phoneme: 'क', word: 'कमल', meaning: 'lotus', context: 'oral stop' },
        { phoneme: 'त', word: 'तत्', meaning: 'that', context: 'oral stop' },
        { phoneme: 'प', word: 'पत्र', meaning: 'leaf', context: 'oral stop' }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.9', name: 'tulyāsyaprayatnaṃ savarṇam', relation: 'savarna classification depends on anunāsika nature' },
      { sutra: '1.1.10', name: 'nājjhalau', relation: 'prohibits savarna between vowels and consonants' }
    ],
    
    // Confidence scoring
    confidence: isAnunasika ? 1.0 : 1.0, // Definitive classification
    analysisMethod: 'traditional_phoneme_matrix'
  };

  return analysis;
}

// Maintain backward compatibility
export function isAnunasika(char) {
  const result = sutra118(char);
  return result.isAnunasika;
}

export default sutra118;