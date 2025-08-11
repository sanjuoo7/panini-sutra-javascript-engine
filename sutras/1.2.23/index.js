/**
 * Sutra 1.2.23: नोपधात्थफान्ताद्वा
 * 
 * Sanskrit: नोपधात्थफान्ताद्वा
 * IAST: nopadhāt-tha-pha-antād-vā
 * Translation: Optionally [कित् designation is prevented] for सेट् क्त्वा affix 
 * after roots ending in थ् or फ् that have न् as उपधा (penultimate)
 * 
 * This sutra provides an optional अतिदेश (exception) rule that prevents
 * कित् designation for सेट् क्त्वा affix after specific roots.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { hasSetAugment, isKtvAffix } from '../sanskrit-utils/kit-analysis.js';

/**
 * Checks if a root ends in थ् (tha) or फ् (pha)
 * @param {string} root - The root to check
 * @returns {boolean} True if root ends in थ् or फ्
 */
export function isThaPhaEnding(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const normalized = root.trim();
  const script = detectScript(normalized);
  
  if (script === 'Devanagari') {
    return normalized.endsWith('थ्') || 
           normalized.endsWith('फ्') ||
           normalized.endsWith('प्') ||  // Add प् for roots like स्वप्, तप्
           normalized.endsWith('थ') ||
           normalized.endsWith('फ') ||
           normalized.endsWith('प');    // Add प for roots like स्वप, तप
  } else {
    // IAST
    return normalized.endsWith('th') || 
           normalized.endsWith('ph') ||
           normalized.endsWith('p');  // स्वप्, तप् etc.
  }
}

/**
 * Checks if a root has न् (na) as उपधा (penultimate phoneme)
 * @param {string} root - The root to check
 * @returns {boolean} True if न् is the penultimate phoneme
 */
export function hasNaUpadha(root) {
  if (!root || typeof root !== 'string' || root.length < 3) {
    return false;
  }

  const normalized = root.trim();
  const script = detectScript(normalized);
  
  if (script === 'Devanagari') {
    // For Devanagari, we need to check for न् as penultimate
    // Examples: मन्थ् (ma-n-th), शन्थ् (śa-n-th), बन्ध् (ba-n-dh)
    
    let working = normalized;
    
    // Remove final halanta if present
    if (working.endsWith('्')) {
      working = working.slice(0, -1);
    }
    
    // Now we need to check if the penultimate consonant is न्
    // Look for न् or न in penultimate position
    return working.includes('न्') || (working.includes('न') && !working.endsWith('न'));
    
  } else {
    // IAST - check for 'n' in penultimate position
    let working = normalized;
    
    // Remove common final consonants to expose penultimate
    if (working.endsWith('th')) {
      working = working.slice(0, -2);
    } else if (working.endsWith('dh') || working.endsWith('ph')) {
      working = working.slice(0, -2);
    } else if (working.endsWith('p')) {
      working = working.slice(0, -1);
    } else if (working.length > 0) {
      working = working.slice(0, -1);
    }
    
    return working.endsWith('n');
  }
}

/**
 * Checks if a root qualifies under sutra 1.2.23 conditions
 * (has न् as उपधा and ends in थ्/फ्)
 * @param {string} root - The root to check
 * @returns {boolean} True if root qualifies for the rule
 */
export function isNaUpadhaThaPhaRoot(root) {
  return hasNaUpadha(root) && isThaPhaEnding(root);
}

/**
 * Checks if an affix is सेट् क्त्वा affix
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} True if it's सेट् क्त्वा affix
 */
export function isSetKtva(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  // First check if it's क्त्वा affix at all
  if (!isKtvAffix(affix)) {
    return false;
  }

  // Check for सेट् augment using the correct parameter order
  if (hasSetAugment(affix, context)) {
    return true;
  }

  // The hasSetAugment function already checks for patterns, so we don't need duplicate logic
  return false;
}

/**
 * Gets list of roots that qualify for this rule
 * @param {string} script - Target script ('devanagari' or 'iast')
 * @returns {Array<string>} List of qualifying roots
 */
export function getNaUpadhaThaPhaRoots(script = 'iast') {
  const roots = {
    devanagari: [
      'मन्थ्',  // to churn, agitate
      'शन्थ्',  // to go, move
      'कन्थ्',  // to tear, hurt  
      'बन्ध्',  // to bind (note: ध् can become थ्)
      'स्वप्',  // to sleep (न् upadha in some forms)
      'तप्',   // to heat (न् upadha in some forms)
    ],
    iast: [
      'manth',  // to churn, agitate  
      'śanth',  // to go, move
      'kanth',  // to tear, hurt
      'bandh',  // to bind
      'svap',   // to sleep
      'tap',    // to heat
    ]
  };

  return roots[script === 'Devanagari' || script === 'devanagari' ? 'devanagari' : 'iast'];
}

/**
 * Gets example forms where this rule applies
 * @returns {Object} Examples in different scripts
 */
export function getSutra1223Examples() {
  return {
    devanagari: [
      'मन्थित्वा',  // having churned (मन्थ् + इ + त्वा)
      'शन्थित्वा',  // having moved (शन्थ् + इ + त्वा)
      'कन्थित्वा',  // having hurt (कन्थ् + इ + त्वा)
    ],
    iast: [
      'manthitvā',  // having churned
      'śanthitvā',  // having moved  
      'kanthitvā',  // having hurt
    ],
    analysis: [
      'Root has न् as उपधा and ends in थ्/फ्',
      'क्त्वा affix takes सेट् augment',
      'Rule optionally prevents कित् designation',
      'Without prevention, normal कित् rules would apply'
    ]
  };
}

/**
 * Quick check if कित् is optionally prevented by this sutra
 * @param {string} root - The root
 * @param {string} affix - The affix  
 * @param {Object} context - Grammatical context
 * @returns {boolean} True if this sutra can prevent कित्
 */
export function optionallyPreventsKitBySutra1223(root, affix, context = {}) {
  return isNaUpadhaThaPhaRoot(root) && isSetKtva(affix, context);
}

/**
 * Main function implementing Sutra 1.2.23
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Grammatical context
 * @returns {Object} Analysis result
 */
export function sutra1223(word, context = {}) {
  const result = {
    applicable: false,
    optionallyPreventsKit: false,
    explanation: '',
    sutra: '1.2.23',
    rule: 'नोपधात्थफान्ताद्वा',
    translation: 'Optionally [कित् is prevented] from न्-उपधा roots ending in थ्/फ् [with सेट् क्त्वा]',
    root: context.root || '',
    affix: context.affix || '',
    rootType: '',
    affixType: '',
    optionality: 'vā (optional rule)'
  };

  try {
    // Input validation
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      result.explanation = 'Invalid Sanskrit input provided';
      return result;
    }

    // Extract context
    const root = context.root || '';
    const affix = context.affix || '';
    
    if (context.debug) {
      result.debug = [];
      result.debug.push('[1.2.23] Analyzing न्-उपधा + थ्/फ्-अन्त root with सेट् क्त्वा');
      result.debug.push(`[1.2.23] Root: "${root}", Affix: "${affix}"`);
    }

    // Check if root qualifies (न्-उपधा + थ्/फ्-अन्त)
    if (!isNaUpadhaThaPhaRoot(root)) {
      result.explanation = 'Rule applies only to roots with न् as उपधा ending in थ्/फ्';
      if (context.debug) {
        result.debug.push(`[1.2.23] Root "${root}" does not qualify: न्-उपधा=${hasNaUpadha(root)}, थ्/फ्-अन्त=${isThaPhaEnding(root)}`);
      }
      return result;
    }

    // Check if affix is सेट् क्त्वा
    if (!isSetKtva(affix, context)) {
      result.explanation = 'Rule requires सेट् क्त्वा affix';
      if (context.debug) {
        result.debug.push(`[1.2.23] Affix "${affix}" is not सेट् क्त्वा`);
      }
      return result;
    }

    // Rule applies - optional prevention
    result.applicable = true;
    result.optionallyPreventsKit = true;
    result.rootType = 'न्-उपधा + थ्/फ्-अन्त';
    result.affixType = 'सेट् क्त्वा';
    result.explanation = `सेट् क्त्वा affix optionally (वा) does NOT receive कित् designation after न्-उपधा root "${root}" ending in थ्/फ्`;

    if (context.debug) {
      result.debug.push(`[1.2.23] ✓ Rule applies - optional कित् prevention`);
      result.debug.push(`[1.2.23] Root type: ${result.rootType}`);
      result.debug.push(`[1.2.23] Affix type: ${result.affixType}`);
    }

  } catch (error) {
    result.explanation = `Error in sutra analysis: ${error.message}`;
    if (context.debug) {
      result.debug = result.debug || [];
      result.debug.push(`[1.2.23] Error: ${error.message}`);
    }
  }

  return result;
}

// Export all functions
export default sutra1223;
