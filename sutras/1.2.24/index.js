/**
 * Sutra 1.2.24: वञ्चिलुञ्च्यृतश्च
 * 
 * Sanskrit: वञ्चिलुञ्च्यृतश्च
 * IAST: vañci-luñcy-ṛtaś-ca
 * Translation: And [कित् designation is optionally prevented] for सेट् क्त्वा affix 
 * after roots वञ्च् (to deceive), लुञ्च् (to pluck), and यृत् (to endeavor)
 * 
 * This sutra provides an optional अतिदेश (exception) rule that prevents
 * कित् designation for सेट् क्त्वा affix after specific roots.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { hasSetAugment, isKtvAffix } from '../sanskrit-utils/kit-analysis.js';

/**
 * Checks if a root is one of the specific roots: वञ्च्, लुञ्च्, यृत्
 * @param {string} root - The root to check
 * @returns {boolean} True if root is one of the specified roots
 */
export function isVanciLunciYritRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const normalized = root.trim();
  const script = detectScript(normalized);
  
  if (script === 'Devanagari') {
    // Check for all forms with/without halanta
    const devanagariRoots = [
      'वञ्च्', 'वञ्च', 'वच्', 'वञ्ज्', // वञ्च् and variants
      'लुञ्च्', 'लुञ्च', 'लुच्', 'लुञ्ज्', // लुञ्च् and variants  
      'यृत्', 'यृत', 'ऋत्', 'ऋत' // यृत् and variants
    ];
    return devanagariRoots.includes(normalized);
  } else {
    // IAST
    const iastRoots = [
      'vañc', 'vac', 'vañj', // वञ्च् variants
      'luñc', 'luc', 'luñj', // लुञ्च् variants
      'yṛt', 'ṛt' // यृत् variants
    ];
    return iastRoots.includes(normalized);
  }
}

/**
 * Checks if a root is वञ्च् (to deceive, cheat)
 * @param {string} root - The root to check
 * @returns {boolean} True if root is वञ्च्
 */
export function isVanciRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const normalized = root.trim();
  const script = detectScript(normalized);
  
  if (script === 'Devanagari') {
    return ['वञ्च्', 'वञ्च', 'वच्', 'वञ्ज्'].includes(normalized);
  } else {
    return ['vañc', 'vac', 'vañj'].includes(normalized);
  }
}

/**
 * Checks if a root is लुञ्च् (to pluck, tear)
 * @param {string} root - The root to check
 * @returns {boolean} True if root is लुञ्च्
 */
export function isLunciRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const normalized = root.trim();
  const script = detectScript(normalized);
  
  if (script === 'Devanagari') {
    return ['लुञ्च्', 'लुञ्च', 'लुच्', 'लुञ्ज्'].includes(normalized);
  } else {
    return ['luñc', 'luc', 'luñj'].includes(normalized);
  }
}

/**
 * Checks if a root is यृत् (to endeavor, strive)
 * @param {string} root - The root to check
 * @returns {boolean} True if root is यृत्
 */
export function isYritRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const normalized = root.trim();
  const script = detectScript(normalized);
  
  if (script === 'Devanagari') {
    return ['यृत्', 'यृत', 'ऋत्', 'ऋत'].includes(normalized);
  } else {
    return ['yṛt', 'ṛt'].includes(normalized);
  }
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

  // The hasSetAugment function already handles pattern checking
  return false;
}

/**
 * Gets list of roots covered by this rule
 * @param {string} script - Target script ('devanagari' or 'iast')
 * @returns {Object} Object with categorized roots
 */
export function getVanciLunciYritRoots(script = 'iast') {
  const roots = {
    devanagari: {
      vanci: ['वञ्च्', 'वञ्च'],  // to deceive, cheat
      lunci: ['लुञ्च्', 'लुञ्च'],  // to pluck, tear
      yrit: ['यृत्', 'यृत']      // to endeavor, strive
    },
    iast: {
      vanci: ['vañc'],  // to deceive, cheat
      lunci: ['luñc'],  // to pluck, tear  
      yrit: ['yṛt']     // to endeavor, strive
    }
  };

  return roots[script === 'Devanagari' || script === 'devanagari' ? 'devanagari' : 'iast'];
}

/**
 * Gets example forms where this rule applies
 * @returns {Object} Examples in different scripts
 */
export function getSutra1224Examples() {
  return {
    devanagari: [
      'वञ्चित्वा',   // having deceived (वञ्च् + इ + त्वा)
      'लुञ्चित्वा',  // having plucked (लुञ्च् + इ + त्वा)
      'यृतित्वा',   // having endeavored (यृत् + इ + त्वा)
    ],
    iast: [
      'vañcitvā',   // having deceived
      'luñcitvā',   // having plucked  
      'yṛtitvā',    // having endeavored
    ],
    analysis: [
      'Specific roots: वञ्च्, लुञ्च्, यृत्',
      'क्त्वा affix takes सेट् augment', 
      'Rule optionally prevents कित् designation',
      'Continuation of 1.2.23 pattern with च (ca)'
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
export function optionallyPreventsKitBySutra1224(root, affix, context = {}) {
  return isVanciLunciYritRoot(root) && isSetKtva(affix, context);
}

/**
 * Main function implementing Sutra 1.2.24
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Grammatical context
 * @returns {Object} Analysis result
 */
export function sutra1224(word, context = {}) {
  const result = {
    applicable: false,
    optionallyPreventsKit: false,
    explanation: '',
    sutra: '1.2.24',
    rule: 'वञ्चिलुञ्च्यृतश्च',
    translation: 'And [कित् is optionally prevented] from वञ्च्/लुञ्च्/यृत् [with सेट् क्त्वा]',
    root: context.root || '',
    affix: context.affix || '',
    rootType: '',
    affixType: '',
    optionality: 'vā (optional rule)',
    continuation: 'च (continuation from 1.2.23)'
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
      result.debug.push('[1.2.24] Analyzing वञ्च्/लुञ्च्/यृत् root with सेट् क्त्वा');
      result.debug.push(`[1.2.24] Root: "${root}", Affix: "${affix}"`);
    }

    // Check if root is one of the specified roots
    if (!isVanciLunciYritRoot(root)) {
      result.explanation = 'Rule applies only to roots वञ्च्, लुञ्च्, or यृत्';
      if (context.debug) {
        result.debug.push(`[1.2.24] Root "${root}" is not वञ्च्/लुञ्च्/यृत्`);
        result.debug.push(`[1.2.24] वञ्च्: ${isVanciRoot(root)}, लुञ्च्: ${isLunciRoot(root)}, यृत्: ${isYritRoot(root)}`);
      }
      return result;
    }

    if (context.debug) {
      result.debug.push(`[1.2.24] Root type checks: वञ्च्: ${isVanciRoot(root)}, लुञ्च्: ${isLunciRoot(root)}, यृत्: ${isYritRoot(root)}`);
    }

    // Check if affix is सेट् क्त्वा
    if (!isSetKtva(affix, context)) {
      result.explanation = 'Rule requires सेट् क्त्वा affix';
      if (context.debug) {
        result.debug.push(`[1.2.24] Affix "${affix}" is not सेट् क्त्वा`);
      }
      return result;
    }

    // Determine specific root type
    let specificRootType = '';
    if (isVanciRoot(root)) {
      specificRootType = 'वञ्च् (to deceive)';
    } else if (isLunciRoot(root)) {
      specificRootType = 'लुञ्च् (to pluck)';
    } else if (isYritRoot(root)) {
      specificRootType = 'यृत् (to endeavor)';
    }

    // Rule applies - optional prevention
    result.applicable = true;
    result.optionallyPreventsKit = true;
    result.rootType = specificRootType;
    result.affixType = 'सेट् क्त्वा';
    result.explanation = `सेट् क्त्वा affix optionally (वा) does NOT receive कित् designation after ${specificRootType} root`;

    if (context.debug) {
      result.debug.push(`[1.2.24] ✓ Rule applies - optional कित् prevention`);
      result.debug.push(`[1.2.24] Root type: ${result.rootType}`);
      result.debug.push(`[1.2.24] Affix type: ${result.affixType}`);
      result.debug.push(`[1.2.24] Continuing optional pattern from 1.2.23 with च`);
    }

  } catch (error) {
    result.explanation = `Error in sutra analysis: ${error.message}`;
    if (context.debug) {
      result.debug = result.debug || [];
      result.debug.push(`[1.2.24] Error: ${error.message}`);
    }
  }

  return result;
}

// Export all functions
export default sutra1224;
