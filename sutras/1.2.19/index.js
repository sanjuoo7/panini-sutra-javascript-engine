/**
 * Sutra 1.2.19: निष्ठा शीङ्स्विदिमिदिक्ष्विदिधृषः
 * Classification: अतिदेश (exception/special rule)
 * 
 * This sutra specifies that सेट् निष्ठा affixes are NOT कित् after specific verbs:
 * शीङ् (to lie down), स्विद् (to sweat), मिद् (to melt), क्ष्विद् (to be unctuous), दृश् (to offend)
 * 
 * When these roots take निष्ठा affixes (क्त/क्तवतु) with सेट् (इट्) augment,
 * the affixes do NOT receive कित् designation, which means:
 * 1. The affixes don't prevent guṇa/vṛddhi in the root
 * 2. Different accent patterns apply
 * 3. Different morphophonemic rules may apply
 * 
 * Examples:
 * - शीङ् + क्त (with इट्) → शयित (NOT कित्) vs. normal कित् behavior
 * - स्विद् + क्त (with इट्) → स्विन्न (NOT कित्)
 * - मिद् + क्त (with इट्) → मिन्न (NOT कित्) 
 * - क्ष्विद् + क्त (with इट्) → क्ष्विण्ण (NOT कित्)
 * - दृश् + क्त (with इट्) → दृष्ट (NOT कित्)
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { hasNishtha, isKta, isKtavatu } from '../1.1.26/index.js';

/**
 * Specific roots from Sutra 1.2.19 that prevent कित् designation for सेट् निष्ठा
 */
const SUTRA_1219_ROOTS = {
  devanagari: {
    'शीङ्': ['शीङ्', 'शी', 'शय्', 'शेते'],
    'स्विद्': ['स्विद्', 'स्विद', 'स्वेद्'],
    'मिद्': ['मिद्', 'मिद', 'मेद्'],
    'क्ष्विद्': ['क्ष्विद्', 'क्ष्विद', 'क्ष्वेद्'],
    'दृश्': ['दृश्', 'दृश', 'दर्श्', 'पश्य्']
  },
  iast: {
    'śīṅ': ['śīṅ', 'śī', 'śay', 'śete'],
    'svid': ['svid', 'svida', 'sved'],
    'mid': ['mid', 'mida', 'med'],
    'kṣvid': ['kṣvid', 'kṣvida', 'kṣved'],
    'dṛś': ['dṛś', 'dṛśa', 'darś', 'paśy']
  }
};

/**
 * Common forms and examples for testing
 */
const EXAMPLE_FORMS = {
  devanagari: {
    'शीङ्': { past_participle: 'शयित', meaning: 'having lain down' },
    'स्विद्': { past_participle: 'स्विन्न', meaning: 'sweated' },
    'मिद्': { past_participle: 'मिन्न', meaning: 'melted' },
    'क्ष्विद्': { past_participle: 'क्ष्विण्ण', meaning: 'made unctuous' },
    'दृश्': { past_participle: 'दृष्ट', meaning: 'offended/seen' }
  },
  iast: {
    'śīṅ': { past_participle: 'śayita', meaning: 'having lain down' },
    'svid': { past_participle: 'svinna', meaning: 'sweated' },
    'mid': { past_participle: 'minna', meaning: 'melted' },
    'kṣvid': { past_participle: 'kṣviṇṇa', meaning: 'made unctuous' },
    'dṛś': { past_participle: 'dṛṣṭa', meaning: 'offended/seen' }
  }
};

/**
 * Checks if a root is one of the specific roots from Sutra 1.2.19
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is from Sutra 1.2.19
 */
export function isSutra1219Root(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return Object.values(SUTRA_1219_ROOTS.devanagari).some(variants => 
      variants.includes(cleanRoot)
    );
  } else {
    return Object.values(SUTRA_1219_ROOTS.iast).some(variants => 
      variants.includes(cleanRoot)
    );
  }
}

/**
 * Checks if an affix has सेट् augment (iṭ augment)
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} - True if the affix has सेट् (iṭ) augment
 */
export function hasSetAugment(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  // Direct context indication
  if (context.hasSetAugment === true || context.hasItAugment === true) {
    return true;
  }
  
  // Check for explicit सेट् marking
  if (context.augment === 'सेट्' || context.augment === 'seṭ' || context.augment === 'iṭ') {
    return true;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  // Check if the affix contains इ or i indicating iṭ augment
  if (script === 'Devanagari') {
    // Look for इ in the affix indicating iṭ augment
    return cleanAffix.includes('इ') && (cleanAffix.includes('त') || cleanAffix.includes('क्त'));
  } else {
    // Look for i in the affix indicating iṭ augment  
    return cleanAffix.includes('i') && (cleanAffix.includes('ta') || cleanAffix.includes('kta'));
  }
}

/**
 * Checks if an affix is a सेट् निष्ठा affix (निष्ठा with इट् augment)
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} - True if the affix is सेट् निष्ठा
 */
export function isSetNishtha(affix, context = {}) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  
  // Check if it's a निष्ठा affix - we could use hasNishtha but let's be more specific
  const script = detectScript(cleanAffix);
  let isNishthaAffix = false;
  
  if (script === 'Devanagari') {
    // Check for क्त or क्तवत् patterns, also इत patterns (सेट् forms)
    isNishthaAffix = cleanAffix.includes('क्त') || 
                     cleanAffix.includes('तवत्') ||
                     (cleanAffix.includes('इत') && cleanAffix.endsWith('त'));
  } else {
    // Check for kta or ktavat patterns, also ita patterns (सेट् forms)
    isNishthaAffix = cleanAffix.includes('kta') || 
                     cleanAffix.includes('tavat') ||
                     (cleanAffix.includes('ita') && cleanAffix.endsWith('ta'));
  }
  
  // Then check if it has सेट् augment
  return isNishthaAffix && hasSetAugment(affix, context);
}

/**
 * Main function implementing Sutra 1.2.19
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Context object containing morphological information
 * @param {string} context.root - The root from which the word is derived
 * @param {string} context.affix - The affix being applied
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1219(word, context = {}) {
  const debug = [];
  const addDebug = (message) => {
    if (context.debug) {
      debug.push(`[1.2.19] ${message}`);
    }
  };

  // Input validation
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return {
      applicable: false,
      preventsKit: false,
      explanation: validation.error.includes('Input does not appear to be valid Sanskrit') ? 
                   'Invalid Sanskrit word' : validation.error,
      error: validation.errorType === 'EMPTY_INPUT' ? 'Invalid input' : 'Invalid Sanskrit word',
      debug
    };
  }

  let applicable = false;
  let preventsKit = false;
  let explanation = '';
  let rootUsed = context.root || '';
  let affixUsed = context.affix || '';

  try {
    addDebug(`Analyzing word: ${word}`);
    addDebug(`Root: ${rootUsed}, Affix: ${affixUsed}`);

    // If root and affix are provided in context, check them directly
    if (rootUsed && affixUsed) {
      const isSpecificRoot = isSutra1219Root(rootUsed);
      const isSetNishthaAffix = isSetNishtha(affixUsed, context);
      
      addDebug(`Is Sutra 1.2.19 root: ${isSpecificRoot}`);
      addDebug(`Is सेट् निष्ठा affix: ${isSetNishthaAffix}`);

      if (isSpecificRoot && isSetNishthaAffix) {
        applicable = true;
        preventsKit = true;
        explanation = `The सेट् निष्ठा affix '${affixUsed}' does NOT receive कित् designation after the root '${rootUsed}' according to Sutra 1.2.19`;
      } else if (isSpecificRoot && !isSetNishthaAffix) {
        explanation = `Root '${rootUsed}' is from Sutra 1.2.19 but affix '${affixUsed}' is not सेट् निष्ठा`;
      } else if (!isSpecificRoot && isSetNishthaAffix) {
        explanation = `Affix '${affixUsed}' is सेट् निष्ठा but root '${rootUsed}' is not from Sutra 1.2.19`;
      } else {
        explanation = `Neither root nor affix conditions for Sutra 1.2.19 are met`;
      }
    } else {
      // Try to analyze the word itself
      addDebug('Attempting word analysis without explicit root/affix');
      
      // Check if the word looks like it could be a निष्ठा form
      const wordScript = detectScript(word);
      let hasNishthaPattern = false;
      
      // More precise pattern matching for निष्ठा forms
      // Look for past participle patterns, not just any word with त
      if (wordScript === 'Devanagari') {
        hasNishthaPattern = (word.endsWith('त') || word.endsWith('न्न') || word.endsWith('ष्ट') || 
                            word.includes('इत') && word.endsWith('त'));
      } else {
        hasNishthaPattern = (word.endsWith('ta') || word.endsWith('nna') || word.endsWith('ṣṭa') || 
                            word.includes('ita') && word.endsWith('ta'));
      }
      
      if (hasNishthaPattern) {
        addDebug('Word appears to have निष्ठा pattern');
        
        // Check against known example forms and also check if it matches Sutra 1.2.19 patterns
        const examples = wordScript === 'Devanagari' ? EXAMPLE_FORMS.devanagari : EXAMPLE_FORMS.iast;
        
        for (const [root, forms] of Object.entries(examples)) {
          if (forms.past_participle === word) {
            applicable = true;
            preventsKit = true;
            rootUsed = root;
            affixUsed = wordScript === 'Devanagari' ? 'क्त' : 'kta';
            explanation = `The word '${word}' is formed from root '${root}' with सेट् निष्ठा, which does NOT receive कित् designation per Sutra 1.2.19`;
            addDebug(`Matched example form: ${root} → ${word}`);
            break;
          }
        }
        
        if (!applicable) {
          explanation = 'Word has निष्ठा pattern but does not match Sutra 1.2.19 patterns';
        }
      } else {
        explanation = 'Word does not contain निष्ठा affix - Sutra 1.2.19 not applicable';
      }
    }

  } catch (error) {
    addDebug(`Error in analysis: ${error.message}`);
    explanation = 'Analysis could not be completed due to processing error';
  }

  // Detect script for the result details
  const wordScript = detectScript(word);

  const result = {
    applicable,
    preventsKit,
    explanation,
    debug,
    details: {
      sutra: '1.2.19',
      sutraText: 'निष्ठा शीङ्स्विदिमिदिक्ष्विदिधृषः',
      transliteration: 'niṣṭhā śīṅsvidimidikṣvididṛṣaḥ',
      translation: 'The सेट् निष्ठा affixes are not कित् after शीङ्, स्विद्, मिद्, क्ष्विद्, and दृश्',
      type: 'अतिदेश (exception rule)',
      category: 'कित्त्वनिषेध (prevention of कित् designation)',
      rootsAffected: Object.keys(wordScript === 'Devanagari' ? SUTRA_1219_ROOTS.devanagari : SUTRA_1219_ROOTS.iast),
      morphology: {
        root: rootUsed,
        affix: affixUsed,
        hasSetAugment: hasSetAugment(affixUsed, context),
        isNishthaAffix: hasNishtha(affixUsed)
      }
    }
  };

  addDebug(`Final result - Applicable: ${applicable}, Prevents कित्: ${preventsKit}`);
  
  return result;
}

/**
 * Get all Sutra 1.2.19 roots and their variants
 * @param {string} script - 'IAST' or 'Devanagari'
 * @returns {Object} Roots organized by base root
 */
export function getSutra1219Roots(script = 'IAST') {
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  return SUTRA_1219_ROOTS[scriptKey];
}

/**
 * Get example forms for Sutra 1.2.19 roots
 * @param {string} script - 'IAST' or 'Devanagari'
 * @returns {Object} Example forms for each root
 */
export function getSutra1219Examples(script = 'IAST') {
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  return EXAMPLE_FORMS[scriptKey];
}

/**
 * Utility function to check if a specific root-affix combination should prevent कित्
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @param {Object} context - Context information
 * @returns {boolean} True if कित् should be prevented
 */
export function preventsKitBySutra1219(root, affix, context = {}) {
  return isSutra1219Root(root) && isSetNishtha(affix, context);
}

// Re-export for convenience
export { isSutra1219Root as isSpecificNishthaExceptionVerb };
