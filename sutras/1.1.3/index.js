/**
 * Sutra 1.1.3: इको गुणवृद्धी (iko guṇavṛddhī)
 *
 * This is a paribhāṣā (interpretive rule) that states: "In the absence of any special instruction,
 * whenever गुण (guṇa) or वृद्धि (vṛddhi) is enjoined for any expression by using the terms गुण or वृद्धि,
 * it is to be understood to come in place of the इक् (ik) vowels (इ, उ, ऋ, लृ) of that expression."
 *
 * This sutra establishes the default scope of guṇa and vṛddhi operations - they apply specifically
 * to the 'ik' class of vowels unless otherwise specified.
 */

// The 'ik' vowels that are subject to guṇa and vṛddhi transformations
const ikVowels = ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'];

/**
 * Checks if a given vowel belongs to the 'ik' class.
 *
 * @param {string} vowel The vowel to check.
 * @returns {boolean} True if the vowel is an 'ik' vowel, false otherwise.
 */
function isIkVowel(vowel) {
  return ikVowels.includes(vowel);
}

/**
 * Applies guṇa transformation to an 'ik' vowel.
 * This function implements the guṇa rule as specified in sutra 1.1.3.
 *
 * @param {string} vowel The 'ik' vowel to transform.
 * @returns {string|null} The guṇa form if the vowel is 'ik', null otherwise.
 */
function applyGunaToIk(vowel) {
  if (!isIkVowel(vowel)) {
    return null;
  }
  
  const gunaMapping = {
    'i': 'e',
    'ī': 'e',
    'u': 'o',
    'ū': 'o',
    'ṛ': 'ar',
    'ṝ': 'ar',
    'ḷ': 'al',
    'ḹ': 'al'
  };
  
  return gunaMapping[vowel];
}

/**
 * Applies vṛddhi transformation to an 'ik' vowel.
 * This function implements the vṛddhi rule as specified in sutra 1.1.3.
 *
 * @param {string} vowel The 'ik' vowel to transform.
 * @returns {string|null} The vṛddhi form if the vowel is 'ik', null otherwise.
 */
function applyVrddhiToIk(vowel) {
  if (!isIkVowel(vowel)) {
    return null;
  }
  
  const vrddhiMapping = {
    'i': 'ai',
    'ī': 'ai',
    'u': 'au',
    'ū': 'au',
    'ṛ': 'ār',
    'ṝ': 'ār',
    'ḷ': 'āl',
    'ḹ': 'āl'
  };
  
  return vrddhiMapping[vowel];
}

/**
 * Determines the scope of guṇa/vṛddhi operations according to sutra 1.1.3.
 * This function identifies which vowels in a given word are subject to guṇa/vṛddhi.
 *
 * @param {string} word The word to analyze.
 * @returns {Array} Array of objects with vowel positions and their transformability.
 */
function getGunaVrddhiScope(word) {
  const vowelRegex = /[aiuṛḷāīūṝḹeaoaiauāt]/g;
  const results = [];
  let match;
  
  while ((match = vowelRegex.exec(word)) !== null) {
    const vowel = match[0];
    results.push({
      vowel: vowel,
      position: match.index,
      isIk: isIkVowel(vowel),
      gunaForm: applyGunaToIk(vowel),
      vrddhiForm: applyVrddhiToIk(vowel)
    });
  }
  
  return results;
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
  isIkVowel,
  applyGunaToIk,
  applyVrddhiToIk,
  getGunaVrddhiScope,
  isOperationApplicable
};
