/**
 * Kit Designation Analysis Utilities
 * 
 * Functions for analyzing कित् (kit) designation and related morphological properties.
 * These utilities support various Panini sutras that deal with कित् designation.
 * 
 * Created: January 2025
 */

import { detectScript } from './script-detection.js';

/**
 * Checks if an affix has सेट् (seṭ) augment (iṭ augment)
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} - True if the affix has सेट् augment
 */
export function hasSetAugment(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  // Direct context indication
  if (context.hasSetAugment === true || context.hasItAugment === true) {
    return true;
  }
  
  // Check for explicit सेट् marking
  if (context.augment === 'सेट्' || context.augment === 'seṭ' || context.augment === 'iṭ') {
    return true;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  // Check if the affix contains इ or i indicating iṭ augment
  if (script === 'Devanagari') {
    // Look for इ in the affix indicating iṭ augment
    // Common patterns: इक्त, इक्त्वा, इत्वा, etc.
    return cleanAffix.includes('इ') && (
      cleanAffix.includes('त') || 
      cleanAffix.includes('क्त') ||
      cleanAffix.includes('त्वा') ||
      cleanAffix.includes('क्त्वा')
    );
  } else {
    // Look for i in the affix indicating iṭ augment  
    // Common patterns: ikta, iktvā, itvā, etc.
    return cleanAffix.includes('i') && (
      cleanAffix.includes('ta') || 
      cleanAffix.includes('kta') ||
      cleanAffix.includes('tvā') ||
      cleanAffix.includes('ktvā')
    );
  }
}

/**
 * Checks if an affix is a क्त्व (ktv) affix
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is क्त्व
 */
export function isKtvAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }
  
  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  if (script === 'Devanagari') {
    // Basic क्त्वा forms
    if (cleanAffix === 'क्त्व' || cleanAffix === 'क्त्वा' || 
        cleanAffix === 'त्व' || cleanAffix === 'त्वा') {
      return true;
    }
    // Augmented forms (सेट्)
    if (cleanAffix === 'इक्त्वा' || cleanAffix === 'इत्वा') {
      return true;
    }
  } else {
    // Basic ktvā forms (IAST/Roman)
    if (cleanAffix === 'ktv' || cleanAffix === 'ktvā' ||
        cleanAffix === 'tva' || cleanAffix === 'tvā' ||
        cleanAffix === 'ktva' || cleanAffix === 'tva') {
      return true;
    }
    // Augmented forms (iṭ)
    if (cleanAffix === 'iktvā' || cleanAffix === 'itvā' ||
        cleanAffix === 'iktva' || cleanAffix === 'itva') {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if a root belongs to the घु (ghu) class
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is from घु class
 */
export function isGhuClassRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }
  
  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  // Complete घु class roots (all 12 traditional roots)
  const ghuRoots = {
    'Devanagari': ['हु', 'हू', 'दा', 'धा', 'दो', 'पा', 'मा', 'चि', 'जि', 'मी', 'नी', 'चे'],
    'IAST': ['hu', 'hū', 'dā', 'dhā', 'do', 'pā', 'mā', 'ci', 'ji', 'mī', 'nī', 'ce']
  };
  
  const scriptKey = script === 'Devanagari' ? 'Devanagari' : 'IAST';
  return ghuRoots[scriptKey].includes(cleanRoot);
}

/**
 * Checks if a root is the स्था (sthā) root or its variants
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is स्था or variant
 */
export function isSthaRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }
  
  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  // स्था root and its variants
  const sthaVariants = {
    'Devanagari': ['स्था', 'स्थ', 'तिष्ठ्', 'स्थि'],
    'IAST': ['sthā', 'stha', 'tiṣṭh', 'sthi']
  };
  
  const scriptKey = script === 'Devanagari' ? 'Devanagari' : 'IAST';
  return sthaVariants[scriptKey].includes(cleanRoot);
}
