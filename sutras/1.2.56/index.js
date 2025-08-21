/**
 * Sutra 1.2.56: प्रधानप्रत्ययार्थवचनमर्थस्यान्यप्रमाणत्वात्
 * Primary suffix meaning expression due to meaning having other authority
 * 
 * This sutra establishes that when a primary suffix (प्रधानप्रत्यय) has meaning expression
 * (अर्थवचन) but the meaning itself has other authority (अन्यप्रमाणत्व), then specific
 * non-elision rules apply. The sutra addresses cases where the morphological element
 * is authoritative for meaning expression but the semantic content derives authority
 * from other sources.
 * 
 * Traditional Commentary Integration:
 * The Kāśikā explains this principle as managing the authority distribution between
 * morphological form (suffix) and semantic content (meaning). When the primary suffix
 * is responsible for meaning expression but the actual meaning has independent authority,
 * the grammatical treatment must account for this dual authority structure.
 * 
 * Implementation: Comprehensive multi-phase analysis system
 * Phase 1: Input validation and context preparation
 * Phase 2: Primary suffix detection and classification
 * Phase 3: Authority source analysis and validation
 * Phase 4: Meaning expression assessment
 * Phase 5: Other authority evaluation
 * Phase 6: Non-elision determination and confidence scoring
 */

import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

// Constants for primary suffix authority analysis
const PRIMARY_SUFFIX_TYPES = {
  verbal: ['ति', 'न्ति', 'सि', 'थ', 'अ', 'उ', 'तु', 'न्तु', 'हि', 'त'],
  nominal: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ओ', 'अन्', 'मन्'],
  derivational: ['अक', 'ण', 'य', 'त', 'तव्य', 'अनीय', 'घञ्', 'ल्यु'],
  compound: ['तत्पुरुष', 'बहुव्रीहि', 'द्वन्द्व', 'अव्ययीभाव', 'कर्मधारय', 'द्विगु']
};

const AUTHORITY_SOURCES = {
  paninian: ['अष्टाध्यायी', 'पाणिनि', 'व्याकरण', 'सूत्र'],
  traditional: ['कोश', 'निरुक्त', 'व्युत्पत्ति', 'आगम'],
  contextual: ['प्रसंग', 'प्रयोग', 'व्यवहार', 'लोक'],
  semantic: ['अर्थ', 'भाव', 'तत्त्व', 'स्वरूप', 'अर्थशास्त्र'],
  morphological: ['रूप', 'प्रकृति', 'प्रत्यय', 'धातु']
};

const MEANING_EXPRESSION_TYPES = {
  direct_expression: 'प्रत्यक्षवचन',
  indirect_expression: 'परोक्षवचन',
  implied_expression: 'व्यंग्यवचन',
  contextual_expression: 'प्रासंगिकवचन',
  conventional_expression: 'रूढिवचन'
};

const OTHER_AUTHORITY_DEGREES = {
  complete_other: 'पूर्णान्यप्रमाण',
  substantial_other: 'प्रधानान्यप्रमाण',
  partial_other: 'आंशिकान्यप्रमाण',
  contextual_other: 'प्रासंगिकान्यप्रमाण',
  minimal_other: 'न्यूनान्यप्रमाण'
};

/**
 * Main sutra function: Analyzes primary suffix meaning expression with other authority
 * @param {string|Object} item - The linguistic item to analyze
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive analysis result
 */
export function sutra1256(item, context = {}) {
  // Phase 1: Input Validation and Context Preparation
  const analysis = {
    sutra: '1.2.56',
    sutrasāra: 'प्रधानप्रत्ययार्थवचनमर्थस्यान्यप्रमाणत्वात्',
    applies: false,
    item: item,
    nonElidable: false,
    logicalPresence: true,
    phoneticPresence: true,
    reasons: [],

    // Input Analysis
    inputAnalysis: {
      isValid: false,
      itemType: typeof item,
      hasContext: context && typeof context === 'object',
      contextProvided: false,
      script: 'unknown',
      inputComplexity: 'simple'
    },

    // Primary Suffix Analysis
    primarySuffixAnalysis: {
      hasPrimarySuffix: false,
      suffixType: null,
      suffixCategory: null,
      suffixIdentification: '',
      meaningExpression: false,
      expressionType: null,
      suffixAuthority: 0.0,
      suffixAuthorityReasoning: ''
    },

    // Authority Analysis
    authorityAnalysis: {
      hasAuthoritySource: false,
      primaryAuthoritySource: null,
      otherAuthorityPresent: false,
      otherAuthorityType: null,
      otherAuthorityStrength: 0.0,
      authorityConflict: false,
      authorityResolution: null,
      dualAuthorityManagement: ''
    },

    // Meaning Expression Analysis
    meaningExpressionAnalysis: {
      expressionPresent: false,
      expressionMechanism: null,
      expressionClarity: 0.0,
      expressionAuthority: null,
      meaningAuthoritySource: null,
      expressionValidation: false,
      semanticConsistency: true
    },

    // Other Authority Assessment
    otherAuthorityAnalysis: {
      otherAuthorityDetected: false,
      authorityDegree: 0.0,
      authorityType: null,
      sourceValidation: false,
      conflictResolution: null,
      priorityDetermination: '',
      authorityJustification: ''
    },

    // Non-elision Logic
    nonElisionAnalysis: {
      nonElisionRequired: false,
      elisionPrevention: false,
      formPreservation: true,
      logicalMaintenance: true,
      semanticIntegrity: true,
      nonElisionJustification: ''
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      primarySuffixDetection: 0.0,
      authorityValidation: 0.0,
      meaningExpressionAssessment: 0.0,
      otherAuthorityEvaluation: 0.0,
      nonElisionLogic: 0.0,
      traditional: 0.9, // High traditional confidence
      factors: []
    }
  };

  // Input validation
  if (item === null || item === undefined) {
    analysis.error = 'null_or_undefined_item';
    analysis.inputAnalysis.isValid = false;
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      error: 'null_or_undefined_item',
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  if (context && typeof context !== 'object') {
    analysis.error = 'invalid_context_type';
    analysis.inputAnalysis.isValid = false;
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      error: 'invalid_context_type',
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Set input analysis details
  analysis.inputAnalysis.isValid = true;
  analysis.inputAnalysis.contextProvided = context && Object.keys(context).length > 0;
  analysis.inputAnalysis.script = detectScript(typeof item === 'string' ? item : item.text || '');
  analysis.inputAnalysis.inputComplexity = determineInputComplexity(item, context);

  // Phase 2: Primary Suffix Detection and Classification
  const primarySuffixClassification = classifyPrimarySuffix(item, context, analysis);
  
  if (!primarySuffixClassification.hasPrimarySuffix) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'no_primary_suffix_detected';
    analysis.confidence.overall = 0.2;
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Authority Source Analysis and Validation
  const authorityValidation = validateAuthoritySource(item, context, analysis);

  if (!authorityValidation.hasValidAuthority) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'insufficient_authority_validation';
    analysis.confidence.overall = 0.3;
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 4: Meaning Expression Assessment
  const meaningExpressionAnalysis = assessMeaningExpression(item, context, analysis);

  if (!meaningExpressionAnalysis.expressionPresent) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'no_meaning_expression_detected';
    analysis.confidence.overall = 0.4;
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 5: Other Authority Evaluation
  const otherAuthorityEvaluation = evaluateOtherAuthority(item, context, analysis);

  if (!otherAuthorityEvaluation.otherAuthorityDetected) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'no_other_authority_detected';
    analysis.confidence.overall = 0.5;
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 6: Non-elision Determination and Confidence Scoring
  analysis.applies = true;
  analysis.nonElidable = true;
  analysis.logicalPresence = true;
  analysis.phoneticPresence = true; // Form preserved due to dual authority

  // Determine non-elision based on authority analysis
  const result = {
    applies: true,
    item: item,
    nonElidable: true,
    logicalPresence: true,
    phoneticPresence: true,
    reasons: [
      'primary-suffix-detected',
      'meaning-expression-confirmed',
      'other-authority-validated',
      'dual-authority-management-applied',
      'form-preservation-required'
    ],
    analysis: analysis
  };

  // Apply dual authority logic
  applyDualAuthorityLogic(result, analysis, context);

  // Calculate comprehensive confidence scores
  calculateConfidence(analysis);
  result.confidence = analysis.confidence;

  return result;
}

/**
 * Determines the complexity of the input for analysis planning
 */
function determineInputComplexity(item, context) {
  if (typeof item === 'string') {
    if (item.length > 10) return 'complex';
    if (item.length > 5) return 'moderate';
    return 'simple';
  }
  
  if (typeof item === 'object') {
    const propertyCount = Object.keys(item).length;
    if (propertyCount > 5) return 'complex';
    if (propertyCount > 2) return 'moderate';
    return 'simple';
  }
  
  return 'simple';
}

/**
 * Classifies primary suffix presence and characteristics
 */
function classifyPrimarySuffix(item, context, analysis) {
  let hasPrimarySuffix = false;
  let suffixType = null;
  let suffixCategory = null;
  let suffixIdentification = '';
  let meaningExpression = false;
  let expressionType = null;

  // Check for प्रधानप्रत्यय property (highest priority)
  if (typeof item === 'object' && item.प्रधानप्रत्यय) {
    hasPrimarySuffix = true;
    suffixType = 'explicit_pradhan_pratyaya';
    suffixIdentification = `Primary suffix: ${item.प्रधानप्रत्यय}`;
    meaningExpression = true;
    expressionType = MEANING_EXPRESSION_TYPES.direct_expression;
    
    // Classify suffix category
    for (const [category, suffixes] of Object.entries(PRIMARY_SUFFIX_TYPES)) {
      if (suffixes.includes(item.प्रधानप्रत्यय)) {
        suffixCategory = category;
        break;
      }
    }
  }

  // Check for प्रधानप्रत्यय property (highest priority)
  if (typeof item === 'object' && item.प्रधानप्रत्यय) {
    hasPrimarySuffix = true;
    suffixType = 'explicit_pradhan_pratyaya';
    suffixIdentification = `Primary suffix: ${item.प्रधानप्रत्यय}`;
    meaningExpression = true;
    expressionType = MEANING_EXPRESSION_TYPES.direct_expression;
    
    // Classify suffix category
    for (const [category, suffixes] of Object.entries(PRIMARY_SUFFIX_TYPES)) {
      if (suffixes.includes(item.प्रधानप्रत्यय)) {
        suffixCategory = category;
        break;
      }
    }
  }

  // Check explicit primary suffix flag
  else if (typeof item === 'object' && item.primarySuffix === true) {
    hasPrimarySuffix = true;
    suffixType = 'explicit_primary_suffix';
    suffixIdentification = 'Explicitly marked as having primary suffix';
    meaningExpression = true;
    expressionType = MEANING_EXPRESSION_TYPES.direct_expression;
  }

  // Check for isPrimarySuffix flag 
  else if (typeof item === 'object' && item.isPrimarySuffix === true) {
    // Check if semantic analysis should override
    const semanticAnalysis = analyzeSemanticPrimarySuffixProperties(item);
    if (semanticAnalysis.hasSuffix) {
      hasPrimarySuffix = true;
      suffixType = 'semantic_property_analysis';
      suffixCategory = semanticAnalysis.category;
      suffixIdentification = semanticAnalysis.identification;
      meaningExpression = semanticAnalysis.meaningExpression;
      expressionType = semanticAnalysis.expressionType;
    } else {
      hasPrimarySuffix = true;
      suffixType = 'explicit_primary_suffix';
      suffixIdentification = 'Explicitly marked as having primary suffix';
      meaningExpression = true;
      expressionType = MEANING_EXPRESSION_TYPES.direct_expression;
    }
  }

  // Check semantic properties for primary suffix indicators (when no explicit flags)
  if (!hasPrimarySuffix && typeof item === 'object') {
    const semanticAnalysis = analyzeSemanticPrimarySuffixProperties(item);
    if (semanticAnalysis.hasSuffix) {
      hasPrimarySuffix = true;
      suffixType = 'semantic_property_analysis';
      suffixCategory = semanticAnalysis.category;
      suffixIdentification = semanticAnalysis.identification;
      meaningExpression = semanticAnalysis.meaningExpression;
      expressionType = semanticAnalysis.expressionType;
    }
  }

  // Check context प्रधानप्रत्यय
  if (!hasPrimarySuffix && context.प्रधानप्रत्यय) {
    hasPrimarySuffix = true;
    suffixType = 'context_pradhan_pratyaya';
    suffixIdentification = `Context-provided primary suffix: ${context.प्रधानप्रत्यय}`;
    meaningExpression = true;
    expressionType = MEANING_EXPRESSION_TYPES.contextual_expression;
  }

  // Check string-based primary suffix pattern recognition
  if (!hasPrimarySuffix && typeof item === 'string') {
    const suffixAnalysis = analyzeStringForPrimarySuffix(item);
    if (suffixAnalysis.hasSuffix) {
      hasPrimarySuffix = true;
      suffixType = 'string_pattern_recognition';
      suffixCategory = suffixAnalysis.category;
      suffixIdentification = suffixAnalysis.identification;
      meaningExpression = suffixAnalysis.meaningExpression;
      expressionType = suffixAnalysis.expressionType;
    }
  }

  // Check for meaning expression property
  if (!meaningExpression && typeof item === 'object' && item.अर्थवचन === true) {
    meaningExpression = true;
    expressionType = MEANING_EXPRESSION_TYPES.explicit_expression;
  }

  // Update analysis
  analysis.primarySuffixAnalysis.hasPrimarySuffix = hasPrimarySuffix;
  analysis.primarySuffixAnalysis.suffixType = suffixType;
  analysis.primarySuffixAnalysis.suffixCategory = suffixCategory;
  analysis.primarySuffixAnalysis.suffixIdentification = suffixIdentification;
  analysis.primarySuffixAnalysis.meaningExpression = meaningExpression;
  analysis.primarySuffixAnalysis.expressionType = expressionType;

  return {
    hasPrimarySuffix: hasPrimarySuffix,
    suffixType: suffixType,
    category: suffixCategory,
    meaningExpression: meaningExpression
  };
}

/**
 * Analyzes string for primary suffix patterns
 */
function analyzeStringForPrimarySuffix(str) {
  // Common primary suffix patterns in Sanskrit
  const primarySuffixPatterns = [
    { pattern: /(ति|न्ति|सि|थ|तु|न्तु|हि|त)$/, category: 'verbal', confidence: 0.8 },
    { pattern: /(अक|ण|य|त्व|तव्य|अनीय|घञ्|ल्यु)$/, category: 'derivational', confidence: 0.75 },
    { pattern: /(अन्|मन्|वन्|इन्)$/, category: 'nominal', confidence: 0.7 },
    { pattern: /(प्रत्यय|प्रधान|मुख्य)/, category: 'morphological', confidence: 0.65 }
  ];

  for (const { pattern, category, confidence } of primarySuffixPatterns) {
    if (pattern.test(str)) {
      return {
        hasSuffix: true,
        category: category,
        confidence: confidence,
        identification: `Matches primary suffix pattern: ${pattern.source}`,
        meaningExpression: true,
        expressionType: MEANING_EXPRESSION_TYPES.direct_expression
      };
    }
  }

  // Check for compound primary suffix markers
  if (str.length > 8 && (str.includes('प्रधान') || str.includes('मुख्य'))) {
    return {
      hasSuffix: true,
      category: 'compound',
      confidence: 0.6,
      identification: 'Contains primary suffix indicators',
      meaningExpression: true,
      expressionType: MEANING_EXPRESSION_TYPES.indirect_expression
    };
  }

  return {
    hasSuffix: false,
    category: null,
    confidence: 0,
    identification: 'No primary suffix patterns detected',
    meaningExpression: false,
    expressionType: null
  };
}

/**
 * Analyzes semantic properties for primary suffix indicators
 */
function analyzeSemanticPrimarySuffixProperties(item) {
  // Check for morphological structure indicators
  if (item.structure || item.morphology || item.suffixStructure) {
    return {
      hasSuffix: true,
      category: 'morphological',
      identification: 'Has morphological/suffix structure properties',
      meaningExpression: true,
      expressionType: MEANING_EXPRESSION_TYPES.structural_expression
    };
  }

  const primarySuffixProperties = [
    'isPrimarySuffix', 'hasMainSuffix', 'primaryMorpheme', 'mainAffix',
    'coreEnding', 'principalSuffix', 'dominantAffix', 'keyEnding',
    'isPrimaryMeaningCarrier' // Legacy compatibility
  ];

  for (const prop of primarySuffixProperties) {
    if (item[prop] === true) {
      return {
        hasSuffix: true,
        category: 'semantic_property',
        identification: `Has primary suffix property: ${prop}`,
        meaningExpression: true,
        expressionType: MEANING_EXPRESSION_TYPES.property_expression
      };
    }
  }

  return {
    hasSuffix: false,
    category: null,
    identification: 'No semantic primary suffix properties detected',
    meaningExpression: false,
    expressionType: null
  };
}

/**
 * Validates the authority source for the primary suffix
 */
function validateAuthoritySource(item, context, analysis) {
  let hasValidAuthority = false;
  let primaryAuthoritySource = null;
  let authorityStrength = 0.0;
  let authorityEvidence = [];
  let authorityType = null;

  // Check for explicit authority basis
  if (context.authorityBasis || (typeof item === 'object' && item.authorityBasis)) {
    const authorityBasis = context.authorityBasis || item.authorityBasis;
    
    // Paninian authority (highest)
    if (AUTHORITY_SOURCES.paninian.includes(authorityBasis)) {
      hasValidAuthority = true;
      authorityStrength = 1.0;
      primaryAuthoritySource = authorityBasis;
      authorityEvidence.push(`paninian_authority: ${authorityBasis}`);
      authorityType = 'पाणिनीय_प्रमाण';
    }
    // Traditional authority
    else if (AUTHORITY_SOURCES.traditional.includes(authorityBasis)) {
      hasValidAuthority = true;
      authorityStrength = 0.9;
      primaryAuthoritySource = authorityBasis;
      authorityEvidence.push(`traditional_authority: ${authorityBasis}`);
      authorityType = 'परम्परा_प्रमाण';
    }
    // Semantic authority
    else if (AUTHORITY_SOURCES.semantic.includes(authorityBasis)) {
      hasValidAuthority = true;
      authorityStrength = 0.75;
      primaryAuthoritySource = authorityBasis;
      authorityEvidence.push(`semantic_authority: ${authorityBasis}`);
      authorityType = 'अर्थ_प्रमाण';
    }
    // Contextual authority
    else if (AUTHORITY_SOURCES.contextual.includes(authorityBasis)) {
      hasValidAuthority = true;
      authorityStrength = 0.7;
      primaryAuthoritySource = authorityBasis;
      authorityEvidence.push(`contextual_authority: ${authorityBasis}`);
      authorityType = 'प्रसंग_प्रमाण';
    }
    // Morphological authority
    else if (AUTHORITY_SOURCES.morphological.includes(authorityBasis)) {
      hasValidAuthority = true;
      authorityStrength = 0.65;
      primaryAuthoritySource = authorityBasis;
      authorityEvidence.push(`morphological_authority: ${authorityBasis}`);
      authorityType = 'रूप_प्रमाण';
    }
  }

  // Check for primary suffix construction validity
  if (!hasValidAuthority && analysis.primarySuffixAnalysis.suffixCategory) {
    hasValidAuthority = true;
    authorityStrength = 0.6;
    authorityEvidence.push(`suffix_categorical_authority: ${analysis.primarySuffixAnalysis.suffixCategory}`);
    authorityType = 'प्रत्यय_प्रमाण';
  }

  // Default authority for explicit primary suffix constructions
  if (!hasValidAuthority && analysis.primarySuffixAnalysis.suffixType === 'explicit_primary_suffix') {
    hasValidAuthority = true;
    authorityStrength = 0.55;
    authorityEvidence.push('explicit_primary_suffix_declaration');
    authorityType = 'स्पष्ट_प्रत्यय_प्रमाण';
  }

  // Update analysis
  analysis.authorityAnalysis.hasAuthoritySource = hasValidAuthority;
  analysis.authorityAnalysis.primaryAuthoritySource = primaryAuthoritySource;
  analysis.authorityAnalysis.authorityStrength = authorityStrength;
  analysis.authorityAnalysis.authorityEvidence = authorityEvidence;
  analysis.authorityAnalysis.authorityType = authorityType;

  return {
    hasValidAuthority: hasValidAuthority,
    authorityStrength: authorityStrength,
    authorityType: authorityType
  };
}

/**
 * Assesses meaning expression capabilities and mechanisms
 */
function assessMeaningExpression(item, context, analysis) {
  let expressionPresent = false;
  let expressionMechanism = null;
  let expressionClarity = 0.0;
  let expressionAuthority = null;
  let meaningAuthoritySource = null;
  let expressionValidation = false;

  // Check for explicit meaning expression flag
  if (context.अर्थवचन === true || (typeof item === 'object' && item.अर्थवचन === true)) {
    expressionPresent = true;
    expressionMechanism = 'explicit_meaning_expression_flag';
    expressionClarity = 1.0;
    expressionValidation = true;
  }

  // Check for meaning expression type
  if (!expressionPresent && context.meaningExpression) {
    expressionPresent = true;
    expressionMechanism = 'context_meaning_expression';
    expressionClarity = 0.9;
    expressionValidation = true;
    
    // Validate expression type
    for (const [key, value] of Object.entries(MEANING_EXPRESSION_TYPES)) {
      if (context.meaningExpression === value || context.meaningExpression === key) {
        expressionAuthority = value;
        break;
      }
    }
  }

  // Check for semantic properties indicating meaning expression
  if (!expressionPresent && typeof item === 'object') {
    const semanticExpressionProperties = [
      'conveysМeaning', 'semanticRole', 'meaningBearing', 'semanticFunction',
      'expressiveCapacity', 'meaningGeneration', 'semanticContribution'
    ];

    for (const prop of semanticExpressionProperties) {
      if (item[prop] === true) {
        expressionPresent = true;
        expressionMechanism = 'semantic_property_expression';
        expressionClarity = 0.75;
        expressionValidation = true;
        break;
      }
    }
  }

  // Check for meaning authority source
  if (context.meaningAuthoritySource) {
    meaningAuthoritySource = context.meaningAuthoritySource;
  } else if (typeof item === 'object' && item.meaningAuthoritySource) {
    meaningAuthoritySource = item.meaningAuthoritySource;
  }

  // Default expression for detected primary suffixes
  if (!expressionPresent && analysis.primarySuffixAnalysis.hasPrimarySuffix) {
    expressionPresent = true;
    expressionMechanism = 'primary_suffix_inherent_expression';
    expressionClarity = 0.7;
    expressionValidation = true;
    expressionAuthority = MEANING_EXPRESSION_TYPES.morphological_expression;
  }

  // Update analysis
  analysis.meaningExpressionAnalysis.expressionPresent = expressionPresent;
  analysis.meaningExpressionAnalysis.expressionMechanism = expressionMechanism;
  analysis.meaningExpressionAnalysis.expressionClarity = expressionClarity;
  analysis.meaningExpressionAnalysis.expressionAuthority = expressionAuthority;
  analysis.meaningExpressionAnalysis.meaningAuthoritySource = meaningAuthoritySource;
  analysis.meaningExpressionAnalysis.expressionValidation = expressionValidation;

  return {
    expressionPresent: expressionPresent,
    expressionClarity: expressionClarity,
    expressionValidation: expressionValidation
  };
}

/**
 * Evaluates other authority presence and characteristics
 */
function evaluateOtherAuthority(item, context, analysis) {
  let otherAuthorityDetected = false;
  let authorityDegree = 0.0;
  let authorityType = null;
  let sourceValidation = false;
  let conflictResolution = null;
  let priorityDetermination = '';

  // Check for explicit other authority flag
  // Check for other authority source specification (takes precedence over explicit flag)
  if (context.otherAuthoritySource || (typeof item === 'object' && item.otherAuthoritySource)) {
    otherAuthorityDetected = true;
    authorityDegree = 0.9;
    authorityType = OTHER_AUTHORITY_DEGREES.substantial_other;
    sourceValidation = true;
    const source = context.otherAuthoritySource || item.otherAuthoritySource;
    priorityDetermination = `Other authority source: ${source}`;
  }
  // Check for explicit other authority declaration
  else if (context.अन्यप्रमाण === true || (typeof item === 'object' && item.अन्यप्रमाण === true)) {
    otherAuthorityDetected = true;
    authorityDegree = 1.0;
    authorityType = OTHER_AUTHORITY_DEGREES.complete_other;
    sourceValidation = true;
    priorityDetermination = 'Explicit other authority declaration';
  }

  // Check for semantic other authority
  if (!otherAuthorityDetected && (context.semanticOtherAuthority === true || (typeof item === 'object' && item.semanticOtherAuthority === true))) {
    otherAuthorityDetected = true;
    authorityDegree = 0.8;
    authorityType = OTHER_AUTHORITY_DEGREES.partial_other;
    sourceValidation = true;
    priorityDetermination = 'Semantic other authority detected';
  }

  // Check for contextual other authority
  if (!otherAuthorityDetected && (context.contextualOtherAuthority === true || (typeof item === 'object' && item.contextualOtherAuthority === true))) {
    otherAuthorityDetected = true;
    authorityDegree = 0.7;
    authorityType = OTHER_AUTHORITY_DEGREES.contextual_other;
    sourceValidation = true;
    priorityDetermination = 'Contextual other authority present';
  }

  // Check for legacy primary meaning carrier (implicit other authority)
  if (!otherAuthorityDetected && typeof item === 'object' && item.isPrimaryMeaningCarrier === true) {
    otherAuthorityDetected = true;
    authorityDegree = 0.6;
    authorityType = OTHER_AUTHORITY_DEGREES.minimal_other;
    sourceValidation = true;
    priorityDetermination = 'Legacy primary meaning carrier implies other authority';
  }

  // Check for authority conflict indicators
  if (otherAuthorityDetected && analysis.authorityAnalysis.hasAuthoritySource) {
    analysis.authorityAnalysis.authorityConflict = true;
    conflictResolution = 'dual_authority_management_required';
    analysis.authorityAnalysis.dualAuthorityManagement = 'Suffix authority for expression, other authority for meaning';
  }

  // Update analysis
  analysis.otherAuthorityAnalysis.otherAuthorityDetected = otherAuthorityDetected;
  analysis.otherAuthorityAnalysis.authorityDegree = authorityDegree;
  analysis.otherAuthorityAnalysis.authorityType = authorityType;
  analysis.otherAuthorityAnalysis.sourceValidation = sourceValidation;
  analysis.otherAuthorityAnalysis.conflictResolution = conflictResolution;
  analysis.otherAuthorityAnalysis.priorityDetermination = priorityDetermination;

  return {
    otherAuthorityDetected: otherAuthorityDetected,
    authorityDegree: authorityDegree,
    sourceValidation: sourceValidation
  };
}

/**
 * Applies dual authority logic for non-elision determination
 */
function applyDualAuthorityLogic(result, analysis, context) {
  // When both suffix authority and other authority are present,
  // form preservation is typically required
  
  const suffixAuthority = analysis.authorityAnalysis.authorityStrength;
  const otherAuthority = analysis.otherAuthorityAnalysis.authorityDegree;
  
  if (suffixAuthority >= 0.8 && otherAuthority >= 0.8) {
    result.nonElidable = true;
    result.phoneticPresence = true;
    result.reasons.push('high-dual-authority-requires-preservation');
    analysis.nonElisionAnalysis.nonElisionRequired = true;
    analysis.nonElisionAnalysis.elisionPrevention = true;
  } else if (suffixAuthority >= 0.6 && otherAuthority >= 0.6) {
    result.nonElidable = true;
    result.phoneticPresence = true;
    result.reasons.push('moderate-dual-authority-supports-preservation');
    analysis.nonElisionAnalysis.nonElisionRequired = true;
  } else {
    result.reasons.push('low-dual-authority-partial-preservation');
    analysis.nonElisionAnalysis.formPreservation = context.forcePreservation !== false;
  }

  // Context-specific adjustments
  if (context.forceElision === true) {
    result.phoneticPresence = false;
    result.reasons.push('context-forced-elision-override');
    analysis.nonElisionAnalysis.elisionPrevention = false;
  }

  analysis.nonElisionAnalysis.nonElisionJustification = 
    `Dual authority management: suffix (${suffixAuthority.toFixed(2)}) + other (${otherAuthority.toFixed(2)})`;
}

/**
 * Calculates confidence scores for the analysis
 */
function calculateConfidence(analysis) {
  let overall = 0.0;
  let primarySuffixDetection = 0.0;
  let authorityValidation = 0.0;
  let meaningExpressionAssessment = 0.0;
  let otherAuthorityEvaluation = 0.0;
  let nonElisionLogic = 0.0;
  let traditional = 0.9; // High traditional confidence for well-established sutra
  
  const factors = [];

  // Primary suffix detection confidence
  if (analysis.primarySuffixAnalysis.hasPrimarySuffix) {
    switch (analysis.primarySuffixAnalysis.suffixType) {
      case 'explicit_primary_suffix':
        primarySuffixDetection = 0.95;
        factors.push('explicit_primary_suffix_high_confidence');
        break;
      case 'explicit_pradhan_pratyaya':
        primarySuffixDetection = 0.9;
        factors.push('explicit_pradhan_pratyaya_high_confidence');
        break;
      case 'context_pradhan_pratyaya':
        primarySuffixDetection = 0.8;
        factors.push('context_pradhan_pratyaya_good_confidence');
        break;
      case 'string_pattern_recognition':
        primarySuffixDetection = 0.6;
        factors.push('string_pattern_moderate_confidence');
        break;
      case 'semantic_property_analysis':
        primarySuffixDetection = 0.65;
        factors.push('semantic_property_moderate_confidence');
        break;
      default:
        primarySuffixDetection = 0.5;
        factors.push('primary_suffix_detection_uncertain');
    }
  } else {
    primarySuffixDetection = 0.1;
    factors.push('no_primary_suffix_detected');
  }

  // Authority validation confidence
  authorityValidation = analysis.authorityAnalysis.authorityStrength;
  if (authorityValidation >= 0.8) {
    factors.push('high_authority_validation');
  } else if (authorityValidation >= 0.6) {
    factors.push('moderate_authority_validation');
  } else if (authorityValidation > 0) {
    factors.push('low_authority_validation');
  } else {
    factors.push('no_authority_validation');
  }

  // Meaning expression assessment confidence
  meaningExpressionAssessment = analysis.meaningExpressionAnalysis.expressionClarity;
  if (meaningExpressionAssessment >= 0.8) {
    factors.push('high_meaning_expression_confidence');
  } else if (meaningExpressionAssessment >= 0.6) {
    factors.push('moderate_meaning_expression_confidence');
  } else if (meaningExpressionAssessment > 0) {
    factors.push('low_meaning_expression_confidence');
  } else {
    factors.push('no_meaning_expression_detected');
  }

  // Other authority evaluation confidence
  otherAuthorityEvaluation = analysis.otherAuthorityAnalysis.authorityDegree;
  if (otherAuthorityEvaluation >= 0.8) {
    factors.push('high_other_authority_confidence');
  } else if (otherAuthorityEvaluation >= 0.6) {
    factors.push('moderate_other_authority_confidence');
  } else if (otherAuthorityEvaluation > 0) {
    factors.push('low_other_authority_confidence');
  } else {
    factors.push('no_other_authority_detected');
  }

  // Non-elision logic confidence
  if (analysis.nonElisionAnalysis.nonElisionRequired) {
    nonElisionLogic = 0.85;
    factors.push('non_elision_logic_applied');
  } else {
    nonElisionLogic = 0.7;
    factors.push('conditional_non_elision');
  }

  // Calculate overall confidence with dual authority weighting
  if (authorityValidation < 0.6 || otherAuthorityEvaluation < 0.6) {
    // When either authority is low, reduce overall confidence significantly  
    overall = (primarySuffixDetection * 0.05 + authorityValidation * 0.2 + 
              meaningExpressionAssessment * 0.1 + otherAuthorityEvaluation * 0.2 + 
              nonElisionLogic * 0.025 + traditional * 0.025);
  } else if (analysis.primarySuffixAnalysis.suffixType === 'string_pattern_recognition') {
    // Reduce confidence for pattern recognition even with high authority
    overall = (primarySuffixDetection * 0.35 + authorityValidation * 0.15 + 
              meaningExpressionAssessment * 0.1 + otherAuthorityEvaluation * 0.15 + 
              nonElisionLogic * 0.02 + traditional * 0.03);
  } else {
    // Normal weighting for adequate dual authority
    overall = (primarySuffixDetection * 0.2 + authorityValidation * 0.25 + 
              meaningExpressionAssessment * 0.2 + otherAuthorityEvaluation * 0.25 + 
              nonElisionLogic * 0.05 + traditional * 0.05);
  }

  // Update analysis
  analysis.confidence.overall = overall;
  analysis.confidence.primarySuffixDetection = primarySuffixDetection;
  analysis.confidence.authorityValidation = authorityValidation;
  analysis.confidence.meaningExpressionAssessment = meaningExpressionAssessment;
  analysis.confidence.otherAuthorityEvaluation = otherAuthorityEvaluation;
  analysis.confidence.nonElisionLogic = nonElisionLogic;
  analysis.confidence.traditional = traditional;
  analysis.confidence.factors = factors;
}

// Legacy compatibility functions
export function applySutra1_2_56(item, context = {}) {
  const result = sutra1256(item, context);
  
  // Map to legacy format with utility integration
  const utilityResult = classifyAshishya(item, { 
    ...context, 
    ashishyaFlags: { s1_2_56: true } 
  });
  
  return {
    sutra: '1.2.56',
    applied: result.applies,
    nonElidable: result.nonElidable,
    logicalPresence: result.logicalPresence,
    phoneticPresence: result.phoneticPresence,
    reasons: result.reasons || utilityResult.reasons,
    sutrasApplied: utilityResult.sutrasApplied,
    explanation: utilityResult.explanation,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

// Additional analysis functions for educational/research use  
export function analyzePrimarySuffixAuthority(item, context = {}) {
  const result = sutra1256(item, { ...context, analysis_depth: 'detailed' });
  return {
    has_primary_suffix: result.applies,
    suffix_type: result.analysis.primarySuffixAnalysis.suffixType || 'unknown',
    meaning_expression: result.analysis.meaningExpressionAnalysis.expressionMechanism || 'none',
    other_authority: result.analysis.otherAuthorityAnalysis.authorityType || 'none',
    dual_authority_management: result.analysis.authorityAnalysis.dualAuthorityManagement || 'not_applicable',
    analysis: result.analysis,
    confidence: result.confidence
  };
}

export function assessMeaningExpressionMechanism(item, context = {}) {
  const result = sutra1256(item, { ...context, focus: 'meaning_expression' });
  return {
    expression_present: result.analysis.meaningExpressionAnalysis.expressionPresent,
    expression_mechanism: result.analysis.meaningExpressionAnalysis.expressionMechanism || 'none',
    expression_clarity: result.analysis.meaningExpressionAnalysis.expressionClarity,
    authority_source: result.analysis.meaningExpressionAnalysis.meaningAuthoritySource || 'unknown',
    semantic_analysis: result.analysis.meaningExpressionAnalysis
  };
}

export default applySutra1_2_56;
