/**
 * Sutra 1.4.35: ऋणे — debt/owing dative
 * 
 * This sutra prescribes सम्प्रदान (dative case) for the entity to whom a debt is owed.
 * It handles debt relationships where someone owes something to another.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Debt/owing verbs
const DEBT_VERBS_DEVA = ['ऋणयति', 'धारयति', 'अधिकुर्वते', 'ऋणं करोति', 'धनं धारयति'];
const DEBT_VERBS_IAST = ['ṛṇayati', 'dhārayati', 'adhikurvate', 'ṛṇaṃ karoti', 'dhanaṃ dhārayati'];

// Debt-related terms
const DEBT_TERMS_DEVA = ['ऋण', 'धन', 'ऋणी', 'धारक'];
const DEBT_TERMS_IAST = ['ṛṇa', 'dhana', 'ṛṇī', 'dhāraka'];

/**
 * Sutra 1.4.35: ऋणे - Debt/Owing Dative
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {Object} context - Linguistic context
 * @returns {Object} Detailed analysis object
 */
export function sutra1435(word, context = {}) {
  const {
    verb = '',
    action_type = '',
    debt_context = '',
    creditor = '',
    debtor = '',
    amount = '',
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
    sutra: '1.4.35',
    sutraText: 'ऋणे',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasDebtVerb: false,
      isCreditor: false,
      hasDebtContext: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isDebtAction: false,
      actionType: action_type,
      verbCategory: null
    },
    
    debtAnalysis: {
      isCreditor: false,
      isDebtor: false,
      creditorRole: null,
      debtType: null,
      relationToDebt: null
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
      debtRelation: null,
      obligationType: null,
      temporality: null
    },
    
    // Integration properties
    integration: {
      precedence: 'specific',
      conflictsWith: [],
      compatibleWith: ['1.4.32'],
      extendsKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      creditorClear: false
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

  // Analyze verb for debt action
  const isDebtVerb = DEBT_VERBS_DEVA.includes(verb) || DEBT_VERBS_IAST.includes(verb);
  const isDebtAction = isDebtVerb || 
                      ['debt', 'owing', 'borrowing', 'lending'].includes(action_type) ||
                      debt_context === 'owing';

  analysis.verbAnalysis.isDebtAction = isDebtAction;
  analysis.conditions.hasDebtVerb = isDebtVerb;
  analysis.conditions.hasDebtContext = isDebtAction;

  if (isDebtVerb) {
    analysis.verbAnalysis.verbCategory = 'debt';
    analysis.confidence += 0.2;
    analysis.reasons.push('debt_verb_detected');
  } else if (isDebtAction) {
    analysis.verbAnalysis.verbCategory = 'debt_related';
    analysis.confidence += 0.1;
    analysis.reasons.push('debt_action_inferred');
  }

  // Analyze creditor role
  const isCreditor = !element_role || element_role === 'creditor' || creditor === word;
  analysis.conditions.isCreditor = isCreditor;
  analysis.debtAnalysis.isCreditor = isCreditor;

  if (isCreditor) {
    analysis.debtAnalysis.creditorRole = 'primary';
    analysis.debtAnalysis.relationToDebt = 'owed_to';
    analysis.confidence += 0.2;
    analysis.reasons.push('creditor_role_confirmed');
  }

  // Check for debtor role (would not take सम्प्रदान)
  if (element_role === 'debtor' || debtor === word) {
    analysis.applies = false;
    analysis.debtAnalysis.isDebtor = true;
    analysis.debtAnalysis.relationToDebt = 'owes';
    analysis.reason = 'debtor_not_sampradana';
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
  if (isDebtAction && isCreditor) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    analysis.semanticAnalysis.role = 'creditor';
    analysis.semanticAnalysis.debtRelation = 'owed_to';
    analysis.semanticAnalysis.obligationType = 'financial';
    analysis.semanticAnalysis.temporality = 'ongoing';
    analysis.debtAnalysis.debtType = 'monetary';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.creditorClear = true;
    
    // Boost confidence for clear cases
    if (hasDativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('debt_sampradana_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isDebtAction) {
      analysis.reason = 'not_debt_action';
    } else if (!isCreditor) {
      analysis.reason = 'not_creditor_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyDebtDative(word, context = {}) {
  return sutra1435(word, context);
}

export default sutra1435;
