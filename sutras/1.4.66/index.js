/**
 * Sutra 1.4.66: कणेमनसी श्रद्धाप्रतीघाते (kaṇemanasī śraddhāpratīghāte)
 * 
 * The words "kaṇe" and "manas" are classified as "gati" when used in the sense of
 * loss of faith or disappointment (śraddhāpratīghāta) with a verb.
 * 
 * Traditional Commentary Integration:
 * - Kāśikā: कणे मनसी गतिसंज्ञे भवतः श्रद्धाप्रतीघातार्थे प्रयुज्यमाने
 * - Patañjali: श्रद्धाप्रतीघाते कणे मनसी गतिसंज्ञा भवतः
 * 
 * Modern Explanation:
 * This sutra deals with the contextual classification of "kaṇe" and "manas" as गति 
 * when they express the sense of loss of faith or disappointment in verbal constructions.
 * 
 * Linguistic Scope:
 * - Applies to: "kaṇe" (कणे) and "manas" (मनस्) only
 * - Context requirement: Verbal context with meaning of śraddhāpratīghāta
 * - Classification: गति (indeclinable particles with pre-verbal function)
 * - Semantic constraint: Must express loss of faith/disappointment
 * 
 * Examples:
 * - कणे करोति (kaṇe karoti) - "does with disappointment" → kaṇe = गति
 * - मनस् करोति (manas karoti) - "does with loss of faith" → manas = गति
 */

import { 
  validateSanskritWord, 
  detectScript,
  isDevanagari,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.66: कणेमनसी श्रद्धाप्रतीघाते
 * 
 * Analyzes whether "kaṇe" or "manas" should be classified as गति when used
 * in contexts expressing loss of faith/disappointment.
 * 
 * @param {string} word - The word to analyze (expecting "kaṇe", "कणे", "manas", or "मनस्")
 * @param {Object} context - Context object containing verb and meaning information
 * @param {string} context.verb - The verb in the construction
 * @param {string} context.meaning - The contextual meaning ('śraddhāpratīghāta')
 * @returns {Object} Comprehensive analysis result
 */
function sutra166(word, context) {
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

    // Phase 4: Core Sutra Logic - Check if word is "kaṇe" or "manas"
    const wordAnalysis = analyzeTargetWord(workingWord);
    if (!wordAnalysis.isTargetWord) {
      return createNonApplicableResult(
        `Word "${normalizedWord}" is not "kaṇe" or "manas"`,
        { word: normalizedWord, expectedWords: ['kaṇe', 'कणे', 'manas', 'मनस्'] }
      );
    }

    // Phase 5: Semantic Context Analysis
    const semanticAnalysis = analyzeSemanticContext(context);
    if (!semanticAnalysis.applies) {
      return createNonApplicableResult(
        semanticAnalysis.reason,
        { word: normalizedWord, context: context, expectedMeaning: semanticAnalysis.expectedMeaning }
      );
    }

    // Phase 6: Comprehensive Analysis Result
    return createSuccessResult(normalizedWord, wordAnalysis, semanticAnalysis, context);

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

  if (!context.meaning) {
    return { 
      isValid: false, 
      reason: 'Contextual meaning required for śraddhāpratīghāta determination' 
    };
  }

  if (typeof context.meaning !== 'string' || context.meaning.trim() === '') {
    return { 
      isValid: false, 
      reason: 'Meaning must be a non-empty string' 
    };
  }

  return { isValid: true };
}

/**
 * Analyzes if the word is "kaṇe" or "manas" in either script
 * @param {string} word - The word to analyze
 * @returns {Object} Word analysis result
 */
function analyzeTargetWord(word) {
  const kaneWords = ['kaṇe', 'कणे'];
  const manasWords = ['manas', 'मनस्'];

  if (kaneWords.includes(word)) {
    return {
      isTargetWord: true,
      wordType: 'kaṇe',
      iastForm: 'kaṇe',
      devForm: 'कणे'
    };
  }

  if (manasWords.includes(word)) {
    return {
      isTargetWord: true,
      wordType: 'manas',
      iastForm: 'manas',
      devForm: 'मनस्'
    };
  }

  return { isTargetWord: false };
}

/**
 * Analyzes semantic context for śraddhāpratīghāta determination
 * @param {Object} context - Context object
 * @returns {Object} Semantic analysis result
 */
function analyzeSemanticContext(context) {
  const meaning = context.meaning.toLowerCase().trim();

  if (meaning === 'śraddhāpratīghāta' || meaning === 'loss of faith' || meaning === 'disappointment') {
    return {
      applies: true,
      semanticType: 'śraddhāpratīghāta',
      reason: "Context meaning indicates śraddhāpratīghāta (loss of faith/disappointment)",
      expectedMeaning: 'śraddhāpratīghāta'
    };
  } else {
    return {
      applies: false,
      reason: "Context requires meaning 'śraddhāpratīghāta' for गति classification",
      expectedMeaning: 'śraddhāpratīghāta'
    };
  }
}

/**
 * Creates comprehensive success result for positive गति classification
 * @param {string} originalWord - Original input word
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} semanticAnalysis - Semantic analysis result
 * @param {Object} context - Original context
 * @returns {Object} Success result object
 */
function createSuccessResult(originalWord, wordAnalysis, semanticAnalysis, context) {
  const confidence = calculateConfidence(wordAnalysis, semanticAnalysis, context);
  
  return {
    applies: true,
    sutra: '1.4.66',
    sutraText: 'कणेमनसी श्रद्धाप्रतीघाते',
    translation: 'The words kaṇe and manas (are designated as gati) in the sense of loss of faith',
    
    // Morphological Analysis
    morphological: {
      category: 'gati',
      features: ['indeclinable'],
      subCategory: 'emotional_qualifier',
      originalForm: originalWord,
      normalizedForm: wordAnalysis.iastForm,
      devanagariForm: wordAnalysis.devForm
    },

    // Semantic Analysis
    semantic: {
      function: 'pre-verb',
      type: 'qualifier',
      contextualMeaning: semanticAnalysis.semanticType,
      expressedSense: 'loss of faith',
      semanticRole: 'emotional_adverbial'
    },

    // Syntactic Analysis
    syntactic: {
      position: 'pre_verbal',
      dependency: 'verb_modifier',
      scope: 'verbal_action',
      construction: `${wordAnalysis.iastForm}_${context.verb}`,
      syntacticFunction: 'adverbial_qualifier',
      emotionalAspect: 'disappointment/disillusionment'
    },

    // Context Integration
    contextValidation: {
      inputValid: true,
      verbRequired: true,
      verbProvided: true,
      meaningRequired: true,
      meaningProvided: true,
      semanticAlignment: true
    },

    // Analysis Details
    reasons: [
      `Word is '${originalWord}'`,
      `Context meaning is '${context.meaning}'`,
      `Satisfies ${semanticAnalysis.semanticType} (loss of faith) requirement`,
      `Verbal context provided: ${context.verb}`,
      'Meets all conditions for गति classification per sutra 1.4.66'
    ],

    confidence: confidence,

    // Traditional Commentary
    commentary: {
      kāśikā: 'कणे मनसी गतिसंज्ञे भवतः श्रद्धाप्रतीघातार्थे प्रयुज्यमाने',
      translation: '"Kaṇe" and "manas" receive गति designation when used in the sense of loss of faith',
      modernExplanation: `The word "${wordAnalysis.iastForm}" is classified as गति because it expresses ${semanticAnalysis.semanticType} in the given verbal context.`
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
    sutra: '1.4.66',
    sutraText: 'कणेमनसी श्रद्धाप्रतीघाते',
    
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
      meaningRequired: true,
      meaningProvided: !!details.context?.meaning,
      semanticAlignment: false
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
    sutra: '1.4.66',
    sutraText: 'कणेमनसी श्रद्धाप्रतीघाते',
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
      meaningRequired: true,
      meaningProvided: errorType !== 'missing_meaning'
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
    'invalid_context': 'Context object with verb and meaning information required',
    'missing_verb': 'गति designation requires verbal context',
    'missing_meaning': 'Contextual meaning required for śraddhāpratīghāta determination',
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
      'Provide context object with verb and meaning',
      'Include {verb: "...", meaning: "..."} structure',
      'Ensure context is not null or undefined'
    ],
    'missing_verb': [
      'Add verb property to context object',
      'गति requires verbal construction context',
      'Example: {verb: "kṛ", meaning: "śraddhāpratīghāta"}'
    ],
    'missing_meaning': [
      'Add meaning property to context object',
      'Use "śraddhāpratīghāta" for kaṇe/manas',
      'Meaning determines emotional context classification'
    ]
  };
  
  return suggestions[errorType] || ['Check input parameters and context'];
}

/**
 * Calculates confidence score based on analysis completeness
 * @param {Object} wordAnalysis - Word analysis result
 * @param {Object} semanticAnalysis - Semantic analysis result
 * @param {Object} context - Context object
 * @returns {number} Confidence score (0-1)
 */
function calculateConfidence(wordAnalysis, semanticAnalysis, context) {
  let confidence = 0.85; // Base confidence for exact match

  // Perfect word match bonus
  if (wordAnalysis.isTargetWord) {
    confidence += 0.10;
  }

  // Semantic alignment bonus
  if (semanticAnalysis.applies) {
    confidence += 0.05;
  }

  return Math.min(confidence, 1.0);
}

export default sutra166;
