/**
 * Shared Utilities Index
 * 
 * This file exports all shared utility functions from their respective modules.
 * This allows for both modular imports and backward compatibility with the
 * original shared-utils.js approach.
 * 
 * Usage:
 * // Import specific modules
 * import { detectScript } from './shared/script-detection.js';
 * 
 * // Import from index (all utilities)
 * import { detectScript, tokenizePhonemes, isVowel } from './shared/index.js';
 * 
 * Created: August 8, 2025
 */

// Constants
export * from './constants.js';

// Script Detection
export * from './script-detection.js';

// Phoneme Tokenization
export * from './phoneme-tokenization.js';

// Classification
export * from './classification.js';

// Vowel Analysis
export * from './vowel-analysis.js';

// Validation
export * from './validation.js';

// Similarity Analysis
export * from './similarity-analysis.js';

// Transliteration
export * from './transliteration.js';

// Pragrhya Analysis
export * from './pragrhya-analysis.js';

// Conjunct Analysis
export * from './conjunct-analysis.js';

// Verb Analysis
export * from './verb-analysis.js';

// Kit Analysis
export * from './kit-analysis.js';

// Kit Designation
export * from './kit-designation.js';

// Rule Scope Analysis
export * from './rule-scope-analysis.js';

// Vṛddham Analysis
export * from './vrddham-analysis.js';

// Phonetic Classification
export * from './phonetic-classification.js';

// Metalinguistic Analysis
export * from './metalinguistic-analysis.js';

// Pada Analysis
export * from './pada-analysis.js';

// Temporal Analysis
export * from './temporal-analysis.js';

// Pratyāhāra Construction
export * from './pratyahara-construction.js';

// Rule Scope Analysis
export * from './rule-scope-analysis.js';

// Root Analysis
export * from './root-analysis.js';

// Accent Analysis
export * from './accent-analysis.js';
// Accent Prosody Analysis (Svarita decomposition & Ekashruti)
export * from './accent-prosody-analysis.js';
// Sannatara Accent Rules (1.2.40)
export * from './accent-sannatara-rules.js';
// Affix Shape Analysis (1.2.41)
export * from './affix-shape-analysis.js';
// Compound Analysis (1.2.42-1.2.44)
export * from './compound-analysis.js';
// Pratipadika Classification (1.2.45-1.2.46)
export * from './pratipadika-classification.js';

// ==================== CONVENIENCE EXPORTS ====================

// Re-export commonly used functions with descriptive names
import { 
  detectScript, 
  isDevanagari, 
  analyzeScript 
} from './script-detection.js';

import { 
  tokenizePhonemes,
  tokenizeIastPhonemes,
  tokenizeDevanagariPhonemes,
  analyzePhonemeStructure
} from './phoneme-tokenization.js';

import { 
  isVowel, 
  isConsonant,
  isVrddhi,
  isGuna,
  isIkVowel,
  getVowelClassifications,
  getVowelCategory
} from './classification.js';

import { 
  analyzeVowel,
  getFirstVowel,
  getAllVowels,
  getGunaVrddhiScope,
  applyGunaTransformation,
  applyVrddhiTransformation
} from './vowel-analysis.js';

import { 
  validateSanskritWord,
  validatePhonemeSequence,
  validateVowel,
  sanitizeInput
} from './validation.js';

import {
  analyzeSimilarity,
  findClosestSubstitute,
  calculatePhoneticSimilarity,
  calculateArticulatorySimilarity,
  calculateGrammaticalSimilarity,
  calculatePositionalSimilarity,
  getVowelLength,
  getConsonantType,
  getElementGrammaticalType
} from './similarity-analysis.js';

// Core utility functions commonly used across sutras
export const CoreUtils = {
  // Script utilities
  detectScript,
  isDevanagari,
  analyzeScript,
  
  // Tokenization
  tokenizePhonemes,
  tokenizeIastPhonemes,
  tokenizeDevanagariPhonemes,
  analyzePhonemeStructure,
  
  // Classification
  isVowel,
  isConsonant,
  isVrddhi,
  isGuna,
  isIkVowel,
  getVowelClassifications,
  getVowelCategory,
  
  // Analysis
  analyzeVowel,
  getFirstVowel,
  getAllVowels,
  getGunaVrddhiScope,
  
  // Transformations
  applyGunaTransformation,
  applyVrddhiTransformation,
  
  // Validation
  validateSanskritWord,
  validatePhonemeSequence,
  validateVowel,
  sanitizeInput,
  
  // Similarity Analysis
  analyzeSimilarity,
  findClosestSubstitute,
  calculatePhoneticSimilarity,
  calculateArticulatorySimilarity,
  calculateGrammaticalSimilarity,
  calculatePositionalSimilarity,
  getVowelLength,
  getConsonantType,
  getElementGrammaticalType
};

// ==================== LEGACY COMPATIBILITY ====================

/**
 * Legacy function names for backward compatibility
 * These match the original shared-utils.js function names
 */

// Alias for tokenizePhonemes to match original function name
export const tokenize = tokenizePhonemes;

// Alias for analyzeVowel to match original usage patterns  
export const vowelAnalysis = analyzeVowel;

// Alias for getFirstVowel to match original patterns
export const extractFirstVowel = getFirstVowel;

/**
 * Creates a compatibility object that matches the original shared-utils.js structure
 * This allows existing code to work without changes while using the new modular structure
 */
export async function createLegacyUtils() {
  const constants = await import('./constants.js');
  
  return {
    // Constants (re-exported from constants.js)
    SanskritVowels: constants.SanskritVowels,
    SanskritConsonants: constants.SanskritConsonants,
    VowelGradations: constants.VowelGradations,
    
    // Functions with original names
    detectScript,
    isDevanagari,
    tokenizeIastPhonemes,
    tokenizeDevanagariPhonemes,
    tokenizePhonemes,
    isVowel,
    isConsonant,
    isVrddhi,
    isGuna,
    isIkVowel,
    getVowelClassifications,
    analyzeVowel,
    getFirstVowel,
    validateSanskritWord,
    sanitizeInput
  };
}
