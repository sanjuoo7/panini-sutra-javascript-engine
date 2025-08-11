/**
 * Vṛddham Analysis Utilities
 * Extracted from Sutras 1.1.73-1.1.75
 * 
 * @fileoverview Comprehensive utilities for Sanskrit वृद्धम् (vṛddham) classification
 * according to Pāṇinian grammar - includes phonetic, lexical, and regional criteria
 */

import { detectScript, validateSanskritWord } from './index.js';
import { tokenizePhonemes } from './phoneme-tokenization.js';
import { isVowel, isVrddhi } from './classification.js';

/**
 * Traditional त्यदादि words based on Sanskrit commentaries (Sutra 1.1.74)
 * These are words that get वृद्धम् designation lexically, not phonetically
 */
export const TYAD_ADI_WORDS = {
  iast: [
    'tyad',      // त्यद् - archaic/dialectal form related to तद्
    'tyat',      // त्यत् - variant of त्यद्
    'tyena',     // त्येन - instrumental of त्यद्
    'tyed',      // त्येद् - archaic variant
    'tysya',     // त्यस्य - genitive form
    'tye',       // त्ये - dual/locative forms
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
 * एङ् vowels (e and o) in both scripts (Sutra 1.1.75)
 * Includes both standalone forms and diacritical forms for Devanagari
 */
export const ENG_VOWELS = {
  iast: ['e', 'o'],
  devanagari: ['ए', 'ओ', 'े', 'ो']  // Including diacritical forms
};

/**
 * Vṛddham classification types
 */
export const VRDDHAM_TYPES = {
  PHONETIC: 'phonetic',           // Sutra 1.1.73 - first vowel is vṛddhi
  LEXICAL: 'lexical',             // Sutra 1.1.74 - त्यदादि words
  EASTERN_REGIONAL: 'eastern-regional'  // Sutra 1.1.75 - e/o as first vowel (Eastern tradition)
};

/**
 * Checks if a word is वृद्धम् by phonetic criteria (Sutra 1.1.73).
 * A word is वृद्धम् if its first vowel is a वृद्धि vowel (आ, ऐ, औ).
 * @param {string} word - The Sanskrit word in IAST or Devanagari script
 * @returns {boolean} True if the word is वृद्धम् by phonetic criteria
 */
export function isVrddhamPhonetic(word) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  const tokenizationResult = tokenizePhonemes(word, { accurate: true });
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];

  if (phonemes.length === 0) {
    return false;
  }

  // Find the first vowel in the word
  for (const phoneme of phonemes) {
    if (isVrddhi(phoneme)) {
      return true; // First vowel found and it's vṛddhi
    }
    // If we encounter any other vowel first, it's not vṛddham by phonetic criteria
    if (isVowel(phoneme) && !isVrddhi(phoneme)) {
      return false;
    }
  }

  return false; // No vowel found
}

/**
 * Checks if a phoneme is an एङ् vowel (e or o).
 * @param {string} phoneme - The phoneme to check
 * @returns {boolean} True if phoneme is e or o
 */
export function isEngVowel(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return false;
  }
  
  return ENG_VOWELS.iast.includes(phoneme) || 
         ENG_VOWELS.devanagari.includes(phoneme);
}

/**
 * Finds the first vowel in a word and analyzes its properties.
 * @param {string} word - The word to analyze
 * @returns {Object} Analysis result with first vowel information
 */
export function analyzeFirstVowel(word) {
  const result = {
    word: word,
    firstVowel: null,
    isVrddhi: false,
    isEngVowel: false,
    position: -1,
    allVowels: []
  };

  if (!word || typeof word !== 'string') {
    return result;
  }

  const tokenResult = tokenizePhonemes(word);
  const phonemes = tokenResult.phonemes || [];
  
  for (let i = 0; i < phonemes.length; i++) {
    const phoneme = phonemes[i];
    if (isVowel(phoneme)) {
      result.allVowels.push({ phoneme, position: i });
      
      if (result.firstVowel === null) {
        result.firstVowel = phoneme;
        result.position = i;
        result.isVrddhi = isVrddhi(phoneme);
        result.isEngVowel = isEngVowel(phoneme);
        // Don't break - continue collecting all vowels
      }
    }
  }

  return result;
}

/**
 * Checks if a word is in the त्यदादि list (Sutra 1.1.74).
 * @param {string} word - The word to check (IAST or Devanagari)
 * @returns {boolean} True if the word is in त्यदादि list
 */
export function isTyadAdi(word) {
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
 * Checks if a word is वृद्धम् by lexical criteria (Sutra 1.1.74).
 * @param {string} word - The word to check
 * @returns {boolean} True if word is वृद्धम् by lexical criteria
 */
export function isVrddhamLexical(word) {
  return isTyadAdi(word);
}

/**
 * Checks if a word is वृद्धम् by Eastern regional rule (Sutra 1.1.75).
 * @param {string} word - The word to check
 * @param {Object} context - Context with regional preferences
 * @returns {boolean} True if word qualifies as वृद्धम् by Eastern rule
 */
export function isVrddhamEastern(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  // Check if Eastern grammatical tradition is being followed
  const followsEasternTradition = context.tradition === 'eastern' || 
                                  context.region === 'prācya' ||
                                  context.allowEasternRules === true ||
                                  context.includeOptionalRules === true;

  if (!followsEasternTradition) {
    return false; // This rule is specific to Eastern grammarians
  }

  const vowelAnalysis = analyzeFirstVowel(word);
  return vowelAnalysis.isEngVowel;
}

/**
 * Comprehensive वृद्धम् classification according to all three sutras.
 * @param {string} word - The word to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Complete vṛddham analysis
 */
export function analyzeVrddham(word, context = {}) {
  const result = {
    word: word,
    script: detectScript(word),
    isVrddham: false,
    vrddhamTypes: [],
    firstVowel: null,
    classifications: {
      phonetic: false,    // Sutra 1.1.73
      lexical: false,     // Sutra 1.1.74
      eastern: false      // Sutra 1.1.75
    },
    confidence: 0,
    reasoning: [],
    linguisticNotes: [],
    sutraReferences: []
  };

  if (!word || typeof word !== 'string') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    return result;
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid && !context.allowTechnicalTerms) {
    result.reasoning.push(`Invalid Sanskrit word: ${validation.message}`);
    return result;
  }

  // Analyze first vowel
  const vowelAnalysis = analyzeFirstVowel(word);
  result.firstVowel = vowelAnalysis.firstVowel;

  // Check phonetic criteria (Sutra 1.1.73)
  result.classifications.phonetic = isVrddhamPhonetic(word);
  if (result.classifications.phonetic) {
    result.vrddhamTypes.push(VRDDHAM_TYPES.PHONETIC);
    result.reasoning.push(`First vowel '${result.firstVowel}' is vṛddhi (आ/ऐ/औ)`);
    result.sutraReferences.push('1.1.73');
    result.linguisticNotes.push('वृद्धिर्यस्याचामादिस्तद् वृद्धम् - phonetic vṛddham');
  }

  // Check lexical criteria (Sutra 1.1.74)
  result.classifications.lexical = isVrddhamLexical(word);
  if (result.classifications.lexical) {
    result.vrddhamTypes.push(VRDDHAM_TYPES.LEXICAL);
    result.reasoning.push('Word found in त्यदादि list');
    result.sutraReferences.push('1.1.74');
    result.linguisticNotes.push('त्यदादीनि वृद्धम् - lexical vṛddham designation');
  }

  // Check Eastern regional criteria (Sutra 1.1.75)
  result.classifications.eastern = isVrddhamEastern(word, context);
  if (result.classifications.eastern) {
    result.vrddhamTypes.push(VRDDHAM_TYPES.EASTERN_REGIONAL);
    result.reasoning.push(`First vowel '${result.firstVowel}' is एङ् (e/o) per Eastern tradition`);
    result.sutraReferences.push('1.1.75');
    result.linguisticNotes.push('एङ् प्राचां देशे - Eastern regional vṛddham');
  } else if (vowelAnalysis.isEngVowel && !context.tradition) {
    result.reasoning.push(`First vowel '${result.firstVowel}' is एङ् (e/o) but Eastern tradition not specified`);
    result.linguisticNotes.push('Would qualify as vṛddham under Eastern grammatical tradition');
  }

  // Overall determination
  result.isVrddham = result.vrddhamTypes.length > 0;
  
  if (result.isVrddham) {
    // Confidence based on number and type of matches
    if (result.classifications.phonetic) {
      result.confidence = 1.0; // Phonetic is the primary criterion
    } else if (result.classifications.lexical) {
      result.confidence = 0.9; // Lexical is definitive but limited scope
    } else if (result.classifications.eastern) {
      result.confidence = 0.8; // Regional rule has lower universal applicability
    }
  } else {
    result.reasoning.push('Word does not qualify as vṛddham under any criteria');
  }

  return result;
}

/**
 * Checks if a word is वृद्धम् using any applicable criteria.
 * @param {string} word - The word to check
 * @param {Object} context - Analysis context
 * @returns {boolean} True if word is vṛddham by any criteria
 */
export function isVrddham(word, context = {}) {
  return analyzeVrddham(word, context).isVrddham;
}

/**
 * Gets traditional examples for each type of vṛddham classification.
 * @returns {Object} Examples demonstrating different vṛddham types
 */
export function getVrddhamExamples() {
  return {
    phonetic: {
      description: 'Words with vṛddhi vowels (आ/ऐ/औ) as first vowel (Sutra 1.1.73)',
      examples: [
        { word: 'आत्मा', script: 'devanagari', firstVowel: 'आ', type: 'vṛddhi' },
        { word: 'ऐश्वर्य', script: 'devanagari', firstVowel: 'ऐ', type: 'vṛddhi' },
        { word: 'औषध', script: 'devanagari', firstVowel: 'औ', type: 'vṛddhi' },
        { word: 'ātmā', script: 'iast', firstVowel: 'ā', type: 'vṛddhi' },
        { word: 'aiśvarya', script: 'iast', firstVowel: 'ai', type: 'vṛddhi' },
        { word: 'auṣadha', script: 'iast', firstVowel: 'au', type: 'vṛddhi' }
      ]
    },
    
    lexical: {
      description: 'त्यदादि words with lexical vṛddham designation (Sutra 1.1.74)',
      examples: [
        { word: 'त्यद्', script: 'devanagari', note: 'archaic pronominal form' },
        { word: 'त्येन', script: 'devanagari', note: 'instrumental of त्यद्' },
        { word: 'त्यस्य', script: 'devanagari', note: 'genitive of त्यद्' },
        { word: 'tyad', script: 'iast', note: 'archaic pronominal form' },
        { word: 'tyena', script: 'iast', note: 'instrumental of tyad' },
        { word: 'tysya', script: 'iast', note: 'genitive of tyad' }
      ]
    },
    
    eastern: {
      description: 'Words with e/o as first vowel per Eastern tradition (Sutra 1.1.75)',
      examples: [
        { word: 'एकादश', script: 'devanagari', firstVowel: 'ए', tradition: 'eastern' },
        { word: 'ओजस्', script: 'devanagari', firstVowel: 'ओ', tradition: 'eastern' },
        { word: 'एतद्', script: 'devanagari', firstVowel: 'ए', tradition: 'eastern' },
        { word: 'ekādaśa', script: 'iast', firstVowel: 'e', tradition: 'eastern' },
        { word: 'ojas', script: 'iast', firstVowel: 'o', tradition: 'eastern' },
        { word: 'etad', script: 'iast', firstVowel: 'e', tradition: 'eastern' }
      ]
    },
    
    traditionalNote: 'The वृद्धम् classification system demonstrates the sophistication of Pāṇinian grammar in handling phonetic, lexical, and regional variations in Sanskrit linguistic analysis.'
  };
}

/**
 * Gets all त्यदादि words in both scripts.
 * @returns {Object} Object containing all त्यदादि words
 */
export function getAllTyadAdiWords() {
  return {
    iast: [...TYAD_ADI_WORDS.iast],
    devanagari: [...TYAD_ADI_WORDS.devanagari],
    combined: [...TYAD_ADI_WORDS.iast, ...TYAD_ADI_WORDS.devanagari]
  };
}

/**
 * Gets all एङ् vowels (e and o) in both scripts.
 * @returns {Object} Object containing all एङ् vowels
 */
export function getAllEngVowels() {
  return {
    iast: [...ENG_VOWELS.iast],
    devanagari: [...ENG_VOWELS.devanagari],
    combined: [...ENG_VOWELS.iast, ...ENG_VOWELS.devanagari]
  };
}
