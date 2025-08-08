
/**
 * Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic)
 *
 * This sutra defines the term "vṛddhi". It states that the vowels ā (आ), ai (ऐ), and au (औ) are called vṛddhi.
 * In Pāṇini's system, "āT" (आत्) refers to "ā" and "aiC" (ऐच्) is a pratyāhāra (abbreviation)
 * that includes the vowels "ai" (ऐ) and "au" (औ).
 * 
 * This is the foundational sutra that establishes the vowel categories used throughout Sanskrit grammar.
 */

const vrddhiVowels = ['ā', 'ai', 'au'];
const vrddhiVowelsDevanagari = ['आ', 'ऐ', 'औ'];

/**
 * Checks if a given vowel is a vṛddhi vowel.
 *
 * @param {string} vowel The vowel to check (IAST or Devanagari).
 * @returns {boolean} True if the vowel is a vṛddhi vowel, false otherwise.
 */
function isVrddhi(vowel) {
  if (!vowel) return false;
  return vrddhiVowels.includes(vowel) || vrddhiVowelsDevanagari.includes(vowel);
}

/**
 * Gets all vṛddhi vowels in both IAST and Devanagari scripts.
 *
 * @returns {Object} Object containing IAST and Devanagari vṛddhi vowels.
 */
function getAllVrddhiVowels() {
  return {
    iast: [...vrddhiVowels],
    devanagari: [...vrddhiVowelsDevanagari],
    combined: [...vrddhiVowels, ...vrddhiVowelsDevanagari]
  };
}

/**
 * Analyzes a vowel and provides detailed information about its vṛddhi status.
 *
 * @param {string} vowel The vowel to analyze.
 * @returns {Object} Analysis object with detailed information.
 */
function analyzeVowel(vowel) {
  if (!vowel) {
    return {
      vowel: null,
      isValid: false,
      isVrddhi: false,
      script: null,
      category: null,
      explanation: 'Invalid or empty vowel'
    };
  }

  const isVrddhiVowel = isVrddhi(vowel);
  const isIAST = vrddhiVowels.includes(vowel);
  const isDevanagari = vrddhiVowelsDevanagari.includes(vowel);
  
  let category = null;
  if (vowel === 'ā' || vowel === 'आ') category = 'long-a';
  else if (vowel === 'ai' || vowel === 'ऐ') category = 'diphthong-ai';
  else if (vowel === 'au' || vowel === 'औ') category = 'diphthong-au';

  return {
    vowel: vowel,
    isValid: true,
    isVrddhi: isVrddhiVowel,
    script: isIAST ? 'IAST' : (isDevanagari ? 'Devanagari' : 'Unknown'),
    category: category,
    explanation: isVrddhiVowel ? 
      `${vowel} is a vṛddhi vowel (${category})` : 
      `${vowel} is not a vṛddhi vowel`
  };
}

/**
 * Validates if a string represents a proper vṛddhi transformation.
 * This checks if the given transformation follows vṛddhi rules.
 *
 * @param {string} original The original vowel.
 * @param {string} transformed The transformed vowel.
 * @returns {boolean} True if it's a valid vṛddhi transformation.
 */
function isValidVrddhiTransformation(original, transformed) {
  if (!original || !transformed) return false;
  
  // Common vṛddhi transformations
  const transformations = {
    'a': 'ā', 'i': 'ai', 'u': 'au',
    'ī': 'ai', 'ū': 'au', 'ṛ': 'ār',
    'e': 'ai', 'o': 'au'
  };

  return transformations[original] === transformed && isVrddhi(transformed);
}

/**
 * Applies Sutra 1.1.1 to classify a given vowel according to vṛddhi definition.
 *
 * @param {string} vowel The vowel to classify.
 * @returns {Object} Classification result with detailed analysis.
 */
function applySutra111(vowel) {
  const analysis = analyzeVowel(vowel);
  
  return {
    input: vowel,
    sutraApplied: '1.1.1',
    sutraName: 'vṛddhirādaic',
    classification: analysis.isVrddhi ? 'vṛddhi' : 'non-vṛddhi',
    isVrddhi: analysis.isVrddhi,
    category: analysis.category,
    script: analysis.script,
    explanation: analysis.explanation,
    traditionalDefinition: 'ā, ai, au are called vṛddhi vowels',
    examples: {
      'ā': ['kāraḥ (कारः) - action', 'nāma (नाम) - name'],
      'ai': ['vaidya (वैद्य) - physician', 'saika (सैक) - collection'],
      'au': ['gaura (गौर) - fair', 'mauna (मौन) - silence']
    }[analysis.category] || []
  };
}

export {
  isVrddhi,
  vrddhiVowels,
  vrddhiVowelsDevanagari,
  getAllVrddhiVowels,
  analyzeVowel,
  isValidVrddhiTransformation,
  applySutra111
};
