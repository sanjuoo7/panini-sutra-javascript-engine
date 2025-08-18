/**
 * Sutra 1.4.68: अस्तं च (astaṃ ca)
 * 
 * The word "astam" is also classified as "gati" when it functions as
 * an indeclinable (avyaya) with a verb (extending the previous rule).
 * 
 * Traditional Commentary Integration:
 * - Kāśikā: अस्तम् इति अपि गतिसंज्ञा भवति अव्ययभावे प्रयुज्यमाने
 * - Patañjali: पुरस इव अस्तम् अपि गतिसंज्ञा भवति अव्ययभावे
 * 
 * Modern Explanation:
 * This sutra extends the rule from 1.4.67 to include "astam" as गति 
 * when it functions as an indeclinable particle in verbal constructions.
 * The "ca" (also) indicates this follows the same pattern as "puras".
 * 
 * Linguistic Scope:
 * - Applies to: "astam" (अस्तम्) only
 * - Context requirement: Must function as indeclinable (avyaya)
 * - Classification: गति (indeclinable particles with pre-verbal function)
 * - Functional constraint: Must be used as avyaya, not as inflected form
 * 
 * Examples:
 * - अस्तम् गच्छति (astam gacchati) - "goes to setting" → astam = गति
 * - अस्तमय (astamaya) - setting, disappearance
 */

import { 
  validateSanskritWord, 
  detectScript,
  isDevanagari,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.68: अस्तं च
 * 
 * Analyzes whether "astam" should be classified as गति when used
 * as an indeclinable in verbal constructions.
 * 
 * @param {string} word - The word to analyze (expecting "astam" or "अस्तम्")
 * @param {Object} context - Context object containing verb and avyaya information
 * @param {string} context.verb - The verb in the construction
 * @param {boolean} context.isAvyayam - Whether the word functions as indeclinable
 * @returns {Object} Comprehensive analysis result
 */
function sutra168(word, context) {
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

    // Phase 4: Core Sutra Logic - Check if word is "astam"
    const wordAnalysis = analyzeTargetWord(workingWord);
    if (!wordAnalysis.isTargetWord) {
      return createNonApplicableResult(
        `Word "${normalizedWord}" is not "astam"`,
        { word: normalizedWord, expectedWords: ['astam', 'अस्तम्'] }
      );
    }

    // Phase 5: Avyaya Context Analysis
    const avyayaAnalysis = analyzeAvyayaContext(context);
    if (!avyayaAnalysis.applies) {
      return createNonApplicableResult(
        avyayaAnalysis.reason,
        { word: normalizedWord, context: context, requirement: 'indeclinable usage' }
      );
    }

    // Phase 6: Comprehensive Analysis Result
    return createSuccessResult(normalizedWord, wordAnalysis, avyayaAnalysis, context);

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

  if (typeof context.isAvyayam !== 'boolean') {
    return { 
      isValid: false, 
      reason: 'Context must specify whether word functions as indeclinable (isAvyayam)' 
    };
  }

  return { isValid: true };
}

/**
 * Analyzes if the word is "astam" in either script
 * @param {string} word - The word to analyze
 * @returns {Object} Word analysis result
 */
function analyzeTargetWord(word) {
  const astamWords = ['astam', 'अस्तम्', 'astaṃ', 'अस्तं'];

  if (astamWords.includes(word)) {
    return {
      isTargetWord: true,
      wordType: 'astam',
      iastForm: 'astam',
      devForm: 'अस्तम्'
    };
  }

  return { isTargetWord: false };
}

/**
 * Analyzes avyaya context for indeclinable function determination
 * @param {Object} context - Context object
 * @returns {Object} Avyaya analysis result
 */
function analyzeAvyayaContext(context) {
  if (context.isAvyayam === true) {
    return {
      applies: true,
      functionalType: 'avyaya',
      reason: "Word 'astam' functions as indeclinable (avyaya)",
      requirement: 'indeclinable usage'
    };
  } else {
    return {
      applies: false,
      reason: "Word 'astam' must function as indeclinable (avyaya) for गति classification",
      requirement: 'indeclinable usage'
    };
  }
}

/**
 * Creates comprehensive success result for positive गति classification
 * @param {string} originalWord - Original input word
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} avyayaAnalysis - Avyaya analysis result
 * @param {Object} context - Original context
 * @returns {Object} Success result object
 */
function createSuccessResult(originalWord, wordAnalysis, avyayaAnalysis, context) {
  const confidence = calculateConfidence(wordAnalysis, avyayaAnalysis, context);
  
  return {
    applies: true,
    sutra: '1.4.68',
    sutraText: 'अस्तं च',
    translation: 'The word astam also (is designated as gati) when functioning as indeclinable',
    
    // Morphological Analysis
    morphological: {
      category: 'gati',
      features: ['indeclinable'],
      subCategory: 'locative_qualifier',
      originalForm: originalWord,
      normalizedForm: wordAnalysis.iastForm,
      devanagariForm: wordAnalysis.devForm
    },

    // Semantic Analysis
    semantic: {
      function: 'pre-verb',
      type: 'locative',
      contextualMeaning: 'directional',
      expressedSense: 'setting/disappearing',
      semanticRole: 'locative_adverbial'
    },

    // Syntactic Analysis
    syntactic: {
      position: 'pre_verbal',
      dependency: 'verb_modifier',
      scope: 'verbal_action',
      construction: `${wordAnalysis.iastForm}_${context.verb}`,
      syntacticFunction: 'adverbial_qualifier',
      compoundPotential: 'astamaya (setting)',
      grammaticalFunction: avyayaAnalysis.functionalType
    },

    // Context Integration
    contextValidation: {
      inputValid: true,
      verbRequired: true,
      verbProvided: true,
      avyayaRequired: true,
      avyayaProvided: true,
      functionalAlignment: true
    },

    // Analysis Details
    reasons: [
      `Word is '${originalWord}'`,
      'Word is an indeclinable',
      `Satisfies ${avyayaAnalysis.functionalType} (indeclinable) requirement`,
      `Verbal context provided: ${context.verb}`,
      'Meets all conditions for गति classification per sutra 1.4.68'
    ],

    confidence: confidence,

    // Traditional Commentary
    commentary: {
      kāśikā: 'अस्तम् इति अपि गतिसंज्ञा भवति अव्ययभावे प्रयुज्यमाने',
      translation: '"Astam" also receives गति designation when used as indeclinable',
      modernExplanation: `The word "${wordAnalysis.iastForm}" is classified as गति because it functions as ${avyayaAnalysis.functionalType} in the given verbal context, extending the rule from sutra 1.4.67.`
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
    sutra: '1.4.68',
    sutraText: 'अस्तं च',
    
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
      avyayaRequired: true,
      avyayaProvided: details.context?.isAvyayam === true,
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
    sutra: '1.4.68',
    sutraText: 'अस्तं च',
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
      avyayaRequired: true,
      avyayaProvided: errorType !== 'missing_avyaya'
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
    'invalid_context': 'Context object with verb and avyaya information required',
    'missing_verb': 'गति designation requires verbal context',
    'missing_avyaya': 'Context must specify indeclinable function (isAvyayam)',
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
      'Provide context object with verb and isAvyayam',
      'Include {verb: "...", isAvyayam: true} structure',
      'Ensure context is not null or undefined'
    ],
    'missing_verb': [
      'Add verb property to context object',
      'गति requires verbal construction context',
      'Example: {verb: "gam", isAvyayam: true}'
    ],
    'missing_avyaya': [
      'Add isAvyayam property to context object',
      'Specify whether word functions as indeclinable',
      'Use isAvyayam: true for indeclinable usage'
    ]
  };
  
  return suggestions[errorType] || ['Check input parameters and context'];
}

/**
 * Calculates confidence score based on analysis completeness
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} avyayaAnalysis - Avyaya analysis result
 * @param {Object} context - Context object
 * @returns {number} Confidence score (0-1)
 */
function calculateConfidence(wordAnalysis, avyayaAnalysis, context) {
  let confidence = 0.85; // Base confidence for exact match

  // Perfect word match bonus
  if (wordAnalysis.isTargetWord) {
    confidence += 0.10;
  }

  // Functional alignment bonus
  if (avyayaAnalysis.applies) {
    confidence += 0.05;
  }

  return Math.min(confidence, 1.0);
}

export default sutra168;
