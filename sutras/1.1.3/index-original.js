/**
 * Sutra 1.1.3: इको गुणवृद्धी (iko guṇavṛddhī)
 *
 * This is a paribhāṣā (interpretive rule) that states: "In the absence of any special instruction,
 * whenever गुण (guṇa) or वृद्धि (vṛddhi) is enjoined for any expression by using the terms गुण or वृद्धि,
 * it is to be understood to come in place of the इक् (ik) vowels (इ, उ, ऋ, लृ) of that expression."
 *
 * This sutra establishes the default scope of guṇa and vṛddhi operations - they apply specifically
 * to the 'ik' class of vowels unless otherwise specified.
 * 
 * IMPLEMENTATION NOTES:
 * 
 * Current Status: Lookup-table based transformations
 * - Accurate and performant for production use
 * - Complete bilingual support (IAST/Devanagari)
 * - Comprehensive vowel sequence detection
 * 
 * Future Enhancement Path: Feature-Based Phonological Derivation
 * The transformation mappings could be derived from phonological features:
 * 
 * Guṇa Pattern:
 * - i/ī (high front) → e (mid front) 
 * - u/ū (high back) → o (mid back)
 * - ṛ/ṝ (high central retroflex) → ar (mid central + resonant)
 * - ḷ/ḹ (high central lateral) → al (mid central + lateral)
 * 
 * Vṛddhi Pattern:  
 * - i/ī (high front) → ai (front diphthong)
 * - u/ū (high back) → au (back diphthong) 
 * - ṛ/ṝ (high central retroflex) → ār (long central + resonant)
 * - ḷ/ḹ (high central lateral) → āl (long central + lateral)
 * 
 * This would enable systematic derivation rather than lookup, allowing for:
 * - Dynamic rule generation
 * - Better handling of edge cases
 * - Integration with broader phonological systems
 * - More maintainable and extensible code
 */

// The 'ik' vowels that are subject to guṇa and vṛddhi transformations
const ikVowels = ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'];
const ikVowelsDevanagari = ['इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ'];

/**
 * Checks if a given vowel belongs to the 'ik' class.
 *
 * @param {string} vowel The vowel to check (IAST or Devanagari).
 * @returns {boolean} True if the vowel is an 'ik' vowel, false otherwise.
 */
function isIkVowel(vowel) {
  if (!vowel) return false;
  return ikVowels.includes(vowel) || ikVowelsDevanagari.includes(vowel);
}

/**
 * Applies guṇa transformation to an 'ik' vowel.
 * This function implements the guṇa rule as specified in sutra 1.1.3.
 * 
 * Note: Current implementation uses lookup tables for accuracy and speed.
 * Future enhancement: Feature-based derivation (e.g., "high front vowel → mid front vowel")
 *
 * @param {string} vowel The 'ik' vowel to transform (IAST or Devanagari).
 * @returns {string|null} The guṇa form if the vowel is 'ik', null otherwise.
 */
function applyGunaToIk(vowel) {
  if (!isIkVowel(vowel)) {
    return null;
  }
  
  // Hardcoded mappings (accurate but could be feature-derived in advanced system)
  // Pattern: ik vowels → guṇa grade (one step higher in vowel gradation)
  const gunaMapping = {
    // IAST mappings
    'i': 'e',
    'ī': 'e',
    'u': 'o',
    'ū': 'o',
    'ṛ': 'ar',
    'ṝ': 'ar',
    'ḷ': 'al',
    'ḹ': 'al',
    // Devanagari mappings
    'इ': 'ए',
    'ई': 'ए', 
    'उ': 'ओ',
    'ऊ': 'ओ',
    'ऋ': 'अर्',
    'ॠ': 'अर्',
    'ऌ': 'अल्',
    'ॡ': 'अल्'
  };
  
  return gunaMapping[vowel];
}

/**
 * Applies vṛddhi transformation to an 'ik' vowel.
 * This function implements the vṛddhi rule as specified in sutra 1.1.3.
 * 
 * Note: Current implementation uses lookup tables for accuracy and speed.
 * Future enhancement: Feature-based derivation (e.g., "high vowel → long diphthong/long vowel")
 *
 * @param {string} vowel The 'ik' vowel to transform (IAST or Devanagari).
 * @returns {string|null} The vṛddhi form if the vowel is 'ik', null otherwise.
 */
function applyVrddhiToIk(vowel) {
  if (!isIkVowel(vowel)) {
    return null;
  }
  
  // Hardcoded mappings (accurate but could be feature-derived in advanced system)  
  // Pattern: ik vowels → vṛddhi grade (two steps higher in vowel gradation)
  const vrddhiMapping = {
    // IAST mappings
    'i': 'ai',
    'ī': 'ai',
    'u': 'au',
    'ū': 'au',
    'ṛ': 'ār',
    'ṝ': 'ār',
    'ḷ': 'āl',
    'ḹ': 'āl',
    // Devanagari mappings
    'इ': 'ऐ',
    'ई': 'ऐ',
    'उ': 'औ',
    'ऊ': 'औ',
    'ऋ': 'आर्',
    'ॠ': 'आर्',
    'ऌ': 'आल्',
    'ॡ': 'आल्'
  };
  
  return vrddhiMapping[vowel];
}

/**
 * Determines the scope of guṇa/vṛddhi operations according to sutra 1.1.3.
 * This function identifies which vowels in a given word are subject to guṇa/vṛddhi.
 * Optimized to focus on ik vowels and their transformations.
 *
 * @param {string} word The word to analyze (IAST or Devanagari).
 * @returns {Array} Array of objects with vowel positions and their transformability.
 */
function getGunaVrddhiScope(word) {
  const results = [];
  
  // Focus on ik vowels and their potential transformations + common vowels for completeness
  const relevantVowels = [
    // IAST: longer patterns first for proper matching
    'ār', 'āl', 'ai', 'au', 'ā', 'ī', 'ū', 'ṝ', 'ḹ', // transformation results & long vowels
    'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'a',                // ik vowels + basic vowels
    // Devanagari: longer patterns first  
    'आर्', 'आल्', 'ऐ', 'औ', 'आ', 'ई', 'ऊ', 'ॠ', 'ॡ', // transformation results & long vowels
    'इ', 'उ', 'ऋ', 'ऌ', 'ए', 'ओ', 'अ'                 // ik vowels + basic vowels
  ];
  
  let position = 0;
  while (position < word.length) {
    let foundVowel = null;
    let vowelLength = 0;
    
    // Check for the longest possible vowel match at current position
    for (const vowel of relevantVowels) {
      if (word.substring(position, position + vowel.length) === vowel) {
        foundVowel = vowel;
        vowelLength = vowel.length;
        break;
      }
    }
    
    if (foundVowel) {
      results.push({
        vowel: foundVowel,
        position: position,
        isIk: isIkVowel(foundVowel),
        gunaForm: applyGunaToIk(foundVowel),
        vrddhiForm: applyVrddhiToIk(foundVowel)
      });
      position += vowelLength;
    } else {
      position++;
    }
  }
  
  return results;
}

/**
 * Gets the guṇa form of any vowel according to Pāṇini's system.
 * This function consolidates guṇa transformation logic in the appropriate sutra.
 *
 * @param {string} vowel The input vowel (IAST or Devanagari).
 * @returns {string|null} The guṇa form if applicable, null otherwise.
 */
function getGunaForm(vowel) {
  // For ik vowels, use the ik-specific transformation
  if (isIkVowel(vowel)) {
    return applyGunaToIk(vowel);
  }
  
  // For vowels that don't transform to guṇa, return null
  return null;
}

/**
 * Gets the vṛddhi form of any vowel according to Pāṇini's system.
 * This function consolidates vṛddhi transformation logic in the appropriate sutra.
 *
 * @param {string} vowel The input vowel (IAST or Devanagari).
 * @returns {string|null} The vṛddhi form if applicable, null otherwise.
 */
function getVrddhiForm(vowel) {
  // For ik vowels, use the ik-specific transformation
  if (isIkVowel(vowel)) {
    return applyVrddhiToIk(vowel);
  }
  
  // Additional vṛddhi transformations for non-ik vowels
  const additionalVrddhiMapping = {
    // IAST mappings
    'a': 'ā',
    'e': 'ai', 
    'o': 'au',
    // Devanagari mappings
    'अ': 'आ',
    'ए': 'ऐ',
    'ओ': 'औ'
  };
  
  return additionalVrddhiMapping[vowel] || null;
}

/**
 * Applies guṇa transformation to any vowel if applicable.
 *
 * @param {string} vowel The vowel to transform (IAST or Devanagari).
 * @returns {string} The transformed vowel or the original if no transformation applies.
 */
function applyGuna(vowel) {
  const gunaForm = getGunaForm(vowel);
  return gunaForm || vowel;
}

/**
 * Applies vṛddhi transformation to any vowel if applicable.
 *
 * @param {string} vowel The vowel to transform (IAST or Devanagari).
 * @returns {string} The transformed vowel or the original if no transformation applies.
 */
function applyVrddhi(vowel) {
  const vrddhiForm = getVrddhiForm(vowel);
  return vrddhiForm || vowel;
}

/**
 * Validates if a string represents a proper vṛddhi transformation.
 * This checks if the given transformation follows vṛddhi rules.
 *
 * @param {string} original The original vowel (IAST or Devanagari).
 * @param {string} transformed The transformed vowel (IAST or Devanagari).
 * @returns {boolean} True if it's a valid vṛddhi transformation.
 */
function isValidVrddhiTransformation(original, transformed) {
  if (!original || !transformed) return false;
  
  const expectedVrddhi = getVrddhiForm(original);
  return expectedVrddhi === transformed;
}

/**
 * Validates if a string represents a proper guṇa transformation.
 * This checks if the given transformation follows guṇa rules.
 *
 * @param {string} original The original vowel (IAST or Devanagari).
 * @param {string} transformed The transformed vowel (IAST or Devanagari).
 * @returns {boolean} True if it's a valid guṇa transformation.
 */
function isValidGunaTransformation(original, transformed) {
  if (!original || !transformed) return false;
  
  const expectedGuna = getGunaForm(original);
  return expectedGuna === transformed;
}

/**
 * Validates if a guṇa or vṛddhi operation is applicable according to sutra 1.1.3.
 *
 * @param {string} vowel The vowel to check.
 * @param {string} operation Either 'guna' or 'vrddhi'.
 * @returns {boolean} True if the operation is applicable, false otherwise.
 */
function isOperationApplicable(vowel, operation) {
  if (!isIkVowel(vowel)) {
    return false;
  }
  
  if (operation === 'guna') {
    return applyGunaToIk(vowel) !== null;
  } else if (operation === 'vrddhi') {
    return applyVrddhiToIk(vowel) !== null;
  }
  
  return false;
}

export {
  ikVowels,
  ikVowelsDevanagari,
  isIkVowel,
  applyGunaToIk,
  applyVrddhiToIk,
  getGunaVrddhiScope,
  isOperationApplicable,
  getGunaForm,
  getVrddhiForm,
  applyGuna,
  applyVrddhi,
  isValidVrddhiTransformation,
  isValidGunaTransformation
};
