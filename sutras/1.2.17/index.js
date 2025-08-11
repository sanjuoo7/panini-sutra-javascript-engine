/**
 * Sutra 1.2.17: स्था घ्वोरिच्च (sthā ghvoricca)
 * 
 * Sanskrit: स्था घ्वोरिच्च
 * IAST: sthā ghvoricca
 * Translation: Of स्था (sthā) and घु class roots, also with सिच् (sic)
 * 
 * Rule: The स्था (sthā) root and roots of the घु class get kit designation
 * when followed by the सिच् (sic) affix.
 * 
 * Dependencies: Sutra 1.2.8 (कित्त्वा सन्), extends 1.2.15 (यमो यज्ञे) pattern
 */

import { 
  detectScript, 
  validateSanskritWord, 
  tokenizePhonemes,
  isSthaRoot,
  isGhuClassRoot,
  isSicAffix
} from '../sanskrit-utils/index.js';

/**
 * Checks if the kit designation applies according to Sutra 1.2.17
 * @param {string} root - The verbal root
 * @param {string} affix - The affix being added
 * @param {Object} context - Context object (for future extensibility)
 * @returns {Object} Analysis result with kit designation and rule application
 */
export function sutra1217(root, affix, context = {}) {
  // Input validation
  if (!root || !affix || typeof root !== 'string' || typeof affix !== 'string') {
    return {
      applies: false,
      kit: false,
      reason: 'Invalid input: root and affix must be non-empty strings',
      sutra: '1.2.17'
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
      sutra: '1.2.17'
    };
  }

  // Check if affix is सिच् (sic)
  if (!isSicAffix(cleanAffix)) {
    return {
      applies: false,
      kit: false,
      reason: 'Rule applies only to सिच् (sic) affix',
      sutra: '1.2.17'
    };
  }

  // Check if root is स्था (sthā) 
  const isStha = isSthaRoot(cleanRoot);
  
  // Check if root is from घु class
  const isGhuClass = isGhuClassRoot(cleanRoot);

  if (!isStha && !isGhuClass) {
    return {
      applies: false,
      kit: false,
      reason: 'Rule applies only to स्था (sthā) or घु class roots',
      sutra: '1.2.17'
    };
  }

  // Determine the specific root type for detailed response
  let rootType = '';
  if (isStha) {
    rootType = 'स्था (sthā) root';
  } else if (isGhuClass) {
    rootType = 'घु class root';
  }

  return {
    applies: true,
    kit: true,
    reason: `Kit designation applied for ${rootType} with सिच् (sic) affix`,
    sutra: '1.2.17',
    rootType: isStha ? 'sthā' : 'ghu-class',
    root: cleanRoot,
    affix: cleanAffix
  };
}

export default sutra1217;
