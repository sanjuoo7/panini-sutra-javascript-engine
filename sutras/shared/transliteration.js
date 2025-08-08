/**
 * Transliteration and Script Normalization Utilities
 * 
 * This module provides advanced script conversion and normalization functions,
 * including the sophisticated `normalizeScript` function from Sutra 1.1.5
 * for consistent affix lookup and processing.
 * 
 * Created: August 8, 2025
 */

import { detectScript, isDevanagari } from './script-detection.js';

/**
 * Comprehensive Devanagari to IAST mapping for it-marked affixes
 * Enhanced from Sutra 1.1.5's specialized mapping system
 */
const AFFIX_DEVANAGARI_TO_IAST = {
  // Kit affixes (क् it-marker)
  'कत्': 'kta', 'कत्वा': 'ktvā', 'कुप्': 'kvip', 'कुअन्': 'kvan',
  'कतवत्': 'ktavat', 'कतिन्': 'ktin', 'कतु': 'ktu', 'कमत्': 'kmat',
  'कुइ': 'kvi', 'कु': 'kt',
  
  // Git affixes (ग् it-marker)
  'घञ्': 'ghañ', 'घन्': 'ghan', 'घणं': 'ghaṇ', 'घसि': 'ghasi',
  'घासि': 'ghāsi', 'घ': 'gha', 'ग': 'ga',
  
  // Ngit affixes (ङ् it-marker)  
  'ङीप्': 'ṅīp', 'ङीन्': 'ṅīn', 'ङीष्': 'ṅīṣ', 'ङौ': 'ṅau',
  'अङ्': 'aṅ', 'इङ्': 'iṅ', 'उङ्': 'uṅ', 'ङ': 'ṅa',
  
  // Regular affixes (no it-markers) - for completeness
  'ति': 'ti', 'अन': 'ana', 'य': 'ya', 'तृच्': 'tṛc', 'अच्': 'ac'
};

/**
 * Character-by-character Devanagari to IAST transliteration map
 */
const CHAR_DEVANAGARI_TO_IAST = {
  // Vowels
  'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū',
  'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ', 'ए': 'e', 'ऐ': 'ai',
  'ओ': 'o', 'औ': 'au',
  
  // Consonants
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'ṅa',
  'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
  'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': 'ḍha', 'ण': 'ṇa',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
  'श': 'śa', 'ष': 'ṣa', 'स': 'sa', 'ह': 'ha',
  
  // Diacritics and modifiers
  '्': '', // virama (removes inherent vowel)
  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
  'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  'ं': 'ṃ', 'ः': 'ḥ', '॒': '', '॑': '' // anusvara, visarga, accent marks
};

/**
 * Enhanced function to handle both IAST and Devanagari scripts
 * Optimized version from Sutra 1.1.5 with shared script detection
 * @param {string} text - Text in IAST or Devanagari
 * @returns {string} - Text processed for comparison (always in IAST)
 */
export function normalizeScript(text) {
  if (!text) return '';
  
  // Use shared script detection
  const script = detectScript(text);
  
  // If already in IAST, return normalized
  if (script === 'IAST') {
    return text.toLowerCase().trim();
  }
  
  const trimmedText = text.trim();
  
  // Direct mapping lookup (fast path for known affixes)
  const mapped = AFFIX_DEVANAGARI_TO_IAST[trimmedText];
  if (mapped) {
    return mapped;
  }
  
  // Character-by-character transliteration fallback (robust path)
  // This ensures ANY Devanagari input gets converted to IAST for proper lookup
  let result = '';
  let i = 0;
  
  while (i < trimmedText.length) {
    const char = trimmedText[i];
    const mapped = CHAR_DEVANAGARI_TO_IAST[char];
    
    if (mapped !== undefined) {
      result += mapped;
    } else {
      // Keep unmapped characters as-is (shouldn't happen with valid Devanagari)
      result += char;
    }
    i++;
  }
  
  return result.toLowerCase();
}

/**
 * Enhanced IAST to Devanagari transliteration
 * @param {string} iast - IAST text to convert
 * @returns {string} - Devanagari equivalent
 */
export function iastToDevanagari(iast) {
  if (!iast || typeof iast !== 'string') return '';
  
  // Create reverse mapping
  const reverseMap = {};
  Object.entries(CHAR_DEVANAGARI_TO_IAST).forEach(([dev, iast]) => {
    if (iast && iast !== '') {
      reverseMap[iast] = dev;
    }
  });
  
  // Additional IAST-specific mappings
  const iastToDevMap = {
    'ā': 'आ', 'ī': 'ई', 'ū': 'ऊ', 'ṛ': 'ऋ', 'ṝ': 'ॠ',
    'ḷ': 'ऌ', 'ḹ': 'ॡ', 'ai': 'ऐ', 'au': 'औ',
    'ka': 'क', 'kha': 'ख', 'ga': 'ग', 'gha': 'घ', 'ṅa': 'ङ',
    // ... add more as needed
  };
  
  let result = '';
  let i = 0;
  
  while (i < iast.length) {
    // Try longer matches first
    let matched = false;
    for (let len = 3; len >= 1; len--) {
      if (i + len <= iast.length) {
        const substr = iast.substring(i, i + len);
        if (iastToDevMap[substr]) {
          result += iastToDevMap[substr];
          i += len;
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      result += iast[i];
      i++;
    }
  }
  
  return result;
}

/**
 * Normalizes text for consistent comparison across scripts
 * @param {string} text - Input text in any script
 * @returns {Object} - Normalization result with metadata
 */
export function normalizeForComparison(text) {
  if (!text || typeof text !== 'string') {
    return {
      normalized: '',
      originalScript: 'Unknown',
      transformations: [],
      isValid: false
    };
  }
  
  const originalScript = detectScript(text);
  const transformations = [];
  
  let normalized = text.trim();
  
  if (normalized !== text) {
    transformations.push('trimmed');
  }
  
  // Convert to lowercase for IAST, normalize for Devanagari
  if (originalScript === 'IAST') {
    const lowercased = normalized.toLowerCase();
    if (lowercased !== normalized) {
      transformations.push('lowercased');
      normalized = lowercased;
    }
  } else if (originalScript === 'Devanagari') {
    const transliterated = normalizeScript(normalized);
    if (transliterated !== normalized) {
      transformations.push('transliterated');
      normalized = transliterated;
    }
  }
  
  return {
    normalized,
    original: text,
    originalScript,
    transformations,
    isValid: true
  };
}

/**
 * Batch normalization for multiple texts
 * @param {Array<string>} texts - Array of texts to normalize
 * @returns {Array<Object>} - Array of normalization results
 */
export function batchNormalize(texts) {
  if (!Array.isArray(texts)) {
    return [];
  }
  
  return texts.map(text => normalizeForComparison(text));
}

/**
 * Checks if two texts are equivalent across different scripts
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {boolean} - True if equivalent
 */
export function isEquivalentAcrossScripts(text1, text2) {
  const norm1 = normalizeForComparison(text1);
  const norm2 = normalizeForComparison(text2);
  
  return norm1.isValid && norm2.isValid && norm1.normalized === norm2.normalized;
}
