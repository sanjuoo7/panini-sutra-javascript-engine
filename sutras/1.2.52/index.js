/**
 * Sutra 1.2.52: विशेषणानां चाजातेः
 * viśeṣaṇānāṃ cājāteḥ
 * 
 * "And of adjectives, irrespective of jāti (natural class)"
 * 
 * This sutra extends the yukta-vad behavior of 1.2.51 to qualifying adjectives.
 * When a noun has undergone elision and retains its features (per 1.2.51), 
 * any adjectives qualifying that noun also inherit those retained features
 * for proper grammatical agreement, regardless of the adjective's natural class.
 * 
 * Key Principles:
 * 1. Extension of 1.2.51: Builds upon feature retention under elision
 * 2. Adjective Agreement: Ensures qualifiers agree with retained features
 * 3. Jāti Independence: Works irrespective of adjective's natural classification
 * 4. Selective Inheritance: Only fills missing features, preserves explicit ones
 * 
 * Traditional Commentary:
 * - Kāśikā: विशेषणानि अजातेः प्रकृत्युदात्तत्वेन गुणधर्माणि अनुवर्तन्ते
 * - Meaning: Adjectives inherit feature qualities irrespective of their inherent class
 */

import { 
  detectScript
} from '../sanskrit-utils/script-detection.js';

import { 
  propagateRetentionToQualifier 
} from '../sanskrit-utils/elision-retention.js';

// Valid adjective categories and parts of speech
const ADJECTIVE_CATEGORIES = [
  'adjective', 'adj', 'विशेषण', 'qualifier', 'attributive'
];

const VALID_POS_VALUES = [
  'adj', 'adjective', 'विशेषण', 'attributive', 'qualifier',
  'pronoun_adj', 'pronominal_adjective', 'numeral_adj'
];

// Features that can be inherited from nouns to adjectives
const INHERITABLE_FEATURES = {
  gender: ['masculine', 'feminine', 'neuter', 'पुंलिङ्ग', 'स्त्रीलिङ्ग', 'नपुंसकलिङ्ग'],
  number: ['singular', 'dual', 'plural', 'एकवचन', 'द्विवचन', 'बहुवचन'],
  person: ['first', 'second', 'third', 'प्रथम', 'मध्यम', 'उत्तम', '1', '2', '3'],
  case: ['nominative', 'accusative', 'instrumental', 'dative', 'ablative', 'genitive', 'locative', 'vocative',
         'प्रथमा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी', 'षष्ठी', 'सप्तमी', 'सम्बोधन']
};

/**
 * Main function implementing Sutra 1.2.52
 * विशेषणानां चाजातेः - Extension of yukta-vad behavior to adjectives
 */
export function sutra1252(adjective, retentionResult, context = {}) {
  // Phase 1: Input Validation and Analysis
  const inputValidation = validateInput(adjective, retentionResult, context);
  if (!inputValidation.isValid) {
    return {
      applies: false,
      error: inputValidation.error,
      adjective: adjective,
      retainedFeatures: {},
      qualifierAgreement: {},
      analysis: {
        inputValidation: inputValidation,
        traditionalNote: 'विशेषणस्य आवश्यकता गुणधर्मसङ्गत्यर्थम्'
      }
    };
  }

  const script = detectScript(adjective);
  const normalizedForm = adjective.trim(); // Simple normalization

  // Initialize comprehensive analysis structure
  const analysis = {
    sutra: '1.2.52',
    sutraText: 'विशेषणानां चाजातेः',
    applies: false,
    
    // Input Analysis
    inputAnalysis: {
      adjective: normalizedForm,
      script: script.toLowerCase(),
      hasRetentionResult: Boolean(retentionResult && retentionResult.applied),
      contextProvided: Object.keys(context).length > 0,
      adjectiveLength: adjective.length
    },

    // Input Validation
    inputValidation: inputValidation,

    // Adjective Analysis
    adjectiveAnalysis: {
      isValidAdjective: false,
      adjectiveCategory: null,
      posDetection: null,
      categoryReasoning: '',
      jatiIndependence: true // Key principle of this sutra
    },

    // Retention Analysis  
    retentionAnalysis: {
      hasValidRetention: false,
      retentionSource: null,
      availableFeatures: {},
      retentionMechanism: '',
      priorSutraApplication: null
    },

    // Agreement Analysis
    agreementAnalysis: {
      inheritanceRequired: false,
      featureGaps: [],
      explicitFeatures: {},
      inheritedFeatures: {},
      agreementMechanism: ''
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      adjectiveDetection: 0.0,
      retentionValidation: 0.0,
      agreementLogic: 0.0,
      traditional: 0.0,
      factors: []
    }
  };

  // Phase 2: Adjective Classification and Validation
  const adjectiveClassification = classifyAdjective(adjective, context, analysis);
  
  if (!adjectiveClassification.isValidAdjective) {
    analysis.applies = false;
    analysis.agreementAnalysis.agreementMechanism = 'not_an_adjective';
    analysis.confidence.overall = 0.1;
    return {
      applies: false,
      adjective: adjective,
      retainedFeatures: {},
      qualifierAgreement: {},
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Retention Result Validation  
  const retentionValidation = validateRetentionResult(retentionResult, analysis);
  
  if (!retentionValidation.hasValidRetention) {
    analysis.applies = false;
    analysis.agreementAnalysis.agreementMechanism = 'no_valid_retention_data';
    analysis.confidence.overall = 0.2;
    return {
      applies: false,
      adjective: adjective,
      retainedFeatures: {},
      qualifierAgreement: {},
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 4: Feature Inheritance Analysis
  const inheritanceAnalysis = analyzeFeatureInheritance(
    context.features || {}, retentionResult, analysis
  );

  if (!inheritanceAnalysis.requiresInheritance) {
    analysis.applies = true; // Sutra applies but no changes needed
    analysis.agreementAnalysis.agreementMechanism = 'no_inheritance_required';
    analysis.confidence.overall = 0.8;
    return {
      applies: true,
      adjective: adjective,
      retainedFeatures: retentionResult.retainedFeatures || {},
      qualifierAgreement: context.features || {},
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 5: Apply Inheritance and Calculate Final Agreement
  const finalAgreement = applyFeatureInheritance(
    context.features || {}, retentionResult, inheritanceAnalysis, analysis
  );

  // Calculate confidence
  calculateConfidence(analysis);

  analysis.applies = true;
  analysis.agreementAnalysis.agreementMechanism = 'ajati_feature_inheritance';

  return {
    applies: true,
    adjective: adjective,
    retainedFeatures: retentionResult.retainedFeatures || {},
    qualifierAgreement: finalAgreement,
    analysis: analysis,
    confidence: analysis.confidence,
    // Legacy compatibility
    applied: true,
    sutraApplied: '1.2.52'
  };
}

/**
 * Validates input parameters for the sutra
 */
function validateInput(adjective, retentionResult, context) {
  const validation = {
    isValid: true,
    error: null,
    providedType: typeof adjective,
    traditionalNote: 'विशेषणस्य आवश्यकता गुणधर्मसङ्गत्यर्थम्'
  };

  // Validate adjective parameter
  if (typeof adjective !== 'string') {
    validation.isValid = false;
    validation.error = 'invalid_adjective_type';
    validation.details = `Adjective must be a string, received ${typeof adjective}`;
    return validation;
  }

  if (!adjective.trim()) {
    validation.isValid = false;
    validation.error = 'empty_adjective';
    validation.details = 'Adjective cannot be empty or whitespace only';
    return validation;
  }

  // Validate retention result parameter
  if (!retentionResult) {
    validation.isValid = false;
    validation.error = 'missing_retention_result';
    validation.details = 'Retention result from prior sutra application required';
    return validation;
  }

  if (typeof retentionResult !== 'object') {
    validation.isValid = false;
    validation.error = 'invalid_retention_result_type';
    validation.details = 'Retention result must be an object';
    return validation;
  }

  return validation;
}

/**
 * Classifies whether the input is a valid adjective
 */
function classifyAdjective(adjective, context, analysis) {
  let isValidAdjective = false;
  let adjectiveCategory = null;
  let categoryReasoning = '';
  let posDetection = null;

  // Check explicit POS declaration
  if (context.pos) {
    posDetection = context.pos.toLowerCase();
    isValidAdjective = VALID_POS_VALUES.includes(posDetection);
    if (isValidAdjective) {
      adjectiveCategory = 'explicit_pos_declaration';
      categoryReasoning = `Explicitly declared as: ${context.pos}`;
    } else {
      categoryReasoning = `Invalid POS value: ${context.pos}`;
    }
  }

  // Check isAdjective flag
  if (!isValidAdjective && context.isAdjective === true) {
    isValidAdjective = true;
    adjectiveCategory = 'explicit_adjective_flag';
    categoryReasoning = 'Explicitly marked as adjective via isAdjective flag';
  }

  // Check semantic category
  if (!isValidAdjective && context.semanticCategory) {
    const semCat = context.semanticCategory.toLowerCase();
    isValidAdjective = ADJECTIVE_CATEGORIES.includes(semCat);
    if (isValidAdjective) {
      adjectiveCategory = 'semantic_category';
      categoryReasoning = `Semantic category: ${context.semanticCategory}`;
    }
  }

  // Morphological analysis (basic heuristics)
  if (!isValidAdjective) {
    const adjHeuristics = analyzeAdjectiveMorphology(adjective);
    if (adjHeuristics.likelyAdjective) {
      isValidAdjective = true;
      adjectiveCategory = 'morphological_heuristics';
      categoryReasoning = adjHeuristics.reasoning;
    } else {
      categoryReasoning = 'No clear adjective indicators found';
    }
  }

  // Update analysis
  analysis.adjectiveAnalysis.isValidAdjective = isValidAdjective;
  analysis.adjectiveAnalysis.adjectiveCategory = adjectiveCategory;
  analysis.adjectiveAnalysis.posDetection = posDetection;
  analysis.adjectiveAnalysis.categoryReasoning = categoryReasoning;

  return {
    isValidAdjective: isValidAdjective,
    category: adjectiveCategory,
    reasoning: categoryReasoning
  };
}

/**
 * Basic morphological analysis to detect adjectives
 */
function analyzeAdjectiveMorphology(adjective) {
  // Common adjective endings in Sanskrit
  const adjectiveEndings = [
    'वत्', 'मत्', 'वान्', 'मान्', 'त', 'न', 'य', 'ष्य', 'तम', 'तर',
    'ीय', 'अन्त्', 'एण', 'इन्', 'उक', 'अक', 'क', 'ल'
  ];

  const commonAdjectivePatterns = [
    /.*वत्$/, /.*मत्$/, /.*वान्$/, /.*मान्$/, 
    /.*त$/, /.*न$/, /.*य$/, /.*तम$/, /.*तर$/
  ];

  let likelyAdjective = false;
  let reasoning = '';

  // Check for common endings
  for (const ending of adjectiveEndings) {
    if (adjective.endsWith(ending)) {
      likelyAdjective = true;
      reasoning = `Contains adjective ending: ${ending}`;
      break;
    }
  }

  // Check for patterns
  if (!likelyAdjective) {
    for (const pattern of commonAdjectivePatterns) {
      if (pattern.test(adjective)) {
        likelyAdjective = true;
        reasoning = `Matches adjective pattern: ${pattern.source}`;
        break;
      }
    }
  }

  // Length-based heuristic (most single-word adjectives are 3-10 characters)
  if (!likelyAdjective && adjective.length >= 3 && adjective.length <= 10) {
    // This is a weak indicator, only used as fallback
    likelyAdjective = false; // Keep as false for strict validation
    reasoning = 'Length compatible but no clear morphological indicators';
  }

  return {
    likelyAdjective: likelyAdjective,
    reasoning: reasoning || 'No adjective morphological patterns detected'
  };
}

/**
 * Validates the retention result from prior sutra application
 */
function validateRetentionResult(retentionResult, analysis) {
  let hasValidRetention = false;
  let retentionSource = null;
  let availableFeatures = {};
  let retentionMechanism = '';
  let priorSutraApplication = null;

  // Check if retention result indicates successful application
  if (retentionResult.applied === true || retentionResult.applies === true) {
    hasValidRetention = true;
    retentionMechanism = 'prior_sutra_application';
    
    // Identify the source sutra
    if (retentionResult.sutra) {
      priorSutraApplication = retentionResult.sutra;
      retentionSource = `Sutra ${retentionResult.sutra}`;
    } else if (retentionResult.sutraApplied) {
      priorSutraApplication = retentionResult.sutraApplied;
      retentionSource = `Sutra ${retentionResult.sutraApplied}`;
    } else {
      retentionSource = 'Unknown sutra application';
    }

    // Extract available features
    if (retentionResult.retainedFeatures) {
      availableFeatures = { ...retentionResult.retainedFeatures };
    } else if (retentionResult.qualifierAgreement) {
      availableFeatures = { ...retentionResult.qualifierAgreement };
    }
  } else {
    retentionMechanism = 'no_prior_application';
  }

  // Update analysis
  analysis.retentionAnalysis.hasValidRetention = hasValidRetention;
  analysis.retentionAnalysis.retentionSource = retentionSource;
  analysis.retentionAnalysis.availableFeatures = availableFeatures;
  analysis.retentionAnalysis.retentionMechanism = retentionMechanism;
  analysis.retentionAnalysis.priorSutraApplication = priorSutraApplication;

  return {
    hasValidRetention: hasValidRetention,
    availableFeatures: availableFeatures,
    retentionSource: retentionSource
  };
}

/**
 * Analyzes what features need to be inherited
 */
function analyzeFeatureInheritance(adjectiveFeatures, retentionResult, analysis) {
  const featureGaps = [];
  const explicitFeatures = {};
  const inheritableFeatures = {};
  const availableFeatures = retentionResult.retainedFeatures || {};

  // Identify explicitly specified adjective features
  for (const [feature, value] of Object.entries(adjectiveFeatures)) {
    if (INHERITABLE_FEATURES[feature] && value != null && value !== '') {
      explicitFeatures[feature] = value;
    }
  }

  // Identify inheritable features from retention result
  for (const [feature, value] of Object.entries(availableFeatures)) {
    if (INHERITABLE_FEATURES[feature] && value != null && value !== '') {
      inheritableFeatures[feature] = value;
    }
  }

  // Identify feature gaps (missing in adjective but available from retention)
  for (const [feature, value] of Object.entries(inheritableFeatures)) {
    if (!explicitFeatures[feature]) {
      featureGaps.push(feature);
    }
  }

  const requiresInheritance = featureGaps.length > 0;

  // Update analysis
  analysis.agreementAnalysis.inheritanceRequired = requiresInheritance;
  analysis.agreementAnalysis.featureGaps = featureGaps;
  analysis.agreementAnalysis.explicitFeatures = explicitFeatures;
  analysis.agreementAnalysis.inheritedFeatures = inheritableFeatures;

  return {
    requiresInheritance: requiresInheritance,
    featureGaps: featureGaps,
    explicitFeatures: explicitFeatures,
    inheritableFeatures: inheritableFeatures
  };
}

/**
 * Applies feature inheritance to create final agreement
 */
function applyFeatureInheritance(adjectiveFeatures, retentionResult, inheritanceAnalysis, analysis) {
  const finalAgreement = { ...adjectiveFeatures };
  const inheritedFeatures = {};

  // Inherit missing features
  const availableFeatures = retentionResult.retainedFeatures || {};
  
  for (const feature of inheritanceAnalysis.featureGaps) {
    if (availableFeatures[feature] != null) {
      finalAgreement[feature] = availableFeatures[feature];
      inheritedFeatures[feature] = availableFeatures[feature];
    }
  }

  // Add metadata about inheritance
  finalAgreement._inherited_features = inheritedFeatures;
  finalAgreement._inheritance_source = retentionResult.sutra || retentionResult.sutraApplied || 'unknown';
  finalAgreement._ajati_application = true; // Marker for jāti-independent application

  // Update analysis
  analysis.agreementAnalysis.inheritedFeatures = inheritedFeatures;

  return finalAgreement;
}

/**
 * Calculates confidence scores for the analysis
 */
function calculateConfidence(analysis) {
  let overall = 0.0;
  let adjectiveDetection = 0.0;
  let retentionValidation = 0.0;
  let agreementLogic = 0.0;
  let traditional = 0.9; // High traditional confidence for well-established sutra
  
  const factors = [];

  // Adjective detection confidence
  if (analysis.adjectiveAnalysis.isValidAdjective) {
    switch (analysis.adjectiveAnalysis.adjectiveCategory) {
      case 'explicit_pos_declaration':
        adjectiveDetection = 0.95;
        factors.push('explicit_pos_high_confidence');
        break;
      case 'explicit_adjective_flag':
        adjectiveDetection = 0.9;
        factors.push('explicit_flag_high_confidence');
        break;
      case 'semantic_category':
        adjectiveDetection = 0.8;
        factors.push('semantic_category_good_confidence');
        break;
      case 'morphological_heuristics':
        adjectiveDetection = 0.6;
        factors.push('morphological_patterns_moderate_confidence');
        break;
      default:
        adjectiveDetection = 0.5;
        factors.push('adjective_detection_uncertain');
    }
  } else {
    adjectiveDetection = 0.1;
    factors.push('adjective_detection_failed');
  }

  // Retention validation confidence
  if (analysis.retentionAnalysis.hasValidRetention) {
    retentionValidation = 0.9;
    factors.push('valid_retention_data');
    
    if (analysis.retentionAnalysis.priorSutraApplication === '1.2.51') {
      retentionValidation = 0.95;
      factors.push('ideal_1_2_51_source');
    }
  } else {
    retentionValidation = 0.0;
    factors.push('no_retention_data');
  }

  // Agreement logic confidence
  if (analysis.agreementAnalysis.inheritanceRequired) {
    agreementLogic = 0.85;
    factors.push('inheritance_applied');
  } else {
    agreementLogic = 0.8;
    factors.push('no_inheritance_needed');
  }

  // Calculate overall confidence
  overall = (adjectiveDetection * 0.3 + retentionValidation * 0.3 + agreementLogic * 0.2 + traditional * 0.2);

  // Update analysis
  analysis.confidence.overall = overall;
  analysis.confidence.adjectiveDetection = adjectiveDetection;
  analysis.confidence.retentionValidation = retentionValidation;
  analysis.confidence.agreementLogic = agreementLogic;
  analysis.confidence.traditional = traditional;
  analysis.confidence.factors = factors;
}

// Legacy compatibility functions
export function applySutra1_2_52(qualifier, retentionResult, context = {}) {
  const result = sutra1252(qualifier, retentionResult, context);
  
  // Map to legacy format
  return {
    applied: result.applies,
    qualifierAgreement: result.qualifierAgreement,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

// Additional analysis functions for educational/research use  
export function analyzeAdjectiveAgreement(adjective, retentionResult, context = {}) {
  const result = sutra1252(adjective, retentionResult, { ...context, analysis_depth: 'detailed' });
  return {
    agreement_required: result.applies,
    inherited_features: result.qualifierAgreement._inherited_features || {},
    ajati_behavior: result.qualifierAgreement._ajati_application || false,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

export function validateAdjectiveClassification(adjective, context = {}) {
  // Standalone function to check if something is classified as an adjective
  const dummyAnalysis = {
    adjectiveAnalysis: {
      isValidAdjective: false,
      adjectiveCategory: null,
      posDetection: null,
      categoryReasoning: '',
      jatiIndependence: true
    }
  };
  
  const classification = classifyAdjective(adjective, context, dummyAnalysis);
  return {
    is_adjective: classification.isValidAdjective,
    classification_method: classification.category,
    reasoning: classification.reasoning
  };
}

export default sutra1252;
