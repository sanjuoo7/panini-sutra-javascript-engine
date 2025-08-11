/**
 * Conjunct Analysis Utility Module
 * 
 * This module provides comprehensive analysis of Sanskrit conjunct consonants (saṃyoga).
 * Conjuncts are clusters of consonants that appear together in Sanskrit words.
 * 
 * Key Features:
 * - Detection of conjunct patterns in both Devanagari and IAST scripts
 * - Comprehensive database of 150+ conjunct patterns
 * - Multi-script support with automatic script detection
 * - Performance-optimized pattern matching
 * 
 * Created: August 11, 2025
 * Extracted from: Sutra 1.2.5 implementation
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * Comprehensive database of conjunct consonant patterns (saṃyoga)
 * These are clusters of consonants that frequently appear together in Sanskrit
 */
export const CONJUNCT_PATTERNS = {
  devanagari: [
    // Common conjunct patterns
    'क्क', 'क्त', 'क्म', 'क्य', 'क्र', 'क्ल', 'क्व', 'क्ष', 'क्स',
    'ख्य', 'ख्र', 'ग्न', 'ग्म', 'ग्य', 'ग्र', 'ग्व', 'घ्न', 'घ्र',
    'ङ्क', 'ङ्ख', 'ङ्ग', 'ङ्घ', 'च्च', 'च्छ', 'च्य', 'ज्ज', 'ज्झ',
    'ज्ञ', 'ज्य', 'ज्र', 'ज्व', 'ञ्च', 'ञ्छ', 'ञ्ज', 'ञ्झ', 'ट्ट',
    'ट्य', 'ड्ड', 'ड्य', 'ण्ट', 'ण्ठ', 'ण्ड', 'ण्ण', 'ण्य', 'त्क',
    'त्त', 'त्थ', 'त्न', 'त्प', 'त्फ', 'त्म', 'त्य', 'त्र', 'त्व',
    'त्स', 'थ्य', 'द्ग', 'द्घ', 'द्द', 'द्ध', 'द्न', 'द्ब', 'द्भ',
    'द्म', 'द्य', 'द्र', 'द्व', 'ध्न', 'ध्म', 'ध्य', 'ध्र', 'ध्व',
    'न्क', 'न्ख', 'न्ग', 'न्घ', 'न्च', 'न्छ', 'न्ज', 'न्झ', 'न्ट',
    'न्ठ', 'न्ड', 'न्त', 'न्थ', 'न्द', 'न्ध', 'न्न', 'न्प', 'न्फ',
    'न्ब', 'न्भ', 'न्म', 'न्य', 'न्र', 'न्ल', 'न्व', 'न्स', 'प्त',
    'प्न', 'प्प', 'प्फ', 'प्म', 'प्य', 'प्र', 'प्ल', 'प्व', 'प्स',
    'फ्य', 'फ्र', 'ब्ज', 'ब्द', 'ब्ध', 'ब्ब', 'ब्भ', 'ब्य', 'ब्र',
    'ब्व', 'भ्न', 'भ्म', 'भ्य', 'भ्र', 'भ्व', 'म्न', 'म्प', 'म्फ',
    'म्ब', 'म्भ', 'म्म', 'म्य', 'म्र', 'म्ल', 'म्व', 'य्य', 'र्क',
    'र्ख', 'र्ग', 'र्घ', 'र्च', 'र्छ', 'र्ज', 'र्झ', 'र्ञ', 'र्ट',
    'र्ठ', 'र्ड', 'र्ढ', 'र्ण', 'र्त', 'र्थ', 'र्द', 'र्ध', 'र्न',
    'र्प', 'र्फ', 'र्ब', 'र्भ', 'र्म', 'र्य', 'र्र', 'र्ल', 'र्व',
    'र्श', 'र्ष', 'र्स', 'र्ह', 'ल्क', 'ल्ग', 'ल्त', 'ल्द', 'ल्न',
    'ल्प', 'ल्ब', 'ल्म', 'ल्य', 'ल्ल', 'ल्व', 'व्य', 'व्र', 'व्व',
    'श्च', 'श्छ', 'श्न', 'श्म', 'श्य', 'श्र', 'श्ल', 'श्व', 'ष्क',
    'ष्ट', 'ष्ठ', 'ष्ण', 'ष्प', 'ष्फ', 'ष्म', 'ष्य', 'ष्व', 'स्क',
    'स्ख', 'स्त', 'स्थ', 'स्न', 'स्प', 'स्फ', 'स्म', 'स्य', 'स्र',
    'स्व', 'ह्ण', 'ह्न', 'ह्म', 'ह्य', 'ह्र', 'ह्ल', 'ह्व'
  ],
  iast: [
    // Common conjunct patterns in IAST
    'kk', 'kt', 'km', 'ky', 'kr', 'kl', 'kv', 'kṣ', 'ks',
    'khy', 'khr', 'gn', 'gm', 'gy', 'gr', 'gv', 'ghn', 'ghr',
    'ṅk', 'ṅkh', 'ṅg', 'ṅgh', 'cc', 'cch', 'cy', 'jj', 'jjh',
    'jñ', 'jy', 'jr', 'jv', 'ñc', 'ñch', 'ñj', 'ñjh', 'ṭṭ',
    'ṭy', 'ḍḍ', 'ḍy', 'ṇṭ', 'ṇṭh', 'ṇḍ', 'ṇṇ', 'ṇy', 'tk',
    'tt', 'tth', 'tn', 'tp', 'tph', 'tm', 'ty', 'tr', 'tv',
    'ts', 'thy', 'dg', 'dgh', 'dd', 'ddh', 'dn', 'db', 'dbh',
    'dm', 'dy', 'dr', 'dv', 'dhn', 'dhm', 'dhy', 'dhr', 'dhv',
    'nk', 'nkh', 'ng', 'ngh', 'nc', 'nch', 'nj', 'njh', 'nṭ',
    'nṭh', 'nḍ', 'nt', 'nth', 'nd', 'ndh', 'nn', 'np', 'nph',
    'nb', 'nbh', 'nm', 'ny', 'nr', 'nl', 'nv', 'ns', 'pt',
    'pn', 'pp', 'pph', 'pm', 'py', 'pr', 'pl', 'pv', 'ps',
    'phy', 'phr', 'bj', 'bd', 'bdh', 'bb', 'bbh', 'by', 'br',
    'bv', 'bhn', 'bhm', 'bhy', 'bhr', 'bhv', 'mn', 'mp', 'mph',
    'mb', 'mbh', 'mm', 'my', 'mr', 'ml', 'mv', 'yy', 'rk',
    'rkh', 'rg', 'rgh', 'rc', 'rch', 'rj', 'rjh', 'rñ', 'rṭ',
    'rṭh', 'rḍ', 'rḍh', 'rṇ', 'rt', 'rth', 'rd', 'rdh', 'rn',
    'rp', 'rph', 'rb', 'rbh', 'rm', 'ry', 'rr', 'rl', 'rv',
    'rś', 'rṣ', 'rs', 'rh', 'lk', 'lg', 'lt', 'ld', 'ln',
    'lp', 'lb', 'lm', 'ly', 'll', 'lv', 'vy', 'vr', 'vv',
    'śc', 'śch', 'śn', 'śm', 'śy', 'śr', 'śl', 'śv', 'ṣk',
    'ṣṭ', 'ṣṭh', 'ṣṇ', 'ṣp', 'ṣph', 'ṣm', 'ṣy', 'ṣv', 'sk',
    'skh', 'st', 'sth', 'sn', 'sp', 'sph', 'sm', 'sy', 'sr',
    'sv', 'hṇ', 'hn', 'hm', 'hy', 'hr', 'hl', 'hv'
  ]
};

/**
 * Checks if a consonant sequence contains a conjunct (saṃyoga)
 * @param {string} consonantSequence - The consonant sequence to check
 * @returns {boolean} - True if the sequence contains a conjunct
 */
export function hasConjunct(consonantSequence) {
  if (!consonantSequence || typeof consonantSequence !== 'string') {
    return false;
  }

  const cleanSequence = consonantSequence.trim();
  if (!cleanSequence) {
    return false;
  }

  // Auto-detect script and use appropriate patterns
  const script = detectScript(cleanSequence);
  
  if (script === 'Devanagari') {
    for (const pattern of CONJUNCT_PATTERNS.devanagari) {
      if (cleanSequence.includes(pattern)) {
        return true;
      }
    }
  } else {
    for (const pattern of CONJUNCT_PATTERNS.iast) {
      if (cleanSequence.includes(pattern)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Finds all conjunct patterns present in a given text
 * @param {string} text - The text to analyze
 * @returns {Array<{pattern: string, position: number, script: string}>} - Array of found conjuncts
 */
export function findConjuncts(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const cleanText = text.trim();
  if (!cleanText) {
    return [];
  }

  const script = detectScript(cleanText);
  const patterns = script === 'Devanagari' ? CONJUNCT_PATTERNS.devanagari : CONJUNCT_PATTERNS.iast;
  const foundConjuncts = [];

  for (const pattern of patterns) {
    let position = cleanText.indexOf(pattern);
    while (position !== -1) {
      foundConjuncts.push({
        pattern: pattern,
        position: position,
        script: script
      });
      position = cleanText.indexOf(pattern, position + 1);
    }
  }

  // Sort by position
  return foundConjuncts.sort((a, b) => a.position - b.position);
}

/**
 * Checks if a specific pattern is a recognized conjunct
 * @param {string} pattern - The pattern to check
 * @param {string} [script='auto'] - The script type ('Devanagari', 'IAST', or 'auto')
 * @returns {boolean} - True if the pattern is a recognized conjunct
 */
export function isConjunctPattern(pattern, script = 'auto') {
  if (!pattern || typeof pattern !== 'string') {
    return false;
  }

  const cleanPattern = pattern.trim();
  if (!cleanPattern) {
    return false;
  }

  const targetScript = script === 'auto' ? detectScript(cleanPattern) : script;
  
  if (targetScript === 'Devanagari') {
    return CONJUNCT_PATTERNS.devanagari.includes(cleanPattern);
  } else {
    return CONJUNCT_PATTERNS.iast.includes(cleanPattern);
  }
}

/**
 * Analyzes text for conjunct patterns and provides detailed statistics
 * @param {string} text - The text to analyze
 * @returns {Object} - Detailed analysis of conjunct usage
 */
export function analyzeConjunctUsage(text) {
  if (!text || typeof text !== 'string') {
    return {
      hasConjuncts: false,
      conjunctCount: 0,
      uniqueConjuncts: [],
      conjunctDensity: 0,
      script: 'Unknown',
      analysis: []
    };
  }

  const cleanText = text.trim();
  const script = detectScript(cleanText);
  const foundConjuncts = findConjuncts(cleanText);
  const uniquePatterns = [...new Set(foundConjuncts.map(c => c.pattern))];

  return {
    hasConjuncts: foundConjuncts.length > 0,
    conjunctCount: foundConjuncts.length,
    uniqueConjuncts: uniquePatterns,
    conjunctDensity: cleanText.length > 0 ? foundConjuncts.length / cleanText.length : 0,
    script: script,
    analysis: foundConjuncts
  };
}

/**
 * Gets all conjunct patterns for a specific script
 * @param {string} [script='both'] - Script type ('Devanagari', 'IAST', or 'both')
 * @returns {Array<string>|Object} - Array of patterns for single script, object for both
 */
export function getConjunctPatterns(script = 'both') {
  switch (script.toLowerCase()) {
    case 'devanagari':
      return [...CONJUNCT_PATTERNS.devanagari];
    case 'iast':
      return [...CONJUNCT_PATTERNS.iast];
    case 'both':
    default:
      return {
        devanagari: [...CONJUNCT_PATTERNS.devanagari],
        iast: [...CONJUNCT_PATTERNS.iast]
      };
  }
}

/**
 * Validates conjunct pattern format and completeness
 * @param {string} pattern - The pattern to validate
 * @param {string} [script='auto'] - The script type
 * @returns {Object} - Validation result with details
 */
export function validateConjunctPattern(pattern, script = 'auto') {
  if (!pattern || typeof pattern !== 'string') {
    return {
      isValid: false,
      errors: ['Pattern is required and must be a string'],
      warnings: []
    };
  }

  const cleanPattern = pattern.trim();
  const targetScript = script === 'auto' ? detectScript(cleanPattern) : script;
  const errors = [];
  const warnings = [];

  // Check if pattern exists in database
  const isRecognized = isConjunctPattern(cleanPattern, targetScript);
  if (!isRecognized) {
    warnings.push(`Pattern '${cleanPattern}' not found in conjunct database`);
  }

  // Check pattern structure
  if (cleanPattern.length < 2) {
    errors.push('Conjunct patterns should be at least 2 characters long');
  }

  // Script-specific validation
  if (targetScript === 'Devanagari') {
    if (!/^[\u0900-\u097F्]+$/.test(cleanPattern)) {
      errors.push('Invalid Devanagari characters in pattern');
    }
    if (!cleanPattern.includes('्')) {
      warnings.push('Devanagari conjuncts typically contain halanta (्)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings,
    script: targetScript,
    isRecognized: isRecognized
  };
}
