/**
 * Sutra 1.4.32: कर्मणा यमभिप्रैति स सम्प्रदानम्
 * "That which one aims to reach through action is called सम्प्रदान"
 * 
 * This sutra defines सम्प्रदान कारक (dative case) as the entity that is the 
 * intended recipient or beneficiary of an action, particularly in giving actions.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// List of verbs that commonly take सम्प्रदान
const GIVING_VERBS_DEVA = ['ददाति','प्रयच्छति','अर्पयति','समर्पयति','निवेदयति','वितरति','करोति','आनयति'];
const GIVING_VERBS_IAST = ['dadāti','prayacchati','arpayati','samarpayati','nivedayati','vitarati','karoti','ānayati'];

/**
 * Main function implementing Sutra 1.4.32
 * @param {string} word - The word being analyzed for सम्प्रदान designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with सम्प्रदान designation details
 */
export function sutra1432(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.32',
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
    purpose_oriented = false,
    recipient = null,
    beneficiary = null,
    case: grammaticalCase = null
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.32',
    sutraText: 'कर्मणा यमभिप्रैति स सम्प्रदानम्',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasGivingVerb: false,
      isRecipient: false,
      isPurposeOriented: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isGivingAction: false,
      actionType: action_type,
      verbCategory: null
    },
    
    recipientAnalysis: {
      isIntendedRecipient: false,
      isBeneficiary: false,
      recipientType: null,
      relationToAction: null
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
      intentionality: null,
      beneficiaryType: null,
      purposeOrientation: purpose_oriented
    },
    
    // Integration properties
    integration: {
      precedence: 'specific',
      conflictsWith: [],
      compatibleWith: ['1.4.49', '1.4.51'],
      extendsKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      recipientClear: false
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
    analysis.reason = 'सम्प्रदान requires verb context for proper identification';
    return analysis;
  }

  analysis.contextValidation.verbProvided = true;

  // Analyze verb for giving action
  const isGivingVerb = GIVING_VERBS_DEVA.includes(verb) || GIVING_VERBS_IAST.includes(verb);
  const isPurposeOrBeneficiary = purpose_oriented || ['beneficiary', 'purpose'].includes(action_type);
  const isGivingAction = isGivingVerb || 
                        ['giving', 'offering', 'beneficiary', 'purpose'].includes(action_type) ||
                        purpose_oriented;

  analysis.verbAnalysis.isGivingAction = isGivingAction;
  analysis.conditions.hasGivingVerb = isGivingVerb;
  analysis.conditions.isPurposeOriented = isPurposeOrBeneficiary;
  analysis.semanticAnalysis.purposeOrientation = isPurposeOrBeneficiary;

  if (isGivingVerb) {
    analysis.verbAnalysis.verbCategory = 'giving';
    analysis.confidence += 0.2;
    analysis.reasons.push('giving_verb_detected');
  } else if (isGivingAction) {
    analysis.verbAnalysis.verbCategory = 'giving_related';
    analysis.confidence += 0.1;
    analysis.reasons.push('giving_action_inferred');
  }

  // Analyze recipient role
  const isRecipient = !element_role || element_role === 'recipient' || recipient === word || beneficiary === word;
  analysis.conditions.isRecipient = isRecipient;
  analysis.recipientAnalysis.isIntendedRecipient = isRecipient;

  if (isRecipient) {
    analysis.recipientAnalysis.recipientType = 'primary';
    analysis.recipientAnalysis.relationToAction = 'intended_target';
    analysis.confidence += 0.2;
    analysis.reasons.push('recipient_role_confirmed');
  }

  // Check for दिव्-कर्म exception (dual designation)
  if (isGivingAction && element_role === 'given_object') {
    analysis.applies = true;
    analysis.karaka = 'कर्म';
    analysis.morphologicalAnalysis.expectedCase = 'accusative';
    analysis.semanticAnalysis.role = 'direct_object';
    analysis.reason = 'dual_designation_karma';
    analysis.confidence = 0.8;
    analysis.reasons.push('given_object_identified');
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

  // Final सम्प्रदान determination
  if (isGivingAction && isRecipient) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    analysis.semanticAnalysis.role = 'recipient';
    analysis.semanticAnalysis.intentionality = 'deliberate';
    analysis.semanticAnalysis.beneficiaryType = 'direct';
    analysis.recipientAnalysis.isBeneficiary = true;
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.recipientClear = true;
    
    // Boost confidence for clear cases
    if (hasDativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('sampradana_designation_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isGivingAction) {
      analysis.reason = 'not_giving_action';
    } else if (!isRecipient) {
      analysis.reason = 'not_recipient_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyCoreSampradana(word, context = {}) {
  return sutra1432(word, context);
}

export default sutra1432;
