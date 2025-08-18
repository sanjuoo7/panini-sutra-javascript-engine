/**
 * Sutra 1.1.61: प्रत्ययस्य लुक्श्लुलुपः (pratyayasya lukślulupaḥ)
 * "Of an affix, (the adarśana) is designated as luk, ślu, or lup (respectively)."
 *
 * RULE TYPE: saṃjñā (definition)
 * SCOPE: Defines the technical terms luk, ślu, and lup for different types of affix elision.
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.61
 */

import { 
  validateSanskritWord, 
  detectScript, 
  sanitizeInput 
} from '../sanskrit-utils/index.js';

// Elision type mappings with detailed characteristics
const ELISION_TYPES = {
  LUK: {
    name: 'luk',
    devanagari: 'लुक्',
    type: 'complete_elision',
    scope: 'affix_disappearance',
    conditions: ['specific_phonetic_contexts', 'particular_affixes'],
    examples: [
      'गुरु + सु → गुरुः (सु becomes लुक्)',
      'अग्नि + सु → अग्निः (सु elided by लुक्)'
    ]
  },
  
  SLU: {
    name: 'ślu',
    devanagari: 'श्लु',
    type: 'conditional_elision',
    scope: 'affix_modification',
    conditions: ['euphonic_requirements', 'morphophonemic_alternation'],
    examples: [
      'राम + सुप् → राम + श्लु → राम',
      'specific conditional elision contexts'
    ]
  },
  
  LUP: {
    name: 'lup',
    devanagari: 'लुप्',
    type: 'contextual_elision',
    scope: 'pragmatic_deletion',
    conditions: ['syntactic_context', 'semantic_factors'],
    examples: [
      'contextual affix deletion',
      'pragmatically determined elision'
    ]
  }
};

// Traditional commentary references
const TRADITIONAL_COMMENTARY = {
  kashika: "प्रत्ययस्य लुक्श्लुलुपः। प्रत्ययस्य अदर्शनं लुक्श्लुलुप्संज्ञकं भवति।",
  mahabhashya: "प्रत्ययस्य इति विशेषणम्। तस्य अदर्शनं लुक्श्लुलुप्शब्दैः उच्यते।",
  english: "The disappearance (adarśana) of an affix is designated by the terms luk, ślu, or lup according to the specific type of elision."
};

/**
 * Analyzes affix elision and determines the appropriate designation (luk/ślu/lup)
 * according to Sutra 1.1.61: प्रत्ययस्य लुक्श्लुलुपः
 * 
 * @param {string|Object} input - Affix or linguistic context to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeAffixElision(input, options = {}) {
  // Input validation and normalization
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
    sutra: "1.1.61",
    rule: "प्रत्ययस्य लुक्श्लुलुपः (pratyayasya lukślulupaḥ)",
    isValid: true,
    
    // Core elision analysis
    elisionAnalysis: {
      isAffixElision: false,
      elisionType: null,
      designation: null,
      affixCharacteristics: []
    },
    
    // Morphological analysis
    morphologicalAnalysis: {
      affixType: null,
      elisionContext: null,
      morphophonemic_conditions: []
    },
    
    // Phonetic analysis  
    phoneticAnalysis: {
      euphonic_factors: [],
      phonetic_context: null,
      sandhi_requirements: []
    },
    
    // Grammatical analysis
    grammaticalAnalysis: {
      syntactic_role: null,
      semantic_factors: [],
      pragmatic_conditions: []
    },
    
    // Traditional commentary
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    
    // Confidence scoring
    confidence: 0
  };

  // Analyze for elision characteristics
  const elisionResult = classifyElisionType(normalizedInput, options);
  analysis.elisionAnalysis = elisionResult;
  
  // Morphological analysis
  analysis.morphologicalAnalysis = analyzeMorphologicalElision(normalizedInput);
  
  // Phonetic analysis
  analysis.phoneticAnalysis = analyzePhoneticElision(normalizedInput);
  
  // Grammatical analysis
  analysis.grammaticalAnalysis = analyzeGrammaticalElision(normalizedInput);
  
  // Calculate confidence
  analysis.confidence = calculateElisionConfidence(analysis);
  
  return analysis;
}

/**
 * Classifies the type of affix elision (luk/ślu/lup)
 * @param {string} input - Input to classify
 * @param {Object} options - Classification options
 * @returns {Object} Elision classification result
 */
function classifyElisionType(input, options = {}) {
  const result = {
    isAffixElision: false,
    elisionType: null,
    designation: null,
    affixCharacteristics: []
  };

  if (!input || typeof input !== 'string') {
    return result;
  }

  // Check for explicit elision type markers
  for (const [key, typeData] of Object.entries(ELISION_TYPES)) {
    if (input.includes(typeData.name) || input.includes(typeData.devanagari)) {
      result.isAffixElision = true;
      result.elisionType = typeData.type;
      result.designation = typeData.name;
      result.affixCharacteristics.push(typeData.scope);
      return result;
    }
  }
  
  // Check for affix contexts that would trigger elision
  if (isAffixContext(input)) {
    result.isAffixElision = true;
    result.elisionType = 'potential_elision';
    result.affixCharacteristics.push('affix_context_present');
  }
  
  return result;
}

/**
 * Helper function to identify affix contexts
 */
function isAffixContext(input) {
  const affixPatterns = [
    'सु', 'सुप्', 'तिप्', 'तस्', 'झि',  // Common affixes
    'अम्', 'औ', 'शस्', 'ओस्', 'आम्',    // Case endings
    'ति', 'तः', 'अन्ति', 'सि', 'थः'      // Verb endings
  ];
  
  return affixPatterns.some(pattern => input.includes(pattern));
}

/**
 * Analyzes morphological elision characteristics
 */
function analyzeMorphologicalElision(input) {
  return {
    affixType: determineAffixType(input),
    elisionContext: analyzeElisionContext(input),
    morphophonemic_conditions: analyzeMorphophonemic(input)
  };
}

/**
 * Analyzes phonetic elision characteristics  
 */
function analyzePhoneticElision(input) {
  return {
    euphonic_factors: analyzeEuphonicFactors(input),
    phonetic_context: analyzePhoneticContext(input),
    sandhi_requirements: analyzeSandhiRequirements(input)
  };
}

/**
 * Analyzes grammatical elision characteristics
 */
function analyzeGrammaticalElision(input) {
  return {
    syntactic_role: analyzeSyntacticRole(input),
    semantic_factors: analyzeSemanticFactors(input),
    pragmatic_conditions: analyzePragmaticConditions(input)
  };
}

/**
 * Helper functions for detailed analysis
 */
function determineAffixType(input) {
  if (!input) return 'no_affix';
  if (input.includes('सु')) return 'case_ending';
  if (input.includes('ति')) return 'verb_ending';
  return 'general_affix';
}

function analyzeElisionContext(input) {
  if (!input) return 'no_context';
  if (input.includes('लुक्')) return 'luk_context';
  if (input.includes('श्लु')) return 'slu_context';
  if (input.includes('लुप्')) return 'lup_context';
  return 'general_context';
}

function analyzeMorphophonemic(input) {
  const conditions = [];
  if (input && input.includes('वृद्धि')) conditions.push('vrddhi_context');
  if (input && input.includes('गुण')) conditions.push('guna_context');
  return conditions;
}

function analyzeEuphonicFactors(input) {
  const factors = [];
  if (input && input.includes('स्')) factors.push('sibilant_present');
  if (input && input.includes('ः')) factors.push('visarga_present');
  return factors;
}

function analyzePhoneticContext(input) {
  if (!input) return 'no_phonetic_context';
  return 'general_phonetic_context';
}

function analyzeSandhiRequirements(input) {
  const requirements = [];
  if (input && input.includes('+')) requirements.push('sandhi_boundary');
  return requirements;
}

function analyzeSyntacticRole(input) {
  if (!input) return 'no_syntactic_role';
  return 'potential_syntactic_role';
}

function analyzeSemanticFactors(input) {
  return [];
}

function analyzePragmaticConditions(input) {
  return [];
}

/**
 * Calculates confidence score for elision analysis
 */
function calculateElisionConfidence(analysis) {
  let confidence = 0;
  
  if (analysis.elisionAnalysis.isAffixElision) {
    confidence += 40;
    
    if (analysis.elisionAnalysis.designation) {
      confidence += 30;
    }
    
    if (analysis.elisionAnalysis.affixCharacteristics.length > 0) {
      confidence += 20;
    }
    
    if (analysis.morphologicalAnalysis.elisionContext !== 'no_context') {
      confidence += 10;
    }
  }
  
  return Math.min(confidence, 100);
}

/**
 * Checks if an elision type is one of 'luk', 'ślu', or 'lup'.
 * @param {string} elisionType - The type of elision to check.
 * @returns {boolean} - True if the elision type is 'luk', 'ślu', or 'lup'.
 */
export function isLukSluLup(elisionType) {
  if (typeof elisionType !== 'string') {
    return false;
  }
  const validTypes = new Set(['luk', 'ślu', 'lup']);
  return validTypes.has(elisionType);
}
