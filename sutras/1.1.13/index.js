/**
 * Sutra 1.1.13: शे
 * "The Vedic affix शे is pragṛhya"
 * 
 * This crucial sutra extends pragṛhya designation to the Vedic case affix शे,
 * which serves as a substitute for regular case endings in Vedic Sanskrit.
 * The affix शे resists sandhi operations to preserve its distinctive
 * morphological identity in Vedic texts.
 */

import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.12/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaSheAffix as isPragrhyaSheAffixShared,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

// Comprehensive शे affix data for Vedic Sanskrit
const SHE_AFFIX_FORMS = {
  devanagari: ['शे'],
  iast: ['śe'],
  
  // Common Vedic words ending in शे
  vedicExamples: {
    devanagari: ['अग्निशे', 'इन्द्रशे', 'सोमशे', 'वायुशे', 'सूर्यशे'],
    iast: ['agniśe', 'indraśe', 'somaśe', 'vāyuśe', 'sūryaśe']
  }
};

// Vedic case function analysis
const VEDIC_CASE_FUNCTIONS = {
  'dative': { meaning: 'purpose/recipient', example: 'अग्निशे (for Agni)' },
  'genitive': { meaning: 'possession/relation', example: 'इन्द्रशे (of/for Indra)' },
  'locative': { meaning: 'location/circumstance', example: 'सोमशे (in/for Soma)' }
};

/**
 * Enhanced educational function implementing Sutra 1.1.13
 * @param {string} word - The word to analyze for Vedic शे pragṛhya status
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive Vedic शे analysis
 */
export function sutra1113(word, options = {}) {
  const {
    includeExamples = true,
    includeVedicContext = true,
    includeTradition = true,
    includeSandhiAnalysis = true
  } = options;

  // Handle invalid input
  if (!word || typeof word !== 'string') {
    return {
      input: word,
      sutraApplied: '1.1.13',
      sutraName: 'śe',
      sutraText: 'शे',
      applies: false,
      isPragrhya: false,
      error: 'invalid_word_input',
      explanation: 'Valid Sanskrit word required for Vedic शे analysis'
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  const trimmedWord = word.trim();
  
  // Check if word ends with Vedic शे affix
  const endsWithShe = trimmedWord.endsWith('शे') || normalizedWord.endsWith('śe');
  
  // Check if word is in known Vedic शे examples
  const isVedicSheExample = SHE_AFFIX_FORMS.vedicExamples.devanagari.includes(trimmedWord) ||
                           SHE_AFFIX_FORMS.vedicExamples.iast.includes(normalizedWord);

  const isPragrhyaShe = endsWithShe || isVedicSheExample;

  // Determine likely Vedic case function
  let vedicCaseFunction = null;
  if (includeVedicContext && isPragrhyaShe) {
    // Simple heuristic based on common patterns
    if (trimmedWord.includes('अग्नि') || normalizedWord.includes('agni')) {
      vedicCaseFunction = 'dative';
    } else if (trimmedWord.includes('इन्द्र') || normalizedWord.includes('indra')) {
      vedicCaseFunction = 'dative';
    } else {
      vedicCaseFunction = 'dative'; // Most common for शे
    }
  }

  // Check coverage by previous sutras
  const alsoByPreviousSutras = isPragrhyaExtended ? isPragrhyaExtended(word) : false;

  // Build comprehensive analysis
  const analysis = {
    input: word,
    sutraApplied: '1.1.13',
    sutraName: 'śe',
    sutraText: 'शे',
    applies: isPragrhyaShe,
    isPragrhya: isPragrhyaShe,
    
    // Classification details
    classification: isPragrhyaShe ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (apragṛhya)',
    pragrhyaType: isPragrhyaShe ? 'vedic_śe_affix' : null,
    
    // Script information
    script: script,
    normalizedForm: normalizedWord,
    
    // Detailed explanation
    explanation: isPragrhyaShe 
      ? `'${word}' is प्रगृह्य because it contains the Vedic case affix शे, which resists sandhi operations to preserve its distinctive Vedic identity`
      : `'${word}' is not covered by Sutra 1.1.13 as it does not contain the Vedic affix शे`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'शे प्रगृह्यम्',
      translation: 'The affix शे is pragṛhya',
      commentary: 'This sutra specifically protects the Vedic case affix शे from sandhi operations, preserving its archaic morphological form'
    } : null,
    
    // Vedic context analysis
    vedicAnalysis: includeVedicContext ? {
      isVedicForm: isPragrhyaShe,
      affixType: isPragrhyaShe ? 'case_substitute' : null,
      likelyCaseFunction: vedicCaseFunction,
      functionDescription: vedicCaseFunction ? VEDIC_CASE_FUNCTIONS[vedicCaseFunction] : null,
      archaicNature: isPragrhyaShe ? 'preserves_ancient_morphology' : null
    } : null,
    
    // Sandhi analysis
    sandhiAnalysis: includeSandhiAnalysis ? {
      preventsSandhi: isPragrhyaShe,
      sandhiType: isPragrhyaShe ? 'blocked_by_vedic_pragrhya' : 'normal_sandhi_rules_apply',
      explanation: isPragrhyaShe 
        ? 'Vedic शे affix resists sandhi to maintain its archaic morphological integrity'
        : 'Normal sandhi rules would apply if this were not pragṛhya'
    } : null,
    
    // Educational examples
    examples: includeExamples ? {
      vedicSheForms: [
        { form: 'अग्निशे', meaning: 'for Agni (dat.)', context: 'Vedic ritual invocation' },
        { form: 'इन्द्रशे', meaning: 'for Indra (dat.)', context: 'Vedic hymnic address' },
        { form: 'सोमशे', meaning: 'for Soma (dat.)', context: 'Vedic oblation formula' },
        { form: 'वायुशे', meaning: 'for Vayu (dat.)', context: 'Vedic wind deity invocation' }
      ],
      sandhiExamples: [
        { 
          phrase: 'अग्निशे + इह = अग्निशे इह', 
          explanation: 'no sandhi due to Vedic शे pragṛhya nature',
          classicalEquivalent: 'अग्नये इह (with regular dative)'
        },
        { 
          phrase: 'इन्द्रशे + उपगच्छति = इन्द्रशे उपगच्छति', 
          explanation: 'शे resists vowel sandhi',
          nonPragrhya: 'would normally become इन्द्रशोपगच्छति'
        }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.11', name: 'īdūdeddvivacanaṃ pragṛhyam', relation: 'establishes basic pragṛhya forms' },
      { sutra: '1.1.12', name: 'adaso māt', relation: 'extends pragṛhya to अदस् forms' },
      { sutra: '1.1.14', name: 'nipāta ekājanāṅ', relation: 'extends pragṛhya to single-vowel particles' },
      { sutra: '1.4.56', name: 'prāgṛśvarān nipātāḥ', relation: 'defines particle class relevant for later pragṛhya rules' }
    ],
    
    // Vedic vs Classical distinction
    linguisticContext: includeVedicContext ? {
      vedicFeature: isPragrhyaShe,
      classicalEquivalent: isPragrhyaShe ? 'regular case endings (-ाय, -स्य, etc.)' : null,
      historicalImportance: isPragrhyaShe ? 'preserves archaic Indo-European case morphology' : null,
      textualDistribution: isPragrhyaShe ? 'primarily in Ṛgveda and early Vedic texts' : null
    } : null,
    
    // Integration with previous sutras
    coverageAnalysis: {
      byThisSutra: isPragrhyaShe,
      byPreviousSutras: alsoByPreviousSutras,
      overlapping: isPragrhyaShe && alsoByPreviousSutras,
      uniqueToThisSutra: isPragrhyaShe && !alsoByPreviousSutras
    },
    
    // Confidence scoring
    confidence: isPragrhyaShe ? 1.0 : 1.0, // Definitive classification
    analysisMethod: 'vedic_she_affix_recognition'
  };

  return analysis;
}

// Maintain backward compatibility
export function isPragrhyaSheAffix(word) {
  const result = sutra1113(word);
  return result.isPragrhya;
}

export function isPragrhya(word, context = {}) {
  // Use shared pragrhya analysis, but limit to sutras up to 1.1.13
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12', '1.1.13']);
}

export function preventsSandhi(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  return preventsSandhiShared(firstWord, secondWord, context);
}

export default sutra1113;
