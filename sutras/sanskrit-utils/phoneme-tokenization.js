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
 * @param {Object} options - Tokenization options
 * @param {boolean} options.accurate - Use phonetically accurate tokenization (default: false for backward compatibility)
 * @returns {string[]} - Array of phonemic units
 */
export function tokenizeDevanagariPhonemes(text, options = {}) {
  if (!text || typeof text !== 'string') return [];

  const { accurate = false } = options;
  
  if (accurate) {
    return tokenizeDevanagariPhonemesAccurate(text);
  } else {
    return tokenizeDevanagariPhonemesLegacy(text);
  }
}

/**
 * Legacy tokenizer that matches character-based expectations of existing tests
 * @param {string} text - Devanagari text to tokenize
 * @returns {string[]} - Array of character-based tokens
 */
function tokenizeDevanagariPhonemesLegacy(text) {
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
 * Phonetically accurate Devanagari tokenizer that handles inherent vowels
 * @param {string} text - Devanagari text to tokenize
 * @returns {string[]} - Array of phonemic units
 */
function tokenizeDevanagariPhonemesAccurate(text) {
  const phonemes = [];
  let position = 0;

  while (position < text.length) {
    const currentChar = text[position];
    
    // Handle independent vowels (stand-alone vowels)
    if (isIndependentVowel(currentChar)) {
      phonemes.push(currentChar);
      position++;
      continue;
    }
    
    // Handle consonants
    if (isDevanagariConsonant(currentChar)) {
      phonemes.push(currentChar);
      position++;
      
      // Check if next character is a vowel diacritic or halant
      if (position < text.length) {
        const nextChar = text[position];
        
        if (isVowelDiacritic(nextChar)) {
          // Add the vowel diacritic
          phonemes.push(nextChar);
          position++;
        } else if (nextChar === '्') {
          // Halant suppresses inherent vowel
          phonemes.push(nextChar);
          position++;
        } else if (!isDevanagariConsonant(nextChar) && !isIndependentVowel(nextChar)) {
          // Add inherent 'a' vowel if not followed by another consonant or vowel
          if (nextChar !== ' ') {
            phonemes.push('अ');
          }
        } else {
          // Add inherent 'a' before next consonant or vowel
          phonemes.push('अ');
        }
      } else {
        // Add inherent 'a' at end of text
        phonemes.push('अ');
      }
      continue;
    }
    
    // Handle special characters (anusvara, visarga, etc.)
    if (currentChar === 'ं' || currentChar === 'ः' || currentChar === '्') {
      phonemes.push(currentChar);
      position++;
      continue;
    }
    
    // Handle any other character (punctuation, numbers, etc.)
    phonemes.push(currentChar);
    position++;
  }
  
  return phonemes;
}

/**
 * Helper function to check if a character is an independent Devanagari vowel
 * @param {string} char - Character to check
 * @returns {boolean} - True if independent vowel
 */
function isIndependentVowel(char) {
  const independentVowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'];
  return independentVowels.includes(char);
}

/**
 * Helper function to check if a character is a Devanagari vowel diacritic
 * @param {string} char - Character to check
 * @returns {boolean} - True if vowel diacritic
 */
function isVowelDiacritic(char) {
  const vowelDiacritics = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'];
  return vowelDiacritics.includes(char);
}

/**
 * Helper function to check if a character is a Devanagari consonant
 * @param {string} char - Character to check
 * @returns {boolean} - True if consonant
 */
function isDevanagariConsonant(char) {
  const consonants = [
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'
  ];
  return consonants.includes(char);
}

/**
 * Tokenizes text into phonemes based on script detection
 * @param {string} text - Text to tokenize
 * @param {Object} options - Tokenization options
 * @param {boolean} options.accurate - Use phonetically accurate tokenization for Devanagari (default: false)
 * @returns {Object} - Result with phonemes and metadata
 */
export function tokenizePhonemes(text, options = {}) {
  const script = detectScript(text);
  let phonemes = [];
  
  switch (script) {
    case 'Devanagari':
      phonemes = tokenizeDevanagariPhonemes(text, options);
      break;
    case 'IAST':
      phonemes = tokenizeIastPhonemes(text);
      break;
    case 'Mixed':
      // For mixed script, try both and combine results appropriately
      // This is a simplified approach; more sophisticated parsing might be needed
      phonemes = [...tokenizeIastPhonemes(text), ...tokenizeDevanagariPhonemes(text, options)]
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
    method: `${script} phoneme tokenization${options.accurate ? ' (accurate)' : ''}`
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
