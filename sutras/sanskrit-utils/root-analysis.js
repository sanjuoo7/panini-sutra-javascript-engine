/**
 * Root Analysis Utility Module
 * 
 * This module provides comprehensive analysis of Sanskrit verbal roots (dhātu).
 * It handles root identification, variant recognition, and morphological analysis.
 * 
 * Key Features:
 * - Specific root identification (विज्, ऊर्ण, इन्धि, भू)
 * - Root variant and alternative form recognition
 * - Multi-script support for Devanagari and IAST
 * - Morphological pattern matching
 * - Root normalization and validation
 * 
 * Created: August 11, 2025
 * Extracted from: Sutras 1.2.2, 1.2.3, 1.2.6 implementations
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * Database of specific roots mentioned in various sutras
 */
export const SPECIFIC_ROOTS = {
  // Root विज् (to separate, to abandon) - from sutra 1.2.2
  vij: {
    devanagari: 'विज्',
    iast: 'vij',
    meaning: 'to separate, to abandon',
    sutra: '1.2.2'
  },
  
  // Root ऊर्ण (to cover) - from sutra 1.2.3  
  urna: {
    devanagari: 'ऊर्ण',
    iast: 'ūrṇa',
    meaning: 'to cover',
    sutra: '1.2.3'
  },
  
  // Root इन्धि (to kindle) - from sutra 1.2.6
  indhi: {
    devanagari: 'इन्धि',
    iast: 'indhi', 
    meaning: 'to kindle, to ignite',
    sutra: '1.2.6'
  },
  
  // Root भू (to become) - from sutra 1.2.6
  bhu: {
    devanagari: 'भू',
    iast: 'bhū',
    meaning: 'to become, to be',
    sutra: '1.2.6'
  }
};

/**
 * Root variants and alternative forms
 */
export const ROOT_VARIANTS = {
  devanagari: {
    'विज्': ['विज्', 'विञ्ज्', 'वैज्'],
    'ऊर्ण': ['ऊर्ण', 'ऊर्ण्', 'ऊर्णु'],
    'इन्धि': ['इन्धि', 'इध्', 'इन्ध्', 'एध्'],
    'भू': ['भू', 'भु', 'भव्', 'भुव्']
  },
  iast: {
    'vij': ['vij', 'viñj', 'vaij'],
    'ūrṇa': ['ūrṇa', 'ūrṇ', 'urṇa', 'urṇ', 'ūrṇu'],
    'indhi': ['indhi', 'idh', 'indh', 'edh'],
    'bhū': ['bhū', 'bhu', 'bhav', 'bhuv']
  }
};

/**
 * iṭ-augment patterns for roots
 */
export const IT_AUGMENT_PATTERNS = {
  devanagari: ['^इत', '^इट्', '^इष्य', '^इत्व'],
  iast: ['^it', '^iṭ', '^iṣy', '^itv']
};

/**
 * Checks if a root is the विज् root or its variants
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is विज् or its variants
 */
export function isVijRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return ROOT_VARIANTS.devanagari['विज्']?.includes(cleanRoot) || false;
  } else {
    return ROOT_VARIANTS.iast['vij']?.includes(cleanRoot) || false;
  }
}

/**
 * Checks if a root is the ऊर्ण root or its variants
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is ऊर्ण or its variants
 */
export function isUrnaRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return ROOT_VARIANTS.devanagari['ऊर्ण']?.includes(cleanRoot) || false;
  } else {
    return ROOT_VARIANTS.iast['ūrṇa']?.includes(cleanRoot) || false;
  }
}

/**
 * Checks if a root is the इन्धि root or its variants
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is इन्धि or its variants
 */
export function isIndhiRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return ROOT_VARIANTS.devanagari['इन्धि']?.includes(cleanRoot) || false;
  } else {
    return ROOT_VARIANTS.iast['indhi']?.includes(cleanRoot) || false;
  }
}

/**
 * Checks if a root is the भू root or its variants
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is भू or its variants
 */
export function isBhuRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return ROOT_VARIANTS.devanagari['भू']?.includes(cleanRoot) || false;
  } else {
    return ROOT_VARIANTS.iast['bhū']?.includes(cleanRoot) || false;
  }
}

/**
 * Checks if a root is either इन्धि or भू (for sutra 1.2.6)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is इन्धि or भू
 */
export function isIndhiBhavatiRoot(root) {
  return isIndhiRoot(root) || isBhuRoot(root);
}

/**
 * Gets all variants of a specific root
 * @param {string} root - The root to get variants for
 * @returns {Array<string>} - Array of variants, or empty array if not found
 */
export function getRootVariants(root) {
  if (!root || typeof root !== 'string') {
    return [];
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  // Find which root this might be
  const variantMap = script === 'Devanagari' ? ROOT_VARIANTS.devanagari : ROOT_VARIANTS.iast;
  
  for (const [baseRoot, variants] of Object.entries(variantMap)) {
    if (variants.includes(cleanRoot)) {
      return [...variants];
    }
  }
  
  return [];
}

/**
 * Normalizes a root to its base form
 * @param {string} root - The root to normalize
 * @returns {string|null} - The base form of the root, or null if not recognized
 */
export function normalizeRoot(root) {
  if (!root || typeof root !== 'string') {
    return null;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  // Find the base form
  const variantMap = script === 'Devanagari' ? ROOT_VARIANTS.devanagari : ROOT_VARIANTS.iast;
  
  for (const [baseRoot, variants] of Object.entries(variantMap)) {
    if (variants.includes(cleanRoot)) {
      return baseRoot;
    }
  }
  
  return null;
}

/**
 * Analyzes a root and provides detailed information
 * @param {string} root - The root to analyze
 * @returns {Object} - Detailed analysis of the root
 */
export function analyzeRoot(root) {
  if (!root || typeof root !== 'string') {
    return {
      isValid: false,
      error: 'Invalid root input',
      analysis: {}
    };
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  const baseForm = normalizeRoot(cleanRoot);
  
  const analysis = {
    isValid: true,
    input: cleanRoot,
    script: script,
    baseForm: baseForm,
    isRecognized: baseForm !== null,
    properties: {
      isVij: isVijRoot(cleanRoot),
      isUrna: isUrnaRoot(cleanRoot),
      isIndhi: isIndhiRoot(cleanRoot),
      isBhu: isBhuRoot(cleanRoot),
      isIndhiBhavati: isIndhiBhavatiRoot(cleanRoot)
    }
  };

  // Add specific root information if recognized
  if (analysis.isRecognized) {
    const rootKey = Object.keys(SPECIFIC_ROOTS).find(key => {
      const rootInfo = SPECIFIC_ROOTS[key];
      return rootInfo.devanagari === baseForm || rootInfo.iast === baseForm;
    });
    
    if (rootKey) {
      analysis.rootInfo = SPECIFIC_ROOTS[rootKey];
    }
    
    analysis.variants = getRootVariants(cleanRoot);
  }

  return analysis;
}

/**
 * Checks if a root has iṭ augment patterns
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root shows iṭ augment patterns
 */
export function hasItAugment(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  const patterns = script === 'Devanagari' ? IT_AUGMENT_PATTERNS.devanagari : IT_AUGMENT_PATTERNS.iast;
  
  return patterns.some(pattern => {
    if (pattern.startsWith('^')) {
      // Beginning of word pattern
      return cleanRoot.startsWith(pattern.slice(1));
    } else {
      // Anywhere in word pattern
      return cleanRoot.includes(pattern);
    }
  });
}

/**
 * Finds specific roots in a given text
 * @param {string} text - The text to analyze
 * @returns {Array<Object>} - Array of found roots with positions and types
 */
export function findSpecificRoots(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const cleanText = text.trim();
  const script = detectScript(cleanText);
  const foundRoots = [];

  // Check each specific root
  for (const [key, rootInfo] of Object.entries(SPECIFIC_ROOTS)) {
    const rootForm = script === 'Devanagari' ? rootInfo.devanagari : rootInfo.iast;
    const variants = getRootVariants(rootForm);
    
    for (const variant of variants) {
      let position = cleanText.indexOf(variant);
      while (position !== -1) {
        foundRoots.push({
          root: variant,
          baseForm: rootForm,
          type: key,
          position: position,
          script: script,
          meaning: rootInfo.meaning,
          sutra: rootInfo.sutra
        });
        position = cleanText.indexOf(variant, position + 1);
      }
    }
  }

  // Sort by position
  return foundRoots.sort((a, b) => a.position - b.position);
}

/**
 * Validates root format and checks against known patterns
 * @param {string} root - The root to validate
 * @returns {Object} - Validation result with details
 */
export function validateRoot(root) {
  if (!root || typeof root !== 'string') {
    return {
      isValid: false,
      errors: ['Root is required and must be a string'],
      warnings: [],
      suggestions: []
    };
  }

  const cleanRoot = root.trim();
  const analysis = analyzeRoot(cleanRoot);
  const errors = [];
  const warnings = [];
  const suggestions = [];

  // Basic format validation
  if (cleanRoot.length === 0) {
    errors.push('Root cannot be empty');
    return { isValid: false, errors, warnings, suggestions };
  }

  if (!analysis.isRecognized) {
    warnings.push(`Root '${cleanRoot}' not found in specific root database`);
    
    // Suggest similar roots
    const allRoots = Object.values(SPECIFIC_ROOTS).flatMap(rootInfo => [
      rootInfo.devanagari, rootInfo.iast, 
      ...getRootVariants(rootInfo.devanagari),
      ...getRootVariants(rootInfo.iast)
    ]).filter(Boolean);

    const similar = allRoots.filter(r => 
      Math.abs(r.length - cleanRoot.length) <= 1 && 
      (r.startsWith(cleanRoot[0]) || cleanRoot.startsWith(r[0]))
    ).slice(0, 3);

    if (similar.length > 0) {
      suggestions.push(...similar.map(s => `Did you mean '${s}'?`));
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings,
    suggestions: suggestions,
    analysis: analysis
  };
}
