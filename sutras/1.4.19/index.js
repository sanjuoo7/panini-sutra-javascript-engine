/**
 * Sutra 1.4.19: तसौ मत्वर्थे (tasau matvarthe)
 * "The word-form ending in त् or in स् is called भ when an affix with the force of मतुप् 'whose is it' or 'in whom it is' follows."
 * 
 * RULE TYPE: saṃjñā (technical term assignment)
 * SCOPE: भम् designation for words ending in त्/स् before मतुप्-type affixes
 * CONDITIONS: Word ends in त् OR स् AND affix has मत्व meaning (possessive)
 * ASSIGNMENT: Assigns भम् saṃjñā to the word
 * 
 * @fileoverview Implementation of Panini's Sutra 1.4.19
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * मतुप्-type affixes that express possessive meaning
 */
const MATUPARTHA_AFFIXES = [
  'मत्',     // मतुप् affix
  'मान्',    // मतुप् with lengthening
  'वत्',     // वतुप् affix (possessive)
  'वान्',    // वतुप् with lengthening
  'इन्',     // इनि affix (possessive)
  'वर',      // वर suffix (possessive agent)
  'इत',      // इत suffix (possessive)
  'मय',      // मय suffix (made of)
  'मयी'      // मयी feminine possessive
];

/**
 * Implements Sutra 1.4.19: तसौ मत्वर्थे
 * Assigns भम् saṃjñā to words ending in त्/स् before मतुप्-type affixes
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Grammatical context
 * @param {string} context.affix - The following affix
 * @param {string} [context.meaning] - Semantic context (possessive meaning)
 * @param {string} [context.script] - Script type override
 * @returns {Object} Analysis result with भम् designation
 */
export function sutra1419(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: word must be a non-empty string',
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
  const script = context.script || detectScript(word);
  const isValidWord = validateSanskritWord(word);
  
  if (!isValidWord.isValid) {
    return {
      applies: false,
      reason: `Invalid Sanskrit word: ${isValidWord.reason}`,
      confidence: 0
    };
  }

  // Check if word ends in त् or स्
  const endsInTa = checkEndsInTa(word, script);
  const endsInSa = checkEndsInSa(word, script);
  
  // Check if affix has मत्व meaning (possessive)
  const hasMatvarthaMeaning = checkMatvarthaMeaning(context.affix, context.meaning);

  // Apply the rule: (ends in त् OR स्) AND has मत्व meaning
  const applies = (endsInTa || endsInSa) && hasMatvarthaMeaning;
  
  return {
    applies,
    word,
    script,
    affix: context.affix,
    saṃjñā: applies ? 'भम्' : null,
    sanjna: applies ? 'bham' : null, // backward compatibility
    rule: '1.4.19',
    reason: applies 
      ? `Word "${word}" gets भम् saṃjñā because it ends in ${endsInTa ? 'त्' : 'स्'} and affix "${context.affix}" has मत्व meaning`
      : `Word "${word}" ${!endsInTa && !endsInSa ? 'does not end in त्/स्' : ''} ${!hasMatvarthaMeaning ? `or affix "${context.affix}" does not have मत्व meaning` : ''}`,
    confidence: applies ? 0.9 : 0,
    endsInTa,
    endsInSa,
    hasMatvarthaMeaning,
    meta: true,
    isMeta: true // backward compatibility
  };
}

/**
 * Checks if word ends in त् consonant
 * @param {string} word - Sanskrit word
 * @param {string} script - Script type
 * @returns {boolean} True if ends in त्
 */
function checkEndsInTa(word, script) {
  if (script === 'Devanagari') {
    return word.endsWith('त्');
  } else {
    // IAST script
    return word.endsWith('t');
  }
}

/**
 * Checks if word ends in स् consonant
 * @param {string} word - Sanskrit word
 * @param {string} script - Script type
 * @returns {boolean} True if ends in स्
 */
function checkEndsInSa(word, script) {
  if (script === 'Devanagari') {
    return word.endsWith('स्');
  } else {
    // IAST script - need to distinguish स् from श् (ś) and ष् (ṣ)
    return word.endsWith('s') && 
           !word.endsWith('ś') && 
           !word.endsWith('ṣ');
  }
}

/**
 * Checks if affix has मत्व meaning (possessive/attributive)
 * @param {string} affix - The affix to check
 * @param {string} [meaning] - Explicit meaning context
 * @returns {boolean} True if has मत्व meaning
 */
function checkMatvarthaMeaning(affix, meaning) {
  // If meaning is explicitly provided
  if (meaning) {
    const possessiveMeanings = ['possessive', 'attributive', 'having', 'with', 'मत्व', 'मतुप्', 'matva', 'matup'];
    return possessiveMeanings.some(m => meaning.toLowerCase().includes(m.toLowerCase()));
  }
  
  // Check if affix is a known मतुप्-type affix
  const normalizedAffix = affix.trim().toLowerCase();
  
  return MATUPARTHA_AFFIXES.some(matAffix => {
    const devanagariForm = matAffix.toLowerCase();
    const iastForm = convertToIAST(matAffix).toLowerCase();
    
    return normalizedAffix === devanagariForm ||
           normalizedAffix === iastForm ||
           normalizedAffix.includes(devanagariForm) ||
           normalizedAffix.includes(iastForm);
  });
}

/**
 * Converts Devanagari to IAST for comparison
 * @param {string} text - Devanagari text
 * @returns {string} IAST equivalent
 */
function convertToIAST(text) {
  return text
    .replace(/मत्/g, 'mat')
    .replace(/मान्/g, 'mān')
    .replace(/वत्/g, 'vat')
    .replace(/वान्/g, 'vān')
    .replace(/इन्/g, 'in')
    .replace(/वर/g, 'vara')
    .replace(/इत/g, 'ita')
    .replace(/मय/g, 'maya')
    .replace(/मयी/g, 'mayī')
    .replace(/्/g, '');
}

/**
 * Backward compatibility wrapper
 * @param {string} word - Sanskrit word
 * @param {Object} context - Context object
 * @returns {Object} Result in legacy format
 */
export function applySutra(word, context = {}) {
  const result = sutra1419(word, context);
  return {
    ...result,
    meta: result.meta || result.isMeta,
    sanjna: result.sanjna || (result.saṃjñā === 'भम्' ? 'bham' : null)
  };
}

// Export main function as default
export default sutra1419;
