/**
 * Sutra 1.1.25: डति च
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra extends the षट् classification from 1.1.24 to include
 * संख्या (numerals) that end with the affix डति. This continues
 * the definition started in the previous sutra.
 * 
 * Combined with 1.1.24 (ष्णान्ता षट्), this sutra establishes that
 * षट् includes:
 * 1. संख्या ending in ष् or न् (from 1.1.24)
 * 2. संख्या ending with डति affix (from this sutra)
 * 
 * Examples with डति:
 * - कति (how many) + डति
 * - यति (as many) + डति  
 * - तति (so many) + डति
 * 
 * This classification is important for grammatical operations
 * that specifically target this extended class of numerals.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { SanskritWordLists } from '../sanskrit-utils/constants.js';
import { isShat } from '../1.1.24/index.js';
import { isSankhya } from '../1.1.23/index.js';

// डति affix forms used with संख्या
const DATI_AFFIX_FORMS = {
  IAST: {
    affix: 'ḍati',
    examples: [
      'kati',      // how many (कति + डति)
      'yati',      // as many (यति + डति)
      'tati',      // so many (तति + डति)
      'iyati',     // this many (इयति + डति)
      'kiyati',    // how much (कियति + डति)
      'etati'      // this much (एतति + डति)
    ]
  },
  Devanagari: {
    affix: 'डति',
    examples: [
      'कति',      // how many
      'यति',      // as many
      'तति',      // so many
      'इयति',     // this many
      'कियति',    // how much
      'एतति'      // this much
    ]
  }
};

/**
 * Check if a word ends with डति affix
 * @param {string} word - The word to check
 * @return {boolean} True if the word ends with डति
 */
export function hasDateAffix(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  
  if (script === 'IAST') {
    return word.endsWith('ḍati') || word.endsWith('ti'); // ti as simplified form
  } else if (script === 'Devanagari') {
    return word.endsWith('डति') || word.endsWith('ति'); // ति as simplified form
  }
  
  return false;
}

/**
 * Check if a word is a डति-form संख्या (षट् by 1.1.25)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is षट् due to डति affix
 */
export function isShatByDati(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = DATI_AFFIX_FORMS[script]?.examples || [];
  
  return examples.includes(word);
}

/**
 * Check if a word is षट् (combining 1.1.24 and 1.1.25)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is षट्
 */
export function isShatExtended(word) {
  if (!word || typeof word !== 'string') return false;
  
  // षट् from 1.1.24 (ष्/न् endings)
  if (isShat(word)) return true;
  
  // षट् from 1.1.25 (डति affix)
  if (isShatByDati(word)) return true;
  
  return false;
}

/**
 * Get all डति affix forms
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} डति affix forms and examples
 */
export function getDatiAffixForms(script = 'IAST') {
  return DATI_AFFIX_FORMS[script] || DATI_AFFIX_FORMS.IAST;
}

/**
 * Analyze डति affix usage in a word
 * @param {string} word - The word to analyze
 * @return {Object} Analysis of डति usage
 */
export function analyzeDatiUsage(word) {
  if (!word || typeof word !== 'string') {
    return { hasDati: false, type: null, script: null };
  }
  
  const script = detectScript(word);
  
  // Check if it's a known डति form
  if (isShatByDati(word)) {
    return {
      hasDati: true,
      type: 'known_form',
      script,
      word,
      affix: script === 'IAST' ? 'ḍati' : 'डति'
    };
  }
  
  // Check if it has डति affix pattern
  if (hasDateAffix(word)) {
    return {
      hasDati: true,
      type: 'affix_pattern',
      script,
      word,
      affix: script === 'IAST' ? 'ḍati' : 'डति'
    };
  }
  
  return { hasDati: false, type: null, script };
}

/**
 * Identify the complete षट् classification (1.1.24 + 1.1.25)
 * @param {string} word - The word to analyze
 * @return {Object} Complete षट् analysis
 */
export function identifyCompleteShatType(word) {
  if (!word || typeof word !== 'string') {
    return { isShat: false, source: null, type: null, script: null };
  }
  
  const script = detectScript(word);
  
  // Check 1.1.24 classification (ष्/न् endings)
  if (isShat(word)) {
    // Import and use the detailed analysis from 1.1.24
    const shatAnalysis = require('../1.1.24/index.js').identifyShatType(word);
    return {
      isShat: true,
      source: '1.1.24',
      type: shatAnalysis.type,
      ending: shatAnalysis.ending,
      script,
      word
    };
  }
  
  // Check 1.1.25 classification (डति affix)
  const datiAnalysis = analyzeDatiUsage(word);
  if (datiAnalysis.hasDati) {
    return {
      isShat: true,
      source: '1.1.25',
      type: 'dati_affix',
      affix: datiAnalysis.affix,
      script,
      word
    };
  }
  
  return { isShat: false, source: null, type: null, script };
}

/**
 * Check if a word has complete षट् behavior (1.1.24 + 1.1.25)
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits षट् behavior
 */
export function hasCompleteShatBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct षट् classification (extended)
  if (isShatExtended(word)) return true;
  
  // Context-based षट् behavior
  if (context.morphology === 'numeral' && 
      (context.affix === 'ḍati' || context.affix === 'डति')) {
    return true;
  }
  
  return false;
}

/**
 * Get examples of डति-based षट् forms
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Array} Examples of डति forms
 */
export function getDatiShatExamples(script = 'IAST') {
  const forms = getDatiAffixForms(script);
  return forms.examples.slice(0, 4); // First 4 examples
}

/**
 * Check if a word is interrogative संख्या with डति
 * @param {string} word - The word to check
 * @return {boolean} True if interrogative numeral with डति
 */
export function isInterrogativeDati(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  const interrogatives = script === 'IAST' 
    ? SanskritWordLists.interrogatives.iast 
    : SanskritWordLists.interrogatives.devanagari;
  
  return interrogatives.includes(word);
}

/**
 * Check if a word is demonstrative संख्या with डति
 * @param {string} word - The word to check
 * @return {boolean} True if demonstrative numeral with डति
 */
export function isDemonstrativeDati(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  const demonstratives = script === 'IAST' ? 
    ['tati', 'iyati', 'etati'] : 
    ['तति', 'इयति', 'एतति'];
  
  return demonstratives.includes(word);
}

export { DATI_AFFIX_FORMS };
