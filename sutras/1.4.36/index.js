/**
 * Sutra 1.4.36: वशे — desire/longing dative
 * 
 * This sutra prescribes सम्प्रदान (dative case) for the entity that is desired, longed for,
 * or the object of wish/yearning. It handles expressions of desire and longing.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Desire/longing verbs
const DESIRE_VERBS_DEVA = ['वशयति', 'इच्छति', 'कामयते', 'स्पृहयति', 'अभिलषति', 'आकांक्षति'];
const DESIRE_VERBS_IAST = ['vaśayati', 'icchati', 'kāmayate', 'spṛhayati', 'abhilaṣati', 'ākāṅkṣati'];

// Desire-related terms
const DESIRE_TERMS_DEVA = ['इच्छा', 'कामना', 'स्पृहा', 'अभिलाषा', 'आकांक्षा'];
const DESIRE_TERMS_IAST = ['icchā', 'kāmanā', 'spṛhā', 'abhilāṣā', 'ākāṅkṣā'];

/**
 * Sutra 1.4.36: वशे - Desire/Longing Dative
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {Object} context - Linguistic context
 * @returns {Object} Detailed analysis object
 */
export function sutra1436(word, context = {}) {
  const {
    verb = '',
    action_type = '',
    desire_type = '',
    desired_object = '',
    desirer = '',
    element_role = '',
    script: inputScript = null,
    validate_case = false,
    output_script = 'same'
  } = context;

  // Detect script and normalize
  const script = inputScript || detectScript(word);
  const normalizedWord = normalizeScript(word, 'deva');

  // Initialize comprehensive analysis
  const analysis = {
    sutra: '1.4.36',
    sutraText: 'वशे',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasDesireVerb: false,
      isDesiredObject: false,
      hasDesireContext: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isDesireAction: false,
      actionType: action_type,
      verbCategory: null
    },
    
    desireAnalysis: {
      isDesiredObject: false,
      isDesirer: false,
      desireType: null,
      desireIntensity: null,
      relationToDesire: null
    },
    
    morphologicalAnalysis: {
      caseEnding: null,
      expectedCase: 'dative',
      caseCompatible: false,
      script: script,
      normalizedForm: normalizedWord
    },
    
    semanticAnalysis: {
      role: null,
      emotionalContent: null,
      volitionalAspect: null,
      temporality: null
    },
    
    // Integration properties
    integration: {
      precedence: 'specific',
      conflictsWith: [],
      compatibleWith: ['1.4.32', '1.4.33'],
      extendsKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      desiredObjectClear: false
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

  // Analyze verb for desire action
  const isDesireVerb = DESIRE_VERBS_DEVA.includes(verb) || DESIRE_VERBS_IAST.includes(verb);
  const isDesireAction = isDesireVerb || 
                        ['desire', 'longing', 'wanting', 'craving'].includes(action_type) ||
                        desire_type === 'longing';

  analysis.verbAnalysis.isDesireAction = isDesireAction;
  analysis.conditions.hasDesireVerb = isDesireVerb;
  analysis.conditions.hasDesireContext = isDesireAction;

  if (isDesireVerb) {
    analysis.verbAnalysis.verbCategory = 'desire';
    analysis.confidence += 0.2;
    analysis.reasons.push('desire_verb_detected');
  } else if (isDesireAction) {
    analysis.verbAnalysis.verbCategory = 'desire_related';
    analysis.confidence += 0.1;
    analysis.reasons.push('desire_action_inferred');
  }

  // Analyze desired object role
  const isDesiredObject = !element_role || element_role === 'desired_object' || desired_object === word;
  analysis.conditions.isDesiredObject = isDesiredObject;
  analysis.desireAnalysis.isDesiredObject = isDesiredObject;

  if (isDesiredObject) {
    analysis.desireAnalysis.relationToDesire = 'target_of_desire';
    analysis.desireAnalysis.desireType = 'object_oriented';
    analysis.confidence += 0.2;
    analysis.reasons.push('desired_object_confirmed');
  }

  // Check for desirer role (would not take सम्प्रदान typically)
  if (element_role === 'desirer' || desirer === word) {
    analysis.applies = false;
    analysis.desireAnalysis.isDesirer = true;
    analysis.desireAnalysis.relationToDesire = 'experiences_desire';
    analysis.reason = 'desirer_not_sampradana';
    return analysis;
  }

  // Analyze case compatibility
  const dativeCasePattern = /(ाय|े|भ्यः|वे)$/;
  const hasDativeCase = dativeCasePattern.test(word);
  analysis.conditions.hasProperCase = hasDativeCase;
  analysis.morphologicalAnalysis.caseCompatible = hasDativeCase;

  if (hasDativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(dativeCasePattern)?.[0] || null;
    analysis.confidence += 0.2;
    analysis.reasons.push('dative_case_detected');
  }

  // Analyze desire intensity and type
  if (isDesireAction) {
    const intensityMarkers = ['अति', 'परम', 'महा'];
    const hasIntensityMarker = intensityMarkers.some(marker => 
      context.context?.includes(marker));
    
    if (hasIntensityMarker) {
      analysis.desireAnalysis.desireIntensity = 'high';
      analysis.confidence += 0.1;
    } else {
      analysis.desireAnalysis.desireIntensity = 'moderate';
    }
  }

  // Final सम्प्रदान determination
  if (isDesireAction && isDesiredObject) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    analysis.semanticAnalysis.role = 'desired_object';
    analysis.semanticAnalysis.emotionalContent = 'longing';
    analysis.semanticAnalysis.volitionalAspect = 'intentional';
    analysis.semanticAnalysis.temporality = 'future_oriented';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.desiredObjectClear = true;
    
    // Boost confidence for clear cases
    if (hasDativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('desire_sampradana_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isDesireAction) {
      analysis.reason = 'not_desire_action';
    } else if (!isDesiredObject) {
      analysis.reason = 'not_desired_object';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyDesireDative(word, context = {}) {
  return sutra1436(word, context);
}

export default sutra1436;
