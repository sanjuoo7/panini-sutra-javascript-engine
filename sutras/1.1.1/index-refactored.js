/**
 * Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic)
 *
 * This sutra defines the term "vṛddhi". It states that the vowels ā (आ), ai (ऐ), and au (औ) are called vṛddhi.
 * In Pāṇini's system, "āT" (आत्) refers to "ā" and "aiC" (ऐच्) is a pratyāhāra (abbreviation)
 * that includes the vowels "ai" (ऐ) and "au" (औ).
 * 
 * This is the foundational sutra that establishes the vowel categories used throughout Sanskrit grammar.
 * 
 * REFACTORED: Now uses shared utilities for common functionality
 */

import { 
  isVrddhi, 
  analyzeVowel as analyzeVowelShared, 
  SanskritVowels,
  validateInput 
} from '../shared-utils.js';

// Export constants from shared utilities for backward compatibility
export const vrddhiVowels = SanskritVowels.vrddhi.iast;
export const vrddhiVowelsDevanagari = SanskritVowels.vrddhi.devanagari;

// Re-export shared function
export { isVrddhi } from '../shared-utils.js';

/**
 * Gets all vṛddhi vowels in both IAST and Devanagari scripts.
 * Enhanced with shared utilities data.
 *
 * @returns {Object} Object containing IAST and Devanagari vṛddhi vowels.
 */
export function getAllVrddhiVowels() {
  return {
    iast: [...SanskritVowels.vrddhi.iast],
    devanagari: [...SanskritVowels.vrddhi.devanagari],
    combined: [...SanskritVowels.vrddhi.iast, ...SanskritVowels.vrddhi.devanagari],
    description: SanskritVowels.vrddhi.description
  };
}

/**
 * Analyzes a vowel and provides detailed information about its vṛddhi status.
 * Enhanced with shared utilities and Sutra 1.1.1 specific context.
 *
 * @param {string} vowel The vowel to analyze.
 * @returns {Object} Analysis object with detailed information.
 */
export function analyzeVowel(vowel) {
  const validation = validateInput(vowel, 'string', 'vowel');
  if (!validation.isValid) {
    return {
      vowel: null,
      isValid: false,
      isVrddhi: false,
      script: null,
      category: null,
      explanation: validation.error
    };
  }

  const baseAnalysis = analyzeVowelShared(vowel);
  
  // Add Sutra 1.1.1 specific context
  let category = null;
  if (vowel === 'ā' || vowel === 'आ') category = 'long-a';
  else if (vowel === 'ai' || vowel === 'ऐ') category = 'diphthong-ai';
  else if (vowel === 'au' || vowel === 'औ') category = 'diphthong-au';

  return {
    vowel: vowel,
    isValid: baseAnalysis.isValid,
    isVrddhi: baseAnalysis.classifications.isVrddhi,
    script: baseAnalysis.script,
    category: category || baseAnalysis.category,
    sutraContext: '1.1.1',
    vrddhiStatus: baseAnalysis.classifications.isVrddhi ? 'vṛddhi vowel' : 'non-vṛddhi vowel',
    traditionalDefinition: 'ā, ai, au are called vṛddhi vowels',
    explanation: baseAnalysis.classifications.isVrddhi ? 
      `${vowel} is a vṛddhi vowel (${category || baseAnalysis.category})` : 
      `${vowel} is not a vṛddhi vowel`,
    // Include shared analysis for cross-sutra compatibility
    sharedAnalysis: baseAnalysis
  };
}

/**
 * Applies Sutra 1.1.1 to classify a given vowel according to vṛddhi definition.
 * Enhanced with shared utilities validation and analysis.
 *
 * @param {string} vowel The vowel to classify.
 * @returns {Object} Classification result with detailed analysis.
 */
export function applySutra111(vowel) {
  const analysis = analyzeVowel(vowel);
  
  return {
    input: vowel,
    sutraApplied: '1.1.1',
    sutraName: 'vṛddhirādaic',
    classification: analysis.isVrddhi ? 'vṛddhi' : 'non-vṛddhi',
    isVrddhi: analysis.isVrddhi,
    category: analysis.category,
    script: analysis.script,
    explanation: analysis.explanation,
    traditionalDefinition: analysis.traditionalDefinition,
    examples: {
      'long-a': ['kāraḥ (कारः) - action', 'nāma (नाम) - name'],
      'diphthong-ai': ['vaidya (वैद्य) - physician', 'saika (सैक) - collection'],
      'diphthong-au': ['gaura (गौर) - fair', 'mauna (मौन) - silence']
    }[analysis.category] || [],
    // Enhanced metadata from shared utilities
    metadata: {
      allClassifications: analysis.sharedAnalysis.classifications,
      primaryClassification: analysis.sharedAnalysis.primaryClassification,
      enhancedWith: 'shared-utils.js'
    }
  };
}

// Maintain backward compatibility by exporting original function names
export {
  analyzeVowel as analyzeVrddhiVowel,
  applySutra111 as applyVrddhiClassification
};
