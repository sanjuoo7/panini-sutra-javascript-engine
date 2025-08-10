/**
 * Phoneme Tokenization Utilities
 * 
 * This module provides robust phoneme tokenization for Sanskrit text:
 * - IAST multi-character phoneme handling
 * - Devanagari conjunct consonant processing
 * - Script-adaptive tokenization
 * 
 * Created: August 8, 2025
 */

import { detectScript } from './script-detection.js';

/**
 * IAST phonemes ordered by length (longest first) for proper matching
 */
const IAST_PHONEMES = [
  // Diphthongs (2 characters)
  'ai', 'au', 
  // Long vowels with diacritics (2 characters)
  'ā', 'ī', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ',
  // Aspirated consonants (2 characters)
  'kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh',
  // Special consonants with diacritics
  'ṅ', 'ñ', 'ṭ', 'ḍ', 'ṇ', 'ś', 'ṣ', 'ḥ', 'ṃ',
  // Basic vowels and consonants (1 character)
  'a', 'i', 'u', 'e', 'o',
  'k', 'g', 'c', 'j', 't', 'd', 'n', 'p', 'b', 'm',
  'y', 'r', 'l', 'v', 'h'
];

/**
 * Devanagari phonemes ordered by complexity (longer patterns first)
 */
const DEVANAGARI_PHONEMES = [
  // Vowel diacritics and independent vowels
  'आ', 'ऐ', 'औ', 'ई', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ओ', 'अ', 'इ', 'उ',
  'ा', 'ै', 'ौ', 'ी', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ो', 'ि', 'ु',
  // Consonants (including all stops, semivowels, sibilants)
  'क', 'ख', 'ग', 'घ', 'ङ',
  'च', 'छ', 'ज', 'झ', 'ञ',
  'ट', 'ठ', 'ड', 'ढ', 'ण',
  'त', 'थ', 'द', 'ध', 'न',
  'प', 'फ', 'ब', 'भ', 'म',
  'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
  // Diacritics and special characters
  '्', 'ं', 'ः'
];

/**
 * Tokenizes IAST text into proper phonemic units
 * @param {string} text - IAST text to tokenize
 * @returns {string[]} - Array of phonemic units
 */
export function tokenizeIastPhonemes(text) {
  if (!text || typeof text !== 'string') return [];

  const phonemes = [];
  let position = 0;

  while (position < text.length) {
    let matchFound = false;
    
    // Try to match the longest possible phoneme at current position
    for (const phoneme of IAST_PHONEMES) {
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

  const phonemes = [];
  let position = 0;

  while (position < text.length) {
    let matchFound = false;

    // Match predefined single code-point phonemes (no conjunct grouping;
    // tests expect explicit halant + consonant separation e.g. 'स्था' => ['स','्','थ','ा'])
    for (const phoneme of DEVANAGARI_PHONEMES) {
      if (text.substring(position, position + phoneme.length) === phoneme) {
        phonemes.push(phoneme);
        position += phoneme.length;
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      phonemes.push(text[position]);
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
      // For mixed script, try both and combine results appropriately
      // This is a simplified approach; more sophisticated parsing might be needed
      phonemes = [...tokenizeIastPhonemes(text), ...tokenizeDevanagariPhonemes(text)]
        .filter((p, i, arr) => arr.indexOf(p) === i); // Remove duplicates
      break;
    default:
      phonemes = text.split(''); // Fallback to character splitting
  }
  
  return {
    phonemes,
    script,
    count: phonemes.length,
    original: text,
    method: `${script} phoneme tokenization`
  };
}

/**
 * Advanced phoneme analysis with syllable boundaries
 * @param {string} text - Text to analyze
 * @returns {Object} - Detailed phoneme analysis
 */
export function analyzePhonemeStructure(text) {
  const tokenResult = tokenizePhonemes(text);
  const { phonemes, script } = tokenResult;
  
  // Classify each phoneme
  const analysis = phonemes.map((phoneme, index) => {
    const isVowel = script === 'IAST' ? 
      /^[aiueāīūeaoaiauṛṝḷḹ]$/.test(phoneme) :
      /^[अआइईउऊऋॠऌॡएऐओऔािीुूृॄॢॣेैोौ]$/.test(phoneme);
    
    const isConsonant = !isVowel && phoneme !== ' ';
    
    return {
      phoneme,
      position: index,
      type: isVowel ? 'vowel' : isConsonant ? 'consonant' : 'other',
      isVowel,
      isConsonant,
      length: phoneme.length
    };
  });
  
  return {
    ...tokenResult,
    analysis,
    vowelCount: analysis.filter(p => p.isVowel).length,
    consonantCount: analysis.filter(p => p.isConsonant).length,
    structure: analysis.map(p => p.type).join('-')
  };
}
