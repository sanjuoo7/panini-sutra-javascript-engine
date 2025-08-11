/**
 * Sutra 1.2.26: रलो व्युपधाद्धलादेः संश्च
 * 
 * Sanskrit: रलो व्युपधाद्धलादेः संश्च
 * Transliteration: ralo vyupadhād-halādeḥ saṃś-ca
 * Translation: "And (optionally कित्) for सन् affix as well, after verbs that begin with 
 *              a consonant, end in रल् (र or ल), and have व्युपधा (i/ī or u/ū as penultimate)"
 * 
 * This is an अतिदेश (exception) sutra that optionally designates क्त्वा and सन् affixes 
 * as कित् after roots with complex morphophonological conditions:
 * 1. Root begins with consonant (हलादेः)
 * 2. Root ends in रल् प्रत्याहार (र or ल)
 * 3. Root has व्युपधा (penultimate vowel is i/ī or u/ū)
 * 
 * Type: अतिदेश (अक्तित्त्वातिदेश)
 * Scope: Morphological - affects कित् designation for specific morphophonological patterns
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.26
 */

import { 
  validateSanskritWord 
} from '../sanskrit-utils/validation.js';

import {
  detectScript
} from '../sanskrit-utils/script-detection.js';

import { 
  hasSetAugment,
  isKtvAffix
} from '../sanskrit-utils/kit-analysis.js';

import {
  isSanAffix
} from '../sanskrit-utils/kit-designation.js';

import {
  getCommonPratyahara,
  isPhonemeInPratyahara
} from '../sanskrit-utils/pratyahara-construction.js';

import {
  isVowel,
  isConsonant
} from '../sanskrit-utils/classification.js';

import {
  tokenizePhonemes
} from '../sanskrit-utils/phoneme-tokenization.js';

/**
 * रल् प्रत्याहार (र and ल consonants)
 */
const RAL_PRATYAHARA = {
  devanagari: ['र', 'ल'],
  iast: ['r', 'l']
};

/**
 * व्युपधा vowels (penultimate vowels that trigger the rule)
 * इ, ई, उ, ऊ as penultimate (second-to-last) vowels
 */
const VYUPADHA_VOWELS = {
  devanagari: ['इ', 'ी', 'उ', 'ू', 'ि', 'ु'],  // includes diacritical forms
  iast: ['i', 'ī', 'u', 'ū']
};

/**
 * Checks if a phoneme is in रल् प्रत्याहार (र or ल)
 * @param {string} phoneme - The phoneme to check
 * @returns {boolean} True if phoneme is र or ल
 */
export function isRalPhoneme(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return false;
  }

  const script = detectScript(phoneme);
  if (script === 'Devanagari') {
    return RAL_PRATYAHARA.devanagari.includes(phoneme);
  } else {
    return RAL_PRATYAHARA.iast.includes(phoneme);
  }
}

/**
 * Checks if a vowel is व्युपधा (penultimate vowel that can trigger the rule)
 * @param {string} vowel - The vowel to check
 * @returns {boolean} True if vowel is व्युपधा type (i/ī/u/ū)
 */
export function isVyupadhaVowel(vowel) {
  if (!vowel || typeof vowel !== 'string') {
    return false;
  }

  const script = detectScript(vowel);
  if (script === 'Devanagari') {
    return VYUPADHA_VOWELS.devanagari.includes(vowel);
  } else {
    return VYUPADHA_VOWELS.iast.includes(vowel);
  }
}

/**
 * Analyzes if a root begins with a consonant (हलादि)
 * @param {string} root - The root to analyze
 * @returns {boolean} True if root begins with consonant
 */
export function beginsWithConsonant(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const phonemes = tokenizePhonemes(root);
  if (phonemes.phonemes && phonemes.phonemes.length > 0) {
    const firstPhoneme = phonemes.phonemes[0];
    return isConsonant(firstPhoneme);
  }

  return false;
}

/**
 * Analyzes if a root ends with रल् (र or ल)
 * @param {string} root - The root to analyze
 * @returns {boolean} True if root ends with र or ल
 */
export function endsWithRal(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const phonemes = tokenizePhonemes(root);
  if (phonemes.phonemes && phonemes.phonemes.length > 0) {
    // For Devanagari, need to check consonant before halant
    if (phonemes.script === 'Devanagari') {
      // Look for pattern: consonant + halant at end
      const lastTwo = phonemes.phonemes.slice(-2);
      if (lastTwo.length === 2 && lastTwo[1] === '्') {
        return isRalPhoneme(lastTwo[0]);
      }
      // Or just a final consonant
      const lastPhoneme = phonemes.phonemes[phonemes.phonemes.length - 1];
      return isRalPhoneme(lastPhoneme);
    } else {
      // For IAST, check last phoneme directly
      const lastPhoneme = phonemes.phonemes[phonemes.phonemes.length - 1];
      return isRalPhoneme(lastPhoneme);
    }
  }

  return false;
}

/**
 * Analyzes if a root has व्युपधा (vowel before final consonant is i/ī/u/ū)
 * In Sanskrit grammar, व्युपधा refers to the vowel that comes just before the final consonant
 * @param {string} root - The root to analyze
 * @returns {Object} Analysis result with vowel information
 */
export function hasVyupadha(root) {
  if (!root || typeof root !== 'string') {
    return { hasVyupadha: false, penultimateVowel: null, analysis: 'Invalid input' };
  }

  const phonemes = tokenizePhonemes(root);
  if (!phonemes.phonemes || phonemes.phonemes.length < 2) {
    return { hasVyupadha: false, penultimateVowel: null, analysis: 'Root too short for व्युपधा analysis' };
  }

  // Find the vowel that comes before the final consonant
  // In Devanagari, this is typically before the halant or the final consonant
  let vyupadhaVowel = null;
  
  if (phonemes.script === 'Devanagari') {
    // Look for pattern: vowel + consonant + halant
    // or vowel + consonant (at end)
    for (let i = phonemes.phonemes.length - 3; i >= 0; i--) {
      const current = phonemes.phonemes[i];
      if (isVowel(current) || isVyupadhaVowel(current)) {
        const next = phonemes.phonemes[i + 1];
        const afterNext = phonemes.phonemes[i + 2];
        
        // Check if followed by consonant + halant (pattern: vowel + consonant + halant)
        if (isConsonant(next) && afterNext === '्') {
          vyupadhaVowel = current;
          break;
        }
        // Or if it's vowel + final consonant (pattern: vowel + consonant at end)
        else if (isConsonant(next) && i + 1 === phonemes.phonemes.length - 1) {
          vyupadhaVowel = current;
          break;
        }
      }
    }
  } else {
    // For IAST, look for vowel before final consonant
    for (let i = phonemes.phonemes.length - 2; i >= 0; i--) {
      const current = phonemes.phonemes[i];
      if (isVowel(current) || isVyupadhaVowel(current)) {
        const next = phonemes.phonemes[i + 1];
        if (isConsonant(next)) {
          vyupadhaVowel = current;
          break;
        }
      }
    }
  }

  if (!vyupadhaVowel) {
    return { hasVyupadha: false, penultimateVowel: null, analysis: 'No व्युपधा vowel found before final consonant' };
  }

  const hasVyupadhaVowel = isVyupadhaVowel(vyupadhaVowel);

  return {
    hasVyupadha: hasVyupadhaVowel,
    penultimateVowel: vyupadhaVowel,
    analysis: hasVyupadhaVowel ? 
      `व्युपधा vowel '${vyupadhaVowel}' is the required type (i/ī/u/ū)` :
      `व्युपधा vowel '${vyupadhaVowel}' is not the required type (i/ī/u/ū)`,
    vowelCount: phonemes.phonemes.filter(p => isVowel(p) || isVyupadhaVowel(p)).length,
    allVowels: phonemes.phonemes.filter(p => isVowel(p) || isVyupadhaVowel(p))
  };
}

/**
 * Checks if a root meets all the morphophonological conditions of Sutra 1.2.26
 * @param {string} root - The root to analyze
 * @returns {Object} Comprehensive analysis result
 */
export function meetsRalVyupadhaConditions(root) {
  if (!root || typeof root !== 'string') {
    return {
      meetsConditions: false,
      analysis: {
        beginsWithConsonant: false,
        endsWithRal: false,
        hasVyupadha: false,
        explanation: 'Invalid root input'
      }
    };
  }

  const beginsConsonant = beginsWithConsonant(root);
  const endsRal = endsWithRal(root);
  const vyupadhaAnalysis = hasVyupadha(root);

  const meetsConditions = beginsConsonant && endsRal && vyupadhaAnalysis.hasVyupadha;

  return {
    meetsConditions,
    analysis: {
      beginsWithConsonant: beginsConsonant,
      endsWithRal: endsRal,
      hasVyupadha: vyupadhaAnalysis.hasVyupadha,
      penultimateVowel: vyupadhaAnalysis.penultimateVowel,
      explanation: meetsConditions ?
        `Root "${root}" meets all conditions: हलादि + व्युपधा + रलान्त` :
        `Root "${root}" missing: ${[
          !beginsConsonant ? 'हलादि' : null,
          !vyupadhaAnalysis.hasVyupadha ? 'व्युपधा' : null,
          !endsRal ? 'रलान्त' : null
        ].filter(Boolean).join(', ')}`,
      detailedAnalysis: vyupadhaAnalysis
    }
  };
}

/**
 * Checks if कित् designation should be optionally applied according to Sutra 1.2.26
 * @param {string} root - The root being analyzed
 * @param {string} affix - The affix being applied
 * @param {Object} context - Additional morphological context
 * @returns {boolean} True if optional कित् should apply
 */
export function isKitByRalVyupadha(root, affix, context = {}) {
  if (!root || !affix) {
    return false;
  }

  // Check if root meets morphophonological conditions
  const rootAnalysis = meetsRalVyupadhaConditions(root);
  if (!rootAnalysis.meetsConditions) {
    return false;
  }

  // Check if affix is क्त्वा or सन्
  const isKtva = isKtvAffix(affix);
  const isSan = isSanAffix(affix);

  if (!isKtva && !isSan) {
    return false;
  }

  // All conditions met - optional कित् designation applies
  return true;
}

/**
 * Analyzes Sutra 1.2.26 application for a given root-affix combination
 * @param {string} root - The root to analyze
 * @param {string} affix - The affix to analyze  
 * @param {Object} context - Additional context
 * @param {boolean} context.applyOptionalRule - Whether to apply the optional कित् designation
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function analyzeRalVyupadhaKit(root, affix, context = {}) {
  const debug = [];
  const addDebug = (msg) => context.debug && debug.push(msg);

  let result = {
    applies: false,
    becomesKit: false,
    isOptional: true,
    confidence: 0,
    explanation: '',
    analysis: {
      root: root,
      affix: affix,
      meetsRootConditions: false,
      isValidAffix: false,
      morphophonologicalAnalysis: null,
      sutraReference: '1.2.26',
      type: 'अतिदेश'
    },
    debug: context.debug ? debug : undefined
  };

  try {
    addDebug(`Analyzing Sutra 1.2.26 for root "${root}" with affix "${affix}"`);

    // Analyze root conditions
    const rootAnalysis = meetsRalVyupadhaConditions(root);
    result.analysis.meetsRootConditions = rootAnalysis.meetsConditions;
    result.analysis.morphophonologicalAnalysis = rootAnalysis.analysis;
    
    addDebug(`Root analysis: ${rootAnalysis.analysis.explanation}`);

    if (!rootAnalysis.meetsConditions) {
      result.explanation = `Root "${root}" does not meet the morphophonological conditions for Sutra 1.2.26: ${rootAnalysis.analysis.explanation}`;
      addDebug('Root conditions not met, sutra does not apply');
      return result;
    }

    // Check affix validity
    const isKtva = isKtvAffix(affix);
    const isSan = isSanAffix(affix);
    const isValidAffix = isKtva || isSan;
    
    result.analysis.isValidAffix = isValidAffix;
    result.analysis.affixType = isKtva ? 'क्त्वा' : isSan ? 'सन्' : 'other';
    
    addDebug(`Affix "${affix}" is: ${result.analysis.affixType} (valid: ${isValidAffix})`);

    if (!isValidAffix) {
      result.explanation = `Affix "${affix}" is not क्त्वा or सन्. Sutra 1.2.26 applies only to these affixes`;
      addDebug('Affix not valid for this sutra');
      return result;
    }

    // All conditions met - sutra applies
    result.applies = true;
    result.confidence = 0.8; // High confidence but optional rule
    
    // Check if optional rule should be applied
    const applyOptional = context.applyOptionalRule !== false; // Default to true
    result.becomesKit = applyOptional;
    
    if (applyOptional) {
      result.explanation = `Root "${root}" meets all morphophonological conditions (हलादि + व्युपधा + रलान्त), and affix "${affix}" is optionally designated as कित् according to Sutra 1.2.26`;
      addDebug('Applying optional कित् designation');
    } else {
      result.explanation = `Sutra 1.2.26 conditions are met for root "${root}" with ${result.analysis.affixType}, but optional कित् designation is not being applied`;
      addDebug('Conditions met but not applying optional designation');
    }

    // Additional analysis
    result.analysis.morphologicalEffect = result.becomesKit ? 
      'Affixes become कित्, affecting accent and morphophonological operations' :
      'Standard non-कित् behavior (no special designation)';
      
    result.analysis.linguisticNote = 'Complex morphophonological conditions involving root shape and vowel patterns';

  } catch (error) {
    addDebug(`Error in analysis: ${error.message}`);
    result.explanation = `Analysis error: ${error.message}`;
    result.confidence = 0;
  }

  return result;
}

/**
 * Main function implementing Sutra 1.2.26
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context object
 * @param {string} context.root - The root if known
 * @param {string} context.affix - The affix if known
 * @param {boolean} context.applyOptionalRule - Whether to apply the optional कित् designation
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1226(word, context = {}) {
  const debug = [];
  const addDebug = (msg) => context.debug && debug.push(msg);
  
  let applicable = false;
  let transformed = word;
  let explanation = '';

  try {
    addDebug(`Starting Sutra 1.2.26 analysis for word: "${word}"`);

    // Input validation
    if (!word || typeof word !== 'string') {
      throw new Error('Invalid input: word must be a non-empty string');
    }

    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      throw new Error(`Invalid Sanskrit word: ${validation.error}`);
    }

    // Get root and affix from context or try to analyze word
    const root = context.root;
    const affix = context.affix;

    if (!root || !affix) {
      explanation = 'Sutra 1.2.26 requires explicit root and affix identification for morphophonological analysis';
      addDebug('Missing root or affix information');
    } else {
      addDebug(`Analyzing with root: "${root}", affix: "${affix}"`);
      
      // Use the specialized analysis function
      const analysis = analyzeRalVyupadhaKit(root, affix, context);
      applicable = analysis.applies;
      
      if (applicable) {
        // For अतिदेश rules, the transformation is about कित् designation
        // which affects subsequent morphological operations
        transformed = word; // The word itself doesn't change, but its grammatical properties do
        explanation = analysis.explanation;
        addDebug('Sutra 1.2.26 applies - रल्-व्युपधा कित् designation rule engaged');
      } else {
        explanation = analysis.explanation;
        addDebug('Sutra 1.2.26 does not apply to this combination');
      }
    }

  } catch (error) {
    addDebug(`Error in analysis: ${error.message}`);
    explanation = `Analysis could not be completed: ${error.message}`;
  }

  return {
    applicable,
    transformed,
    explanation,
    debug: context.debug ? debug : undefined,
    details: {
      sutra: '1.2.26',
      sutraText: 'रलो व्युपधाद्धलादेः संश्च',
      transliteration: 'ralo vyupadhād-halādeḥ saṃś-ca',
      translation: 'And (optionally कित्) for सन् as well, after consonant-initial, रल्-final roots with व्युपधा',
      type: 'अतिदेश',
      subtype: 'अक्तित्त्वातिदेश',
      domain: 'Morphophonology - complex root shape conditions',
      complexity: 'High - requires multiple morphophonological analyses'
    }
  };
}

/**
 * Get example roots that meet the रल्-व्युपधा conditions
 * @param {string} script - Target script ('devanagari' or 'iast')
 * @returns {Array} Array of example root objects
 */
export function getRalVyupadhaExamples(script = 'devanagari') {
  const examples = [
    {
      root: script === 'iast' ? 'kir' : 'किर्',
      meaning: 'to scatter',
      analysis: 'हलादि (क्-) + व्युपधा (इ) + रलान्त (-र्)',
      affixes: script === 'iast' ? ['ktvā', 'san'] : ['क्त्वा', 'सन्']
    },
    {
      root: script === 'iast' ? 'cul' : 'चुल्',
      meaning: 'to lift up',
      analysis: 'हलादि (च्-) + व्युपधा (उ) + रलान्त (-ल्)',
      affixes: script === 'iast' ? ['ktvā', 'san'] : ['क्त्वा', 'सन्']
    },
    {
      root: script === 'iast' ? 'dhūr' : 'धूर्',
      meaning: 'to shake',
      analysis: 'हलादि (ध्-) + व्युपधा (ऊ) + रलान्त (-र्)',
      affixes: script === 'iast' ? ['ktvā', 'san'] : ['क्त्वा', 'सन्']
    }
  ];

  return examples.map(example => ({
    ...example,
    kitEffect: 'Optional कित् designation for क्त्वा and सन् affixes',
    morphologicalNote: 'Affects accent placement and morphophonological operations'
  }));
}

// Export constants for testing and reference
export {
  RAL_PRATYAHARA,
  VYUPADHA_VOWELS
};
