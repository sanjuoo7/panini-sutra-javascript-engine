/**
 * Sutra 1.2.29: उच्चैरुदात्तः (uccairudāttaḥ)
 * 
 * Sanskrit: उच्चैरुदात्तः
 * Transliteration: uccairudāttaḥ  
 * Translation: "The vowel that is perceived as having a high tone is called उदात्त or acutely accented"
 * 
 * This is a संज्ञा (definitional) sutra that establishes the technical term 
 * "उदात्त" (udātta) for vowels pronounced with high tone/acute accent in Vedic Sanskrit.
 * 
 * The sutra defines that when a vowel is pronounced उच्चैः (uccaiḥ - "in a high manner"),
 * it receives the designation उदात्त (udātta - "raised/elevated").
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.29 - Udātta accent definition
 */

import { 
  detectScript, 
  isVowel,
  analyzeVowelAccent,
  isUdatta as isUdattaShared,
  ACCENT_TYPES,
  applyUdatta,
  getAccentVariants
} from '../sanskrit-utils/index.js';

/**
 * Main function implementing Sutra 1.2.29
 * Determines if a vowel qualifies for उदात्त (udātta) designation
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Additional context for analysis
 * @param {string} context.script - Script type ('IAST' or 'Devanagari')
 * @param {boolean} context.strictAccentMarking - Whether to require explicit accent marks
 * @param {string} context.phoneticContext - Phonetic environment of the vowel
 * @param {boolean} context.detectHighTone - Whether to attempt high tone detection
 * @returns {Object} Analysis result indicating udātta qualification
 */
export function sutra1229(vowel, context = {}) {
  // Input validation
  if (!vowel || typeof vowel !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: vowel must be a non-empty string',
      sutra: '1.2.29',
      input: vowel
    };
  }

  const script = context.script || detectScript(vowel);
  const strictAccentMarking = context.strictAccentMarking || false;
  const phoneticContext = context.phoneticContext || '';
  const detectHighTone = context.detectHighTone || false;

  // Check if input contains a vowel
  const accentAnalysis = analyzeVowelAccent(vowel, { 
    script: script,
    strict: strictAccentMarking 
  });

  if (!accentAnalysis.isValid) {
    return {
      applies: false,
      reason: `Invalid vowel input: ${accentAnalysis.error}`,
      sutra: '1.2.29',
      input: vowel,
      analysis: accentAnalysis
    };
  }

  // Core udātta determination logic
  const udattaAnalysis = analyzeUdatta(accentAnalysis, phoneticContext, detectHighTone);

  return {
    applies: udattaAnalysis.isUdatta,
    reason: udattaAnalysis.reason,
    sutra: '1.2.29',
    designation: udattaAnalysis.isUdatta ? 'उदात्त' : null,
    input: vowel,
    baseVowel: accentAnalysis.baseVowel,
    script: script,
    accentMarks: accentAnalysis.accentMarks,
    phoneticContext: phoneticContext,
    analysis: {
      hasUdattaMark: accentAnalysis.isUdatta,
      accentType: accentAnalysis.accentType,
      toneHeight: udattaAnalysis.toneHeight,
      confidence: udattaAnalysis.confidence
    },
    examples: udattaAnalysis.isUdatta ? generateUdattaExamples(accentAnalysis.baseVowel, script) : null
  };
}

/**
 * Analyzes whether a vowel qualifies for udātta designation
 * Based on the principle: उच्चैः = high tone → उदात्त designation
 * 
 * @param {Object} accentAnalysis - Result from analyzeVowelAccent
 * @param {string} phoneticContext - Phonetic environment
 * @param {boolean} detectHighTone - Whether to attempt tone detection
 * @returns {Object} Udātta analysis result
 */
function analyzeUdatta(accentAnalysis, phoneticContext, detectHighTone) {
  // Priority 1: Explicit udātta accent mark
  if (accentAnalysis.isUdatta) {
    return {
      isUdatta: true,
      reason: 'Vowel has explicit udātta accent mark (उच्चैः स्वरित)',
      toneHeight: 'high',
      confidence: 1.0,
      method: 'explicit_marking'
    };
  }

  // Priority 2: Phonetic context analysis (if enabled)
  if (detectHighTone && phoneticContext) {
    const contextAnalysis = analyzePhoneticContext(phoneticContext, accentAnalysis.baseVowel);
    if (contextAnalysis.suggestsHighTone) {
      return {
        isUdatta: true,
        reason: `Phonetic context suggests high tone: ${contextAnalysis.reason}`,
        toneHeight: 'high',
        confidence: contextAnalysis.confidence,
        method: 'phonetic_context'
      };
    }
  }

  // Priority 3: Default analysis based on Paninian principles
  const defaultAnalysis = analyzeDefaultUdatta(accentAnalysis);
  
  return defaultAnalysis;
}

/**
 * Analyzes phonetic context for high tone indicators
 * 
 * @param {string} context - Phonetic environment
 * @param {string} baseVowel - The base vowel being analyzed
 * @returns {Object} Context analysis result
 */
function analyzePhoneticContext(context, baseVowel) {
  // Look for patterns that typically indicate high tone in Vedic Sanskrit
  const highToneIndicators = [
    /√.*\s*accent.*high/i,      // Root with high accent notation
    /udātta/i,                  // Explicit udātta mention
    /acute/i,                   // Acute accent indication
    /\u0301/,                   // Unicode acute accent
    /high.*tone/i               // High tone description
  ];

  for (const indicator of highToneIndicators) {
    if (indicator.test(context)) {
      return {
        suggestsHighTone: true,
        reason: `Context contains high tone indicator: ${indicator.source}`,
        confidence: 0.8
      };
    }
  }

  return {
    suggestsHighTone: false,
    reason: 'No high tone indicators found in phonetic context',
    confidence: 0.0
  };
}

/**
 * Default udātta analysis based on Paninian principles
 * 
 * @param {Object} accentAnalysis - Accent analysis result
 * @returns {Object} Default analysis result
 */
function analyzeDefaultUdatta(accentAnalysis) {
  // In non-strict mode, unmarked vowels default to svarita, not udātta
  if (accentAnalysis.accentType === null || accentAnalysis.accentType === ACCENT_TYPES.SVARITA) {
    return {
      isUdatta: false,
      reason: 'Vowel lacks explicit udātta marking (उच्चैः स्वराभाव)',
      toneHeight: 'neutral',
      confidence: 0.9,
      method: 'default_classification'
    };
  }

  // Anudātta is explicitly not udātta
  if (accentAnalysis.accentType === ACCENT_TYPES.ANUDATTA) {
    return {
      isUdatta: false,
      reason: 'Vowel has anudātta accent (नीचैः), opposite of udātta (उच्चैः)',
      toneHeight: 'low',
      confidence: 1.0,
      method: 'explicit_anudatta'
    };
  }

  return {
    isUdatta: false,
    reason: 'Vowel does not meet udātta criteria',
    toneHeight: 'unknown',
    confidence: 0.5,
    method: 'default'
  };
}

/**
 * Generates examples of udātta usage for a given vowel
 * 
 * @param {string} baseVowel - The base vowel
 * @param {string} script - Target script
 * @returns {Object} Examples object
 */
function generateUdattaExamples(baseVowel, script) {
  const variants = getAccentVariants(baseVowel, script);
  
  return {
    baseVowel: variants.base,
    udattaForm: variants.udatta,
    usage: `${variants.udatta} - vowel with udātta (high tone) accent`,
    description: 'This vowel receives उदात्त designation per Sutra 1.2.29 due to high tone pronunciation (उच्चैः)',
    traditionalExample: getTraditionalExample(baseVowel),
    script: script
  };
}

/**
 * Gets traditional examples of udātta usage from Vedic literature
 * 
 * @param {string} baseVowel - The base vowel
 * @returns {string} Traditional example
 */
function getTraditionalExample(baseVowel) {
  const examples = {
    'a': 'अग्ने́ - "O Agni" (vocative with udātta on final vowel)',
    'i': 'अग्नि́ - "fire" (with udātta marking)',
    'u': 'गुरु́ - "heavy/teacher" (with udātta marking)',
    'e': 'दे́व - "god" (with udātta marking)',
    'o': 'गो́ - "cow/bull" (with udātta marking)',
    'ā': 'मातā́ - "mother" (with udātta marking)',
    'ī': 'अग्नी́ - "fires" (dual with udātta)',
    'ū': 'भू́ - "earth/to be" (with udātta marking)',
    'ai': 'गै́ - "song" (with udātta marking)',
    'au': 'गौ́ - "cow" (with udātta marking)',
    'ṛ': 'पितṛ́ - "father" (with udātta marking)',
    'ṝ': 'पितṝ́ - "fathers" (with udātta marking)',
    'ḷ': 'कḷ́प्त - (theoretical example with udātta)'
  };
  
  return examples[baseVowel] || `${baseVowel}́ - example with udātta accent`;
}

/**
 * Convenience function: checks if a vowel is udātta according to Sutra 1.2.29
 * 
 * @param {string} vowel - The vowel to check
 * @param {Object} context - Additional context
 * @returns {boolean} True if vowel qualifies for udātta designation
 */
export function isUdatta(vowel, context = {}) {
  const result = sutra1229(vowel, context);
  return result.applies;
}

/**
 * Convenience function: applies udātta designation to a vowel
 * 
 * @param {string} vowel - The base vowel
 * @param {string} script - Target script ('IAST' or 'Devanagari')
 * @returns {string} Vowel with udātta accent applied
 */
export function applyUdattaDesignation(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel for udātta designation (Sutra 1.2.29)');
  }
  
  return applyUdatta(vowel, script);
}

/**
 * Gets comprehensive udātta analysis for a vowel
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeUdattaDesignation(vowel, context = {}) {
  const result = sutra1229(vowel, context);
  
  return {
    ...result,
    sutraReference: {
      number: '1.2.29',
      sanskrit: 'उच्चैरुदात्तः',
      transliteration: 'uccairudāttaḥ',
      translation: 'The vowel that is perceived as having a high tone is called उदात्त or acutely accented',
      type: 'संज्ञा (definitional)'
    },
    traditionalInterpretation: {
      principle: 'उच्चैः (high manner) → उदात्त (elevated designation)',
      scope: 'Applies to all vowels pronounced with high tone',
      usage: 'Fundamental for Vedic accent classification'
    }
  };
}

// Export the main function as default
export default sutra1229;
