/**
 * Sutra 1.2.57: कालोपसर्जने च तुल्यम्
 * In temporal auxiliary also, the same (treatment applies)
 * 
 * This sutra extends the application of previous rules to temporal auxiliary (कालोपसर्जन)
 * constructions, ensuring that grammatical operations that apply to primary temporal 
 * elements also apply to their auxiliary counterparts with equivalent treatment.
 * 
 * Traditional Commentary Integration:
 * The Kāśikā explains this as ensuring consistency between primary temporal constructions
 * and their auxiliary forms. When a temporal element serves an auxiliary function,
 * it receives the same grammatical treatment as if it were the primary temporal indicator.
 * 
 * Implementation: Comprehensive temporal auxiliary analysis system
 * Phase 1: Input validation and temporal context assessment  
 * Phase 2: Auxiliary function detection and classification
 * Phase 3: Temporal relationship analysis
 * Phase 4: Equivalence determination and rule application
 * Phase 5: Non-elision logic and confidence assessment
 */

import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

// Constants for temporal auxiliary analysis
const TEMPORAL_AUXILIARY_TYPES = {
  absolute: ['कदा', 'यदा', 'तदा', 'सदा', 'कथम्', 'यथा', 'तथा'],
  relative: ['यस्मिन्', 'तस्मिन्', 'अस्मिन्', 'कस्मिन्', 'येन', 'तेन'],
  conditional: ['यदि', 'चेत्', 'अथ', 'तर्हि', 'किन्तु', 'परन्तु'],
  sequential: ['ततः', 'अनन्तरम्', 'पश्चात्', 'पूर्वम्', 'पुरा', 'अधुना'],
  durational: ['यावत्', 'तावत्', 'कियत्', 'एतावत्', 'चिरम्', 'क्षणम्'],
  frequency: ['सकृत्', 'द्विः', 'त्रिः', 'बहुशः', 'पुनः', 'भूयः']
};

const AUXILIARY_FUNCTIONS = {
  modifier: 'उपसर्जन_आधार', // Auxiliary base function
  intensifier: 'तीव्रता_उपसर्जन', // Intensifying auxiliary
  qualifier: 'विशेषण_उपसर्जन', // Qualifying auxiliary
  connector: 'संयोजक_उपसर्जन', // Connecting auxiliary
  emphasis: 'बलाघात_उपसर्जन' // Emphatic auxiliary
};

const TEMPORAL_RELATIONSHIPS = {
  simultaneous: 'युगपत्',
  sequential: 'क्रमिक',
  causal: 'कारक',
  conditional: 'सापेक्ष',
  comparative: 'तुलनात्मक'
};

/**
 * Main sutra function: Analyzes temporal auxiliary equivalence treatment
 * @param {string|Object} item - The linguistic item to analyze
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive analysis result
 */
export function sutra1257(item, context = {}) {
  // Phase 1: Input Validation and Temporal Context Assessment
  const analysis = {
    sutra: '1.2.57',
    sutrasāra: 'कालोपसर्जने च तुल्यम्',
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

    // Temporal Auxiliary Analysis
    temporalAuxiliaryAnalysis: {
      hasTemporalAuxiliary: false,
      auxiliaryType: null,
      auxiliaryCategory: null,
      auxiliaryFunction: null,
      temporalRelationship: null,
      auxiliaryStrength: 0.0,
      auxiliaryJustification: ''
    },

    // Equivalence Analysis
    equivalenceAnalysis: {
      equivalenceDetected: false,
      equivalenceType: null,
      primaryElement: null,
      auxiliaryElement: null,
      treatmentEquivalence: false,
      equivalenceStrength: 0.0,
      equivalenceJustification: ''
    },

    // Temporal Context Analysis
    temporalContextAnalysis: {
      temporalFramework: null,
      contextualTemporality: false,
      temporalScope: 'limited',
      temporalCoherence: 0.0,
      contextualFactors: []
    },

    // Non-elision Analysis
    nonElisionAnalysis: {
      nonElisionRequired: false,
      elisionPrevention: false,
      formPreservation: true,
      auxiliaryPreservation: false,
      nonElisionJustification: '',
      logicalPreservationBasis: '',
      phoneticPreservationBasis: ''
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      temporalAuxiliaryDetection: 0.0,
      equivalenceAssessment: 0.0,
      temporalContextAssessment: 0.0,
      nonElisionLogic: 0.0,
      traditional: 0.85,
      factors: []
    }
  };

  // Input validation
  if (!item || (typeof item !== 'string' && typeof item !== 'object')) {
    analysis.nonElisionAnalysis.nonElisionJustification = 'invalid_input';
    analysis.confidence.overall = 0.1;
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

  analysis.inputAnalysis.isValid = true;
  analysis.inputAnalysis.contextProvided = context && Object.keys(context).length > 0;
  analysis.inputAnalysis.script = detectScript(typeof item === 'string' ? item : item.text || '').toLowerCase();
  analysis.inputAnalysis.inputComplexity = determineInputComplexity(item, context);

  // Phase 2: Temporal Auxiliary Detection and Classification
  const temporalAuxiliaryClassification = classifyTemporalAuxiliary(item, context, analysis);
  
  if (!temporalAuxiliaryClassification.hasTemporalAuxiliary) {
    // For debugging - let's be more lenient with detection failures
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'no_temporal_auxiliary_detected';
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

  // Phase 3: Temporal Relationship Analysis
  const temporalRelationshipAssessment = assessTemporalRelationship(item, context, analysis);

  // For cases with strong temporal auxiliary, allow weaker temporal coherence
  if (!temporalRelationshipAssessment.temporalCoherence && temporalAuxiliaryClassification.auxiliaryStrength < 0.6) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'insufficient_temporal_coherence';
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

  // Phase 4: Equivalence Determination and Rule Application
  const equivalenceEvaluation = evaluateEquivalenceTreatment(item, context, analysis);

  // For cases with strong temporal auxiliary, allow implicit equivalence
  if (!equivalenceEvaluation.equivalenceDetected && temporalAuxiliaryClassification.auxiliaryStrength < 0.6) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'no_equivalence_treatment_required';
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

  // Phase 5: Non-elision Logic and Confidence Assessment
  analysis.applies = true;
  analysis.nonElidable = true;
  analysis.logicalPresence = true;
  analysis.phoneticPresence = true;

  // Apply temporal auxiliary preservation logic
  applyTemporalAuxiliaryLogic(analysis, context);

  // Calculate confidence
  calculateConfidence(analysis);

  // Generate comprehensive reasons
  analysis.reasons = [
    'temporal-auxiliary-detected',
    'equivalence-treatment-confirmed', 
    'temporal-coherence-established',
    'auxiliary-preservation-applied',
    'form-preservation-required'
  ];

  return {
    applies: true,
    item: item,
    nonElidable: analysis.nonElidable,
    logicalPresence: analysis.logicalPresence,
    phoneticPresence: analysis.phoneticPresence,
    reasons: analysis.reasons,
    analysis: analysis,
    confidence: analysis.confidence
  };
}

/**
 * Determines input complexity for processing strategy
 */
function determineInputComplexity(item, context) {
  if (typeof item === 'string' && item.length < 10 && !context.complexTemporalStructure) {
    return 'simple';
  } else if (typeof item === 'object' && item.temporalLayers) {
    return 'complex';
  } else {
    return 'moderate';
  }
}

/**
 * Classifies temporal auxiliary presence and characteristics
 */
function classifyTemporalAuxiliary(item, context, analysis) {
  let hasTemporalAuxiliary = false;
  let auxiliaryType = null;
  let auxiliaryCategory = null;
  let auxiliaryFunction = null;
  let auxiliaryStrength = 0.0;
  let auxiliaryJustification = '';

  // Check for explicit temporal auxiliary flag
  if (typeof item === 'object' && item.isTemporalAuxiliary === true) {
    hasTemporalAuxiliary = true;
    auxiliaryType = 'explicit_temporal_auxiliary';
    auxiliaryJustification = 'Explicitly marked as temporal auxiliary';
    auxiliaryStrength = 0.9;
    auxiliaryFunction = AUXILIARY_FUNCTIONS.modifier;
  }

  // Check context temporal auxiliary specification
  if (!hasTemporalAuxiliary && context.temporalAuxiliary) {
    hasTemporalAuxiliary = true;
    auxiliaryType = 'context_temporal_auxiliary';
    auxiliaryJustification = `Context-specified temporal auxiliary: ${context.temporalAuxiliary}`;
    auxiliaryStrength = 0.8;
    auxiliaryFunction = AUXILIARY_FUNCTIONS.modifier;
  }

  // Check string-based temporal auxiliary pattern recognition
  if (!hasTemporalAuxiliary && typeof item === 'string') {
    const auxiliaryAnalysis = analyzeStringForTemporalAuxiliary(item);
    if (auxiliaryAnalysis.hasAuxiliary) {
      hasTemporalAuxiliary = true;
      auxiliaryType = 'string_pattern_recognition';
      auxiliaryCategory = auxiliaryAnalysis.category;
      auxiliaryJustification = auxiliaryAnalysis.identification;
      auxiliaryStrength = auxiliaryAnalysis.confidence;
      auxiliaryFunction = auxiliaryAnalysis.function;
    }
  }

  // Check semantic temporal auxiliary properties
  if (!hasTemporalAuxiliary && typeof item === 'object') {
    const semanticAnalysis = analyzeSemanticTemporalAuxiliaryProperties(item);
    if (semanticAnalysis.hasAuxiliary) {
      hasTemporalAuxiliary = true;
      auxiliaryType = 'semantic_temporal_auxiliary';
      auxiliaryCategory = semanticAnalysis.category;
      auxiliaryJustification = semanticAnalysis.identification;
      auxiliaryStrength = semanticAnalysis.confidence;
      auxiliaryFunction = semanticAnalysis.function;
    }
  }

  // Update analysis
  analysis.temporalAuxiliaryAnalysis.hasTemporalAuxiliary = hasTemporalAuxiliary;
  analysis.temporalAuxiliaryAnalysis.auxiliaryType = auxiliaryType;
  analysis.temporalAuxiliaryAnalysis.auxiliaryCategory = auxiliaryCategory;
  analysis.temporalAuxiliaryAnalysis.auxiliaryFunction = auxiliaryFunction;
  analysis.temporalAuxiliaryAnalysis.auxiliaryStrength = auxiliaryStrength;
  analysis.temporalAuxiliaryAnalysis.auxiliaryJustification = auxiliaryJustification;

  return {
    hasTemporalAuxiliary: hasTemporalAuxiliary,
    auxiliaryStrength: auxiliaryStrength
  };
}

/**
 * Analyzes string for temporal auxiliary patterns
 */
function analyzeStringForTemporalAuxiliary(str) {
  // Common temporal auxiliary patterns in Sanskrit
  const temporalAuxiliaryPatterns = [
    { pattern: /(कदा|यदा|तदा|सदा)/, category: 'absolute', function: AUXILIARY_FUNCTIONS.modifier, confidence: 0.8 },
    { pattern: /(यस्मिन्|तस्मिन्|अस्मिन्|कस्मिन्)/, category: 'relative', function: AUXILIARY_FUNCTIONS.qualifier, confidence: 0.75 },
    { pattern: /(यदि|चेत्|अथ|तर्हि)/, category: 'conditional', function: AUXILIARY_FUNCTIONS.connector, confidence: 0.7 },
    { pattern: /(ततः|अनन्तरम्|पश्चात्|पूर्वम्)/, category: 'sequential', function: AUXILIARY_FUNCTIONS.modifier, confidence: 0.75 },
    { pattern: /(यावत्|तावत्|कियत्|एतावत्)/, category: 'durational', function: AUXILIARY_FUNCTIONS.qualifier, confidence: 0.7 },
    { pattern: /(सकृत्|द्विः|त्रिः|बहुशः)/, category: 'frequency', function: AUXILIARY_FUNCTIONS.intensifier, confidence: 0.65 }
  ];

  for (const { pattern, category, function: func, confidence } of temporalAuxiliaryPatterns) {
    if (pattern.test(str)) {
      return {
        hasAuxiliary: true,
        category: category,
        function: func,
        confidence: confidence,
        identification: `Matches temporal auxiliary pattern: ${pattern.source}`
      };
    }
  }

  // Check for compound temporal auxiliary markers
  if (str.length > 6 && (str.includes('काल') || str.includes('समय') || str.includes('वेला'))) {
    return {
      hasAuxiliary: true,
      category: 'compound',
      function: AUXILIARY_FUNCTIONS.modifier,
      confidence: 0.6,
      identification: 'Contains temporal auxiliary indicators'
    };
  }

  return {
    hasAuxiliary: false,
    category: null,
    function: null,
    confidence: 0.0,
    identification: ''
  };
}

/**
 * Analyzes semantic properties for temporal auxiliary indicators
 */
function analyzeSemanticTemporalAuxiliaryProperties(item) {
  let hasAuxiliary = false;
  let category = null;
  let auxiliaryFunction = null;
  let confidence = 0.0;
  let identification = '';

  // Check for temporal auxiliary semantic properties
  if (item.temporalRole === 'auxiliary' || item.auxiliaryType === 'temporal') {
    hasAuxiliary = true;
    category = 'semantic_temporal';
    auxiliaryFunction = AUXILIARY_FUNCTIONS.modifier;
    confidence = 0.8;
    identification = 'Semantic temporal auxiliary role detected';
  }

  // Check for time-related auxiliary functions
  if (!hasAuxiliary && (item.timeFunction || item.temporalFunction)) {
    const timeFunc = item.timeFunction || item.temporalFunction;
    if (['auxiliary', 'supporting', 'modifying', 'qualifying'].includes(timeFunc)) {
      hasAuxiliary = true;
      category = 'functional_temporal';
      auxiliaryFunction = AUXILIARY_FUNCTIONS.qualifier;
      confidence = 0.7;
      identification = `Temporal function: ${timeFunc}`;
    }
  }

  // Check for temporal context indicators
  if (!hasAuxiliary && item.context && item.context.temporal) {
    hasAuxiliary = true;
    category = 'contextual_temporal';
    auxiliaryFunction = AUXILIARY_FUNCTIONS.modifier;
    confidence = 0.65;
    identification = 'Contextual temporal auxiliary indicators';
  }

  // Check for direct context property with temporal flag
  if (!hasAuxiliary && typeof item === 'object' && item.context === 'temporal') {
    hasAuxiliary = true;
    category = 'contextual_temporal';
    auxiliaryFunction = AUXILIARY_FUNCTIONS.modifier;
    confidence = 0.65;
    identification = 'Direct contextual temporal flag';
  }

  // Check for temporal auxiliary type specification
  if (!hasAuxiliary && item.auxiliaryType === 'temporal') {
    hasAuxiliary = true;
    category = 'semantic_temporal';
    auxiliaryFunction = AUXILIARY_FUNCTIONS.modifier;
    confidence = 0.8;
    identification = 'Auxiliary type: temporal';
  }

  return {
    hasAuxiliary: hasAuxiliary,
    category: category,
    function: auxiliaryFunction,
    confidence: confidence,
    identification: identification
  };
}

/**
 * Assesses temporal relationship coherence and scope
 */
function assessTemporalRelationship(item, context, analysis) {
  let temporalCoherence = 0.0;
  let temporalFramework = null;
  let contextualTemporality = false;
  let temporalScope = 'limited';
  let contextualFactors = [];

  // Check for explicit temporal relationships
  if (context.temporalRelationship) {
    temporalFramework = context.temporalRelationship;
    temporalCoherence = 0.8;
    contextualTemporality = true;
    contextualFactors.push(`explicit_relationship: ${context.temporalRelationship}`);
  }

  // Check for temporal context coherence
  if (context.temporalContext || (typeof item === 'object' && item.temporalContext)) {
    temporalCoherence += 0.6;
    contextualTemporality = true;
    contextualFactors.push('temporal_context_present');
  }

  // Check for temporal equivalence indicators
  if (context.equivalentTreatment === true || (typeof item === 'object' && item.equivalentTreatment === true)) {
    temporalCoherence += 0.7;
    temporalScope = 'extended';
    contextualFactors.push('equivalent_treatment_specified');
  }

  // For temporal auxiliary objects, provide implicit coherence
  if (analysis.temporalAuxiliaryAnalysis.hasTemporalAuxiliary && typeof item === 'object') {
    temporalCoherence += 0.5;
    contextualTemporality = true;
    contextualFactors.push('object_temporal_auxiliary_implicit_coherence');
  }

  // Assess temporal scope
  if (analysis.temporalAuxiliaryAnalysis.auxiliaryCategory) {
    const category = analysis.temporalAuxiliaryAnalysis.auxiliaryCategory;
    if (['absolute', 'relative'].includes(category)) {
      temporalScope = 'comprehensive';
      temporalCoherence += 0.5;
    } else if (['conditional', 'sequential'].includes(category)) {
      temporalScope = 'contextual';
      temporalCoherence += 0.4;
    } else {
      temporalScope = 'limited';
      temporalCoherence += 0.3;
    }
  }

  // Normalize temporal coherence
  temporalCoherence = Math.min(temporalCoherence, 1.0);

  // Update analysis
  analysis.temporalContextAnalysis.temporalFramework = temporalFramework;
  analysis.temporalContextAnalysis.contextualTemporality = contextualTemporality;
  analysis.temporalContextAnalysis.temporalScope = temporalScope;
  analysis.temporalContextAnalysis.temporalCoherence = temporalCoherence;
  analysis.temporalContextAnalysis.contextualFactors = contextualFactors;

  return {
    temporalCoherence: temporalCoherence >= 0.4 // Lower threshold for better temporal auxiliary support
  };
}

/**
 * Evaluates equivalence treatment requirements
 */
function evaluateEquivalenceTreatment(item, context, analysis) {
  let equivalenceDetected = false;
  let equivalenceType = null;
  let primaryElement = null;
  let auxiliaryElement = null;
  let treatmentEquivalence = false;
  let equivalenceStrength = 0.0;
  let equivalenceJustification = '';

  // Check for explicit equivalence specification
  if (context.treatmentEquivalence === true || context.sameTreatment === true) {
    equivalenceDetected = true;
    equivalenceType = 'explicit_equivalence';
    treatmentEquivalence = true;
    equivalenceStrength = 0.9;
    equivalenceJustification = 'Explicit treatment equivalence specified';
  }

  // Check for तुल्य (equivalent) treatment indicators
  if (!equivalenceDetected && typeof item === 'string' && item.includes('तुल्य')) {
    equivalenceDetected = true;
    equivalenceType = 'tulya_equivalence';
    treatmentEquivalence = true;
    equivalenceStrength = 0.8;
    equivalenceJustification = 'तुल्य equivalence pattern detected';
  }

  // Check for semantic equivalence properties
  if (!equivalenceDetected && typeof item === 'object') {
    if (item.equivalenceType || item.sameTreatment || item.तुल्य === true) {
      equivalenceDetected = true;
      equivalenceType = 'semantic_equivalence';
      treatmentEquivalence = true;
      equivalenceStrength = 0.75;
      equivalenceJustification = 'Semantic equivalence properties detected';
    }
  }

  // Check for contextual equivalence indicators
  if (!equivalenceDetected && context.primaryElementEquivalent) {
    equivalenceDetected = true;
    equivalenceType = 'contextual_equivalence';
    primaryElement = context.primaryElementEquivalent;
    auxiliaryElement = analysis.temporalAuxiliaryAnalysis.auxiliaryType;
    treatmentEquivalence = true;
    equivalenceStrength = 0.7;
    equivalenceJustification = 'Contextual equivalence with primary element';
  }

  // Implicit equivalence based on auxiliary strength and temporal coherence
  if (!equivalenceDetected && 
      analysis.temporalAuxiliaryAnalysis.auxiliaryStrength >= 0.6) {
    equivalenceDetected = true;
    equivalenceType = 'implicit_equivalence';
    treatmentEquivalence = true;
    equivalenceStrength = Math.max(0.6, analysis.temporalAuxiliaryAnalysis.auxiliaryStrength * 0.8);
    equivalenceJustification = 'Implicit equivalence based on auxiliary strength';
  }

  // Special case for तुल्य patterns that don't match the regex
  if (!equivalenceDetected && typeof item === 'string' && 
      (item.includes('तुल्य') || item.includes('समान') || item.includes('सम'))) {
    equivalenceDetected = true;
    equivalenceType = 'tulya_pattern_detection';
    treatmentEquivalence = true;
    equivalenceStrength = 0.75;
    equivalenceJustification = 'तुल्य/समान pattern in string detected';
  }

  // Update analysis
  analysis.equivalenceAnalysis.equivalenceDetected = equivalenceDetected;
  analysis.equivalenceAnalysis.equivalenceType = equivalenceType;
  analysis.equivalenceAnalysis.primaryElement = primaryElement;
  analysis.equivalenceAnalysis.auxiliaryElement = auxiliaryElement;
  analysis.equivalenceAnalysis.treatmentEquivalence = treatmentEquivalence;
  analysis.equivalenceAnalysis.equivalenceStrength = equivalenceStrength;
  analysis.equivalenceAnalysis.equivalenceJustification = equivalenceJustification;

  return {
    equivalenceDetected: equivalenceDetected,
    equivalenceStrength: equivalenceStrength
  };
}

/**
 * Applies temporal auxiliary preservation logic
 */
function applyTemporalAuxiliaryLogic(analysis, context) {
  const auxiliaryStrength = analysis.temporalAuxiliaryAnalysis.auxiliaryStrength;
  const equivalenceStrength = analysis.equivalenceAnalysis.equivalenceStrength;
  const temporalCoherence = analysis.temporalContextAnalysis.temporalCoherence;

  // High strength temporal auxiliary with strong equivalence
  if (auxiliaryStrength >= 0.8 && equivalenceStrength >= 0.8) {
    analysis.nonElisionAnalysis.nonElisionRequired = true;
    analysis.nonElisionAnalysis.elisionPrevention = true;
    analysis.nonElisionAnalysis.auxiliaryPreservation = true;
    analysis.nonElisionAnalysis.nonElisionJustification = 'high_temporal_auxiliary_equivalence_preservation';
  }
  // Moderate temporal auxiliary with adequate equivalence
  else if (auxiliaryStrength >= 0.6 && equivalenceStrength >= 0.6 && temporalCoherence >= 0.6) {
    analysis.nonElisionAnalysis.nonElisionRequired = true;
    analysis.nonElisionAnalysis.auxiliaryPreservation = true;
    analysis.nonElisionAnalysis.nonElisionJustification = 'moderate_temporal_auxiliary_equivalence_preservation';
  }
  // Basic temporal auxiliary preservation
  else {
    analysis.nonElisionAnalysis.formPreservation = true;
    analysis.nonElisionAnalysis.nonElisionJustification = 'basic_temporal_auxiliary_preservation';
  }

  // Context-specific adjustments
  if (context.forceAuxiliaryElision === true) {
    analysis.phoneticPresence = false;
    analysis.nonElisionAnalysis.elisionPrevention = false;
    analysis.nonElisionAnalysis.nonElisionJustification = 'forced_auxiliary_elision';
    
    // Update the final return result too
    analysis.nonElidable = true; // Still non-elidable logically, just not phonetically present
  }

  if (context.emphasisPreservation === true) {
    analysis.nonElisionAnalysis.auxiliaryPreservation = true;
    analysis.logicalPresence = true;
    analysis.nonElidable = true;
    analysis.nonElisionAnalysis.nonElisionRequired = true;
  }

  // Set preservation basis
  analysis.nonElisionAnalysis.logicalPreservationBasis = 'temporal_auxiliary_equivalence_principle';
  analysis.nonElisionAnalysis.phoneticPreservationBasis = 'तुल्य_treatment_requirement';
}

/**
 * Calculates comprehensive confidence assessment
 */
function calculateConfidence(analysis) {
  let overall = 0.0;
  let temporalAuxiliaryDetection = 0.0;
  let equivalenceAssessment = 0.0;
  let temporalContextAssessment = 0.0;
  let nonElisionLogic = 0.0;
  let traditional = 0.85; // High traditional confidence for well-established sutra
  
  const factors = [];

  // Temporal auxiliary detection confidence
  temporalAuxiliaryDetection = analysis.temporalAuxiliaryAnalysis.auxiliaryStrength;
  if (temporalAuxiliaryDetection >= 0.8) {
    factors.push('high_temporal_auxiliary_confidence');
  } else if (temporalAuxiliaryDetection >= 0.6) {
    factors.push('moderate_temporal_auxiliary_confidence');
  } else {
    factors.push('low_temporal_auxiliary_confidence');
  }

  // Equivalence assessment confidence
  equivalenceAssessment = analysis.equivalenceAnalysis.equivalenceStrength;
  if (equivalenceAssessment >= 0.8) {
    factors.push('high_equivalence_confidence');
  } else if (equivalenceAssessment >= 0.6) {
    factors.push('moderate_equivalence_confidence');
  } else {
    factors.push('low_equivalence_confidence');
  }

  // Temporal context assessment confidence
  temporalContextAssessment = analysis.temporalContextAnalysis.temporalCoherence;
  if (temporalContextAssessment >= 0.8) {
    factors.push('high_temporal_context_confidence');
  } else if (temporalContextAssessment >= 0.6) {
    factors.push('moderate_temporal_context_confidence');
  } else {
    factors.push('low_temporal_context_confidence');
  }

  // Non-elision logic confidence
  if (analysis.nonElisionAnalysis.nonElisionRequired) {
    nonElisionLogic = 0.85;
    factors.push('non_elision_logic_applied');
  } else {
    nonElisionLogic = 0.7;
    factors.push('conditional_preservation');
  }

  // Calculate overall confidence
  overall = (temporalAuxiliaryDetection * 0.3 + equivalenceAssessment * 0.3 + 
            temporalContextAssessment * 0.2 + nonElisionLogic * 0.1 + traditional * 0.1);

  // Update analysis
  analysis.confidence.overall = overall;
  analysis.confidence.temporalAuxiliaryDetection = temporalAuxiliaryDetection;
  analysis.confidence.equivalenceAssessment = equivalenceAssessment;
  analysis.confidence.temporalContextAssessment = temporalContextAssessment;
  analysis.confidence.nonElisionLogic = nonElisionLogic;
  analysis.confidence.factors = factors;
}

/**
 * Legacy compatibility function
 * @param {string|Object} item - The item to analyze
 * @param {Object} context - Additional context
 * @returns {Object} - Legacy-compatible result
 */
export function applySutra1_2_57(item, context = {}) {
  // Handle null/undefined inputs for ashishya compatibility
  if (!item) {
    return {
      sutra: '1.2.57',
      applied: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: { 
        sutra: '1.2.57', 
        applies: false,
        inputAnalysis: { isValid: false },
        temporalAuxiliaryAnalysis: { hasTemporalAuxiliary: false },
        equivalenceAnalysis: { equivalenceDetected: false }
      },
      confidence: { overall: 0.1 }
    };
  }

  const result = sutra1257(item, context);
  
  // Handle malformed context (ensure context is object)
  const safeContext = (context && typeof context === 'object') ? context : {};
  
  const legacyResult = {
    sutra: '1.2.57',
    applied: result.applies,
    item: result.item,
    nonElidable: result.nonElidable,
    logicalPresence: result.logicalPresence,
    phoneticPresence: result.phoneticPresence,
    analysis: result.analysis,
    confidence: result.confidence
  };

  // Only call ashishya classification if we have valid input
  try {
    const ashishyaResult = classifyAshishya(item, { 
      ...safeContext, 
      ashishyaFlags: { 
        s1_2_57: result.applies,
        temporalAuxiliary: result.analysis.temporalAuxiliaryAnalysis.hasTemporalAuxiliary,
        equivalenceTreatment: result.analysis.equivalenceAnalysis.equivalenceDetected
      } 
    });
    
    // Preserve phoneticPresence from main sutra result if forceAuxiliaryElision is set
    const finalResult = {
      ...legacyResult,
      ...ashishyaResult
    };
    
    if (safeContext.forceAuxiliaryElision === true) {
      finalResult.phoneticPresence = result.phoneticPresence;
    }
    
    return finalResult;
  } catch (error) {
    // Fallback if ashishya classification fails
    return legacyResult;
  }
}

// Export both functions for compatibility
export default applySutra1_2_57;
