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
import { SanskritVowels } from '../sanskrit-utils/constants.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';
import { isIkVowel as sharedIsIkVowel, isVowel } from '../sanskrit-utils/classification.js';
import { 
  applyGunaTransformation, 
  applyVrddhiTransformation,
  getGunaVrddhiScope as sharedGetGunaVrddhiScope 
} from '../sanskrit-utils/vowel-analysis.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { 
  getGunaForm, 
  applyGuna, 
  isValidGunaTransformation 
} from '../sanskrit-utils/guna-utilities.js';

// Re-export isIkVowel for backward compatibility
export { isIkVowel } from '../sanskrit-utils/classification.js';

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
 * @returns {Array} Array of vowel analysis objects for backward compatibility.
 */
function getGunaVrddhiScope(word) {
  // Use shared validation first
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return []; // Return empty array for backward compatibility
  }

  // Use enhanced shared analysis
  const sharedAnalysis = sharedGetGunaVrddhiScope(word);
  
  // Add sutra-specific enhancements and return just the results array
  const sutraSpecificResults = sharedAnalysis.results.map(result => ({
    vowel: result.vowel,
    position: result.position,
    isIk: result.isIk,
    gunaForm: result.gunaForm,
    vrddhiForm: result.vrddhiForm,
    canTransform: result.canTransform,
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

  return sutraSpecificResults; // Return array for backward compatibility
}

/**
 * Enhanced scope analysis that returns full details (new API).
 *
 * @param {string} word The word to analyze (IAST or Devanagari).
 * @returns {Object} Complete analysis object with metadata.
 */
function getGunaVrddhiScopeDetailed(word) {
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
 * Convenience wrapper that extracts the first vowel and applies vṛddhi if it's an ik vowel.
 * If input is a single vowel, applies transformation directly.
 *
 * @param {string} input The word or vowel to process.
 * @returns {string|null} The vṛddhi form of the first ik vowel, or transformed vowel, or null.
 */
function getVrddhiForm(input) {
  // If input is a single vowel, apply transformation directly
  if (input && input.length <= 3 && isVowel(input)) {
    return applyVrddhiTransformation(input);
  }
  
  // Otherwise treat as word and get array result
  const scopeArray = getGunaVrddhiScope(input);
  
  if (!scopeArray || scopeArray.length === 0) {
    return null;
  }
  
  // Find first ik vowel
  const firstIkVowel = scopeArray.find(r => r.isIk);
  return firstIkVowel ? firstIkVowel.vrddhiForm : null;
}

/**
/**
 * Validates if a transformation is a proper vṛddhi transformation.
 *
 * @param {string} original The original vowel (IAST or Devanagari).
 * @param {string} transformed The transformed vowel (IAST or Devanagari).
 * @returns {boolean} True if it's a valid vṛddhi transformation.
 */
function isValidVrddhiTransformation(original, transformed) {
  if (!original || !transformed) return false;
  
  const expectedVrddhi = getVrddhiForm(original);
  return expectedVrddhi === transformed;
}

/**
/**
 * Checks if a given operation (guṇa or vṛddhi) is applicable to a vowel.
 *
 * @param {string} vowel The vowel to check (IAST or Devanagari).
 * @param {string} operation Either 'guna' or 'vrddhi'.
 * @returns {boolean} True if the operation is applicable, false otherwise.
 */
function isOperationApplicable(vowel, operation) {
  if (!sharedIsIkVowel(vowel)) {
    return false;
  }
  
  if (operation === 'guna') {
    return applyGunaToIk(vowel) !== null;
  } else if (operation === 'vrddhi') {
    return applyVrddhiToIk(vowel) !== null;
  }
  
  return false;
}

/**
 * Applies Sutra 1.1.3 to identify ik vowels and their transformability.
 *
 * @param {string} word The word to analyze.
 * @returns {Object} Comprehensive analysis with sutra application details.
 */
function applySutra113(word) {
  const scope = getGunaVrddhiScopeDetailed(word);
  
  return {
    input: word,
    sutraApplied: '1.1.3',
    sutraName: 'iko guṇavṛddhī',
    scope: scope,
    ikVowelsFound: scope.ikVowelCount || 0,
    transformableVowels: scope.transformableCount || 0,
    explanation: `Sutra 1.1.3 establishes that guṇa and vṛddhi operations apply to ik vowels (${SanskritVowels.ik.iast.join(', ')})`,
    traditionalDefinition: 'In the absence of special instruction, guṇa/vṛddhi applies to ik vowels',
    examples: (scope.results || []).filter(r => r.isIk).map(r => ({
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

// Export functions - re-export shared utilities to maintain backward compatibility
export {
  applyGunaToIk,
  applyVrddhiToIk,
  getGunaVrddhiScope,
  getGunaVrddhiScopeDetailed,
  getVrddhiForm,
  applySutra113,
  isValidVrddhiTransformation,
  isOperationApplicable
};

// Re-export shared guṇa utilities
export { 
  getGunaForm, 
  applyGuna, 
  isValidGunaTransformation 
} from '../sanskrit-utils/guna-utilities.js';
