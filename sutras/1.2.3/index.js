/**
 * Sutra 1.2.3: विभाषोर्णोः
 * vibhāṣorṇoḥ
 * "Optionally after (the root) ūrṇa"
 * 
 * This sutra establishes that iṭ-augmented affixes after the root ऊर्ण (ūrṇa - "to cover") 
 * may optionally receive the ṅit designation. This creates an optional rule where the 
 * grammatical effects of ṅit can be applied or not applied depending on the grammarian's choice.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isUrnaRoot } from '../sanskrit-utils/root-analysis.js';

// Re-export for backward compatibility
export { isUrnaRoot } from '../sanskrit-utils/root-analysis.js';

// Core constants for the ऊर्ण root
export const URNA_ROOT = {
  devanagari: 'ऊर्ण',
  iast: 'ūrṇa'
};

// Alternative forms that may appear
export const URNA_VARIANTS = {
  devanagari: ['ऊर्ण', 'ऊर्ण्'],
  iast: ['ūrṇa', 'ūrṇ', 'urṇa', 'urṇ']
};

// iṭ-augment patterns (inherited from previous sutras)
export const IT_AUGMENT_PATTERNS = {
  devanagari: ['^इत', '^इट्', '^इष्य', '^इत्व'],
  iast: ['^it', '^iṭ', '^iṣy', '^itv']
};

// Known iṭ-augmented affixes for ऊर्ण root
export const IT_AUGMENTED_AFFIXES = {
  devanagari: ['इत', 'इत्वा', 'इष्यति', 'इत्', 'इतुम्', 'इष्य'],
  iast: ['ita', 'itvā', 'iṣyati', 'it', 'itum', 'iṣy']
};

/**
 * Checks if an affix begins with the iṭ augment
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix begins with iṭ
 */
export function beginsWithItAugment(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  // Check Devanagari patterns directly
  if (cleanAffix.includes('इ')) {
    return cleanAffix.startsWith('इत') || 
           cleanAffix.startsWith('इट्') || 
           cleanAffix.startsWith('इष्य');
  } 
  
  // Check IAST patterns
  return cleanAffix.startsWith('it') || 
         cleanAffix.startsWith('iṭ') || 
         cleanAffix.startsWith('iṣy');
}

/**
 * Checks if an affix is a known iṭ-augmented affix
 * @param {string} affix - The affix to check  
 * @returns {boolean} - True if it's a known iṭ-augmented affix
 */
export function isItAugmentedAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  // Check explicit list first
  const inExplicitList = IT_AUGMENTED_AFFIXES.devanagari.includes(cleanAffix) ||
                        IT_AUGMENTED_AFFIXES.iast.includes(cleanAffix);
  
  if (inExplicitList) {
    return true;
  }

  // Check if it begins with iṭ augment (pattern-based)
  return beginsWithItAugment(cleanAffix);
}

/**
 * Main function: Checks if an affix can optionally be treated as ṅit after ऊर्ण root
 * according to sutra 1.2.3 (विभाषोर्णोः)
 * @param {string} root - The root to check
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix can optionally be ṅit after ऊर्ण
 */
export function canBeNgitByUrnaOption(root, affix) {
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return false;
  }

  // Validate inputs
  if (!validateSanskritWord(root) || !validateSanskritWord(affix)) {
    return false;
  }

  // Check if root is ऊर्ण
  if (!isUrnaRoot(root)) {
    return false;
  }

  // Check if affix is iṭ-augmented
  if (!isItAugmentedAffix(affix)) {
    return false;
  }

  return true;
}

/**
 * Analyzes the optional ṅit status for multiple root-affix combinations
 * @param {Array} combinations - Array of {root, affix} objects
 * @returns {Object} - Analysis results with detailed statistics
 */
export function analyzeUrnaOptionalStatus(combinations) {
  if (!Array.isArray(combinations)) {
    throw new Error('Input must be an array of root-affix combinations');
  }

  const results = {
    total: combinations.length,
    applicableCount: 0,
    nonUrnaCount: 0,
    nonItCount: 0,
    invalidCount: 0,
    applicableItems: [],
    nonUrnaItems: [],
    nonItItems: [],
    invalidItems: []
  };

  combinations.forEach((combination, index) => {
    const { root, affix } = combination;

    // Check for invalid input
    if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
      results.invalidCount++;
      results.invalidItems.push({ index, root, affix, reason: 'Invalid input' });
      return;
    }

    // Check if the rule applies
    if (canBeNgitByUrnaOption(root, affix)) {
      results.applicableCount++;
      results.applicableItems.push({
        index,
        root,
        affix,
        option: 'ṅit-optional',
        note: 'Can optionally be treated as ṅit'
      });
    } else if (!isUrnaRoot(root)) {
      results.nonUrnaCount++;
      results.nonUrnaItems.push({
        index,
        root,
        affix,
        reason: 'Root is not ऊर्ण'
      });
    } else if (!isItAugmentedAffix(affix)) {
      results.nonItCount++;
      results.nonItItems.push({
        index,
        root,
        affix,
        reason: 'Affix is not iṭ-augmented'
      });
    }
  });

  return results;
}

/**
 * Provides comprehensive examples and documentation for sutra 1.2.3
 * @returns {Object} - Complete reference with examples and explanations
 */
export function getUrnaOptionalExamples() {
  return {
    sutraText: {
      devanagari: 'विभाषोर्णोः',
      iast: 'vibhāṣorṇoḥ',
      translation: 'Optionally after (the root) ūrṇa'
    },

    rootInformation: {
      root: URNA_ROOT,
      variants: URNA_VARIANTS,
      meanings: ['to cover', 'to conceal', 'to clothe'],
      dhatu_classification: 'Root ending in -ṇa'
    },

    optionalRule: {
      nature: 'विभाषा (vibhāṣā) - optional application',
      explanation: 'The ṅit designation may or may not be applied',
      grammarian_choice: 'Left to the discretion of the grammarian',
      effects: 'When applied, follows same effects as other ṅit affixes'
    },

    positiveExamples: [
      {
        root: 'ऊर्ण',
        affix: 'इत',
        result: 'Optional ṅit',
        form: 'ऊर्णित',
        meaning: 'covered (with optional ṅit effects)',
        iast: 'ūrṇita',
        note: 'Past participle with optional ṅit'
      },
      {
        root: 'ऊर्ण',
        affix: 'इत्वा',  
        result: 'Optional ṅit',
        form: 'ऊर्णित्वा',
        meaning: 'having covered (optional)',
        iast: 'ūrṇitvā',
        note: 'Gerund with optional ṅit'
      },
      {
        root: 'ऊर्ण',
        affix: 'इष्यति',
        result: 'Optional ṅit',
        form: 'ऊर्णिष्यति',
        meaning: 'will cover (optional)',
        iast: 'ūrṇiṣyati',
        note: 'Future tense with optional ṅit'
      },
      {
        root: 'ūrṇa',
        affix: 'ita',
        result: 'Optional ṅit',
        form: 'ūrṇita',
        meaning: 'covered (IAST form)',
        iast: 'ūrṇita',
        note: 'Cross-script example'
      }
    ],

    negativeExamples: [
      {
        root: 'भू',
        affix: 'इत',
        reason: 'Different root',
        note: 'Rule specific to ऊर्ण root only'
      },
      {
        root: 'विज्',
        affix: 'इत्वा',
        reason: 'Different root',  
        note: 'विज् covered by sutra 1.2.2, not optional'
      },
      {
        root: 'ऊर्ण',
        affix: 'ति',
        reason: 'No iṭ augment',
        note: 'Rule applies only to iṭ-augmented affixes'
      },
      {
        root: 'ऊर्ण',
        affix: 'त',
        reason: 'No iṭ augment',
        note: 'Simple affix without augment'
      }
    ],

    technicalNotes: [
      'विभाषा (vibhāṣā) indicates optionality - the rule may or may not be applied',
      'When ṅit is applied, it follows the same grammatical effects as mandatory ṅit',
      'The choice is typically based on metrical or stylistic considerations',
      'This creates variation in derived forms from the same root-affix combination',
      'The optional nature distinguishes this from the mandatory rules in 1.2.1-1.2.2'
    ],

    relatedSutras: [
      {
        number: '1.2.1',
        text: 'गाङ्कुटादिभ्योऽञ्णिन्ङ्इत्',
        relation: 'Mandatory ṅit for गाङ्कुटादि roots'
      },
      {
        number: '1.2.2', 
        text: 'विज इट्',
        relation: 'Mandatory ṅit for विज् + iṭ'
      },
      {
        number: '1.1.5',
        text: 'क्ङिति च',
        relation: 'General effects of ṅit designation'
      }
    ],

    grammaticalContext: {
      anuvrutti: ['ṅit from previous sutras', 'iṭ-augment context'],
      scope: 'Specific to ऊर्ण root with iṭ-augmented affixes',
      optional_application: 'Key feature distinguishing from mandatory rules'
    }
  };
}
