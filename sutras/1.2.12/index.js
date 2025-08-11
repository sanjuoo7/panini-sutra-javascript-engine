/**
 * Sutra 1.2.12: उश्च
 * 
 * Description:
 * "And (the same applies to verbs) ending in ऋ"
 * 
 * This extends Sutra 1.2.11 to apply कित् designation to लिङ्/सिच् substitutes
 * that begin with झल् consonants when they follow verbs ending in ऋ and
 * are followed by आत्मनेपद affixes.
 * 
 * Purpose:
 * Extends the कित् designation rule from 1.2.11 to verbs ending in ऋ vowel.
 * The complete conditions are:
 * 1. Root ends in ऋ vowel (this sutra's addition)
 * 2. Affix is substitute of लिङ् or सिच्
 * 3. Affix begins with झल् consonant
 * 4. आत्मनेपद endings follow
 * 
 * Dependencies:
 * - kit-designation utilities for affix analysis
 * - pada-analysis utilities for आत्मनेपद detection
 * - New endsWithR() function for ऋ-ending detection
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
  endsWithR
} from '../sanskrit-utils/kit-designation.js';

import { 
  isAtmanepadaAffix
} from '../sanskrit-utils/pada-analysis.js';

/**
 * Determines if लिङ् or सिच् substitutes should be कित् according to Sutra 1.2.12
 * 
 * Conditions for कित् designation:
 * 1. Root must end in ऋ vowel
 * 2. Affix must be a substitute of लिङ् or सिच्
 * 3. Affix must begin with झल् consonant
 * 4. Following affix must be आत्मनेपद
 * 
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context for morphological analysis
 * @param {string} context.root - The verbal root
 * @param {string} context.affix - The current affix being analyzed
 * @param {string} context.followingAffix - The affix that follows
 * @param {string} context.tense - The tense/mood (लिङ् or future)
 * @returns {Object} Analysis result with कित् designation and details
 */
export function sutra1212(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isKit: false,
      applicable: false,
      error: 'Invalid word input',
      word: word,
      sutraNumber: '1.2.12'
    };
  }

  try {
    const validationResult = validateSanskritWord(word);
    if (!validationResult.isValid) {
      return {
        isKit: false,
        applicable: false,
        error: `Word validation failed: ${validationResult.error}`,
        word: word,
        sutraNumber: '1.2.12'
      };
    }

    const normalizedWord = word.trim();
    const script = detectScript(normalizedWord);
    
    // Extract or use provided context
    const root = context.root || extractRoot(normalizedWord);
    const affix = context.affix || extractAffix(normalizedWord);
    const followingAffix = context.followingAffix || extractFollowingAffix(normalizedWord);
    const tense = context.tense || determineTense(normalizedWord, affix);

    // Condition 1: Root must end in ऋ vowel
    if (!endsWithR(root)) {
      return {
        isKit: false,
        applicable: false,
        reason: 'Root does not end in ऋ vowel',
        conditions: {
          rEndingRoot: false,
          validAffix: null,
          jhalBeginning: null,
          atmanepadaFollowing: null
        },
        root: root,
        word: normalizedWord,
        script: script,
        sutraNumber: '1.2.12'
      };
    }

    // Condition 2: Affix must be substitute of लिङ् or सिच्
    const isValidAffix = isSicAffix(affix) || isLingAffix(affix);
    if (!isValidAffix) {
      return {
        isKit: false,
        applicable: false,
        reason: 'Affix is not a substitute of लिङ् or सिच्',
        conditions: {
          rEndingRoot: true,
          validAffix: false,
          jhalBeginning: null,
          atmanepadaFollowing: null
        },
        root: root,
        affix: affix,
        word: normalizedWord,
        script: script,
        sutraNumber: '1.2.12'
      };
    }

    // Condition 3: Affix must begin with झल् consonant
    if (!beginsWithJhal(affix)) {
      return {
        isKit: false,
        applicable: false,
        reason: 'Affix does not begin with झल् consonant',
        conditions: {
          rEndingRoot: true,
          validAffix: isValidAffix,
          jhalBeginning: false,
          atmanepadaFollowing: null
        },
        root: root,
        affix: affix,
        word: normalizedWord,
        script: script,
        sutraNumber: '1.2.12'
      };
    }

    // Condition 4: Following affix must be आत्मनेपद
    // Note: We check without tense constraint as आत्मनेपद affixes from different 
    // tenses can appear in the same word form
    if (!isAtmanepadaAffix(followingAffix)) {
      return {
        isKit: false,
        applicable: false,
        reason: 'Following affix is not आत्मनेपद',
        conditions: {
          rEndingRoot: true,
          validAffix: isValidAffix,
          jhalBeginning: true,
          atmanepadaFollowing: false
        },
        root: root,
        affix: affix,
        followingAffix: followingAffix,
        word: normalizedWord,
        script: script,
        sutraNumber: '1.2.12'
      };
    }

    // All conditions met - apply कित् designation
    return {
      isKit: true,
      applicable: true,
      reason: 'All conditions for Sutra 1.2.12 satisfied: ऋ-ending root + लिङ्/सिच् substitute beginning with झल् + आत्मनेपद',
      conditions: {
        rEndingRoot: true,
        validAffix: isValidAffix,
        jhalBeginning: true,
        atmanepadaFollowing: true
      },
      root: root,
      affix: affix,
      followingAffix: followingAffix,
      tense: tense,
      word: normalizedWord,
      script: script,
      sutraNumber: '1.2.12'
    };

  } catch (error) {
    return {
      isKit: false,
      applicable: false,
      error: `Analysis failed: ${error.message}`,
      word: word,
      sutraNumber: '1.2.12'
    };
  }
}

/**
 * Extracts the root from a word (fallback implementation)
 * @param {string} word - The word to analyze
 * @returns {string} - The extracted root
 */
function extractRoot(word) {
  // Simple extraction - remove common affixes
  // This is a fallback; proper analysis should be provided in context
  let root = word.replace(/ता$|ते$|न्ते$|स्व$|ध्वम्$|त$|स्$|म$/, '');
  root = root.replace(/िष्य|ष्य|य|स्य/, ''); // Remove future/conditional markers
  return root || word;
}

/**
 * Extracts the main affix from a word (fallback implementation)
 * @param {string} word - The word to analyze
 * @returns {string} - The extracted affix
 */
function extractAffix(word) {
  // Look for लिङ् or सिच् substitutes
  if (word.includes('स्य')) return 'स्य'; // सिच् substitute
  if (word.includes('िष्य')) return 'िष्य'; // सिच् substitute
  if (word.includes('ष्य')) return 'ष्य'; // सिच् substitute
  if (word.includes('य')) return 'य'; // लिङ् substitute
  return '';
}

/**
 * Extracts the following affix (आत्मनेपद ending) from a word
 * @param {string} word - The word to analyze
 * @returns {string} - The extracted following affix
 */
function extractFollowingAffix(word) {
  // Common आत्मनेपद endings
  const atmanepadaEndings = ['ता', 'ते', 'न्ते', 'स्व', 'ध्वम्', 'त', 'स्', 'म'];
  
  for (const ending of atmanepadaEndings) {
    if (word.endsWith(ending)) {
      return ending;
    }
  }
  return '';
}

/**
 * Determines the tense/mood from the word and affix
 * @param {string} word - The word to analyze
 * @param {string} affix - The affix
 * @returns {string} - The determined tense
 */
function determineTense(word, affix) {
  if (affix.includes('स्य') || affix.includes('ष्य')) {
    return 'lrt'; // लृट् (future)
  }
  if (affix.includes('य')) {
    return 'ling'; // लिङ् (potential)
  }
  return 'unknown';
}

export default sutra1212;
