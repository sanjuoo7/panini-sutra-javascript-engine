/**
 * Sutra 1.2.16: विभाषोपयमने (vibhāṣopayamane)
 * 
 * Sanskrit: विभाषोपयमने
 * IAST: vibhāṣopayamane
 * Translation: Optionally in the sense of restraining (upayamane)
 * 
 * Rule: When यम् (yam) root is used in the sense of upayamane (restraining/curbing),
 * the affix gets kit designation optionally.
 * 
 * Dependencies: Sutras 1.2.8 (कित्त्वा सन्), 1.2.15 (यमो यज्ञे)
 */

import { 
  detectScript, 
  validateSanskritWord, 
  tokenizePhonemes,
  isYamRoot,
  isKtvAffix,
  isSicAffix
} from '../sanskrit-utils/index.js';

/**
 * Checks if the kit designation applies according to Sutra 1.2.16
 * @param {string} root - The verbal root
 * @param {string} affix - The affix being added
 * @param {Object} context - Context object containing semantic information
 * @param {string} [context.meaning] - The meaning context (should include 'upayamane' or 'restraining')
 * @param {boolean} [context.optional] - Whether to apply the optional rule
 * @returns {Object} Analysis result with kit designation and rule application
 */
export function sutra1216(root, affix, context = {}) {
  // Input validation
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return {
      applies: false,
      kit: false,
      reason: 'Invalid input: root and affix must be non-empty strings',
      sutra: '1.2.16'
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
      kit: false,
      reason: 'Invalid Sanskrit input',
      sutra: '1.2.16'
    };
  }

  // Check if root is यम् (yam)
  if (!isYamRoot(cleanRoot)) {
    return {
      applies: false,
      kit: false,
      reason: 'Rule applies only to यम् (yam) root',
      sutra: '1.2.16'
    };
  }

  // Check if affix is क्त्वा or सिच्
  const isKtva = isKtvAffix(cleanAffix);
  const isSic = isSicAffix(cleanAffix);
  
  if (!isKtva && !isSic) {
    return {
      applies: false,
      kit: false,
      reason: 'Rule applies only to क्त्वा (ktvā) or सिच् (sic) affixes',
      sutra: '1.2.16'
    };
  }

  // Check for upayamane (restraining) meaning
  const hasUpayamaneMeaning = context.meaning && (
    context.meaning.includes('upayamane') ||
    context.meaning.includes('restraining') ||
    context.meaning.includes('curbing') ||
    context.meaning.includes('उपयमने')
  );

  if (!hasUpayamaneMeaning) {
    return {
      applies: false,
      kit: false,
      reason: 'Rule applies only when यम् is used in the sense of upayamane (restraining)',
      sutra: '1.2.16'
    };
  }

  // विभाषा (vibhāṣā) means optionally
  // Check if optional application is requested
  const applyOptional = context.optional !== false; // Default to true if not specified

  return {
    applies: true,
    kit: applyOptional,
    reason: applyOptional 
      ? 'Kit designation applied optionally for यम् (yam) in upayamane sense with ' + (isKtva ? 'क्त्वा' : 'सिच्')
      : 'Kit designation not applied (optional rule not invoked) for यम् (yam) in upayamane sense',
    sutra: '1.2.16',
    optional: true,
    meaning: 'upayamane',
    root: cleanRoot,
    affix: cleanAffix
  };
}

export default sutra1216;
