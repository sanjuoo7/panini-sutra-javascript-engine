/**
 * Sutra 1.1.12: अदसो मात्
 * "Forms of अदस् (that pronoun) after म् are pragṛhya"
 * 
 * This crucial sutra extends the pragṛhya definition to specific forms of 
 * the demonstrative pronoun अदस् (that). When certain case endings follow 
 * the म् sound, those forms resist sandhi operations.
 * 
 * Key forms include: अमुम्, अमुना, अमुष्मिन्, etc.
 */

import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaBase } from '../1.1.11/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaAdasForm as isPragrhyaAdasFormShared,
  analyzePragrhya,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

// Comprehensive अदस् pragṛhya forms
const ADAS_PRAGRHYA_FORMS = {
  devanagari: [
    'अमुम्', 'अमुना', 'अमुष्मै', 'अमुष्मात्', 'अमुष्य', 'अमुष्मिन्',
    'अमू', 'अमुयोः', 'अमुष्मिन्', 'अमी', 'अमे', 'अमून्', 'अमुभिः', 'अमुभ्यः',
    'अमुषाम्', 'अमुषु'
  ],
  iast: [
    'amum', 'amunā', 'amuṣmai', 'amuṣmāt', 'amuṣya', 'amuṣmin',
    'amū', 'amuyoḥ', 'amuṣmin', 'amī', 'ame', 'amūn', 'amubhiḥ', 'amubhyaḥ',
    'amuṣām', 'amuṣu'
  ]
};

// Case analysis for अदस् forms
const ADAS_CASE_ANALYSIS = {
  'अमुम्': { case: 'accusative', number: 'singular', gender: 'masculine', feature: 'ends_after_म्' },
  'अमुना': { case: 'instrumental', number: 'singular', gender: 'masculine', feature: 'contains_म्' },
  'अमुष्मै': { case: 'dative', number: 'singular', gender: 'masculine', feature: 'derived_from_म्' },
  'अमुष्मात्': { case: 'ablative', number: 'singular', gender: 'masculine', feature: 'derived_from_म्' },
  'अमुष्य': { case: 'genitive', number: 'singular', gender: 'masculine', feature: 'derived_from_म्' },
  'अमुष्मिन्': { case: 'locative', number: 'singular', gender: 'masculine', feature: 'derived_from_म्' },
  'अमे': { case: 'locative', number: 'singular', gender: 'neuter', feature: 'ends_after_म्' },
  'ame': { case: 'locative', number: 'singular', gender: 'neuter', feature: 'ends_after_म्' }
};

/**
 * Enhanced educational function implementing Sutra 1.1.12
 * @param {string} word - The word to analyze for अदस् pragṛhya status
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive pragṛhya analysis
 */
export function sutra1112(word, options = {}) {
  const {
    includeExamples = true,
    includeMorphology = true,
    includeTradition = true,
    includeSandhiAnalysis = true
  } = options;

  // Handle invalid input
  if (!word || typeof word !== 'string') {
    return {
      input: word,
      sutraApplied: '1.1.12',
      sutraName: 'adaso māt',
      sutraText: 'अदसो मात्',
      applies: false,
      isPragrhya: false,
      error: 'invalid_word_input',
      explanation: 'Valid Sanskrit word required for pragṛhya analysis'
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  const trimmedWord = word.trim();
  
  // Check if word is an अदस् pragṛhya form
  const isAdasPragrhya = ADAS_PRAGRHYA_FORMS.devanagari.includes(trimmedWord) ||
                        ADAS_PRAGRHYA_FORMS.iast.includes(trimmedWord) ||
                        ADAS_PRAGRHYA_FORMS.iast.includes(normalizedWord);

  // Get morphological analysis
  let morphologicalAnalysis = null;
  if (includeMorphology && isAdasPragrhya) {
    morphologicalAnalysis = ADAS_CASE_ANALYSIS[trimmedWord] || 
                           ADAS_CASE_ANALYSIS[normalizedWord] || {
                             case: 'undetermined',
                             number: 'undetermined',
                             gender: 'undetermined',
                             feature: 'post_म्_form'
                           };
  }

  // Check if also covered by previous sutras
  const alsoByPreviousSutras = isPragrhyaBase ? isPragrhyaBase(word) : false;

  // Build comprehensive analysis
  const analysis = {
    input: word,
    sutraApplied: '1.1.12',
    sutraName: 'adaso māt',
    sutraText: 'अदसो मात्',
    applies: isAdasPragrhya,
    isPragrhya: isAdasPragrhya,
    
    // Classification details
    classification: isAdasPragrhya ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (apragṛhya)',
    pragrhyaType: isAdasPragrhya ? 'अदस्_forms_after_म्' : null,
    
    // Script information
    script: script,
    normalizedForm: normalizedWord,
    
    // Detailed explanation
    explanation: isAdasPragrhya 
      ? `'${word}' is प्रगृह्य because it is a form of the pronoun अदस् that comes after or derives from the letter म्`
      : `'${word}' is not covered by Sutra 1.1.12 as it is not an अदस् form involving म्`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'अदसः मात् प्रगृह्यम्',
      translation: 'Forms of adas after the letter म् are pragṛhya',
      commentary: 'This sutra specifically targets demonstrative pronoun forms that contain or follow the phoneme म्'
    } : null,
    
    // Morphological analysis
    morphologicalAnalysis: morphologicalAnalysis,
    
    // Sandhi analysis
    sandhiAnalysis: includeSandhiAnalysis ? {
      preventsSandhi: isAdasPragrhya,
      sandhiType: isAdasPragrhya ? 'blocked_by_pragrhya' : 'normal_sandhi_rules_apply',
      explanation: isAdasPragrhya 
        ? 'This form resists vowel sandhi operations due to its pragṛhya nature'
        : 'Normal sandhi rules would apply if this were not pragṛhya'
    } : null,
    
    // Educational examples
    examples: includeExamples ? {
      adasPragrhyaForms: [
        { form: 'अमुम्', meaning: 'him/that (acc.)', feature: 'ends after म्' },
        { form: 'अमुना', meaning: 'by him/that (ins.)', feature: 'contains म्' },
        { form: 'अमुष्मै', meaning: 'to him/that (dat.)', feature: 'derived from म्' },
        { form: 'अमुष्य', meaning: 'of him/that (gen.)', feature: 'derived from म्' }
      ],
      sandhiExamples: [
        { 
          phrase: 'अमुम् + अत्र = अमुम् अत्र', 
          explanation: 'no sandhi due to pragṛhya nature',
          nonPragrhya: 'would normally become अमुमत्र'
        },
        { 
          phrase: 'अमुना + इह = अमुना इह', 
          explanation: 'no sandhi due to pragṛhya nature',
          nonPragrhya: 'would normally undergo sandhi'
        }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.11', name: 'īdūdeddvivacanaṃ pragṛhyam', relation: 'establishes basic pragṛhya forms' },
      { sutra: '1.1.13', name: 'śe', relation: 'extends pragṛhya to Vedic शे affix' },
      { sutra: '1.1.14', name: 'nipāta ekājanāṅ', relation: 'extends pragṛhya to specific particles' }
    ],
    
    // Integration with previous sutras
    coverageAnalysis: {
      byThisSutra: isAdasPragrhya,
      byPreviousSutras: alsoByPreviousSutras,
      overlapping: isAdasPragrhya && alsoByPreviousSutras,
      uniqueToThisSutra: isAdasPragrhya && !alsoByPreviousSutras
    },
    
    // Confidence scoring
    confidence: isAdasPragrhya ? 1.0 : 1.0, // Definitive classification
    analysisMethod: 'adas_form_recognition'
  };

  return analysis;
}

// Maintain backward compatibility
export function isPragrhyaAdasForm(word) {
  const result = sutra1112(word);
  return result.isPragrhya;
}

export function isPragrhya(word, context = {}) {
  // Use shared pragrhya analysis, but limit to sutras up to 1.1.12
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12']);
}

export function preventsSandhi(word1, word2, context = {}) {
  // If only one word provided (backward compatibility)
  if (word2 === undefined) {
    const result = sutra1112(word1);
    return result.isPragrhya;
  }
  
  // If both words provided, check if first word prevents sandhi
  if (!word1 || !word2) {
    return false;
  }
  
  // Check if first word is pragrhya (either by this sutra or previous ones)
  const isPragrhyaWord = isPragrhya(word1, context);
  
  // Also check for dual endings from context (extends from 1.1.11)
  if (context.number === 'dual') {
    // Common dual endings that are pragrhya
    const dualEndings = ['ī', 'ū', 'e', 'ी', 'ू', 'े'];
    const endsWithDualVowel = dualEndings.some(ending => word1.endsWith(ending));
    if (endsWithDualVowel) {
      return true;
    }
  }
  
  return isPragrhyaWord;
}

export default sutra1112;
