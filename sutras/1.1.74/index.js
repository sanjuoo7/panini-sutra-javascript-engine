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

import { 
  isVrddhamLexical, 
  isTyadAdi as utilityIsTyadAdi, 
  analyzeVrddham, 
  getAllTyadAdiWords as utilityGetAllTyadAdiWords
} from '../sanskrit-utils/vrddham-analysis.js';

/**
 * Checks if a word is in the त्यदादि list and should be classified as वृद्धम्
 * according to Sutra 1.1.74.
 * 
 * @param {string} word - The word to check (IAST or Devanagari)
 * @returns {boolean} True if the word is in त्यदादि list
 */
export function isTyadAdi(word) {
  return utilityIsTyadAdi(word);
}

/**
 * Checks if a word should be classified as वृद्धम् according to Sutra 1.1.74.
 * This includes words in the त्यदादि list.
 * 
 * @param {string} word - The word to check
 * @param {Object} [context={}] - Optional analysis context
 * @returns {boolean} True if word is वृद्धम् by Sutra 1.1.74, false otherwise
 */
export function isVrddhamByTyadAdi(word, context = {}) {
  return isVrddhamLexical(word);
}

/**
 * Provides detailed analysis of whether a word qualifies as वृद्धम् 
 * according to Sutra 1.1.74.
 * 
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Optional analysis context
 * @returns {Object} Analysis result with detailed information
 */
export function analyzeTyadAdiVrddham(word, context = {}) {
  const result = {
    word: word,
    script: null,
    isVrddhamByTyadAdi: false,
    sutraApplies: false,
    category: null,
    confidence: 0.0,
    reasoning: [],
    linguisticNotes: [],
    traditionalNote: "This sutra extends वृद्धम् classification to specific pronominal forms based on lexical criteria",
    relatedRules: ["1.1.73", "1.1.75"], // Other वृद्धम् rules
    tyadAdiWords: utilityGetAllTyadAdiWords(),
    sutraReference: '1.1.74'
  };

  // Handle invalid inputs
  if (!word || typeof word !== 'string' || word.trim() === '') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    return result;
  }

  const analysis = analyzeVrddham(word, context);
  
  result.script = analysis.script;
  result.isVrddhamByTyadAdi = analysis.classifications.lexical;
  result.sutraApplies = analysis.classifications.lexical;
  result.category = analysis.classifications.lexical ? 'tyad-adi-pronoun' : null;
  result.confidence = analysis.classifications.lexical ? 1.0 : 0.0;

  if (analysis.classifications.lexical) {
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
export function getAllTyadAdiWords() {
  return utilityGetAllTyadAdiWords();
}
