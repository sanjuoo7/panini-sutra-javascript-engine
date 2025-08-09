/**
 * Sutra 1.1.24: ष्णान्ता षट्
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra establishes the technical term "षट्" (ṣaṭ) for संख्या (numerals)
 * that end in ष् (ṣ) or न् (n). This classification is important for
 * specific grammatical operations that apply to this subset of numerals.
 * 
 * षट् refers to संख्या words ending in:
 * 1. ष् - e.g., षष् (six), विंशतिष् 
 * 2. न् - e.g., सप्तन्, अष्टन्, नवन्, दशन्
 * 
 * The most common example is षष् (six), which gives the classification
 * its name. This class includes various forms of numerals that share
 * these terminal sounds.
 */

import { detectScript } from '../shared/script-detection.js';
import { isSankhya } from '../1.1.23/index.js';

// षट् numerals - संख्या words ending in ष् or न्
const SHAT_NUMERALS = {
  IAST: {
    sha_ending: [
      'ṣaṣ',        // six (primary example)
      'viṃśatiṣ',   // twenty (alternative form)
      'triṃśaṣ',    // thirty (alternative form)
      'catvāriṃśaṣ' // forty (alternative form)
    ],
    na_ending: [
      'saptan',     // seven
      'aṣṭan',      // eight
      'navan',      // nine
      'daśan',      // ten (alternative form)
      'ekādaśan',   // eleven (alternative form)
      'dvādaśan',   // twelve (alternative form)
      'śatan',      // hundred (alternative form)
      'sahasran'    // thousand (alternative form)
    ]
  },
  Devanagari: {
    sha_ending: [
      'षष्',        // six
      'विंशतिष्',   // twenty (alternative form)
      'त्रिंशष्',    // thirty (alternative form) 
      'चत्वारिंशष्' // forty (alternative form)
    ],
    na_ending: [
      'सप्तन्',     // seven
      'अष्टन्',      // eight
      'नवन्',       // nine
      'दशन्',       // ten (alternative form)
      'एकादशन्',   // eleven (alternative form)
      'द्वादशन्',   // twelve (alternative form)
      'शतन्',       // hundred (alternative form)
      'सहस्रन्'    // thousand (alternative form)
    ]
  }
};

/**
 * Check if a word is षट् (numeral ending in ष् or न्)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is षट्
 */
export function isShat(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const wordList = SHAT_NUMERALS[script];
  
  if (!wordList) return false;
  
  // Check both ष्-ending and न्-ending categories
  return Object.values(wordList).some(category => 
    category.includes(word)
  );
}

/**
 * Get all षट् numerals in specified script
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Object containing षट् numeral categories
 */
export function getShatNumerals(script = 'IAST') {
  return SHAT_NUMERALS[script] || SHAT_NUMERALS.IAST;
}

/**
 * Check if a संख्या ends in ष् or न्
 * @param {string} word - The word to check
 * @return {Object} Analysis of ष्/न् ending
 */
export function checkShatEnding(word) {
  if (!word || typeof word !== 'string') {
    return { isShat: false, ending: null, script: null };
  }
  
  const script = detectScript(word);
  
  // Check endings based on script
  if (script === 'IAST') {
    if (word.endsWith('ṣ')) {
      return { isShat: true, ending: 'ṣ', script, word };
    }
    if (word.endsWith('n')) {
      return { isShat: true, ending: 'n', script, word };
    }
  } else if (script === 'Devanagari') {
    if (word.endsWith('ष्')) {
      return { isShat: true, ending: 'ष्', script, word };
    }
    if (word.endsWith('न्')) {
      return { isShat: true, ending: 'न्', script, word };
    }
  }
  
  return { isShat: false, ending: null, script };
}

/**
 * Identify the type of षट् ending
 * @param {string} word - The word to analyze
 * @return {Object} Detailed analysis result
 */
export function identifyShatType(word) {
  if (!word || typeof word !== 'string') {
    return { isShat: false, type: null, ending: null, script: null };
  }
  
  // First check if it's a known षट् numeral
  if (isShat(word)) {
    const script = detectScript(word);
    const wordList = SHAT_NUMERALS[script];
    
    for (const [type, words] of Object.entries(wordList)) {
      if (words.includes(word)) {
        const ending = type === 'sha_ending' ? 
          (script === 'IAST' ? 'ṣ' : 'ष्') : 
          (script === 'IAST' ? 'n' : 'न्');
        
        return {
          isShat: true,
          type: type.replace('_ending', ''),
          ending,
          script,
          word,
          isKnownNumeral: true
        };
      }
    }
  }
  
  // Check if it's a संख्या with षट् ending pattern
  if (isSankhya(word)) {
    const endingAnalysis = checkShatEnding(word);
    if (endingAnalysis.isShat) {
      const type = endingAnalysis.ending === 'ṣ' || endingAnalysis.ending === 'ष्' ? 'sha' : 'na';
      return {
        isShat: true,
        type,
        ending: endingAnalysis.ending,
        script: endingAnalysis.script,
        word,
        isKnownNumeral: false
      };
    }
  }
  
  return { isShat: false, type: null, ending: null, script: detectScript(word) };
}

/**
 * Check if a word has षट् behavior
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits षट् behavior
 */
export function hasShatBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct षट् classification
  if (isShat(word)) return true;
  
  // Check if it's a संख्या with षट् ending
  const analysis = identifyShatType(word);
  if (analysis.isShat) return true;
  
  // Context-based षट् behavior
  if (context.morphology === 'numeral' && 
      (context.ending === 'ṣ' || context.ending === 'n' || 
       context.ending === 'ष्' || context.ending === 'न्')) {
    return true;
  }
  
  return false;
}

/**
 * Get षट् examples for each ending type
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Examples organized by ending type
 */
export function getShatExamples(script = 'IAST') {
  const numerals = getShatNumerals(script);
  
  return {
    sha_ending: numerals.sha_ending.slice(0, 3),  // First 3 ष्-ending
    na_ending: numerals.na_ending.slice(0, 5)     // First 5 न्-ending
  };
}

/**
 * Check if a word is a specific type of षट्
 * @param {string} word - The word to check
 * @param {string} endingType - The ending type ('sha' or 'na')
 * @return {boolean} True if the word has the specified ending type
 */
export function isShatWithEnding(word, endingType) {
  if (!word || !endingType) return false;
  
  const analysis = identifyShatType(word);
  return analysis.isShat && analysis.type === endingType;
}

/**
 * Get the primary example of षट् (which is षष्/ṣaṣ - six)
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {string} The primary षट् example
 */
export function getPrimaryShatExample(script = 'IAST') {
  return script === 'Devanagari' ? 'षष्' : 'ṣaṣ';
}

export { SHAT_NUMERALS };
