/**
 * Sutra 1.1.75: एङ् प्राचां देशे (eṅ prācāṃ deśe)
 * 
 * Text: एङ् प्राचां देशे
 * Translation: A word that has the letters ए and ओ as the first among its vowels, gets also the designation of वृद्धम्।
 * 
 * This sutra extends the definition of वृद्धम् to include words where e (ए) or o (ओ) 
 * appears as the first vowel, but only according to the Eastern Grammarians (प्राच्याः).
 * This represents a dialectal or regional variation in grammatical interpretation.
 * 
 * The एङ् (eṅ) pratyāhāra includes e (ए) and o (ओ) vowels.
 * The term प्राचां देशे indicates this rule applies "in the eastern regions" or 
 * "according to eastern grammarians."
 */

import { 
  isVrddhamEastern, 
  isEngVowel, 
  analyzeVrddham, 
  getAllEngVowels 
} from '../sanskrit-utils/vrddham-analysis.js';

/**
 * Checks if a phoneme is an एङ् vowel (e or o).
 * 
 * @param {string} phoneme - The phoneme to check
 * @returns {boolean} True if phoneme is e or o, false otherwise
 */
export function isEngVowel(phoneme) {
  return isEngVowel(phoneme);
}

/**
 * Checks if a word qualifies as वृद्धम् according to the Eastern tradition (Sutra 1.1.75).
 * A word qualifies if its first vowel is e (ए) or o (ओ) and the Eastern tradition is enabled.
 * 
 * @param {string} word - The word to check
 * @param {Object} [context={}] - Optional context with tradition settings
 * @returns {boolean} True if word is वृद्धम् by Eastern rule, false otherwise
 */
export function isVrddhamByEasternRule(word, context = {}) {
  return isVrddhamEastern(word, context);
}

/**
 * Provides detailed analysis of whether a word qualifies as वृद्धम् 
 * according to Sutra 1.1.75 (Eastern tradition).
 * 
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Optional analysis context
 * @returns {Object} Analysis result with detailed information
 */
export function analyzeEasternVrddham(word, context = {}) {
  const result = {
    word: word,
    script: null,
    isVrddhamByEasternRule: false,
    sutraApplies: false,
    category: null,
    confidence: 0.0,
    reasoning: [],
    linguisticNotes: [],
    traditionalNote: "This sutra applies only in the Eastern grammatical tradition",
    relatedRules: ["1.1.73", "1.1.74"], // Other वृद्धम् rules
    engVowels: getAllEngVowels(),
    sutraReference: '1.1.75'
  };

  // Handle invalid inputs
  if (!word || typeof word !== 'string' || word.trim() === '') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    return result;
  }

  const analysis = analyzeVrddham(word, context);
  
  result.script = analysis.script;
  result.isVrddhamByEasternRule = analysis.classifications.eastern;
  result.sutraApplies = analysis.classifications.eastern;
  result.category = analysis.classifications.eastern ? 'eastern-regional-vrddham' : null;
  result.confidence = analysis.classifications.eastern ? 0.8 : 0.0;

  if (analysis.classifications.eastern) {
    result.reasoning.push('Word qualifies as वृद्धम् under Eastern tradition - first vowel is एङ्');
    result.linguisticNotes.push('Regional/dialectal classification as वृद्धम्');
    result.linguisticNotes.push('Recognized only in Eastern grammatical tradition');
  } else {
    const isEasternEnabled = context.tradition === 'eastern' || 
                            context.region === 'prācya' || 
                            context.allowEasternRules || 
                            context.includeOptionalRules;
    
    if (!isEasternEnabled) {
      result.reasoning.push('Eastern tradition not enabled - rule does not apply');
    } else {
      result.reasoning.push('Word does not have एङ् vowel as first vowel');
    }
    result.linguisticNotes.push('Does not qualify for वृद्धम् under Eastern rule');
  }

  return result;
}

/**
 * Gets all एङ् vowels (e and o) in both scripts.
 * 
 * @returns {Object} Object containing all एङ् vowels
 */
export function getAllEngVowels() {
  return getAllEngVowels();
}

/**
 * Legacy function for backward compatibility.
 * Checks if a word is considered वृद्धम् according to Eastern grammarians.
 * 
 * @param {string} word - The word to check
 * @param {Object} [options={}] - Optional configuration
 * @returns {boolean} True if word is वृद्धम् by Eastern rule
 */
export function isVrddhamByPracya(word, options = {}) {
  const context = {
    tradition: 'eastern',
    ...options
  };
  return isVrddhamEastern(word, context);
}
