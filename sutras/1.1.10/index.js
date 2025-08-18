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
 * Main educational analysis function - Core sutra implementation
 * 
 * @param {string} phoneme1 - First phoneme to analyze
 * @param {string} phoneme2 - Second phoneme to analyze  
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive educational analysis object
 */
export function sutra1110(phoneme1, phoneme2, context = {}) {
  // Input validation and normalization
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string') {
    return {
      isProhibited: false,
      sutraApplied: '1.1.10',
      confidence: 0.0,
      analysis: {
        error: 'Invalid input',
        traditionalCommentary: 'अशुद्धे पदे',
        modernExplanation: 'Input validation failed - both phonemes must be non-empty strings',
        educationalNote: 'प्रविष्टि परीक्षा विफलता (Input validation failure)'
      }
    };
  }

  try {
    const script1 = detectScript(phoneme1);
    const script2 = detectScript(phoneme2);
    const normalized1 = normalizeScript(phoneme1);
    const normalized2 = normalizeScript(phoneme2);
    
    // Educational analysis object
    const analysis = {
      phonemes: { first: phoneme1, second: phoneme2 },
      scripts: { first: script1, second: script2 },
      sutraApplied: '1.1.10',
      rule: 'नाज्झलौ',
      meaning: 'No savarṇa relationship between vowels (अच्) and consonants (हल्)',
      
      traditionalCommentary: {
        primary: 'न अच् हलौ सवर्णे इति। अकारादयः स्वराः हकारादयश्च व्यञ्जनानि न सवर्णे भवतः।',
        explanation: 'Vowels (अच्) and consonants (हल्) do not form savarṇa relationships, even when sharing identical places and manners of articulation.',
        authorityReference: 'महाभाष्य व कैयट - Mahābhāṣya and traditional commentaries',
        technicalPrinciple: 'स्वरव्यञ्जनभेद - Fundamental distinction between vowel and consonant classes'
      },
      
      modernExplanation: {
        grammaticalContext: 'Prohibition rule restricting savarṇa classification across phoneme types',
        phoneticReasoning: 'Maintains categorical distinction between vowels and consonants',
        functionalPurpose: 'Prevents inappropriate morphophonemic operations between different sound classes',
        linguisticSignificance: 'Establishes absolute boundary between vowel and consonant phonology',
        systematicImportance: 'Foundation for all vowel-consonant phonotactic rules'
      },
      
      prohibitionPrinciples: {
        categoricalSeparation: 'अच्-हल् (vowel-consonant) types remain distinct',
        articulatoryIrrelevance: 'Shared articulation place/manner insufficient for savarṇa',
        morphophonologicalBoundary: 'No direct morphophonemic alternation across types',
        systematicIntegrity: 'Preserves phonological class system integrity'
      },
      
      phoneticClassification: {
        vowelClass: {
          definition: 'अच् (ac) - Vowels with inherent sonority and syllable nucleus function',
          members: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'],
          characteristics: 'स्वतन्त्र उच्चारण, स्वरत्व, अक्षरकेन्द्रता'
        },
        consonantClass: {
          definition: 'हल् (hal) - Consonants requiring vowel support for articulation',
          members: ['क्', 'ख्', 'ग्', 'घ्', 'ङ्', 'च्', 'छ्', 'ज्', 'झ्', 'ञ्', /* ... */],
          characteristics: 'स्वराश्रयत्व, व्यञ्जनत्व, संयोगशीलता'
        }
      },
      
      examples: {
        prohibitedPairs: [
          { pair: ['अ', 'क्'], place: 'कण्ठ', reason: 'Same place (गुत्तुरल्) but vowel vs consonant', result: 'न सवर्णौ' },
          { pair: ['इ', 'च्'], place: 'तालु', reason: 'Same place (पलतल्) but vowel vs consonant', result: 'न सवर्णौ' },
          { pair: ['उ', 'प्'], place: 'ओष्ठ', reason: 'Same place (लबिअल्) but vowel vs consonant', result: 'न सवर्णौ' }
        ],
        allowedVowelPairs: [
          { pair: ['अ', 'आ'], reason: 'Both vowels (अच्), proceed to 1.1.9 analysis', result: 'सवर्ण संभव' },
          { pair: ['इ', 'ई'], reason: 'Both vowels (अच्), proceed to 1.1.9 analysis', result: 'सवर्ण संभव' }
        ],
        allowedConsonantPairs: [
          { pair: ['क्', 'ग्'], reason: 'Both consonants (हल्), proceed to 1.1.9 analysis', result: 'सवर्ण संभव' },
          { pair: ['त्', 'द्'], reason: 'Both consonants (हल्), proceed to 1.1.9 analysis', result: 'सवर्ण संभव' }
        ]
      },
      
      articulatoryAnalysis: {
        sharedPlaces: [
          { place: 'कण्ठ', vowels: ['अ', 'आ'], consonants: ['क्', 'ख्', 'ग्', 'घ्', 'ङ्', 'ह्'] },
          { place: 'तालु', vowels: ['इ', 'ई', 'ए', 'ऐ'], consonants: ['च्', 'छ्', 'ज्', 'झ्', 'ञ्', 'य्', 'श्'] },
          { place: 'ओष्ठ', vowels: ['उ', 'ऊ', 'ओ', 'औ'], consonants: ['प्', 'फ्', 'ब्', 'भ्', 'म्', 'व्'] }
        ],
        prohibitionNote: 'Despite shared articulation, categorical difference prevents savarṇa'
      },
      
      relatedSutras: {
        preceding: ['1.1.9 (सवर्ण definition)', '1.1.8 (अनुनासिक definition)'],
        following: ['1.1.11 (प्रगृह्य definition)', '6.1.101 (vowel lengthening rules)'],
        applications: ['All morphophonemic rules', 'Sandhi operations', 'Vowel gradation (guṇa/vṛddhi)'],
        systematicFunction: 'Fundamental boundary for all phonological operations'
      }
    };

    // Determine phoneme types and prohibition status
    let type1, type2, isProhibited, detailedReasoning;
    
    try {
      type1 = isVowel(phoneme1) ? 'vowel' : (isConsonant(phoneme1) ? 'consonant' : 'unknown');
      type2 = isVowel(phoneme2) ? 'vowel' : (isConsonant(phoneme2) ? 'consonant' : 'unknown');
      
      // If either phoneme is unknown, apply restriction (prohibition)
      if (type1 === 'unknown' || type2 === 'unknown') {
        isProhibited = true;
        detailedReasoning = 'अज्ञातध्वनिः - Unknown phoneme(s) cannot form savarṇa relationships';
      } else {
        // Check if prohibition applies (vowel-consonant pair)
        isProhibited = (type1 === 'vowel' && type2 === 'consonant') || 
                       (type1 === 'consonant' && type2 === 'vowel');
        
        if (isProhibited) {
          detailedReasoning = `सूत्र १.१.१० प्रतिषेधः - ${type1 === 'vowel' ? 'अच्' : 'हल्'} and ${type2 === 'vowel' ? 'अच्' : 'हल्'} cannot be savarṇa`;
        } else {
          detailedReasoning = `समवर्गीयत्वात् - Both are ${type1}s, proceed with 1.1.9 analysis`;
        }
      }
      
    } catch (error) {
      type1 = type2 = 'unknown';
      isProhibited = true;
      detailedReasoning = 'वर्गीकरण असम्भव - Type classification failed, applying restriction';
    }

    // Find shared articulation place if applicable
    let sharedPlace = null;
    if (isProhibited) {
      for (const placeData of analysis.articulatoryAnalysis.sharedPlaces) {
        const hasVowel = placeData.vowels.includes(phoneme1) || placeData.vowels.includes(phoneme2);
        const hasConsonant = placeData.consonants.includes(phoneme1) || placeData.consonants.includes(phoneme2);
        
        if (hasVowel && hasConsonant) {
          sharedPlace = placeData.place;
          break;
        }
      }
    }

    return {
      isProhibited: isProhibited,
      sutraApplied: '1.1.10',
      confidence: (type1 !== 'unknown' && type2 !== 'unknown') ? 1.0 : 0.5,
      analysis: {
        ...analysis,
        result: isProhibited ? 'प्रतिषिद्ध (prohibited)' : 'अप्रतिषिद्ध (not prohibited)',
        detailedReasoning: detailedReasoning,
        phonemeTypes: { first: type1, second: type2 },
        sharedArticulation: sharedPlace,
        phoneticClassification: {
          relationship: isProhibited ? 'categorically_distinct' : 'same_category',
          prohibitionBasis: isProhibited ? 'vowel_consonant_distinction' : 'none',
          nextAnalysis: isProhibited ? 'No further savarṇa analysis possible' : 'Proceed with sutra 1.1.9',
          systematicPosition: isProhibited ? 'Absolute phonological boundary' : 'Homogeneous phoneme class'
        },
        educationalNote: isProhibited ? 
          'Sutra 1.1.10 maintains absolute distinction between vowel and consonant classes' :
          'Same phoneme type allows proceeding to savarṇa analysis by sutra 1.1.9'
      }
    };
    
  } catch (error) {
    return {
      isProhibited: false,
      sutraApplied: '1.1.10',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during prohibition analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

// Maintain backward compatibility functions
export function checkHomogeneityRestriction(phoneme1, phoneme2) {
  // Handle invalid inputs - should return false (restriction applies)
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string' || 
      phoneme1.trim() === '' || phoneme2.trim() === '') {
    return false;
  }
  
  const result = sutra1110(phoneme1, phoneme2);
  // If there's an error, restriction applies (return false)
  if (result.analysis.error) {
    return false;
  }
  
  return !result.isProhibited;
}

export function isHomogeneityBlocked(phoneme1, phoneme2) {
  // Handle invalid inputs - should return true (blocked)
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string' || 
      phoneme1.trim() === '' || phoneme2.trim() === '') {
    return true;
  }
  
  const result = sutra1110(phoneme1, phoneme2);
  // If there's an error, homogeneity is blocked (return true)
  if (result.analysis.error) {
    return true;
  }
  
  return result.isProhibited;
}

export function analyzePhonemeTypes(phoneme1, phoneme2) {
  const result = sutra1110(phoneme1, phoneme2);
  return {
    phoneme1Type: result.analysis.phonemeTypes?.first || 'unknown',
    phoneme2Type: result.analysis.phonemeTypes?.second || 'unknown',
    restriction: result.isProhibited ? 'vowel_consonant_incompatible' : 'none',
    homogeneityBlocked: result.isProhibited
  };
}

export function getHomogeneityExamples() {
  const result = sutra1110('अ', 'क', { includeExamples: true });
  return {
    vowelConsonantPairs: result.analysis.examples?.prohibitedPairs?.map(ex => ex.pair) || [],
    allowedVowelPairs: result.analysis.examples?.allowedVowelPairs?.map(ex => ex.pair) || [],
    allowedConsonantPairs: result.analysis.examples?.allowedConsonantPairs?.map(ex => ex.pair) || []
  };
}

export default sutra1110;
