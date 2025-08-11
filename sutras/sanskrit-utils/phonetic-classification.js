/**
 * Phonetic Classification Utilities
 * 
 * This module provides comprehensive phonetic classification and analysis
 * utilities for Sanskrit sounds, including homorganic (savarna) relationships,
 * articulatory classifications, and phonetic feature analysis.
 * 
 * Used by: Sutra 1.1.69 (अणुदित् सवर्णस्य चाप्रत्ययः)
 */

import { detectScript } from './script-detection.js';

/**
 * Complete सवर्ण (homorganic) classification for all Sanskrit phonemes
 * Based on traditional articulatory phonetics
 */
export const SAVARNA_GROUPS = {
  // Gutturals (कण्ठ्य) - articulated at the soft palate
  'क': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'ख': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'ग': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'घ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'ङ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'अ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'आ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  
  // Palatals (तालव्य) - articulated at the hard palate
  'च': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'छ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ज': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'झ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ञ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'इ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ई': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ए': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ऐ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  
  // Retroflexes (मूर्धन्य) - articulated with tongue tip at roof of mouth
  'ट': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ठ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ड': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ढ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ण': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ऋ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ॠ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  
  // Dentals (दन्त्य) - articulated with tongue tip at teeth
  'त': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'थ': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'द': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'ध': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'न': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'ल': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'स': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  
  // Labials (ओष्ठ्य) - articulated with lips
  'प': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'फ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'ब': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'भ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'म': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'उ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'ऊ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'ओ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'औ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  
  // Semivowels (अन्तःस्थ) - articulated with partial obstruction
  'य': ['य', 'इ', 'ई', 'ए', 'ऐ'],  // Related to palatals
  'र': ['र', 'ऋ', 'ॠ'],              // Related to retroflexes  
  'व': ['व', 'उ', 'ऊ', 'ओ', 'औ'],  // Related to labials
  
  // Sibilants (ऊष्म) - fricative sounds
  'श': ['श', 'इ', 'ई', 'ए', 'ऐ'],   // Palatal sibilant
  'ष': ['ष', 'ऋ', 'ॠ'],              // Retroflex sibilant
  'ह': ['ह', 'अ', 'आ']               // Glottal fricative
};

/**
 * IAST equivalents for सवर्ण groups
 */
export const IAST_SAVARNA_GROUPS = {
  // Gutturals
  'k': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'kh': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'g': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'gh': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'ṅ': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'a': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'ā': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  
  // Palatals
  'c': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ch': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'j': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'jh': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ñ': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'i': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ī': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'e': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ai': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  
  // Retroflexes
  'ṭ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṭh': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ḍ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ḍh': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṇ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṛ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṝ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  
  // Dentals
  't': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'th': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'd': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'dh': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'n': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'l': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  's': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  
  // Labials
  'p': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'ph': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'b': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'bh': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'm': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'u': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'ū': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'o': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'au': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  
  // Semivowels
  'y': ['y', 'i', 'ī', 'e', 'ai'],
  'r': ['r', 'ṛ', 'ṝ'],
  'v': ['v', 'u', 'ū', 'o', 'au'],
  
  // Sibilants
  'ś': ['ś', 'i', 'ī', 'e', 'ai'],
  'ṣ': ['ṣ', 'ṛ', 'ṝ'],
  'h': ['h', 'a', 'ā']
};

/**
 * Articulatory classification mapping
 */
export const ARTICULATION_PLACES = {
  // Devanagari
  'कण्ठ्य': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ', 'ह'],  // Guttural
  'तालव्य': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ', 'य', 'श'],  // Palatal
  'मूर्धन्य': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ', 'र', 'ष'],  // Retroflex
  'दन्त्य': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],  // Dental
  'ओष्ठ्य': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ', 'व'],  // Labial
  
  // IAST
  'guttural': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā', 'h'],
  'palatal': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai', 'y', 'ś'],
  'retroflex': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ', 'r', 'ṣ'],
  'dental': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'labial': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au', 'v']
};

/**
 * Checks if two phonemes are सवर्ण (homorganic/same place of articulation)
 * @param {string} phoneme1 - First phoneme
 * @param {string} phoneme2 - Second phoneme  
 * @returns {boolean} - True if phonemes are homorganic
 */
export function areSavarna(phoneme1, phoneme2) {
  if (!phoneme1 || !phoneme2 || 
      typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string') {
    return false;
  }

  const script = detectScript(phoneme1);
  const groups = script === 'Devanagari' ? SAVARNA_GROUPS : IAST_SAVARNA_GROUPS;
  
  // Check if phoneme1 and phoneme2 are in the same savarna group
  const group1 = groups[phoneme1];
  if (group1 && group1.includes(phoneme2)) {
    return true;
  }
  
  return false;
}

/**
 * Gets the सवर्ण group for a given phoneme
 * @param {string} phoneme - The phoneme to analyze
 * @returns {Array|null} - Array of homorganic phonemes, or null if not found
 */
export function getSavarnaGroup(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return null;
  }

  const script = detectScript(phoneme);
  const groups = script === 'Devanagari' ? SAVARNA_GROUPS : IAST_SAVARNA_GROUPS;
  
  return groups[phoneme] || null;
}

/**
 * Gets the place of articulation for a phoneme
 * @param {string} phoneme - The phoneme to analyze
 * @returns {string|null} - Place of articulation in English, or null if not found
 */
export function getArticulationPlace(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return null;
  }

  // Mapping from Sanskrit terms to English
  const PLACE_MAPPING = {
    'कण्ठ्य': 'guttural',
    'तालव्य': 'palatal', 
    'मूर्धन्य': 'retroflex',
    'दन्त्य': 'dental',
    'ओष्ठ्य': 'labial',
    'guttural': 'guttural',
    'palatal': 'palatal',
    'retroflex': 'retroflex', 
    'dental': 'dental',
    'labial': 'labial'
  };

  for (const [place, phonemes] of Object.entries(ARTICULATION_PLACES)) {
    if (phonemes.includes(phoneme)) {
      return PLACE_MAPPING[place] || place;
    }
  }
  
  return null;
}

/**
 * Analyzes phonetic features of a phoneme
 * @param {string} phoneme - The phoneme to analyze
 * @returns {Object} - Detailed phonetic analysis
 */
export function analyzePhoneticFeatures(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return {
      isValid: false,
      error: 'Invalid phoneme input'
    };
  }

  const script = detectScript(phoneme);
  const savarnaGroup = getSavarnaGroup(phoneme);
  const articulationPlace = getArticulationPlace(phoneme);
  
  // Check if it's a vowel by looking for vowel characters
  const vowelChars = 'अआइईउऊऋॠएऐओऔaāiīuūṛṝeaioau';
  const isVowel = vowelChars.includes(phoneme);
  
  return {
    isValid: true,
    phoneme: phoneme,
    script: script,
    savarnaGroup: savarnaGroup,
    articulationPlace: articulationPlace,
    isVowel: isVowel,
    isConsonant: !isVowel && savarnaGroup !== null
  };
}

/**
 * Validates phonetic classification for testing
 * @param {string} phoneme - Phoneme to validate
 * @returns {Object} - Validation result
 */
export function validatePhoneticClassification(phoneme) {
  const analysis = analyzePhoneticFeatures(phoneme);
  
  if (!analysis.isValid) {
    return analysis;
  }

  return {
    isValid: true,
    phoneme: phoneme,
    hasSavarnaGroup: analysis.savarnaGroup !== null,
    hasArticulationPlace: analysis.articulationPlace !== null,
    isRecognized: analysis.savarnaGroup !== null && analysis.articulationPlace !== null
  };
}
