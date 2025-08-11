/**
 * Sutra 1.2.4: सार्वधातुकमपित्
 * sārvādhātukam apit
 * "A sārvādhātuka (affix that is) apit"
 * 
 * This sutra establishes that sārvādhātuka affixes that do not have the pit 
 * designation (i.e., they are apit) receive the ṅit designation. This creates 
 * a systematic rule for primary verbal affixes that lack pit status.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { 
  isSarvadhatuka, 
  isPitAffix,
  SARVADHATUKA_AFFIXES,
  PIT_AFFIXES 
} from '../sanskrit-utils/verb-analysis.js';

// Re-export utilities for backward compatibility
export { SARVADHATUKA_AFFIXES, PIT_AFFIXES } from '../sanskrit-utils/verb-analysis.js';

// Re-export functions with backward compatibility names
export { isSarvadhatuka as isSarvadhatukaAffix } from '../sanskrit-utils/verb-analysis.js';
export { isPitAffix as hasPitDesignation } from '../sanskrit-utils/verb-analysis.js';

/**
 * Checks if an affix is apit (does not have pit designation)
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is apit
 */
export function isApitAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  // Validate Sanskrit input
  const validation = validateSanskritWord(cleanAffix);
  if (!validation.isValid) {
    return false;
  }

  // An affix is apit if it's a sārvādhātuka affix AND does not have pit designation
  return isSarvadhatuka(cleanAffix) && !isPitAffix(cleanAffix);
}

/**
 * Main function: Checks if a sārvādhātuka affix that is apit should be treated as ṅit
 * according to sutra 1.2.4 (सार्वधातुकमपित्)
 * @param {string} affix - The affix to check
 * @param {Object} context - Optional context object with additional information
 * @returns {boolean} - True if the affix should be ṅit according to this rule
 */
export function isNgitBySarvadhatukaApit(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  // Validate Sanskrit input
  const validation = validateSanskritWord(cleanAffix);
  if (!validation.isValid) {
    return false;
  }

  // Check if affix is sārvādhātuka
  if (!isSarvadhatuka(cleanAffix)) {
    return false;
  }

  // Check if affix is apit (does not have pit designation)
  if (!isApitAffix(cleanAffix)) {
    return false;
  }

  return true;
}

/**
 * Analyzes the ṅit status for multiple sārvādhātuka affixes
 * @param {Array} affixes - Array of affix strings
 * @returns {Object} - Analysis results with detailed statistics
 */
export function analyzeSarvadhatukaApitStatus(affixes) {
  if (!Array.isArray(affixes)) {
    throw new Error('Input must be an array of affixes');
  }

  const results = {
    total: affixes.length,
    ngitCount: 0,
    nonSarvadhatukaCount: 0,
    pitCount: 0,
    invalidCount: 0,
    ngitItems: [],
    nonSarvadhatukaItems: [],
    pitItems: [],
    invalidItems: []
  };

  affixes.forEach((affix, index) => {
    // Check for invalid input
    if (!affix || typeof affix !== 'string') {
      results.invalidCount++;
      results.invalidItems.push({ index, affix, reason: 'Invalid input' });
      return;
    }

    const cleanAffix = affix.trim();

    // Check if the rule applies
    if (isNgitBySarvadhatukaApit(cleanAffix)) {
      results.ngitCount++;
      results.ngitItems.push({
        index,
        affix: cleanAffix,
        result: 'ṅit',
        note: 'Sārvādhātuka and apit, therefore ṅit'
      });
    } else if (!isSarvadhatuka(cleanAffix)) {
      results.nonSarvadhatukaCount++;
      results.nonSarvadhatukaItems.push({
        index,
        affix: cleanAffix,
        reason: 'Not a sārvādhātuka affix'
      });
    } else if (isPitAffix(cleanAffix)) {
      results.pitCount++;
      results.pitItems.push({
        index,
        affix: cleanAffix,
        reason: 'Has pit designation, not apit'
      });
    } else {
      results.invalidCount++;
      results.invalidItems.push({ 
        index, 
        affix: cleanAffix, 
        reason: 'Does not meet rule conditions' 
      });
    }
  });

  return results;
}

/**
 * Checks if an affix should be treated differently based on specific verbal roots
 * @param {string} root - The verbal root
 * @param {string} affix - The affix to check
 * @returns {Object} - Analysis of special conditions
 */
export function checkRootSpecificConditions(root, affix) {
  // Check for null/undefined/non-string first
  if (root === null || root === undefined || typeof root !== 'string' ||
      affix === null || affix === undefined || typeof affix !== 'string') {
    return {
      hasSpecialCondition: false,
      condition: 'Invalid input parameters',
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
      applies: false
    };
  }

  // General rule - no specific root conditions for this sutra
  return {
    hasSpecialCondition: false,
    condition: 'General rule applies to all roots',
    applies: isNgitBySarvadhatukaApit(cleanAffix)
  };
}

/**
 * Provides comprehensive examples and documentation for sutra 1.2.4
 * @returns {Object} - Complete reference with examples and explanations
 */
export function getSarvadhatukaApitExamples() {
  return {
    sutraText: {
      devanagari: 'सार्वधातुकमपित्',
      iast: 'sārvādhātukam apit',
      translation: 'A sārvādhātuka (affix that is) apit'
    },

    technicalDefinitions: {
      sarvadhatuka: {
        definition: 'Primary verbal affixes (तिङ् endings)',
        reference: 'तिङ्शित्सार्वधातुकम् 3.4.113',
        examples: ['ति', 'सि', 'मि', 'ते', 'से', 'ए']
      },
      apit: {
        definition: 'Not having प् as indicatory letter',
        meaning: 'Affixes without pit designation',
        contrast: 'As opposed to पित् affixes'
      },
      ngit_result: {
        designation: 'ङित् - having ङ् as indicatory letter',
        effects: 'Various morphophonemic and accentual changes'
      }
    },

    positiveExamples: [
      {
        affix: 'ति',
        type: 'Present 3rd singular',
        classification: 'Sārvādhātuka, apit',
        result: 'ṅit',
        example: 'भवति (bhavati) - he/she/it becomes',
        iast: 'ti',
        note: 'Standard present tense ending'
      },
      {
        affix: 'सि',
        type: 'Present 2nd singular',
        classification: 'Sārvādhātuka, apit',
        result: 'ṅit',
        example: 'भवसि (bhavasi) - you become',
        iast: 'si',
        note: 'Present tense second person'
      },
      {
        affix: 'मि',
        type: 'Present 1st singular',
        classification: 'Sārvādhātuka, apit',
        result: 'ṅit',
        example: 'भवामि (bhavāmi) - I become',
        iast: 'mi',
        note: 'Present tense first person'
      },
      {
        affix: 'न्ति',
        type: 'Present 3rd plural',
        classification: 'Sārvādhātuka, apit',
        result: 'ṅit',
        example: 'भवन्ति (bhavanti) - they become',
        iast: 'nti',
        note: 'Present tense third person plural'
      },
      {
        affix: 'तु',
        type: 'Imperative 3rd singular',
        classification: 'Sārvādhātuka, apit',
        result: 'ṅit',
        example: 'भवतु (bhavatu) - let him/her/it become',
        iast: 'tu',
        note: 'Imperative mood'
      }
    ],

    negativeExamples: [
      {
        affix: 'त',
        type: 'Past participle',
        classification: 'पित् (pit)',
        reason: 'Has pit designation',
        note: 'Excluded from this rule due to pit status'
      },
      {
        affix: 'तवत्',
        type: 'Past participle with possession',
        classification: 'पित् (pit)',
        reason: 'Has pit designation',
        note: 'Forms like कृतवत् (kṛtavat)'
      },
      {
        affix: 'शतृ',
        type: 'Present participle active',
        classification: 'पित् (pit)',
        reason: 'Has pit designation',
        note: 'Forms like भवत् (bhavat)'
      },
      {
        affix: 'इत',
        type: 'Past participle with iṭ',
        classification: 'Not sārvādhātuka',
        reason: 'Secondary derivation, not primary verbal',
        note: 'Covered by different rules'
      }
    ],

    morphophonemic_effects: [
      'Accent placement on the root in certain conditions',
      'Specific vowel changes in root-affix junction',
      'Influence on reduplication patterns',
      'Affects choice of allomorphs in complex derivations'
    ],

    technicalNotes: [
      'This rule complements the pit/apit distinction in Sanskrit grammar',
      'Sārvādhātuka affixes are the primary verbal terminations',
      'The ṅit designation affects various subsequent morphological processes',
      'This rule works in conjunction with specific root-based exceptions',
      'The distinction is crucial for proper accent and morphophonemic application'
    ],

    relatedSutras: [
      {
        number: '3.4.113',
        text: 'तिङ्शित्सार्वधातुकम्',
        relation: 'Definition of sārvādhātuka affixes'
      },
      {
        number: '1.2.1',
        text: 'गाङ्कुटादिभ्योऽञ्णिन्ङ्इत्',
        relation: 'Specific ṅit rules for certain roots'
      },
      {
        number: '1.2.2',
        text: 'विज इट्',
        relation: 'Specific ṅit rule for विज् + iṭ'
      },
      {
        number: '1.1.5',
        text: 'क्ङिति च',
        relation: 'General effects of ṅit designation'
      }
    ],

    grammaticalContext: {
      chapter: 'Adhyaya 1, Pada 2 - Designation rules',
      anuvrutti: 'ṅit designation from previous sutras',
      scope: 'General rule for primary verbal affixes',
      systematic_position: 'Foundational rule for verbal morphology'
    }
  };
}
