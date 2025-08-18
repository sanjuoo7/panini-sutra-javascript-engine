/**
 * Sutra 1.4.34: ślāghahnuṅsthāśapāṃ jñīpsyamānaḥ
 * "For verbs of praise, curse, and blessing, the one who is intended to know is सम्प्रदान"
 * 
 * This sutra defines सम्प्रदान कारक for verbs expressing praise, curse, blessing, or blame,
 * where the target/recipient of these speech acts gets dative case.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Verbs of praise, curse, blessing that take सम्प्रदान for the target
const PRAISE_CURSE_VERBS_DEVA = ['प्रशंसति','शपति','अनुगृह्णाति','स्तौति','निन्दति','आशापयति','वरदायति'];
const PRAISE_CURSE_VERBS_IAST = ['praśaṃsati','śapati','anugṛhṇāti','stauti','nindati','āśāpayati','varadāyati'];

/**
 * Main function implementing Sutra 1.4.34
 * @param {string} word - The word being analyzed for सम्प्रदान designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with सम्प्रदान designation details
 */
export function sutra1434(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.34',
      word: word
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  
  // Extract key context information
  const {
    verb = null,
    action = null,
    action_type = null,
    element_role = null,
    target = null,
    speech_act = null,
    intention = null,
    case: grammaticalCase = null
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.34',
    sutraText: 'ślāghahnuṅsthāśapāṃ jñīpsyamānaḥ',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasPraiseCurseVerb: false,
      isTarget: false,
      isSpeechAct: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isPraiseCurseVerb: false,
      actionType: action_type,
      verbCategory: null,
      speechActType: null
    },
    
    targetAnalysis: {
      isIntendedTarget: false,
      targetType: null,
      speechActTarget: null,
      relationToSpeechAct: null
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
      speechActRole: null,
      intentionality: null,
      communicativeFunction: null
    },
    
    // Integration properties
    integration: {
      precedence: 'specific',
      conflictsWith: [],
      compatibleWith: ['1.4.32', '1.4.33'],
      extendsKaraka: true,
      speechActKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      targetClear: false
    },
    
    error: null,
    reason: null
  };

  // Validate Sanskrit input
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.validationError = validationResult.error;
    return analysis;
  }

  // Check for missing verb context
  if (!verb) {
    analysis.applies = false;
    analysis.error = 'missing_verb_context';
    analysis.reason = 'Speech act verbs require verb context for proper identification';
    return analysis;
  }

  analysis.contextValidation.verbProvided = true;

  // Analyze verb for praise/curse/blessing action
  const isPraiseCurseVerb = PRAISE_CURSE_VERBS_DEVA.includes(verb) || PRAISE_CURSE_VERBS_IAST.includes(verb);
  const isSpeechActAction = isPraiseCurseVerb || 
                           ['praise', 'curse', 'blessing', 'blame'].includes(action_type) ||
                           ['praise', 'curse', 'blessing', 'blame'].includes(speech_act);

  analysis.verbAnalysis.isPraiseCurseVerb = isPraiseCurseVerb;
  analysis.conditions.hasPraiseCurseVerb = isPraiseCurseVerb;
  analysis.conditions.isSpeechAct = isSpeechActAction;

  if (isPraiseCurseVerb) {
    analysis.verbAnalysis.verbCategory = 'speech_act';
    analysis.confidence += 0.3;
    analysis.reasons.push('speech_act_verb_detected');
    
    // Determine specific speech act type
    if (verb === 'प्रशंसति' || verb === 'praśaṃsati' || verb === 'स्तौति' || verb === 'stauti') {
      analysis.verbAnalysis.speechActType = 'praise';
      analysis.semanticAnalysis.communicativeFunction = 'positive_evaluation';
    } else if (verb === 'शपति' || verb === 'śapati') {
      analysis.verbAnalysis.speechActType = 'curse';
      analysis.semanticAnalysis.communicativeFunction = 'negative_invocation';
    } else if (verb === 'अनुगृह्णाति' || verb === 'anugṛhṇāti' || verb === 'वरदायति' || verb === 'varadāyati') {
      analysis.verbAnalysis.speechActType = 'blessing';
      analysis.semanticAnalysis.communicativeFunction = 'positive_invocation';
    } else if (verb === 'निन्दति' || verb === 'nindati') {
      analysis.verbAnalysis.speechActType = 'blame';
      analysis.semanticAnalysis.communicativeFunction = 'negative_evaluation';
    }
  } else if (isSpeechActAction) {
    analysis.verbAnalysis.verbCategory = 'speech_related';
    analysis.verbAnalysis.speechActType = action_type || speech_act;
    analysis.confidence += 0.15;
    analysis.reasons.push('speech_act_inferred');
  }

  // Analyze target role
  const isTarget = !element_role || 
                  element_role === 'target' || 
                  target === word ||
                  element_role === 'addressed_person' ||
                  element_role === 'intended_recipient';
  
  analysis.conditions.isTarget = isTarget;
  analysis.targetAnalysis.isIntendedTarget = isTarget;

  if (isTarget) {
    analysis.targetAnalysis.targetType = 'speech_act_target';
    analysis.targetAnalysis.relationToSpeechAct = 'intended_recipient';
    analysis.targetAnalysis.speechActTarget = 'primary';
    analysis.confidence += 0.2;
    analysis.reasons.push('target_role_confirmed');
  }

  // Analyze case compatibility
  const dativeCasePattern = /[ाय|े|भ्यः|वे]$/;
  const hasDativeCase = dativeCasePattern.test(word);
  analysis.conditions.hasProperCase = hasDativeCase;
  analysis.morphologicalAnalysis.caseCompatible = hasDativeCase;

  if (hasDativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(dativeCasePattern)?.[0] || null;
    analysis.confidence += 0.2;
    analysis.reasons.push('dative_case_detected');
  }

  // Determine intentionality
  if (isSpeechActAction) {
    analysis.semanticAnalysis.intentionality = intention || 'deliberate';
    if (analysis.verbAnalysis.speechActType === 'praise' || analysis.verbAnalysis.speechActType === 'blessing') {
      analysis.semanticAnalysis.intentionality = 'benevolent';
    } else if (analysis.verbAnalysis.speechActType === 'curse' || analysis.verbAnalysis.speechActType === 'blame') {
      analysis.semanticAnalysis.intentionality = 'critical';
    }
  }

  // Final सम्प्रदान determination
  if (isSpeechActAction && isTarget) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    analysis.semanticAnalysis.role = 'target';
    analysis.semanticAnalysis.speechActRole = 'intended_recipient';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.targetClear = true;
    
    // Boost confidence for clear cases
    if (hasDativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('sampradana_speech_act_target_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isSpeechActAction) {
      analysis.reason = 'not_speech_act';
    } else if (!isTarget) {
      analysis.reason = 'not_target_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyPraiseCurseDative(word, context = {}) {
  return sutra1434(word, context);
}

export default sutra1434;
