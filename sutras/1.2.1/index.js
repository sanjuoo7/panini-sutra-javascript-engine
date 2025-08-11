/**
 * Sutra 1.2.1: गाङ्कुटादिभ्योऽञ्णिन्ङ् इत्
 * "gāṅkuṭādibhyo'ñaṇinṅa ita"
 * "All affixes after गाङ्, कुट्, etc. are ङित्, except ञित् and णित् affixes"
 * 
 * RULE TYPE: अतिदेश (Extended Application)
 * SCOPE: Determines ङित् behavior for affixes after specific verb roots
 * CONDITIONS: Applied to affixes following गाङ्, कुट् and similar roots
 * TRANSFORMATIONS: Makes affixes behave as if they have indicatory ङ्
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.1 - ङित् designation for affixes
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Simple helper to check if input is a valid Sanskrit word
 * @param {string} word - Word to validate
 * @returns {boolean} - True if valid Sanskrit word
 */
function isValidSanskritWord(word) {
  const result = validateSanskritWord(word);
  return result.isValid;
}

/**
 * List of verbal roots that trigger ङित् behavior in following affixes
 * गाङ्कुटादि - गाङ्, कुट् and others
 */
const GANGKUTADI_ROOTS = [
  // Primary roots mentioned in the sutra
  'गाङ्',    // gāṅ - to study, to count
  'कुट्',    // kuṭ - to be crooked, to bend
  
  // Additional roots that follow the same pattern (आदि)
  'पठ्',     // paṭh - to read, study
  'वच्',     // vac - to speak
  'तप्',     // tap - to heat, practice austerity
  'यज्',     // yaj - to sacrifice
  'रक्ष्',    // rakṣ - to protect
  'लिख्',    // likh - to write
  'चर्',     // car - to move, walk
  'स्था',    // sthā - to stand
  'गम्',     // gam - to go
  'कृ',      // kṛ - to do, make
];

/**
 * IAST equivalents of the roots for cross-script support
 */
const GANGKUTADI_ROOTS_IAST = [
  'gāṅ', 'kuṭ', 'paṭh', 'vac', 'tap', 'yaj', 
  'rakṣ', 'likh', 'car', 'sthā', 'gam', 'kṛ'
];

/**
 * Patterns of affixes that are excluded (ञित् and णित्)
 * These have their own indicatory letters and don't become ङित्
 */
const EXCLUDED_AFFIX_PATTERNS = {
  ञित्: ['ञ्', 'ञि', 'ञु'],  // Affixes with indicatory ञ्
  णित्: ['ण्', 'णि', 'णु']   // Affixes with indicatory ण्
};

/**
 * Checks if a verbal root triggers ङित् behavior in following affixes
 * @param {string} root - The verbal root to check
 * @returns {boolean} - True if root triggers ङित् behavior
 */
export function isGangkutadiRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const trimmedRoot = root.trim();
  const script = detectScript(trimmedRoot);
  
  if (script === 'Devanagari') {
    return GANGKUTADI_ROOTS.includes(trimmedRoot);
  } else if (script === 'IAST') {
    return GANGKUTADI_ROOTS_IAST.includes(trimmedRoot);
  }
  
  return false;
}

/**
 * Checks if an affix has indicatory ञ् or ण् (and thus excluded from ङित् treatment)
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if affix has ञ् or ण् as indicatory
 */
export function hasExcludedIndicatory(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const trimmedAffix = affix.trim();
  
  // Check for ञित् patterns
  for (const pattern of EXCLUDED_AFFIX_PATTERNS.ञित्) {
    if (trimmedAffix.includes(pattern)) {
      return true;
    }
  }
  
  // Check for णित् patterns  
  for (const pattern of EXCLUDED_AFFIX_PATTERNS.णित्) {
    if (trimmedAffix.includes(pattern)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Main function: Determines if an affix should be treated as ङित् 
 * according to Sutra 1.2.1
 * @param {string} root - The verbal root
 * @param {string} affix - The affix following the root
 * @param {Object} [context={}] - Additional context
 * @returns {boolean} - True if affix should be treated as ङित्
 */
export function isNgitByGangkutadi(root, affix, context = {}) {
  // Input validation
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return false;
  }

  // Validate Sanskrit inputs
  if (!isValidSanskritWord(root) || !isValidSanskritWord(affix)) {
    return false;
  }

  // Check if root is in गाङ्कुटादि list
  if (!isGangkutadiRoot(root)) {
    return false;
  }

  // Check for excluded indicatory patterns (ञित्, णित्)
  if (hasExcludedIndicatory(affix)) {
    return false;
  }

  // If all conditions met, affix is treated as ङित्
  return true;
}

/**
 * Analyzes the ङित् status of multiple root-affix combinations
 * @param {Array} combinations - Array of {root, affix} objects
 * @returns {Object} - Analysis results
 */
export function analyzeNgitStatus(combinations) {
  if (!Array.isArray(combinations)) {
    throw new Error('Expected array of root-affix combinations');
  }

  const results = {
    total: combinations.length,
    ngitCount: 0,
    excludedCount: 0,
    invalidCount: 0,
    ngitItems: [],
    excludedItems: [],
    invalidItems: []
  };

  for (const { root, affix } of combinations) {
    try {
      if (isNgitByGangkutadi(root, affix)) {
        results.ngitCount++;
        results.ngitItems.push({ root, affix, status: 'ङित्' });
      } else if (hasExcludedIndicatory(affix)) {
        results.excludedCount++;
        results.excludedItems.push({ root, affix, status: 'excluded (ञित्/णित्)' });
      } else {
        results.excludedCount++;
        results.excludedItems.push({ root, affix, status: 'not गाङ्कुटादि root' });
      }
    } catch (error) {
      results.invalidCount++;
      results.invalidItems.push({ root, affix, error: error.message });
    }
  }

  return results;
}

/**
 * Gets examples of गाङ्कुटादि roots and their typical ङित् affixes
 * @returns {Object} - Examples with explanations
 */
export function getGangkutadiExamples() {
  return {
    sutraText: {
      devanagari: 'गाङ्कुटादिभ्योऽञ्णिन्ङ् इत्',
      iast: 'gāṅkuṭādibhyo\'ñaṇinṅa ita',
      translation: 'After गाङ्, कुट्, etc., affixes are ङित् except ञित्/णित्'
    },
    
    positiveExamples: [
      {
        root: 'गाङ्',
        affix: 'ति',
        result: 'ङित्',
        explanation: 'गाङ् + ति → ति becomes ङित् (गाङ्कुटादि root)'
      },
      {
        root: 'कुट्',
        affix: 'त',
        result: 'ङित्',
        explanation: 'कुट् + त → त becomes ङित् (गाङ्कुटादि root)'
      },
      {
        root: 'पठ्',
        affix: 'अ',
        result: 'ङित्',
        explanation: 'पठ् + अ → अ becomes ङित् (आदि includes पठ्)'
      }
    ],
    
    negativeExamples: [
      {
        root: 'गाङ्',
        affix: 'ञ्',
        result: 'not ङित्',
        explanation: 'Affix with ञ् is ञित्, excluded from ङित् treatment'
      },
      {
        root: 'गाङ्',
        affix: 'ण्',
        result: 'not ङित्',
        explanation: 'Affix with ण् is णित्, excluded from ङित् treatment'
      },
      {
        root: 'भू',
        affix: 'ति',
        result: 'not ङित्',
        explanation: 'भू is not a गाङ्कुटादि root'
      }
    ],
    
    technicalNotes: [
      'गाङ्कुटादि refers to specific verbal roots starting with गाङ् and कुट्',
      'आदि indicates this list includes other similar roots',
      'ङित् treatment affects accent, sandhi, and other grammatical operations',
      'ञित् and णित् affixes retain their own indicatory properties'
    ]
  };
}

// Export constants for testing and external use
export { GANGKUTADI_ROOTS, GANGKUTADI_ROOTS_IAST, EXCLUDED_AFFIX_PATTERNS };
