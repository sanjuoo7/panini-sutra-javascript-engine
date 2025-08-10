/**
 * Sutra 1.1.20: दाधा घ्वदाप् (dādhā ghvadāp)
 * "The words having the form of दा 'to give' and धा 'to place' are called घु।"
 * 
 * This is a saṃjñā (definition) sutra that defines the technical term घु (ghu)
 * for certain verb roots.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.20
 */

import { detectScript } from '../sanskrit-utils/index.js';

/**
 * Checks if a word/root is classified as घु according to Sutra 1.1.20
 * 
 * @param {string} root - The verbal root to check
 * @returns {boolean} - True if the root is घु
 */
export function isGhu(root) {
  if (!root) {
    return false;
  }

  try {
    const script = detectScript(root);
    
    if (script === 'Devanagari') {
      // दा and धा roots in Devanagari
      return ['दा', 'धा'].includes(root);
    } else {
      // IAST: dā and dhā
      return ['dā', 'dhā'].includes(root);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Gets all घु roots
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of घु roots
 */
export function getGhuRoots(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['दा', 'धा'];
  } else {
    return ['dā', 'dhā'];
  }
}

/**
 * Checks if a root has घु behavior for grammatical operations
 * 
 * @param {string} root - The root to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if घु rules should apply
 */
export function hasGhuBehavior(root, context = {}) {
  return isGhu(root);
}
