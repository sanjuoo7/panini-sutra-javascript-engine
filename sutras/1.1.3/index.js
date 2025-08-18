/**
 * Sutra 1.1.3: इको गुणवृद्धी (iko guṇavṛddhī)
 *
 * This is a paribhāṣā (interpretive rule) that states: "In the absence of any special instruction,
 * whenever गुण (guṇa) or वृद्धि (vṛddhi) is enjoined for any expression by using the terms गुण or वृद्धि,
 * it is to be understood to come in place of the इक् (ik) vowels (इ, उ, ऋ, लृ) of that expression."
 *
 * This sutra establishes the default scope of guṇa and vṛddhi operations - they apply specifically
 * to the 'ik' class of vowels unless otherwise specified.
 * 
 * IMPLEMENTATION NOTES:
 * 
 * Current Status: Enhanced with shared utilities
 * - Robust phoneme tokenization for accurate vowel detection
 * - Comprehensive bilingual support (IAST/Devanagari)
 * - Leverages centralized classification and transformation logic
 * 
 * Phonological Pattern Implementation:
 * 
 * Guṇa Pattern:
 * - i/ī (high front) → e (mid front) 
 * - u/ū (high back) → o (mid back)
 * - ṛ/ṝ (high central retroflex) → ar (mid central + resonant)
 * - ḷ/ḹ (high central lateral) → al (mid central + lateral)
 * 
 * Vṛddhi Pattern:  
 * - i/ī (high front) → ai (front diphthong)
 * - u/ū (high back) → au (back diphthong) 
 * - ṛ/ṝ (high central retroflex) → ār (long central + resonant)
 * - ḷ/ḹ (high central lateral) → āl (long central + lateral)
 */

// Import shared utilities
import { SanskritVowels } from '../sanskrit-utils/constants.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';
import { isIkVowel as sharedIsIkVowel, isVowel } from '../sanskrit-utils/classification.js';
import { 
  applyGunaTransformation, 
  applyVrddhiTransformation,
  getGunaVrddhiScope as sharedGetGunaVrddhiScope 
} from '../sanskrit-utils/vowel-analysis.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { 
  getGunaForm, 
  applyGuna, 
  isValidGunaTransformation 
} from '../sanskrit-utils/guna-utilities.js';

// Re-export isIkVowel for backward compatibility
export { isIkVowel } from '../sanskrit-utils/classification.js';

/**
 * Applies guṇa transformation to an 'ik' vowel.
 * This function implements the guṇa rule as specified in sutra 1.1.3.
 * Enhanced with shared utilities for robust handling.
 *
 * @param {string} vowel The 'ik' vowel to transform (IAST or Devanagari).
 * @returns {string|null} The guṇa form if the vowel is 'ik', null otherwise.
 */
function applyGunaToIk(vowel) {
  if (!sharedIsIkVowel(vowel)) {
    return null;
  }
  
  return applyGunaTransformation(vowel);
}

/**
 * Applies vṛddhi transformation to an 'ik' vowel.
 * This function implements the vṛddhi rule as specified in sutra 1.1.3.
 * Enhanced with shared utilities for robust handling.
 *
 * @param {string} vowel The 'ik' vowel to transform (IAST or Devanagari).
 * @returns {string|null} The vṛddhi form if the vowel is 'ik', null otherwise.
 */
function applyVrddhiToIk(vowel) {
  if (!sharedIsIkVowel(vowel)) {
    return null;
  }
  
  return applyVrddhiTransformation(vowel);
}

/**
 * Determines the scope of guṇa/vṛddhi operations according to sutra 1.1.3.
 * This function identifies which vowels in a given word are subject to guṇa/vṛddhi.
 * Enhanced with robust phoneme tokenization and comprehensive analysis.
 *
 * @param {string} word The word to analyze (IAST or Devanagari).
 * @returns {Array} Array of vowel analysis objects for backward compatibility.
 */
function getGunaVrddhiScope(word) {
  // Use shared validation first
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return []; // Return empty array for backward compatibility
  }

  // Use enhanced shared analysis
  const sharedAnalysis = sharedGetGunaVrddhiScope(word);
  
  // Add sutra-specific enhancements and return just the results array
  const sutraSpecificResults = sharedAnalysis.results.map(result => ({
    vowel: result.vowel,
    position: result.position,
    isIk: result.isIk,
    gunaForm: result.gunaForm,
    vrddhiForm: result.vrddhiForm,
    canTransform: result.canTransform,
    // Add sutra 1.1.3 specific analysis
    appliesTo113: result.isIk,
    sutraNote: result.isIk ? 
      'Subject to sutra 1.1.3 (iko guṇavṛddhī)' : 
      'Not in scope of sutra 1.1.3 (not an ik vowel)',
    transformations: {
      guna: result.isIk ? result.gunaForm : null,
      vrddhi: result.isIk ? result.vrddhiForm : null,
      reasoning: result.isIk ? 
        'ik vowel transforms according to guṇa/vṛddhi rules' :
        'Non-ik vowel not affected by standard guṇa/vṛddhi'
    }
  }));

  return sutraSpecificResults; // Return array for backward compatibility
}

/**
 * Enhanced scope analysis that returns full details (new API).
 *
 * @param {string} word The word to analyze (IAST or Devanagari).
 * @returns {Object} Complete analysis object with metadata.
 */
function getGunaVrddhiScopeDetailed(word) {
  // Use shared validation first
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return {
      word: word,
      error: validation.error,
      results: [],
      ikVowelCount: 0,
      transformableCount: 0
    };
  }

  // Use enhanced shared analysis
  const sharedAnalysis = sharedGetGunaVrddhiScope(word);
  
  // Add sutra-specific enhancements
  const sutraSpecificResults = sharedAnalysis.results.map(result => ({
    ...result,
    // Add sutra 1.1.3 specific analysis
    appliesTo113: result.isIk,
    sutraNote: result.isIk ? 
      'Subject to sutra 1.1.3 (iko guṇavṛddhī)' : 
      'Not in scope of sutra 1.1.3 (not an ik vowel)',
    transformations: {
      guna: result.isIk ? result.gunaForm : null,
      vrddhi: result.isIk ? result.vrddhiForm : null,
      reasoning: result.isIk ? 
        'ik vowel transforms according to guṇa/vṛddhi rules' :
        'Non-ik vowel not affected by standard guṇa/vṛddhi'
    }
  }));

  return {
    word: word,
    script: sharedAnalysis.script,
    results: sutraSpecificResults,
    ikVowelCount: sutraSpecificResults.filter(r => r.isIk).length,
    transformableCount: sharedAnalysis.transformableCount,
    totalVowels: sharedAnalysis.totalVowels,
    tokenization: sharedAnalysis.tokenization,
    sutraApplication: 'iko guṇavṛddhī (1.1.3)',
    scope: 'ik vowels only'
  };
}

/**
 * Convenience wrapper that extracts the first vowel and applies vṛddhi if it's an ik vowel.
 * If input is a single vowel, applies transformation directly.
 *
 * @param {string} input The word or vowel to process.
 * @returns {string|null} The vṛddhi form of the first ik vowel, or transformed vowel, or null.
 */
function getVrddhiForm(input) {
  // If input is a single vowel, apply transformation directly
  if (input && input.length <= 3 && isVowel(input)) {
    return applyVrddhiTransformation(input);
  }
  
  // Otherwise treat as word and get array result
  const scopeArray = getGunaVrddhiScope(input);
  
  if (!scopeArray || scopeArray.length === 0) {
    return null;
  }
  
  // Find first ik vowel
  const firstIkVowel = scopeArray.find(r => r.isIk);
  return firstIkVowel ? firstIkVowel.vrddhiForm : null;
}

/**
/**
 * Validates if a transformation is a proper vṛddhi transformation.
 *
 * @param {string} original The original vowel (IAST or Devanagari).
 * @param {string} transformed The transformed vowel (IAST or Devanagari).
 * @returns {boolean} True if it's a valid vṛddhi transformation.
 */
function isValidVrddhiTransformation(original, transformed) {
  if (!original || !transformed) return false;
  
  const expectedVrddhi = getVrddhiForm(original);
  return expectedVrddhi === transformed;
}

/**
/**
 * Checks if a given operation (guṇa or vṛddhi) is applicable to a vowel.
 *
 * @param {string} vowel The vowel to check (IAST or Devanagari).
 * @param {string} operation Either 'guna' or 'vrddhi'.
 * @returns {boolean} True if the operation is applicable, false otherwise.
 */
function isOperationApplicable(vowel, operation) {
  if (!sharedIsIkVowel(vowel)) {
    return false;
  }
  
  if (operation === 'guna') {
    return applyGunaToIk(vowel) !== null;
  } else if (operation === 'vrddhi') {
    return applyVrddhiToIk(vowel) !== null;
  }
  
  return false;
}

/**
 * Main educational analysis function - Core sutra implementation
 * 
 * @param {string} input - Vowel or word to analyze for ik vowel scope
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive educational analysis object
 */
function sutra113(input, context = {}) {
  // Input validation and normalization
  if (!input || typeof input !== 'string' || input.trim() === '') {
    return {
      hasIkVowels: false,
      sutraApplied: '1.1.3',
      confidence: 0.0,
      analysis: {
        error: 'Invalid input',
        traditionalCommentary: 'अशुद्धे पदे',
        modernExplanation: 'Input validation failed - input must be a non-empty string',
        educationalNote: 'प्रविष्टि परीक्षा विफलता (Input validation failure)'
      }
    };
  }

  try {
    const normalizedInput = input.trim();
    const scope = getGunaVrddhiScopeDetailed(normalizedInput);
    
    // Educational analysis object
    const analysis = {
      input: normalizedInput,
      script: scope.script,
      sutraApplied: '1.1.3',
      rule: 'इको गुणवृद्धी',
      meaning: 'Guṇa and vṛddhi operations apply to ik vowels (इ, उ, ऋ, ऌ)',
      
      traditionalCommentary: {
        primary: 'इकः इकारुकारऋकारऌकारा गुणवृद्धी भवतः। इकारादीनां स्थाने गुणवृद्धी आगच्छतः।',
        explanation: 'For the ik vowels (i, u, ṛ, ḷ), guṇa and vṛddhi come as substitutes. In place of i, u, ṛ, ḷ, the guṇa and vṛddhi forms appear.',
        authorityReference: 'महाभाष्य व सिद्धान्तकौमुदी - Mahābhāṣya and Siddhāntakaumudī',
        technicalPrinciple: 'परिभाषासूत्र - Interpretive meta-rule (paribhāṣā)'
      },
      
      modernExplanation: {
        grammaticalContext: 'Meta-rule defining scope of vowel strengthening operations',
        phoneticReasoning: 'Establishes systematic domain for morphophonemic transformations',
        functionalPurpose: 'Delimits default application of guṇa/vṛddhi to specific vowel class',
        linguisticSignificance: 'Creates predictable phonological alternation patterns',
        systematicImportance: 'Foundation for all morphological vowel modifications in Sanskrit'
      },
      
      ikVowelPrinciples: {
        definition: 'इक् (ik) - High vowels subject to strengthening',
        members: ['इ (i)', 'उ (u)', 'ऋ (ṛ)', 'ऌ (ḷ)'],
        systematicPosition: 'Simple vowels that undergo morphophonemic alternation',
        morphologicalFunction: 'Undergo strengthening in derivational and inflectional processes'
      },
      
      vowelClassification: {
        'इ (i)': {
          type: 'high_front',
          position: 'अग्रगामी उच्च (front high)',
          gunaForm: 'ए (e)',
          vrddhiForm: 'ऐ (ai)',
          examples: ['दिव् → देव (div → deva)', 'दिव् → दैव (div → daiva)']
        },
        'उ (u)': {
          type: 'high_back',
          position: 'पश्चगामी उच्च (back high)',
          gunaForm: 'ओ (o)',
          vrddhiForm: 'औ (au)',
          examples: ['युज् → योग (yuj → yoga)', 'युज् → यौग (yuj → yauga)']
        },
        'ऋ (ṛ)': {
          type: 'high_central',
          position: 'केन्द्रीय उच्च (central high)',
          gunaForm: 'अर् (ar)',
          vrddhiForm: 'आर् (ār)',
          examples: ['कृ → कर (kṛ → kar)', 'कृ → कार (kṛ → kār)']
        },
        'ऌ (ḷ)': {
          type: 'high_lateral',
          position: 'पार्श्विक उच्च (lateral high)',
          gunaForm: 'अल् (al)',
          vrddhiForm: 'आल् (āl)',
          examples: ['कऌप् → कल्प (kḷp → kalp)', 'कऌप् → काल्प (kḷp → kālp)']
        }
      },
      
      transformationPatterns: {
        gunaPattern: [
          { from: 'इ/ई (i/ī)', to: 'ए (e)', type: 'front_strengthening' },
          { from: 'उ/ऊ (u/ū)', to: 'ओ (o)', type: 'back_strengthening' },
          { from: 'ऋ/ॠ (ṛ/ṝ)', to: 'अर् (ar)', type: 'central_strengthening' },
          { from: 'ऌ/ॡ (ḷ/ḹ)', to: 'अल् (al)', type: 'lateral_strengthening' }
        ],
        vrddhiPattern: [
          { from: 'इ/ई (i/ī)', to: 'ऐ (ai)', type: 'front_diphthongization' },
          { from: 'उ/ऊ (u/ū)', to: 'औ (au)', type: 'back_diphthongization' },
          { from: 'ऋ/ॠ (ṛ/ṝ)', to: 'आर् (ār)', type: 'central_lengthening' },
          { from: 'ऌ/ॡ (ḷ/ḹ)', to: 'आल् (āl)', type: 'lateral_lengthening' }
        ]
      },
      
      examples: {
        morphologicalApplications: [
          { 
            operation: 'धातु गुण (root guṇa)', 
            example: 'कृ + अ → कर (kṛ + a → kar)',
            description: 'Root vowel ṛ becomes guṇa ar'
          },
          { 
            operation: 'धातु वृद्धि (root vṛddhi)', 
            example: 'कृ + तु → कार्तु (kṛ + tu → kārtu)',
            description: 'Root vowel ṛ becomes vṛddhi ār'
          },
          { 
            operation: 'प्रत्यय गुण (suffix guṇa)', 
            example: 'दिव् + य → देव्य (div + ya → devya)',
            description: 'Root vowel i becomes guṇa e'
          }
        ],
        wordFormation: [
          { base: 'कृ (kṛ)', derivation: 'कर्ता (kartā)', process: 'ṛ → ar (guṇa) + suffix' },
          { base: 'युज् (yuj)', derivation: 'योग (yoga)', process: 'u → o (guṇa) + suffix' },
          { base: 'दिव् (div)', derivation: 'देव (deva)', process: 'i → e (guṇa) + suffix' }
        ]
      },
      
      systematicRelations: {
        scopeDefinition: 'Defines precisely which vowels undergo guṇa/vṛddhi',
        defaultRule: 'Applies unless specifically overridden by other sutras',
        integrationWith111112: 'Works with 1.1.1-1.1.2 to create complete vowel system',
        morphologicalScope: 'Foundation for all derivational and inflectional vowel changes'
      },
      
      relatedSutras: {
        foundational: ['1.1.1 (vṛddhi definition)', '1.1.2 (guṇa definition)'],
        applications: ['7.3.84 (sārvadhātukārdhdhātukayoḥ)', '3.1.3 (ādy-antau ṭakitau)'],
        systematicRole: 'Meta-rule defining scope of vowel strengthening operations',
        interactionNote: 'Establishes default domain unless overridden by specific rules'
      }
    };

    // Analyze the results
    const ikVowels = scope.results ? scope.results.filter(r => r.isIk) : [];
    const hasIkVowels = ikVowels.length > 0;
    let detailedReasoning;
    
    if (hasIkVowels) {
      const vowelList = ikVowels.map(v => `${v.vowel} (pos: ${v.position})`).join(', ');
      detailedReasoning = `इक् स्वर पाये गये - Found ik vowels: ${vowelList}. Subject to guṇa/vṛddhi per 1.1.3`;
    } else {
      detailedReasoning = 'इक् स्वर नहीं - No ik vowels found. Sutra 1.1.3 does not apply';
    }

    return {
      hasIkVowels: hasIkVowels,
      sutraApplied: '1.1.3',
      confidence: 1.0,
      analysis: {
        ...analysis,
        result: hasIkVowels ? 'इक् स्वर उपस्थित (ik vowels present)' : 'इक् स्वर अनुपस्थित (no ik vowels)',
        detailedReasoning: detailedReasoning,
        ikVowelCount: ikVowels.length,
        totalVowels: scope.totalVowels || 0,
        scopeAnalysis: {
          applicableVowels: ikVowels.map(v => ({
            vowel: v.vowel,
            position: v.position,
            gunaForm: v.gunaForm,
            vrddhiForm: v.vrddhiForm,
            transformability: 'Subject to 1.1.3 operations'
          })),
          nonApplicableNote: hasIkVowels ? 
            'Other vowels in the word are not subject to standard guṇa/vṛddhi' :
            'No vowels in this input are subject to guṇa/vṛddhi per 1.1.3'
        },
        morphologicalImplication: hasIkVowels ? 
          'Input contains vowels that can undergo morphophonemic strengthening' :
          'Input does not contain vowels subject to standard morphophonemic operations',
        educationalNote: hasIkVowels ? 
          'Sutra 1.1.3 defines the scope for vowel strengthening operations in Sanskrit' :
          'Understanding sutra 1.1.3 scope helps identify which vowels participate in morphology'
      }
    };
    
  } catch (error) {
    return {
      hasIkVowels: false,
      sutraApplied: '1.1.3',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during ik vowel scope analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

/**
 * Applies Sutra 1.1.3 to identify ik vowels and their transformability.
 * Legacy function for backward compatibility.
 *
 * @param {string} word The word to analyze.
 * @returns {Object} Comprehensive analysis with sutra application details.
 */
function applySutra113(word) {
  const scope = getGunaVrddhiScopeDetailed(word);
  
  return {
    input: word,
    sutraApplied: '1.1.3',
    sutraName: 'iko guṇavṛddhī',
    scope: scope,
    ikVowelsFound: scope.ikVowelCount || 0,
    transformableVowels: scope.transformableCount || 0,
    explanation: `Sutra 1.1.3 establishes that guṇa and vṛddhi operations apply to ik vowels (${SanskritVowels.ik.iast.join(', ')})`,
    traditionalDefinition: 'In the absence of special instruction, guṇa/vṛddhi applies to ik vowels',
    examples: (scope.results || []).filter(r => r.isIk).map(r => ({
      vowel: r.vowel,
      position: r.position,
      guna: r.gunaForm,
      vrddhi: r.vrddhiForm
    }))
  };
}

// Export constants for backward compatibility
export const ikVowels = SanskritVowels.ik.iast;
export const ikVowelsDevanagari = SanskritVowels.ik.devanagari;

// Export functions - re-export shared utilities to maintain backward compatibility
export {
  applyGunaToIk,
  applyVrddhiToIk,
  getGunaVrddhiScope,
  getGunaVrddhiScopeDetailed,
  getVrddhiForm,
  applySutra113,  // Legacy function for backward compatibility
  sutra113,       // New Phase 3 comprehensive function
  isValidVrddhiTransformation,
  isOperationApplicable
};

// Re-export shared guṇa utilities
export { 
  getGunaForm, 
  applyGuna, 
  isValidGunaTransformation 
} from '../sanskrit-utils/guna-utilities.js';
