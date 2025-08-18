/**
 * Sutra 1.4.63: आदरानादरयोः सदसती
 * "ādarānādarayoḥ sadasatī"
 * 
 * The words "sat" and "asat" are classified as "gati" when used in contexts
 * of respect (ādara) and disrespect (anādara) respectively.
 * 
 * Traditional Commentary Integration:
 * - Kāśikā: सदसती गतिसंज्ञे भवतः आदरानादरार्थे प्रयुज्यमाने
 * - Patañjali: आदरे सत्, अनादरे असत् इति गतिसंज्ञा भवति
 * 
 * Modern Explanation:
 * This sutra specifically deals with the contextual classification of "sat" (good/proper)
 * and "asat" (bad/improper) as गति (indeclinable particles) when they express
 * respectful or disrespectful attitudes in verbal constructions.
 * 
 * Linguistic Scope:
 * - Applies to: "sat" (सत्) and "asat" (असत्) only
 * - Context requirement: Verbal context with meaning of respect/disrespect
 * - Classification: गति (indeclinable particles with pre-verbal function)
 * - Semantic constraint: Must express ādara (respect) or anādara (disrespect)
 * 
 * Examples:
 * - सत् करोति (sat karoti) - "does respectfully" → sat = गति
 * - असत् करोति (asat karoti) - "does disrespectfully" → asat = गति
 */

import { 
  validateSanskritWord, 
  detectScript,
  isDevanagari,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.63: आदरानादरयोः सदसती
 * 
 * Analyzes whether "sat" or "asat" should be classified as गति when used
 * in contexts expressing respect or disrespect.
 * 
 * @param {string} word - The word to analyze (expecting "sat", "सत्", "asat", or "असत्")
 * @param {Object} context - Context object containing verb and meaning information
 * @param {string} context.verb - The verb in the construction
 * @param {string} context.meaning - The contextual meaning ('respect' or 'disrespect')
 * @returns {Object} Comprehensive analysis result
 */
function sutra163(word, context) {
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
    
    // For this simple case, we'll work with the input forms directly
    // since we're only checking for "sat"/"सत्" and "asat"/"असत्"
    const workingWord = normalizedWord.trim();

    // Phase 3: Context Validation
    const contextValidation = validateContext(context);
    if (!contextValidation.isValid) {
      return createNonApplicableResult(contextValidation.reason, {
        word: normalizedWord,
        context: context
      });
    }

    // Phase 4: Core Sutra Logic - Check if word is "sat" or "asat"
    const wordAnalysis = analyzeTargetWord(workingWord);
    if (!wordAnalysis.isTargetWord) {
      return createNonApplicableResult(
        `Word "${normalizedWord}" is not "sat" or "asat"`,
        { word: normalizedWord, expectedWords: ['sat', 'asat', 'सत्', 'असत्'] }
      );
    }

    // Phase 5: Semantic Context Analysis
    const semanticAnalysis = analyzeSemanticContext(wordAnalysis.wordType, context);
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
      reason: 'Contextual meaning required for ādara/anādara determination' 
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
 * Analyzes if the word is "sat" or "asat" in either script
 * @param {string} word - The word to analyze
 * @returns {Object} Word analysis result
 */
function analyzeTargetWord(word) {
  const satWords = ['sat', 'सत्'];
  const asatWords = ['asat', 'असत्'];

  if (satWords.includes(word)) {
    return {
      isTargetWord: true,
      wordType: 'sat',
      iastForm: 'sat',
      devForm: 'सत्'
    };
  }

  if (asatWords.includes(word)) {
    return {
      isTargetWord: true,
      wordType: 'asat',
      iastForm: 'asat',
      devForm: 'असत्'
    };
  }

  return { isTargetWord: false };
}

/**
 * Analyzes semantic context for ādara/anādara determination
 * @param {string} wordType - "sat" or "asat"
 * @param {Object} context - Context object
 * @returns {Object} Semantic analysis result
 */
function analyzeSemanticContext(wordType, context) {
  const meaning = context.meaning.toLowerCase().trim();

  if (wordType === 'sat') {
    if (meaning === 'respect') {
      return {
        applies: true,
        semanticType: 'ādara',
        reason: "Word is 'sat' with meaning 'respect' - expresses ādara",
        expectedMeaning: 'respect'
      };
    } else {
      return {
        applies: false,
        reason: "Word 'sat' requires meaning 'respect' for गति classification",
        expectedMeaning: 'respect'
      };
    }
  }

  if (wordType === 'asat') {
    if (meaning === 'disrespect') {
      return {
        applies: true,
        semanticType: 'anādara',
        reason: "Word is 'asat' with meaning 'disrespect' - expresses anādara",
        expectedMeaning: 'disrespect'
      };
    } else {
      return {
        applies: false,
        reason: "Word 'asat' requires meaning 'disrespect' for गति classification",
        expectedMeaning: 'disrespect'
      };
    }
  }

  return {
    applies: false,
    reason: 'Unknown word type in semantic analysis'
  };
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
    sutra: '1.4.63',
    sutraText: 'आदरानादरयोः सदसती',
    translation: 'The words sat and asat (are designated as gati) in contexts of respect and disrespect',
    
    // Morphological Analysis
    morphological: {
      category: 'gati',
      features: ['indeclinable'],
      subCategory: 'contextual_qualifier',
      originalForm: originalWord,
      normalizedForm: wordAnalysis.iastForm,
      devanagariForm: wordAnalysis.devForm
    },

    // Semantic Analysis
    semantic: {
      function: 'pre-verb',
      type: 'qualifier',
      contextualMeaning: semanticAnalysis.semanticType,
      expressedAttitude: semanticAnalysis.semanticType === 'ādara' ? 'respect' : 'disrespect',
      semanticRole: 'manner_adverbial'
    },

    // Syntactic Analysis
    syntactic: {
      position: 'pre_verbal',
      dependency: 'verb_modifier',
      scope: 'verbal_action',
      construction: `${wordAnalysis.iastForm}_${context.verb}`,
      syntacticFunction: 'adverbial_qualifier'
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
      `Satisfies ${semanticAnalysis.semanticType} (${semanticAnalysis.semanticType === 'ādara' ? 'respect' : 'disrespect'}) requirement`,
      `Verbal context provided: ${context.verb}`,
      'Meets all conditions for गति classification per sutra 1.4.63'
    ],

    confidence: confidence,

    // Traditional Commentary
    commentary: {
      kāśikā: 'सदसती गतिसंज्ञे भवतः आदरानादरार्थे प्रयुज्यमाने',
      translation: '"Sat" and "asat" receive गति designation when used in senses of respect and disrespect',
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
    sutra: '1.4.63',
    sutraText: 'आदरानादरयोः सदसती',
    
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
    sutra: '1.4.63',
    sutraText: 'आदरानादरयोः सदसती',
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
    'missing_meaning': 'Contextual meaning required for ādara/anādara determination',
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
      'Example: {verb: "kṛ", meaning: "respect"}'
    ],
    'missing_meaning': [
      'Add meaning property to context object',
      'Use "respect" for sat or "disrespect" for asat',
      'Meaning determines ādara/anādara classification'
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

  // Context completeness bonus
  if (context.verb && context.meaning) {
    confidence += 0.00; // Already at high confidence
  }

  return Math.min(confidence, 1.0);
}

export default sutra163;
