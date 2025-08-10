/**
 * Sutra 1.1.11: ईदूदेद्द्विवचनं प्रगृह्यम् (īdūdedvidvacanaṃ pragṛhyam)
 * "A dual case affix ending in ई or ऊ or ए is called प्रगृह्य, 
 * or excepted vowels which do not admit संधि or conjugation."
 * 
 * This is a saṃjñā (definition) sutra that defines प्रगृह्य (pragṛhya) - 
 * sounds that do not undergo sandhi transformations.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.11
 */

import { detectScript, isVowel } from '../sanskrit-utils/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaDualEnding as isPragrhyaDualEndingShared,
  analyzePragrhya,
  preventsSandhi as preventsSandhiShared,
  getPragrhyaExamples as getPragrhyaExamplesShared
} from '../sanskrit-utils/pragrhya-analysis.js';

/**
 * Checks if a word is प्रगृह्य according to Sutra 1.1.11 and previous rules
 * 
 * @param {string} word - The word or sound to check
 * @param {Object} context - Grammatical context (number, case, etc.)
 * @returns {boolean} - True if the sound is प्रगृह्य
 */
export function isPragrhya(word, context = {}) {
  if (!word) {
    return false;
  }

  // Use shared pragrhya analysis, but limit to sutras up to 1.1.11
  return isPragrhyaShared(word, context, ['1.1.11']);
}

/**
 * Checks if a word ending qualifies as प्रगृह्य according to Sutra 1.1.11
 * (dual case endings in ī, ū, or e)
 * 
 * @param {string} word - The word to check
 * @param {boolean} isDual - Whether the word is in dual number
 * @returns {boolean} - True if the word ending is प्रगृह्य
 */
export function isPragrhyaDualEnding(word, isDual = false) {
  if (!word || !isDual) {
    return false;
  }

  try {
    const script = detectScript(word);
    let ending;

    if (script === 'Devanagari') {
      ending = word.slice(-1);
      // Check for dual endings in Devanagari: ी (ī), ू (ū), े (e) - diacritic forms
      return ['ी', 'ू', 'े'].includes(ending);
    } else {
      // IAST script or mixed script - check last character
      ending = word.slice(-1);
      // Check for dual endings in IAST: ī, ū, e
      return ['ī', 'ū', 'e'].includes(ending);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Checks if sandhi should be prevented due to प्रगृह्य status
 * 
 * @param {string} firstWord - First word in potential sandhi
 * @param {string} secondWord - Second word in potential sandhi
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if sandhi should be prevented
 */
export function preventsSandhi(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  return preventsSandhiShared(firstWord, secondWord, context);
}

/**
 * Provides comprehensive analysis of प्रगृह्य status
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Grammatical context
 * @returns {Object} Detailed प्रगृह्य analysis
 */
export function analyzePragrhyaStatus(word, context = {}) {
  if (!word) {
    return {
      isPragrhya: false,
      ending: null,
      reason: 'no_word',
      resistsSandhi: false
    };
  }

  const script = detectScript(word);
  let ending;

  if (script === 'Devanagari') {
    ending = word.slice(-1);
  } else {
    ending = word.slice(-1);
  }

  const isDual = context.isDual || false;
  const isPragrhyaWord = isPragrhyaDualEnding(word, isDual);

  let reason;
  if (!isDual) {
    reason = 'not_dual_context';
  } else if (ending === 'ī' || ending === 'ई') {
    reason = isPragrhyaWord ? 'dual_ending_ii' : 'not_pragrhya_ending';
  } else if (ending === 'ū' || ending === 'ू') {
    reason = isPragrhyaWord ? 'dual_ending_uu' : 'not_pragrhya_ending';
  } else if (ending === 'e' || ending === 'े') {
    reason = isPragrhyaWord ? 'dual_ending_e' : 'not_pragrhya_ending';
  } else {
    reason = 'not_pragrhya_ending';
  }

  return {
    isPragrhya: isPragrhyaWord,
    ending: ending,
    reason: reason,
    resistsSandhi: isPragrhyaWord,
    sandhiBlocked: isPragrhyaWord && !!context.followingWord,
    script: script
  };
}

/**
 * Gets examples of प्रगृह्य words for educational purposes
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {Object} Examples categorized by ending type
 */
export function getPragrhyaExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return {
      iiEndings: ['देवी', 'नदी', 'स्त्री', 'लक्ष्मी', 'सरस्वती'],
      uuEndings: ['वधू', 'चमू', 'तनू', 'भू', 'रेणू'],
      eEndings: ['अग्ने', 'मित्रे', 'वरुणे', 'इन्द्राग्ने', 'अश्विने']
    };
  } else {
    return {
      iiEndings: ['devī', 'nadī', 'strī', 'lakṣmī', 'sarasvatī'],
      uuEndings: ['vadhū', 'camū', 'tanū', 'bhū', 'reṇū'],
      eEndings: ['agne', 'mitre', 'varuṇe', 'indragne', 'aśvine']
    };
  }
}

/**
 * Checks if a word resists sandhi due to प्रगृह्य status
 * 
 * @param {string} firstWord - First word
 * @param {string} secondWord - Following word
 * @param {Object} context - Grammatical context
 * @returns {boolean} True if sandhi is resisted
 */
export function checkSandhiResistance(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  // Check if first word is प्रगृह्य in dual context
  const pragrhyaAnalysis = analyzePragrhyaStatus(firstWord, { isDual: true, followingWord: secondWord });
  return pragrhyaAnalysis.isPragrhya;
}
