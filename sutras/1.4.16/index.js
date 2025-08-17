/**
 * Sutra 1.4.16: सिति च (siti ca)
 * "When an affix having an indicatory स् follows then that which precedes it is called पद।"
 * 
 * RULE TYPE: saṃjñā (technical term assignment)
 * SCOPE: पद designation for stems before affixes with indicatory स्
 * CONDITIONS: Affix has indicatory marker स् (sIT)
 * ASSIGNMENT: Assigns पद saṃjñā to the preceding stem
 * 
 * @fileoverview Implementation of Panini's Sutra 1.4.16
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Common affixes with indicatory स् (sIT marker)
 */
const SIT_AFFIXES = [
  // Primary suffixes with स् marker
  'स्',      // Basic स् marker
  'सि',     // सि suffix
  'सित्',   // सित् suffix
  'स्य',    // स्य suffix (future)
  'स्यत्',  // स्यत् suffix
  'सन्',    // सन् (desiderative)
  'स्न',    // स्न suffix
  'स्नु',   // स्नु suffix
  'स्व',    // स्व suffix
  'स्था',   // स्था suffix
  'स्तृ',   // स्तृ suffix
];

/**
 * Implements Sutra 1.4.16: सिति च
 * Assigns पद saṃjñā to stems when followed by affixes with indicatory स्
 * 
 * @param {string} stem - The Sanskrit stem
 * @param {Object} context - Grammatical context
 * @param {string} context.affix - The following affix with स् indicator
 * @param {string} [context.script] - Script type override
 * @returns {Object} Analysis result with पद designation
 */
export function sutra1416(stem, context = {}) {
  // Input validation
  if (!stem || typeof stem !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: stem must be a non-empty string',
      confidence: 0
    };
  }

  if (!context.affix || typeof context.affix !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: context.affix must be specified',
      confidence: 0
    };
  }

  // Detect and validate script
  const script = context.script || detectScript(stem);
  const isValidStem = validateSanskritWord(stem);
  
  if (!isValidStem.isValid) {
    return {
      applies: false,
      reason: `Invalid Sanskrit stem: ${isValidStem.reason}`,
      confidence: 0
    };
  }

  // Check if affix has indicatory स् (is sIT)
  const hasSitMarker = checkSitMarker(context.affix, script);

  // Apply the rule
  const applies = hasSitMarker;
  
  return {
    applies,
    stem,
    script,
    affix: context.affix,
    saṃjñā: applies ? 'पद' : null,
    sanjna: applies ? 'pada' : null, // backward compatibility
    rule: '1.4.16',
    reason: applies 
      ? `Stem "${stem}" gets पद saṃjñā because affix "${context.affix}" has indicatory स् (sIT)`
      : `Affix "${context.affix}" does not have indicatory स् marker`,
    confidence: applies ? 0.95 : 0,
    hasSitMarker,
    meta: true,
    isMeta: true // backward compatibility
  };
}

/**
 * Checks if affix has indicatory स् marker (sIT)
 * @param {string} affix - The affix to check
 * @param {string} script - Script type
 * @returns {boolean} True if affix has स् marker
 */
function checkSitMarker(affix, script) {
  const normalizedAffix = affix.trim().toLowerCase();
  
  // Check direct match with known sIT affixes
  const directMatch = SIT_AFFIXES.some(sitAffix => {
    const devanagariForm = sitAffix;
    const iastForm = convertToIAST(sitAffix);
    
    return normalizedAffix === devanagariForm.toLowerCase() ||
           normalizedAffix === iastForm.toLowerCase();
  });
  
  if (directMatch) return true;
  
  // Check if affix contains स् marker
  if (script === 'Devanagari') {
    return affix.includes('स्') || affix.includes('स');
  } else {
    // IAST script
    return affix.includes('s') && !affix.includes('ś') && !affix.includes('ṣ');
  }
}

/**
 * Converts Devanagari to IAST for comparison
 * @param {string} text - Devanagari text
 * @returns {string} IAST equivalent
 */
function convertToIAST(text) {
  return text
    .replace(/स्/g, 's')
    .replace(/स/g, 'sa')
    .replace(/्/g, '')
    .replace(/य/g, 'ya')
    .replace(/त्/g, 't')
    .replace(/त/g, 'ta')
    .replace(/न्/g, 'n')
    .replace(/न/g, 'na')
    .replace(/उ/g, 'u')
    .replace(/ृ/g, 'ṛ')
    .replace(/थ/g, 'tha')
    .replace(/व/g, 'va')
    .replace(/ा/g, 'ā');
}

/**
 * Backward compatibility wrapper
 * @param {string} stem - Sanskrit stem
 * @param {Object} context - Context object
 * @returns {Object} Result in legacy format
 */
export function applySutra(stem, context = {}) {
  const result = sutra1416(stem, context);
  return {
    ...result,
    meta: result.meta || result.isMeta,
    sanjna: result.sanjna || (result.saṃjñā === 'पद' ? 'pada' : null)
  };
}

// Export main function as default
export default sutra1416;
