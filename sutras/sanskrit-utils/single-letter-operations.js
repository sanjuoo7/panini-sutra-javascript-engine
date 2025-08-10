/**
 * Single Letter Operations Utility
 * 
 * Centralizes logic for single letter/phoneme operations
 * Eliminates redundancy from 1.1.21 and provides reusable functions
 */

import { detectScript } from './script-detection.js';
import { isVowel, isConsonant } from './classification.js';
import { ScriptPatterns } from './constants.js';

/**
 * Checks if input is a single letter that can undergo operations
 * @param {string} input - The input to check
 * @param {Object} context - Operational context
 * @returns {boolean} - True if single-letter operation applies
 */
export function isSingleLetterOperation(input, context = {}) {
  if (!input) return false;
  
  // Use centralized patterns instead of local regex
  const isSingleLetter = (input.length === 1 && 
        (ScriptPatterns.singleLetter.iast.test(input) || 
         ScriptPatterns.singleLetter.devanagari.test(input))) ||
        ScriptPatterns.consonantWithHalanta.test(input);
  
  if (isSingleLetter) {
    // Additional validation based on context
    if (context.requireVowel && !isVowel(input)) return false;
    if (context.requireConsonant && !isConsonant(input)) return false;
    if (context.script && detectScript(input) !== context.script) return false;
    
    return true;
  }
  
  return false;
}

/**
 * Applies ādyantavat operations to a single letter
 * @param {string} letter - The letter to operate on
 * @param {Object} context - Operation context
 * @returns {Object} - Operation result
 */
export function applyAdyantavat(letter, context = {}) {
  const result = {
    original: letter,
    modified: letter,
    applied: false,
    operation: null
  };
  
  const { operationType, targetPosition } = context;
  
  if (!isSingleLetterOperation(letter, context)) {
    result.reason = 'Not applicable to single letter operations';
    return result;
  }
  
  // Apply operations based on context
  if (operationType === 'initial' || targetPosition === 'ādya') {
    result.operation = 'ādya_operation';
    result.applied = true;
  } else if (operationType === 'final' || targetPosition === 'anta') {
    result.operation = 'anta_operation';
    result.applied = true;
  }
  
  return result;
}

/**
 * Determines if a rule should apply to a single phoneme
 * @param {string} phoneme - The phoneme to check
 * @param {string} rule - The rule to apply
 * @param {Object} context - Rule context
 * @returns {boolean} - True if rule applies
 */
export function shouldApplyToSinglePhoneme(phoneme, rule, context = {}) {
  if (!phoneme || !rule) return false;
  
  // Use centralized pattern instead of local regex
  if (!ScriptPatterns.singlePhoneme.test(phoneme)) {
    return false;
  }
  
  // Check rule-specific context
  if (context.ruleScope) {
    const { ruleScope } = context || {};
    
    // Define applicable rules for single phonemes
    const applicableRules = [
      'sandhi_operations',
      'vowel_transformations', 
      'consonant_modifications',
      'accent_placement',
      'lengthening_shortening',
      'deletion_insertion',
      'substitution_rules',
      'paribhasha_applications'
    ];
    
    return applicableRules.includes(rule) && 
           (!ruleScope || ruleScope.includes('single_phoneme'));
  }
  
  return true;
}

/**
 * Gets examples of single letters for testing
 * @param {string} script - IAST or Devanagari
 * @returns {Object} - Example letters by category
 */
export function getSingleLetterExamples(script = 'IAST') {
  if (script === 'IAST') {
    return {
      vowels: ['a', 'i', 'u', 'ṛ', 'e', 'o'],
      consonants: ['k', 'g', 'c', 'j', 't', 'd', 'p', 'b', 'm', 'y', 'r', 'l', 'v', 'ś', 'ṣ', 's', 'h'],
      special: ['ṃ', 'ḥ']
    };
  } else {
    return {
      vowels: ['अ', 'इ', 'उ', 'ऋ', 'ए', 'ओ'],
      consonants: ['क', 'ग', 'च', 'ज', 'त', 'द', 'प', 'ब', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
      special: ['ं', 'ः']
    };
  }
}

/**
 * Checks if paribhāṣā 1.1.21 is applicable
 * @param {string} input - The input to check
 * @param {Object} context - Operation context
 * @returns {boolean} - True if paribhāṣā applies
 */
export function isParibhashaApplicable(input, context = {}) {
  if (!input) return false;
  
  // Use centralized pattern
  return ScriptPatterns.singlePhoneme.test(input) && 
         (!context.excludeParibhasha || !context.excludeParibhasha.includes('1.1.21'));
}
