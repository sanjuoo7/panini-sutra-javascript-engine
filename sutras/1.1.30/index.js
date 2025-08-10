/**
 * Sutra 1.1.30: तृतीयासमासे (tṛtīyāsamāse)
 * "In the Instrumental Determinative Compounds the words सर्व etc. are not सर्वनाम।"
 * 
 * This is a sañjñā (definition) sutra that specifies an exception to the सर्वनाम classification.
 * In तृतीयासमास (instrumental determinative compounds), words like सर्व, विश्व, उभ, etc.
 * do not function as सर्वनाम (pronouns).
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.30
 */

import { detectScript } from '../sanskrit-utils/index.js';
import { SanskritWordLists } from '../sanskrit-utils/constants.js';

/**
 * List of words that are normally सर्वनाम but lose this classification in तृतीयासमास
 * Using shared constants for consistency across sutras
 */
const SARVA_WORDS = [
  ...SanskritWordLists.sarvaadi.iast,
  ...SanskritWordLists.sarvaadi.devanagari
];

/**
 * Checks if a compound is a तृतीयासमास (instrumental determinative compound)
 * 
 * @param {string} compound - The compound word to analyze
 * @param {Object} context - Grammatical context including compound type
 * @returns {boolean} - True if it's a तृतीयासमास
 */
export function isTritiyasamasa(compound, context = {}) {
  if (!compound) {
    return false;
  }

  // Check if explicitly marked as तृतीयासमास
  if (context.compoundType === 'tritiyasamasa' || 
      context.compoundType === 'instrumental_determinative') {
    return true;
  }

  // Check for instrumental compound patterns
  // तृतीयासमास typically involves instrumental case relationship
  if (context.semanticRelation === 'instrumental' ||
      context.semanticRelation === 'karana') {
    return true;
  }

  return false;
}

/**
 * Checks if a word normally classified as सर्वनाम loses this classification in तृतीयासमास
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if सर्वनाम classification is lost
 */
export function loseSarvanameInTritiyasamasa(word, context = {}) {
  if (!word) {
    return false;
  }

  // Check if the word is normally a सर्वनाम word
  const isSarvaWord = SARVA_WORDS.includes(word.toLowerCase()) || 
                      SARVA_WORDS.includes(word);

  if (!isSarvaWord) {
    return false;
  }

  // Check if we're in a तृतीयासमास context
  return isTritiyasamasa(context.compound || word, context);
}

/**
 * Determines if a word should be treated as सर्वनाम considering Sutra 1.1.30
 * 
 * @param {string} word - The word to classify
 * @param {Object} context - Grammatical and compound context
 * @returns {boolean} - True if the word functions as सर्वनाम
 */
export function isSarvanama(word, context = {}) {
  if (!word) {
    return false;
  }

  // Check if it's normally a सर्वनाम word
  const isNormallySarva = SARVA_WORDS.includes(word.toLowerCase()) || 
                          SARVA_WORDS.includes(word);

  if (!isNormallySarva) {
    return false;
  }

  // Apply Sutra 1.1.30: lose सर्वनाम status in तृतीयासमास
  if (loseSarvanameInTritiyasamasa(word, context)) {
    return false;
  }

  return true;
}

/**
 * Analyzes compound context to determine सर्वनाम classification
 * 
 * @param {string} compound - The compound word
 * @param {Array} constituents - Array of compound constituents
 * @param {Object} context - Grammatical context
 * @returns {Object} - Analysis result
 */
export function analyzeCompoundSarvaname(compound, constituents = [], context = {}) {
  if (!compound || !Array.isArray(constituents)) {
    return {
      isTritiyasamasa: false,
      sarvanameWords: [],
      nonSarvanameWords: [],
      sutraApplied: false
    };
  }

  const isTritiya = isTritiyasamasa(compound, context);
  const sarvanameWords = [];
  const nonSarvanameWords = [];
  
  constituents.forEach(word => {
    if (isSarvanama(word, { ...context, compound })) {
      sarvanameWords.push(word);
    } else {
      nonSarvanameWords.push(word);
    }
  });

  return {
    isTritiyasamasa: isTritiya,
    sarvanameWords,
    nonSarvanameWords,
    sutraApplied: isTritiya && constituents.some(word => 
      SARVA_WORDS.includes(word.toLowerCase()) || SARVA_WORDS.includes(word)
    )
  };
}

/**
 * Gets examples of तृतीयासमास where सर्व etc. lose सर्वनाम status
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {Object} - Examples categorized by type
 */
export function getTritiyasamasaExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return {
      instrumentalCompounds: [
        'सर्वकाम', 'विश्वकर्मा', 'उभयपक्ष', 'अन्यगोत्र', 'एकहस्त'
      ],
      descriptions: [
        'सर्व + काम = सर्वकाम (all desires)',
        'विश्व + कर्मा = विश्वकर्मा (all actions)', 
        'उभय + पक्ष = उभयपक्ष (both sides)',
        'अन्य + गोत्र = अन्यगोत्र (other lineage)',
        'एक + हस्त = एकहस्त (one hand)'
      ]
    };
  } else {
    return {
      instrumentalCompounds: [
        'sarvakāma', 'viśvakarmā', 'ubhayapakṣa', 'anyagotra', 'ekahasta'
      ],
      descriptions: [
        'sarva + kāma = sarvakāma (all desires)',
        'viśva + karmā = viśvakarmā (all actions)',
        'ubhaya + pakṣa = ubhayapakṣa (both sides)', 
        'anya + gotra = anyagotra (other lineage)',
        'eka + hasta = ekahasta (one hand)'
      ]
    };
  }
}

/**
 * Validates compound type and applies appropriate सर्वनाम rules
 * 
 * @param {string} compound - The compound to validate
 * @param {Object} analysis - Compound analysis
 * @param {Object} context - Grammatical context
 * @returns {Object} - Validation result
 */
export function validateSarvanameInCompound(compound, analysis = {}, context = {}) {
  const result = analyzeCompoundSarvaname(compound, analysis.constituents, context);
  
  return {
    compound,
    isValid: true,
    tritiyasamasaDetected: result.isTritiyasamasa,
    sutra1130Applied: result.sutraApplied,
    sarvanameCount: result.sarvanameWords.length,
    affectedWords: result.nonSarvanameWords.filter(word => 
      SARVA_WORDS.includes(word.toLowerCase()) || SARVA_WORDS.includes(word)
    ),
    recommendation: result.sutraApplied ? 
      'Words like सर्व lose सर्वनाम status in this तृतीयासमास' : 
      'Normal सर्वनाम classification applies'
  };
}
