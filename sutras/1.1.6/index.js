/**
 * Sutra 1.1.6: पूर्वोऽवरः (pūrvo'varaḥ)
 *
 * This sutra establishes a fundamental principle of ordering and precedence in Sanskrit grammar.
 * It states: "The earlier (rule/element) supersedes the later one."
 * 
 * In Pāṇini's system, this sutra defines the principle that:
 * - Earlier sutras have precedence over later ones
 * - In sequences, the first element has precedence
 * - In compound formations, the first part determines certain properties
 * 
 * This is a crucial meta-rule that governs rule application throughout the Aṣṭādhyāyī.
 */

// Import shared phoneme tokenization utilities
import { tokenizeIastPhonemes, tokenizeDevanagariPhonemes } from '../shared/phoneme-tokenization.js';

/**
 * Determines precedence between two elements based on their order.
 *
 * @param {Array} elements Array of elements in order.
 * @param {number} index1 Index of first element.
 * @param {number} index2 Index of second element.
 * @returns {Object} Precedence analysis result.
 */
function determinePrecedence(elements, index1, index2) {
  if (!elements || !Array.isArray(elements)) {
    return {
      isValid: false,
      error: 'Invalid elements array',
      precedent: null,
      subsequent: null
    };
  }

  if (index1 < 0 || index2 < 0 || index1 >= elements.length || index2 >= elements.length) {
    return {
      isValid: false,
      error: 'Invalid indices',
      precedent: null,
      subsequent: null
    };
  }

  const element1 = elements[index1];
  const element2 = elements[index2];
  const hasPrecedence = index1 < index2;

  return {
    isValid: true,
    error: null,
    element1: {
      value: element1,
      index: index1,
      position: 'पूर्व (pūrva) - earlier'
    },
    element2: {
      value: element2,
      index: index2,
      position: 'अवर (avara) - later'
    },
    precedent: hasPrecedence ? element1 : element2,
    precedentIndex: hasPrecedence ? index1 : index2,
    subsequent: hasPrecedence ? element2 : element1,
    subsequentIndex: hasPrecedence ? index2 : index1,
    hasPrecedence: hasPrecedence,
    principle: 'पूर्वोऽवरः - The earlier supersedes the later'
  };
}

/**
 * Analyzes compound precedence according to Sutra 1.1.6.
 * Focuses purely on precedence analysis without making oversimplified 
 * compound type classifications.
 *
 * @param {Array} compoundParts Array of compound parts in order.
 * @returns {Object} Compound precedence analysis.
 */
function analyzeCompoundPrecedence(compoundParts) {
  if (!compoundParts || !Array.isArray(compoundParts) || compoundParts.length < 2) {
    return {
      isValid: false,
      error: 'Invalid compound parts - need at least 2 elements',
      analysis: null
    };
  }

  const precedenceChain = compoundParts.map((part, index) => ({
    part: part,
    index: index,
    precedenceLevel: index + 1,
    position: index === 0 ? 'पूर्व (pūrva) - primary' : `अवर (avara) - ${index + 1}`,
    isPrimary: index === 0
  }));

  return {
    isValid: true,
    error: null,
    primary: precedenceChain[0],
    secondary: precedenceChain.slice(1),
    precedenceChain: precedenceChain,
    principleApplied: 'पूर्वोऽवरः',
    analysis: `Primary element "${precedenceChain[0].part}" has precedence over subsequent elements`
  };
}

/**
 * Determines rule precedence in grammatical operations.
 * 
 * Note: This function expects the input rules array to be pre-ordered or contain 
 * order/priority properties that reflect the correct Pāṇinian rule precedence 
 * according to meta-rules such as "vipratiṣedhe paraṁ kāryam" (in case of conflict, 
 * the later rule prevails) or "pūrvatrāsiddham" (earlier rule is as if not existing 
 * for later rule).
 *
 * @param {Array} rules Array of applicable rules with their priorities.
 * @returns {Object} Rule precedence determination.
 */
function determineRulePrecedence(rules) {
  if (!rules || !Array.isArray(rules) || rules.length === 0) {
    return {
      isValid: false,
      error: 'No rules provided',
      applicableRule: null
    };
  }

  // Sort by order/priority - earlier rules have precedence
  const sortedRules = rules
    .map((rule, index) => ({
      ...rule,
      originalIndex: index,
      precedenceScore: rule.order || rule.priority || index
    }))
    .sort((a, b) => a.precedenceScore - b.precedenceScore);

  const applicableRule = sortedRules[0];
  const supersededRules = sortedRules.slice(1);

  return {
    isValid: true,
    error: null,
    applicableRule: {
      ...applicableRule,
      reason: 'पूर्वत्व (pūrvatva) - precedence by earlierness'
    },
    supersededRules: supersededRules.map(rule => ({
      ...rule,
      supersededBy: applicableRule.name || applicableRule.id,
      reason: 'अवरत्व (avarvatva) - superseded by earlier rule'
    })),
    principle: 'पूर्वोऽवरः - Earlier rule supersedes later ones',
    analysis: `Rule "${applicableRule.name || applicableRule.id}" takes precedence over ${supersededRules.length} other rule(s)`
  };
}

/**
 * Analyzes phoneme sequence precedence for sandhi operations.
 * Uses proper phoneme tokenization for accurate analysis.
 *
 * @param {string} sequence String of phonemes/sounds in IAST or Devanagari.
 * @returns {Object} Phoneme precedence analysis.
 */
function analyzePhonemeSequence(sequence) {
  if (!sequence || typeof sequence !== 'string') {
    return {
      isValid: false,
      error: 'Invalid sequence',
      analysis: null
    };
  }

  // Determine script and tokenize accordingly
  const isDevanagari = /[\u0900-\u097F]/.test(sequence);
  const phonemes = isDevanagari ? 
    tokenizeDevanagariPhonemes(sequence) : 
    tokenizeIastPhonemes(sequence);

  if (phonemes.length === 0) {
    return {
      isValid: false,
      error: 'No phonemes could be extracted from sequence',
      analysis: null
    };
  }

  // Extract the primary phoneme, handling conjuncts by taking the first constituent
  let primaryPhonemeValue = phonemes[0];
  if (isDevanagari && primaryPhonemeValue.length > 1 && primaryPhonemeValue.includes('्')) {
    // If it's a Devanagari conjunct, take the first character before the halanta
    primaryPhonemeValue = primaryPhonemeValue.charAt(0);
  }

  const precedenceAnalysis = phonemes.map((phoneme, index) => ({
    phoneme: phoneme,
    position: index,
    precedenceLevel: index + 1,
    category: index === 0 ? 'पूर्व (pūrva)' : 'अवर (avara)',
    influenceDirection: index === 0 ? 'rightward (दक्षिणावर्त)' : 'dependent',
    isPrimary: index === 0
  }));

  return {
    isValid: true,
    error: null,
    sequence: sequence,
    script: isDevanagari ? 'Devanagari' : 'IAST',
    phonemes: precedenceAnalysis,
    primaryPhoneme: {
      phoneme: primaryPhonemeValue,
      position: 0,
      precedenceLevel: 1,
      category: 'पूर्व (pūrva)',
      influenceDirection: 'rightward (दक्षिणावर्त)',
      isPrimary: true
    },
    dependentPhonemes: precedenceAnalysis.slice(1),
    principle: 'पूर्वोऽवरः',
    sandhiDirection: 'पूर्व influences अवर',
    analysis: `In sequence "${sequence}", "${primaryPhonemeValue}" has primary influence`,
    tokenization: {
      method: isDevanagari ? 'Devanagari phoneme tokenization' : 'IAST phoneme tokenization',
      phonemeCount: phonemes.length,
      rawPhonemes: phonemes
    }
  };
}

/**
 * Applies Sutra 1.1.6 to determine ordering precedence in any context.
 *
 * @param {Array|string} elements Elements to analyze for precedence.
 * @param {string} context Context type ('compound', 'rules', 'phonemes', 'general').
 * @returns {Object} Complete precedence analysis according to Sutra 1.1.6.
 */
function applySutra116(elements, context = 'general') {
  const sutraInfo = {
    number: '1.1.6',
    sanskrit: 'पूर्वोऽवरः',
    transliteration: 'pūrvo\'varaḥ',
    translation: 'The earlier (supersedes) the later',
    principle: 'Precedence by temporal/positional order'
  };

  let analysis;
  
  switch (context) {
    case 'compound':
      analysis = analyzeCompoundPrecedence(elements);
      break;
    case 'rules':
      analysis = determineRulePrecedence(elements);
      break;
    case 'phonemes':
      analysis = analyzePhonemeSequence(elements);
      break;
    case 'general':
    default:
      if (Array.isArray(elements) && elements.length >= 2) {
        analysis = determinePrecedence(elements, 0, 1);
      } else {
        analysis = {
          isValid: false,
          error: 'Invalid elements for general precedence analysis'
        };
      }
      break;
  }

  return {
    sutra: sutraInfo,
    context: context,
    input: elements,
    analysis: analysis,
    application: analysis.isValid ? 'Sutra 1.1.6 successfully applied' : 'Sutra 1.1.6 could not be applied',
    examples: {
      compound: ['राम + सीता → रामसीता (Rama has precedence)', 'अग्नि + सोम → अग्निसोम (Agni primary)'],
      rules: ['Earlier sutra supersedes later sutra', 'Specific rule supersedes general rule'],
      phonemes: ['In क + त → क्त, क influences त', 'In स + त → स्त, स has precedence'],
      morphology: ['Root comes before suffix', 'Stem precedes inflection']
    }[context] || []
  };
}

/**
 * Checks if an element has precedence over another based on position.
 *
 * @param {any} element1 First element.
 * @param {any} element2 Second element.
 * @param {Array} sequence Sequence containing both elements.
 * @returns {boolean} True if element1 has precedence over element2.
 */
function hasPrecedence(element1, element2, sequence) {
  if (!sequence || !Array.isArray(sequence)) {
    return false;
  }

  const index1 = sequence.indexOf(element1);
  const index2 = sequence.indexOf(element2);

  if (index1 === -1 || index2 === -1) {
    return false;
  }

  return index1 < index2;
}

export {
  determinePrecedence,
  analyzeCompoundPrecedence,
  determineRulePrecedence,
  analyzePhonemeSequence,
  applySutra116,
  hasPrecedence
};
