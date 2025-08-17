/**
 * Sutra 1.4.17: स्वादिष्वसर्वनामस्थाने (svādiṣvasarvanāmasthāne)
 * "When the affixes beginning with सु and ending in कप् follow, not being सर्वनामस्थान, then that which precedes is called पद।"
 * 
 * RULE TYPE: saṃjñā (technical term assignment)
 * SCOPE: पद designation for stems before सु-series affixes that are not सर्वनामस्थान
 * CONDITIONS: Affix is from सु to कप् series AND not a सर्वनामस्थान affix
 * ASSIGNMENT: Assigns पद saṃjñā to the preceding stem
 * 
 * @fileoverview Implementation of Panini's Sutra 1.4.17
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * सु-series affixes (4.1.2) that can trigger पद designation
 */
const SU_SERIES_AFFIXES = [
  // Nominal endings (सुप्)
  'सु', 'औ', 'जस्',     // Nominative
  'अम्', 'औट्', 'शस्',   // Accusative  
  'टा', 'भ्याम्', 'भिस्', // Instrumental
  'ङे', 'भ्याम्', 'भ्यस्', // Dative
  'ङसि', 'भ्याम्', 'भ्यस्', // Ablative
  'ङस्', 'ओस्', 'आम्',   // Genitive
  'ङि', 'ओस्', 'सुप्',   // Locative
  'सुप्',                 // Vocative (same as nom.)
  
  // Secondary nominal suffixes up to कप्
  'क', 'कप्', 'ख', 'खल्',
  'ग', 'घ', 'ङ', 'च', 'छ'
];

/**
 * सर्वनामस्थान affixes (1.1.43) that do NOT trigger पद designation
 * Note: सु, औ, etc. are normally सु-series, only सर्वनामस्थान in specific contexts
 */
const SARVANAMASTHAANA_AFFIXES = [
  'स्य',      // Genitive singular (pronomial)
  'स्मिन्',    // Locative singular (pronomial)  
  'स्मात्',    // Ablative singular (pronomial)
  'स्मै',     // Dative singular (pronomial)
  'एषाम्',    // Genitive plural (pronomial)
  'एषु'      // Locative plural (pronomial)
];

/**
 * Implements Sutra 1.4.17: स्वादिष्वसर्वनामस्थाने
 * Assigns पद saṃjñā to stems before सु-series affixes that are not सर्वनामस्थान
 * 
 * @param {string} stem - The Sanskrit stem
 * @param {Object} context - Grammatical context
 * @param {string} context.affix - The following affix
 * @param {boolean} [context.isSarvanamasthaana] - Whether affix is सर्वनामस्थान
 * @param {string} [context.script] - Script type override
 * @returns {Object} Analysis result with पद designation
 */
export function sutra1417(stem, context = {}) {
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

  // Check if affix is in सु-series
  const isSuSeries = checkSuSeries(context.affix);
  
  // Check if affix is सर्वनामस्थान
  const isSarvanamasthaana = context.isSarvanamasthaana !== undefined 
                            ? context.isSarvanamasthaana
                            : checkSarvanamasthaana(context.affix);

  // Apply the rule: सु-series AND NOT सर्वनामस्थान
  const applies = isSuSeries && !isSarvanamasthaana;
  
  return {
    applies,
    stem,
    script,
    affix: context.affix,
    saṃjñā: applies ? 'पद' : null,
    sanjna: applies ? 'pada' : null, // backward compatibility
    rule: '1.4.17',
    reason: applies 
      ? `Stem "${stem}" gets पद saṃjñā because affix "${context.affix}" is सु-series but not सर्वनामस्थान`
      : `Affix "${context.affix}" is ${!isSuSeries ? 'not सु-series' : ''} ${isSarvanamasthaana ? 'or is सर्वनामस्थान' : ''}`,
    confidence: applies ? 0.9 : 0,
    isSuSeries,
    isSarvanamasthaana,
    meta: true,
    isMeta: true // backward compatibility
  };
}

/**
 * Checks if affix belongs to सु-series (4.1.2 onwards)
 * @param {string} affix - The affix to check
 * @returns {boolean} True if it's a सु-series affix
 */
function checkSuSeries(affix) {
  const normalizedAffix = affix.trim().toLowerCase();
  
  return SU_SERIES_AFFIXES.some(suAffix => {
    const devanagariForm = suAffix.toLowerCase();
    const iastForm = convertToIAST(suAffix).toLowerCase();
    
    return normalizedAffix === devanagariForm ||
           normalizedAffix === iastForm;
  });
}

/**
 * Checks if affix is सर्वनामस्थान (1.1.43)
 * @param {string} affix - The affix to check
 * @returns {boolean} True if it's सर्वनामस्थान
 */
function checkSarvanamasthaana(affix) {
  const normalizedAffix = affix.trim().toLowerCase();
  
  return SARVANAMASTHAANA_AFFIXES.some(sarvAffix => {
    const devanagariForm = sarvAffix.toLowerCase();
    const iastForm = convertToIAST(sarvAffix).toLowerCase();
    
    return normalizedAffix === devanagariForm ||
           normalizedAffix === iastForm;
  });
}

/**
 * Converts Devanagari to IAST for comparison
 * @param {string} text - Devanagari text
 * @returns {string} IAST equivalent
 */
function convertToIAST(text) {
  return text
    // Handle multi-character combinations first (longest matches first)
    .replace(/भ्याम्/g, 'bhyām')
    .replace(/भ्यस्/g, 'bhyas')
    .replace(/भिस्/g, 'bhis')
    .replace(/जस्/g, 'jas')
    .replace(/औट्/g, 'auṭ')
    .replace(/शस्/g, 'śas')
    .replace(/ङसि/g, 'ṅasi')
    .replace(/ङस्/g, 'ṅas')
    .replace(/ओस्/g, 'os')
    .replace(/आम्/g, 'ām')
    .replace(/सुप्/g, 'sup')
    .replace(/कप्/g, 'kap')
    .replace(/खल्/g, 'khal')
    // Single character and simple combinations
    .replace(/सु/g, 'su')
    .replace(/स्/g, 's')
    .replace(/औ/g, 'au')
    .replace(/अम्/g, 'am')
    .replace(/टा/g, 'ṭā')
    .replace(/ङे/g, 'ṅe')
    .replace(/ङि/g, 'ṅi')
    .replace(/क/g, 'ka')
    .replace(/ख/g, 'kha')
    .replace(/ग/g, 'ga')
    .replace(/घ/g, 'gha')
    .replace(/ङ/g, 'ṅa')
    .replace(/च/g, 'ca')
    .replace(/छ/g, 'cha')
    .replace(/्/g, '');
}

/**
 * Backward compatibility wrapper
 * @param {string} stem - Sanskrit stem
 * @param {Object} context - Context object
 * @returns {Object} Result in legacy format
 */
export function applySutra(stem, context = {}) {
  const result = sutra1417(stem, context);
  return {
    ...result,
    meta: result.meta || result.isMeta,
    sanjna: result.sanjna || (result.saṃjñā === 'पद' ? 'pada' : null)
  };
}

// Export main function as default
export default sutra1417;
