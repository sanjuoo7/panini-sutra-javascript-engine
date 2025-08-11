/**
 * Sutra 1.2.5: असंयोगाल्लिट् कित्
 * asaṃyogāl liṭ kit
 * 
 * "The affixes of liṭ (Perfect Tense) not coming after a conjunct consonant 
 * are treated as kit (having k designation)."
 * 
 * This sutra establishes that perfect tense (liṭ) affixes that do not follow
 * conjunct consonants (saṃyoga) receive the kit designation.
 */

import { validateSanskritWord } from '../sanskrit-utils/index.js';
import { isLitAffix, LIT_AFFIXES } from '../sanskrit-utils/verb-analysis.js';
import { hasConjunct, CONJUNCT_PATTERNS } from '../sanskrit-utils/conjunct-analysis.js';

// Re-export utilities for backward compatibility with tests
export { LIT_AFFIXES } from '../sanskrit-utils/verb-analysis.js';
export { CONJUNCT_PATTERNS } from '../sanskrit-utils/conjunct-analysis.js';

// Re-export functions for backward compatibility with tests
export { isLitAffix } from '../sanskrit-utils/verb-analysis.js';
export { hasConjunct } from '../sanskrit-utils/conjunct-analysis.js';





/**
 * Checks if a liṭ affix comes after a conjunct consonant
 * @param {string} precedingContext - The consonants/syllables before the affix
 * @param {string} affix - The liṭ affix
 * @returns {boolean} - True if the affix comes after a conjunct
 */
export function isLitAffixAfterConjunct(precedingContext, affix) {
  if (!precedingContext || !affix || 
      typeof precedingContext !== 'string' || typeof affix !== 'string') {
    return false;
  }

  const cleanContext = precedingContext.trim();
  const cleanAffix = affix.trim();

  if (!cleanContext || !cleanAffix) {
    return false;
  }

  // Validate that this is a liṭ affix
  if (!isLitAffix(cleanAffix)) {
    return false;
  }

  // Check if the preceding context ends with a conjunct
  return hasConjunct(cleanContext);
}

/**
 * Main function: Checks if a liṭ affix should be treated as kit according to sutra 1.2.5
 * @param {string} precedingContext - The consonants/syllables before the affix
 * @param {string} affix - The affix to check
 * @param {Object} context - Optional context object with additional information
 * @returns {boolean} - True if the affix should be treated as kit
 */
export function isKitByAsamyogalLit(precedingContext, affix, context = {}) {
  if (!precedingContext || !affix || 
      typeof precedingContext !== 'string' || typeof affix !== 'string') {
    return false;
  }

  const cleanContext = precedingContext.trim();
  const cleanAffix = affix.trim();

  if (!cleanContext || !cleanAffix) {
    return false;
  }

  // Validate Sanskrit input
  const contextValidation = validateSanskritWord(cleanContext);
  const affixValidation = validateSanskritWord(cleanAffix);
  
  if (!contextValidation.isValid || !affixValidation.isValid) {
    return false;
  }

  // Must be a liṭ affix
  if (!isLitAffix(cleanAffix)) {
    return false;
  }

  // Rule applies when the affix does NOT come after a conjunct
  // (असंयोगात् = from non-conjunct)
  return !isLitAffixAfterConjunct(cleanContext, cleanAffix);
}

/**
 * Analyzes multiple affix contexts for kit designation by this rule
 * @param {Array} contexts - Array of {precedingContext, affix} objects
 * @returns {Object} - Analysis results with counts and categorization
 */
export function analyzeLitKitStatus(contexts) {
  if (!Array.isArray(contexts)) {
    throw new Error('Input must be an array of context objects');
  }

  const results = {
    total: contexts.length,
    kitCount: 0,
    afterConjunctCount: 0,
    nonLitCount: 0,
    invalidCount: 0,
    kitItems: [],
    afterConjunctItems: [],
    nonLitItems: [],
    invalidItems: []
  };

  contexts.forEach((contextObj, index) => {
    // Check for invalid input
    if (!contextObj || typeof contextObj !== 'object' ||
        !contextObj.precedingContext || !contextObj.affix) {
      results.invalidCount++;
      results.invalidItems.push({ 
        index, 
        contextObj, 
        reason: 'Invalid context object structure' 
      });
      return;
    }

    const { precedingContext, affix } = contextObj;

    // Check if the rule applies
    if (isKitByAsamyogalLit(precedingContext, affix)) {
      results.kitCount++;
      results.kitItems.push({
        index,
        precedingContext,
        affix,
        result: 'kit',
        note: 'Liṭ affix not after conjunct, therefore kit'
      });
    } else if (!isLitAffix(affix)) {
      results.nonLitCount++;
      results.nonLitItems.push({
        index,
        precedingContext,
        affix,
        reason: 'Not a liṭ affix'
      });
    } else if (isLitAffixAfterConjunct(precedingContext, affix)) {
      results.afterConjunctCount++;
      results.afterConjunctItems.push({
        index,
        precedingContext,
        affix,
        reason: 'Liṭ affix after conjunct, rule does not apply'
      });
    } else {
      results.invalidCount++;
      results.invalidItems.push({ 
        index, 
        precedingContext,
        affix,
        reason: 'Does not meet rule conditions' 
      });
    }
  });

  return results;
}

/**
 * Checks specific contextual conditions for the rule application
 * @param {string} root - The verbal root
 * @param {string} precedingContext - The context before the affix
 * @param {string} affix - The affix to check
 * @returns {Object} - Analysis of special conditions
 */
export function checkLitSpecificConditions(root, precedingContext, affix) {
  // Check for null/undefined/non-string first
  if (root === null || root === undefined || typeof root !== 'string' ||
      precedingContext === null || precedingContext === undefined || typeof precedingContext !== 'string' ||
      affix === null || affix === undefined || typeof affix !== 'string') {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid input parameters',
      applies: false
    };
  }

  const cleanRoot = root.trim();
  const cleanContext = precedingContext.trim();
  const cleanAffix = affix.trim();

  // Check for empty strings after trimming
  if (!cleanRoot || !cleanContext || !cleanAffix) {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid Sanskrit input',
      applies: false
    };
  }

  // Validate inputs
  const rootValidation = validateSanskritWord(cleanRoot);
  const contextValidation = validateSanskritWord(cleanContext);
  const affixValidation = validateSanskritWord(cleanAffix);
  
  if (!rootValidation.isValid || !contextValidation.isValid || !affixValidation.isValid) {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid Sanskrit input',
      applies: false
    };
  }

  // General rule - applies based on conjunct presence
  return {
    hasSpecialCondition: false,
    condition: 'General rule applies based on conjunct presence',
    applies: isKitByAsamyogalLit(cleanContext, cleanAffix)
  };
}

/**
 * Provides comprehensive examples and documentation for sutra 1.2.5
 * @returns {Object} - Complete reference with examples and explanations
 */
export function getLitKitExamples() {
  return {
    sutraText: {
      devanagari: 'असंयोगाल्लिट् कित्',
      iast: 'asaṃyogāl liṭ kit',
      translation: 'The affixes of liṭ (Perfect Tense) not coming after a conjunct consonant are treated as kit'
    },
    
    technicalDefinition: {
      term: 'असंयोगाल्लिट् कित्',
      definition: 'Perfect tense affixes that do not follow conjunct consonants receive kit designation',
      scope: 'Applies to liṭ lakāra (perfect tense) affixes only',
      condition: 'Absence of conjunct consonant (saṃyoga) before the affix'
    },

    positiveExamples: [
      {
        precedingContext: 'भु',
        affix: 'आ',
        form: 'बभुवा',
        analysis: 'No conjunct before liṭ affix आ, therefore kit',
        translation: 'he became (perfect)'
      },
      {
        precedingContext: 'कृ',
        affix: 'औ',
        form: 'चकारौ',
        analysis: 'No conjunct before liṭ affix औ, therefore kit',
        translation: 'they two did (perfect)'
      },
      {
        precedingContext: 'गम्',
        affix: 'आ',
        form: 'जगामा', 
        analysis: 'Single consonant म् before liṭ affix आ, therefore kit',
        translation: 'he went (perfect)'
      }
    ],

    negativeExamples: [
      {
        precedingContext: 'यज्ञ',
        affix: 'आ',
        form: 'ियजाञा',
        analysis: 'Conjunct ज्ञ before liṭ affix, rule does not apply',
        translation: 'he sacrificed (perfect)'
      },
      {
        precedingContext: 'अग्नि',
        affix: 'ति',
        form: 'अग्निति',
        analysis: 'ति is not a liṭ affix, rule does not apply',
        translation: 'not applicable'
      }
    ],

    technicalNotes: [
      'Conjunct consonants (saṃyoga) are clusters of two or more consonants',
      'Kit designation affects various grammatical operations',
      'This rule specifically applies to perfect tense (liṭ) morphology',
      'The rule uses negative condition (असंयोगात्) - from non-conjunct'
    ],

    traditionalReferences: [
      'Ashtadhyayi 1.2.5',
      'Siddhanta Kaumudi on perfect tense formation',
      'Paribhasha about kit designation effects'
    ]
  };
}

export default {
  isKitByAsamyogalLit,
  analyzeLitKitStatus,
  checkLitSpecificConditions,
  getLitKitExamples,
  isLitAffixAfterConjunct
};
