/**
 * Sutra 1.1.19: ईदूतौ च सप्तम्यर्थे (īdūtau ca saptamyarthe)
 * "The final ई and ऊ of words giving the sense of the locative case are pragṛhya."
 * 
 * This sutra extends pragṛhya rules to words ending in ī and ū when they 
 * express locative meaning.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.19
 */

import { detectScript } from '../shared/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.18/index.js';

/**
 * Checks if a word ending in ī or ū with locative sense is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including case meaning
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaIU(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    const { hasLocativeSense = false, meaning } = context;
    
    // Must express locative meaning (सप्तम्यर्थे)
    if (!hasLocativeSense && meaning !== 'locative') {
      return false;
    }
    
    // Check for final ī or ū (vowel signs, not independent vowels)
    if (script === 'Devanagari') {
      return word.endsWith('ी') || word.endsWith('ू');
    } else {
      return word.endsWith('ī') || word.endsWith('ū');
    }
  } catch (error) {
    return false;
  }
}

/**
 * Checks if a word has locative meaning based on common patterns
 * 
 * @param {string} word - The word to check
 * @returns {boolean} - True if the word likely has locative sense
 */
export function hasLocativeMeaning(word) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    
    // Common locative-meaning words ending in ī/ū
    const locativeWords = {
      iast: [
        'addhī', 'parī', 'prabhṛtī', 'yāvat', 'tāvat',
        'kadā', 'tada', 'kutra', 'tatra', 'yatra', 'sarvatra'
      ],
      devanagari: [
        'अद्धी', 'परी', 'प्रभृती', 'यावत्', 'तावत्',
        'कदा', 'तदा', 'कुत्र', 'तत्र', 'यत्र', 'सर्वत्र'
      ]
    };
    
    if (script === 'Devanagari') {
      return locativeWords.devanagari.includes(word) ||
             (word.endsWith('ी') && (word.includes('त्र') || word.includes('दा'))) ||
             (word.endsWith('ू') && word.includes('यावत्'));
    } else {
      return locativeWords.iast.includes(word) ||
             (word.endsWith('ī') && (word.includes('tr') || word.includes('dā'))) ||
             (word.endsWith('ū') && word.includes('yāvat'));
    }
  } catch (error) {
    return false;
  }
}

/**
 * Main pragṛhya check that includes this sutra's rule
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word is pragṛhya
 */
export function isPragrhya(word, context = {}) {
  // Check base pragṛhya rules from previous sutras
  if (basePragrhya(word, context)) {
    return true;
  }
  
  // If locative sense is not explicitly provided, try to infer it
  if (!context.hasLocativeSense && !context.meaning) {
    const inferredContext = { 
      ...context, 
      hasLocativeSense: hasLocativeMeaning(word) 
    };
    return isPragrhyaIU(word, inferredContext);
  }
  
  // Check this sutra's specific rule
  return isPragrhyaIU(word, context);
}

/**
 * Gets examples of ī/ū words with locative sense
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of example words
 */
export function getLocativeIUExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['अद्धी', 'परी', 'प्रभृती', 'कुत्र', 'तत्र', 'यत्र'];
  } else {
    return ['addhī', 'parī', 'prabhṛtī', 'kutra', 'tatra', 'yatra'];
  }
}

/**
 * Checks if pragṛhya behavior should apply according to this sutra
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if pragṛhya rules apply
 */
export function hasPragrhyaBehavior(word, context = {}) {
  return isPragrhya(word, context);
}
