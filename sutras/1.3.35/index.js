/**
 * Sutra 1.3.35: अकर्मकाच्च (akarmakācca)
 * 
 * "After the verb कृ preceded by वि, when used intransitively, the आत्मनेपद is used."
 * 
 * This sutra specifies that when the verbal root कृ (kṛ) is preceded by the prefix वि (vi)
 * and is used intransitively (without a direct object), it takes आत्मनेपद endings
 * instead of परस्मैपद endings.
 * 
 * Type: आत्मनेपद designation rule (Classification)
 * Returns: Boolean indicating whether आत्मनेपद should be used
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.35
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if the verb कृ with prefix वि should take आत्मनेपद when used intransitively
 * 
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context object
 * @param {boolean} [context.isIntransitive] - Whether the verb is used intransitively
 * @param {string} [context.meaning] - Specific meaning context
 * @param {boolean} [context.hasDirectObject] - Whether there's a direct object
 * @returns {Object} Analysis result
 */
export function sutra1335(word, context = {}) {
  // Validate input
  if (!word || typeof word !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: word must be a non-empty string',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Sanitize and validate Sanskrit word
  const cleanWord = word.trim();
  if (!validateSanskritWord(cleanWord)) {
    return {
      applies: false,
      reason: 'Invalid Sanskrit word format',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Detect script for appropriate processing
  const script = detectScript(cleanWord);
  if (script === 'Unknown') {
    return {
      applies: false,
      reason: 'Unable to detect script (IAST or Devanagari)',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Check for वि prefix + कृ root combination
  const hasViKrCombination = checkViKrCombination(cleanWord, script);
  if (!hasViKrCombination.found) {
    return {
      applies: false,
      reason: 'Word does not contain वि + कृ combination',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Check for intransitive usage
  const isIntransitive = checkIntransitiveUsage(context);
  if (!isIntransitive.applies) {
    return {
      applies: false,
      reason: isIntransitive.reason,
      isAtmanepada: false,
      confidence: hasViKrCombination.confidence * 0.3 // Lower confidence for non-intransitive
    };
  }

  // Both conditions met - sutra applies
  return {
    applies: true,
    reason: 'Sutra 1.3.35: वि + कृ in intransitive usage requires आत्मनेपद',
    isAtmanepada: true,
    confidence: Math.min(hasViKrCombination.confidence, isIntransitive.confidence),
    analysis: {
      prefix: 'वि',
      root: 'कृ',
      usage: 'intransitive',
      script: script
    }
  };
}

/**
 * Checks if the word contains वि prefix + कृ root combination
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {string} script - Detected script (IAST/Devanagari)
 * @returns {Object} Analysis result with confidence
 */
function checkViKrCombination(word, script) {
  if (script === 'IAST') {
    return checkViKrIAST(word);
  } else if (script === 'Devanagari') {
    return checkViKrDevanagari(word);
  } else if (script === 'Mixed') {
    // For mixed script, try both and take the best result
    const iastResult = checkViKrIAST(word);
    const devaResult = checkViKrDevanagari(word);
    
    if (iastResult.found || devaResult.found) {
      return {
        found: true,
        confidence: Math.max(iastResult.confidence, devaResult.confidence) * 0.8 // Reduced confidence for mixed
      };
    }
    return { found: false, confidence: 0 };
  }
  
  return { found: false, confidence: 0 };
}

/**
 * Checks for वि + कृ pattern in IAST script
 */
function checkViKrIAST(word) {
  // Pattern variations for वि + कृ in IAST
  const viKrPatterns = [
    /vi.*kṛ/i,           // Basic vi + kr pattern
    /vi.*kar/i,          // vi + kar (कर्)
    /vi.*kur/i,          // vi + kur (कुर्)
    /vi.*kr̥/i,           // vi + kr̥ (alternative kr notation)
    /vyā.*kṛ/i,          // व्या + कृ (विकार forms)
    /vyā.*kar/i,         // व्या + कर्
    /saṃ.*vi.*kār/i,     // saṃvikār compound pattern
    /saṃ.*vi.*kar/i      // saṃvikar compound pattern
  ];

  // Check for compound patterns (when वि is part of compound)
  const compoundPatterns = [
    /(^|[aeiouāīūṛḷeaoṃḥ])vi.*kṛ/i,
    /(^|[^a-z])vi.*kar/i,
    /saṃvi.*kār/i,
    /sam.*vi.*kar/i
  ];

  let maxConfidence = 0;
  let foundPattern = false;

  // Check basic patterns
  for (const pattern of viKrPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.9);
    }
  }

  // Check compound patterns for higher confidence
  for (const pattern of compoundPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.95);
    }
  }

  return {
    found: foundPattern,
    confidence: maxConfidence
  };
}

/**
 * Checks for वि + कृ pattern in Devanagari script
 */
function checkViKrDevanagari(word) {
  // Pattern variations for वि + कृ in Devanagari
  const viKrPatterns = [
    /वि.*कृ/,              // Basic वि + कृ
    /वि.*कर्/,             // वि + कर्
    /वि.*कुर्/,            // वि + कुर्
    /वि.*करो/,             // वि + करो (as in विकरोति)
    /वि.*कु/,              // वि + कु (as in विकुरुते)
    /व्या.*कृ/,            // व्या + कृ (विकार forms)
    /व्या.*कर्/,           // व्या + कर्
    /व्या.*कर/             // व्या + कर (as in व्याकरण)
  ];

  // Check for compound patterns
  const compoundPatterns = [
    /(^|[अआइईउऊऋॠऌॡएऐओऔंः])वि.*कृ/,
    /(^|[अआइईउऊऋॠऌॡएऐओऔंः])वि.*कर्/,
    /(^|[अआइईउऊऋॠऌॡएऐओऔंः])वि.*करो/,
    /(^|[^क-ह])वि.*कर/
  ];

  let maxConfidence = 0;
  let foundPattern = false;

  // Check basic patterns
  for (const pattern of viKrPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.9);
    }
  }

  // Check compound patterns for higher confidence
  for (const pattern of compoundPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.95);
    }
  }

  return {
    found: foundPattern,
    confidence: maxConfidence
  };
}

/**
 * Checks if the verb is used intransitively
 * 
 * @param {Object} context - Context object with usage information
 * @returns {Object} Analysis result
 */
function checkIntransitiveUsage(context) {
  // Explicit intransitive flag has highest confidence
  if (context.isIntransitive === true) {
    return {
      applies: true,
      confidence: 0.95,
      reason: 'Explicitly marked as intransitive'
    };
  }

  // Explicit transitive flag
  if (context.isIntransitive === false) {
    return {
      applies: false,
      confidence: 0.95,
      reason: 'Explicitly marked as transitive'
    };
  }

  // Check for absence of direct object
  if (context.hasDirectObject === false) {
    return {
      applies: true,
      confidence: 0.85,
      reason: 'No direct object present'
    };
  }

  // Check for presence of direct object
  if (context.hasDirectObject === true) {
    return {
      applies: false,
      confidence: 0.85,
      reason: 'Direct object present (transitive usage)'
    };
  }

  // Check semantic meanings that suggest intransitive usage
  if (context.meaning) {
    const intransitiveMeanings = [
      'to be made',
      'to become',
      'to transform',
      'to change oneself',
      'to be performed',
      'self-transformation',
      'inner change',
      'become transformed',
      'undergoes transformation'
    ];

    const meaningLower = context.meaning.toLowerCase();
    for (const meaning of intransitiveMeanings) {
      if (meaningLower.includes(meaning)) {
        return {
          applies: true,
          confidence: 0.8,
          reason: `Semantic meaning suggests intransitive: ${meaning}`
        };
      }
    }

    // Transitive meanings
    const transitiveMeanings = [
      'to make',
      'to create',
      'to cause',
      'to produce',
      'to perform something',
      'to do something',
      'make something different'
    ];

    for (const meaning of transitiveMeanings) {
      if (meaningLower.includes(meaning)) {
        return {
          applies: false,
          confidence: 0.8,
          reason: `Semantic meaning suggests transitive: ${meaning}`
        };
      }
    }
  }

  // Default: insufficient information to determine
  return {
    applies: false,
    confidence: 0.3,
    reason: 'Insufficient context to determine transitivity - defaulting to transitive'
  };
}

// Default export
export default sutra1335;
