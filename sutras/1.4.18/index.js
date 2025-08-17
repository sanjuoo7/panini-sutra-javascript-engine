/**
 * Sutra 1.4.18: यचि भम् (yaci bham)
 * "And when an affix with an initial य् or an initial vowel, being one of the affixes, beginning with सु and ending in क्, follows, not being सर्वनामस्थान, then what precedes, is called भ।"
 * 
 * RULE TYPE: saṃjñā (technical term assignment)
 * SCOPE: भम् designation for stems before यच्/vowel-initial affixes from सु-series
 * CONDITIONS: Affix starts with य् OR vowel AND is सु-series AND not सर्वनामस्थान
 * ASSIGNMENT: Assigns भम् saṃjñā to the preceding stem
 * 
 * @fileoverview Implementation of Panini's Sutra 1.4.18
 */

import { detectScript, validateSanskritWord, isVowel } from '../sanskrit-utils/index.js';

/**
 * सु-series affixes (सु to क्) that can trigger भम् designation
 */
const SU_SERIES_AFFIXES = [
  // Nominal endings
  'सु', 'औ', 'जस्',     // Nominative
  'अम्', 'औट्', 'शस्',   // Accusative  
  'टा', 'भ्याम्', 'भिस्', // Instrumental
  'ङे', 'भ्याम्', 'भ्यस्', // Dative
  'ङसि', 'भ्याम्', 'भ्यस्', // Ablative
  'ङस्', 'ओस्', 'आम्',   // Genitive
  'ङि', 'ओस्', 'सुप्',   // Locative
  
  // Affixes up to क्
  'क', 'ख', 'ग', 'घ', 'ङ'
];

/**
 * य-initial affixes
 */
const YA_INITIAL_AFFIXES = [
  'य', 'या', 'यत्', 'यस्', 'यु', 'यूस्'
];

/**
 * Vowel-initial affixes from सु-series
 */
const VOWEL_INITIAL_SU_AFFIXES = [
  'अम्',   // Accusative singular
  'औ',    // Nominative/accusative dual  
  'औट्',  // Accusative dual
  'आम्',  // Genitive plural
  'ओस्',  // Genitive/locative dual
  'ए',    // Dative singular (ङे without nasal)
  'इ'     // Locative singular (ङि without nasal)
];

/**
 * Implements Sutra 1.4.18: यचि भम्
 * Assigns भम् saṃjñā to stems before y-initial or vowel-initial सु-series affixes
 * 
 * @param {string} stem - The Sanskrit stem
 * @param {Object} context - Grammatical context
 * @param {string} context.affix - The following affix
 * @param {boolean} [context.isSarvanamasthaana] - Whether affix is सर्वनामस्थान
 * @param {string} [context.script] - Script type override
 * @returns {Object} Analysis result with भम् designation
 */
export function sutra1418(stem, context = {}) {
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
  const affixScript = detectScript(context.affix);
  const isValidStem = validateSanskritWord(stem);
  
  if (!isValidStem.isValid) {
    return {
      applies: false,
      reason: `Invalid Sanskrit stem: ${isValidStem.reason}`,
      confidence: 0
    };
  }

  // Check conditions for भम् assignment (use affix script for affix checks)
  const isSuSeries = checkSuSeries(context.affix);
  const isYaInitial = checkYaInitial(context.affix, affixScript);
  const isVowelInitial = checkVowelInitial(context.affix, affixScript);
  const isSarvanamasthaana = context.isSarvanamasthaana || false;

  // Apply the rule: (य-initial OR vowel-initial from सु-series) AND NOT सर्वनामस्थान
  const applies = (isYaInitial || (isVowelInitial && isSuSeries)) && !isSarvanamasthaana;
  
  return {
    applies,
    stem,
    script,
    affix: context.affix,
    saṃjñā: applies ? 'भम्' : null,
    sanjna: applies ? 'bham' : null, // backward compatibility
    rule: '1.4.18',
    reason: applies 
      ? `Stem "${stem}" gets भम् saṃjñā because affix "${context.affix}" is ${isYaInitial ? 'य-initial' : 'vowel-initial सु-series'} affix (not सर्वनामस्थान)`
      : `Affix "${context.affix}" is ${isSarvanamasthaana ? 'सर्वनामस्थान' : ''} ${!isYaInitial && !(isVowelInitial && isSuSeries) ? 'or not य/vowel-initial' : ''}`,
    confidence: applies ? 0.9 : 0,
    isSuSeries,
    isYaInitial,
    isVowelInitial,
    isSarvanamasthaana,
    meta: true,
    isMeta: true // backward compatibility
  };
}

/**
 * Checks if affix belongs to सु-series
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
 * Checks if affix starts with य्
 * @param {string} affix - The affix to check
 * @param {string} script - Script type
 * @returns {boolean} True if it starts with य्
 */
function checkYaInitial(affix, script) {
  if (script === 'Devanagari') {
    return affix.startsWith('य');
  } else {
    // IAST script
    return affix.startsWith('y');
  }
}

/**
 * Checks if affix starts with a vowel and is from सु-series
 * @param {string} affix - The affix to check
 * @param {string} script - Script type
 * @returns {boolean} True if vowel-initial सु-series affix
 */
function checkVowelInitial(affix, script) {
  const firstChar = affix.charAt(0);
  const startsWithVowel = isVowel(firstChar);
  
  if (!startsWithVowel) return false;
  
  // Check if it's a known vowel-initial सु-series affix
  const normalizedAffix = affix.trim().toLowerCase();
  
  return VOWEL_INITIAL_SU_AFFIXES.some(vowelAffix => {
    const devanagariForm = vowelAffix.toLowerCase();
    const iastForm = convertToIAST(vowelAffix).toLowerCase();
    
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
    .replace(/सु/g, 'su')
    .replace(/स्/g, 's')
    .replace(/औ/g, 'au')
    .replace(/जस्/g, 'jas')
    .replace(/अम्/g, 'am')
    .replace(/औट्/g, 'auṭ')
    .replace(/शस्/g, 'śas')
    .replace(/टा/g, 'ṭā')
    .replace(/भ्याम्/g, 'bhyām')
    .replace(/भिस्/g, 'bhis')
    .replace(/ङे/g, 'ṅe')
    .replace(/भ्यस्/g, 'bhyas')
    .replace(/ङसि/g, 'ṅasi')
    .replace(/ङस्/g, 'ṅas')
    .replace(/ओस्/g, 'os')
    .replace(/आम्/g, 'ām')
    .replace(/ङि/g, 'ṅi')
    .replace(/सुप्/g, 'sup')
    .replace(/य/g, 'ya')
    .replace(/या/g, 'yā')
    .replace(/यत्/g, 'yat')
    .replace(/यस्/g, 'yas')
    .replace(/यु/g, 'yu')
    .replace(/यूस्/g, 'yūs')
    .replace(/ए/g, 'e')
    .replace(/इ/g, 'i')
    .replace(/्/g, '');
}

/**
 * Backward compatibility wrapper
 * @param {string} stem - Sanskrit stem
 * @param {Object} context - Context object
 * @returns {Object} Result in legacy format
 */
export function applySutra(stem, context = {}) {
  const result = sutra1418(stem, context);
  return {
    ...result,
    meta: result.meta || result.isMeta,
    sanjna: result.sanjna || (result.saṃjñā === 'भम्' ? 'bham' : null)
  };
}

// Export main function as default
export default sutra1418;
