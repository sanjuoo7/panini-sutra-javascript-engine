/**
 * Sutra 1.4.70: अदोऽनुपदेशे (ado'nupadeśe)
 * 
 * The word "adas" (that) is classified as "gati" when it occurs
 * in non-instructional context (anupadesa) rather than teaching context.
 * 
 * Traditional Commentary Integration:
 * - Kāśikā: अदस् इत्यस्य गतिसंज्ञा भवति अनुपदेशे प्रयुज्यमानस्य
 * - Patañjali: अदस्शब्दस्य अनुपदेशे गतिसंज्ञा भवति न तु उपदेशे
 * 
 * Modern Explanation:
 * This sutra specifies that "adas" (that) receives गति classification
 * when used in contexts other than formal instruction or teaching.
 * The term "anupadesa" means "non-instruction" or contexts where the
 * word functions anaphorically rather than deictically in instruction.
 * 
 * Linguistic Scope:
 * - Applies to: "adas" (अदस्) only
 * - Context requirement: Non-instructional usage (anupadesa)
 * - Classification: गति (anaphoric particles with referential function)
 * - Functional constraint: Must be anaphoric, not deictic instructional
 * 
 * Examples:
 * - अदस् तत् (adas tat) - "that very thing" (anaphoric) → adas = गति
 * - अदस् गृहम् (adas gṛham) - "that house" (referential) → adas = गति
 * - In teaching context: अदस् शब्दः किम् (instructional) → adas ≠ गति
 */

import { 
  validateSanskritWord, 
  detectScript,
  isDevanagari,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.70: अदोऽनुपदेशे
 * 
 * Analyzes whether "adas" should be classified as गति when used
 * in non-instructional context rather than formal teaching.
 * 
 * @param {string} word - The word to analyze (expecting "adas" or "अदस्")
 * @param {Object} context - Context object containing instruction and anaphoric information
 * @param {boolean} context.isInstructional - Whether used in teaching/instructional context
 * @param {boolean} context.isAnaphoric - Whether used anaphorically (referring back)
 * @returns {Object} Comprehensive analysis result
 */
function sutra170(word, context) {
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

    // Phase 4: Core Sutra Logic - Check if word is "adas"
    const wordAnalysis = analyzeTargetWord(workingWord);
    if (!wordAnalysis.isTargetWord) {
      return createNonApplicableResult(
        `Word "${normalizedWord}" is not "adas" or "ado"`,
        { word: normalizedWord, expectedWords: ['adas', 'अदस्', 'ado', 'अदो'] }
      );
    }

    // Phase 5: Non-instructional Context Analysis
    const instructionAnalysis = analyzeInstructionalContext(context);
    if (!instructionAnalysis.applies) {
      return createNonApplicableResult(
        instructionAnalysis.reason,
        { word: normalizedWord, context: context, requirement: 'non-instructional usage' }
      );
    }

    // Phase 6: Comprehensive Analysis Result
    return createSuccessResult(normalizedWord, wordAnalysis, instructionAnalysis, context);

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

  if (typeof context.isInstructional !== 'boolean') {
    return { 
      isValid: false, 
      reason: 'Context must specify whether usage is instructional (isInstructional)' 
    };
  }

  if (typeof context.isAnaphoric !== 'boolean') {
    return { 
      isValid: false, 
      reason: 'Context must specify whether usage is anaphoric (isAnaphoric)' 
    };
  }

  return { isValid: true };
}

/**
 * Analyzes if the word is "adas" or "ado" in either script
 * @param {string} word - The word to analyze
 * @returns {Object} Word analysis result
 */
function analyzeTargetWord(word) {
  const adasWords = ['adas', 'अदस्', 'ado', 'अदो'];

  if (adasWords.includes(word)) {
    const wordType = word.includes('adas') || word.includes('अदस्') ? 'adas' : 'ado';
    return {
      isTargetWord: true,
      wordType: wordType,
      iastForm: wordType === 'adas' ? 'adas' : 'ado',
      devForm: wordType === 'adas' ? 'अदस्' : 'अदो'
    };
  }

  return { isTargetWord: false };
}

/**
 * Analyzes instructional context for anupadesa determination
 * @param {Object} context - Context object
 * @returns {Object} Instructional analysis result
 */
function analyzeInstructionalContext(context) {
  // Primary condition: Must not be instructional
  if (context.isInstructional === false) {
    // Additional validation: Preferably anaphoric usage
    if (context.isAnaphoric === true) {
      return {
        applies: true,
        contextType: 'anaphoric_non_instructional',
        reason: "Word 'adas' is used anaphorically in non-instructional context",
        functionalType: 'anaphoric_reference',
        requirement: 'non_instructional'
      };
    } else {
      return {
        applies: true,
        contextType: 'non_instructional',
        reason: "Word 'adas' is used in non-instructional context",
        functionalType: 'referential',
        requirement: 'non_instructional'
      };
    }
  } else {
    return {
      applies: false,
      reason: "Word 'adas' is used in instructional context (upadesa) - गति classification requires non-instructional usage (anupadesa)",
      requirement: 'non_instructional'
    };
  }
}

/**
 * Creates comprehensive success result for positive गति classification
 * @param {string} originalWord - Original input word
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} instructionAnalysis - Instruction analysis result
 * @param {Object} context - Original context
 * @returns {Object} Success result object
 */
function createSuccessResult(originalWord, wordAnalysis, instructionAnalysis, context) {
  const confidence = calculateConfidence(wordAnalysis, instructionAnalysis, context);
  
  return {
    applies: true,
    sutra: '1.4.70',
    sutraText: 'अदोऽनुपदेशे',
    translation: 'The word adas (is designated as gati) in non-instructional context',
    
    // Morphological Analysis
    morphological: {
      category: 'gati',
      features: ['anaphoric', 'referential'],
      subCategory: 'anaphoric_qualifier',
      originalForm: originalWord,
      normalizedForm: wordAnalysis.iastForm,
      devanagariForm: wordAnalysis.devForm
    },

    // Semantic Analysis
    semantic: {
      function: 'referential',
      type: 'anaphoric',
      contextualMeaning: 'referential_that',
      expressedSense: 'anaphoric_reference',
      semanticRole: 'anaphoric_demonstrative',
      contextType: instructionAnalysis.contextType
    },

    // Syntactic Analysis
    syntactic: {
      position: 'variable',
      dependency: 'referential_modifier',
      scope: 'nominal_referent',
      construction: `${wordAnalysis.iastForm}_reference`,
      syntacticFunction: 'anaphoric_qualifier',
      functionalType: instructionAnalysis.functionalType,
      grammaticalFunction: 'demonstrative_reference'
    },

    // Context Integration
    contextValidation: {
      inputValid: true,
      instructionalRequired: false,
      instructionalProvided: false,
      anaphoricRequired: false,
      anaphoricProvided: context.isAnaphoric === true,
      functionalAlignment: true
    },

    // Analysis Details
    reasons: [
      `Word is '${originalWord}'`,
      'Word is used in non-instructional context',
      `Context analysis: ${instructionAnalysis.reason}`,
      `Functional type: ${instructionAnalysis.functionalType}`,
      'Meets all conditions for गति classification per sutra 1.4.70'
    ],

    confidence: confidence,

    // Traditional Commentary
    commentary: {
      kāśikā: 'अदस् इत्यस्य गतिसंज्ञा भवति अनुपदेशे प्रयुज्यमानस्य',
      translation: '"Adas" receives गति designation when used in non-instructional context',
      modernExplanation: `The word "${wordAnalysis.iastForm}" is classified as गति because it is used in ${instructionAnalysis.contextType} rather than formal instructional context, functioning as ${instructionAnalysis.functionalType}.`
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
    sutra: '1.4.70',
    sutraText: 'अदोऽनुपदेशे',
    
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
      instructionalRequired: false,
      instructionalProvided: details.context?.isInstructional === false,
      anaphoricRequired: false,
      anaphoricProvided: details.context?.isAnaphoric === true,
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
    sutra: '1.4.70',
    sutraText: 'अदोऽनुपदेशे',
    error: {
      type: errorType,
      reason: reason,
      message: getDetailedErrorMessage(errorType),
      suggestions: getErrorSuggestions(errorType)
    },
    confidence: 0,
    contextValidation: {
      inputValid: errorType !== 'invalid_word' && errorType !== 'invalid_sanskrit',
      instructionalRequired: false,
      instructionalProvided: errorType !== 'missing_instructional',
      anaphoricRequired: false,
      anaphoricProvided: errorType !== 'missing_anaphoric'
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
    'invalid_context': 'Context object with instructional and anaphoric information required',
    'missing_instructional': 'Context must specify instructional usage (isInstructional)',
    'missing_anaphoric': 'Context must specify anaphoric usage (isAnaphoric)',
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
      'Provide context object with isInstructional and isAnaphoric',
      'Include {isInstructional: false, isAnaphoric: true} structure',
      'Ensure context is not null or undefined'
    ],
    'missing_instructional': [
      'Add isInstructional property to context object',
      'Specify whether usage is in teaching context',
      'Use isInstructional: false for non-instructional usage'
    ],
    'missing_anaphoric': [
      'Add isAnaphoric property to context object',
      'Specify whether usage is anaphoric (referring back)',
      'Use isAnaphoric: true for anaphoric reference'
    ]
  };
  
  return suggestions[errorType] || ['Check input parameters and context'];
}

/**
 * Calculates confidence score based on analysis completeness
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} instructionAnalysis - Instruction analysis result
 * @param {Object} context - Context object
 * @returns {number} Confidence score (0-1)
 */
function calculateConfidence(wordAnalysis, instructionAnalysis, context) {
  let confidence = 0.85; // Base confidence for exact match

  // Perfect word match bonus
  if (wordAnalysis.isTargetWord) {
    confidence += 0.05;
  }

  // Non-instructional context bonus
  if (instructionAnalysis.applies) {
    confidence += 0.05;
  }

  // Anaphoric usage bonus
  if (instructionAnalysis.contextType === 'anaphoric_non_instructional') {
    confidence += 0.05;
  }

  return Math.min(confidence, 1.0);
}

export default sutra170;
