
/**
 * Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic)
 *
 * This sutra defines the term "vṛddhi". It states that the vowels ā (आ), ai (ऐ), and au (औ) are called vṛddhi.
 * In Pāṇini's system, "āT" (आत्) refers to "ā" and "aiC" (ऐच्) is a pratyāhāra (abbreviation)
 * that includes the vowels "ai" (ऐ) and "au" (औ).
 * 
 * This is the foundational sutra that establishes the vowel categories used throughout Sanskrit grammar.
 * 
 * Enhanced with shared utilities integration for consistency and maintainability.
 */

// Import shared utilities for enhanced functionality
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { SanskritVowels } from '../sanskrit-utils/constants.js';

// Use centralized vṛddhi vowel definitions from shared constants
const vrddhiVowels = SanskritVowels.vrddhi.iast;
const vrddhiVowelsDevanagari = SanskritVowels.vrddhi.devanagari;

// Enhanced vowel category mapping
const vowelCategoryMap = {
  'ā': 'long-a', 'आ': 'long-a',
  'ai': 'diphthong-ai', 'ऐ': 'diphthong-ai', 
  'au': 'diphthong-au', 'औ': 'diphthong-au'
};

/**
 * Checks if a given vowel is a vṛddhi vowel.
 *
 * @param {string} vowel The vowel to check (IAST or Devanagari).
 * @returns {boolean} True if the vowel is a vṛddhi vowel, false otherwise.
 */
function isVrddhi(vowel) {
  if (!vowel) return false;
  return vrddhiVowels.includes(vowel) || vrddhiVowelsDevanagari.includes(vowel);
}

/**
 * Gets all vṛddhi vowels in both IAST and Devanagari scripts.
 *
 * @returns {Object} Object containing IAST and Devanagari vṛddhi vowels.
 */
function getAllVrddhiVowels() {
  return {
    iast: [...vrddhiVowels],
    devanagari: [...vrddhiVowelsDevanagari],
    combined: [...vrddhiVowels, ...vrddhiVowelsDevanagari]
  };
}

/**
 * Analyzes a vowel and provides detailed information about its vṛddhi status.
 * Enhanced with shared script detection and improved error handling.
 *
 * @param {string} vowel The vowel to analyze.
 * @returns {Object} Analysis object with detailed information.
 */
function analyzeVowel(vowel) {
  // Enhanced input validation
  if (!vowel || typeof vowel !== 'string') {
    return {
      vowel: vowel,
      isValid: false,
      isVrddhi: false,
      script: null,
      category: null,
      explanation: 'Invalid or empty vowel input'
    };
  }

  // Use shared script detection for consistency
  const script = detectScript(vowel);
  const isVrddhiVowel = isVrddhi(vowel);
  const category = vowelCategoryMap[vowel] || null;
  
  return {
    vowel: vowel,
    isValid: true,
    isVrddhi: isVrddhiVowel,
    script: script,
    category: category,
    explanation: isVrddhiVowel ? 
      `${vowel} is a vṛddhi vowel (${category})` : 
      `${vowel} is not a vṛddhi vowel`,
    traditionalClassification: isVrddhiVowel ? 'vṛddhi' : 'non-vṛddhi'
  };
}

/**
 * Applies Sutra 1.1.1 to classify a given vowel according to vṛddhi definition.
 *
 * @param {string} vowel The vowel to classify.
 * @returns {Object} Classification result with detailed analysis.
 */
function applySutra111(vowel) {
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
    traditionalDefinition: 'ā, ai, au are called vṛddhi vowels',
    examples: {
      'ā': ['kāraḥ (कारः) - action', 'nāma (नाम) - name'],
      'ai': ['vaidya (वैद्य) - physician', 'saika (सैक) - collection'],
      'au': ['gaura (गौर) - fair', 'mauna (मौन) - silence']
    }[analysis.category] || []
  };
}

export {
  isVrddhi,
  vrddhiVowels,
  vrddhiVowelsDevanagari,
  getAllVrddhiVowels,
  analyzeVowel,
  applySutra111
};
