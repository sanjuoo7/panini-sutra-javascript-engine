/**
 * Sutra 1.2.8: रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च
 * "rudavidamuṣagrahisvapipracchḥ saṃśaca"
 * "After roots रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्, the affixes क्त्वा and सन् are कित्।"
 *
 * This sutra establishes कित् (kit) designation for क्त्वा and सन् affixes when they 
 * follow the specific roots listed. The कित् designation prevents guṇa/vṛddhi operations
 * and affects the morphological behavior of these combinations.
 *
 * Type: अतिदेश (atideśa) - Analogical extension
 * Scope: Affix modification rules for specific root-affix combinations
 * Dependencies: Uses shared kit-designation utilities for root identification
 *
 * @fileoverview Implementation of Panini's Sutra 1.2.8
 */

import { 
  detectScript, 
  validateSanskritWord 
} from '../sanskrit-utils/index.js';

import { 
  isSutra128Root,
  isKtvaOrSanAffix,
  isKitBySutra128,
  analyzeKitDesignation 
} from '../sanskrit-utils/kit-designation.js';

/**
 * Analyzes whether क्त्वा and सन् affixes should be कित् after the specific roots
 * mentioned in Sutra 1.2.8 (रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्)
 * 
 * @param {string} root - The verbal root to analyze
 * @param {string} affix - The affix to check (should be क्त्वा or सन्)
 * @param {Object} options - Optional configuration
 * @param {boolean} options.strict - Whether to apply strict validation (default: true)
 * @param {boolean} options.includeVariants - Whether to include root variants (default: true)
 * @returns {Object} Analysis result with kit designation status
 */
export function analyzeKitDesignationSutra128(root, affix, options = {}) {
  const config = {
    strict: true,
    includeVariants: true,
    ...options
  };

  // Input validation
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return {
      isKit: false,
      applies: false,
      root: root || '',
      affix: affix || '',
      error: 'Invalid input: both root and affix must be non-empty strings'
    };
  }

  const cleanRoot = root.trim();
  const cleanAffix = affix.trim();

  // Validate Sanskrit input if strict mode
  if (config.strict) {
    if (!validateSanskritWord(cleanRoot) || !validateSanskritWord(cleanAffix)) {
      return {
        isKit: false,
        applies: false,
        root: cleanRoot,
        affix: cleanAffix,
        error: 'Invalid Sanskrit input detected'
      };
    }
  }

  // Check if this sutra applies
  const isSutra128Applicable = isSutra128Root(cleanRoot) && isKtvaOrSanAffix(cleanAffix);
  
  if (!isSutra128Applicable) {
    return {
      isKit: false,
      applies: false,
      root: cleanRoot,
      affix: cleanAffix,
      reason: isSutra128Root(cleanRoot) 
        ? 'Affix is not क्त्वा or सन्'
        : 'Root is not one of रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्'
    };
  }

  // Determine kit designation
  const isKit = isKitBySutra128(cleanRoot, cleanAffix);

  return {
    isKit,
    applies: true,
    root: cleanRoot,
    affix: cleanAffix,
    sutra: '1.2.8',
    description: 'After रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्, the affixes क्त्वा and सन् are कित्',
    effect: isKit ? 'Affix receives कित् designation, preventing guṇa/vṛddhi' : 'No कित् designation'
  };
}

/**
 * Checks if a given root-affix combination falls under Sutra 1.2.8
 * 
 * @param {string} root - The verbal root
 * @param {string} affix - The affix
 * @returns {boolean} True if the combination is covered by this sutra
 */
export function appliesSutra128(root, affix) {
  if (!root || !affix) return false;
  return isSutra128Root(root.trim()) && isKtvaOrSanAffix(affix.trim());
}

/**
 * Returns the specific roots mentioned in Sutra 1.2.8
 * 
 * @param {string} script - The script to return ('devanagari', 'iast', or 'both')
 * @returns {Object|Array} Root list in requested script(s)
 */
export function getSutra128Roots(script = 'both') {
  const roots = {
    devanagari: ['रुद्', 'विद्', 'मुष्', 'गृह्', 'स्वप्', 'प्रच्छ्'],
    iast: ['rud', 'vid', 'muṣ', 'gṛh', 'svap', 'pracch'],
    meanings: [
      'to weep, to cry',
      'to know, to find',
      'to steal, to rob',
      'to seize, to grasp',
      'to sleep',
      'to ask, to question'
    ]
  };

  switch (script.toLowerCase()) {
    case 'devanagari':
      return roots.devanagari;
    case 'iast':
      return roots.iast;
    case 'meanings':
      return roots.meanings;
    default:
      return roots;
  }
}

/**
 * Returns the affixes that receive कित् designation under this sutra
 * 
 * @param {string} script - The script to return ('devanagari', 'iast', or 'both')
 * @returns {Object|Array} Affix list in requested script(s)
 */
export function getSutra128Affixes(script = 'both') {
  const affixes = {
    devanagari: ['क्त्वा', 'सन्'],
    iast: ['ktvā', 'san'],
    descriptions: [
      'Absolutive affix (gerund)',
      'Desiderative affix'
    ]
  };

  switch (script.toLowerCase()) {
    case 'devanagari':
      return affixes.devanagari;
    case 'iast':
      return affixes.iast;
    case 'descriptions':
      return affixes.descriptions;
    default:
      return affixes;
  }
}

/**
 * Provides examples of Sutra 1.2.8 application
 * 
 * @param {string} script - The script for examples ('devanagari', 'iast', or 'both')
 * @returns {Array} Array of example objects
 */
export function getSutra128Examples(script = 'both') {
  const examples = [
    {
      root: { devanagari: 'रुद्', iast: 'rud' },
      affix: { devanagari: 'क्त्वा', iast: 'ktvā' },
      result: { devanagari: 'रुदित्वा', iast: 'ruditvā' },
      meaning: 'having wept',
      explanation: 'क्त्वा is कित् after रुद्, so no guṇa of उ'
    },
    {
      root: { devanagari: 'विद्', iast: 'vid' },
      affix: { devanagari: 'सन्', iast: 'san' },
      result: { devanagari: 'विविदिषा', iast: 'vividiṣā' },
      meaning: 'desire to know',
      explanation: 'सन् is कित् after विद्, forming desiderative'
    },
    {
      root: { devanagari: 'स्वप्', iast: 'svap' },
      affix: { devanagari: 'क्त्वा', iast: 'ktvā' },
      result: { devanagari: 'सुप्त्वा', iast: 'suptvā' },
      meaning: 'having slept',
      explanation: 'क्त्वा is कित् after स्वप्, so no guṇa'
    },
    {
      root: { devanagari: 'गृह्', iast: 'gṛh' },
      affix: { devanagari: 'सन्', iast: 'san' },
      result: { devanagari: 'जिगृक्षा', iast: 'jigṛkṣā' },
      meaning: 'desire to seize',
      explanation: 'सन् is कित् after गृह्, forming desiderative'
    }
  ];

  if (script === 'devanagari') {
    return examples.map(ex => ({
      root: ex.root.devanagari,
      affix: ex.affix.devanagari,
      result: ex.result.devanagari,
      meaning: ex.meaning,
      explanation: ex.explanation
    }));
  } else if (script === 'iast') {
    return examples.map(ex => ({
      root: ex.root.iast,
      affix: ex.affix.iast,
      result: ex.result.iast,
      meaning: ex.meaning,
      explanation: ex.explanation
    }));
  }

  return examples;
}

/**
 * Main function for Sutra 1.2.8 - determines कित् designation for क्त्वा and सन् affixes
 * 
 * @param {string} input - Root-affix combination or just root
 * @param {string} affix - The affix (if not included in input)
 * @param {Object} options - Optional configuration
 * @returns {Object} Comprehensive analysis of कित् designation
 */
export default function sutra128(input, affix = null, options = {}) {
  // Handle different input formats
  let root, affixToCheck;
  
  if (affix) {
    root = input;
    affixToCheck = affix;
  } else {
    // Try to parse root+affix from single input
    // This is a simplified approach - in practice, morphological parsing would be more complex
    const parts = input?.split(/[+\-_]/);
    if (parts && parts.length >= 2) {
      root = parts[0];
      affixToCheck = parts[1];
    } else {
      return {
        error: 'Invalid input format. Provide either (root, affix) or root+affix string',
        input: input,
        sutra: '1.2.8'
      };
    }
  }

  return analyzeKitDesignationSutra128(root, affixToCheck, options);
}
