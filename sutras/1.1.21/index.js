/**
 * Sutra 1.1.21: आद्यन्तवदेकस्मिन् (ādyantavadekasmin)
 * "An operation should be performed on a single letter, as upon an initial or upon a final."
 * 
 * This is a paribhāṣā (meta-rule) that guides how grammatical operations 
 * should be applied to individual letters.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.21
 */

/**
 * Checks if an operation should be applied to a single letter according to this paribhāṣā
 * 
 * @param {string} target - The target of the operation
 * @param {Object} context - Operational context
 * @returns {boolean} - True if single-letter operation applies
 */
// Check if a word/phoneme is a single letter that can undergo operations
export function isSingleLetterOperation(input, context = {}) {
  if (!input) return false;
  
  // Check for single letters in IAST or Devanagari
  const singleLetterPattern = /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]$/;
  const singleDevanagariPattern = /^[\u0900-\u097F]$/;
  
  // Handle consonants with halanta (्)
  const consonantWithHalanta = /^[\u0915-\u0939]\u094D$/;
  
  const isSingleLetter = (input.length === 1 && 
         (singleLetterPattern.test(input) || singleDevanagariPattern.test(input))) ||
         consonantWithHalanta.test(input);
  
  // If it's a single letter, it definitely qualifies
  if (isSingleLetter) return true;
  
  // For multi-character strings, check if this paribhāṣā applies based on context
  if (context.operationType && context.position) {
    // Multi-character words can be treated as single units for positional operations
    return context.position === 'initial' || context.position === 'final';
  }
  
  return false;
}

/**
 * Applies ādi-anta-vat (like initial/final) logic to single letters
 * 
 * @param {string} letter - The single letter to process
 * @param {Object} context - Operational context
 * @returns {Object} - Operation result
 */
export function applyAdyantavat(letter, context = {}) {
  if (!letter || letter.length !== 1) {
    return { applied: false, result: letter, reason: 'Not a single letter' };
  }

  const { operationType, targetPosition } = context;
  
  // This paribhāṣā ensures that operations meant for initial/final positions
  // can be applied to single letters as if they were in those positions
  return {
    applied: true,
    result: letter,
    treatAs: targetPosition || 'both_initial_and_final',
    reason: 'Single letter treated as ādyantavat'
  };
}

/**
 * Determines if a grammatical rule should apply to a single phoneme
 * 
 * @param {string} phoneme - The phoneme to check
 * @param {string} rule - The grammatical rule being applied
 * @param {Object} context - Rule application context
 * @returns {boolean} - True if rule should apply
 */
export function shouldApplyToSinglePhoneme(phoneme, rule, context = {}) {
  if (!phoneme || !rule) {
    return false;
  }

  // Check for single phonemes including consonants with halanta
  const singlePhonemePattern = /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]$|^[\u0900-\u097F]$|^[\u0915-\u0939]\u094D$/;
  if (!singlePhonemePattern.test(phoneme)) return false;

  // Single phonemes get special treatment per this paribhāṣā
  if (phoneme.length === 1 || /^[\u0915-\u0939]\u094D$/.test(phoneme)) {
    const { ruleScope } = context || {};
    
    // Rules that normally apply to initial/final can apply to single phonemes
    if (ruleScope === 'initial' || ruleScope === 'final' || ruleScope === 'positional') {
      return true;
    }
    
    // Specific rule types that apply to single phonemes
    const applicableRules = [
      'vowel-lengthening', 'consonant-change', 'visarga-rule',
      'aspiration', 'visarga-change', 'sandhi-transformation'
    ];
    
    return applicableRules.includes(rule);
  }
  
  return false;
}

/**
 * Gets examples of single-letter operations covered by this paribhāṣā
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of example single letters
 */
export function getSingleLetterExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['अ', 'इ', 'उ', 'क्', 'त्', 'प्'];
  } else {
    return ['a', 'i', 'u', 'k', 't', 'p'];
  }
}

/**
 * Checks if this paribhāṣā should guide the application of a rule
 * 
 * @param {string} input - The input being processed
 * @param {Object} ruleContext - Context of the rule being applied
 * @returns {boolean} - True if this paribhāṣā applies
 */
// Check if this paribhāṣā is applicable to given input
export function isParibhashaApplicable(input, context = {}) {
  if (!input) return false;
  
  // Applicable for single letters or single phonemes
  const singlePhonemePattern = /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]$|^[\u0900-\u097F]$|^[\u0915-\u0939]\u094D$/;
  
  if (singlePhonemePattern.test(input)) return true;
  
  // Also applicable for phoneme-level operations on any input
  if (context.targetType === 'phoneme') return true;
  
  // Applicable for positional operations
  if (context.operationScope === 'single-letter' || 
      context.operationScope === 'positional' ||
      context.position) return true;
  
  return false;
}
