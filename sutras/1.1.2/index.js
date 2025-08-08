/**
 * Sutra 1.1.2: अदेङ् गुणः (adeṅ guṇaḥ)
 *
 * This sutra defines the term "guṇa". It states that the vowels a (अ), e (ए), and o (ओ) are called guṇa.
 * In Pāṇini's system, "aT" (अत्) refers to "a" and "eṅ" (एঙ্) is a pratyāhāra (abbreviation)
 * that includes the vowels "e" (ए) and "o" (ও).
 */

// Import shared utilities
import { SanskritVowels } from '../shared/constants.js';
import { detectScript } from '../shared/script-detection.js';
import { isGuna as sharedIsGuna, getVowelClassifications } from '../shared/classification.js';
import { analyzeVowel as sharedAnalyzeVowel } from '../shared/vowel-analysis.js';
import { validateVowel } from '../shared/validation.js';

// Re-export isGuna for backward compatibility
export { isGuna } from '../shared/classification.js';

/**
 * Gets all guṇa vowels in both IAST and Devanagari scripts.
 *
 * @returns {Object} Object containing IAST and Devanagari guṇa vowels.
 */
function getAllGunaVowels() {
  return {
    iast: [...SanskritVowels.guna.iast],
    devanagari: [...SanskritVowels.guna.devanagari],
    combined: [...SanskritVowels.guna.iast, ...SanskritVowels.guna.devanagari]
  };
}

/**
 * Analyzes a vowel and provides detailed information about its guṇa status.
 * Enhanced version using shared utilities for better cross-sutra compatibility.
 *
 * @param {string} vowel The vowel to analyze.
 * @returns {Object} Analysis object with detailed information.
 */
function analyzeVowel(vowel) {
  // Use shared validation first
  const validation = validateVowel(vowel);
  if (!validation.isValid) {
    return {
      vowel: null,
      isValid: false,
      isGuna: false,
      script: null,
      category: null,
      explanation: validation.error
    };
  }

  // Use shared analysis with guṇa-specific enhancements
  const sharedAnalysis = sharedAnalyzeVowel(vowel);
  const isGunaVowel = sharedIsGuna(vowel);
  
  // Determine specific guṇa category
  let category = null;
  if (vowel === 'a' || vowel === 'अ') category = 'basic-a';
  else if (vowel === 'e' || vowel === 'ए') category = 'front-mid';
  else if (vowel === 'o' || vowel === 'ও') category = 'back-mid';

  return {
    vowel: vowel,
    isValid: true,
    isGuna: isGunaVowel,
    script: sharedAnalysis.script,
    category: category,
    classifications: sharedAnalysis.classifications,
    explanation: isGunaVowel ? 
      `${vowel} is a guṇa vowel (${category})` : 
      `${vowel} is not a guṇa vowel`,
    sharedAnalysis: sharedAnalysis // Include comprehensive analysis
  };
}

/**
 * Applies Sutra 1.1.2 to classify a given vowel according to guṇa definition.
 *
 * @param {string} vowel The vowel to classify.
 * @returns {Object} Classification result with detailed analysis.
 */
function applySutra112(vowel) {
  const analysis = analyzeVowel(vowel);
  
  return {
    input: vowel,
    sutraApplied: '1.1.2',
    sutraName: 'adeṅ guṇaḥ',
    classification: analysis.isGuna ? 'guṇa' : 'non-guṇa',
    isGuna: analysis.isGuna,
    category: analysis.category,
    script: analysis.script,
    explanation: analysis.explanation,
    traditionalDefinition: 'a, e, o are called guṇa vowels',
    examples: {
      'basic-a': ['agni (अग्नि) - fire', 'artha (অর্থ) - meaning'],
      'front-mid': ['eka (एक) - one', 'eva (এব) - indeed'],
      'back-mid': ['ojas (ওজস্) - vigor', 'oṃ (ওং) - sacred syllable']
    }[analysis.category] || [],
    detailedAnalysis: analysis // Include full analysis for advanced usage
  };
}

// Export constants for backward compatibility
export const gunaVowels = SanskritVowels.guna.iast;
export const gunaVowelsDevanagari = SanskritVowels.guna.devanagari;

// Export functions
export {
  getAllGunaVowels,
  analyzeVowel,
  applySutra112
};
