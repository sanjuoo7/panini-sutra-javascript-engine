import { 
  isVrddhamPhonetic, 
  analyzeVrddham, 
  VRDDHAM_TYPES 
} from '../sanskrit-utils/vrddham-analysis.js';

/**
 * Sutra 1.1.73: वृद्धिर्यस्याचामादिस्तद् वृद्धम्
 * "That word, among the vowels of which the first is a वृद्धि, is called वृद्धम्।"
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.73
 */

/**
 * Determines if a Sanskrit word is वृद्धम् (vṛddham) according to Sutra 1.1.73.
 * A word is वृद्धम् if its first vowel is a वृद्धि vowel (आ, ऐ, औ).
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {boolean} True if the word is वृद्धम्, false otherwise.
 */
export function isVrddham(word) {
  return isVrddhamPhonetic(word);
}

/**
 * Provides comprehensive analysis of whether a word qualifies as वृद्धम्
 * according to Sutra 1.1.73 (phonetic criteria).
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {Object} Detailed analysis of the word's वृद्धम् qualification
 */
export function analyzeVrddhamStatus(word) {
  const analysis = analyzeVrddham(word);
  
  return {
    word: word,
    isVrddham: analysis.classifications.phonetic,
    sutraApplies: analysis.classifications.phonetic,
    firstVowel: analysis.vowelAnalysis?.firstVowel || null,
    isVrddhi: analysis.vowelAnalysis?.isVrddhi || false,
    confidence: analysis.classifications.phonetic ? 1.0 : 0.0,
    reasoning: analysis.classifications.phonetic 
      ? `Word qualifies as वृद्धम् under Sutra 1.1.73 - first vowel '${analysis.vowelAnalysis?.firstVowel}' is वृद्धि`
      : analysis.reasoning,
    traditionalNote: "This sutra establishes the primary phonetic criterion for वृद्धम् classification",
    relatedRules: ["1.1.74", "1.1.75"] // Other वृद्धम् rules
  };
}
