/**
 * Sutra 1.2.31: समाहारः स्वरितः (samāhāraḥ svaritaḥ)
 * 
 * Sanskrit: समाहारः स्वरितः
 * Transliteration: samāhāraḥ svaritaḥ  
 * Translation: "The combination (of udātta and anudātta) is called स्वरित or circumflex accented"
 * 
 * This is a संज्ञा (definitional) sutra that establishes the technical term 
 * "स्वरित" (svarita) for vowels that represent a combination or synthesis 
 * of high tone (udātta) and low tone (anudātta) accents in Vedic Sanskrit.
 * 
 * The sutra defines that when there is समाहार (samāhāra - "combination/synthesis") 
 * of the two primary accents, it receives the designation स्वरित (svarita - "sounded").
 * 
 * This completes the three-fold accent classification system of Vedic Sanskrit:
 * 1. उदात्त (udātta) - high tone
 * 2. अनुदात्त (anudātta) - low tone  
 * 3. स्वरित (svarita) - combined/circumflex tone
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.31 - Svarita accent definition
 */

import { 
  detectScript, 
  isVowel,
  analyzeVowelAccent,
  isSvarita as isSvaritaShared,
  ACCENT_TYPES,
  applySvarita,
  getAccentVariants
} from '../sanskrit-utils/index.js';

/**
 * Main function implementing Sutra 1.2.31
 * Determines if a vowel qualifies for स्वरित (svarita) designation
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Additional context for analysis
 * @param {string} context.script - Script type ('IAST' or 'Devanagari')
 * @param {boolean} context.strictAccentMarking - Whether to require explicit accent marks
 * @param {string} context.phoneticContext - Phonetic environment of the vowel
 * @param {boolean} context.detectCombinedTone - Whether to attempt combined tone detection
 * @param {boolean} context.allowUnmarkedSvarita - Whether unmarked vowels default to svarita
 * @returns {Object} Analysis result indicating svarita qualification
 */
export function sutra1231(vowel, context = {}) {
  // Input validation
  if (!vowel || typeof vowel !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: vowel must be a non-empty string',
      sutra: '1.2.31',
      input: vowel
    };
  }

  const script = context.script || detectScript(vowel);
  const strictAccentMarking = context.strictAccentMarking || false;
  const phoneticContext = context.phoneticContext || '';
  const detectCombinedTone = context.detectCombinedTone || false;
  const allowUnmarkedSvarita = context.allowUnmarkedSvarita !== undefined ? context.allowUnmarkedSvarita : true;

  // Check if input contains a vowel
  const accentAnalysis = analyzeVowelAccent(vowel, { 
    script: script,
    strict: !allowUnmarkedSvarita  // When svarita is not allowed for unmarked vowels, use strict mode
  });

  if (!accentAnalysis.isValid) {
    return {
      applies: false,
      reason: `Invalid vowel input: ${accentAnalysis.error}`,
      sutra: '1.2.31',
      input: vowel,
      analysis: accentAnalysis
    };
  }

  // Core svarita determination logic
  const svaritaAnalysis = analyzeSvarita(
    accentAnalysis, 
    phoneticContext, 
    detectCombinedTone, 
    allowUnmarkedSvarita
  );

  return {
    applies: svaritaAnalysis.isSvarita,
    reason: svaritaAnalysis.reason,
    sutra: '1.2.31',
    designation: svaritaAnalysis.isSvarita ? 'स्वरित' : null,
    input: vowel,
    baseVowel: accentAnalysis.baseVowel,
    script: script,
    accentMarks: accentAnalysis.accentMarks,
    phoneticContext: phoneticContext,
    analysis: {
      hasSvaritaMark: accentAnalysis.isSvarita,
      accentType: accentAnalysis.accentType,
      toneHeight: svaritaAnalysis.toneHeight,
      combinationType: svaritaAnalysis.combinationType,
      confidence: svaritaAnalysis.confidence,
      method: svaritaAnalysis.method
    },
    examples: svaritaAnalysis.isSvarita ? generateSvaritaExamples(accentAnalysis.baseVowel, script) : null
  };
}

/**
 * Analyzes whether a vowel qualifies for svarita designation
 * Based on the principle: समाहार (combination) → स्वरित designation
 * 
 * @param {Object} accentAnalysis - Result from analyzeVowelAccent
 * @param {string} phoneticContext - Phonetic environment
 * @param {boolean} detectCombinedTone - Whether to attempt tone combination detection
 * @param {boolean} allowUnmarkedSvarita - Whether unmarked vowels default to svarita
 * @returns {Object} Svarita analysis result
 */
function analyzeSvarita(accentAnalysis, phoneticContext, detectCombinedTone, allowUnmarkedSvarita) {
  // Priority 1: Explicit svarita accent mark (only if there are actual marks)
  if (accentAnalysis.isSvarita && accentAnalysis.accentMarks.length > 0) {
    return {
      isSvarita: true,
      reason: 'Vowel has explicit svarita accent mark (समाहार स्वरित)',
      toneHeight: 'circumflex',
      combinationType: 'explicit_circumflex',
      confidence: 1.0,
      method: 'explicit_marking'
    };
  }

  // Priority 2: Combined tone detection (if enabled)
  if (detectCombinedTone && phoneticContext) {
    const combinationAnalysis = analyzePhoneticContextForCombination(phoneticContext, accentAnalysis.baseVowel);
    if (combinationAnalysis.suggestsCombination) {
      return {
        isSvarita: true,
        reason: `Phonetic context suggests tone combination: ${combinationAnalysis.reason}`,
        toneHeight: 'circumflex',
        combinationType: combinationAnalysis.combinationType,
        confidence: combinationAnalysis.confidence,
        method: 'phonetic_combination'
      };
    }
  }

  // Priority 3: Handle unmarked vowels with svarita type assignment (from non-strict mode)
  if (accentAnalysis.accentType === ACCENT_TYPES.SVARITA && accentAnalysis.accentMarks.length === 0) {
    // This is an unmarked vowel that was assigned svarita type by the accent analyzer
    // We need to respect the allowUnmarkedSvarita setting here
    return analyzeUnmarkedVowelForSvarita(accentAnalysis, allowUnmarkedSvarita);
  }

  // Priority 4: Explicit udātta or anudātta (not svarita)
  if (accentAnalysis.accentType === ACCENT_TYPES.UDATTA) {
    return {
      isSvarita: false,
      reason: 'Vowel has udātta accent (उच्चैः), not combined tone (समाहार)',
      toneHeight: 'high',
      combinationType: 'simple_udatta',
      confidence: 1.0,
      method: 'explicit_udatta'
    };
  }

  if (accentAnalysis.accentType === ACCENT_TYPES.ANUDATTA) {
    return {
      isSvarita: false,
      reason: 'Vowel has anudātta accent (नीचैः), not combined tone (समाहार)',
      toneHeight: 'low',
      combinationType: 'simple_anudatta',
      confidence: 1.0,
      method: 'explicit_anudatta'
    };
  }

  // Priority 5: Unmarked vowels - default analysis
  return analyzeUnmarkedVowelForSvarita(accentAnalysis, allowUnmarkedSvarita);
}

/**
 * Analyzes phonetic context for tone combination indicators
 * 
 * @param {string} context - Phonetic environment
 * @param {string} baseVowel - The base vowel being analyzed
 * @returns {Object} Combination analysis result
 */
function analyzePhoneticContextForCombination(context, baseVowel) {
  // Look for patterns that indicate tone combination in Vedic Sanskrit
  const combinationIndicators = [
    {
      pattern: /svarita/i,
      type: 'explicit_svarita',
      confidence: 0.9,
      reason: 'Explicit svarita mention'
    },
    {
      pattern: /circumflex/i,
      type: 'circumflex_accent',
      confidence: 0.85,
      reason: 'Circumflex accent indication'
    },
    {
      pattern: /\u0302/,
      type: 'unicode_circumflex',
      confidence: 0.9,
      reason: 'Unicode circumflex accent'
    },
    {
      pattern: /combined.*tone/i,
      type: 'combined_tone',
      confidence: 0.8,
      reason: 'Combined tone description'
    },
    {
      pattern: /high.*low|low.*high/i,
      type: 'tone_sequence',
      confidence: 0.75,
      reason: 'High-low tone sequence'
    },
    {
      pattern: /udātta.*anudātta|anudātta.*udātta/i,
      type: 'accent_combination',
      confidence: 0.8,
      reason: 'Udātta-anudātta combination'
    },
    {
      pattern: /falling.*tone|rising.*falling/i,
      type: 'contour_tone',
      confidence: 0.7,
      reason: 'Contour tone pattern'
    }
  ];

  for (const indicator of combinationIndicators) {
    if (indicator.pattern.test(context)) {
      return {
        suggestsCombination: true,
        reason: indicator.reason,
        combinationType: indicator.type,
        confidence: indicator.confidence
      };
    }
  }

  return {
    suggestsCombination: false,
    reason: 'No combination indicators found in phonetic context',
    combinationType: 'no_combination',
    confidence: 0.0
  };
}

/**
 * Analyzes unmarked vowels for svarita designation
 * According to traditional interpretation, unmarked vowels often default to svarita
 * 
 * @param {Object} accentAnalysis - Accent analysis result
 * @param {boolean} allowUnmarkedSvarita - Whether to allow unmarked svarita
 * @returns {Object} Analysis result for unmarked vowels
 */
function analyzeUnmarkedVowelForSvarita(accentAnalysis, allowUnmarkedSvarita) {
  if (allowUnmarkedSvarita) {
    return {
      isSvarita: true,
      reason: 'Unmarked vowel defaults to svarita (स्वरितस्वभाव) in traditional interpretation',
      toneHeight: 'neutral_circumflex',
      combinationType: 'default_svarita',
      confidence: 0.7,
      method: 'default_unmarked'
    };
  } else {
    return {
      isSvarita: false,
      reason: 'Unmarked vowel lacks explicit svarita marking (समाहाराभाव)',
      toneHeight: 'neutral',
      combinationType: 'unmarked',
      confidence: 0.8,
      method: 'strict_marking'
    };
  }
}

/**
 * Generates examples of svarita usage for a given vowel
 * 
 * @param {string} baseVowel - The base vowel
 * @param {string} script - Target script
 * @returns {Object} Examples object
 */
function generateSvaritaExamples(baseVowel, script) {
  const variants = getAccentVariants(baseVowel, script);
  
  return {
    baseVowel: variants.base,
    svaritaForm: variants.svarita,
    usage: `${variants.svarita} - vowel with svarita (combined tone) accent`,
    description: 'This vowel receives स्वरित designation per Sutra 1.2.31 due to tone combination (समाहार)',
    traditionalExample: getTraditionalSvaritaExample(baseVowel),
    combinationPattern: getSvaritaCombinationPattern(baseVowel),
    script: script
  };
}

/**
 * Gets traditional examples of svarita usage from Vedic literature
 * 
 * @param {string} baseVowel - The base vowel
 * @returns {string} Traditional example
 */
function getTraditionalSvaritaExample(baseVowel) {
  const examples = {
    'a': 'अ͡ग्नि - "Agni" (often with svarita in vocative)',
    'i': 'इ͡न्द्र - "Indra" (deity name with svarita)',
    'u': 'उ͡ष्ण - "hot" (adjective with svarita)',
    'e': 'ए͡क - "one" (numeral with svarita)',
    'o': 'ओ͡म् - "Om" (sacred syllable with svarita)',
    'ā': 'आ͡त्मन् - "self" (philosophical term)',
    'ī': 'ई͡श - "lord" (title with svarita)',
    'ū': 'ऊ͡ष्मन् - "heat" (abstract noun)',
    'ai': 'अ͡इ - diphthong with svarita combination',
    'au': 'अ͡उ - diphthong with svarita combination',
    'ṛ': 'ऋ͡षि - "sage" (with svarita accent)',
    'ṝ': 'ॠ͡ - long ṛ with svarita (rare)',
    'ḷ': 'ऌ͡ - theoretical svarita example'
  };
  
  return examples[baseVowel] || `${baseVowel}͡ - example with svarita accent`;
}

/**
 * Describes the tone combination pattern for svarita
 * 
 * @param {string} baseVowel - The base vowel
 * @returns {string} Combination pattern description
 */
function getSvaritaCombinationPattern(baseVowel) {
  return `The svarita accent on ${baseVowel} represents समाहार (combination) of udātta (high) and anudātta (low) tones, typically realized as a falling or circumflex contour.`;
}

/**
 * Convenience function: checks if a vowel is svarita according to Sutra 1.2.31
 * 
 * @param {string} vowel - The vowel to check
 * @param {Object} context - Additional context
 * @returns {boolean} True if vowel qualifies for svarita designation
 */
export function isSvarita(vowel, context = {}) {
  const result = sutra1231(vowel, context);
  return result.applies;
}

/**
 * Convenience function: applies svarita designation to a vowel
 * 
 * @param {string} vowel - The base vowel
 * @param {string} script - Target script ('IAST' or 'Devanagari')
 * @returns {string} Vowel with svarita accent applied
 */
export function applySvaritaDesignation(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel for svarita designation (Sutra 1.2.31)');
  }
  
  return applySvarita(vowel, script);
}

/**
 * Gets comprehensive svarita analysis for a vowel
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeSvaritaDesignation(vowel, context = {}) {
  const result = sutra1231(vowel, context);
  
  return {
    ...result,
    sutraReference: {
      number: '1.2.31',
      sanskrit: 'समाहारः स्वरितः',
      transliteration: 'samāhāraḥ svaritaḥ',
      translation: 'The combination (of udātta and anudātta) is called स्वरित or circumflex accented',
      type: 'संज्ञा (definitional)'
    },
    traditionalInterpretation: {
      principle: 'समाहार (combination) → स्वरित (sounded designation)',
      scope: 'Applies to vowels combining high and low tones',
      usage: 'Completes three-fold Vedic accent system',
      relationship: 'Synthesis of udātta (1.2.29) and anudātta (1.2.30)'
    },
    accentSystem: {
      udatta: 'उदात्त - high tone (उच्चैः)',
      anudatta: 'अनुदात्त - low tone (नीचैः)', 
      svarita: 'स्वरित - combined tone (समाहार)',
      relationship: 'Complete three-way accent classification'
    }
  };
}

/**
 * Analyzes accent trilogy completion (used with sutras 1.2.29-1.2.31)
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Complete accent system analysis
 */
export async function analyzeAccentTrilogyClassification(vowel, context = {}) {
  // Import related sutra functions using dynamic imports
  const { sutra1229 } = await import('../1.2.29/index.js');
  const { sutra1230 } = await import('../1.2.30/index.js');
  
  const udattaResult = sutra1229(vowel, context);
  const anudattaResult = sutra1230(vowel, context);
  const svaritaResult = sutra1231(vowel, context);
  
  // Determine primary classification
  let primaryClassification = 'unclassified';
  let confidence = 0;
  
  if (udattaResult.applies) {
    primaryClassification = 'udātta';
    confidence = udattaResult.analysis.confidence;
  } else if (anudattaResult.applies) {
    primaryClassification = 'anudātta';
    confidence = anudattaResult.analysis.confidence;
  } else if (svaritaResult.applies) {
    primaryClassification = 'svarita';
    confidence = svaritaResult.analysis.confidence;
  }
  
  return {
    vowel: vowel,
    primaryClassification: primaryClassification,
    confidence: confidence,
    sutraResults: {
      '1.2.29': udattaResult,
      '1.2.30': anudattaResult,
      '1.2.31': svaritaResult
    },
    accentSystemComplete: {
      udatta: udattaResult.applies,
      anudatta: anudattaResult.applies,
      svarita: svaritaResult.applies
    },
    traditionalClassification: {
      system: 'Vedic three-fold accent system',
      principles: [
        'उच्चैरुदात्तः (1.2.29) - high tone classification',
        'नीचैरनुदात्तः (1.2.30) - low tone classification',
        'समाहारः स्वरितः (1.2.31) - combined tone classification'
      ]
    }
  };
}

// Export the main function as default
export default sutra1231;
