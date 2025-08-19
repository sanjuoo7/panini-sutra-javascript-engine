/**
 * Sutra 1.2.51: लुपि युक्तवद्व्यक्तिवचने
 * "When there is elision (lup), [the features behave] as if connected (yukta) in terms of gender and number expression"
 * 
 * This sutra establishes that when taddhita affixes undergo elision (लुप्), 
 * the morphological features (लिङ्ग, वचन, पुरुष) should be preserved and behave 
 * as if the elided affix were still present for agreement purposes.
 */

import { 
  detectScript, 
  validateSanskritWord, 
  normalizeScript,
  isVowel,
  isConsonant 
} from '../sanskrit-utils/index.js';

// Taddhita affixes that commonly undergo elision
const ELISION_PRONE_AFFIXES = {
  devanagari: ['अ', 'आ', 'इक', 'ईय', 'य', 'त', 'क', 'इन्', 'वत्', 'मत्'],
  iast: ['a', 'ā', 'ika', 'īya', 'ya', 'ta', 'ka', 'in', 'vat', 'mat']
};

// Morphological features that require preservation
const PRESERVABLE_FEATURES = {
  gender: ['masculine', 'feminine', 'neuter', 'पुंलिङ्ग', 'स्त्रीलिङ्ग', 'नपुंसकलिङ्ग'],
  number: ['singular', 'dual', 'plural', 'एकवचन', 'द्विवचन', 'बहुवचन'],
  person: ['first', 'second', 'third', 'उत्तम', 'मध्यम', 'प्रथम', 1, 2, 3],
  case: ['nominative', 'accusative', 'instrumental', 'dative', 'ablative', 'genitive', 'locative', 'vocative']
};

// Elision contexts where feature preservation applies
const ELISION_CONTEXTS = {
  taddhita: ['secondary_derivation', 'adjectival_formation', 'patronymic'],
  morphological: ['agreement_preservation', 'syntactic_features', 'semantic_features'],
  phonological: ['sandhi_driven', 'metrical_pressure', 'euphonic_deletion']
};

/**
 * Main comprehensive analysis function implementing Sutra 1.2.51
 * 
 * @param {string} baseForm - The base form after potential elision
 * @param {Object} originalFeatures - Features of the original form before elision
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Comprehensive analysis with feature preservation results
 */
export function sutra1251(baseForm, originalFeatures = {}, context = {}) {
  // Input validation and normalization
  if (!baseForm || typeof baseForm !== 'string') {
    return {
      applies: false,
      error: 'invalid_base_form',
      sutra: '1.2.51',
      analysis: {
        inputValidation: {
          error: 'Base form must be a non-empty string',
          providedType: typeof baseForm,
          traditionalNote: 'मूलशब्दस्य आवश्यकता (Base word requirement)'
        }
      }
    };
  }

  const script = detectScript(baseForm);
  const normalizedForm = normalizeScript(baseForm);

  // Extract context information  
  const {
    elisionType = null,
    affixElided = null,
    syntacticContext = null,
    agreementTargets = [],
    preservationRequired: contextPreservationRequired = false,
    validate_features = false,
    analysis_depth = 'comprehensive'
  } = context;

  // Initialize comprehensive analysis structure
  const analysis = {
    sutra: '1.2.51',
    sutraText: 'लुपि युक्तवद्व्यक्तिवचने',
    applies: false,
    
    // Input Analysis
    inputAnalysis: {
      baseForm: normalizedForm,
      script: script.toLowerCase(),
      hasOriginalFeatures: Object.keys(originalFeatures).length > 0,
      elisionContext: elisionType || 'unspecified',
      featuresCount: Object.keys(originalFeatures).length
    },

    // Input Validation
    inputValidation: {
      error: null,
      providedType: typeof baseForm,
      traditionalNote: 'मूलशब्दस्य आवश्यकता वर्णव्यक्तेः गुणधर्माणां संरक्षणार्थम्'
    },

    // Feature Analysis  
    featureAnalysis: {
      originalFeatures: { ...originalFeatures },
      preservableFeatures: {},
      nonPreservableFeatures: {},
      featureValidation: {},
      criticalFeatures: []
    },

    // Elision Analysis
    elisionAnalysis: {
      hasElisionContext: Boolean(elisionType),
      elisionType: elisionType,
      elisionTarget: affixElided,
      isValidElisionContext: false,
      elisionReasoning: ''
    },

    // Preservation Analysis
    preservationAnalysis: {
      shouldPreserve: false,
      preservationTargets: [],
      preservationMechanism: '',
      agreementImpact: '',
      yukta_behavior: false
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      contextual: 0.0,
      morphological: 0.0,
      traditional: 0.0,
      factors: []
    }
  };

  // Phase 1: Elision Context Validation
  const hasValidElisionContext = analyzeElisionContext(elisionType, affixElided, analysis);
  
  if (!hasValidElisionContext) {
    analysis.applies = false;
    analysis.elisionAnalysis.elisionReasoning = 'No clear elision indicators';
    analysis.elisionAnalysis.isValidElisionContext = false;
    analysis.confidence.overall = 0.1;
    analysis.confidence.contextual = 0.0;
    return { 
      applies: false,
      retainedFeatures: {}, 
      yukta_behavior: false,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 2: Feature Classification and Validation
  const featureClassification = classifyAndValidateFeatures(originalFeatures, analysis);
  
  if (!featureClassification.hasPreservableFeatures) {
    analysis.applies = false;
    analysis.preservationAnalysis.preservationMechanism = 'no_preservable_features';
    analysis.confidence.overall = 0.2;
    return { 
      applies: false,
      retainedFeatures: {}, 
      yukta_behavior: false,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Preservation Requirement Analysis
  const preservationRequired = analyzePreservationRequirement(
    baseForm, originalFeatures, context, analysis
  );

  if (preservationRequired.shouldPreserve) {
    analysis.applies = true;
    analysis.preservationAnalysis.shouldPreserve = true;
    analysis.preservationAnalysis.yukta_behavior = true;
    analysis.preservationAnalysis.preservationMechanism = preservationRequired.mechanism;
    
    // Calculate confidence
    calculateConfidence(analysis);
    
    // Prepare retained features
    const retainedFeatures = prepareRetainedFeatures(
      originalFeatures, preservationRequired.targets, analysis
    );
    
    return {
      applies: true,
      retainedFeatures: retainedFeatures,
      yukta_behavior: true,
      applied: true, // Legacy compatibility
      sutraApplied: '1.2.51',
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Feature preservation not required
  analysis.applies = false;
  analysis.confidence.overall = 0.3;
  analysis.preservationAnalysis.preservationMechanism = 'preservation_not_required';
  
  return {
    applies: false,
    retainedFeatures: {},
    yukta_behavior: false,
    applied: false,
    analysis: analysis,
    confidence: analysis.confidence
  };
}

/**
 * Analyzes the elision context to determine if sutra applies
 */
function analyzeElisionContext(elisionType, affixElided, analysis) {
  // Check for explicit elision indicators
  const explicitElisionTypes = ['lup', 'luk', 'taddhita_elision', 'affix_deletion'];
  const hasExplicitElision = explicitElisionTypes.includes(elisionType);
  
  // Check for affix-based evidence
  const hasElidedAffix = affixElided && 
    (ELISION_PRONE_AFFIXES.devanagari.includes(affixElided) ||
     ELISION_PRONE_AFFIXES.iast.includes(affixElided));
  
  analysis.elisionAnalysis.isValidElisionContext = hasExplicitElision || hasElidedAffix;
  analysis.elisionAnalysis.elisionReasoning = hasExplicitElision 
    ? `Explicit elision type: ${elisionType}`
    : hasElidedAffix 
      ? `Elision-prone affix detected: ${affixElided}`
      : 'No clear elision indicators';
      
  return analysis.elisionAnalysis.isValidElisionContext;
}

/**
 * Classifies and validates morphological features for preservation
 */
function classifyAndValidateFeatures(originalFeatures, analysis) {
  const preservable = {};
  const nonPreservable = {};
  const validation = {};
  const critical = [];

  for (const [feature, value] of Object.entries(originalFeatures)) {
    if (PRESERVABLE_FEATURES[feature]) {
      const isValidValue = PRESERVABLE_FEATURES[feature].includes(value);
      
      if (isValidValue) {
        preservable[feature] = value;
        validation[feature] = 'valid_preservable';
        
        // Mark critical features for agreement
        if (['gender', 'number', 'person'].includes(feature)) {
          critical.push(feature);
        }
      } else {
        nonPreservable[feature] = value;
        validation[feature] = 'invalid_value';
      }
    } else {
      nonPreservable[feature] = value;
      validation[feature] = 'non_preservable_feature';
    }
  }

  analysis.featureAnalysis.preservableFeatures = preservable;
  analysis.featureAnalysis.nonPreservableFeatures = nonPreservable;
  analysis.featureAnalysis.featureValidation = validation;
  analysis.featureAnalysis.criticalFeatures = critical;

  return {
    hasPreservableFeatures: Object.keys(preservable).length > 0,
    criticalFeatureCount: critical.length,
    preservableFeatures: preservable
  };
}

/**
 * Analyzes whether preservation is required in the given context
 */
function analyzePreservationRequirement(baseForm, originalFeatures, context, analysis) {
  const reasons = [];
  let shouldPreserve = false;
  let mechanism = '';
  const targets = [];

  // Check for agreement requirements
  if (context.agreementTargets && context.agreementTargets.length > 0) {
    shouldPreserve = true;
    reasons.push('agreement_targets_present');
    targets.push(...Object.keys(analysis.featureAnalysis.preservableFeatures));
    mechanism = 'syntactic_agreement_preservation';
  }

  // Check for explicit preservation requirement
  if (context.preservationRequired === true) {
    shouldPreserve = true;
    reasons.push('explicit_preservation_required');
    targets.push(...Object.keys(analysis.featureAnalysis.preservableFeatures));
    mechanism = 'explicit_requirement';
  }

  // Check for taddhita derivation context
  if (context.derivationType === 'taddhita' || context.elisionType === 'taddhita_elision') {
    shouldPreserve = true;
    reasons.push('taddhita_derivation_context');
    targets.push(...analysis.featureAnalysis.criticalFeatures);
    mechanism = 'taddhita_feature_preservation';
  }

  // Default preservation for critical features if elision is confirmed
  if (analysis.elisionAnalysis.isValidElisionContext && 
      analysis.featureAnalysis.criticalFeatures.length > 0) {
    shouldPreserve = true;
    reasons.push('critical_features_with_elision');
    targets.push(...analysis.featureAnalysis.criticalFeatures);
    mechanism = mechanism || 'default_critical_preservation';
  }

  analysis.preservationAnalysis.preservationTargets = [...new Set(targets)];

  return {
    shouldPreserve,
    mechanism,
    targets: [...new Set(targets)],
    reasons
  };
}

/**
 * Prepares the final retained features object
 */
function prepareRetainedFeatures(originalFeatures, targets, analysis) {
  const retained = {};
  
  for (const target of targets) {
    if (originalFeatures[target] !== undefined) {
      retained[target] = originalFeatures[target];
    }
  }

  // Add preservation metadata
  retained._preservation_method = 'sutra_1_2_51';
  retained._yukta_behavior = true;
  retained._elision_compensated = true;

  return retained;
}

/**
 * Calculates confidence scores across multiple dimensions
 */
function calculateConfidence(analysis) {
  let contextualScore = 0.0;
  let morphologicalScore = 0.0;
  let traditionalScore = 0.0;

  // Contextual confidence
  if (analysis.elisionAnalysis.isValidElisionContext) contextualScore += 0.4;
  if (analysis.elisionAnalysis.elisionType === 'lup') contextualScore += 0.3;
  if (analysis.preservationAnalysis.preservationTargets.length > 0) contextualScore += 0.3;

  // Morphological confidence
  const criticalCount = analysis.featureAnalysis.criticalFeatures.length;
  morphologicalScore = Math.min(1.0, criticalCount * 0.4);
  
  // Traditional confidence (high for well-established rule)
  traditionalScore = 0.95;

  analysis.confidence.contextual = contextualScore;
  analysis.confidence.morphological = morphologicalScore;
  analysis.confidence.traditional = traditionalScore;
  analysis.confidence.overall = (contextualScore + morphologicalScore + traditionalScore) / 3;

  analysis.confidence.factors = [
    'elision_context_validation',
    'critical_feature_analysis',
    'preservation_requirement_analysis',
    'traditional_sutra_authority'
  ];
}

// Legacy compatibility functions
export function applySutra1_2_51(baseForm, originalFeatures = {}, context = {}) {
  // Handle legacy parameter mapping
  const legacyContext = { ...context };
  if (context.taddhitaElisionType) {
    legacyContext.elisionType = context.taddhitaElisionType;
  }
  
  const result = sutra1251(baseForm, originalFeatures, legacyContext);
  
  // Return legacy format
  return {
    applied: result.applies,
    retainedFeatures: result.retainedFeatures || {},
    analysis: result.analysis,
    confidence: result.confidence
  };
}

// Additional analysis functions for educational/research use
export function analyzeFeaturePreservation(baseForm, originalFeatures, context = {}) {
  const result = sutra1251(baseForm, originalFeatures, { ...context, analysis_depth: 'detailed' });
  return {
    preservation_required: result.applies,
    retained_features: result.retainedFeatures || {},
    yukta_behavior: result.yukta_behavior,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

export function validateElisionContext(elisionType, affixElided) {
  // Direct boolean validation logic
  if (elisionType === 'lup' || elisionType === 'taddhita_elision') {
    return true;
  }
  
  const ELISION_PRONE_AFFIXES = ['क', 'त', 'न', 'अ', 'इ', 'य', 'व', 'ण', 'म'];
  if (affixElided && ELISION_PRONE_AFFIXES.includes(affixElided)) {
    return true;
  }
  
  return false;
}

export default sutra1251;
