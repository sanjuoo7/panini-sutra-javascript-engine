/**
 * Sutra 1.2.20: ऋत इद्धातोः
 * Type: अतिदेश (exception rule)
 * 
 * Sanskrit: ऋत इद्धातोः
 * Transliteration: ṛta iddhātoḥ
 * Translation: सेट् निष्ठा affixes do not receive कित् designation after roots ending in ऋ vowel
 * 
 * This sutra prevents कित् designation for सेट् निष्ठा (past participle) affixes 
 * when they follow verbal roots that end with the vowel ऋ (ṛ).
 * 
 * Key Points:
 * 1. Applies only to roots ending in ऋ vowel
 * 2. Affects only सेट् निष्ठा affixes (निष्ठा with इट् augment)
 * 3. PREVENTS कित् designation (exception rule)
 * 4. Works in conjunction with general कित् rules
 * 
 * Examples:
 * - √कृ + इत → कृत (not कित्)
 * - √भृ + इत → भृत (not कित्)
 * - √पृ + इत → पूर्त (not कित्)
 * 
 * Technical Implementation:
 * - Root analysis: Check if root ends with ऋ/ṛ
 * - Affix analysis: Verify it's सेट् निष्ठा 
 * - Context: Morphological parsing and validation
 * - Result: Prevents कित् designation when conditions met
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { hasNishtha } from '../1.1.26/index.js';
// Note: we implement hasSetAugment locally to avoid circular dependency

// Common roots ending in ऋ vowel
const SUTRA_1220_ROOTS = {
  devanagari: {
    'कृ': ['कृ'], // to do, make
    'भृ': ['भृ'], // to bear, carry
    'पृ': ['पृ'], // to fill
    'तृ': ['तृ'], // to cross
    'दृ': ['दृ'], // to tear
    'स्तृ': ['स्तृ'], // to spread
    'स्फुर्': ['स्फुर्'], // to throb (though this is र्-ending)
    'कॄ': ['कॄ'], // to scatter
    'गॄ': ['गॄ'], // to swallow
    'जॄ': ['जॄ'], // to grow old
    'दॄ': ['दॄ'], // to tear
    'पॄ': ['पॄ'], // to fill
    'भॄ': ['भॄ'], // to bear
    'मॄ': ['मॄ'], // to die
    'वॄ': ['वॄ'], // to choose
    'श्रॄ': ['श्रॄ'], // to hurt
    'स्तॄ': ['स्तॄ'], // to spread
    'स्मॄ': ['स्मॄ'] // to remember
  },
  iast: {
    'kṛ': ['kṛ'], // to do, make
    'bhṛ': ['bhṛ'], // to bear, carry
    'pṛ': ['pṛ'], // to fill
    'tṛ': ['tṛ'], // to cross
    'dṛ': ['dṛ'], // to tear
    'stṛ': ['stṛ'], // to spread
    'sphur': ['sphur'], // to throb (though this is r-ending)
    'kḷ': ['kḷ'], // to scatter (alternative spelling)
    'gḷ': ['gḷ'], // to swallow (alternative spelling)
    'kṝ': ['kṝ'], // to scatter (long ṝ)
    'gṝ': ['gṝ'], // to swallow
    'jṝ': ['jṝ'], // to grow old
    'dṝ': ['dṝ'], // to tear
    'pṝ': ['pṝ'], // to fill
    'bhṝ': ['bhṝ'], // to bear
    'mṝ': ['mṝ'], // to die
    'vṝ': ['vṝ'], // to choose
    'śṝ': ['śṝ'], // to hurt
    'stṝ': ['stṝ'], // to spread
    'smṝ': ['smṝ'] // to remember
  }
};

// Example forms showing सेट् निष्ठा with ऋ-ending roots
const EXAMPLE_FORMS = {
  devanagari: {
    'कृ': { past_participle: 'कृत', meaning: 'done, made' },
    'भृ': { past_participle: 'भृत', meaning: 'borne, carried' },
    'पृ': { past_participle: 'पूर्त', meaning: 'filled' },
    'तृ': { past_participle: 'तीर्ण', meaning: 'crossed' },
    'दृ': { past_participle: 'दीर्ण', meaning: 'torn' },
    'स्तृ': { past_participle: 'स्तीर्ण', meaning: 'spread' }
  },
  iast: {
    'kṛ': { past_participle: 'kṛta', meaning: 'done, made' },
    'bhṛ': { past_participle: 'bhṛta', meaning: 'borne, carried' },
    'pṛ': { past_participle: 'pūrta', meaning: 'filled' },
    'tṛ': { past_participle: 'tīrṇa', meaning: 'crossed' },
    'dṛ': { past_participle: 'dīrṇa', meaning: 'torn' },
    'stṛ': { past_participle: 'stīrṇa', meaning: 'spread' }
  }
};

/**
 * Checks if a root ends with ऋ vowel (applicable to Sutra 1.2.20)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root ends with ऋ vowel
 */
export function endsWithRVowel(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    // Check for ऋ or ॄ vowels
    return cleanRoot.endsWith('ृ') || cleanRoot.endsWith('ॄ') || 
           cleanRoot.endsWith('ऋ') || cleanRoot.endsWith('ॠ');
  } else {
    // Check for ṛ or ṝ vowels
    return cleanRoot.endsWith('ṛ') || cleanRoot.endsWith('ṝ');
  }
}

/**
 * Checks if a root is one covered by Sutra 1.2.20 (ऋ-ending roots)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is covered by Sutra 1.2.20
 */
export function isSutra1220Root(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  // First check if it ends with ऋ vowel
  if (!endsWithRVowel(cleanRoot)) {
    return false;
  }

  // Check against known ऋ-ending roots
  if (script === 'Devanagari') {
    return Object.values(SUTRA_1220_ROOTS.devanagari).some(variants => 
      variants.includes(cleanRoot)
    );
  } else {
    return Object.values(SUTRA_1220_ROOTS.iast).some(variants => 
      variants.includes(cleanRoot)
    );
  }
}

/**
 * Checks if an affix has सेट् (seṭ) augment (iṭ augment)
 * This is a local implementation for Sutra 1.2.20
 * @param {string} affix - The affix to check
 * @param {Object} context - Context containing augment information
 * @returns {boolean} - True if the affix has सेट् augment
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
  
  // Check if it's a निष्ठा affix 
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
 * Main function implementing Sutra 1.2.20: ऋत इद्धातोः
 * Determines if सेट् निष्ठा affixes should NOT receive कित् designation after ऋ-ending roots
 * 
 * @param {string} word - The word or root being analyzed
 * @param {Object} context - Context object containing morphological information
 * @param {string} context.root - The root from which the word is derived
 * @param {string} context.affix - The affix being applied
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1220(word, context = {}) {
  const debug = [];
  const addDebug = (message) => {
    if (context.debug) {
      debug.push(`[1.2.20] ${message}`);
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
      const endsWithR = endsWithRVowel(rootUsed);
      const isSetNishthaAffix = isSetNishtha(affixUsed, context);
      
      addDebug(`Root ends with ऋ vowel: ${endsWithR}`);
      addDebug(`Is सेट् निष्ठा affix: ${isSetNishthaAffix}`);

      if (endsWithR && isSetNishthaAffix) {
        applicable = true;
        preventsKit = true;
        explanation = `The सेट् निष्ठा affix '${affixUsed}' does NOT receive कित् designation after the ऋ-ending root '${rootUsed}' according to Sutra 1.2.20`;
      } else if (endsWithR && !isSetNishthaAffix) {
        explanation = `Root '${rootUsed}' ends with ऋ vowel but affix '${affixUsed}' is not सेट् निष्ठा`;
      } else if (!endsWithR && isSetNishthaAffix) {
        explanation = `Affix '${affixUsed}' is सेट् निष्ठा but root '${rootUsed}' does not end with ऋ vowel`;
      } else {
        explanation = `Neither root nor affix conditions for Sutra 1.2.20 are met`;
      }
    } else {
      // Try to analyze the word itself
      addDebug('Attempting word analysis without explicit root/affix');
      
      // Check if the word looks like it could be a निष्ठा form from ऋ-ending root
      const wordScript = detectScript(word);
      let hasNishthaPattern = false;
      
      // Pattern matching for निष्ठा forms
      if (wordScript === 'Devanagari') {
        hasNishthaPattern = (word.endsWith('त') || word.endsWith('न्न') || word.endsWith('ष्ट') || 
                            word.includes('इत') && word.endsWith('त'));
      } else {
        hasNishthaPattern = (word.endsWith('ta') || word.endsWith('nna') || word.endsWith('ṣṭa') || 
                            word.includes('ita') && word.endsWith('ta'));
      }
      
      if (hasNishthaPattern) {
        addDebug('Word appears to have निष्ठा pattern');
        
        // Check against known example forms
        const examples = wordScript === 'Devanagari' ? EXAMPLE_FORMS.devanagari : EXAMPLE_FORMS.iast;
        
        for (const [root, forms] of Object.entries(examples)) {
          if (forms.past_participle === word) {
            applicable = true;
            preventsKit = true;
            rootUsed = root;
            affixUsed = wordScript === 'Devanagari' ? 'क्त' : 'kta';
            explanation = `The word '${word}' is formed from ऋ-ending root '${root}' with सेट् निष्ठा, which does NOT receive कित् designation per Sutra 1.2.20`;
            addDebug(`Matched example form: ${root} → ${word}`);
            break;
          }
        }
        
        if (!applicable) {
          explanation = 'Word has निष्ठा pattern but does not match Sutra 1.2.20 patterns';
        }
      } else {
        explanation = 'Word does not contain निष्ठा pattern - Sutra 1.2.20 not applicable';
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
      sutra: '1.2.20',
      sutraText: 'ऋत इद्धातोः',
      transliteration: 'ṛta iddhātoḥ',
      translation: 'The सेट् निष्ठा affixes are not कित् after roots ending in ऋ vowel',
      type: 'अतिदेश (exception rule)',
      category: 'कित्त्वनिषेध (prevention of कित् designation)',
      rootsAffected: Object.keys(wordScript === 'Devanagari' ? SUTRA_1220_ROOTS.devanagari : SUTRA_1220_ROOTS.iast),
      morphology: {
        root: rootUsed,
        affix: affixUsed,
        hasSetAugment: hasSetAugment(affixUsed, context),
        isNishthaAffix: hasNishtha(affixUsed),
        endsWithRVowel: endsWithRVowel(rootUsed)
      }
    }
  };

  addDebug(`Final result - Applicable: ${applicable}, Prevents कित्: ${preventsKit}`);
  
  return result;
}

/**
 * Get all Sutra 1.2.20 roots (ऋ-ending roots) and their variants
 * @param {string} script - 'IAST' or 'Devanagari'
 * @returns {Object} Roots organized by base root
 */
export function getSutra1220Roots(script = 'IAST') {
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  return SUTRA_1220_ROOTS[scriptKey];
}

/**
 * Get example forms for Sutra 1.2.20 roots
 * @param {string} script - 'IAST' or 'Devanagari'
 * @returns {Object} Example forms organized by root
 */
export function getSutra1220Examples(script = 'IAST') {
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  return EXAMPLE_FORMS[scriptKey];
}

/**
 * Check if a combination prevents कित् designation by Sutra 1.2.20
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @param {Object} context - Additional context
 * @returns {boolean} - True if कित् designation is prevented
 */
export function preventsKitBySutra1220(root, affix, context = {}) {
  return endsWithRVowel(root) && isSetNishtha(affix, context);
}

// Alias for backward compatibility
export const isREndingRoot = endsWithRVowel;
