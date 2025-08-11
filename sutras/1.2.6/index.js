/**
 * Sutra 1.2.6: ईन्धिभवतिभ्यां च
 * īndhibhavatibhyāṃ ca
 * 
 * "The liṭ (Perfect Tense) affixes after the roots इन्धि 'to kindle' 
 * and भू 'to become' are also kit."
 * 
 * This sutra provides specific exceptions to the general rule, ensuring that
 * liṭ affixes after इन्धि and भू roots receive kit designation regardless
 * of other conditions.
 */

import { validateSanskritWord } from '../sanskrit-utils/index.js';
import { isLitAffix } from '../sanskrit-utils/verb-analysis.js';
import { 
  isIndhiRoot, 
  isBhuRoot, 
  isIndhiBhavatiRoot,
  ROOT_VARIANTS 
} from '../sanskrit-utils/root-analysis.js';

// Compatibility constant for backward compatibility with tests
export const INDHI_BHAVATI_ROOTS = {
  devanagari: ['इन्धि', 'भू'],
  iast: ['indhi', 'bhū']
};

// Re-export utilities for backward compatibility  
export { ROOT_VARIANTS } from '../sanskrit-utils/root-analysis.js';

// Re-export functions for backward compatibility
export { 
  isIndhiRoot, 
  isBhuRoot, 
  isIndhiBhavatiRoot 
} from '../sanskrit-utils/root-analysis.js';

// Alias for backward compatibility with tests  
export function isBhavatiRoot(root) {
  return isBhuRoot(root);
}

/**
 * Main function: Checks if a liṭ affix should be treated as kit according to sutra 1.2.6
 * @param {string} root - The verbal root
 * @param {string} affix - The affix to check
 * @param {Object} context - Optional context object with additional information
 * @returns {boolean} - True if the affix should be treated as kit by this rule
 */
export function isKitByIndhiBhavati(root, affix, context = {}) {
  if (!root || !affix || 
      typeof root !== 'string' || typeof affix !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const cleanAffix = affix.trim();

  if (!cleanRoot || !cleanAffix) {
    return false;
  }

  // Validate Sanskrit input
  const rootValidation = validateSanskritWord(cleanRoot);
  const affixValidation = validateSanskritWord(cleanAffix);
  
  if (!rootValidation.isValid || !affixValidation.isValid) {
    return false;
  }

  // Must be a liṭ affix
  if (!isLitAffix(cleanAffix)) {
    return false;
  }

  // Must be after इन्धि or भू root
  return isIndhiBhavatiRoot(cleanRoot);
}

/**
 * Analyzes multiple root-affix combinations for kit designation by this rule
 * @param {Array} combinations - Array of {root, affix} objects
 * @returns {Object} - Analysis results with counts and categorization
 */
export function analyzeIndhiBhavatiKitStatus(combinations) {
  if (!Array.isArray(combinations)) {
    throw new Error('Input must be an array of root-affix combination objects');
  }

  const results = {
    total: combinations.length,
    kitByIndhiBhavatiCount: 0,
    nonLitCount: 0,
    nonSpecificRootCount: 0,
    invalidCount: 0,
    kitByIndhiBhavatiItems: [],
    nonLitItems: [],
    nonSpecificRootItems: [],
    invalidItems: []
  };

  combinations.forEach((combo, index) => {
    // Check for invalid input
    if (!combo || typeof combo !== 'object' ||
        !combo.root || !combo.affix) {
      results.invalidCount++;
      results.invalidItems.push({ 
        index, 
        combo, 
        reason: 'Invalid combination object structure' 
      });
      return;
    }

    const { root, affix } = combo;

    // Check if the rule applies
    if (isKitByIndhiBhavati(root, affix)) {
      results.kitByIndhiBhavatiCount++;
      results.kitByIndhiBhavatiItems.push({
        index,
        root,
        affix,
        result: 'kit',
        note: 'Liṭ affix after इन्धि/भू root, therefore kit by sutra 1.2.6'
      });
    } else if (!isLitAffix(affix)) {
      results.nonLitCount++;
      results.nonLitItems.push({
        index,
        root,
        affix,
        reason: 'Not a liṭ affix'
      });
    } else if (!isIndhiBhavatiRoot(root)) {
      results.nonSpecificRootCount++;
      results.nonSpecificRootItems.push({
        index,
        root,
        affix,
        reason: 'Not इन्धि or भू root'
      });
    } else {
      results.invalidCount++;
      results.invalidItems.push({ 
        index, 
        root,
        affix,
        reason: 'Does not meet rule conditions' 
      });
    }
  });

  return results;
}

/**
 * Checks specific conditions and variants for the इन्धि and भू roots
 * @param {string} root - The verbal root to analyze
 * @param {string} affix - The affix to check
 * @returns {Object} - Analysis of special conditions and root identification
 */
export function checkIndhiBhavatiSpecificConditions(root, affix) {
  // Check for null/undefined/non-string first
  if (root === null || root === undefined || typeof root !== 'string' ||
      affix === null || affix === undefined || typeof affix !== 'string') {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid input parameters',
      rootType: 'unknown',
      applies: false
    };
  }

  const cleanRoot = root.trim();
  const cleanAffix = affix.trim();

  // Check for empty strings after trimming
  if (!cleanRoot || !cleanAffix) {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid Sanskrit input',
      rootType: 'unknown',
      applies: false
    };
  }

  // Validate inputs
  const rootValidation = validateSanskritWord(cleanRoot);
  const affixValidation = validateSanskritWord(cleanAffix);
  
  if (!rootValidation.isValid || !affixValidation.isValid) {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid Sanskrit input',
      rootType: 'unknown',
      applies: false
    };
  }

  // Determine root type
  let rootType = 'other';
  if (isIndhiRoot(cleanRoot)) {
    rootType = 'indhi';
  } else if (isBhavatiRoot(cleanRoot)) {
    rootType = 'bhavati';
  }

  // Check if rule applies
  const applies = isKitByIndhiBhavati(cleanRoot, cleanAffix);

  return {
    hasSpecialCondition: rootType !== 'other',
    condition: rootType === 'indhi' ? 'इन्धि root - kit designation for liṭ affixes' :
               rootType === 'bhavati' ? 'भू root - kit designation for liṭ affixes' :
               'Not इन्धि or भू root',
    rootType,
    applies
  };
}

/**
 * Provides comprehensive examples and documentation for sutra 1.2.6
 * @returns {Object} - Complete reference with examples and explanations
 */
export function getIndhiBhavatiKitExamples() {
  return {
    sutraText: {
      devanagari: 'ईन्धिभवतिभ्यां च',
      iast: 'īndhibhavatibhyāṃ ca',
      translation: 'The liṭ (Perfect Tense) affixes after the roots इन्धि and भू are also kit'
    },
    
    technicalDefinition: {
      term: 'ईन्धिभवतिभ्यां च',
      definition: 'Specific exception ensuring kit designation for liṭ affixes after इन्धि and भू roots',
      scope: 'Applies to perfect tense affixes after specific roots only',
      condition: 'Must be after इन्धि (to kindle) or भू (to become) roots'
    },

    specificRoots: [
      {
        root: 'इन्धि',
        meaning: 'to kindle, to ignite',
        variants: ['इन्धि', 'इध्', 'इन्ध्', 'एध्'],
        perfectForm: 'इन्धयाम्बभूव'
      },
      {
        root: 'भू',
        meaning: 'to become, to be',
        variants: ['भू', 'भु', 'भव्', 'भुव्'],
        perfectForm: 'बभूव'
      }
    ],

    positiveExamples: [
      {
        root: 'इन्धि',
        affix: 'आ',
        form: 'इन्धयामास',
        analysis: 'इन्धि root + liṭ affix आ, therefore kit by sutra 1.2.6',
        translation: 'he kindled (perfect)'
      },
      {
        root: 'भू',
        affix: 'उः',
        form: 'बभूवुः',
        analysis: 'भू root + liṭ affix उः, therefore kit by sutra 1.2.6',
        translation: 'they became (perfect)'
      },
      {
        root: 'भु',
        affix: 'ए',
        form: 'बभुवे',
        analysis: 'भु (variant of भू) + liṭ affix ए, therefore kit',
        translation: 'he became (perfect, ātmanepada)'
      }
    ],

    negativeExamples: [
      {
        root: 'कृ',
        affix: 'आ',
        form: 'चकार',
        analysis: 'Not इन्धि or भू root, rule does not apply',
        translation: 'he did (perfect) - kit by other rules'
      },
      {
        root: 'इन्धि',
        affix: 'ति',
        form: 'इन्धति',
        analysis: 'ति is not a liṭ affix, rule does not apply',
        translation: 'he kindles (present)'
      },
      {
        root: 'भू',
        affix: 'न्ति',
        form: 'भवन्ति',
        analysis: 'न्ति is not a liṭ affix, rule does not apply',
        translation: 'they become (present)'
      }
    ],

    technicalNotes: [
      'This rule provides specific exceptions to general kit designation rules',
      'The च (ca) indicates addition to previous rules (sutra 1.2.5)',
      'Both roots have important roles in Vedic and classical Sanskrit',
      'इन्धि is particularly significant in ritual contexts (fire kindling)',
      'भू is one of the most fundamental verbs in Sanskrit'
    ],

    traditionalReferences: [
      'Ashtadhyayi 1.2.6',
      'Siddhanta Kaumudi on perfect tense exceptions',
      'Paribhasha about specific root conditions'
    ]
  };
}

export default {
  isIndhiRoot,
  isBhavatiRoot,
  isIndhiBhavatiRoot,
  isKitByIndhiBhavati,
  analyzeIndhiBhavatiKitStatus,
  checkIndhiBhavatiSpecificConditions,
  getIndhiBhavatiKitExamples,
  INDHI_BHAVATI_ROOTS,
  ROOT_VARIANTS
};
