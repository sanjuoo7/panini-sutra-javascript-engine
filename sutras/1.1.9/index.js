
/**
 * Sutra 1.1.9: तुल्यास्यप्रयत्नं सवर्णम्
 * "Phonemes having the same place of articulation and manner of effort are savarṇa"
 * 
 * This crucial sutra defines homogeneity (savarṇatva) in Sanskrit phonology.
 * Two sounds are सवर्ण (savarṇa) if they share identical articulatory properties:
 * 1. आस्य (āsya) - place of articulation
 * 2. प्रयत्न (prayatna) - manner of effort/articulation
 */

import { Phoneme } from '../sanskrit-utils/phoneme.js';
import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';

// Comprehensive savarṇa classification data
const SAVARNA_GROUPS = {
  'अ_वर्ग': ['अ', 'आ'], // short and long 'a'
  'इ_वर्ग': ['इ', 'ई'], // short and long 'i'  
  'उ_वर्ग': ['उ', 'ऊ'], // short and long 'u'
  'ऋ_वर्ग': ['ऋ', 'ॠ'], // short and long 'ṛ'
  'ऌ_वर्ग': ['ऌ', 'ॡ'], // short and long 'ḷ'
  'क_वर्ग': ['क', 'ख', 'ग', 'घ', 'ङ'], // kavarga
  'च_वर्ग': ['च', 'छ', 'ज', 'झ', 'ञ'], // cavarga
  'ट_वर्ग': ['ट', 'ठ', 'ड', 'ढ', 'ण'], // ṭavarga
  'त_वर्ग': ['त', 'थ', 'द', 'ध', 'न'], // tavarga
  'प_वर्ग': ['प', 'फ', 'ब', 'भ', 'म']  // pavarga
};

// Detailed articulatory properties
const ARTICULATION_PROPERTIES = {
  'अ': { place: 'कण्ठ', manner: 'विवृत', type: 'स्वर', duration: 'ह्रस्व' },
  'आ': { place: 'कण्ठ', manner: 'विवृत', type: 'स्वर', duration: 'दीर्घ' },
  'इ': { place: 'तालु', manner: 'संवृत', type: 'स्वर', duration: 'ह्रस्व' },
  'ई': { place: 'तालु', manner: 'संवृत', type: 'स्वर', duration: 'दीर्घ' },
  'उ': { place: 'ओष्ठ', manner: 'संवृत', type: 'स्वर', duration: 'ह्रस्व' },
  'ऊ': { place: 'ओष्ठ', manner: 'संवृत', type: 'स्वर', duration: 'दीर्घ' },
  'क': { place: 'कण्ठ', manner: 'स्पर्श_अघोष_अल्पप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'ख': { place: 'कण्ठ', manner: 'स्पर्श_अघोष_महाप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'ग': { place: 'कण्ठ', manner: 'स्पर्श_घोष_अल्पप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'घ': { place: 'कण्ठ', manner: 'स्पर्श_घोष_महाप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'ङ': { place: 'कण्ठ', manner: 'अनुनासिक', type: 'व्यञ्जन', class: 'कवर्ग' }
};

/**
 * Enhanced educational function implementing Sutra 1.1.9
 * @param {string} phoneme1 - First phoneme to compare
 * @param {string} phoneme2 - Second phoneme to compare  
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive savarṇa analysis
 */
export function sutra119(phoneme1, phoneme2, options = {}) {
  const {
    includeExamples = true,
    includeArticulation = true,
    includeTradition = true,
    scriptPreference = null,
    explainNonSavarna = true
  } = options;

  // Handle invalid input
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string') {
    return {
      input: { phoneme1, phoneme2 },
      sutraApplied: '1.1.9',
      sutraName: 'tulyāsyaprayatnaṃ savarṇam',
      sutraText: 'तुल्यास्यप्रयत्नं सवर्णम्',
      applies: false,
      areSavarna: false,
      error: 'invalid_phoneme_input',
      explanation: 'Both phonemes must be valid strings for savarṇa analysis'
    };
  }

  const script1 = detectScript(phoneme1);
  const script2 = detectScript(phoneme2);
  const normalized1 = normalizeScript(phoneme1);
  const normalized2 = normalizeScript(phoneme2);
  
  // Core savarṇa analysis using multiple methods
  let areSavarna = false;
  let articulationAnalysis = null;
  let savarnaGroup = null;
  let prohibitionReason = null;
  
  try {
    // Method 1: Using Phoneme class
    const phonemeObj1 = new Phoneme(phoneme1);
    const phonemeObj2 = new Phoneme(phoneme2);

    // Check Sutra 1.1.10 prohibition (no savarṇa between vowels and consonants)
    if (phonemeObj1.type !== phonemeObj2.type) {
      areSavarna = false;
      prohibitionReason = 'sutra_1_1_10_prohibition';
    } else {
      areSavarna = (
        phonemeObj1.placeOfArticulation === phonemeObj2.placeOfArticulation &&
        phonemeObj1.mannerOfArticulation === phonemeObj2.mannerOfArticulation
      );
    }
    
    // Get detailed articulation analysis
    if (includeArticulation) {
      articulationAnalysis = {
        phoneme1: {
          place: phonemeObj1.placeOfArticulation,
          manner: phonemeObj1.mannerOfArticulation,
          type: phonemeObj1.type
        },
        phoneme2: {
          place: phonemeObj2.placeOfArticulation,
          manner: phonemeObj2.mannerOfArticulation,
          type: phonemeObj2.type
        },
        comparison: {
          placeMatch: phonemeObj1.placeOfArticulation === phonemeObj2.placeOfArticulation,
          mannerMatch: phonemeObj1.mannerOfArticulation === phonemeObj2.mannerOfArticulation,
          typeMatch: phonemeObj1.type === phonemeObj2.type
        }
      };
    }
  } catch (error) {
    // Method 2: Direct savarṇa group classification
    for (const [groupName, phonemes] of Object.entries(SAVARNA_GROUPS)) {
      if (phonemes.includes(phoneme1) && phonemes.includes(phoneme2)) {
        areSavarna = true;
        savarnaGroup = groupName;
        break;
      }
    }
  }

  // Build comprehensive analysis
  const analysis = {
    input: { phoneme1, phoneme2 },
    sutraApplied: '1.1.9',
    sutraName: 'tulyāsyaprayatnaṃ savarṇam',
    sutraText: 'तुल्यास्यप्रयत्नं सवर्णम्',
    applies: areSavarna,
    areSavarna: areSavarna,
    
    // Classification details
    classification: areSavarna ? 'सवर्ण (savarṇa)' : 'असवर्ण (asavarṇa)',
    relationship: areSavarna ? 'homogeneous_phonemes' : 'heterogeneous_phonemes',
    savarnaGroup: savarnaGroup,
    
    // Script information
    scripts: { phoneme1: script1, phoneme2: script2 },
    normalizedForms: { phoneme1: normalized1, phoneme2: normalized2 },
    
    // Detailed explanation
    explanation: areSavarna 
      ? `'${phoneme1}' and '${phoneme2}' are सवर्ण (savarṇa) because they share the same आस्य (place of articulation) and प्रयत्न (manner of effort)`
      : explainNonSavarna 
        ? `'${phoneme1}' and '${phoneme2}' are not सवर्ण because they differ in ${articulationAnalysis?.comparison.placeMatch ? 'manner of effort' : 'place of articulation'}${prohibitionReason ? ' (also prohibited by Sutra 1.1.10)' : ''}`
        : `'${phoneme1}' and '${phoneme2}' are असवर्ण (asavarṇa)`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'तुल्यास्यप्रयत्नं सवर्णम्',
      translation: 'Having equal place of articulation and effort is savarṇa',
      commentary: 'This sutra establishes the fundamental criterion for phonemic homogeneity in Sanskrit'
    } : null,
    
    // Detailed articulatory analysis
    articulationAnalysis: articulationAnalysis,
    
    // Educational examples
    examples: includeExamples ? {
      savarnaExamples: [
        { pair: ['अ', 'आ'], group: 'अ_वर्ग', explanation: 'Same place (कण्ठ) and manner (विवृत), differ only in duration' },
        { pair: ['क', 'ख'], group: 'क_वर्ग', explanation: 'Same place (कण्ठ), differ in aspiration within same manner class' },
        { pair: ['त', 'न'], group: 'त_वर्ग', explanation: 'Same place (दन्त), differ in manner (स्पर्श vs अनुनासिक) but still savarṇa' }
      ],
      nonSavarnaExamples: [
        { pair: ['क', 'त'], reason: 'Different places: कण्ठ vs दन्त' },
        { pair: ['अ', 'क'], reason: 'Different types: स्वर vs व्यञ्जन (prohibited by 1.1.10)' },
        { pair: ['प', 'य'], reason: 'Different places and manners: ओष्ठ स्पर्श vs तालु अन्तःस्थ' }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.8', name: 'mukhanāsikāvacano\'nunāsikaḥ', relation: 'anunāsika classification affects savarṇa grouping' },
      { sutra: '1.1.10', name: 'nājjhalau', relation: 'prohibits savarṇa between vowels and consonants' },
      { sutra: '6.1.101', name: 'akaḥ savarṇe dīrghaḥ', relation: 'savarṇa vowels undergo lengthening' }
    ],
    
    // Prohibition analysis
    prohibitionAnalysis: prohibitionReason ? {
      prohibited: true,
      reason: prohibitionReason,
      explanation: 'Sutra 1.1.10 (nājjhalau) prohibits savarṇa relationship between vowels (अच्) and consonants (हल्)'
    } : null,
    
    // Confidence scoring
    confidence: areSavarna ? 1.0 : 1.0, // Definitive classification
    analysisMethod: 'traditional_articulatory_comparison'
  };

  return analysis;
}

// Maintain backward compatibility
export function isSavarna(char1, char2) {
  const result = sutra119(char1, char2);
  return result.areSavarna;
}

export default sutra119;