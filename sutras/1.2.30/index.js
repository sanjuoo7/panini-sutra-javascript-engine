/**
 * Sutra 1.2.30: नीचैरनुदात्तः (nīcairanudāttaḥ)
 * 
 * Sanskrit: नीचैरनुदात्तः
 * Transliteration: nīcairanudāttaḥ  
 * Translation: "The vowel that is perceived as having a low tone is called अनुदात्त or gravely accented"
 * 
 * This is a संज्ञा (definitional) sutra that establishes the technical term 
 * "अनुदात्त" (anudātta) for vowels pronounced with low tone/grave accent in Vedic Sanskrit.
 * 
 * The sutra defines that when a vowel is pronounced नीचैः (nīcaiḥ - "in a low manner"),
 * it receives the designation अनुदात्त (anudātta - "not raised/unraised").
 * 
 * This sutra complements 1.2.29 (उच्चैरुदात्तः) by defining the opposite accent type.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.30 - Anudātta accent definition
 */

import { 
  detectScript, 
  isVowel,
  analyzeVowelAccent,
  isAnudatta as isAnudattaShared,
  ACCENT_TYPES,
  applyAnudatta,
  getAccentVariants
} from '../sanskrit-utils/index.js';

/**
 * Main function implementing Sutra 1.2.30
 * Determines if a vowel qualifies for अनुदात्त (anudātta) designation
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Additional context for analysis
 * @param {string} context.script - Script type ('IAST' or 'Devanagari')
 * @param {boolean} context.strictAccentMarking - Whether to require explicit accent marks
 * @param {string} context.phoneticContext - Phonetic environment of the vowel
 * @param {boolean} context.detectLowTone - Whether to attempt low tone detection
 * @returns {Object} Analysis result indicating anudātta qualification
 */
export function sutra1230(vowel, context = {}) {
  // Input validation
  if (!vowel || typeof vowel !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: vowel must be a non-empty string',
      sutra: '1.2.30',
      input: vowel
    };
  }

  const script = context.script || detectScript(vowel);
  const strictAccentMarking = context.strictAccentMarking || false;
  const phoneticContext = context.phoneticContext || '';
  const detectLowTone = context.detectLowTone || false;

  // Check if input contains a vowel
  const accentAnalysis = analyzeVowelAccent(vowel, { 
    script: script,
    strict: strictAccentMarking 
  });

  if (!accentAnalysis.isValid) {
    return {
      applies: false,
      reason: `Invalid vowel input: ${accentAnalysis.error}`,
      sutra: '1.2.30',
      input: vowel,
      analysis: accentAnalysis
    };
  }

  // Core anudātta determination logic
  const anudattaAnalysis = analyzeAnudatta(accentAnalysis, phoneticContext, detectLowTone);

  return {
    applies: anudattaAnalysis.isAnudatta,
    reason: anudattaAnalysis.reason,
    sutra: '1.2.30',
    designation: anudattaAnalysis.isAnudatta ? 'अनुदात्त' : null,
    input: vowel,
    baseVowel: accentAnalysis.baseVowel,
    script: script,
    accentMarks: accentAnalysis.accentMarks,
    phoneticContext: phoneticContext,
    analysis: {
      hasAnudattaMark: accentAnalysis.isAnudatta,
      accentType: accentAnalysis.accentType,
      toneHeight: anudattaAnalysis.toneHeight,
      confidence: anudattaAnalysis.confidence,
      method: anudattaAnalysis.method
    },
    examples: anudattaAnalysis.isAnudatta ? generateAnudattaExamples(accentAnalysis.baseVowel, script) : null
  };
}

/**
 * Analyzes whether a vowel qualifies for anudātta designation
 * Based on the principle: नीचैः = low tone → अनुदात्त designation
 * 
 * @param {Object} accentAnalysis - Result from analyzeVowelAccent
 * @param {string} phoneticContext - Phonetic environment
 * @param {boolean} detectLowTone - Whether to attempt tone detection
 * @returns {Object} Anudātta analysis result
 */
function analyzeAnudatta(accentAnalysis, phoneticContext, detectLowTone) {
  // Priority 1: Explicit anudātta accent mark
  if (accentAnalysis.isAnudatta) {
    return {
      isAnudatta: true,
      reason: 'Vowel has explicit anudātta accent mark (नीचैः स्वरित)',
      toneHeight: 'low',
      confidence: 1.0,
      method: 'explicit_marking'
    };
  }

  // Priority 2: Phonetic context analysis (if enabled)
  if (detectLowTone && phoneticContext) {
    const contextAnalysis = analyzePhoneticContextForLowTone(phoneticContext, accentAnalysis.baseVowel);
    if (contextAnalysis.suggestsLowTone) {
      return {
        isAnudatta: true,
        reason: `Phonetic context suggests low tone: ${contextAnalysis.reason}`,
        toneHeight: 'low',
        confidence: contextAnalysis.confidence,
        method: 'phonetic_context'
      };
    }
  }

  // Priority 3: Default analysis based on Paninian principles
  const defaultAnalysis = analyzeDefaultAnudatta(accentAnalysis);
  
  return defaultAnalysis;
}

/**
 * Analyzes phonetic context for low tone indicators
 * 
 * @param {string} context - Phonetic environment
 * @param {string} baseVowel - The base vowel being analyzed
 * @returns {Object} Context analysis result
 */
function analyzePhoneticContextForLowTone(context, baseVowel) {
  // Look for patterns that typically indicate low tone in Vedic Sanskrit
  const lowToneIndicators = [
    /√.*\s*accent.*low/i,       // Root with low accent notation
    /anudātta/i,                // Explicit anudātta mention
    /grave/i,                   // Grave accent indication
    /\u0300/,                   // Unicode grave accent
    /low.*tone/i,               // Low tone description
    /unaccented/i,              // Unaccented (often anudātta)
    /unstressed/i               // Unstressed (often anudātta)
  ];

  for (const indicator of lowToneIndicators) {
    if (indicator.test(context)) {
      return {
        suggestsLowTone: true,
        reason: `Context contains low tone indicator: ${indicator.source}`,
        confidence: 0.8
      };
    }
  }

  return {
    suggestsLowTone: false,
    reason: 'No low tone indicators found in phonetic context',
    confidence: 0.0
  };
}

/**
 * Default anudātta analysis based on Paninian principles
 * 
 * @param {Object} accentAnalysis - Accent analysis result
 * @returns {Object} Default analysis result
 */
function analyzeDefaultAnudatta(accentAnalysis) {
  // Udātta is explicitly not anudātta (opposite accents)
  if (accentAnalysis.accentType === ACCENT_TYPES.UDATTA) {
    return {
      isAnudatta: false,
      reason: 'Vowel has udātta accent (उच्चैः), opposite of anudātta (नीचैः)',
      toneHeight: 'high',
      confidence: 1.0,
      method: 'explicit_udatta'
    };
  }

  // Svarita is neither udātta nor anudātta (combined accent)
  if (accentAnalysis.accentType === ACCENT_TYPES.SVARITA) {
    return {
      isAnudatta: false,
      reason: 'Vowel has svarita accent (समाहार), distinct from anudātta (नीचैः)',
      toneHeight: 'circumflex',
      confidence: 0.9,
      method: 'explicit_svarita'
    };
  }

  // In non-strict mode, unmarked vowels may default to svarita, not anudātta
  // But we need to distinguish truly unmarked vowels from those with svarita marking
  if (accentAnalysis.accentMarks && accentAnalysis.accentMarks.length === 0) {
    return {
      isAnudatta: false,
      reason: 'Vowel lacks explicit anudātta marking (नीचैः स्वराभाव)',
      toneHeight: 'neutral',
      confidence: 0.9,
      method: 'default_classification'
    };
  }

  // If we reach here, it's likely a svarita by default
  return {
    isAnudatta: false,
    reason: 'Vowel defaults to svarita accent, not anudātta (नीचैः)',
    toneHeight: 'circumflex',
    confidence: 0.8,
    method: 'default_svarita'
  };
}

/**
 * Generates examples of anudātta usage for a given vowel
 * 
 * @param {string} baseVowel - The base vowel
 * @param {string} script - Target script
 * @returns {Object} Examples object
 */
function generateAnudattaExamples(baseVowel, script) {
  const variants = getAccentVariants(baseVowel, script);
  
  return {
    baseVowel: variants.base,
    anudattaForm: variants.anudatta,
    usage: `${variants.anudatta} - vowel with anudātta (low tone) accent`,
    description: 'This vowel receives अनुदात्त designation per Sutra 1.2.30 due to low tone pronunciation (नीचैः)',
    traditionalExample: getTraditionalAnudattaExample(baseVowel),
    script: script
  };
}

/**
 * Gets traditional examples of anudātta usage from Vedic literature
 * 
 * @param {string} baseVowel - The base vowel
 * @returns {string} Traditional example
 */
function getTraditionalAnudattaExample(baseVowel) {
  const examples = {
    'a': 'तव̀ - "thy/your" (possessive with anudātta)',
    'i': 'अग्नि̀ - "fire" (in certain contexts with anudātta)',
    'u': 'गुरù - "heavy" (in certain formations)',
    'e': 'दे̀व - "god" (in unaccented contexts)',
    'o': 'गò - "cow" (in certain grammatical forms)',
    'ā': 'मातā̀ - "mother" (in certain cases)',
    'ī': 'अग्नī̀ - "fires" (in certain contexts)',
    'ū': 'भū̀ - "earth" (in certain derivatives)',
    'ai': 'गaì - "song" (in certain contexts)',
    'au': 'गaù - "cow" (in certain forms)',
    'ṛ': 'पितṛ̀ - "father" (in certain contexts)',
    'ṝ': 'पितṝ̀ - "fathers" (in certain forms)',
    'ḷ': 'कḷ̀प्त - (theoretical example with anudātta)'
  };
  
  return examples[baseVowel] || `${baseVowel}̀ - example with anudātta accent`;
}

/**
 * Convenience function: checks if a vowel is anudātta according to Sutra 1.2.30
 * 
 * @param {string} vowel - The vowel to check
 * @param {Object} context - Additional context
 * @returns {boolean} True if vowel qualifies for anudātta designation
 */
export function isAnudatta(vowel, context = {}) {
  const result = sutra1230(vowel, context);
  return result.applies;
}

/**
 * Convenience function: applies anudātta designation to a vowel
 * 
 * @param {string} vowel - The base vowel
 * @param {string} script - Target script ('IAST' or 'Devanagari')
 * @returns {string} Vowel with anudātta accent applied
 */
export function applyAnudattaDesignation(vowel, script = 'IAST') {
  if (!isVowel(vowel)) {
    throw new Error('Input must be a vowel for anudātta designation (Sutra 1.2.30)');
  }
  
  return applyAnudatta(vowel, script);
}

/**
 * Gets comprehensive anudātta analysis for a vowel
 * 
 * @param {string} vowel - The vowel to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeAnudattaDesignation(vowel, context = {}) {
  const result = sutra1230(vowel, context);
  
  return {
    ...result,
    sutraReference: {
      number: '1.2.30',
      sanskrit: 'नीचैरनुदात्तः',
      transliteration: 'nīcairanudāttaḥ',
      translation: 'The vowel that is perceived as having a low tone is called अनुदात्त or gravely accented',
      type: 'संज्ञा (definitional)'
    },
    traditionalInterpretation: {
      principle: 'नीचैः (low manner) → अनुदात्त (unraised designation)',
      scope: 'Applies to all vowels pronounced with low tone',
      usage: 'Fundamental for Vedic accent classification',
      relationship: 'Opposite of udātta (1.2.29), distinct from svarita (1.2.31)'
    }
  };
}

// Export the main function as default
export default sutra1230;
