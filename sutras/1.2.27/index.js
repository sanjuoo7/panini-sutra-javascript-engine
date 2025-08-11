/**
 * Sutra 1.2.27: ऊकालोऽज्झ्रस्वदीर्घप्लुतः
 * 
 * Sanskrit: ऊकालोऽज्झ्रस्वदीर्घप्लुतः
 * Transliteration: ūkālo-'c-hrasva-dīrgha-plutaḥ
 * Translation: "Based on the duration of ऊ, vowels are (called) ह्रस्व (short), दीर्घ (long), and प्लुत (protracted)"
 * 
 * This is a संज्ञा (technical definition) sutra that establishes the fundamental 
 * classification of vowel duration in Sanskrit phonetics. It defines three categories 
 * of vowel length based on the temporal measurement standard of ऊ (long u):
 * 
 * 1. ह्रस्व (hrasva): Short vowels - 1 unit duration (अ, इ, उ, ऋ, ऌ)
 * 2. दीर्घ (dīrgha): Long vowels - 2 units duration (आ, ई, ऊ, ॠ, ॡ, ए, ऐ, ओ, औ)
 * 3. प्लुत (pluta): Protracted vowels - 3+ units duration (प्लुत अ, प्लुत आ, etc.)
 * 
 * The ऊकाल (ū-kāla) serves as the fundamental temporal unit for measuring vowel duration.
 * 
 * Type: संज्ञा (technical definition)
 * Scope: Phonetic - defines fundamental vowel duration categories
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.27
 */

import { 
  validateSanskritWord 
} from '../sanskrit-utils/validation.js';

import {
  detectScript
} from '../sanskrit-utils/script-detection.js';

import {
  isVowel
} from '../sanskrit-utils/classification.js';

import {
  tokenizePhonemes
} from '../sanskrit-utils/phoneme-tokenization.js';

/**
 * ह्रस्व (short) vowels - 1 ऊकाल duration
 */
const HRASVA_VOWELS = {
  devanagari: ['अ', 'इ', 'उ', 'ऋ', 'ऌ', 'ि', 'ु', 'ृ', 'ॢ'],
  iast: ['a', 'i', 'u', 'ṛ', 'ḷ']
};

/**
 * दीर्घ (long) vowels - 2 ऊकाल duration
 */
const DIRGHA_VOWELS = {
  devanagari: ['आ', 'ई', 'ऊ', 'ॠ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ', 'ा', 'ी', 'ू', 'ॄ', 'ॣ', 'े', 'ै', 'ो', 'ौ'],
  iast: ['ā', 'ī', 'ū', 'ṝ', 'ḹ', 'e', 'ai', 'o', 'au']
};

/**
 * प्लुत vowel markers and patterns
 */
const PLUTA_MARKERS = {
  devanagari: ['३', '॥', '३॥'], // traditional प्लुत notation
  iast: ['3', '||', '3||']      // conventional transliteration
};

/**
 * Duration values in ऊकाल units
 */
const DURATION_VALUES = {
  hrasva: 1,    // 1 ऊकाल
  dirgha: 2,    // 2 ऊकाल  
  pluta: 3      // 3+ ऊकाल (minimum)
};

/**
 * Checks if a vowel is ह्रस्व (short)
 * @param {string} vowel - The vowel to check
 * @returns {boolean} True if vowel is ह्रस्व
 */
export function isHrasvaVowel(vowel) {
  if (!vowel || typeof vowel !== 'string') {
    return false;
  }

  const script = detectScript(vowel);
  if (script === 'Devanagari') {
    return HRASVA_VOWELS.devanagari.includes(vowel);
  } else {
    return HRASVA_VOWELS.iast.includes(vowel);
  }
}

/**
 * Checks if a vowel is दीर्घ (long)
 * @param {string} vowel - The vowel to check
 * @returns {boolean} True if vowel is दीर्घ
 */
export function isDirghaVowel(vowel) {
  if (!vowel || typeof vowel !== 'string') {
    return false;
  }

  const script = detectScript(vowel);
  if (script === 'Devanagari') {
    return DIRGHA_VOWELS.devanagari.includes(vowel);
  } else {
    return DIRGHA_VOWELS.iast.includes(vowel);
  }
}

/**
 * Checks if a vowel or sequence is प्लुत (protracted)
 * @param {string} sequence - The sequence to check for प्लुत markers
 * @returns {boolean} True if sequence contains प्लुत markers
 */
export function isPlutaVowel(sequence) {
  if (!sequence || typeof sequence !== 'string') {
    return false;
  }

  const script = detectScript(sequence);
  if (script === 'Devanagari') {
    return PLUTA_MARKERS.devanagari.some(marker => sequence.includes(marker));
  } else {
    return PLUTA_MARKERS.iast.some(marker => sequence.includes(marker));
  }
}

/**
 * Determines the duration category of a vowel
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Additional context
 * @param {boolean} context.checkPluta - Whether to check for प्लुत markers
 * @returns {Object} Duration analysis result
 */
export function getVowelDuration(vowel, context = {}) {
  if (!vowel || typeof vowel !== 'string') {
    return {
      duration: null,
      category: null,
      ukalaUnits: 0,
      analysis: 'Invalid vowel input'
    };
  }

  // Check for प्लुत first (if enabled and context allows)
  if (context.checkPluta && isPlutaVowel(vowel)) {
    return {
      duration: 'प्लुत',
      category: 'pluta',
      ukalaUnits: DURATION_VALUES.pluta,
      analysis: `Vowel '${vowel}' contains प्लुत markers indicating 3+ ऊकाल duration`,
      durationClass: 'protracted'
    };
  }

  // Check for दीर्घ vowels
  if (isDirghaVowel(vowel)) {
    return {
      duration: 'दीर्घ',
      category: 'dirgha', 
      ukalaUnits: DURATION_VALUES.dirgha,
      analysis: `Vowel '${vowel}' is दीर्घ with 2 ऊकाल duration`,
      durationClass: 'long'
    };
  }

  // Check for ह्रस्व vowels  
  if (isHrasvaVowel(vowel)) {
    return {
      duration: 'ह्रस्व',
      category: 'hrasva',
      ukalaUnits: DURATION_VALUES.hrasva,
      analysis: `Vowel '${vowel}' is ह्रस्व with 1 ऊकाल duration`,
      durationClass: 'short'
    };
  }

  // If not recognized as a vowel
  if (!isVowel(vowel)) {
    return {
      duration: null,
      category: null,
      ukalaUnits: 0,
      analysis: `'${vowel}' is not recognized as a vowel`,
      durationClass: null
    };
  }

  // Vowel recognized but duration category unclear
  return {
    duration: 'अज्ञात',
    category: 'unknown',
    ukalaUnits: 0,
    analysis: `Vowel '${vowel}' recognized but duration category unclear`,
    durationClass: 'unknown'
  };
}

/**
 * Analyzes all vowels in a word for their duration patterns
 * @param {string} word - The word to analyze
 * @param {Object} context - Analysis context
 * @param {boolean} context.checkPluta - Whether to check for प्लुत markers
 * @param {boolean} context.detailed - Provide detailed phoneme analysis
 * @returns {Object} Comprehensive vowel duration analysis
 */
export function analyzeWordVowelDurations(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return {
      vowelAnalysis: [],
      durationSummary: {},
      totalUkalaUnits: 0,
      analysis: 'Invalid word input'
    };
  }

  const phonemes = tokenizePhonemes(word);
  if (!phonemes.phonemes) {
    return {
      vowelAnalysis: [],
      durationSummary: {},
      totalUkalaUnits: 0,
      analysis: 'Could not tokenize word phonemes'
    };
  }

  const vowelAnalysis = [];
  let totalUkalaUnits = 0;
  const durationCounts = { hrasva: 0, dirgha: 0, pluta: 0, unknown: 0 };

  phonemes.phonemes.forEach((phoneme, index) => {
    if (isVowel(phoneme)) {
      const duration = getVowelDuration(phoneme, context);
      vowelAnalysis.push({
        phoneme,
        position: index,
        ...duration
      });
      
      totalUkalaUnits += duration.ukalaUnits || 0;
      if (duration.category && durationCounts.hasOwnProperty(duration.category)) {
        durationCounts[duration.category]++;
      } else {
        durationCounts.unknown++;
      }
    }
  });

  const durationSummary = {
    ह्रस्व: durationCounts.hrasva,
    दीर्घ: durationCounts.dirgha,
    प्लुत: durationCounts.pluta,
    अज्ञात: durationCounts.unknown,
    कुल_स्वर: vowelAnalysis.length
  };

  return {
    vowelAnalysis,
    durationSummary,
    totalUkalaUnits,
    averageUkalaPerVowel: vowelAnalysis.length > 0 ? totalUkalaUnits / vowelAnalysis.length : 0,
    analysis: `Word '${word}' contains ${vowelAnalysis.length} vowels with total duration of ${totalUkalaUnits} ऊकाल units`,
    phonemes: context.detailed ? phonemes : undefined
  };
}

/**
 * Converts duration between different measurement systems
 * @param {number} ukalaUnits - Duration in ऊकाल units
 * @param {string} targetSystem - Target measurement system
 * @returns {Object} Converted duration
 */
export function convertVowelDuration(ukalaUnits, targetSystem = 'matra') {
  if (typeof ukalaUnits !== 'number' || ukalaUnits < 0) {
    return {
      originalUkala: ukalaUnits,
      converted: null,
      system: targetSystem,
      error: 'Invalid ऊकाल units'
    };
  }

  let converted;
  switch (targetSystem) {
    case 'matra':
      // 1 ऊकाल = 1 मात्रा (traditional prosodic unit)
      converted = ukalaUnits;
      break;
    case 'mora':
      // 1 ऊकाल = 1 mora (linguistic unit)
      converted = ukalaUnits;
      break;
    case 'relative':
      // Relative to ह्रस्व as base unit
      converted = ukalaUnits / DURATION_VALUES.hrasva;
      break;
    default:
      return {
        originalUkala: ukalaUnits,
        converted: null,
        system: targetSystem,
        error: `Unknown target system: ${targetSystem}`
      };
  }

  return {
    originalUkala: ukalaUnits,
    converted,
    system: targetSystem,
    description: getSystemDescription(targetSystem)
  };
}

/**
 * Helper function to get system descriptions
 * @param {string} system - The measurement system
 * @returns {string} Description of the system
 */
function getSystemDescription(system) {
  const descriptions = {
    matra: 'मात्रा (traditional prosodic measurement)',
    mora: 'Mora (linguistic temporal unit)',
    relative: 'Relative to ह्रस्व as unit 1'
  };
  return descriptions[system] || 'Unknown system';
}

/**
 * Main function implementing Sutra 1.2.27
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context object
 * @param {string} context.targetVowel - Specific vowel to analyze
 * @param {boolean} context.checkPluta - Whether to check for प्लुत markers
 * @param {boolean} context.detailed - Provide detailed analysis
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1227(word, context = {}) {
  const debug = [];
  const addDebug = (msg) => context.debug && debug.push(msg);
  
  let applicable = true;
  let transformed = word;
  let explanation = '';

  try {
    addDebug(`Starting Sutra 1.2.27 analysis for word: "${word}"`);

    // Input validation
    if (!word || typeof word !== 'string') {
      throw new Error('Invalid input: word must be a non-empty string');
    }

    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      throw new Error(`Invalid Sanskrit word: ${validation.error}`);
    }

    // Analyze specific vowel if provided
    if (context.targetVowel) {
      addDebug(`Analyzing specific vowel: "${context.targetVowel}"`);
      const vowelDuration = getVowelDuration(context.targetVowel, context);
      
      if (vowelDuration.category) {
        explanation = `According to Sutra 1.2.27, vowel '${context.targetVowel}' is classified as ${vowelDuration.duration} (${vowelDuration.durationClass}) with ${vowelDuration.ukalaUnits} ऊकाल duration`;
        addDebug(`Vowel duration classification: ${vowelDuration.analysis}`);
      } else {
        applicable = false;
        explanation = `Vowel '${context.targetVowel}' could not be classified according to the ऊकाल duration system`;
        addDebug('Vowel classification failed');
      }
    } else {
      // Analyze all vowels in the word
      addDebug('Analyzing all vowels in the word');
      const wordAnalysis = analyzeWordVowelDurations(word, context);
      
      if (wordAnalysis.vowelAnalysis.length > 0) {
        const durations = wordAnalysis.vowelAnalysis.map(v => v.duration).join(', ');
        explanation = `According to Sutra 1.2.27, word '${word}' contains vowels with durations: ${durations}. Total duration: ${wordAnalysis.totalUkalaUnits} ऊकाल units`;
        addDebug(`Word analysis: ${wordAnalysis.analysis}`);
      } else {
        applicable = false;
        explanation = `Word '${word}' contains no vowels to classify according to the ऊकाल duration system`;
        addDebug('No vowels found for analysis');
      }
    }

  } catch (error) {
    addDebug(`Error in analysis: ${error.message}`);
    applicable = false;
    explanation = `Analysis could not be completed: ${error.message}`;
  }

  return {
    applicable,
    transformed,
    explanation,
    debug: context.debug ? debug : undefined,
    details: {
      sutra: '1.2.27',
      sutraText: 'ऊकालोऽज्झ्रस्वदीर्घप्लुतः',
      transliteration: 'ūkālo-\'c-hrasva-dīrgha-plutaḥ',
      translation: 'Based on the duration of ऊ, vowels are (called) ह्रस्व, दीर्घ, and प्लुत',
      type: 'संज्ञा',
      subtype: 'स्वरकालसंज्ञा',
      domain: 'Phonetics - vowel duration classification',
      complexity: 'Fundamental - establishes basic phonetic categories'
    }
  };
}

/**
 * Get comprehensive information about the ऊकाल measurement system
 * @param {string} script - Target script ('devanagari' or 'iast')
 * @returns {Object} Information about the ऊकाल system
 */
export function getUkalaSystemInfo(script = 'devanagari') {
  const info = {
    concept: script === 'iast' ? 'ūkāla' : 'ऊकाल',
    definition: script === 'iast' ? 
      'Temporal unit based on the duration of long ū vowel' :
      'ऊ-कार की अवधि पर आधारित कालिक इकाई',
    categories: {},
    examples: {},
    linguisticNote: script === 'iast' ?
      'Fundamental to Sanskrit prosody and phonetics' :
      'संस्कृत छन्दशास्त्र और ध्वनिविज्ञान की आधारशिला'
  };

  if (script === 'iast') {
    info.categories = {
      hrasva: { duration: '1 ūkāla', description: 'short vowels' },
      dirgha: { duration: '2 ūkāla', description: 'long vowels' },
      pluta: { duration: '3+ ūkāla', description: 'protracted vowels' }
    };
    info.examples = {
      hrasva: HRASVA_VOWELS.iast,
      dirgha: DIRGHA_VOWELS.iast,
      pluta: ['a3', 'ā3', 'i3'] // conventional notation
    };
  } else {
    info.categories = {
      ह्रस्व: { duration: '१ ऊकाल', description: 'लघु स्वर' },
      दीर्घ: { duration: '२ ऊकाल', description: 'गुरु स्वर' },
      प्लुत: { duration: '३+ ऊकाल', description: 'विस्तृत स्वर' }
    };
    info.examples = {
      ह्रस्व: HRASVA_VOWELS.devanagari.filter(v => v.length === 1),
      दीर्घ: DIRGHA_VOWELS.devanagari.filter(v => v.length === 1),
      प्लुत: ['अ३', 'आ३', 'इ३'] // traditional notation
    };
  }

  return info;
}

// Export constants for testing and reference
export {
  HRASVA_VOWELS,
  DIRGHA_VOWELS,
  PLUTA_MARKERS,
  DURATION_VALUES
};
