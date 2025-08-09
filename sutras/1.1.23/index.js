/**
 * Sutra 1.1.23: संख्या
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra establishes the technical term "संख्या" (saṅkhyā) for numerals.
 * It defines the grammatical category of numerical words that express quantity.
 * 
 * संख्या refers to:
 * 1. Cardinal numbers (एक, द्वि, त्रि, चतुर्, पञ्च etc.)
 * 2. Ordinal numbers (प्रथम, द्वितीय, तृतीय etc.) 
 * 3. Multiplicative numbers (द्विगुण, त्रिगुण etc.)
 * 4. Fractional numbers (अर्ध, पाद etc.)
 * 5. Collective numbers (द्वय, त्रय etc.)
 */

import { detectScript } from '../shared/script-detection.js';

// Comprehensive list of संख्या (numerals)
const SANKHYA_WORDS = {
  IAST: {
    cardinal: [
      'eka', 'dvi', 'tri', 'catur', 'pañca', 'ṣaṣ', 'sapta', 'aṣṭa', 'nava', 'daśa',
      'ekādaśa', 'dvādaśa', 'trayodaśa', 'caturdaśa', 'pañcadaśa', 'ṣoḍaśa',
      'saptadaśa', 'aṣṭādaśa', 'navadaśa', 'viṃśati', 'triṃśat', 'catvāriṃśat',
      'pañcāśat', 'ṣaṣṭi', 'saptati', 'aśīti', 'navati', 'śata', 'sahasra'
    ],
    ordinal: [
      'prathama', 'dvitīya', 'tṛtīya', 'caturtha', 'pañcama', 'ṣaṣṭha',
      'saptama', 'aṣṭama', 'navama', 'daśama', 'ekādaśa', 'dvādaśa'
    ],
    multiplicative: [
      'dviguṇa', 'triguṇa', 'caturguṇa', 'pañcaguṇa', 'ṣaḍguṇa',
      'saptaguṇa', 'aṣṭaguṇa', 'navaguṇa', 'daśaguṇa'
    ],
    fractional: [
      'ardha', 'pāda', 'tṛtīya', 'caturtha', 'pañcama', 'ṣaṣṭha'
    ],
    collective: [
      'dvaya', 'traya', 'catuṣka', 'pañcaka', 'ṣaṭka', 'saptaka', 'aṣṭaka'
    ]
  },
  Devanagari: {
    cardinal: [
      'एक', 'द्वि', 'त्रि', 'चतुर्', 'पञ्च', 'षष्', 'सप्त', 'अष्ट', 'नव', 'दश',
      'एकादश', 'द्वादश', 'त्रयोदश', 'चतुर्दश', 'पञ्चदश', 'षोडश',
      'सप्तदश', 'अष्टादश', 'नवदश', 'विंशति', 'त्रिंशत्', 'चत्वारिंशत्',
      'पञ्चाशत्', 'षष्टि', 'सप्तति', 'अशीति', 'नवति', 'शत', 'सहस्र'
    ],
    ordinal: [
      'प्रथम', 'द्वितीय', 'तृतीय', 'चतुर्थ', 'पञ्चम', 'षष्ठ',
      'सप्तम', 'अष्टम', 'नवम', 'दशम', 'एकादश', 'द्वादश'
    ],
    multiplicative: [
      'द्विगुण', 'त्रिगुण', 'चतुर्गुण', 'पञ्चगुण', 'षड्गुण',
      'सप्तगुण', 'अष्टगुण', 'नवगुण', 'दशगुण'
    ],
    fractional: [
      'अर्ध', 'पाद', 'तृतीय', 'चतुर्थ', 'पञ्चम', 'षष्ठ'
    ],
    collective: [
      'द्वय', 'त्रय', 'चतुष्क', 'पञ्चक', 'षट्क', 'सप्तक', 'अष्टक'
    ]
  }
};

/**
 * Check if a word is a संख्या (numeral)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is a संख्या
 */
export function isSankhya(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const wordList = SANKHYA_WORDS[script];
  
  if (!wordList) return false;
  
  // Check all categories of numerals
  return Object.values(wordList).some(category => 
    category.includes(word)
  );
}

/**
 * Get all संख्या words in specified script
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Object containing all numeral categories
 */
export function getSankhyaWords(script = 'IAST') {
  return SANKHYA_WORDS[script] || SANKHYA_WORDS.IAST;
}

/**
 * Identify the type of संख्या
 * @param {string} word - The word to analyze
 * @return {Object} Analysis result with type and properties
 */
export function identifySankhyaType(word) {
  if (!word || typeof word !== 'string') {
    return { isSankhya: false, type: null, script: null };
  }
  
  const script = detectScript(word);
  const wordList = SANKHYA_WORDS[script];
  
  if (!wordList) {
    return { isSankhya: false, type: null, script };
  }
  
  for (const [type, words] of Object.entries(wordList)) {
    if (words.includes(word)) {
      return {
        isSankhya: true,
        type,
        script,
        word
      };
    }
  }
  
  return { isSankhya: false, type: null, script };
}

/**
 * Check if a word has संख्या behavior
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits संख्या behavior
 */
export function hasSankhyaBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct संख्या classification
  if (isSankhya(word)) return true;
  
  // Context-based संख्या behavior
  if (context.semantics === 'quantity' || context.role === 'numeral') {
    return true;
  }
  
  return false;
}

/**
 * Get संख्या examples for each category
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Examples organized by category
 */
export function getSankhyaExamples(script = 'IAST') {
  const words = getSankhyaWords(script);
  
  return {
    cardinal: words.cardinal.slice(0, 5),      // First 5 cardinal numbers
    ordinal: words.ordinal.slice(0, 5),       // First 5 ordinal numbers
    multiplicative: words.multiplicative.slice(0, 3), // First 3 multiplicatives
    fractional: words.fractional.slice(0, 3), // First 3 fractionals
    collective: words.collective.slice(0, 3)  // First 3 collectives
  };
}

/**
 * Check if a word is a specific type of संख्या
 * @param {string} word - The word to check
 * @param {string} type - The type to check for ('cardinal', 'ordinal', etc.)
 * @return {boolean} True if the word is of the specified type
 */
export function isSankhyaType(word, type) {
  if (!word || !type) return false;
  
  const analysis = identifySankhyaType(word);
  return analysis.isSankhya && analysis.type === type;
}

/**
 * Get the numerical value for cardinal संख्या
 * @param {string} word - The cardinal numeral
 * @return {number|null} The numerical value or null if not a cardinal
 */
export function getSankhyaValue(word) {
  if (!word) return null;
  
  const analysis = identifySankhyaType(word);
  if (!analysis.isSankhya || analysis.type !== 'cardinal') return null;
  
  const script = analysis.script;
  const cardinals = SANKHYA_WORDS[script].cardinal;
  const index = cardinals.indexOf(word);
  
  if (index === -1) return null;
  
  // Map index to actual numerical value
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000];
  
  return values[index] || null;
}

export { SANKHYA_WORDS };
