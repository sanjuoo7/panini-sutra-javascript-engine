/**
 * Sutra 1.2.25: तृषिमृषिकृशेः काश्यपस्य
 * 
 * Sanskrit: तृषिमृषिकृशेः काश्यपस्य  
 * Transliteration: tṛṣi-mṛṣi-kṛśeḥ kāśyapasya
 * Translation: "According to ऋषि काश्यप, (सेट् क्त्वा is optionally कित्) after तृष्, मृष्, and कृश्"
 * 
 * This is an अतिदेश (exception) sutra that optionally prevents कित् designation 
 * for सेट् क्त्वा affixes after specific roots (तृष्, मृष्, कृश्) according to the 
 * grammatical opinion of ऋषि काश्यप.
 * 
 * Type: अतिदेश (अक्तित्त्वातिदेश)
 * Scope: Morphological - affects कित् designation for specific root-affix combinations
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.25
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

/**
 * Roots specific to Sutra 1.2.25 according to ऋषि काश्यप
 */
const KASHYAPA_ROOTS = {
  devanagari: ['तृष्', 'मृष्', 'कृश्'],
  iast: ['tṛṣ', 'mṛṣ', 'kṛś']
};

/**
 * Expanded variants and forms of the three roots
 */
const ROOT_VARIANTS = {
  'तृष्': ['तृष्', 'तृष', 'तर्ष्', 'तर्ष'],   // तृष् 'to be thirsty' 
  'मृष्': ['मृष्', 'मृष', 'मर्ष्', 'मर्ष'],   // मृष् 'to sprinkle'
  'कृश्': ['कृश्', 'कृश', 'कर्श्', 'कर्श'],   // कृश् 'to become lean'
  'tṛṣ': ['tṛṣ', 'tarṣ', 'tṛṣ'],
  'mṛṣ': ['mṛṣ', 'marṣ', 'mṛṣ'], 
  'kṛś': ['kṛś', 'karś', 'kṛś']
};

/**
 * Checks if a root is one of the तृष्/मृष्/कृश् roots according to Sutra 1.2.25
 * @param {string} root - The root to check
 * @returns {boolean} True if it's a Kashyapa-opinion root
 */
export function isKashyapaRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const normalizedRoot = root.trim();
  const script = detectScript(normalizedRoot);
  
  // Check direct matches
  if (script === 'Devanagari') {
    if (KASHYAPA_ROOTS.devanagari.includes(normalizedRoot)) {
      return true;
    }
  } else {
    if (KASHYAPA_ROOTS.iast.includes(normalizedRoot)) {
      return true;
    }
  }
  
  // Check variants
  for (const [baseRoot, variants] of Object.entries(ROOT_VARIANTS)) {
    if (variants.includes(normalizedRoot)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if according to ऋषि काश्यप's opinion, कित् designation should be prevented
 * @param {string} root - The root being analyzed
 * @param {string} affix - The affix being applied
 * @param {Object} context - Additional morphological context
 * @returns {boolean} True if कित् should be optionally prevented
 */
export function isKitPreventedByKashyapa(root, affix, context = {}) {
  if (!root || !affix) {
    return false;
  }

  // Check if root is one of the three specific roots
  const isKashyapaSpecificRoot = isKashyapaRoot(root);
  if (!isKashyapaSpecificRoot) {
    return false;
  }

  // Check if affix is क्त्वा with सेट् augment
  const isKtvaAffix = isKtvAffix(affix);
  const hasSetAugmentation = hasSetAugment(affix, context);

  if (!isKtvaAffix || !hasSetAugmentation) {
    return false;
  }

  // According to Kashyapa's opinion, this combination optionally prevents कित्
  return true;
}

/**
 * Analyzes Sutra 1.2.25 application for a given root-affix combination
 * @param {string} root - The root to analyze
 * @param {string} affix - The affix to analyze  
 * @param {Object} context - Additional context
 * @param {boolean} context.applyKashyapaOpinion - Whether to apply Kashyapa's optional rule
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function analyzeKashyapaException(root, affix, context = {}) {
  const debug = [];
  const addDebug = (msg) => context.debug && debug.push(msg);

  let result = {
    applies: false,
    preventsKit: false,
    isOptional: true,
    confidence: 0,
    explanation: '',
    analysis: {
      root: root,
      affix: affix,
      isKashyapaRoot: false,
      isSetKtva: false,
      sutraReference: '1.2.25',
      opinion: 'काश्यप (Kashyapa)',
      type: 'अतिदेश'
    },
    debug: context.debug ? debug : undefined
  };

  try {
    addDebug(`Analyzing Sutra 1.2.25 for root "${root}" with affix "${affix}"`);

    // Check if root is a Kashyapa-specific root
    const isKashyapaSpecificRoot = isKashyapaRoot(root);
    result.analysis.isKashyapaRoot = isKashyapaSpecificRoot;
    addDebug(`Is Kashyapa root: ${isKashyapaSpecificRoot}`);

    if (!isKashyapaSpecificRoot) {
      result.explanation = `Root "${root}" is not one of the three roots (तृष्, मृष्, कृश्) mentioned in Sutra 1.2.25`;
      addDebug('Root not in Kashyapa list, sutra does not apply');
      return result;
    }

    // Check if affix is सेट् क्त्वा
    const isKtvaAffix = isKtvAffix(affix);
    const hasSetAugmentation = hasSetAugment(affix, context);
    const isSetKtva = isKtvaAffix && hasSetAugmentation;
    
    result.analysis.isSetKtva = isSetKtva;
    addDebug(`Is सेट् क्त्वा: ${isSetKtva} (क्त्वा: ${isKtvaAffix}, सेट्: ${hasSetAugmentation})`);

    if (!isSetKtva) {
      result.explanation = `Affix "${affix}" is not a सेट् क्त्वा affix. Sutra 1.2.25 applies only to सेट् क्त्वा`;
      addDebug('Affix is not सेट् क्त्वा, sutra does not apply');
      return result;
    }

    // All conditions met - sutra applies
    result.applies = true;
    result.confidence = 0.85; // High confidence but optional rule
    
    // Check if Kashyapa's opinion should be applied (optional)
    const applyOpinion = context.applyKashyapaOpinion !== false; // Default to true
    result.preventsKit = applyOpinion;
    
    if (applyOpinion) {
      result.explanation = `According to ऋषि काश्यप's opinion, सेट् क्त्वा is optionally NOT designated as कित् after the root "${root}". This prevents certain morphological changes.`;
      addDebug('Applying Kashyapa opinion - preventing कित् designation');
    } else {
      result.explanation = `Sutra 1.2.25 conditions are met for root "${root}" with सेट् क्त्वा, but Kashyapa's opinion is not being applied in this context.`;
      addDebug('Conditions met but not applying Kashyapa opinion');
    }

    // Additional analysis
    result.analysis.morphologicalEffect = result.preventsKit ? 
      'Prevents accent retraction and blocks certain morphological changes' :
      'Standard कित् designation applies (no exception)';
      
    result.analysis.traditionalContext = 'This represents a difference of grammatical opinion among ancient scholars';

  } catch (error) {
    addDebug(`Error in analysis: ${error.message}`);
    result.explanation = `Analysis error: ${error.message}`;
    result.confidence = 0;
  }

  return result;
}

/**
 * Main function implementing Sutra 1.2.25
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context object
 * @param {string} context.root - The root if known
 * @param {string} context.affix - The affix if known
 * @param {boolean} context.applyKashyapaOpinion - Whether to apply the optional rule
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1225(word, context = {}) {
  const debug = [];
  const addDebug = (msg) => context.debug && debug.push(msg);
  
  let applicable = false;
  let transformed = word;
  let explanation = '';

  try {
    addDebug(`Starting Sutra 1.2.25 analysis for word: "${word}"`);

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
      explanation = 'Sutra 1.2.25 requires explicit root and affix identification for proper analysis';
      addDebug('Missing root or affix information');
    } else {
      addDebug(`Analyzing with root: "${root}", affix: "${affix}"`);
      
      // Use the specialized analysis function
      const analysis = analyzeKashyapaException(root, affix, context);
      applicable = analysis.applies;
      
      if (applicable) {
        // For अतिदेश rules, the transformation is about preventing कित् designation
        // which affects subsequent morphological operations
        transformed = word; // The word itself doesn't change, but its grammatical properties do
        explanation = analysis.explanation;
        addDebug('Sutra 1.2.25 applies - Kashyapa exception rule engaged');
      } else {
        explanation = analysis.explanation;
        addDebug('Sutra 1.2.25 does not apply to this combination');
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
      sutra: '1.2.25',
      sutraText: 'तृषिमृषिकृशेः काश्यपस्य',
      transliteration: 'tṛṣi-mṛṣi-kṛśeḥ kāśyapasya',
      translation: 'According to Kashyapa, (सेट् क्त्वा is optionally कित्) after तृष्, मृष्, and कृश्',
      type: 'अतिदेश',
      subtype: 'अक्तित्त्वातिदेश',
      domain: 'Morphology - कित् designation exceptions',
      traditional: 'Represents scholarly opinion differences in ancient grammar'
    }
  };
}

/**
 * Get the three roots mentioned in Sutra 1.2.25
 * @param {string} script - Target script ('devanagari' or 'iast')
 * @returns {Array} Array of roots
 */
export function getKashyapaRoots(script = 'devanagari') {
  const normalizedScript = script.toLowerCase();
  if (normalizedScript === 'iast') {
    return [...KASHYAPA_ROOTS.iast];
  }
  return [...KASHYAPA_ROOTS.devanagari];
}

/**
 * Get examples of Sutra 1.2.25 application
 * @param {string} script - Target script ('devanagari' or 'iast')
 * @returns {Array} Array of example objects
 */
export function getKashyapaExamples(script = 'devanagari') {
  const roots = getKashyapaRoots(script);
  const ktvaAffix = script === 'iast' ? 'ktvā' : 'क्त्वा';
  
  return roots.map(root => ({
    root: root,
    affix: ktvaAffix,
    combination: `${root} + ${ktvaAffix}`,
    meaning: root === 'तृष्' || root === 'tṛṣ' ? 'having been thirsty' :
             root === 'मृष्' || root === 'mṛṣ' ? 'having sprinkled' :
             root === 'कृश्' || root === 'kṛś' ? 'having become lean' : '',
    kashyapaEffect: 'Optionally prevents कित् designation for सेट् क्त्वा',
    traditionalNote: 'According to ऋषि काश्यप\'s grammatical opinion'
  }));
}

// Export constants for testing and reference
export {
  KASHYAPA_ROOTS,
  ROOT_VARIANTS
};
