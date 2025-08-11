/**
 * Sutra 1.2.11: लिङ्सिचावात्मनेपदेषु
 * 
 * Description:
 * After roots ending in a consonant that adjoins a vowel of इक् प्रत्यहार, 
 * the substitutes of लिङ् and सिच्, when they begin with a consonant of झल् प्रत्यहार,
 * are कित् when the आत्मनेपद affixes follow.
 * 
 * Purpose:
 * This sutra provides कित् designation for लिङ् (potential) and सिच् (future) affixes
 * when they begin with झल् consonants, occur after roots with specific phonological
 * properties (ending in consonant + इक् vowel), and are followed by आत्मनेपद endings.
 * 
 * Dependencies:
 * - Existing kit-designation utility functions
 * - New isAtmanepadaAffix() function for आत्मनेपद detection
 * 
 * Created: January 2025
 */

import { 
  detectScript
} from '../sanskrit-utils/script-detection.js';

import { 
  validateSanskritWord 
} from '../sanskrit-utils/validation.js';

import { 
  isSicAffix,
  isLingAffix, 
  beginsWithJhal,
  endsWithIka,
  endsWithHal
} from '../sanskrit-utils/kit-designation.js';

import { 
  isAtmanepadaAffix
} from '../sanskrit-utils/pada-analysis.js';

import { 
  COMMON_PRATYAHARAS 
} from '../sanskrit-utils/pratyahara-construction.js';

/**
 * Determines if लिङ् or सिच् substitutes should be कित् according to Sutra 1.2.11
 * 
 * Conditions for कित् designation:
 * 1. Root must end in consonant + इक् vowel pattern
 * 2. Affix must be a substitute of लिङ् or सिच्
 * 3. Affix substitute must begin with झल् consonant
 * 4. Following affixes must be आत्मनेपद
 * 
 * @param {string} word - The word or word form being analyzed
 * @param {Object} context - Optional context object
 * @param {string} context.root - The root of the word
 * @param {string} context.affix - The primary affix (लिङ् or सिच्)
 * @param {string} context.substitute - The substitute form of the affix
 * @param {string} context.followingAffix - The आत्मनेपद affix that follows
 * @returns {Object} Analysis result with kit designation determination
 */
export function sutra1211(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isValid: false,
      error: 'Invalid input: word is required',
      isKit: false,
      sutraApplies: false
    };
  }

  const cleanWord = word.trim();
  const script = detectScript(cleanWord);

  // If context is not provided, try to analyze the word structure
  if (context.root === undefined || context.affix === undefined || 
      context.substitute === undefined || context.followingAffix === undefined) {
    return analyzeWordStructure(cleanWord, context);
  }

  // Validate all context components (use basic validation)
  const { root, affix, substitute, followingAffix } = context;

  // Basic validation - check if inputs are non-empty strings
  if (!root || typeof root !== 'string' || !root.trim() ||
      !affix || typeof affix !== 'string' || !affix.trim() ||
      !substitute || typeof substitute !== 'string' || !substitute.trim() ||
      !followingAffix || typeof followingAffix !== 'string' || !followingAffix.trim()) {
    return {
      isValid: false,
      error: 'Invalid Sanskrit input in context',
      isKit: false,
      sutraApplies: false
    };
  }

  // Check condition 1: Root must end in consonant + इक् vowel pattern
  const hasConsonantIkaPattern = checkConsonantIkaPattern(root);

  // Check condition 2: Affix must be लिङ् or सिच्
  const isLingOrSic = isLingAffix(affix) || isSicAffix(affix);

  // Check condition 3: Substitute must begin with झल् consonant
  const substituteBeginsWithJhal = Boolean(beginsWithJhal(substitute));

  // Check condition 4: Following affix must be आत्मनेपद
  const isAtmanepada = isAtmanepadaAffix(followingAffix);

  // Determine if the sutra applies
  const sutraApplies = hasConsonantIkaPattern && 
                      isLingOrSic && 
                      substituteBeginsWithJhal && 
                      isAtmanepada;

  return {
    isValid: true,
    isKit: sutraApplies,
    sutraApplies: sutraApplies,
    conditions: {
      hasConsonantIkaPattern,
      isLingOrSic: isLingOrSic,
      substituteBeginsWithJhal,
      isAtmanepada
    },
    analysis: {
      root: root,
      affix: affix,
      substitute: substitute,
      followingAffix: followingAffix,
      script: script
    },
    sutra: '1.2.11',
    description: 'लिङ्सिचावात्मनेपदेषु - कित् designation for लिङ्/सिच् substitutes with झल् beginning when followed by आत्मनेपद'
  };
}

/**
 * Checks if a root ends with consonant and has इक् vowel pattern that adjoins it
 * @param {string} root - The root to check
 * @returns {boolean} - True if root has consonant ending with adjoining इक् pattern
 */
function checkConsonantIkaPattern(root) {
  if (!root || root.length < 1) {
    return false;
  }

  const script = detectScript(root);
  
  // Check if root ends with consonant
  if (!endsWithHal(root)) {
    return false;
  }

  // Check if root contains इक् vowels that could adjoin the final consonant
  // This is a more flexible interpretation that looks for इक् vowels in the root
  const ikaPratyahara = COMMON_PRATYAHARAS.ik;
  
  if (script === 'Devanagari') {
    // Check for इक् vowels or matras in the root
    const ikaMatras = ['ि', 'ु', 'ृ', 'ॢ']; // i, u, ṛ, ḷ matras
    const ikaVowels = ['इ', 'उ', 'ऋ', 'ऌ']; // independent vowels
    
    return ikaMatras.some(matra => root.includes(matra)) ||
           ikaVowels.some(vowel => root.includes(vowel));
  } else {
    // For IAST, check if any इक् vowels appear in the root
    return ikaPratyahara.some(vowel => root.includes(vowel));
  }
}

/**
 * Attempts to analyze word structure when full context is not provided
 * @param {string} word - The word to analyze
 * @param {Object} partialContext - Any partial context provided
 * @returns {Object} Analysis result with available information
 */
function analyzeWordStructure(word, partialContext = {}) {
  // This is a simplified analysis for when full context is not provided
  // In practice, full morphological analysis would require more sophisticated parsing
  
  return {
    isValid: true,
    isKit: false,
    sutraApplies: false,
    conditions: {
      hasConsonantIkaPattern: false,
      isLingOrSic: false,
      substituteBeginsWithJhal: false,
      isAtmanepada: false
    },
    analysis: {
      word: word,
      script: detectScript(word),
      note: 'Full morphological context required for accurate analysis',
      providedContext: partialContext
    },
    sutra: '1.2.11',
    description: 'लिङ्सिचावात्मनेपदेषु - Requires root, affix, substitute, and following affix for complete analysis'
  };
}

export default sutra1211;
