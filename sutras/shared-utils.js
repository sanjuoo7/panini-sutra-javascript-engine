/**
 * Shared Utilities for Panini Sutra Implementation
 * 
 * This module provides common functionality used across multiple sutras:
 * - Vowel and consonant classification
 * - Script detection and processing
 * - Phoneme tokenization
 * - Common transformations
 * - Validation utilities
 * 
 * Created: August 8, 2025
 * Purpose: Eliminate code redundancy across sutra implementations
 */

// ==================== CORE DATA CONSTANTS ====================

/**
 * Sanskrit vowels categorized by Paninian classification
 */
export const SanskritVowels = {
  // Vṛddhi vowels (1.1.1)
  vrddhi: {
    iast: ['ā', 'ai', 'au'],
    devanagari: ['आ', 'ऐ', 'औ'],
    description: 'Vowels defined as vṛddhi in Sutra 1.1.1'
  },
  
  // Guṇa vowels (1.1.2)
  guna: {
    iast: ['a', 'e', 'o'],
    devanagari: ['अ', 'ए', 'ओ'],
    description: 'Vowels defined as guṇa in Sutra 1.1.2'
  },
  
  // Ik vowels (1.1.3)
  ik: {
    iast: ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'],
    devanagari: ['इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ'],
    description: 'Vowels subject to guṇa/vṛddhi operations in Sutra 1.1.3'
  },
  
  // All basic vowels
  all: {
    iast: ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', 'e', 'ai', 'o', 'au'],
    devanagari: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'],
    // Include vowel diacritics
    diacritics: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'],
    description: 'All Sanskrit vowels in both scripts'
  }
};

/**
 * Sanskrit consonants (हल्) categorized by place of articulation
 */
export const SanskritConsonants = {
  // Stops (स्पर्श)
  stops: {
    velars: { iast: ['k', 'kh', 'g', 'gh', 'ṅ'], devanagari: ['क', 'ख', 'ग', 'घ', 'ङ'] },
    palatals: { iast: ['c', 'ch', 'j', 'jh', 'ñ'], devanagari: ['च', 'छ', 'ज', 'झ', 'ञ'] },
    retroflexes: { iast: ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ'], devanagari: ['ट', 'ठ', 'ड', 'ढ', 'ण'] },
    dentals: { iast: ['t', 'th', 'd', 'dh', 'n'], devanagari: ['त', 'थ', 'द', 'ध', 'न'] },
    labials: { iast: ['p', 'ph', 'b', 'bh', 'm'], devanagari: ['प', 'फ', 'ब', 'भ', 'म'] }
  },
  
  // Semivowels (अन्तःस्थ)
  semivowels: {
    iast: ['y', 'r', 'l', 'v'],
    devanagari: ['य', 'र', 'ल', 'व']
  },
  
  // Sibilants (ऊष्म)
  sibilants: {
    iast: ['ś', 'ṣ', 's', 'h'],
    devanagari: ['श', 'ष', 'स', 'ह']
  },
  
  // All consonants flattened
  all: {
    iast: [],
    devanagari: []
  },
  
  // Special characters
  special: {
    iast: ['ḥ', 'ṃ'],
    devanagari: ['ः', 'ं', '्'], // visarga, anusvara, halanta
    description: 'Special consonantal markers'
  }
};

// Flatten all consonants
SanskritConsonants.all.iast = [
  ...SanskritConsonants.stops.velars.iast,
  ...SanskritConsonants.stops.palatals.iast,
  ...SanskritConsonants.stops.retroflexes.iast,
  ...SanskritConsonants.stops.dentals.iast,
  ...SanskritConsonants.stops.labials.iast,
  ...SanskritConsonants.semivowels.iast,
  ...SanskritConsonants.sibilants.iast
];

SanskritConsonants.all.devanagari = [
  ...SanskritConsonants.stops.velars.devanagari,
  ...SanskritConsonants.stops.palatals.devanagari,
  ...SanskritConsonants.stops.retroflexes.devanagari,
  ...SanskritConsonants.stops.dentals.devanagari,
  ...SanskritConsonants.stops.labials.devanagari,
  ...SanskritConsonants.semivowels.devanagari,
  ...SanskritConsonants.sibilants.devanagari
];

// ==================== SCRIPT DETECTION ====================

/**
 * Detects the script of the given text
 * @param {string} text - Text to analyze
 * @returns {'IAST'|'Devanagari'|'Mixed'|'Unknown'} - Detected script
 */
export function detectScript(text) {
  if (!text || typeof text !== 'string') return 'Unknown';
  
  const devanagariRegex = /[\u0900-\u097F]/;
  const iastRegex = /[āīūṛṝḷḹṅñṭḍṇśṣḥṃ]/;
  
  const hasDevanagari = devanagariRegex.test(text);
  const hasIAST = iastRegex.test(text);
  
  if (hasDevanagari && hasIAST) return 'Mixed';
  if (hasDevanagari) return 'Devanagari';
  if (hasIAST) return 'IAST';
  
  // If no special characters, assume IAST for basic Latin characters
  return /^[a-zA-Z\s]+$/.test(text) ? 'IAST' : 'Unknown';
}

/**
 * Checks if text is in Devanagari script
 * @param {string} text - Text to check
 * @returns {boolean} - True if Devanagari
 */
export function isDevanagari(text) {
  return detectScript(text) === 'Devanagari';
}

/**
 * Checks if text is in IAST script
 * @param {string} text - Text to check
 * @returns {boolean} - True if IAST
 */
export function isIAST(text) {
  return detectScript(text) === 'IAST';
}

// ==================== PHONEME TOKENIZATION ====================

/**
 * Tokenizes IAST text into proper phonemic units
 * @param {string} text - IAST text to tokenize
 * @returns {string[]} - Array of phonemic units
 */
export function tokenizeIastPhonemes(text) {
  if (!text || typeof text !== 'string') return [];

  // IAST phonemes ordered by length (longest first) for proper matching
  const iastPhonemes = [
    // Diphthongs (2 characters)
    'ai', 'au', 
    // Long vowels with diacritics (2 characters)
    'ā', 'ī', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ',
    // Consonants with diacritics
    'kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh',
    'ṅ', 'ñ', 'ṭ', 'ḍ', 'ṇ', 'ś', 'ṣ', 'ḥ', 'ṃ',
    // Basic vowels and consonants (1 character)
    'a', 'i', 'u', 'e', 'o',
    'k', 'g', 'c', 'j', 't', 'd', 'n', 'p', 'b', 'm',
    'y', 'r', 'l', 'v', 'h'
  ];

  const phonemes = [];
  let position = 0;

  while (position < text.length) {
    let matchFound = false;
    
    // Try to match the longest possible phoneme at current position
    for (const phoneme of iastPhonemes) {
      if (text.substring(position, position + phoneme.length) === phoneme) {
        phonemes.push(phoneme);
        position += phoneme.length;
        matchFound = true;
        break;
      }
    }
    
    // If no phoneme matched, take the single character
    if (!matchFound) {
      phonemes.push(text.charAt(position));
      position++;
    }
  }
  
  return phonemes;
}

/**
 * Tokenizes Devanagari text into proper phonemic units
 * @param {string} text - Devanagari text to tokenize
 * @returns {string[]} - Array of phonemic units
 */
export function tokenizeDevanagariPhonemes(text) {
  if (!text || typeof text !== 'string') return [];

  // Devanagari phonemes ordered by complexity
  const devanagariPhonemes = [
    // Vowel diacritics and independent vowels (longer patterns first)
    'आ', 'ऐ', 'औ', 'ई', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ओ', 'अ', 'इ', 'उ',
    'ा', 'ै', 'ौ', 'ी', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ो', 'ि', 'ु',
    // Consonants
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
    // Diacritics and special characters
    '्', 'ं', 'ः'
  ];

  const phonemes = [];
  let position = 0;

  while (position < text.length) {
    let matchFound = false;
    
    // Try to match phonemes
    for (const phoneme of devanagariPhonemes) {
      if (text.substring(position, position + phoneme.length) === phoneme) {
        phonemes.push(phoneme);
        position += phoneme.length;
        matchFound = true;
        break;
      }
    }
    
    // If no phoneme matched, take the single character
    if (!matchFound) {
      phonemes.push(text.charAt(position));
      position++;
    }
  }
  
  return phonemes;
}

/**
 * Tokenizes text into phonemes based on script detection
 * @param {string} text - Text to tokenize
 * @returns {Object} - Result with phonemes and metadata
 */
export function tokenizePhonemes(text) {
  const script = detectScript(text);
  let phonemes = [];
  
  switch (script) {
    case 'Devanagari':
      phonemes = tokenizeDevanagariPhonemes(text);
      break;
    case 'IAST':
      phonemes = tokenizeIastPhonemes(text);
      break;
    case 'Mixed':
      // For mixed script, try both and combine results
      phonemes = [...tokenizeIastPhonemes(text), ...tokenizeDevanagariPhonemes(text)];
      break;
    default:
      phonemes = text.split(''); // Fallback to character splitting
  }
  
  return {
    phonemes,
    script,
    count: phonemes.length,
    original: text
  };
}

// ==================== VOWEL CLASSIFICATION ====================

/**
 * Checks if a character/string is a vṛddhi vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if vṛddhi vowel
 */
export function isVrddhi(vowel) {
  if (!vowel) return false;
  return SanskritVowels.vrddhi.iast.includes(vowel) || 
         SanskritVowels.vrddhi.devanagari.includes(vowel);
}

/**
 * Checks if a character/string is a guṇa vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if guṇa vowel
 */
export function isGuna(vowel) {
  if (!vowel) return false;
  return SanskritVowels.guna.iast.includes(vowel) || 
         SanskritVowels.guna.devanagari.includes(vowel);
}

/**
 * Checks if a character/string is an ik vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if ik vowel
 */
export function isIkVowel(vowel) {
  if (!vowel) return false;
  return SanskritVowels.ik.iast.includes(vowel) || 
         SanskritVowels.ik.devanagari.includes(vowel);
}

/**
 * Checks if a character/string is any Sanskrit vowel
 * @param {string} vowel - Vowel to check
 * @returns {boolean} - True if Sanskrit vowel
 */
export function isVowel(vowel) {
  if (!vowel) return false;
  return SanskritVowels.all.iast.includes(vowel) || 
         SanskritVowels.all.devanagari.includes(vowel) ||
         SanskritVowels.all.diacritics.includes(vowel);
}

/**
 * Checks if a character/string is a Sanskrit consonant
 * @param {string} consonant - Consonant to check
 * @returns {boolean} - True if Sanskrit consonant
 */
export function isConsonant(consonant) {
  if (!consonant) return false;
  return SanskritConsonants.all.iast.includes(consonant) || 
         SanskritConsonants.all.devanagari.includes(consonant) ||
         SanskritConsonants.special.devanagari.includes(consonant);
}

// ==================== VOWEL ANALYSIS ====================

/**
 * Analyzes a vowel and provides comprehensive classification
 * @param {string} vowel - Vowel to analyze
 * @returns {Object} - Detailed analysis result
 */
export function analyzeVowel(vowel) {
  if (!vowel) {
    return {
      vowel: null,
      isValid: false,
      script: null,
      classifications: {},
      category: null,
      explanation: 'Invalid or empty vowel'
    };
  }

  const script = detectScript(vowel);
  const classifications = {
    isVrddhi: isVrddhi(vowel),
    isGuna: isGuna(vowel),
    isIk: isIkVowel(vowel),
    isVowel: isVowel(vowel)
  };

  // Determine category
  let category = null;
  if (vowel === 'ā' || vowel === 'आ') category = 'long-a';
  else if (vowel === 'ai' || vowel === 'ऐ') category = 'diphthong-ai';
  else if (vowel === 'au' || vowel === 'औ') category = 'diphthong-au';
  else if (vowel === 'a' || vowel === 'अ') category = 'basic-a';
  else if (vowel === 'e' || vowel === 'ए') category = 'front-mid';
  else if (vowel === 'o' || vowel === 'ओ') category = 'back-mid';
  else if (vowel === 'i' || vowel === 'इ') category = 'high-front-short';
  else if (vowel === 'ī' || vowel === 'ई') category = 'high-front-long';
  else if (vowel === 'u' || vowel === 'उ') category = 'high-back-short';
  else if (vowel === 'ū' || vowel === 'ऊ') category = 'high-back-long';
  else if (vowel === 'ṛ' || vowel === 'ऋ') category = 'vocalic-r-short';
  else if (vowel === 'ṝ' || vowel === 'ॠ') category = 'vocalic-r-long';
  else if (vowel === 'ḷ' || vowel === 'ऌ') category = 'vocalic-l-short';
  else if (vowel === 'ḹ' || vowel === 'ॡ') category = 'vocalic-l-long';

  const primaryClassification = classifications.isVrddhi ? 'vṛddhi' : 
                                classifications.isGuna ? 'guṇa' :
                                classifications.isIk ? 'ik' : 'other';

  return {
    vowel,
    isValid: classifications.isVowel,
    script,
    classifications,
    category,
    primaryClassification,
    explanation: `${vowel} is ${classifications.isVowel ? 'a valid' : 'not a valid'} Sanskrit vowel` +
                 (category ? ` (${category})` : '') +
                 (primaryClassification !== 'other' ? ` classified as ${primaryClassification}` : '')
  };
}

// ==================== VOWEL EXTRACTION ====================

/**
 * Extracts the first vowel from a word using proper phoneme tokenization
 * @param {string} word - Word to analyze
 * @returns {Object} - Result with first vowel and metadata
 */
export function getFirstVowel(word) {
  if (!word || typeof word !== 'string') {
    return { vowel: null, position: -1, script: 'Unknown', error: 'Invalid word' };
  }

  const tokenResult = tokenizePhonemes(word);
  const { phonemes, script } = tokenResult;

  for (let i = 0; i < phonemes.length; i++) {
    const phoneme = phonemes[i];
    if (isVowel(phoneme)) {
      return {
        vowel: phoneme,
        position: i,
        script,
        phonemes,
        analysis: analyzeVowel(phoneme)
      };
    }
  }

  // Handle inherent 'a' in Devanagari consonants
  if (script === 'Devanagari') {
    for (let i = 0; i < phonemes.length; i++) {
      const phoneme = phonemes[i];
      if (isConsonant(phoneme) && !phonemes[i + 1]?.includes('्')) {
        return {
          vowel: 'अ',
          position: i,
          script,
          phonemes,
          inherent: true,
          analysis: analyzeVowel('अ')
        };
      }
    }
  }

  return { vowel: null, position: -1, script, phonemes, error: 'No vowel found' };
}

// ==================== COMMON VALIDATION ====================

/**
 * Validates input parameters for sutra functions
 * @param {any} input - Input to validate
 * @param {string} type - Expected type ('string', 'array', 'object')
 * @param {string} context - Context for error messages
 * @returns {Object} - Validation result
 */
export function validateInput(input, type, context = 'input') {
  const result = {
    isValid: true,
    error: null,
    input,
    type: typeof input
  };

  if (input === null || input === undefined) {
    result.isValid = false;
    result.error = `${context} cannot be null or undefined`;
    return result;
  }

  switch (type) {
    case 'string':
      if (typeof input !== 'string' || input.length === 0) {
        result.isValid = false;
        result.error = `${context} must be a non-empty string`;
      }
      break;
    case 'array':
      if (!Array.isArray(input) || input.length === 0) {
        result.isValid = false;
        result.error = `${context} must be a non-empty array`;
      }
      break;
    case 'object':
      if (typeof input !== 'object' || Array.isArray(input)) {
        result.isValid = false;
        result.error = `${context} must be an object`;
      }
      break;
  }

  return result;
}

// ==================== EXPORTS ====================

export default {
  // Data
  SanskritVowels,
  SanskritConsonants,
  
  // Script detection
  detectScript,
  isDevanagari,
  isIAST,
  
  // Phoneme tokenization
  tokenizeIastPhonemes,
  tokenizeDevanagariPhonemes,
  tokenizePhonemes,
  
  // Classification
  isVrddhi,
  isGuna,
  isIkVowel,
  isVowel,
  isConsonant,
  
  // Analysis
  analyzeVowel,
  getFirstVowel,
  
  // Validation
  validateInput
};
