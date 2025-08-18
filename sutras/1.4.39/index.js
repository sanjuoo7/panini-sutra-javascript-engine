/**
 * Sutra 1.4.39: धारेर्द्वितीया वा स्थाने — optional accusative for holding location
 * 
 * This sutra provides an optional accusative case for the location where something is held
 * when the verb धृ/धार (hold/support) is used. The locative case is also allowed, making
 * this a case of optional (वा) karaka assignment.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Holding/supporting verbs
const HOLDING_VERBS_DEVA = ['धारयति', 'धृणोति', 'धत्ते', 'बिभर्ति', 'उद्वहति'];
const HOLDING_VERBS_IAST = ['dhārayati', 'dhṛṇoti', 'dhatte', 'bibharti', 'udvahati'];

// Root verbs that involve holding
const HOLDING_ROOTS_DEVA = ['धृ', 'धार', 'भृ', 'वह्'];
const HOLDING_ROOTS_IAST = ['dhṛ', 'dhār', 'bhṛ', 'vah'];

/**
 * Sutra 1.4.39: धारेर्द्वितीया वा स्थाने - Optional Accusative for Holding Location
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {Object} context - Linguistic context
 * @returns {Object} Detailed analysis object
 */
export function sutra1439(word, context = {}) {
  const {
    verb = '',
    action_type = '',
    spatial_relationship = '',
    location = '',
    supported_object = '',
    element_role = '',
    case_preference = '',
    script: inputScript = null,
    validate_case = false,
    output_script = 'same'
  } = context;

  // Detect script and normalize
  const script = inputScript || detectScript(word);
  const normalizedWord = normalizeScript(word, 'deva');

  // Initialize comprehensive analysis
  const analysis = {
    sutra: '1.4.39',
    sutraText: 'धारेर्द्वितीया वा स्थाने',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Special properties for optional rules
    optional: true,
    alternativeCase: 'locative',
    caseOptions: ['accusative', 'locative'],
    
    // Core conditions
    conditions: {
      hasHoldingVerb: false,
      isLocation: false,
      hasSpatialContext: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isHoldingAction: false,
      actionType: action_type,
      verbCategory: null,
      verbRoot: null
    },
    
    spatialAnalysis: {
      isLocation: false,
      isSupportedObject: false,
      locationRole: null,
      spatialRelation: spatial_relationship,
      supportType: null
    },
    
    morphologicalAnalysis: {
      caseEnding: null,
      expectedCase: 'accusative',
      alternativeCase: 'locative',
      caseCompatible: false,
      script: script,
      normalizedForm: normalizedWord
    },
    
    semanticAnalysis: {
      role: null,
      spatialFunction: null,
      supportRelation: null,
      optionality: 'case_variation'
    },
    
    // Integration properties
    integration: {
      precedence: 'optional',
      conflictsWith: [],
      compatibleWith: ['locative_rules'],
      providesOption: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      locationClear: false
    },
    
    error: null,
    reason: null
  };

  // Validate Sanskrit input
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.reason = 'word_validation_failed';
    return analysis;
  }

  analysis.contextValidation.verbProvided = true;

  // Analyze verb for holding action
  const isHoldingVerb = HOLDING_VERBS_DEVA.includes(verb) || HOLDING_VERBS_IAST.includes(verb);
  const hasHoldingRoot = HOLDING_ROOTS_DEVA.some(root => verb.includes(root)) ||
                        HOLDING_ROOTS_IAST.some(root => verb.includes(root));
  const isHoldingAction = isHoldingVerb || hasHoldingRoot || 
                         ['holding', 'supporting', 'bearing'].includes(action_type);

  analysis.verbAnalysis.isHoldingAction = isHoldingAction;
  analysis.conditions.hasHoldingVerb = isHoldingVerb;

  if (isHoldingVerb) {
    analysis.verbAnalysis.verbCategory = 'holding';
    analysis.confidence += 0.2;
    analysis.reasons.push('holding_verb_detected');
    
    // Identify verb root
    if (verb.includes('धृ') || verb.includes('dhṛ')) {
      analysis.verbAnalysis.verbRoot = 'धृ';
    } else if (verb.includes('धार') || verb.includes('dhār')) {
      analysis.verbAnalysis.verbRoot = 'धार';
    }
  } else if (isHoldingAction) {
    analysis.verbAnalysis.verbCategory = 'support_related';
    analysis.confidence += 0.1;
    analysis.reasons.push('holding_action_inferred');
  }

  // Analyze spatial/location role
  const isLocation = spatial_relationship === 'location' || 
                    element_role === 'location' || location === word;
  const isSupportedObject = element_role === 'supported_object' || supported_object === word;
  
  analysis.conditions.isLocation = isLocation;
  analysis.conditions.hasSpatialContext = isLocation || isSupportedObject;
  analysis.spatialAnalysis.isLocation = isLocation;
  analysis.spatialAnalysis.isSupportedObject = isSupportedObject;

  if (isLocation) {
    analysis.spatialAnalysis.locationRole = 'support_location';
    analysis.spatialAnalysis.supportType = 'locational';
    analysis.confidence += 0.2;
    analysis.reasons.push('location_role_confirmed');
  } else if (isSupportedObject) {
    // Supported object would typically be कर्म, not the focus of this sutra
    analysis.applies = false;
    analysis.spatialAnalysis.supportType = 'object_held';
    analysis.reason = 'supported_object_not_location';
    return analysis;
  }

  // Analyze case compatibility for both options
  const accusativeCasePattern = /(ं|म्|न्|त्|द्)$/;
  const locativeCasePattern = /(े|स्मिन्|षु)$/;
  
  const hasAccusativeCase = accusativeCasePattern.test(word);
  const hasLocativeCase = locativeCasePattern.test(word);
  const hasCompatibleCase = hasAccusativeCase || hasLocativeCase;
  
  analysis.conditions.hasProperCase = hasCompatibleCase;
  analysis.morphologicalAnalysis.caseCompatible = hasCompatibleCase;

  if (hasAccusativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(accusativeCasePattern)?.[0] || null;
    analysis.morphologicalAnalysis.expectedCase = 'accusative';
    analysis.confidence += 0.2;
    analysis.reasons.push('accusative_case_detected');
  } else if (hasLocativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(locativeCasePattern)?.[0] || null;
    analysis.morphologicalAnalysis.expectedCase = 'locative';
    analysis.confidence += 0.2;
    analysis.reasons.push('locative_case_detected');
  }

  // Final determination
  if (isHoldingAction && isLocation) {
    analysis.applies = true;
    
    if (hasAccusativeCase) {
      analysis.karaka = 'कर्म'; // Special accusative usage
      analysis.semanticAnalysis.role = 'support_location_accusative';
    } else if (hasLocativeCase) {
      analysis.karaka = 'अधिकरण';
      analysis.semanticAnalysis.role = 'support_location_locative';
    } else {
      analysis.karaka = 'कर्म'; // Default to accusative option
      analysis.semanticAnalysis.role = 'support_location_accusative';
    }
    
    analysis.semanticAnalysis.spatialFunction = 'location_of_support';
    analysis.semanticAnalysis.supportRelation = 'provides_support_location';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.locationClear = true;
    
    // Boost confidence for clear cases
    if (hasCompatibleCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('optional_location_case_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isHoldingAction) {
      analysis.reason = 'not_holding_action';
    } else if (!isLocation) {
      analysis.reason = 'not_location_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyHoldingLocationCase(word, context = {}) {
  return sutra1439(word, context);
}

export default sutra1439;
