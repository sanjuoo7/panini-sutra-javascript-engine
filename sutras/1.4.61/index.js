/**
 * Sutra 1.4.61: ऊर्यादिच्विडाचश्च (ūrayādicaviḍācaśaca)
 * 
 * This sutra extends गति designation to three specific categories:
 * 1. ऊर्यादि - Words from the ūrī list 
 * 2. च्विडाच - Words ending with cvi suffix (5.4.50)
 * 3. डाचान्ताः - Words ending with ḍāc suffix (5.4.57)
 * 
 * When used in conjunction with verbs भू, कृ, or अस्, these get गति designation.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { analyzeGatiClassification } from '../sanskrit-utils/nipata-classifier.js';

/**
 * Main function for Sutra 1.4.61
 * Classifies words from ūrī list, cvi-suffix words, and ḍāc-suffix words as गति
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Context object containing verb information
 * @returns {Object} Analysis result with गति classification
 */
function sutra1461(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string' || word.trim() === '') {
      return createErrorResult('invalid_word', 'Word must be a non-empty string');
    }

    const normalizedWord = word.trim();
    const script = detectScript(normalizedWord);
    
    // Validate Sanskrit input
    const validation = validateSanskritWord(normalizedWord);
    if (!validation.isValid) {
      return createErrorResult('invalid_sanskrit', `Invalid Sanskrit word: ${word}`);
    }

    // Check for verb context
    if (!context.verb) {
      return createErrorResult('missing_verb', 'गति designation requires verbal context');
    }

    // Verify compatible verb
    if (!isCompatibleVerb(context.verb)) {
      return createErrorResult('incompatible_verb', 'गति designation only applies with भू, कृ, or अस्');
    }

    // Analyze each category
    const uriAnalysis = analyzeUriList(word, context);
    const cviAnalysis = analyzeCviSuffix(word, context);
    const dacAnalysis = analyzeDacSuffix(word, context);

    // Check if any category applies
    if (uriAnalysis.applies || cviAnalysis.applies || dacAnalysis.applies) {
      const matchedCategory = uriAnalysis.applies ? 'ūrī-list' : 
                             cviAnalysis.applies ? 'cvi-suffix' : 'ḍāc-suffix';
      const primaryAnalysis = uriAnalysis.applies ? uriAnalysis : 
                             cviAnalysis.applies ? cviAnalysis : dacAnalysis;
      
      // Calculate overall confidence
      const confidence = Math.min(0.95, 0.5 + primaryAnalysis.confidence);
      
      // Determine morphological type
      const morphologicalType = matchedCategory === 'ūrī-list' ? 'invariant_particle' :
                               matchedCategory === 'cvi-suffix' ? 'derived_adjective' : 
                               'derived_iterative';
      
      // Get semantic function
      const semanticFunction = matchedCategory === 'ūrī-list' ? getUriWordSemantics(word) :
                              matchedCategory === 'cvi-suffix' ? 'quality_expression' :
                              'manner_expression';
      
      // Get integration properties
      const gatiProperties = analyzeGatiProperties(word, context);
      const verbCompatibility = {
        verb: context.verb,
        compatible: true,
        verbType: getVerbType(context.verb)
      };

      return {
        // Core Application
        applies: true,
        word: word,
        term: 'gati',
        sutra: '1.4.61',
        sutraText: 'ऊर्यादिच्विडाचश्च',
        
        // Classification Analysis
        category: matchedCategory,
        confidence: confidence,
        reasons: primaryAnalysis.reasons || ['category_match'],
        script: script,
        
        // Morphological Analysis
        morphological: {
          category: morphologicalType,
          invariant: matchedCategory === 'ūrī-list',
          derivation: matchedCategory !== 'ūrī-list' ? {
            suffixType: matchedCategory === 'cvi-suffix' ? 'cvi' : 'ḍāc',
            baseForm: analyzeBaseForm(word, matchedCategory),
            process: matchedCategory === 'cvi-suffix' ? 'adjectival_derivation' : 'iterative_formation'
          } : null,
          features: getGrammaticalFeatures(word, matchedCategory)
        },
        
        // Semantic Analysis
        semantic: {
          function: semanticFunction,
          type: matchedCategory === 'ūrī-list' ? 'discourse_particle' :
                matchedCategory === 'cvi-suffix' ? 'quality_adjective' : 'manner_adverb',
          subcategory: primaryAnalysis.semanticType || 'general',
          pragmaticRole: matchedCategory === 'ūrī-list' ? 'epistemic_marker' : 'descriptive_modifier'
        },
        
        // Syntactic Properties
        syntactic: {
          role: 'pre_verbal_modifier',
          position: 'initial_or_medial',
          scope: 'clause_level',
          accentuation: 'anudātta',
          dependencies: ['verb_required'],
          restrictions: ['no_iti_following']
        },
        
        // Integration Properties
        integration: {
          extendsGati: true,
          precedence: 'specific',
          gatiType: 'extended',
          compatibleVerbs: ['भू', 'कृ', 'अस्'],
          phonoSyntacticUnit: true,
          affectsAccent: true,
          blocksOtherDesignations: false
        },
        
        // Context Validation
        contextValidation: {
          verbRequired: true,
          verbCompatible: verbCompatibility.compatible,
          noConflictingDesignations: true,
          sufficientContext: true
        },
        
        // Detailed Category Analysis
        categoryAnalysis: {
          uriList: {
            applies: uriAnalysis.applies,
            confidence: uriAnalysis.confidence || 0,
            semanticType: uriAnalysis.semanticType,
            word: word
          },
          cviSuffix: {
            applies: cviAnalysis.applies,
            confidence: cviAnalysis.confidence || 0,
            semanticType: cviAnalysis.semanticType,
            isColorTerm: cviAnalysis.suffixAnalysis?.isColorTerm || false,
            isQualityTerm: cviAnalysis.suffixAnalysis?.isQualityTerm || false,
            word: word
          },
          dacSuffix: {
            applies: dacAnalysis.applies,
            confidence: dacAnalysis.confidence || 0,
            semanticType: dacAnalysis.semanticType,
            isOnomatopoeic: dacAnalysis.suffixAnalysis?.isOnomatopoeic || false,
            isReduplicated: dacAnalysis.suffixAnalysis?.isReduplicated || false,
            word: word
          }
        },
        
        // गति Framework Integration
        gatiProperties: gatiProperties,
        verbCompatibility: verbCompatibility,
        
        // Computational Properties
        processingNotes: {
          primaryCategory: matchedCategory,
          alternativeAnalyses: getAlternativeAnalyses(word, uriAnalysis, cviAnalysis, dacAnalysis),
          confidence_breakdown: {
            category_match: primaryAnalysis.confidence || 0.6,
            context_validation: 0.2,
            verb_compatibility: 0.15
          }
        }
      };
    }

    // If none apply
    return createNonApplicableResult(word, context);

  } catch (error) {
    return createErrorResult('processing_error', `Error processing sutra: ${error.message}`);
  }
}

/**
 * Analyzes if word belongs to ūrī list
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
function analyzeUriList(word, context) {
  const script = detectScript(word);
  
  // ūrī list - classical particles (Kaśikā on 1.4.61)
  const uriWords = script === 'Devanagari' ? [
    'ऊरी', 'ऊररी', 'आविः', 'साक्षात्', 'प्रादुस्', 'श्रद्', 'अलम्', 
    'वषट्', 'श्रौषट्', 'स्वाहा', 'नमः'
  ] : [
    'ūrī', 'ūrari', 'āviḥ', 'sākṣāt', 'prādus', 'śrad', 'alam',
    'vaṣaṭ', 'śrauṣaṭ', 'svāhā', 'namaḥ'
  ];

  const normalizedWord = word.trim();
  const isInList = uriWords.includes(normalizedWord);

  return {
    applies: isInList,
    word: word,
    category: 'ūrī-list',
    confidence: isInList ? 0.9 : 0,
    reasons: isInList ? ['found_in_uri_list'] : ['not_in_uri_list'],
    semanticType: isInList ? getUriWordSemantics(normalizedWord) : null
  };
}

/**
 * Analyzes if word has cvi suffix (5.4.50)
 * @param {string} word - Word to analyze  
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
function analyzeCviSuffix(word, context) {
  const script = detectScript(word);
  
  // cvi suffix creates feminine forms of colors/qualities (5.4.50)
  const cviPattern = script === 'Devanagari' ? /ी$/ : /ī$/;
  const normalizedWord = word.trim();
  const hasCviSuffix = cviPattern.test(normalizedWord);

  // Additional semantic checks for color/quality terms
  const isColorTerm = isColorOrQualityTerm(normalizedWord);
  const isQualityTerm = isQualityOrAttributeTerm(normalizedWord);

  return {
    applies: hasCviSuffix && (isColorTerm || isQualityTerm),
    word: word,
    category: 'cvi-suffix',
    confidence: hasCviSuffix ? (isColorTerm || isQualityTerm ? 0.8 : 0.4) : 0,
    reasons: hasCviSuffix ? 
      ['has_cvi_suffix', ...(isColorTerm ? ['color_term'] : []), ...(isQualityTerm ? ['quality_term'] : [])] :
      ['no_cvi_suffix'],
    semanticType: hasCviSuffix ? (isColorTerm ? 'color' : 'quality') : null,
    suffixAnalysis: {
      hasCviPattern: hasCviSuffix,
      isColorTerm: isColorTerm,
      isQualityTerm: isQualityTerm
    }
  };
}

/**
 * Analyzes if word ends with ḍāc suffix
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
function analyzeDacSuffix(word, context) {
  const script = detectScript(word);
  
  // ḍāc suffix patterns (5.4.57 reference) - onomatopoeic/iterative words
  const dacPatterns = script === 'Devanagari' ? [
    /ा$/, /टा$/, /डा$/, /ठा$/, /ढा$/  // -ā, -ṭā, -ḍā, -ṭhā, -ḍhā endings
  ] : [
    /ā$/, /ṭā$/, /ḍā$/, /ṭhā$/, /ḍhā$/  // -ā, -ṭā, -ḍā, -ṭhā, -ḍhā endings
  ];

  const normalizedWord = word.trim();
  const hasDacSuffix = dacPatterns.some(pattern => pattern.test(normalizedWord));

  // Additional check for reduplicative/onomatopoeic patterns
  const isReduplicated = checkRedupliativePattern(normalizedWord);
  const isOnomatopoeic = checkOnomatopoeicPattern(normalizedWord);

  const confidence = hasDacSuffix ? 
    (isReduplicated || isOnomatopoeic ? 0.9 : 0.6) : 0;

  return {
    applies: hasDacSuffix,
    word: word,
    category: 'ḍāc-suffix',
    confidence: confidence,
    reasons: hasDacSuffix ? 
      ['has_dac_suffix', ...(isReduplicated ? ['reduplicated'] : []), ...(isOnomatopoeic ? ['onomatopoeic'] : [])] :
      ['no_dac_suffix'],
    semanticType: hasDacSuffix ? (isOnomatopoeic ? 'onomatopoeia' : 'iterative') : null,
    suffixAnalysis: {
      hasDacPattern: hasDacSuffix,
      isReduplicated: isReduplicated,
      isOnomatopoeic: isOnomatopoeic
    }
  };
}

/**
 * Checks if verb is compatible (भू, कृ, अस्)
 * @param {string} verb - Verb to check
 * @returns {boolean} True if compatible
 */
function isCompatibleVerb(verb) {
  const compatibleVerbs = {
    'Devanagari': ['भू', 'कृ', 'अस्', 'भव्', 'कर्', 'आस्'],
    'IAST': ['bhū', 'kṛ', 'as', 'bhav', 'kar', 'ās']
  };

  const script = detectScript(verb);
  const verbList = compatibleVerbs[script] || compatibleVerbs['IAST'];
  
  return verbList.includes(verb.trim());
}

/**
 * Gets semantic type for ūrī words
 * @param {string} word - ūrī word
 * @returns {string} Semantic type
 */
function getUriWordSemantics(word) {
  const semanticMap = {
    // Devanagari
    'ऊरी': 'assent', 'आविः': 'manifestation', 'साक्षात्': 'directly',
    'प्रादुस्': 'appearance', 'अलम्': 'enough', 'वषट्': 'oblation_call',
    'स्वाहा': 'oblation_call', 'नमः': 'salutation',
    // IAST
    'ūrī': 'assent', 'āviḥ': 'manifestation', 'sākṣāt': 'directly',
    'prādus': 'appearance', 'alam': 'enough', 'vaṣaṭ': 'oblation_call',
    'svāhā': 'oblation_call', 'namaḥ': 'salutation'
  };
  
  return semanticMap[word] || 'particle';
}

/**
 * Checks if word is a color term
 * @param {string} word - Word to check
 * @returns {boolean} True if color term
 */
function isColorOrQualityTerm(word) {
  const colorTerms = [
    'śuklī', 'शुक्ली', 'kṛṣṇī', 'कृष्णी', 'aruṇī', 'अरुणी', 
    'haritī', 'हरिती', 'nīlī', 'नीली', 'pītī', 'पीती'
  ];
  
  return colorTerms.includes(word);
}

/**
 * Checks if word is a quality term
 * @param {string} word - Word to check  
 * @returns {boolean} True if quality term
 */
function isQualityOrAttributeTerm(word) {
  const qualityTerms = [
    'madhurī', 'मधुरी', 'tīkṣṇī', 'तीक्ष्णी', 'mṛdvī', 'मृद्वी',
    'kaṭhīnī', 'कठीनी', 'laghuī', 'लघुई'
  ];
  
  return qualityTerms.includes(word);
}

/**
 * Checks for reduplicative patterns
 * @param {string} word - Word to check
 * @returns {boolean} True if reduplicative
 */
function checkRedupliativePattern(word) {
  // Simple check for AB-AB pattern
  const length = word.length;
  if (length >= 4) {
    const half = Math.floor(length / 2);
    const firstHalf = word.substring(0, half);
    const secondHalf = word.substring(half);
    return firstHalf === secondHalf;
  }
  return false;
}

/**
 * Checks for onomatopoeic patterns
 * @param {string} word - Word to check
 * @returns {boolean} True if onomatopoeic
 */
function checkOnomatopoeicPattern(word) {
  const script = detectScript(word);
  const onomatopoeicPatterns = script === 'Devanagari' ? [
    /घट/, /पट/, /फट/, /धग/, /चल/  // Sound patterns
  ] : [
    /ghaṭ/, /paṭ/, /phaṭ/, /dhag/, /cal/  // Sound patterns
  ];
  
  return onomatopoeicPatterns.some(pattern => pattern.test(word));
}

/**
 * Analyzes गति properties using nipata classifier
 * @param {string} word - Word to analyze
 * @param {Object} context - Context object
 * @returns {Object} गति analysis
 */
function analyzeGatiProperties(word, context) {
  try {
    return analyzeGatiClassification(word, context.verb, context);
  } catch (error) {
    return {
      applies: false,
      confidence: 0,
      isGati: false,
      error: error.message
    };
  }
}

/**
 * Analyzes base form for derived words
 * @param {string} word - Word to analyze
 * @param {string} category - Category type
 * @returns {string} Base form
 */
function analyzeBaseForm(word, category) {
  if (category === 'cvi-suffix') {
    // Remove -ī ending for cvi suffix
    return word.replace(/[ीī]$/, '');
  } else if (category === 'ḍāc-suffix') {
    // For reduplicated forms, try to find base
    const script = detectScript(word);
    if (script === 'Devanagari') {
      return word.replace(/ा$/, '').replace(/(.+)\1/, '$1');
    } else {
      return word.replace(/ā$/, '').replace(/(.+)\1/, '$1');
    }
  }
  return word;
}

/**
 * Gets grammatical features for the word
 * @param {string} word - Word to analyze
 * @param {string} category - Category type
 * @returns {string[]} Grammatical features
 */
function getGrammaticalFeatures(word, category) {
  const features = ['gati_designation'];
  
  if (category === 'ūrī-list') {
    features.push('invariant', 'discourse_function', 'clause_initial');
  } else if (category === 'cvi-suffix') {
    features.push('adjectival', 'color_quality', 'attributive');
  } else if (category === 'ḍāc-suffix') {
    features.push('iterative', 'manner_expression', 'sound_symbolic');
  }
  
  return features;
}

/**
 * Gets alternative analyses for comprehensive evaluation
 * @param {string} word - Word being analyzed
 * @param {Object} uriAnalysis - URI analysis result
 * @param {Object} cviAnalysis - CVI analysis result  
 * @param {Object} dacAnalysis - DAC analysis result
 * @returns {Object[]} Alternative analyses
 */
function getAlternativeAnalyses(word, uriAnalysis, cviAnalysis, dacAnalysis) {
  const alternatives = [];
  
  // Check for multiple possible analyses
  const analyses = [
    { type: 'ūrī-list', analysis: uriAnalysis },
    { type: 'cvi-suffix', analysis: cviAnalysis },
    { type: 'ḍāc-suffix', analysis: dacAnalysis }
  ];
  
  const applicableAnalyses = analyses.filter(a => a.analysis.applies);
  
  if (applicableAnalyses.length > 1) {
    alternatives.push({
      type: 'multiple_categories',
      note: 'Word could belong to multiple categories',
      categories: applicableAnalyses.map(a => a.type)
    });
  }
  
  // Check for phonetic similarities
  if (!uriAnalysis.applies && !cviAnalysis.applies && !dacAnalysis.applies) {
    alternatives.push({
      type: 'potential_variants',
      note: 'Consider phonetic variants or alternative spellings'
    });
  }
  
  return alternatives;
}

/**
 * Gets verb type for compatibility analysis
 * @param {string} verb - Verb to analyze
 * @returns {string} Verb type
 */
function getVerbType(verb) {
  const verbTypeMap = {
    'भू': 'existence',
    'कृ': 'action', 
    'अस्': 'being',
    'kṛ': 'action',
    'bhū': 'existence',
    'as': 'being'
  };
  
  return verbTypeMap[verb] || 'action';
}

/**
 * Creates error result with comprehensive analysis
 * @param {string} errorType - Type of error
 * @param {string} reason - Reason for error
 * @returns {Object} Error result
 */
function createErrorResult(errorType, reason) {
  return {
    applies: false,
    sutra: '1.4.61',
    sutraText: 'ऊर्यादिच्विडाचश्च',
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
      verbProvided: errorType !== 'missing_verb'
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
    'missing_verb': 'गति designation requires verbal context (भू, कृ, or अस्)',
    'incompatible_verb': 'गति classification only applies with compatible motion/being verbs',
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
      'Use valid Sanskrit script (IAST or Devanagari)',
      'Check for typos in transliteration'
    ],
    'invalid_sanskrit': [
      'Verify Sanskrit transliteration accuracy',
      'Check script consistency',
      'Use standard IAST or Devanagari encoding'
    ],
    'missing_verb': [
      'Add verb context: { verb: "भू" } or { verb: "kṛ" }',
      'Use compatible verbs: भू (bhū), कृ (kṛ), अस् (as)',
      'Ensure verbal context is specified'
    ],
    'incompatible_verb': [
      'Use motion/being verbs: भू, कृ, अस्',
      'Check if verb supports गति classification',
      'Consider alternative grammatical analysis'
    ],
    'processing_error': [
      'Check input format and context structure',
      'Verify all required parameters',
      'Report if issue persists'
    ]
  };
  
  return suggestions[errorType] || ['Check input parameters and context'];
}

/**
 * Creates non-applicable result with analysis
 * @param {string} word - Word that doesn't apply
 * @param {Object} context - Context information
 * @returns {Object} Non-applicable result
 */
function createNonApplicableResult(word, context) {
  return {
    applies: false,
    sutra: '1.4.61',
    sutraText: 'ऊर्यादिच्विडाचश्च',
    word: word,
    script: detectScript(word),
    reason: 'not_gati_eligible',
    message: 'Word does not belong to ūrī list, cvi-ending, or ḍāc-ending categories',
    confidence: 0,
    
    // Analysis details showing why it failed
    categoryAnalysis: {
      uriList: analyzeUriList(word, context),
      cviSuffix: analyzeCviSuffix(word, context),
      dacSuffix: analyzeDacSuffix(word, context)
    },
    
    verbCompatibility: context.verb ? {
      verb: context.verb,
      compatible: isCompatibleVerb(context.verb)
    } : null,
    
    suggestions: [
      'Verify word belongs to ūrī list',
      'Check for cvi suffix (feminine color/quality terms)',
      'Check for ḍāc suffix (onomatopoeic/iterative words)',
      'Ensure proper verbal context with भू, कृ, or अस्'
    ]
  };
}

// Named exports for testing and integration
export { 
  analyzeUriList, 
  analyzeCviSuffix, 
  analyzeDacSuffix,
  isCompatibleVerb,
  analyzeGatiProperties
};

// Export main function as default
export default sutra1461;
