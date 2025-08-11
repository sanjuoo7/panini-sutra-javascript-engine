/**
 * Sutra 1.2.2: विज इट्
 * "vija iṭ"
 * "An affix beginning with augment इट् is ङित् after root विज्"
 * 
 * RULE TYPE: अतिदेश (Extended Application)
 * SCOPE: Specific rule for root विज् with इट्-augmented affixes
 * CONDITIONS: Applied to affixes with इट् augment after root विज्
 * TRANSFORMATIONS: Makes इट्-augmented affixes ङित् after विज्
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.2 - ङित् for इट्-affixes after विज्
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isVijRoot } from '../sanskrit-utils/root-analysis.js';

// Re-export for backward compatibility
export { isVijRoot } from '../sanskrit-utils/root-analysis.js';

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
 * The root विज् in both scripts
 */
const VIJ_ROOT = {
  devanagari: 'विज्',
  iast: 'vij'
};

/**
 * Patterns indicating इट् augment in affixes
 * इट् is added as an augment to certain affixes per sutra 7.2.35
 */
const IT_AUGMENT_PATTERNS = {
  devanagari: ['इ', 'इत्', 'इट्'],
  iast: ['i', 'it', 'iṭ']
};

/**
 * Common affixes that can take इट् augment
 */
const IT_AUGMENTED_AFFIXES = {
  devanagari: [
    'इत',      // past participle with इट्
    'इत्वा',    // gerund with इट्
    'इष्यति',   // future with इट्
    'इत्',      // kṛt suffix with इट्
    'इतुम्'     // infinitive with इट्
  ],
  iast: [
    'ita',      // past participle with iṭ
    'itvā',     // gerund with iṭ  
    'iṣyati',   // future with iṭ
    'it',       // kṛt suffix with iṭ
    'itum'      // infinitive with iṭ
  ]
};

/**
 * Checks if an affix begins with इट् augment
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if affix begins with इट् augment
 */
export function beginsWithItAugment(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const trimmedAffix = affix.trim();
  const script = detectScript(trimmedAffix);
  
  if (script === 'Devanagari') {
    return IT_AUGMENT_PATTERNS.devanagari.some(pattern => 
      trimmedAffix.startsWith(pattern)
    );
  } else if (script === 'IAST') {
    return IT_AUGMENT_PATTERNS.iast.some(pattern => 
      trimmedAffix.startsWith(pattern)
    );
  }
  
  return false;
}

/**
 * Checks if an affix is a known इट्-augmented affix
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if it's a recognized इट्-augmented affix
 */
export function isItAugmentedAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const trimmedAffix = affix.trim();
  const script = detectScript(trimmedAffix);
  
  if (script === 'Devanagari') {
    return IT_AUGMENTED_AFFIXES.devanagari.includes(trimmedAffix);
  } else if (script === 'IAST') {
    return IT_AUGMENTED_AFFIXES.iast.includes(trimmedAffix);
  }
  
  return false;
}

/**
 * Main function: Determines if an affix should be treated as ङित् 
 * according to Sutra 1.2.2
 * @param {string} root - The verbal root
 * @param {string} affix - The affix following the root
 * @param {Object} [context={}] - Additional context
 * @returns {boolean} - True if affix should be treated as ङित्
 */
export function isNgitByVijIt(root, affix, context = {}) {
  // Input validation
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return false;
  }

  // Validate Sanskrit inputs
  if (!isValidSanskritWord(root) || !isValidSanskritWord(affix)) {
    return false;
  }

  // Check if root is विज्
  if (!isVijRoot(root)) {
    return false;
  }

  // Check if affix begins with इट् augment
  if (!beginsWithItAugment(affix) && !isItAugmentedAffix(affix)) {
    return false;
  }

  // If all conditions met, affix is treated as ङित्
  return true;
}

/**
 * Analyzes the ङित् status for विज् + इट्-affixes
 * @param {Array} combinations - Array of {root, affix} objects
 * @returns {Object} - Analysis results
 */
export function analyzeVijItStatus(combinations) {
  if (!Array.isArray(combinations)) {
    throw new Error('Expected array of root-affix combinations');
  }

  const results = {
    total: combinations.length,
    applicableCount: 0,
    nonVijCount: 0,
    nonItCount: 0,
    invalidCount: 0,
    applicableItems: [],
    nonVijItems: [],
    nonItItems: [],
    invalidItems: []
  };

  for (const { root, affix } of combinations) {
    try {
      if (isNgitByVijIt(root, affix)) {
        results.applicableCount++;
        results.applicableItems.push({ 
          root, 
          affix, 
          status: 'ङित् by विज इट्',
          explanation: 'विज् + इट्-augmented affix → ङित्'
        });
      } else if (!isVijRoot(root)) {
        results.nonVijCount++;
        results.nonVijItems.push({ 
          root, 
          affix, 
          status: 'not विज् root',
          explanation: 'Root is not विज्'
        });
      } else if (!beginsWithItAugment(affix) && !isItAugmentedAffix(affix)) {
        results.nonItCount++;
        results.nonItItems.push({ 
          root, 
          affix, 
          status: 'no इट् augment',
          explanation: 'Affix does not begin with इट् augment'
        });
      } else {
        results.nonItCount++;
        results.nonItItems.push({ 
          root, 
          affix, 
          status: 'other reason',
          explanation: 'Does not meet conditions'
        });
      }
    } catch (error) {
      results.invalidCount++;
      results.invalidItems.push({ root, affix, error: error.message });
    }
  }

  return results;
}

/**
 * Gets examples of विज् with इट्-augmented affixes
 * @returns {Object} - Examples with explanations
 */
export function getVijItExamples() {
  return {
    sutraText: {
      devanagari: 'विज इट्',
      iast: 'vija iṭ',
      translation: 'इट्-augmented affixes are ङित् after विज्'
    },
    
    rootInformation: {
      root: 'विज्/vij',
      meanings: ['to fear', 'to move', 'to be agitated', 'to tremble'],
      dhatu: 'भ्वादिगण (1st conjugation)',
      classification: 'Parasmaipada/Ubhayapada'
    },
    
    itAugmentExplanation: {
      rule: 'आर्धधातुकस्येड् वलादेः (7.2.35)',
      description: 'इट् augment is added to certain आर्धधातुक affixes beginning with consonants',
      purpose: 'Facilitates phonetic changes and maintains syllable structure'
    },
    
    positiveExamples: [
      {
        root: 'विज्',
        affix: 'इत',
        form: 'विजित',
        result: 'ङित्',
        explanation: 'विज् + इत (with इट्) → इत becomes ङित्',
        meaning: 'conquered, overcome'
      },
      {
        root: 'विज्',
        affix: 'इत्वा',
        form: 'विजित्वा',
        result: 'ङित्',
        explanation: 'विज् + इत्वा (with इट्) → इत्वा becomes ङित्',
        meaning: 'having conquered'
      },
      {
        root: 'vij',
        affix: 'ita',
        form: 'vijita',
        result: 'ङित्',
        explanation: 'vij + ita (with iṭ) → ita becomes ङित्',
        meaning: 'conquered (IAST)'
      }
    ],
    
    negativeExamples: [
      {
        root: 'विज्',
        affix: 'ति',
        form: 'विजति',
        result: 'not ङित्',
        explanation: 'ति does not begin with इट् augment'
      },
      {
        root: 'भू',
        affix: 'इत',
        form: 'भूत',
        result: 'not ङित्',
        explanation: 'Root is not विज्, different rule applies'
      },
      {
        root: 'विज्',
        affix: 'त',
        form: 'विजत',
        result: 'not ङित्',
        explanation: 'त does not have इट् augment'
      }
    ],
    
    technicalNotes: [
      'This sutra is specific to root विज् and इट्-augmented affixes',
      'इट् augment is added by separate rules (7.2.35 etc.)',
      'ङित् designation affects accent and other grammatical operations',
      'This rule takes precedence over general ङित् rules for विज्'
    ],
    
    relatedSutras: [
      '1.2.1: गाङ्कुटादिभ्योऽञ्णिन्ङ् इत् (general ङित् rule)',
      '7.2.35: आर्धधातुकस्येड् वलादेः (इट् augment rule)',
      '1.1.5: क्ङिति च (general ङित् behavior)'
    ]
  };
}

// Export constants for testing
export { 
  VIJ_ROOT, 
  IT_AUGMENT_PATTERNS, 
  IT_AUGMENTED_AFFIXES 
};
