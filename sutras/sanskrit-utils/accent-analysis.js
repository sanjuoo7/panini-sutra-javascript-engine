/**
 * Accent Analysis Utilities
 * 
 * This module provides functionality for analyzing Vedic Sanskrit accents
 * according to Panini's system of उदात्त (udātta), अनुदात्त (anudātta), 
 * and स्वरित (svarita) classifications.
 * 
 * Based on Sutras 1.2.29-1.2.31:
 * - 1.2.29: उच्चैरुदात्तः (High tone = udātta)
 * - 1.2.30: नीचैरनुदात्तः (Low tone = anudātta) 
 * - 1.2.31: समाहारः स्वरितः (Combined tone = svarita)
 * 
 * @fileoverview Vedic accent classification and analysis utilities
 */

import { isVowel, detectScript } from './index.js';

/**
 * Accent types as defined by Panini
 */
export const ACCENT_TYPES = {
  UDATTA: 'udātta',           // उदात्त - high/acute accent
  ANUDATTA: 'anudātta',       // अनुदात्त - low/grave accent  
  SVARITA: 'svarita'          // स्वरित - circumflex accent
};

/**
 * Accent markers used in different notation systems
 */
export const ACCENT_MARKERS = {
  // IAST notation
  IAST: {
    UDATTA: '́',      // Acute accent mark
    ANUDATTA: '̀',    // Grave accent mark
    SVARITA: '̂'      // Circumflex accent mark
  },
  // Devanagari accent marks
  DEVANAGARI: {
    UDATTA: '\u0951',     // ॑ 
    ANUDATTA: '\u0952',   // ॒
    SVARITA: '\u1CDA'     // ᳚ (or sometimes unmarked)
  }
};

/**
 * Analyzes the accent of a vowel based on associated markers
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} options - Analysis options
 * @param {string} options.script - 'IAST' or 'Devanagari' (auto-detected if not provided)
 * @param {boolean} options.strict - Whether to require explicit accent marks
 * @returns {Object} Analysis result with accent classification
 */
export function analyzeVowelAccent(vowel, options = {}) {
  if (!vowel || typeof vowel !== 'string') {
    return {
      isValid: false,
      error: 'Invalid vowel input'
    };
  }

  const script = options.script || detectScript(vowel);
  const strict = options.strict || false;

  // Extract the base vowel and any accent marks
  const analysis = extractAccentMarks(vowel, script);
  
  if (!isVowel(analysis.baseVowel)) {
    return {
      isValid: false,
      error: 'Input is not a vowel',
      input: vowel
    };
  }

  return {
    isValid: true,
    input: vowel,
    script: script,
    baseVowel: analysis.baseVowel,
    accentMarks: analysis.accentMarks,
    accentType: determineAccentType(analysis.accentMarks, script, strict),
    isUdatta: analysis.accentMarks.some(mark => isUdattaMark(mark, script)),
    isAnudatta: analysis.accentMarks.some(mark => isAnudattaMark(mark, script)),
    isSvarita: analysis.accentMarks.some(mark => isSvaritaMark(mark, script))
  };
}

/**
 * Extracts accent marks from a vowel
 * 
 * @param {string} vowel - The vowel with potential accent marks
 * @param {string} script - The script type
 * @returns {Object} Extracted base vowel and accent marks
 */
function extractAccentMarks(vowel, script) {
  const accentMarks = [];
  let baseVowel = vowel;

  // Get accent markers for the script
  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;

  // Handle precomposed characters by mapping them to base + combining marks
  const precomposedMap = {
    // Grave accent (anudātta)
    'à': 'a\u0300', 'ì': 'i\u0300', 'ù': 'u\u0300', 'è': 'e\u0300', 'ò': 'o\u0300',
    'ā̀': 'ā\u0300', 'ī̀': 'ī\u0300', 'ū̀': 'ū\u0300', 'ṛ̀': 'ṛ\u0300', 'ṝ̀': 'ṝ\u0300',
    // Acute accent (udātta)
    'á': 'a\u0301', 'í': 'i\u0301', 'ú': 'u\u0301', 'é': 'e\u0301', 'ó': 'o\u0301',
    'ā́': 'ā\u0301', 'ī́': 'ī\u0301', 'ū́': 'ū\u0301', 'ṛ́': 'ṛ\u0301', 'ṝ́': 'ṝ\u0301',
    // Circumflex accent (svarita)
    'â': 'a\u0302', 'î': 'i\u0302', 'û': 'u\u0302', 'ê': 'e\u0302', 'ô': 'o\u0302',
    'ā̂': 'ā\u0302', 'ī̂': 'ī\u0302', 'ū̂': 'ū\u0302', 'ṛ̂': 'ṛ\u0302', 'ṝ̂': 'ṝ\u0302'
  };

  // Special handling for explicit markers first
  let hasExplicitMarkers = false;
  Object.values(markers).forEach(marker => {
    if (vowel.includes(marker)) {
      accentMarks.push(marker);
      baseVowel = baseVowel.replace(new RegExp(marker, 'g'), '');
      hasExplicitMarkers = true;
    }
  });

  if (hasExplicitMarkers) {
    return {
      baseVowel: baseVowel.trim(),
      accentMarks
    };
  }

  // Use precomposed mapping if available
  if (precomposedMap[vowel]) {
    const workingString = precomposedMap[vowel];
    
    // Extract base vowel and accent marks from mapped form
    baseVowel = '';
    for (const char of workingString) {
      const codePoint = char.codePointAt(0);
      // Only treat specific accent combining marks as accents
      if (codePoint === 0x0300 || codePoint === 0x0301 || codePoint === 0x0302) {
        // This is an accent combining mark
        switch (char) {
          case '\u0300': // Combining grave accent
            accentMarks.push(markers.ANUDATTA);
            break;
          case '\u0301': // Combining acute accent
            accentMarks.push(markers.UDATTA);
            break;
          case '\u0302': // Combining circumflex accent
            accentMarks.push(markers.SVARITA);
            break;
        }
      } else {
        // This is part of the base vowel
        baseVowel += char;
      }
    }
  } else {
    // For characters without explicit mapping, try normalization but be more careful
    const normalized = vowel.normalize('NFD');
    
    // Don't decompose characters that are vowels in their own right (like ṛ, ṝ)
    if (isVowel(vowel) && normalized !== vowel) {
      // If the original is a vowel but normalization changed it,
      // and we don't have explicit accent markers, treat as unmarked
      baseVowel = vowel;
    } else {
      // Safe to use normalized form
      baseVowel = '';
      for (const char of normalized) {
        const codePoint = char.codePointAt(0);
        // Only treat accent combining marks as accents
        if (codePoint === 0x0300 || codePoint === 0x0301 || codePoint === 0x0302) {
          switch (char) {
            case '\u0300': // Combining grave accent
              accentMarks.push(markers.ANUDATTA);
              break;
            case '\u0301': // Combining acute accent
              accentMarks.push(markers.UDATTA);
              break;
            case '\u0302': // Combining circumflex accent
              accentMarks.push(markers.SVARITA);
              break;
          }
        } else {
          baseVowel += char;
        }
      }
    }
  }

  return {
    baseVowel: baseVowel.trim(),
    accentMarks
  };
}

/**
 * Determines the accent type based on present marks
 * 
 * @param {Array} accentMarks - Array of accent marks found
 * @param {string} script - The script type
 * @param {boolean} strict - Whether to require explicit marks
 * @returns {string|null} The accent type or null if indeterminate
 */
function determineAccentType(accentMarks, script, strict) {
  if (accentMarks.length === 0) {
    return strict ? null : ACCENT_TYPES.SVARITA; // Unmarked = svarita in non-strict mode
  }

  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;

  // Check for specific accent types
  if (accentMarks.includes(markers.UDATTA)) {
    return ACCENT_TYPES.UDATTA;
  }
  if (accentMarks.includes(markers.ANUDATTA)) {
    return ACCENT_TYPES.ANUDATTA;
  }
  if (accentMarks.includes(markers.SVARITA)) {
    return ACCENT_TYPES.SVARITA;
  }

  return null;
}

/**
 * Checks if a mark is an udātta (high tone) marker
 * 
 * @param {string} mark - The accent mark to check
 * @param {string} script - The script type
 * @returns {boolean} True if it's an udātta marker
 */
export function isUdattaMark(mark, script = 'IAST') {
  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  return mark === markers.UDATTA;
}

/**
 * Checks if a mark is an anudātta (low tone) marker
 * 
 * @param {string} mark - The accent mark to check
 * @param {string} script - The script type  
 * @returns {boolean} True if it's an anudātta marker
 */
export function isAnudattaMark(mark, script = 'IAST') {
  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  return mark === markers.ANUDATTA;
}

/**
 * Checks if a mark is a svarita (circumflex tone) marker
 * 
 * @param {string} mark - The accent mark to check
 * @param {string} script - The script type
 * @returns {boolean} True if it's a svarita marker
 */
export function isSvaritaMark(mark, script = 'IAST') {
  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  return mark === markers.SVARITA;
}

/**
 * Checks if a vowel has udātta (high tone) accent
 * According to Sutra 1.2.29: उच्चैरुदात्तः
 * 
 * @param {string} vowel - The vowel to check
 * @param {Object} options - Analysis options
 * @returns {boolean} True if the vowel has udātta accent
 */
export function isUdatta(vowel, options = {}) {
  const analysis = analyzeVowelAccent(vowel, options);
  return analysis.isValid && analysis.accentType === ACCENT_TYPES.UDATTA;
}

/**
 * Checks if a vowel has anudātta (low tone) accent  
 * According to Sutra 1.2.30: नीचैरनुदात्तः
 * 
 * @param {string} vowel - The vowel to check
 * @param {Object} options - Analysis options
 * @returns {boolean} True if the vowel has anudātta accent
 */
export function isAnudatta(vowel, options = {}) {
  const analysis = analyzeVowelAccent(vowel, options);
  return analysis.isValid && analysis.accentType === ACCENT_TYPES.ANUDATTA;
}

/**
 * Checks if a vowel has svarita (circumflex tone) accent
 * According to Sutra 1.2.31: समाहारः स्वरितः
 * 
 * @param {string} vowel - The vowel to check
 * @param {Object} options - Analysis options
 * @returns {boolean} True if the vowel has svarita accent
 */
export function isSvarita(vowel, options = {}) {
  const analysis = analyzeVowelAccent(vowel, options);
  return analysis.isValid && analysis.accentType === ACCENT_TYPES.SVARITA;
}

/**
 * Applies udātta accent to a vowel
 * 
 * @param {string} vowel - The base vowel
 * @param {string} script - Target script ('IAST' or 'Devanagari')
 * @returns {string} Vowel with udātta accent mark
 */
export function applyUdatta(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel');
  }

  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  return vowel + markers.UDATTA;
}

/**
 * Applies anudātta accent to a vowel
 * 
 * @param {string} vowel - The base vowel  
 * @param {string} script - Target script ('IAST' or 'Devanagari')
 * @returns {string} Vowel with anudātta accent mark
 */
export function applyAnudatta(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel');
  }

  // For IAST, try to use precomposed characters where available
  if (script.toUpperCase() === 'IAST') {
    const precomposedMap = {
      'a': 'à', 'i': 'ì', 'u': 'ù', 'e': 'è', 'o': 'ò',
      'A': 'À', 'I': 'Ì', 'U': 'Ù', 'E': 'È', 'O': 'Ò'
    };
    
    if (precomposedMap[vowel]) {
      return precomposedMap[vowel];
    }
  }

  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  const result = vowel + markers.ANUDATTA;
  
  // Try to normalize to precomposed form
  return result.normalize('NFC');
}

/**
 * Applies svarita accent to a vowel
 * 
 * @param {string} vowel - The base vowel
 * @param {string} script - Target script ('IAST' or 'Devanagari')  
 * @returns {string} Vowel with svarita accent mark
 */
export function applySvarita(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel');
  }

  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  return vowel + markers.SVARITA;
}

/**
 * Gets all possible accent variants of a vowel
 * 
 * @param {string} vowel - The base vowel
 * @param {string} script - Target script
 * @returns {Object} Object with all accent variants
 */
export function getAccentVariants(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel');
  }

  return {
    base: vowel,
    udatta: applyUdatta(vowel, script),
    anudatta: applyAnudatta(vowel, script), 
    svarita: applySvarita(vowel, script)
  };
}
