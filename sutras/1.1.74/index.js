/**
 * Sutra 1.1.74: त्यदादीनि वृद्धम् (tyadādīni vṛddham)
 * 
 * Text: त्यदादीनि वृद्धम्
 * Translation: The words त्यद् etc. are called वृद्धम्।
 * 
 * This sutra extends the definition of वृद्धम् beyond phonetic criteria (Sutra 1.1.73) 
 * to include specific pronouns and pronominal words beginning with त्यद् (tyad).
 * Traditional commentaries indicate this refers to certain archaic or dialectal 
 * pronominal forms that should be classified as वृद्धम् regardless of their 
 * phonetic structure.
 * 
 * This is a lexical (word-list based) extension to the phonetic वृद्धम् definition.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

// Traditional त्यदादि words based on Sanskrit commentaries
// These are words that get वृद्धम् designation lexically, not phonetically
const TYAD_ADI_WORDS = {
  iast: [
    'tyad',      // त्यद् - archaic/dialectal form related to तद्
    'tyat',      // त्यत् - variant of त्यद्
    'tyena',     // त्येन - instrumental of त्यद्
    'tyed',      // त्येद् - archaic variant
    'tysya',     // त्यस्य - genitive form
    'tye',       // त्ये - dual/locative forms
    // Additional traditional forms from commentaries
    'tyam',      // त्यम् - accusative neuter
    'tyā',       // त्या - instrumental feminine
    'tyāni',     // त्यानि - plural neuter nominative
  ],
  devanagari: [
    'त्यद्',      // त्यद्
    'त्यत्',      // त्यत्
    'त्येन',      // त्येन
    'त्येद्',      // त्येद्
    'त्यस्य',     // त्यस्य
    'त्ये',       // त्ये
    'त्यम्',      // त्यम्
    'त्या',       // त्या
    'त्यानि',     // त्यानि
  ]
};

/**
 * Checks if a word is in the त्यदादि list and should be classified as वृद्धम्
 * according to Sutra 1.1.74.
 * 
 * @param {string} word - The word to check (IAST or Devanagari)
 * @returns {boolean} True if the word is in त्यदादि list, false otherwise
 */
function isTyadAdi(word) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  // Basic validation
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return false;
  }

  const trimmedWord = word.trim();
  
  // Check both scripts
  return TYAD_ADI_WORDS.iast.includes(trimmedWord) || 
         TYAD_ADI_WORDS.devanagari.includes(trimmedWord);
}

/**
 * Checks if a word should be classified as वृद्धम् according to Sutra 1.1.74.
 * This includes words in the त्यदादि list.
 * 
 * @param {string} word - The word to check
 * @param {Object} [context={}] - Optional analysis context
 * @returns {boolean} True if word is वृद्धम् by Sutra 1.1.74, false otherwise
 */
function isVrddhamByTyadAdi(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  return isTyadAdi(word);
}

/**
 * Provides detailed analysis of whether a word qualifies as वृद्धम् 
 * according to Sutra 1.1.74.
 * 
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Optional analysis context
 * @returns {Object} Analysis result with detailed information
 */
function analyzeTyadAdiVrddham(word, context = {}) {
  const result = {
    word: word,
    script: detectScript(word),
    isVrddhamByTyadAdi: false,
    category: null,
    confidence: 0,
    reasoning: [],
    linguisticNotes: [],
    sutraReference: '1.1.74'
  };

  if (!word || typeof word !== 'string') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    return result;
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    result.reasoning.push(`Invalid Sanskrit word: ${validation.message}`);
    return result;
  }

  const trimmedWord = word.trim();

  // Check if word is in त्यदादि list
  if (isTyadAdi(trimmedWord)) {
    result.isVrddhamByTyadAdi = true;
    result.category = 'tyad-adi-pronoun';
    result.confidence = 1.0;
    result.reasoning.push('Word found in traditional त्यदादि list');
    result.linguisticNotes.push('Classified as वृद्धम् lexically, not phonetically');
    result.linguisticNotes.push('Traditional pronominal form with वृद्धम् designation');
  } else {
    result.reasoning.push('Word not found in त्यदादि list');
    result.linguisticNotes.push('Does not qualify for वृद्धम् under Sutra 1.1.74');
  }

  return result;
}

/**
 * Gets all words in the त्यदादि category.
 * 
 * @returns {Object} Object containing all त्यदादि words in both scripts
 */
function getAllTyadAdiWords() {
  return {
    iast: [...TYAD_ADI_WORDS.iast],
    devanagari: [...TYAD_ADI_WORDS.devanagari],
    combined: [...TYAD_ADI_WORDS.iast, ...TYAD_ADI_WORDS.devanagari]
  };
}

// Export all functions
export {
  isTyadAdi,
  isVrddhamByTyadAdi,
  analyzeTyadAdiVrddham,
  getAllTyadAdiWords
};
