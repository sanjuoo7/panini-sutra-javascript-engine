/**
 * Sutra 1.1.3: इको गुणवृद्धी (iko guṇavṛddhī)
 *
 * This is a paribhāṣā (interpretive rule) that states: "In the absence of any special instruction,
 * whenever गुण (guṇa) or वृद्धि (vṛddhi) is enjoined for any expression by using the terms गुण or वृद्धि,
 * it is to be understood to come in place of the इक् (ik) vowels (इ, उ, ऋ, लृ) of that expression."
 *
 * This sutra establishes the default scope of guṇa and vṛddhi operations - they apply specifically
 * to the 'ik' class of vowels unless otherwise specified.
 * 
 * IMPLEMENTATION NOTES:
 * 
 * Current Status: Enhanced with shared utilities
 * - Robust phoneme tokenization for accurate vowel detection
 * - Comprehensive bilingual support (IAST/Devanagari)
 * - Leverages centralized classification and transformation logic
 * 
 * Phonological Pattern Implementation:
 * 
 * Guṇa Pattern:
 * - i/ī (high front) → e (mid front) 
 * - u/ū (high back) → o (mid back)
 * - ṛ/ṝ (high central retroflex) → ar (mid central + resonant)
 * - ḷ/ḹ (high central lateral) → al (mid central + lateral)
 * 
 * Vṛddhi Pattern:  
 * - i/ī (high front) → ai (front diphthong)
 * - u/ū (high back) → au (back diphthong) 
 * - ṛ/ṝ (high central retroflex) → ār (long central + resonant)
 * - ḷ/ḹ (high central lateral) → āl (long central + lateral)
 */

// Import shared utilities
import { SanskritVowels } from '../shared/constants.js';
import { tokenizePhonemes } from '../shared/phoneme-tokenization.js';
import { isIkVowel as sharedIsIkVowel, isVowel } from '../shared/classification.js';
import { 
  applyGunaTransformation, 
  applyVrddhiTransformation,
  getGunaVrddhiScope as sharedGetGunaVrddhiScope 
} from '../shared/vowel-analysis.js';
import { validateSanskritWord } from '../shared/validation.js';

// Re-export isIkVowel for backward compatibility
export { isIkVowel } from '../shared/classification.js';

/**
 * Applies guṇa transformation to an 'ik' vowel.
 * This function implements the guṇa rule as specified in sutra 1.1.3.
 * Enhanced with shared utilities for robust handling.
 *
 * @param {string} vowel The 'ik' vowel to transform (IAST or Devanagari).
 * @returns {string|null} The guṇa form if the vowel is 'ik', null otherwise.
 */
function applyGunaToIk(vowel) {
  if (!sharedIsIkVowel(vowel)) {
    return null;
  }
  
  return applyGunaTransformation(vowel);
}

/**
 * Applies vṛddhi transformation to an 'ik' vowel.
 * This function implements the vṛddhi rule as specified in sutra 1.1.3.
 * Enhanced with shared utilities for robust handling.
 *
 * @param {string} vowel The 'ik' vowel to transform (IAST or Devanagari).
 * @returns {string|null} The vṛddhi form if the vowel is 'ik', null otherwise.
 */
function applyVrddhiToIk(vowel) {
  if (!sharedIsIkVowel(vowel)) {
    return null;
  }
  
  return applyVrddhiTransformation(vowel);
}

/**
 * Determines the scope of guṇa/vṛddhi operations according to sutra 1.1.3.
 * This function identifies which vowels in a given word are subject to guṇa/vṛddhi.
 * Enhanced with robust phoneme tokenization and comprehensive analysis.
 *
 * @param {string} word The word to analyze (IAST or Devanagari).
 * @returns {Object} Enhanced analysis with tokenization and transformation details.
 */
function getGunaVrddhiScope(word) {
  // Use shared validation first
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return {
      word: word,
      error: validation.error,
      results: [],
      ikVowelCount: 0,
      transformableCount: 0
    };
  }

  // Use enhanced shared analysis
  const sharedAnalysis = sharedGetGunaVrddhiScope(word);
  
  // Add sutra-specific enhancements
  const sutraSpecificResults = sharedAnalysis.results.map(result => ({
    ...result,
    // Add sutra 1.1.3 specific analysis
    appliesTo113: result.isIk,
    sutraNote: result.isIk ? 
      'Subject to sutra 1.1.3 (iko guṇavṛddhī)' : 
      'Not in scope of sutra 1.1.3 (not an ik vowel)',
    transformations: {
      guna: result.isIk ? result.gunaForm : null,
      vrddhi: result.isIk ? result.vrddhiForm : null,
      reasoning: result.isIk ? 
        'ik vowel transforms according to guṇa/vṛddhi rules' :
        'Non-ik vowel not affected by standard guṇa/vṛddhi'
    }
  }));

  return {
    word: word,
    script: sharedAnalysis.script,
    results: sutraSpecificResults,
    ikVowelCount: sutraSpecificResults.filter(r => r.isIk).length,
    transformableCount: sharedAnalysis.transformableCount,
    totalVowels: sharedAnalysis.totalVowels,
    tokenization: sharedAnalysis.tokenization,
    sutraApplication: 'iko guṇavṛddhī (1.1.3)',
    scope: 'ik vowels only'
  };
}

/**
 * Convenience wrapper that extracts the first vowel and applies guṇa if it's an ik vowel.
 *
 * @param {string} word The word to process.
 * @returns {string|null} The guṇa form of the first ik vowel, or null.
 */
function getGunaForm(word) {
  const scope = getGunaVrddhiScope(word);
  
  if (scope.error || scope.results.length === 0) {
    return null;
  }
  
  // Find first ik vowel
  const firstIkVowel = scope.results.find(r => r.isIk);
  return firstIkVowel ? firstIkVowel.gunaForm : null;
}

/**
 * Convenience wrapper that extracts the first vowel and applies vṛddhi if it's an ik vowel.
 *
 * @param {string} word The word to process.
 * @returns {string|null} The vṛddhi form of the first ik vowel, or null.
 */
function getVrddhiForm(word) {
  const scope = getGunaVrddhiScope(word);
  
  if (scope.error || scope.results.length === 0) {
    return null;
  }
  
  // Find first ik vowel
  const firstIkVowel = scope.results.find(r => r.isIk);
  return firstIkVowel ? firstIkVowel.vrddhiForm : null;
}

/**
 * Legacy function name for applying guṇa (for backward compatibility).
 *
 * @param {string} word The word to process.
 * @returns {string|null} The guṇa form of the first ik vowel, or null.
 */
function applyGuna(word) {
  return getGunaForm(word);
}

/**
 * Applies Sutra 1.1.3 to identify ik vowels and their transformability.
 *
 * @param {string} word The word to analyze.
 * @returns {Object} Comprehensive analysis with sutra application details.
 */
function applySutra113(word) {
  const scope = getGunaVrddhiScope(word);
  
  return {
    input: word,
    sutraApplied: '1.1.3',
    sutraName: 'iko guṇavṛddhī',
    scope: scope,
    ikVowelsFound: scope.ikVowelCount,
    transformableVowels: scope.transformableCount,
    explanation: `Sutra 1.1.3 establishes that guṇa and vṛddhi operations apply to ik vowels (${SanskritVowels.ik.iast.join(', ')})`,
    traditionalDefinition: 'In the absence of special instruction, guṇa/vṛddhi applies to ik vowels',
    examples: scope.results.filter(r => r.isIk).map(r => ({
      vowel: r.vowel,
      position: r.position,
      guna: r.gunaForm,
      vrddhi: r.vrddhiForm
    }))
  };
}

// Export constants for backward compatibility
export const ikVowels = SanskritVowels.ik.iast;
export const ikVowelsDevanagari = SanskritVowels.ik.devanagari;

// Export functions
export {
  applyGunaToIk,
  applyVrddhiToIk,
  getGunaVrddhiScope,
  getGunaForm,
  getVrddhiForm,
  applyGuna,
  applySutra113
};
