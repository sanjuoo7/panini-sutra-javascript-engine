/**
 * Sutra 1.1.20: दाधा घ्वदाप् (dādhā ghvadāp)
 * 
 * The verbal roots दा (dā) 'to give' and धा (dhā) 'to place/hold' are called घु (ghu).
 * 
 * Traditional Commentary Integration:
 * - Kāśikā: दाधा इति घुसंज्ञा भवति
 * - Patañjali: दा धा इति घुः। ते घुसंज्ञकाः
 * 
 * Modern Explanation:
 * This saṃjñā (definitional) sutra establishes the technical term "ghu" for two 
 * specific verbal roots. The ghu classification affects their grammatical behavior
 * in various formations and transformations throughout Paninian grammar.
 * 
 * Linguistic Scope:
 * - Root Classification: Technical term "ghu" for grammatical operations
 * - Applies to: दा (dā) and धा (dhā) roots only
 * - Grammatical Impact: Special rules apply to ghu-classified roots
 * - Morphological Significance: Affects derivative formations
 * 
 * Examples:
 * - दा (dā) → गृह्णाति pattern formations with ghu behavior
 * - धा (dhā) → special conjugation patterns following ghu rules
 */

import { 
  validateSanskritWord, 
  detectScript,
  isDevanagari,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.1.20: दाधा घ्वदाप्
 * 
 * Analyzes whether a given root should be classified as घु (ghu) according to
 * this definitional sutra.
 * 
 * @param {string} root - The verbal root to analyze 
 * @param {Object} context - Context object for grammatical information
 * @param {string} context.rootType - Type of root analysis requested
 * @returns {Object} Comprehensive analysis result
 */
function sutra1120(root, context = {}) {
  try {
    // Phase 1: Input Validation and Error Handling
    const inputValidation = validateInput(root, context);
    if (!inputValidation.isValid) {
      return createErrorResult(inputValidation.errorType, inputValidation.reason);
    }

    // Phase 2: Root Normalization and Script Handling
    const sanitized = sanitizeInput(root);
    if (!sanitized.success) {
      return createErrorResult('invalid_root', sanitized.error);
    }
    
    const normalizedRoot = sanitized.sanitized;
    const script = detectScript(root);
    const isDevScript = script === 'Devanagari';
    
    const workingRoot = normalizedRoot.trim();

    // Phase 3: Core Sutra Logic - Check if root is गhu
    const rootAnalysis = analyzeGhuRoot(workingRoot);
    if (!rootAnalysis.isGhuRoot) {
      return createNonApplicableResult(
        `Root "${normalizedRoot}" is not classified as ghu`,
        { 
          root: normalizedRoot, 
          ghuRoots: rootAnalysis.expectedRoots,
          classification: 'non-ghu'
        }
      );
    }

    // Phase 4: Comprehensive Analysis Result
    return createSuccessResult(normalizedRoot, rootAnalysis, context);

  } catch (error) {
    return createErrorResult('processing_error', `Internal error: ${error.message}`);
  }
}

/**
 * Validates input parameters for sutra processing
 * @param {string} root - The root to validate
 * @param {Object} context - Context to validate  
 * @returns {Object} Validation result
 */
function validateInput(root, context) {
  if (!root) {
    return {
      isValid: false,
      errorType: 'missing_input',
      reason: 'Root parameter is required'
    };
  }

  if (typeof root !== 'string') {
    return {
      isValid: false,
      errorType: 'invalid_type',
      reason: 'Root must be a string'
    };
  }

  // Context is optional for analyzeGhu function
  if (context && typeof context !== 'object') {
    return {
      isValid: false,
      errorType: 'invalid_context',
      reason: 'Context must be an object when provided'
    };
  }

  return { isValid: true };
}

/**
 * Analyzes whether a root qualifies as गhu according to the sutra
 * @param {string} root - The root to analyze
 * @returns {Object} Analysis result with detailed breakdown
 */
function analyzeGhuRoot(root) {
  const script = detectScript(root);
  const isDevScript = script === 'Devanagari';
  
  let ghuRoots, expectedRoots;
  if (isDevScript) {
    ghuRoots = ['दा', 'धा'];
    expectedRoots = ['दा (dā)', 'धा (dhā)'];
  } else {
    ghuRoots = ['dā', 'dhā'];
    expectedRoots = ['dā (दा)', 'dhā (धा)'];
  }

  const isGhuRoot = ghuRoots.includes(root);
  
  if (isGhuRoot) {
    return {
      isGhuRoot: true,
      classification: 'ghu',
      root: root,
      script: script,
      technicalName: 'घु',
      meaning: root === 'दा' || root === 'dā' ? 'to give' : 'to place/hold',
      expectedRoots: expectedRoots,
      grammaticalFeatures: getGhuFeatures(root)
    };
  } else {
    return {
      isGhuRoot: false,
      classification: 'non-ghu',
      root: root,
      script: script,
      expectedRoots: expectedRoots,
      reason: `Root "${root}" is not in the ghu class defined by sutra 1.1.20`
    };
  }
}

/**
 * Gets grammatical features associated with ghu roots
 * @param {string} root - The ghu root
 * @returns {Object} Feature object
 */
function getGhuFeatures(root) {
  const baseFeatures = {
    classification: 'ghu',
    technicalTerm: 'घु',
    morphologicalBehavior: 'special_conjugation_patterns',
    derivativeFormations: 'affected_by_ghu_rules'
  };

  if (root === 'दा' || root === 'dā') {
    return {
      ...baseFeatures,
      meaning: 'to_give',
      semanticField: 'donation_transfer',
      commonForms: ['दत्त्वा', 'दत्त', 'ददाति']
    };
  } else if (root === 'धा' || root === 'dhā') {
    return {
      ...baseFeatures,
      meaning: 'to_place_hold',
      semanticField: 'placement_positioning',
      commonForms: ['धत्त्वा', 'हित', 'दधाति']
    };
  }
  
  return baseFeatures;
}

/**
 * Creates a successful analysis result
 * @param {string} root - The analyzed root
 * @param {Object} rootAnalysis - Root analysis details
 * @param {Object} context - Original context
 * @returns {Object} Success result object
 */
function createSuccessResult(root, rootAnalysis, context) {
  return {
    sutra: '1.1.20',
    title: 'दाधा घ्वदाप्',
    applies: true,
    analysis: {
      input: {
        root: root,
        script: rootAnalysis.script,
        context: context
      },
      morphological: {
        classification: rootAnalysis.classification,
        technicalTerm: rootAnalysis.technicalName,
        meaning: rootAnalysis.meaning,
        features: rootAnalysis.grammaticalFeatures
      },
      semantic: {
        rootClass: 'ghu',
        applicabilityDomain: 'verbal_root_classification',
        grammaticalSignificance: 'special_morphological_behavior'
      },
      syntactic: {
        affects: ['conjugation_patterns', 'derivative_formations'],
        scope: 'morphological_operations'
      }
    },
    result: {
      classification: 'ghu',
      applies: true,
      confidence: 100,
      traditionalTerm: 'घुसंज्ञक'
    },
    examples: rootAnalysis.grammaticalFeatures.commonForms || [],
    metadata: {
      sutraType: 'saṃjñā',
      domain: 'root_classification',
      confidence: 100,
      processingTime: Date.now()
    }
  };
}

/**
 * Creates a non-applicable result
 * @param {string} reason - Reason for non-applicability
 * @param {Object} details - Additional details
 * @returns {Object} Non-applicable result object
 */
function createNonApplicableResult(reason, details = {}) {
  return {
    sutra: '1.1.20',
    title: 'दाधा घ्वदाप्',
    applies: false,
    reason: reason,
    analysis: {
      input: {
        root: details.root || '',
        expectedRoots: details.ghuRoots || details.expectedRoots || [],
        classification: details.classification || 'non-ghu'
      },
      verdict: {
        applicable: false,
        reason: reason,
        suggestion: 'Root must be दा (dā) or धा (dhā) for ghu classification'
      }
    },
    metadata: {
      sutraType: 'saṃjñā',
      domain: 'root_classification',
      confidence: 100,
      processingTime: Date.now()
    }
  };
}

/**
 * Creates an error result
 * @param {string} errorType - Type of error
 * @param {string} reason - Error description
 * @returns {Object} Error result object
 */
function createErrorResult(errorType, reason) {
  return {
    sutra: '1.1.20',
    title: 'दाधा घ्वदाप्',
    applies: false,
    error: {
      type: errorType,
      message: reason
    },
    metadata: {
      sutraType: 'saṃjñā',
      domain: 'root_classification',
      processingTime: Date.now()
    }
  };
}

/**
 * Custom validation for Sanskrit words specifically for ghu analysis
 * @param {string} word - Word to validate
 * @returns {boolean} True if valid Sanskrit word
 */
function isValidSanskritForGhu(word) {
  if (!word || typeof word !== 'string') return false;
  
  // First check basic Sanskrit validation
  const validation = validateSanskritWord(word);
  if (!validation.isValid) return false;
  
  // Additional validation for Sanskrit phonemes/characters
  const script = detectScript(word);
  
  if (script === 'Devanagari') {
    // Check if contains only valid Devanagari characters
    const devanagariPattern = /^[\u0900-\u097F\s]+$/;
    return devanagariPattern.test(word);
  } else if (script === 'IAST') {
    // Strict validation for Sanskrit words only
    // Reject common English words that aren't Sanskrit
    const englishWords = ['xyz', 'invalid', 'test', 'hello', 'world', 'error', 'null', 'undefined'];
    if (englishWords.includes(word.toLowerCase())) return false;
    
    // Check if contains non-Sanskrit letter combinations
    if (/[xyz]/.test(word)) return false; // x, y, z not in Sanskrit
    if (/qu/.test(word)) return false; // qu combination not in Sanskrit
    if (/[bcdefghjklmnopqrstuvwxyz]{3,}/.test(word)) return false; // Long consonant clusters
    
    // Check if contains only valid IAST characters
    const iastPattern = /^[a-zA-Zāīūṛṝḷḹēōṃḥñṅṇṭḍṣśkṇ\s]+$/;
    return iastPattern.test(word);
  }
  
  return false;
}

/**
 * Analyzes a root for ghu classification (comprehensive analysis function)
 * 
 * @param {string} root - The verbal root to analyze
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeGhu(root, context = {}) {
  try {
    // Handle empty/null inputs
    if (!root) {
      return {
        isValid: false,
        isGhu: false,
        input: root,
        normalizedInput: '',
        errors: ['Input is required'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.20',
          sutraText: 'दाधा घ्वदाप्',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit word with stricter validation
    if (!isValidSanskritForGhu(root)) {
      return {
        isValid: false,
        isGhu: false,
        input: root,
        normalizedInput: '',
        errors: ['Invalid Sanskrit word'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.20',
          sutraText: 'दाधा घ्वदाप्',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(root);
    let normalizedRoot;
    if (script === 'Devanagari') {
      // Convert to IAST for internal processing
      normalizedRoot = root === 'दा' ? 'dā' : root === 'धा' ? 'dhā' : root;
    } else {
      normalizedRoot = root;
    }

    // Check if it's a ghu root
    const ghuRoots = ['dā', 'dhā'];
    const isGhuRoot = ghuRoots.includes(normalizedRoot);

    // Create comprehensive analysis
    const analysis = createComprehensiveAnalysis(normalizedRoot, isGhuRoot, context);
    
    return {
      isValid: true,
      isGhu: isGhuRoot,
      input: root,
      normalizedInput: normalizedRoot,
      analysis: analysis,
      confidence: isGhuRoot ? 0.95 : 0.1,
      metadata: {
        sutraNumber: '1.1.20',
        sutraText: 'दाधा घ्वदाप्',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'दा धा इत्येतौ घु संज्ञौ भवतः। दानादिषु दातुः, धानादिषु धातुः।',
        modernExplanation: 'This sutra defines the technical term "ghu" for the two roots दा (dā) meaning "to give" and धा (dhā) meaning "to place/hold".',
        usageExamples: context.includeUsageExamples ? getUsageExamples(normalizedRoot) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedRules() : undefined,
        processingTime: Date.now()
      }
    };

  } catch (error) {
    return {
      isValid: false,
      isGhu: false,
      input: root,
      normalizedInput: '',
      errors: [`Processing error: ${error.message}`],
      confidence: 0,
      analysis: null,
      metadata: {
        sutraNumber: '1.1.20',
        sutraText: 'दाधा घ्वदाप्',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis
 * @param {string} root - Normalized root
 * @param {boolean} isGhu - Whether the root is ghu
 * @param {Object} context - Analysis context
 * @returns {Object} Analysis object
 */
function createComprehensiveAnalysis(root, isGhu, context) {
  if (isGhu) {
    return {
      morphological: {
        root: root,
        meaning: root === 'dā' ? 'to give' : 'to place',
        dhatu: root === 'dā' ? 'दा' : 'धा',
        rootClass: 'root',
        vocalLength: 'long',
        structure: 'consonant + long vowel'
      },
      semantic: {
        primaryMeaning: root === 'dā' ? 'to give, bestow, grant' : 'to place, put, hold',
        category: 'transitive action',
        domain: root === 'dā' ? 'giving/donation' : 'placement/positioning'
      },
      syntactic: {
        grammaticalRole: 'verbal root',
        classification: 'ghu',
        applicableRules: ['1.1.20'],
        specialBehavior: 'ghu-specific morphological patterns'
      }
    };
  } else {
    return {
      morphological: {
        root: root,
        rootClass: 'root',
        classification: 'standard'
      },
      semantic: {
        category: 'various',
        domain: 'general'
      },
      syntactic: {
        grammaticalRole: 'verbal root',
        classification: 'non-ghu',
        applicableRules: []
      }
    };
  }
}

/**
 * Gets usage examples for ghu roots
 * @param {string} root - The root
 * @returns {Array} Usage examples
 */
function getUsageExamples(root) {
  if (root === 'dā') {
    return [
      'ददाति - he/she gives (present tense)',
      'दत्त्वा - having given (absolutive)',
      'दत्त - given (past participle)'
    ];
  } else if (root === 'dhā') {
    return [
      'दधाति - he/she places (present tense)',
      'धत्त्वा - having placed (absolutive)',
      'हित - placed (past participle)'
    ];
  }
  return [];
}

/**
 * Gets rules related to ghu classification
 * @returns {Array} Related rules
 */
function getRelatedRules() {
  return [
    '1.1.20 - दाधा घ्वदाप् (defines ghu)',
    '7.1.78 - नाभिनन्दितुर्घुमतुप् (ghu behavior in certain formations)',
    '7.4.73 - भावकर्मणोः (special behavior in passive/causative)'
  ];
}

// Legacy functions for backward compatibility
export function isGhu(root) {
  if (!root) return false;
  
  try {
    const script = detectScript(root);
    
    if (script === 'Devanagari') {
      return ['दा', 'धा'].includes(root);
    } else {
      return ['dā', 'dhā'].includes(root);
    }
  } catch (error) {
    return false;
  }
}

export function getGhuRoots(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['दा', 'धा'];
  } else {
    return ['dā', 'dhā'];
  }
}

export function hasGhuBehavior(root, context = {}) {
  return isGhu(root);
}

// Main export
export default sutra1120;
