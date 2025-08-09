/**
 * Sutra 1.1.29: न बहुव्रीहौ
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra states that सर्व etc. words are NOT सर्वनाम when they
 * occur in बहुव्रीही compounds (with exceptions from 1.1.28).
 * 
 * This is a general negation rule that removes सर्वनाम status
 * in बहुव्रीही contexts, creating an exception to 1.1.27.
 */

import { detectScript } from '../shared/script-detection.js';
import { isSarvanama } from '../1.1.27/index.js';

/**
 * Check if सर्वनाम status is negated in बहुव्रीही compound
 * @param {string} word - The word to check
 * @param {Object} context - Compound context
 * @return {Object} Analysis of सर्वनाम negation
 */
export function checkSarvanamaNegationInBahuvriihi(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return { negated: false, reason: null };
  }
  
  // Must be a सर्वनाम word first
  if (!isSarvanama(word)) {
    return { negated: false, reason: 'not_sarvanama' };
  }
  
  // Check if in बहुव्रीही context
  if (context.compoundType === 'bahuvriihi' || context.compoundType === 'बहुव्रीही') {
    return {
      negated: true,
      reason: 'bahuvriihi_compound',
      sutra: '1.1.29',
      explanation: 'सर्वनाम words are not सर्वनाम in बहुव्रीही compounds'
    };
  }
  
  return { negated: false, reason: 'not_bahuvriihi' };
}

/**
 * Sutra 1.1.30: तृतीयासमासे
 * 
 * This sutra states that सर्व etc. words are NOT सर्वनाम in 
 * instrumental determinative compounds (तृतीयासमास).
 */

/**
 * Check if सर्वनाम status is negated in instrumental compound
 * @param {string} word - The word to check
 * @param {Object} context - Compound context
 * @return {Object} Analysis of सर्वनाम negation
 */
export function checkSarvanamaNegationInInstrumental(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return { negated: false, reason: null };
  }
  
  // Must be a सर्वनाम word first
  if (!isSarvanama(word)) {
    return { negated: false, reason: 'not_sarvanama' };
  }
  
  // Check if in instrumental determinative compound context
  if (context.compoundType === 'instrumental' || 
      context.compoundType === 'तृतीयासमास' ||
      context.case === 'instrumental' ||
      context.vibhakti === 'tṛtīyā' ||
      context.vibhakti === 'तृतीया') {
    return {
      negated: true,
      reason: 'instrumental_compound',
      sutra: '1.1.30',
      explanation: 'सर्वनाम words are not सर्वनाम in instrumental determinative compounds'
    };
  }
  
  return { negated: false, reason: 'not_instrumental_compound' };
}

/**
 * Sutra 1.1.31: द्वन्द्वे च
 * 
 * This sutra states that सर्व etc. words are NOT सर्वनाम in 
 * द्वन्द्व (copulative/collective) compounds.
 */

// Common द्वन्द्व compound patterns
const DVANDVA_PATTERNS = {
  IAST: [
    'sarvānya',       // all and other
    'sarvabahu',      // all and many
    'sarveka',        // all and one
    'anyabahu',       // other and many
    'sarvaviśva',     // all and universal
    'viśvānya',       // universal and other
    'ekaanya',        // one and other
    'bahveka'         // many and one
  ],
  Devanagari: [
    'सर्वान्य',       // all and other
    'सर्वबहु',        // all and many
    'सर्वेक',         // all and one
    'अन्यबहु',        // other and many
    'सर्वविश्व',      // all and universal
    'विश्वान्य',      // universal and other
    'एकान्य',         // one and other
    'बह्वेक'          // many and one
  ]
};

/**
 * Check if a compound appears to be द्वन्द्व
 * @param {string} compound - The compound to check
 * @return {boolean} True if appears to be द्वन्द्व
 */
export function isDvandvaCompound(compound) {
  if (!compound || typeof compound !== 'string') return false;
  
  const script = detectScript(compound);
  const patterns = DVANDVA_PATTERNS[script] || [];
  
  return patterns.includes(compound);
}

/**
 * Check if सर्वनाम status is negated in द्वन्द्व compound
 * @param {string} word - The word to check
 * @param {Object} context - Compound context
 * @return {Object} Analysis of सर्वनाम negation
 */
export function checkSarvanamaNegationInDvandva(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return { negated: false, reason: null };
  }
  
  // Must be a सर्वनाम word first
  if (!isSarvanama(word)) {
    return { negated: false, reason: 'not_sarvanama' };
  }
  
  // Check if in द्वन्द्व context
  if (context.compoundType === 'dvandva' || 
      context.compoundType === 'द्वन्द्व' ||
      isDvandvaCompound(context.compound || word)) {
    return {
      negated: true,
      reason: 'dvandva_compound',
      sutra: '1.1.31',
      explanation: 'सर्वनाम words are not सर्वनाम in द्वन्द्व compounds'
    };
  }
  
  return { negated: false, reason: 'not_dvandva' };
}

/**
 * Comprehensive सर्वनाम analysis with all compound exceptions (1.1.29-1.1.31)
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @return {Object} Complete analysis with all exceptions
 */
export function analyzeSarvanamaWithCompoundExceptions(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return { isSarvanama: false, status: null, exceptions: [] };
  }
  
  // Base सर्वनाम status from 1.1.27
  const baseSarvanama = isSarvanama(word);
  
  if (!baseSarvanama) {
    return { 
      isSarvanama: false, 
      status: 'not_sarvanama', 
      exceptions: [],
      baseStatus: 'not_sarvanama_by_1.1.27'
    };
  }
  
  const exceptions = [];
  
  // Check 1.1.29 - बहुव्रीही negation
  const bahuvriihiCheck = checkSarvanamaNegationInBahuvriihi(word, context);
  if (bahuvriihiCheck.negated) {
    exceptions.push(bahuvriihiCheck);
  }
  
  // Check 1.1.30 - instrumental compound negation
  const instrumentalCheck = checkSarvanamaNegationInInstrumental(word, context);
  if (instrumentalCheck.negated) {
    exceptions.push(instrumentalCheck);
  }
  
  // Check 1.1.31 - द्वन्द्व negation
  const dvandvaCheck = checkSarvanamaNegationInDvandva(word, context);
  if (dvandvaCheck.negated) {
    exceptions.push(dvandvaCheck);
  }
  
  // Determine final status
  const hasNegatingExceptions = exceptions.length > 0;
  
  return {
    isSarvanama: !hasNegatingExceptions, // Negated if any exception applies
    status: hasNegatingExceptions ? 'sarvanama_negated_by_compound' : 'definite_sarvanama',
    exceptions,
    baseStatus: 'sarvanama_by_1.1.27',
    appliedSutras: exceptions.map(ex => ex.sutra).filter(Boolean)
  };
}

/**
 * Check which compound type negates सर्वनाम status
 * @param {Object} context - Compound context
 * @return {Array} List of applicable negating sutras
 */
export function getApplicableNegationSutras(context = {}) {
  const applicable = [];
  
  // 1.1.29 - बहुव्रीही
  if (context.compoundType === 'bahuvriihi' || context.compoundType === 'बहुव्रीही') {
    applicable.push('1.1.29');
  }
  
  // 1.1.30 - instrumental
  if (context.compoundType === 'instrumental' || 
      context.compoundType === 'तृतीयासमास' ||
      context.case === 'instrumental') {
    applicable.push('1.1.30');
  }
  
  // 1.1.31 - द्वन्द्व
  if (context.compoundType === 'dvandva' || 
      context.compoundType === 'द्वन्द्व' ||
      isDvandvaCompound(context.compound)) {
    applicable.push('1.1.31');
  }
  
  return applicable;
}

/**
 * Get examples of द्वन्द्व compounds with सर्वनाम elements
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Array} Examples of द्वन्द्व patterns
 */
export function getDvandvaExamples(script = 'IAST') {
  return DVANDVA_PATTERNS[script] || DVANDVA_PATTERNS.IAST;
}

/**
 * Check if a word loses सर्वनाम status due to compound context
 * @param {string} word - The word to check
 * @param {Object} context - Compound context
 * @return {boolean} True if सर्वनाम status is lost
 */
export function losesSarvanamaInCompound(word, context = {}) {
  if (!word || !isSarvanama(word)) return false;
  
  const analysis = analyzeSarvanamaWithCompoundExceptions(word, context);
  return !analysis.isSarvanama && analysis.exceptions.length > 0;
}

/**
 * Get the reason for सर्वनाम negation
 * @param {string} word - The word to check
 * @param {Object} context - Compound context
 * @return {string|null} The reason for negation or null
 */
export function getSarvanamaNegationReason(word, context = {}) {
  const analysis = analyzeSarvanamaWithCompoundExceptions(word, context);
  
  if (analysis.exceptions.length > 0) {
    return analysis.exceptions[0].explanation;
  }
  
  return null;
}

export { DVANDVA_PATTERNS };
