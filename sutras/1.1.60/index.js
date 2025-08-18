/**
 * Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)
 * "Non-perception is (called) lopa (elision)."
 *
 * RULE TYPE: saṃjñā (definition)
 * SCOPE: Defines the technical term 'lopa' (elision/deletion) in Paninian grammar.
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.60
 */

import { 
  validateSanskritWord, 
  detectScript, 
  sanitizeInput 
} from '../sanskrit-utils/index.js';

// Lopa context mappings for different grammatical operations
const LOPA_CONTEXTS = {
  // Affix elision contexts
  AFFIX_ELISION: {
    types: ['luk', 'ślu', 'lup'],
    conditions: ['before_vowels', 'word_final', 'morpheme_boundary'],
    examples: ['घट् + स् → घटः', 'गुरु + स् → गुरुः']
  },
  
  // Phonetic elision contexts  
  PHONETIC_ELISION: {
    types: ['vowel_deletion', 'consonant_deletion', 'cluster_reduction'],
    conditions: ['sandhi_context', 'euphonic_combination'],
    examples: ['अ + इ → ए (अ deleted)', 'क् + त → क्त (inherent अ deleted)']
  },
  
  // Morphological elision contexts
  MORPHOLOGICAL_ELISION: {
    types: ['stem_deletion', 'inflection_deletion', 'derivation_deletion'],
    conditions: ['compound_formation', 'secondary_derivation'],
    examples: ['राज + पुत्र → राजपुत्र', 'कृष्ण + त्व → कृष्णत्व']
  }
};

// Traditional commentary references
const TRADITIONAL_COMMENTARY = {
  kashika: "अदर्शनं लोपः। अदर्शनशब्देन लोपसंज्ञा विधीयते।",
  mahabhashya: "अदर्शनमिति लोपस्य संज्ञा। यत्र न दृश्यते तत्र लोप इत्युच्यते।",
  english: "The term 'lopa' (elision) is applied to the state of non-perception or disappearance of phonemes or morphemes."
};

/**
 * Analyzes whether an element exhibits lopa (elision/deletion) characteristics
 * according to Sutra 1.1.60: अदर्शनं लोपः
 * 
 * @param {string|Object} input - Element to analyze for lopa characteristics
 * @param {Object} options - Analysis options
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeLopa(input, options = {}) {
  // Handle null/undefined cases specially as they represent perfect lopa
  let normalizedInput = input;
  let script = 'Unknown';
  
  if (input !== null && input !== undefined && input !== '') {
    const sanitized = sanitizeInput(input);
    if (sanitized.success) {
      normalizedInput = sanitized.sanitized;
      script = detectScript(normalizedInput).toLowerCase();
    } else {
      normalizedInput = String(input);
      script = detectScript(normalizedInput).toLowerCase();
    }
  } else {
    normalizedInput = input === null ? null : (input === undefined ? undefined : '');
  }
  
  const analysis = {
    input: normalizedInput,
    script: script,
    sutra: "1.1.60",
    rule: "अदर्शनं लोपः (adarśanaṃ lopaḥ)",
    isValid: true,
    
    // Core lopa analysis
    lopaAnalysis: {
      isLopa: false,
      lopaType: null,
      context: null,
      adarshanaCharacteristics: []
    },
    
    // Morphological analysis
    morphologicalAnalysis: {
      elementType: null,
      deletionContext: null,
      phonemeStatus: null
    },
    
    // Phonetic analysis  
    phoneticAnalysis: {
      perceptibility: null,
      phoneticRealization: null,
      sandhi_context: null
    },
    
    // Grammatical analysis
    grammaticalAnalysis: {
      grammaticalRole: null,
      functionalStatus: null,
      derivationalContext: null
    },
    
    // Traditional commentary
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    
    // Confidence scoring
    confidence: 0
  };

  // Analyze for lopa characteristics
  const lopaResult = classifyLopaType(normalizedInput, options);
  analysis.lopaAnalysis = lopaResult;
  
  // Morphological analysis
  analysis.morphologicalAnalysis = analyzeMorphologicalElision(normalizedInput);
  
  // Phonetic analysis
  analysis.phoneticAnalysis = analyzePhoneticElision(normalizedInput);
  
  // Grammatical analysis
  analysis.grammaticalAnalysis = analyzeGrammaticalElision(normalizedInput);
  
  // Calculate confidence
  analysis.confidence = calculateLopaConfidence(analysis);
  
  return analysis;
}

/**
 * Classifies the type of lopa (elision) present in the input
 * @param {string} input - Input to classify
 * @param {Object} options - Classification options
 * @returns {Object} Lopa classification result
 */
function classifyLopaType(input, options = {}) {
  const result = {
    isLopa: false,
    lopaType: null,
    context: null,
    adarshanaCharacteristics: []
  };

  // Check for absolute absence (null/undefined/empty)
  if (input === null || input === undefined || input === '') {
    result.isLopa = true;
    result.lopaType = 'absolute_absence';
    result.adarshanaCharacteristics.push('complete_non_perception');
    return result;
  }

  // Check for lopa markers in Sanskrit text
  if (typeof input === 'string') {
    // Check for explicit lopa notation
    if (input.includes('∅') || input.includes('ø') || input.includes('—')) {
      result.isLopa = true;
      result.lopaType = 'explicit_notation';
      result.adarshanaCharacteristics.push('marked_deletion');
    }
    
    // Check for lopa-indicating affixes
    const lopaAffixes = ['लुक्', 'श्लु', 'लुप्'];
    for (const affix of lopaAffixes) {
      if (input.includes(affix)) {
        result.isLopa = true;
        result.lopaType = 'affix_elision';
        result.context = LOPA_CONTEXTS.AFFIX_ELISION;
        result.adarshanaCharacteristics.push('grammatical_deletion');
        break;
      }
    }
  }
  
  return result;
}

/**
 * Analyzes morphological elision characteristics
 */
function analyzeMorphologicalElision(input) {
  return {
    elementType: determineElementType(input),
    deletionContext: analyzeDeletionContext(input),
    phonemeStatus: analyzePhonemeStatus(input)
  };
}

/**
 * Analyzes phonetic elision characteristics  
 */
function analyzePhoneticElision(input) {
  return {
    perceptibility: analyzePerceptibility(input),
    phoneticRealization: analyzeRealization(input),
    sandhi_context: analyzeSandhiContext(input)
  };
}

/**
 * Analyzes grammatical elision characteristics
 */
function analyzeGrammaticalElision(input) {
  return {
    grammaticalRole: analyzeGrammaticalRole(input),
    functionalStatus: analyzeFunctionalStatus(input),
    derivationalContext: analyzeDerivationalContext(input)
  };
}

/**
 * Helper functions for detailed analysis
 */
function determineElementType(input) {
  if (!input) return 'absent_element';
  if (input.length === 1) return 'phoneme';
  return 'morpheme_or_word';
}

function analyzeDeletionContext(input) {
  if (!input) return 'complete_deletion';
  return 'partial_or_conditional';
}

function analyzePhonemeStatus(input) {
  if (!input) return 'deleted';
  return 'present';
}

function analyzePerceptibility(input) {
  if (!input) return 'non_perceptible';
  return 'perceptible';
}

function analyzeRealization(input) {
  if (!input) return 'zero_realization';
  return 'full_realization';
}

function analyzeSandhiContext(input) {
  // Simplified sandhi context analysis
  return input ? 'sandhi_preservation' : 'sandhi_deletion';
}

function analyzeGrammaticalRole(input) {
  if (!input) return 'no_grammatical_role';
  return 'functional_element';
}

function analyzeFunctionalStatus(input) {
  if (!input) return 'non_functional';
  return 'functional';
}

function analyzeDerivationalContext(input) {
  return input ? 'derivational_presence' : 'derivational_absence';
}

/**
 * Calculates confidence score for lopa analysis
 */
function calculateLopaConfidence(analysis) {
  let confidence = 0;
  
  if (analysis.lopaAnalysis.isLopa) {
    confidence += 40;
    
    if (analysis.lopaAnalysis.adarshanaCharacteristics.length > 0) {
      confidence += 20;
    }
    
    if (analysis.morphologicalAnalysis.deletionContext === 'complete_deletion') {
      confidence += 20;
    }
    
    if (analysis.phoneticAnalysis.perceptibility === 'non_perceptible') {
      confidence += 20;
    }
  }
  
  return Math.min(confidence, 100);
}

/**
 * Defines 'lopa' (elision) as 'adarśana' (disappearance or non-perception).
 * @returns {string} The definition of lopa.
 */
export function getLopaDefinition() {
  return "Lopa (elision) signifies disappearance or non-perception (adarśana).";
}

/**
 * Checks if a given element represents 'lopa' (elision) according to Sutra 1.1.60.
 * @param {any} element - The element to check.
 * @returns {boolean} True if the element signifies lopa, false otherwise.
 */
export function isLopa(element) {
  return element === null || element === undefined || element === '';
}
