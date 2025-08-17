/**
 * Sutra 1.4.15: नः क्ये (naḥ kye)
 * "The word-form ending in न्, is called पद when क्य follows."
 * 
 * RULE TYPE: saṃjñā (technical term assignment)
 * SCOPE: पद designation for न्-ending words before क्य-class affixes
 * CONDITIONS: Word ends in न् consonant AND क्य-type affix follows
 * ASSIGNMENT: Assigns पद saṃjñā
 * 
 * @fileoverview Implementation of Panini's Sutra 1.4.15
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * The क्य-class affixes that trigger पद designation per sutra 1.4.15
 */
const KYA_AFFIXES = [
  'क्यच्',   // -kya suffix for action nouns
  'क्यङ्',   // -kya suffix with nasal 
  'क्यष्'    // -kya suffix with palatal
];

/**
 * Implements Sutra 1.4.15: नः क्ये
 * Assigns पद saṃjñā to words ending in न् when क्य-class affixes follow
 * 
 * @param {string} word - The Sanskrit word (stem)
 * @param {Object} context - Grammatical context
 * @param {string} context.affix - The following affix
 * @param {string} [context.script] - Script type override
 * @returns {Object} Analysis result with पद designation
 */
export function sutra1415(word, context = {}) {
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

  // Check if word ends in न् (consonant न)
  const endsInNa = checkEndsInNa(word, script);
  
  // Check if affix is क्य-class
  const isKyaAffix = checkKyaAffix(context.affix);

  // Apply the rule
  const applies = endsInNa && isKyaAffix;
  
  return {
    applies,
    word,
    script,
    affix: context.affix,
    saṃjñā: applies ? 'पद' : null,
    sanjna: applies ? 'pada' : null, // backward compatibility
    rule: '1.4.15',
    reason: applies 
      ? `Word "${word}" ends in न् and affix "${context.affix}" is क्य-class, hence assigned पद saṃjñā`
      : `Word "${word}" ${!endsInNa ? 'does not end in न्' : ''} ${!isKyaAffix ? `or affix "${context.affix}" is not क्य-class` : ''}`,
    confidence: applies ? 0.95 : 0,
    endsInNa,
    isKyaAffix,
    meta: true,
    isMeta: true // backward compatibility
  };
}

/**
 * Checks if word ends in न् consonant
 * @param {string} word - Sanskrit word
 * @param {string} script - Script type
 * @returns {boolean} True if ends in न्
 */
function checkEndsInNa(word, script) {
  if (script === 'Devanagari') {
    return word.endsWith('न्');
  } else {
    // IAST script
    return word.endsWith('n');
  }
}

/**
 * Checks if affix belongs to क्य-class
 * @param {string} affix - The affix to check
 * @returns {boolean} True if it's a क्य-class affix
 */
function checkKyaAffix(affix) {
  // Normalize affix for comparison
  const normalizedAffix = affix.trim().toLowerCase();
  
  return KYA_AFFIXES.some(kyaAffix => {
    const devanagariForm = kyaAffix.toLowerCase();
    
    // Multiple IAST variations for each affix
    let iastForms = [];
    if (kyaAffix === 'क्यच्') {
      iastForms = ['kyac', 'kyc'];
    } else if (kyaAffix === 'क्यङ्') {
      iastForms = ['kyaṅ', 'kyṅ', 'kyang'];
    } else if (kyaAffix === 'क्यष्') {
      iastForms = ['kyaṣ', 'kyṣ', 'kyash'];
    }
    
    return normalizedAffix === devanagariForm || 
           iastForms.some(form => normalizedAffix === form);
  });
}

/**
 * Backward compatibility wrapper
 * @param {string} word - Sanskrit word
 * @param {Object} context - Context object
 * @returns {Object} Result in legacy format
 */
export function applySutra(word, context = {}) {
  const result = sutra1415(word, context);
  return {
    ...result,
    meta: result.meta || result.isMeta,
    sanjna: result.sanjna || (result.saṃjñā === 'पद' ? 'pada' : null)
  };
}

// Export main function as default
export default sutra1415;
