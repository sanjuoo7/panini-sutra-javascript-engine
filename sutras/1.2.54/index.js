/**
 * Sutra 1.2.54: लुब्योगाप्रख्यानात्
 * lubhyogāprakhyānāt
 * 
 * "That (which is non-current due to lubh-elision) is not to be taught, 
 * due to non-currency of forms from lubh-elision contexts"
 * 
 * This sutra establishes that items resulting from lubh-elision operations 
 * that have become non-current or archaic need not be separately taught, 
 * as their non-currency provides sufficient reason for non-elision classification.
 * 
 * Key Principles:
 * 1. Non-currency Classification: Forms from lubh-elision become non-current
 * 2. Aśiṣyam Status: Non-current forms qualify for non-elision
 * 3. Teaching Economy: No need to teach non-current derivations separately
 * 4. Elision Context Awareness: Specific to lubh-type operations
 * 
 * Traditional Commentary:
 * - Kāśikā: लुब्योगात् प्रख्यानाभावात् अशिष्यम् - "Due to non-currency from lubh application, not to be taught"
 * - Meaning: Lubh-elision operations produce forms that become non-current over time
 */

import { 
  detectScript
} from '../sanskrit-utils/script-detection.js';

import { 
  classifyAshishya 
} from '../sanskrit-utils/non-elision-classification.js';

// Valid lubh-elision operation types
const LUBH_ELISION_TYPES = {
  lubh_complete: 'लुभ्_पूर्ण',        // Complete lubh elision
  lubh_partial: 'लुभ्_आंशिक',         // Partial lubh elision  
  lubh_conditional: 'लुभ्_सापेक्ष',    // Conditional lubh elision
  lubh_contextual: 'लुभ्_प्रसङ्गिक',   // Context-dependent lubh elision
  lubh_temporal: 'लुभ्_कालिक'        // Temporal lubh elision
};

// Non-currency indicators for forms
const NON_CURRENCY_INDICATORS = {
  archaic_usage: 'प्राचीन_प्रयोग',      // Archaic usage patterns
  obsolete_forms: 'लुप्त_रूप',         // Obsolete form variants
  restricted_usage: 'सीमित_प्रयोग',    // Restricted to specific contexts
  literary_only: 'काव्य_मात्र',        // Found only in literary works
  technical_only: 'शास्त्रीय_मात्र'    // Used only in technical contexts
};

// Degrees of non-currency
const NON_CURRENCY_DEGREES = {
  complete: { weight: 1.0, description: 'completely_non_current' },
  high: { weight: 0.8, description: 'highly_non_current' },
  moderate: { weight: 0.6, description: 'moderately_non_current' },
  low: { weight: 0.4, description: 'somewhat_non_current' },
  minimal: { weight: 0.2, description: 'minimally_non_current' }
};

// Currency validation patterns
const CURRENCY_PATTERNS = {
  vedic_only: /^(वेदमन्त्र|ऋक्मन्त्र|सामवेद|यजुर्वेद|अथर्ववेद|वैदिक)/,
  classical_obsolete: /^(प्राचीन|पुरातन|लुप्त)/,
  technical_archaic: /^(शास्त्रीय|तकनीकी).*?(अप्रचलित|लुप्त)/,
  literary_restricted: /^(काव्य|साहित्य).*?(सीमित|विशिष्ट)/
};

/**
 * Main function implementing Sutra 1.2.54
 * लुब्योगाप्रख्यानात् - Non-currency from lubh-elision operations
 */
export function sutra1254(item, context = {}) {
  // Phase 1: Input Validation and Analysis
  const inputValidation = validateInput(item, context);
  if (!inputValidation.isValid) {
    return {
      applies: false,
      error: inputValidation.error,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: {
        inputValidation: inputValidation,
        traditionalNote: 'लुब्योगस्य अप्रख्यानत्वं व्याकरणे महत्त्वपूर्णम्'
      }
    };
  }

  // Initialize comprehensive analysis structure
  const analysis = {
    sutra: '1.2.54',
    sutraText: 'लुब्योगाप्रख्यानात्',
    applies: false,
    
    // Input Analysis
    inputAnalysis: {
      itemType: typeof item,
      hasItemProperties: Object.keys(item || {}).length > 0,
      contextProvided: Object.keys(context).length > 0,
      script: item && typeof item === 'string' ? detectScript(item).toLowerCase() : 'object'
    },

    // Input Validation
    inputValidation: inputValidation,

    // Lubh-elision Analysis
    lubhElisionAnalysis: {
      hasLubhOperation: false,
      lubhOperationType: null,
      elisionContext: null,
      operationEvidence: [],
      lubhReasoning: ''
    },

    // Non-currency Analysis
    nonCurrencyAnalysis: {
      isNonCurrent: false,
      currencyDegree: null,
      nonCurrencyIndicators: [],
      currencyEvidence: [],
      temporalContext: null,
      usageRestrictions: []
    },

    // Aśiṣyam Classification
    ashishyaAnalysis: {
      qualifiesForAshishya: false,
      nonElisionJustification: '',
      teachingEconomy: false,
      currencyBasedReasoning: ''
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      lubhDetection: 0.0,
      currencyAssessment: 0.0,
      ashishyaClassification: 0.0,
      traditional: 0.9, // High traditional confidence
      factors: []
    }
  };

  // Phase 2: Lubh-elision Detection
  const lubhClassification = classifyLubhElision(item, context, analysis);
  
  if (!lubhClassification.hasLubhOperation) {
    analysis.applies = false;
    analysis.ashishyaAnalysis.nonElisionJustification = 'no_lubh_elision_detected';
    calculateConfidence(analysis);
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

  // Phase 3: Non-currency Assessment
  const currencyAssessment = assessNonCurrency(item, context, analysis);
  
  if (!currencyAssessment.isNonCurrent) {
    analysis.applies = false;
    analysis.ashishyaAnalysis.nonElisionJustification = 'forms_remain_current';
    calculateConfidence(analysis);
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

  // Phase 4: Aśiṣyam Classification
  const ashishyaClassification = classifyAshishyaStatus(item, context, analysis);

  // Phase 5: Apply Non-currency Rule
  const finalClassification = applyNonCurrencyRule(
    item, context, ashishyaClassification, analysis
  );

  // Calculate final confidence
  calculateConfidence(analysis);

  analysis.applies = true;
  analysis.ashishyaAnalysis.nonElisionJustification = 'lubh_elision_non_currency';

  return {
    applies: true,
    item: item,
    nonElidable: finalClassification.nonElidable,
    logicalPresence: finalClassification.logicalPresence,
    phoneticPresence: finalClassification.phoneticPresence,
    lubhOperation: analysis.lubhElisionAnalysis.lubhOperationType,
    currencyStatus: analysis.nonCurrencyAnalysis.currencyDegree,
    nonCurrencyReason: analysis.ashishyaAnalysis.currencyBasedReasoning,
    analysis: analysis,
    confidence: analysis.confidence,
    // Legacy compatibility
    applied: true,
    sutraApplied: '1.2.54',
    reasons: finalClassification.reasons || []
  };
}

/**
 * Validates input parameters for the sutra
 */
function validateInput(item, context) {
  const validation = {
    isValid: true,
    error: null,
    itemType: typeof item,
    traditionalNote: 'लुब्योगस्य अप्रख्यानत्वं व्याकरणे महत्त्वपूर्णम्'
  };

  // Item can be string, object, or primitive - all valid for lubh-elision analysis
  if (item === null || item === undefined) {
    validation.isValid = false;
    validation.error = 'null_or_undefined_item';
    validation.details = 'Item to be analyzed cannot be null or undefined';
    return validation;
  }

  // Context must be an object if provided
  if (context !== null && context !== undefined && typeof context !== 'object') {
    validation.isValid = false;
    validation.error = 'invalid_context_type';
    validation.details = 'Context must be an object or null/undefined';
    return validation;
  }

  return validation;
}

/**
 * Classifies whether the item involves lubh-elision operations
 */
function classifyLubhElision(item, context, analysis) {
  let hasLubhOperation = false;
  let lubhOperationType = null;
  let elisionContext = null;
  let operationEvidence = [];
  let lubhReasoning = '';

  // Check explicit lubh operation flag
  if (typeof item === 'object' && item.lubhElision === true) {
    hasLubhOperation = true;
    lubhOperationType = 'explicit_lubh_flag';
    lubhReasoning = 'Explicitly marked as lubh-elision operation';
    operationEvidence.push('explicit_lubh_designation');
  }

  // Check for lubh operation in context
  if (!hasLubhOperation && context.lubhOperation) {
    hasLubhOperation = true;
    lubhOperationType = 'context_lubh_operation';
    elisionContext = context.lubhOperation;
    lubhReasoning = `Context-provided lubh operation: ${context.lubhOperation}`;
    operationEvidence.push('context_lubh_specification');
  }

  // Check for lubh operation in elisionType
  if (!hasLubhOperation && context.elisionType) {
    const elisionTypeLower = context.elisionType.toLowerCase();
    if (elisionTypeLower.includes('lubh') || elisionTypeLower.includes('लुभ्')) {
      hasLubhOperation = true;
      lubhOperationType = 'elision_type_lubh';
      elisionContext = context.elisionType;
      lubhReasoning = `Lubh-elision detected in elision type: ${context.elisionType}`;
      operationEvidence.push('elision_type_lubh_indicator');
    }
  }

  // Check string-based lubh patterns
  if (!hasLubhOperation && typeof item === 'string') {
    const lubhAnalysis = analyzeLubhPatterns(item);
    if (lubhAnalysis.hasLubhCharacteristics) {
      hasLubhOperation = true;
      lubhOperationType = 'string_pattern_lubh';
      lubhReasoning = lubhAnalysis.reasoning;
      operationEvidence.push('string_pattern_lubh_detection');
    }
  }

  // Check string patterns in object text property
  if (!hasLubhOperation && typeof item === 'object' && item.text) {
    const lubhAnalysis = analyzeLubhPatterns(item.text);
    if (lubhAnalysis.hasLubhCharacteristics) {
      hasLubhOperation = true;
      lubhOperationType = 'object_text_pattern_lubh';
      lubhReasoning = lubhAnalysis.reasoning;
      operationEvidence.push('object_text_pattern_lubh_detection');
    }
  }

  // Check currency patterns for implicit lubh context
  if (!hasLubhOperation && typeof item === 'string') {
    const currencyAnalysis = analyzeCurrencyPatterns(item);
    if (currencyAnalysis.isNonCurrent) {
      // Only vedic and clearly archaic patterns suggest lubh operations
      // Exclude generic non-currency patterns that might be false positives  
      if (currencyAnalysis.pattern === 'vedic_only') {
        hasLubhOperation = true;
        lubhOperationType = 'currency_pattern_implied_lubh';
        lubhReasoning = `Currency pattern ${currencyAnalysis.pattern} suggests potential lubh operations`;
        operationEvidence.push('currency_pattern_lubh_implication');
      }
    }
  }

  // Check currency patterns in object text property
  if (!hasLubhOperation && typeof item === 'object' && item.text) {
    const currencyAnalysis = analyzeCurrencyPatterns(item.text);
    if (currencyAnalysis.isNonCurrent) {
      // Only vedic and clearly archaic patterns suggest lubh operations
      if (currencyAnalysis.pattern === 'vedic_only') {
        hasLubhOperation = true;
        lubhOperationType = 'object_text_currency_pattern_implied_lubh';
        lubhReasoning = `Currency pattern ${currencyAnalysis.pattern} in object text suggests potential lubh operations`;
        operationEvidence.push('object_text_currency_pattern_lubh_implication');
      }
    }
  }

  // Check semantic properties for lubh operations
  if (!hasLubhOperation && typeof item === 'object') {
    const semanticAnalysis = analyzeSemanticLubhProperties(item);
    if (semanticAnalysis.hasLubhProperties) {
      hasLubhOperation = true;
      lubhOperationType = 'semantic_lubh_properties';
      lubhReasoning = semanticAnalysis.reasoning;
      operationEvidence.push('semantic_lubh_property_analysis');
    }
  }

  // Check temporal context for implied lubh operations
  if (!hasLubhOperation && context.temporalContext) {
    const temporalContexts = ['vedic', 'classical-obsolete', 'archaic'];
    if (temporalContexts.includes(context.temporalContext)) {
      hasLubhOperation = true;
      lubhOperationType = 'temporal_context_implied_lubh';
      lubhReasoning = `Temporal context ${context.temporalContext} implies potential lubh operations`;
      operationEvidence.push('temporal_context_lubh_implication');
    }
  }

  // Update analysis
  analysis.lubhElisionAnalysis.hasLubhOperation = hasLubhOperation;
  analysis.lubhElisionAnalysis.lubhOperationType = lubhOperationType;
  analysis.lubhElisionAnalysis.elisionContext = elisionContext;
  analysis.lubhElisionAnalysis.operationEvidence = operationEvidence;
  analysis.lubhElisionAnalysis.lubhReasoning = lubhReasoning;

  return {
    hasLubhOperation: hasLubhOperation,
    lubhOperationType: lubhOperationType,
    elisionContext: elisionContext
  };
}

/**
 * Analyzes string patterns for lubh-elision characteristics
 */
function analyzeLubhPatterns(str) {
  // Check for lubh-related terms
  const lubhPatterns = [
    { pattern: /लुभ्/, confidence: 0.9, type: 'direct_lubh_mention' },
    { pattern: /lubh/, confidence: 0.85, type: 'romanized_lubh_mention' },
    { pattern: /(अप्रचलित|लुप्त).*?(elision|लोप)/, confidence: 0.7, type: 'non_current_elision' },
    { pattern: /(प्राचीन|पुरातन).*?(रूप|form)/, confidence: 0.6, type: 'archaic_form_pattern' }
  ];

  for (const { pattern, confidence, type } of lubhPatterns) {
    if (pattern.test(str)) {
      return {
        hasLubhCharacteristics: true,
        confidence: confidence,
        type: type,
        reasoning: `Matches lubh pattern: ${pattern.source}`
      };
    }
  }

  return {
    hasLubhCharacteristics: false,
    confidence: 0.0,
    reasoning: 'No lubh-elision patterns detected'
  };
}

/**
 * Analyzes semantic properties for lubh operations
 */
function analyzeSemanticLubhProperties(item) {
  const lubhProperties = [
    'isLubhElision', 'hasLubhOperation', 'lubhContext',
    'isNonCurrentForm', 'isArchaicDerivation', 'hasObsoleteVariant',
    'isRestrictedUsage', 'isTemporallyLimited'
  ];

  for (const prop of lubhProperties) {
    if (item[prop] === true) {
      return {
        hasLubhProperties: true,
        reasoning: `Has lubh property: ${prop}`
      };
    }
  }

  // Check for related elision properties
  if (item.elisionType && typeof item.elisionType === 'string') {
    if (item.elisionType.toLowerCase().includes('lubh') || 
        item.elisionType.includes('लुभ्')) {
      return {
        hasLubhProperties: true,
        reasoning: `Elision type indicates lubh operation: ${item.elisionType}`
      };
    }
  }

  return {
    hasLubhProperties: false,
    reasoning: 'No semantic lubh properties detected'
  };
}

/**
 * Assesses the non-currency status of forms from lubh-elision
 */
function assessNonCurrency(item, context, analysis) {
  let isNonCurrent = false;
  let currencyDegree = null;
  let nonCurrencyIndicators = [];
  let currencyEvidence = [];
  let temporalContext = null;
  let usageRestrictions = [];

  // Check explicit non-currency flag
  if (typeof item === 'object' && item.isNonCurrent === true) {
    isNonCurrent = true;
    currencyDegree = 'explicit_non_current';
    nonCurrencyIndicators.push('explicit_non_currency_flag');
    currencyEvidence.push('explicit_designation');
  } else if (typeof item === 'object' && item.isNonCurrent === false) {
    // Explicit current flag - don't override with defaults
    isNonCurrent = false;
    currencyDegree = 'explicit_current';
    nonCurrencyIndicators.push('explicit_currency_flag');
    currencyEvidence.push('explicit_current_designation');
  }

  // Check context for currency information
  if (context.currency) {
    if (context.currency === 'non-current' || context.currency === 'archaic' || 
        context.currency === 'obsolete' || context.currency === 'moderate') {
      // Context currency can refine explicit flags
      if (isNonCurrent) {
        // If already non-current, use context currency as more specific degree
        currencyDegree = context.currency;
        currencyEvidence.push(`context_currency_refinement: ${context.currency}`);
      } else {
        // If not already non-current, context currency establishes it
        isNonCurrent = true;
        currencyDegree = context.currency;
        nonCurrencyIndicators.push('context_currency_specification');
        currencyEvidence.push(`context_currency: ${context.currency}`);
      }
    }
  }

  // Check temporal context
  if (context.temporalContext) {
    temporalContext = context.temporalContext;
    if (context.temporalContext === 'vedic' || context.temporalContext === 'classical-obsolete') {
      isNonCurrent = true;
      currencyDegree = 'temporal_restriction';
      nonCurrencyIndicators.push('temporal_context_restriction');
      currencyEvidence.push(`temporal_restriction: ${context.temporalContext}`);
    }
  }

  // Check string patterns for non-currency indicators
  if (!isNonCurrent && typeof item === 'string') {
    const currencyAnalysis = analyzeCurrencyPatterns(item);
    if (currencyAnalysis.isNonCurrent) {
      isNonCurrent = true;
      currencyDegree = currencyAnalysis.degree;
      nonCurrencyIndicators.push('string_pattern_non_currency');
      currencyEvidence.push(currencyAnalysis.evidence);
    }
  }

  // Check usage restrictions
  if (typeof item === 'object' && item.usageRestrictions) {
    usageRestrictions = Array.isArray(item.usageRestrictions) ? 
                      item.usageRestrictions : [item.usageRestrictions];
    
    const restrictiveUsage = usageRestrictions.some(restriction => 
      ['archaic', 'obsolete', 'vedic-only', 'literary-only', 'technical-only'].includes(restriction)
    );
    
    if (restrictiveUsage) {
      isNonCurrent = true;
      currencyDegree = 'usage_restricted';
      nonCurrencyIndicators.push('usage_restriction_based');
      currencyEvidence.push(`usage_restrictions: ${usageRestrictions.join(', ')}`);
    }
  }

  // Default assessment based on lubh operation type (only if not explicitly set)
  if (!isNonCurrent && analysis.lubhElisionAnalysis.hasLubhOperation && 
      !(typeof item === 'object' && typeof item.isNonCurrent === 'boolean')) {
    // Lubh operations typically produce non-current forms
    isNonCurrent = true;
    currencyDegree = 'lubh_operation_default';
    nonCurrencyIndicators.push('default_lubh_non_currency');
    currencyEvidence.push('lubh_operations_typically_produce_non_current_forms');
  }

  // Update analysis
  analysis.nonCurrencyAnalysis.isNonCurrent = isNonCurrent;
  analysis.nonCurrencyAnalysis.currencyDegree = currencyDegree;
  analysis.nonCurrencyAnalysis.nonCurrencyIndicators = nonCurrencyIndicators;
  analysis.nonCurrencyAnalysis.currencyEvidence = currencyEvidence;
  analysis.nonCurrencyAnalysis.temporalContext = temporalContext;
  analysis.nonCurrencyAnalysis.usageRestrictions = usageRestrictions;

  return {
    isNonCurrent: isNonCurrent,
    currencyDegree: currencyDegree,
    evidence: currencyEvidence
  };
}

/**
 * Analyzes currency patterns in strings
 */
function analyzeCurrencyPatterns(str) {
  for (const [pattern, regex] of Object.entries(CURRENCY_PATTERNS)) {
    if (regex.test(str)) {
      return {
        isNonCurrent: true,
        degree: pattern,
        evidence: `Currency pattern match: ${pattern}`,
        pattern: pattern
      };
    }
  }

  // Check for non-currency indicators
  for (const [indicator, sanskrit] of Object.entries(NON_CURRENCY_INDICATORS)) {
    if (str.includes(sanskrit) || str.includes(indicator.replace(/_/g, '-'))) {
      return {
        isNonCurrent: true,
        degree: indicator,
        evidence: `Non-currency indicator: ${indicator}`,
        pattern: indicator
      };
    }
  }

  return {
    isNonCurrent: false,
    degree: null,
    evidence: 'No non-currency patterns detected'
  };
}

/**
 * Classifies aśiṣyam status based on lubh-elision non-currency
 */
function classifyAshishyaStatus(item, context, analysis) {
  let qualifiesForAshishya = false;
  let nonElisionJustification = '';
  let teachingEconomy = false;
  let currencyBasedReasoning = '';

  // Items with lubh-elision and non-currency qualify for aśiṣyam
  if (analysis.lubhElisionAnalysis.hasLubhOperation && 
      analysis.nonCurrencyAnalysis.isNonCurrent) {
    
    qualifiesForAshishya = true;
    teachingEconomy = true;
    nonElisionJustification = 'lubh_elision_non_currency';
    currencyBasedReasoning = 'forms_from_lubh_elision_become_non_current_need_not_be_taught';
  }

  // Update analysis
  analysis.ashishyaAnalysis.qualifiesForAshishya = qualifiesForAshishya;
  analysis.ashishyaAnalysis.nonElisionJustification = nonElisionJustification;
  analysis.ashishyaAnalysis.teachingEconomy = teachingEconomy;
  analysis.ashishyaAnalysis.currencyBasedReasoning = currencyBasedReasoning;

  return {
    qualifiesForAshishya: qualifiesForAshishya,
    nonElisionJustification: nonElisionJustification,
    teachingEconomy: teachingEconomy
  };
}

/**
 * Applies the non-currency rule comprehensively
 */
function applyNonCurrencyRule(item, context, ashishyaClassification, analysis) {
  const result = {
    nonElidable: ashishyaClassification.qualifiesForAshishya,
    logicalPresence: true,  // Non-current forms maintain logical presence
    phoneticPresence: false, // But may not have phonetic presence in current usage
    reasons: []
  };

  // Build comprehensive reasoning
  if (result.nonElidable) {
    result.reasons.push('lubh-elision-non-currency');
    
    if (analysis.ashishyaAnalysis.teachingEconomy) {
      result.reasons.push('teaching-economy-principle');
    }
    
    if (analysis.nonCurrencyAnalysis.currencyDegree) {
      result.reasons.push(`currency-degree-${analysis.nonCurrencyAnalysis.currencyDegree}`);
    }
    
    if (analysis.lubhElisionAnalysis.lubhOperationType) {
      result.reasons.push(`lubh-operation-${analysis.lubhElisionAnalysis.lubhOperationType}`);
    }
  }

  // Adjust phonetic presence based on currency degree
  if (analysis.nonCurrencyAnalysis.currencyDegree === 'complete' ||
      analysis.nonCurrencyAnalysis.currencyDegree === 'high') {
    result.phoneticPresence = false;
  } else if (analysis.nonCurrencyAnalysis.currencyDegree === 'moderate') {
    result.phoneticPresence = context.allowArchaicPhonetics === true;
  }

  return result;
}

/**
 * Calculates confidence scores for the analysis
 */
function calculateConfidence(analysis) {
  let overall = 0.0;
  let lubhDetection = 0.0;
  let currencyAssessment = 0.0;
  let ashishyaClassification = 0.0;
  let traditional = 0.9; // High traditional confidence for well-established sutra
  
  const factors = [];

  // Lubh detection confidence
  if (analysis.lubhElisionAnalysis.hasLubhOperation) {
    switch (analysis.lubhElisionAnalysis.lubhOperationType) {
      case 'explicit_lubh_flag':
        lubhDetection = 0.95;
        factors.push('explicit_lubh_flag_high_confidence');
        break;
      case 'context_lubh_operation':
        lubhDetection = 0.9;
        factors.push('context_lubh_operation_high_confidence');
        break;
      case 'elision_type_lubh':
        lubhDetection = 0.85;
        factors.push('elision_type_lubh_good_confidence');
        break;
      case 'string_pattern_lubh':
        lubhDetection = 0.7;
        factors.push('string_pattern_lubh_moderate_confidence');
        break;
      case 'semantic_lubh_properties':
        lubhDetection = 0.6;
        factors.push('semantic_lubh_properties_moderate_confidence');
        break;
      default:
        lubhDetection = 0.5;
        factors.push('lubh_detection_uncertain');
    }
  } else {
    lubhDetection = 0.1;
    factors.push('no_lubh_operation_detected');
  }

  // Currency assessment confidence
  if (analysis.nonCurrencyAnalysis.isNonCurrent) {
    switch (analysis.nonCurrencyAnalysis.currencyDegree) {
      case 'explicit_non_current':
        currencyAssessment = 0.95;
        factors.push('explicit_non_currency_high_confidence');
        break;
      case 'temporal_restriction':
        currencyAssessment = 0.9;
        factors.push('temporal_restriction_high_confidence');
        break;
      case 'usage_restricted':
        currencyAssessment = 0.85;
        factors.push('usage_restricted_good_confidence');
        break;
      case 'lubh_operation_default':
        currencyAssessment = 0.7;
        factors.push('lubh_default_non_currency_moderate_confidence');
        break;
      default:
        currencyAssessment = 0.6;
        factors.push('currency_assessment_moderate');
    }
  } else {
    // When forms remain current, confidence depends on lubh detection
    if (analysis.lubhElisionAnalysis.hasLubhOperation) {
      currencyAssessment = 0.8; // High confidence in non-application when current  
    } else {
      currencyAssessment = 0.2; // Low confidence when no lubh operation detected
    }
    factors.push('forms_remain_current');
  }

  // Aśiṣyam classification confidence
  if (analysis.ashishyaAnalysis.qualifiesForAshishya) {
    ashishyaClassification = 0.85;
    factors.push('ashishya_classification_applied');
  } else {
    // When no ashishya classification, confidence depends on lubh detection
    if (analysis.lubhElisionAnalysis.hasLubhOperation) {
      ashishyaClassification = 0.8; // High confidence in non-application
    } else {
      ashishyaClassification = 0.2; // Low confidence when no lubh operation
    }
    factors.push('ashishya_classification_not_applicable');
  }

  // Calculate overall confidence
  overall = (lubhDetection * 0.3 + currencyAssessment * 0.3 + ashishyaClassification * 0.2 + traditional * 0.2);

  // Update analysis
  analysis.confidence.overall = overall;
  analysis.confidence.lubhDetection = lubhDetection;
  analysis.confidence.currencyAssessment = currencyAssessment;
  analysis.confidence.ashishyaClassification = ashishyaClassification;
  analysis.confidence.traditional = traditional;
  analysis.confidence.factors = factors;
}

// Legacy compatibility functions
export function applySutra1_2_54(item, context = {}) {
  const result = sutra1254(item, context);
  
  // Map to legacy format with utility integration
  const utilityResult = classifyAshishya(item, { 
    ...context, 
    ashishyaFlags: { s1_2_54: true } 
  });
  
  return {
    sutra: '1.2.54',
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
export function analyzeLubhElision(item, context = {}) {
  const result = sutra1254(item, { ...context, analysis_depth: 'detailed' });
  return {
    has_lubh_operation: result.applies,
    lubh_operation_type: result.lubhOperation,
    currency_status: result.currencyStatus,
    ashishya_status: result.nonElidable,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

export function assessFormCurrency(item, context = {}) {
  // Standalone function to assess form currency
  const dummyAnalysis = {
    lubhElisionAnalysis: {
      hasLubhOperation: false,
      lubhOperationType: null,
      elisionContext: null,
      operationEvidence: [],
      lubhReasoning: ''
    },
    nonCurrencyAnalysis: {
      isNonCurrent: false,
      currencyDegree: null,
      nonCurrencyIndicators: [],
      currencyEvidence: [],
      temporalContext: null,
      usageRestrictions: []
    }
  };
  
  const currencyAssessment = assessNonCurrency(item, context, dummyAnalysis);
  
  return {
    is_non_current: currencyAssessment.isNonCurrent,
    currency_degree: currencyAssessment.currencyDegree,
    evidence: currencyAssessment.evidence,
    temporal_context: dummyAnalysis.nonCurrencyAnalysis.temporalContext,
    usage_restrictions: dummyAnalysis.nonCurrencyAnalysis.usageRestrictions
  };
}

export default sutra1254;
