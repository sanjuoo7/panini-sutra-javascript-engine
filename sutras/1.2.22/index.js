/**
 * Sutra 1.2.22: पूङः क्त्वा च
 * Classification: अतिदेश (exception/special rule)
 * 
 * This sutra specifies that सेट् निष्ठा affix and सेट् क्त्वा affix are NOT कित् after पुङ् root:
 * पुङ् (to purify) + सेट् निष्ठा (क्त/क्तवतु with इट्) → NOT कित्
 * पुङ् (to purify) + सेट् क्त्वा (क्त्वा with इट्) → NOT कित्
 * 
 * This is an exception to the general कित् designation rules, meaning:
 * 1. The affixes don't prevent guṇa/vṛddhi in the root
 * 2. Different accent patterns apply
 * 3. Different morphophonemic rules may apply
 * 
 * Examples:
 * - पुङ् + क्त (with इट्) → पुनीत (NOT कित्)
 * - पुङ् + क्त्वा (with इट्) → पुनित्वा (NOT कित्)
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { hasSetAugment, isKtvAffix } from '../sanskrit-utils/kit-analysis.js';

/**
 * Specific root पुङ् and its variants for Sutra 1.2.22
 */
const PUNG_ROOT_VARIANTS = {
  devanagari: ['पुङ्', 'पु', 'पुन्', 'पूङ्', 'पून्'],
  iast: ['puṅ', 'pu', 'pun', 'pūṅ', 'pūn']
};

/**
 * Checks if a root is पुङ् (to purify) or its variants
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is पुङ् or variant
 */
export function isPungRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  return PUNG_ROOT_VARIANTS[scriptKey].includes(cleanRoot);
}

/**
 * Checks if an affix is सेट् निष्ठा (निष्ठा with सेट् augment)
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} - True if it's सेट् निष्ठा
 */
export function isSetNishtha(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  let isNishthaAffix = false;
  
  if (script === 'Devanagari') {
    // Check for क्त or क्तवत् patterns, also इत patterns (सेट् forms)
    isNishthaAffix = cleanAffix.includes('क्त') || 
                     cleanAffix.includes('तवत्') ||
                     cleanAffix === 'इत' ||
                     cleanAffix === 'ित' ||
                     (cleanAffix.includes('इत') && cleanAffix.endsWith('त'));
  } else {
    // Check for kta or ktavat patterns, also ita patterns (सेट् forms)
    isNishthaAffix = cleanAffix.includes('kta') || 
                     cleanAffix.includes('tavat') ||
                     cleanAffix === 'ita' ||
                     (cleanAffix.includes('ita') && cleanAffix.endsWith('ta'));
  }
  
  // Then check if it has सेट् augment OR is a known सेट् form
  return isNishthaAffix && (hasSetAugment(affix, context) || 
    cleanAffix === 'इत' || cleanAffix === 'ित' || cleanAffix === 'ita');
}

/**
 * Checks if an affix is सेट् क्त्वा (क्त्वा with सेट् augment)
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} - True if it's सेट् क्त्वा
 */
export function isSetKtva(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  // First check if it's क्त्वा affix at all
  if (!isKtvAffix(affix)) {
    return false;
  }

  // Check for सेट् augment in context
  if (hasSetAugment(affix, context)) {
    return true;
  }

  // Check for forms that show सेट् augmentation
  const script = detectScript(affix);
  
  if (script === 'Devanagari') {
    // Forms with इ augment indicating सेट्
    return affix.includes('इ') && (
      affix.includes('क्त्वा') || 
      affix.includes('त्वा')
    );
  } else {
    // IAST forms with i augment
    return affix.includes('i') && (
      affix.includes('ktvā') || 
      affix.includes('tvā')
    );
  }
}

/**
 * Main function implementing Sutra 1.2.22
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Context object containing morphological information
 * @param {string} context.root - The root from which the word is derived
 * @param {string} context.affix - The affix being applied
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1222(word, context = {}) {
  const debug = [];
  const addDebug = (message) => {
    if (context.debug) {
      debug.push(`[1.2.22] ${message}`);
    }
  };

  // Input validation
  if (!word || typeof word !== 'string' || word.trim() === '') {
    return {
      applicable: false,
      preventsKit: false,
      explanation: 'Invalid Sanskrit input provided',
      sutra: '1.2.22',
      debug: context.debug ? debug : undefined
    };
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return {
      applicable: false,
      preventsKit: false,
      explanation: 'Invalid Sanskrit input provided',
      sutra: '1.2.22',
      debug: context.debug ? debug : undefined
    };
  }

  // Get root and affix from context or attempt to derive
  const rootUsed = context.root || word;
  const affixUsed = context.affix || '';

  addDebug(`Analyzing root: ${rootUsed}, affix: ${affixUsed}`);

  // Check if root is पुङ्
  const isPungRootFound = isPungRoot(rootUsed);
  addDebug(`Is पुङ् root: ${isPungRootFound}`);

  // Check if affix is सेट् निष्ठा or सेट् क्त्वा
  const isSetNishthaAffix = isSetNishtha(affixUsed, context);
  const isSetKtvaAffix = isSetKtva(affixUsed, context);
  const isRelevantAffix = isSetNishthaAffix || isSetKtvaAffix;

  addDebug(`Is सेट् निष्ठा affix: ${isSetNishthaAffix}`);
  addDebug(`Is सेट् क्त्वा affix: ${isSetKtvaAffix}`);

  // Apply Sutra 1.2.22 logic
  if (isPungRootFound && isRelevantAffix) {
    // Determine more specifically which affix type - prioritize क्त्वा if both match
    let affixType;
    if (isSetKtvaAffix) {
      affixType = 'सेट् क्त्वा';
    } else if (isSetNishthaAffix) {
      affixType = 'सेट् निष्ठा';
    } else {
      affixType = 'सेट् affix';
    }
    
    return {
      applicable: true,
      preventsKit: true,
      explanation: `Sutra 1.2.22 applies: पुङ् root with ${affixType} affix prevents कित् designation`,
      sutra: '1.2.22',
      root: rootUsed,
      affix: affixUsed,
      rootType: 'पुङ्',
      affixType: affixType,
      debug: context.debug ? debug : undefined
    };
  } else if (isPungRootFound && !isRelevantAffix) {
    return {
      applicable: false,
      preventsKit: false,
      explanation: 'Sutra 1.2.22 requires सेट् निष्ठा or सेट् क्त्वा affix',
      sutra: '1.2.22',
      debug: context.debug ? debug : undefined
    };
  } else if (!isPungRootFound && isRelevantAffix) {
    return {
      applicable: false,
      preventsKit: false,
      explanation: 'Sutra 1.2.22 applies only to पुङ् root',
      sutra: '1.2.22',
      debug: context.debug ? debug : undefined
    };
  } else {
    return {
      applicable: false,
      preventsKit: false,
      explanation: 'Sutra 1.2.22 requires पुङ् root with सेट् निष्ठा or सेट् क्त्वा affix',
      sutra: '1.2.22',
      debug: context.debug ? debug : undefined
    };
  }
}

/**
 * Utility function to get पुङ् root variants
 * @param {string} script - 'devanagari' or 'iast'
 * @returns {string[]} Array of root variants
 */
export function getPungRoots(script = 'iast') {
  return PUNG_ROOT_VARIANTS[script === 'Devanagari' || script === 'devanagari' ? 'devanagari' : 'iast'];
}

/**
 * Utility function to get example forms
 * @returns {Object} Example forms in both scripts
 */
export function getSutra1222Examples() {
  return {
    devanagari: ['पुनीत', 'पुनित्वा', 'पूत'],
    iast: ['punīta', 'punitvā', 'pūta']
  };
}

/**
 * Check if a combination prevents कित् by Sutra 1.2.22
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @param {Object} context - Context information
 * @returns {boolean} True if prevents कित्
 */
export function preventsKitBySutra1222(root, affix, context = {}) {
  return isPungRoot(root) && (isSetNishtha(affix, context) || isSetKtva(affix, context));
}

// Export main function as default
export default sutra1222;

// Export utility functions for reuse
export { isPungRoot as isPungRootForSutra1222 };
