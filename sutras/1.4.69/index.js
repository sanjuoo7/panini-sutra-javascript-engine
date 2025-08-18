/**
 * Sutra 1.4.69: अच्छ गत्यर्थवदेषु (accha gatyarthavadeṣu)
 * 
 * The word "accha" is classified as "gati" when it precedes verbs of motion
 * or words that have the sense of motion (gatyartha).
 * 
 * Traditional Commentary Integration:
 * - Kāśikā: अच्छ इत्यस्य गतिसंज्ञा भवति गत्यर्थवदेषु धातुषु प्रयुज्यमानस्य
 * - Patañjali: गत्यर्थवत्सु धातुषु अच्छशब्दस्य गतिसंज्ञा भवति
 * 
 * Modern Explanation:
 * This sutra specifies that "accha" receives गति classification when it
 * appears with verbs that express motion or directional movement. The term
 * "gatyarthavat" indicates verbs with motion sense or directional meaning.
 * 
 * Linguistic Scope:
 * - Applies to: "accha" (अच्छ) only
 * - Context requirement: Must be with motion verbs (gatyarthavat)
 * - Classification: गति (directional particles with pre-verbal function)
 * - Semantic constraint: Verbs must express motion or direction
 * 
 * Examples:
 * - अच्छ गच्छति (accha gacchati) - "goes towards" → accha = गति
 * - अच्छ आगच्छति (accha āgacchati) - "comes near" → accha = गति
 * - अच्छ धावति (accha dhāvati) - "runs towards" → accha = गति
 */

import { 
  validateSanskritWord, 
  detectScript,
  isDevanagari,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Common motion verbs and their directional forms
 */
const MOTION_VERBS = [
  // Primary motion verbs
  'gam', 'गम्', 'gacchati', 'गच्छति',
  'i', 'इ', 'eti', 'एति',
  'yā', 'या', 'yāti', 'याति',
  'dhāv', 'धाव्', 'dhāvati', 'धावति',
  
  // Directional motion verbs
  'āgam', 'आगम्', 'āgacchati', 'आगच्छति',
  'upagam', 'उपगम्', 'upagacchati', 'उपगच्छति',
  'pra√gam', 'प्रगम्', 'pragacchati', 'प्रगच्छति',
  'ni√gam', 'निगम्', 'nigacchati', 'निगच्छति',
  
  // Related motion concepts
  'cal', 'चल्', 'calati', 'चलति',
  'dhāv', 'धाव्', 'dhāvati', 'धावति',
  'car', 'चर्', 'carati', 'चरति',
  'vraj', 'व्रज्', 'vrajati', 'व्रजति'
];

/**
 * Main function for Sutra 1.4.69: अच्छ गत्यर्थवदेषु
 * 
 * Analyzes whether "accha" should be classified as गति when used
 * with motion verbs or verbs having motion sense.
 * 
 * @param {string} word - The word to analyze (expecting "accha" or "अच्छ")
 * @param {Object} context - Context object containing verb and motion information
 * @param {string} context.verb - The verb in the construction
 * @param {boolean} context.hasMotionSense - Whether the verb has motion sense
 * @returns {Object} Comprehensive analysis result
 */
function sutra169(word, context) {
  try {
    // Phase 1: Input Validation and Error Handling
    const inputValidation = validateInput(word, context);
    if (!inputValidation.isValid) {
      return createErrorResult(inputValidation.errorType, inputValidation.reason);
    }

    // Phase 2: Word Normalization and Script Handling
    const sanitized = sanitizeInput(word);
    if (!sanitized.success) {
      return createErrorResult('invalid_word', sanitized.error);
    }
    
    const normalizedWord = sanitized.sanitized;
    const script = detectScript(word);
    const isDevScript = script === 'Devanagari';
    
    const workingWord = normalizedWord.trim();

    // Phase 3: Context Validation
    const contextValidation = validateContext(context);
    if (!contextValidation.isValid) {
      return createNonApplicableResult(contextValidation.reason, {
        word: normalizedWord,
        context: context
      });
    }

    // Phase 4: Core Sutra Logic - Check if word is "accha"
    const wordAnalysis = analyzeTargetWord(workingWord);
    if (!wordAnalysis.isTargetWord) {
      return createNonApplicableResult(
        `Word "${normalizedWord}" is not "accha"`,
        { word: normalizedWord, expectedWords: ['accha', 'अच्छ'] }
      );
    }

    // Phase 5: Motion Verb Context Analysis
    const motionAnalysis = analyzeMotionContext(context);
    if (!motionAnalysis.applies) {
      return createNonApplicableResult(
        motionAnalysis.reason,
        { word: normalizedWord, context: context, requirement: 'motion verb or motion sense' }
      );
    }

    // Phase 6: Comprehensive Analysis Result
    return createSuccessResult(normalizedWord, wordAnalysis, motionAnalysis, context);

  } catch (error) {
    return createErrorResult('processing_error', `Internal error: ${error.message}`);
  }
}

/**
 * Validates basic input parameters
 * @param {string} word - Input word
 * @param {Object} context - Context object
 * @returns {Object} Validation result
 */
function validateInput(word, context) {
  if (word === null || word === undefined) {
    return { isValid: false, errorType: 'invalid_word', reason: 'Word cannot be null or undefined' };
  }

  if (typeof word !== 'string') {
    return { isValid: false, errorType: 'invalid_word', reason: 'Word must be a string' };
  }

  if (word.trim() === '') {
    return { isValid: false, errorType: 'invalid_word', reason: 'Word cannot be empty' };
  }

  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    return { isValid: false, errorType: 'invalid_sanskrit', reason: validationResult.error };
  }

  if (context === null || context === undefined) {
    return { isValid: false, errorType: 'invalid_context', reason: 'Context cannot be null or undefined' };
  }

  if (typeof context !== 'object') {
    return { isValid: false, errorType: 'invalid_context', reason: 'Context must be an object' };
  }

  return { isValid: true };
}

/**
 * Validates context requirements for gati classification
 * @param {Object} context - Context object
 * @returns {Object} Validation result
 */
function validateContext(context) {
  if (!context.verb) {
    return { 
      isValid: false, 
      reason: 'गति classification requires verbal context - verb missing' 
    };
  }

  if (typeof context.verb !== 'string' || context.verb.trim() === '') {
    return { 
      isValid: false, 
      reason: 'Verb must be a non-empty string' 
    };
  }

  if (typeof context.hasMotionSense !== 'boolean') {
    return { 
      isValid: false, 
      reason: 'Context must specify whether verb has motion sense (hasMotionSense)' 
    };
  }

  return { isValid: true };
}

/**
 * Analyzes if the word is "accha" in either script
 * @param {string} word - The word to analyze
 * @returns {Object} Word analysis result
 */
function analyzeTargetWord(word) {
  const acchaWords = ['accha', 'अच्छ'];

  if (acchaWords.includes(word)) {
    return {
      isTargetWord: true,
      wordType: 'accha',
      iastForm: 'accha',
      devForm: 'अच्छ'
    };
  }

  return { isTargetWord: false };
}

/**
 * Analyzes motion verb context for gatyarthavat determination
 * @param {Object} context - Context object
 * @returns {Object} Motion analysis result
 */
function analyzeMotionContext(context) {
  const verb = context.verb.trim();
  
  // Check if explicitly marked as having motion sense
  if (context.hasMotionSense === true) {
    // Additional validation: check if verb is in known motion verbs
    const isKnownMotionVerb = MOTION_VERBS.includes(verb);
    
    return {
      applies: true,
      motionType: isKnownMotionVerb ? 'explicit_motion' : 'motion_sense',
      reason: `Verb '${verb}' has motion sense (gatyarthavat)`,
      verbType: isKnownMotionVerb ? 'standard_motion_verb' : 'motion_sense_verb',
      requirement: 'motion_sense'
    };
  }
  
  // Check if verb is explicitly a motion verb even without hasMotionSense flag
  if (MOTION_VERBS.includes(verb)) {
    return {
      applies: true,
      motionType: 'explicit_motion',
      reason: `Verb '${verb}' is a standard motion verb`,
      verbType: 'standard_motion_verb',
      requirement: 'motion_sense'
    };
  }
  
  return {
    applies: false,
    reason: `Verb '${verb}' does not have motion sense (gatyarthavat) - required for गति classification`,
    requirement: 'motion_sense'
  };
}

/**
 * Creates comprehensive success result for positive गति classification
 * @param {string} originalWord - Original input word
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} motionAnalysis - Motion analysis result
 * @param {Object} context - Original context
 * @returns {Object} Success result object
 */
function createSuccessResult(originalWord, wordAnalysis, motionAnalysis, context) {
  const confidence = calculateConfidence(wordAnalysis, motionAnalysis, context);
  
  return {
    applies: true,
    sutra: '1.4.69',
    sutraText: 'अच्छ गत्यर्थवदेषु',
    translation: 'The word accha (is designated as gati) with verbs having motion sense',
    
    // Morphological Analysis
    morphological: {
      category: 'gati',
      features: ['directional', 'pre_verbal'],
      subCategory: 'directional_qualifier',
      originalForm: originalWord,
      normalizedForm: wordAnalysis.iastForm,
      devanagariForm: wordAnalysis.devForm
    },

    // Semantic Analysis
    semantic: {
      function: 'pre-verb',
      type: 'directional',
      contextualMeaning: 'toward',
      expressedSense: 'directional_approach',
      semanticRole: 'directional_adverbial',
      motionType: motionAnalysis.motionType
    },

    // Syntactic Analysis
    syntactic: {
      position: 'pre_verbal',
      dependency: 'verb_modifier',
      scope: 'verbal_action',
      construction: `${wordAnalysis.iastForm}_${context.verb}`,
      syntacticFunction: 'directional_qualifier',
      motionVerb: context.verb,
      verbType: motionAnalysis.verbType,
      grammaticalFunction: 'directional_particle'
    },

    // Context Integration
    contextValidation: {
      inputValid: true,
      verbRequired: true,
      verbProvided: true,
      motionSenseRequired: true,
      motionSenseProvided: true,
      functionalAlignment: true
    },

    // Analysis Details
    reasons: [
      `Word is '${originalWord}'`,
      `Verb '${context.verb}' has motion sense`,
      `Motion analysis: ${motionAnalysis.reason}`,
      `Verb type: ${motionAnalysis.verbType}`,
      'Meets all conditions for गति classification per sutra 1.4.69'
    ],

    confidence: confidence,

    // Traditional Commentary
    commentary: {
      kāśikā: 'अच्छ इत्यस्य गतिसंज्ञा भवति गत्यर्थवदेषु धातुषु प्रयुज्यमानस्य',
      translation: '"Accha" receives गति designation when used with verbs having motion sense',
      modernExplanation: `The word "${wordAnalysis.iastForm}" is classified as गति because it precedes the verb "${context.verb}" which has motion sense (gatyarthavat), providing directional qualification to the verbal action.`
    },

    // Multi-script Support
    scripts: {
      input: originalWord,
      iast: wordAnalysis.iastForm,
      devanagari: wordAnalysis.devForm,
      detected: isDevanagari(originalWord) ? 'devanagari' : 'iast'
    }
  };
}

/**
 * Creates result for non-applicable cases
 * @param {string} reason - Reason for non-application
 * @param {Object} details - Additional details
 * @returns {Object} Non-applicable result
 */
function createNonApplicableResult(reason, details = {}) {
  return {
    applies: false,
    sutra: '1.4.69',
    sutraText: 'अच्छ गत्यर्थवदेषु',
    
    morphological: {
      category: null,
      analysis: 'not_applicable'
    },

    semantic: {
      function: null,
      analysis: 'conditions_not_met'
    },

    reasons: [reason],
    confidence: 0,

    contextValidation: {
      inputValid: true,
      verbRequired: true,
      verbProvided: !!details.context?.verb,
      motionSenseRequired: true,
      motionSenseProvided: details.context?.hasMotionSense === true,
      functionalAlignment: false
    },

    details: details
  };
}

/**
 * Creates error result for validation failures
 * @param {string} errorType - Type of error
 * @param {string} reason - Detailed reason
 * @returns {Object} Error result
 */
function createErrorResult(errorType, reason) {
  return {
    applies: false,
    sutra: '1.4.69',
    sutraText: 'अच्छ गत्यर्थवदेषु',
    error: {
      type: errorType,
      reason: reason,
      message: getDetailedErrorMessage(errorType),
      suggestions: getErrorSuggestions(errorType)
    },
    confidence: 0,
    contextValidation: {
      inputValid: errorType !== 'invalid_word' && errorType !== 'invalid_sanskrit',
      verbRequired: true,
      verbProvided: errorType !== 'missing_verb',
      motionSenseRequired: true,
      motionSenseProvided: errorType !== 'missing_motion_sense'
    }
  };
}

/**
 * Gets detailed error message for linguistic precision
 * @param {string} errorType - Type of error
 * @returns {string} Detailed message
 */
function getDetailedErrorMessage(errorType) {
  const messages = {
    'invalid_word': 'Input must be a non-empty Sanskrit word in valid script',
    'invalid_sanskrit': 'Word contains invalid Sanskrit characters or structure',
    'invalid_context': 'Context object with verb and motion sense information required',
    'missing_verb': 'गति designation requires verbal context with motion sense',
    'missing_motion_sense': 'Context must specify whether verb has motion sense (hasMotionSense)',
    'processing_error': 'Internal processing error during sutra application'
  };
  
  return messages[errorType] || 'Unknown error in sutra processing';
}

/**
 * Gets suggestions for error resolution
 * @param {string} errorType - Type of error
 * @returns {string[]} Suggestions array
 */
function getErrorSuggestions(errorType) {
  const suggestions = {
    'invalid_word': [
      'Provide a non-empty string',
      'Use valid Sanskrit characters (Devanagari or IAST)',
      'Check for proper Sanskrit word structure'
    ],
    'invalid_sanskrit': [
      'Verify Sanskrit character encoding',
      'Check for mixed scripts or invalid combinations',
      'Ensure proper Sanskrit phonological structure'
    ],
    'invalid_context': [
      'Provide context object with verb and hasMotionSense',
      'Include {verb: "...", hasMotionSense: true} structure',
      'Ensure context is not null or undefined'
    ],
    'missing_verb': [
      'Add verb property to context object',
      'गति requires motion verb context',
      'Example: {verb: "gacchati", hasMotionSense: true}'
    ],
    'missing_motion_sense': [
      'Add hasMotionSense property to context object',
      'Specify whether verb has motion sense (gatyarthavat)',
      'Use hasMotionSense: true for motion verbs'
    ]
  };
  
  return suggestions[errorType] || ['Check input parameters and context'];
}

/**
 * Calculates confidence score based on analysis completeness
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} motionAnalysis - Motion analysis result
 * @param {Object} context - Context object
 * @returns {number} Confidence score (0-1)
 */
function calculateConfidence(wordAnalysis, motionAnalysis, context) {
  let confidence = 0.85; // Base confidence for exact match

  // Perfect word match bonus
  if (wordAnalysis.isTargetWord) {
    confidence += 0.05;
  }

  // Motion sense verification bonus
  if (motionAnalysis.applies) {
    confidence += 0.05;
  }

  // Standard motion verb bonus
  if (motionAnalysis.verbType === 'standard_motion_verb') {
    confidence += 0.05;
  }

  return Math.min(confidence, 1.0);
}

export default sutra169;
