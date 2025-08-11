/**
 * Sutra 1.2.7: मृडमृदगुधकुषक्लिशवदवसः क्त्वा (mṛḍamṛdagudha kuṣakliśavadavasaḥ ktvā)
 *
 * This sutra specifies that the affix क्त्वा (ktvā) becomes कित् (kit) when following
 * specific verbal roots. This kit designation affects morphological operations such as
 * guṇa/vṛddhi application and accent placement.
 * 
 * The roots specified are:
 * - मृड् (mṛḍ) - to be gracious, to show mercy
 * - मृद् (mṛd) - to squeeze, to crush  
 * - गुध् (gudh) - to wrap up, to conceal
 * - कुष् (kuṣ) - to tear, to drag
 * - क्लिश् (kliś) - to suffer, to torment
 * - वद् (vad) - to speak, to say
 * - वस् (vas) - to dwell, to reside
 *
 * When क्त्वा follows these roots, it gains the special designation of कित्,
 * which blocks certain transformations and affects accent patterns.
 */

// Import shared utilities
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isLitAffix, analyzeAffix } from '../sanskrit-utils/verb-analysis.js';

/**
 * Specific verbal roots after which क्त्वा becomes कित्
 */
export const KIT_KTVĀ_ROOTS = {
  devanagari: ['मृड्', 'मृद्', 'गुध्', 'कुष्', 'क्लिश्', 'वद्', 'वस्'],
  iast: ['mṛḍ', 'mṛd', 'gudh', 'kuṣ', 'kliś', 'vad', 'vas']
};

/**
 * Recognized forms of the क्त्वा affix
 */
export const KTVĀ_AFFIX_FORMS = {
  devanagari: ['क्त्वा', 'त्वा'],
  iast: ['ktvā', 'tvā']
};

/**
 * Checks if a root is one of the specific roots mentioned in Sutra 1.2.7
 * @param {string} root - The verbal root to check
 * @returns {boolean} - True if the root is specified in the sutra
 */
export function isKitKtvāRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  if (!cleanRoot) {
    return false;
  }

  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return KIT_KTVĀ_ROOTS.devanagari.includes(cleanRoot);
  } else if (script === 'IAST') {
    return KIT_KTVĀ_ROOTS.iast.includes(cleanRoot);
  }
  
  return false;
}

/**
 * Checks if an affix is the क्त्वा affix
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is क्त्वा
 */
export function isKtvāAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  const script = detectScript(cleanAffix);
  
  if (script === 'Devanagari') {
    return KTVĀ_AFFIX_FORMS.devanagari.includes(cleanAffix);
  } else if (script === 'IAST') {
    return KTVĀ_AFFIX_FORMS.iast.includes(cleanAffix);
  }
  
  return false;
}

/**
 * Main function: Determines if क्त्वा should be treated as कित् according to Sutra 1.2.7
 * @param {string} root - The verbal root
 * @param {string} affix - The affix to check
 * @param {Object} [context={}] - Additional context information
 * @returns {boolean} - True if the affix should be treated as कित्
 */
export function isKitByKtvāSpecialRoots(root, affix, context = {}) {
  if (!root || !affix || 
      typeof root !== 'string' || typeof affix !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const cleanAffix = affix.trim();

  if (!cleanRoot || !cleanAffix) {
    return false;
  }

  // Validate Sanskrit inputs
  const rootValidation = validateSanskritWord(cleanRoot);
  const affixValidation = validateSanskritWord(cleanAffix);
  
  if (!rootValidation.isValid || !affixValidation.isValid) {
    return false;
  }

  // Check if the affix is क्त्वा
  if (!isKtvāAffix(cleanAffix)) {
    return false;
  }

  // Check if the root is one of the special roots
  if (!isKitKtvāRoot(cleanRoot)) {
    return false;
  }

  return true;
}

/**
 * Analyzes a root-affix combination according to Sutra 1.2.7
 * @param {string} root - The verbal root
 * @param {string} affix - The affix 
 * @param {Object} [context={}] - Additional context
 * @returns {Object} - Analysis result with detailed information
 */
export function analyzeKitKtvāApplication(root, affix, context = {}) {
  if (!root || !affix || 
      typeof root !== 'string' || typeof affix !== 'string') {
    return {
      isValid: false,
      error: 'Invalid root or affix input',
      analysis: null
    };
  }

  const cleanRoot = root.trim();
  const cleanAffix = affix.trim();
  const rootScript = detectScript(cleanRoot);
  const affixScript = detectScript(cleanAffix);

  const analysis = {
    isValid: true,
    root: cleanRoot,
    affix: cleanAffix,
    rootScript: rootScript,
    affixScript: affixScript,
    isKtvāAffix: isKtvāAffix(cleanAffix),
    isSpecialRoot: isKitKtvāRoot(cleanRoot),
    becomesKit: false,
    reason: '',
    examples: [],
    morphologicalEffects: []
  };

  // Check if क्त्वा becomes कित्
  if (analysis.isKtvāAffix && analysis.isSpecialRoot) {
    analysis.becomesKit = true;
    analysis.reason = `क्त्वा becomes कित् after the root ${cleanRoot} according to Sutra 1.2.7`;
    
    // Add morphological effects
    analysis.morphologicalEffects = [
      'Blocks guṇa transformation of the root',
      'Affects accent placement',
      'May influence sandhi operations'
    ];

    // Add traditional examples based on the root
    analysis.examples = getTraditionalExamples(cleanRoot);
  } else if (!analysis.isKtvāAffix) {
    analysis.reason = `The affix ${cleanAffix} is not क्त्वा, so Sutra 1.2.7 does not apply`;
  } else if (!analysis.isSpecialRoot) {
    analysis.reason = `The root ${cleanRoot} is not among the special roots specified in Sutra 1.2.7`;
  }

  return {
    isValid: true,
    error: null,
    analysis: analysis
  };
}

/**
 * Gets traditional examples for each special root
 * @param {string} root - The verbal root
 * @returns {Array} - Array of traditional examples
 */
function getTraditionalExamples(root) {
  const examples = {
    // Devanagari examples
    'मृड्': [
      { form: 'मृडित्वा', meaning: 'having shown mercy', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    'मृद्': [
      { form: 'मृदित्वा', meaning: 'having crushed', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    'गुध्': [
      { form: 'गुधित्वा', meaning: 'having concealed', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    'कुष्': [
      { form: 'कुषित्वा', meaning: 'having torn', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    'क्लिश्': [
      { form: 'क्लिशित्वा', meaning: 'having suffered', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    'वद्': [
      { form: 'वदित्वा', meaning: 'having spoken', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    'वस्': [
      { form: 'वसित्वा', meaning: 'having dwelt', explanation: 'क्त्वा becomes कित्, no guṇa of root' }
    ],
    
    // IAST examples
    'mṛḍ': [
      { form: 'mṛḍitvā', meaning: 'having shown mercy', explanation: 'ktvā becomes kit, no guṇa of root' }
    ],
    'mṛd': [
      { form: 'mṛditvā', meaning: 'having crushed', explanation: 'ktvā becomes kit, no guṇa of root' }
    ],
    'gudh': [
      { form: 'gudhitvā', meaning: 'having concealed', explanation: 'ktvā becomes kit, no guṇa of root' }
    ],
    'kuṣ': [
      { form: 'kuṣitvā', meaning: 'having torn', explanation: 'ktvā becomes kit, no guṇa of root' }
    ],
    'kliś': [
      { form: 'kliśitvā', meaning: 'having suffered', explanation: 'ktvā becomes kit, no guṇa of root' }
    ],
    'vad': [
      { form: 'vaditvā', meaning: 'having spoken', explanation: 'ktvā becomes kit, no guṇa of root' }
    ],
    'vas': [
      { form: 'vasitvā', meaning: 'having dwelt', explanation: 'ktvā becomes kit, no guṇa of root' }
    ]
  };

  return examples[root] || [];
}

/**
 * Gets all special roots specified in Sutra 1.2.7
 * @param {string} [script='both'] - Script preference ('Devanagari', 'IAST', 'both')
 * @returns {Array|Object} - Array of roots for specific script, or object with both scripts
 */
export function getKitKtvāRoots(script = 'both') {
  if (script === 'Devanagari') {
    return [...KIT_KTVĀ_ROOTS.devanagari];
  } else if (script === 'IAST') {
    return [...KIT_KTVĀ_ROOTS.iast];
  } else {
    return {
      devanagari: [...KIT_KTVĀ_ROOTS.devanagari],
      iast: [...KIT_KTVĀ_ROOTS.iast]
    };
  }
}

/**
 * Provides usage examples demonstrating Sutra 1.2.7
 * @returns {Object} - Examples showing the sutra's application
 */
export function getKitKtvāExamples() {
  return {
    sutra: 'मृडमृदगुधकुषक्लिशवदवसः क्त्वा',
    meaning: 'क्त्वा becomes कित् after specific roots',
    examples: [
      {
        root: 'मृड्',
        normal: 'मृडित्वा (not *मार्डित्वा)',
        explanation: 'क्त्वा is कित्, so no guṇa (मृड् → मार्ड्) occurs',
        meaning: 'having shown mercy'
      },
      {
        root: 'वद्',
        normal: 'वदित्वा (not *वादित्वा)', 
        explanation: 'क्त्वा is कित्, so no guṇa (वद् → वाद्) occurs',
        meaning: 'having spoken'
      },
      {
        root: 'क्लिश्',
        normal: 'क्लिशित्वा (not *क्लेशित्वा)',
        explanation: 'क्त्वा is कित्, so no guṇa (क्लिश् → क्लेश्) occurs', 
        meaning: 'having suffered'
      }
    ],
    contrast: [
      {
        root: 'गम्',
        form: 'गत्वा (not गमित्वा)',
        explanation: 'गम् is not in the special list, so normal क्त्वा rules apply',
        meaning: 'having gone'
      }
    ]
  };
}


