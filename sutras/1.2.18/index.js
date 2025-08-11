/**
 * Sutra 1.2.18: न क्त्वा सेट् (na ktvā seṭ)
 * 
 * Sanskrit: न क्त्वा सेट्
 * IAST: na ktvā seṭ
 * Translation: Not क्त्वा (ktvā) with सेट् (seṭ/iṭ augment)
 * 
 * Rule: The क्त्वा (ktvā) affix does not get kit designation when it has
 * the सेट् augment (iṭ augment). This is an exception rule that prevents
 * kit designation in specific morphological conditions.
 * 
 * Dependencies: Sutra 1.2.8 (कित्त्वा सन्) - this rule provides an exception
 */

import { 
  detectScript, 
  validateSanskritWord, 
  tokenizePhonemes,
  isKtvAffix,
  hasSetAugment
} from '../sanskrit-utils/index.js';

/**
 * Checks if the kit designation is prevented according to Sutra 1.2.18
 * @param {string} root - The verbal root
 * @param {string} affix - The affix being added
 * @param {Object} context - Context object containing augment information
 * @param {boolean} [context.hasSetAugment] - Whether the affix has सेट् augment
 * @param {string} [context.augment] - The type of augment (सेट्/seṭ/iṭ)
 * @returns {Object} Analysis result with kit designation prevention and rule application
 */
export function sutra1218(root, affix, context = {}) {
  // Input validation
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return {
      applies: false,
      preventsKit: false,
      reason: 'Invalid input: root and affix must be non-empty strings',
      sutra: '1.2.18'
    };
  }

  const cleanRoot = root.trim();
  const cleanAffix = affix.trim();

  // Validate Sanskrit input
  const rootValidation = validateSanskritWord(cleanRoot);
  const affixValidation = validateSanskritWord(cleanAffix);
  
  if (!rootValidation.isValid || !affixValidation.isValid) {
    return {
      applies: false,
      preventsKit: false,
      reason: 'Invalid Sanskrit input',
      sutra: '1.2.18'
    };
  }

  // Check if affix is क्त्वा (ktvā)
  if (!isKtvAffix(cleanAffix)) {
    return {
      applies: false,
      preventsKit: false,
      reason: 'Rule applies only to क्त्वा (ktvā) affix',
      sutra: '1.2.18'
    };
  }

  // Check if the affix has सेट् (iṭ) augment
  if (!hasSetAugment(cleanAffix, context)) {
    return {
      applies: false,
      preventsKit: false,
      reason: 'Rule applies only when क्त्वा has सेट् (iṭ) augment',
      sutra: '1.2.18'
    };
  }

  // The rule applies - क्त्वा with सेट् augment does NOT get kit designation
  return {
    applies: true,
    preventsKit: true,
    kit: false,
    reason: 'Kit designation prevented for क्त्वा (ktvā) with सेट् (iṭ) augment',
    sutra: '1.2.18',
    exceptionRule: true,
    root: cleanRoot,
    affix: cleanAffix,
    augmentType: 'सेट्'
  };
}

export default sutra1218;
