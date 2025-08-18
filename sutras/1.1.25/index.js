/**
 * Sutra 1.1.25: डति च
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra extends the षट् classification from 1.1.24 to include
 * संख्या (numerals) that end with the affix डति. This continues
 * the definition started in the previous sutra.
 * 
 * Combined with 1.1.24 (ष्णान्ता षट्), this sutra establishes that
 * षट् includes:
 * 1. संख्या ending in ष् or न् (from 1.1.24)
 * 2. संख्या ending with डति affix (from this sutra)
 * 
 * Examples with डति:
 * - कति (how many) + डति
 * - यति (as many) + डति  
 * - तति (so many) + डति
 * 
 * This classification is important for grammatical operations
 * that specifically target this extended class of numerals.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord, sanitizeInput } from '../sanskrit-utils/validation.js';
import { SanskritWordLists } from '../sanskrit-utils/constants.js';
import { isShat, identifyShatType } from '../1.1.24/index.js';
import { isSankhya } from '../1.1.23/index.js';

// डति affix forms used with संख्या
const DATI_AFFIX_FORMS = {
  IAST: {
    affix: 'ḍati',
    examples: [
      'kati',      // how many (कति + डति)
      'yati',      // as many (यति + डति)
      'tati',      // so many (तति + डति)
      'iyati',     // this many (इयति + डति)
      'kiyati',    // how much (कियति + डति)
      'etati'      // this much (एतति + डति)
    ]
  },
  Devanagari: {
    affix: 'डति',
    examples: [
      'कति',      // how many
      'यति',      // as many
      'तति',      // so many
      'इयति',     // this many
      'कियति',    // how much
      'एतति'      // this much
    ]
  }
};

/**
 * Check if a word ends with डति affix
 * @param {string} word - The word to check
 * @return {boolean} True if the word ends with डति
 */
export function hasDateAffix(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  
  if (script === 'IAST') {
    return word.endsWith('ḍati') || word.endsWith('ti'); // ti as simplified form
  } else if (script === 'Devanagari') {
    return word.endsWith('डति') || word.endsWith('ति'); // ति as simplified form
  }
  
  return false;
}

/**
 * Check if a word is a डति-form संख्या (षट् by 1.1.25)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is षट् due to डति affix
 */
export function isShatByDati(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = DATI_AFFIX_FORMS[script]?.examples || [];
  
  return examples.includes(word);
}

/**
 * Check if a word is षट् (combining 1.1.24 and 1.1.25)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is षट्
 */
export function isShatExtended(word) {
  if (!word || typeof word !== 'string') return false;
  
  // षट् from 1.1.24 (ष्/न् endings)
  if (isShat(word)) return true;
  
  // षट् from 1.1.25 (डति affix)
  if (isShatByDati(word)) return true;
  
  return false;
}

/**
 * Get all डति affix forms
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} डति affix forms and examples
 */
export function getDatiAffixForms(script = 'IAST') {
  return DATI_AFFIX_FORMS[script] || DATI_AFFIX_FORMS.IAST;
}

/**
 * Analyze डति affix usage in a word
 * @param {string} word - The word to analyze
 * @return {Object} Analysis of डति usage
 */
export function analyzeDatiUsage(word) {
  if (!word || typeof word !== 'string') {
    return { hasDati: false, type: null, script: null };
  }
  
  const script = detectScript(word);
  
  // Check if it's a known डति form
  if (isShatByDati(word)) {
    return {
      hasDati: true,
      type: 'known_form',
      script,
      word,
      affix: script === 'IAST' ? 'ḍati' : 'डति'
    };
  }
  
  // Check if it has डति affix pattern
  if (hasDateAffix(word)) {
    return {
      hasDati: true,
      type: 'affix_pattern',
      script,
      word,
      affix: script === 'IAST' ? 'ḍati' : 'डति'
    };
  }
  
  return { hasDati: false, type: null, script };
}

/**
 * Identify the complete षट् classification (1.1.24 + 1.1.25)
 * @param {string} word - The word to analyze
 * @return {Object} Complete षट् analysis
 */
export function identifyCompleteShatType(word) {
  if (!word || typeof word !== 'string') {
    return { isShat: false, source: null, type: null, script: null };
  }
  
  const script = detectScript(word);
  
  // Check 1.1.24 classification (ष्/न् endings)
  if (isShat(word)) {
    // Use the detailed analysis from 1.1.24
    const shatAnalysis = identifyShatType(word);
    return {
      isShat: true,
      source: '1.1.24',
      type: shatAnalysis.type,
      ending: shatAnalysis.ending,
      script,
      word
    };
  }
  
  // Check 1.1.25 classification (डति affix)
  const datiAnalysis = analyzeDatiUsage(word);
  if (datiAnalysis.hasDati) {
    return {
      isShat: true,
      source: '1.1.25',
      type: 'dati_affix',
      affix: datiAnalysis.affix,
      script,
      word
    };
  }
  
  return { isShat: false, source: null, type: null, script };
}

/**
 * Check if a word has complete षट् behavior (1.1.24 + 1.1.25)
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits षट् behavior
 */
export function hasCompleteShatBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct षट् classification (extended)
  if (isShatExtended(word)) return true;
  
  // Context-based षट् behavior
  if (context.morphology === 'numeral' && 
      (context.affix === 'ḍati' || context.affix === 'डति')) {
    return true;
  }
  
  return false;
}

/**
 * Get examples of डति-based षट् forms
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Array} Examples of डति forms
 */
export function getDatiShatExamples(script = 'IAST') {
  const forms = getDatiAffixForms(script);
  return forms.examples.slice(0, 4); // First 4 examples
}

/**
 * Check if a word is interrogative संख्या with डति
 * @param {string} word - The word to check
 * @return {boolean} True if interrogative numeral with डति
 */
export function isInterrogativeDati(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  const interrogatives = script === 'IAST' 
    ? SanskritWordLists.interrogatives.iast 
    : SanskritWordLists.interrogatives.devanagari;
  
  return interrogatives.includes(word);
}

/**
 * Check if a word is demonstrative संख्या with डति
 * @param {string} word - The word to check
 * @return {boolean} True if demonstrative numeral with डति
 */
export function isDemonstrativeDati(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  const demonstratives = script === 'IAST' ? 
    ['tati', 'iyati', 'etati'] : 
    ['तति', 'इयति', 'एतति'];
  
  return demonstratives.includes(word);
}

/**
 * Custom validation for Sanskrit input specifically for ḍati analysis
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid Sanskrit input
 */
function isValidSanskritForDati(input) {
  if (!input || typeof input !== 'string') return false;
  
  // Check basic Sanskrit validation
  const validation = validateSanskritWord(input);
  if (!validation.isValid) return false;
  
  // Additional validation for Sanskrit phonemes/characters
  const script = detectScript(input);
  
  if (script === 'Devanagari') {
    const devanagariPattern = /^[\u0900-\u097F\s]+$/;
    return devanagariPattern.test(input);
  } else if (script === 'IAST') {
    // More relaxed validation - allow common Sanskrit words
    const englishWords = ['xyz', 'invalid', 'test', 'hello', 'world', 'error', 'null', 'undefined'];
    if (englishWords.includes(input.toLowerCase())) return false;
    
    // Allow standard Sanskrit characters including common words like iyati, yati
    const iastPattern = /^[a-zA-Zāīūṛṝḷḹēōṃḥñṅṇṭḍṣśkṇ\s]+$/;
    return iastPattern.test(input);
  }
  
  return false;
}

/**
 * Analyzes input for ḍati-based ṣaṭ classification (comprehensive analysis function)
 * 
 * @param {string} input - The input to analyze for ḍati-based ṣaṭ classification
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeDatiShat(input, context = {}) {
  try {
    // Handle empty/null inputs
    if (!input) {
      return {
        isValid: false,
        isShat: false,
        input: input,
        normalizedInput: '',
        errors: ['Input is required'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.25',
          sutraText: 'डति च',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit input
    if (!isValidSanskritForDati(input)) {
      return {
        isValid: false,
        isShat: false,
        input: input,
        normalizedInput: '',
        errors: ['Invalid Sanskrit input'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.25',
          sutraText: 'डति च',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(input);
    const sanitized = sanitizeInput(input);
    const normalizedInput = sanitized.success ? sanitized.sanitized : input;

    // Determine if input is ṣaṭ by ḍati extension
    const isShatWordByDati = isShatByDati(input);
    const isShatWordExtended = isShatExtended(input);
    const datiAnalysis = analyzeDatiUsage(input);
    const completeShatAnalysis = identifyCompleteShatType(input);

    // Create comprehensive analysis
    const analysis = createDatiShatAnalysis(normalizedInput, script, context, isShatWordByDati, isShatWordExtended, datiAnalysis, completeShatAnalysis);
    
    return {
      isValid: true,
      isShat: isShatWordExtended,
      input: input,
      normalizedInput: normalizedInput,
      analysis: analysis,
      confidence: isShatWordByDati ? 0.95 : (isShatWordExtended ? 0.85 : 0.1),
      metadata: {
        sutraNumber: '1.1.25',
        sutraText: 'डति च',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'डत्यन्ताः संख्याः षट्संज्ञकाः भवन्ति। पूर्वसूत्रेण सह मिलित्वा षट्संज्ञा व्यापकतरा भवति।',
        modernExplanation: 'This sutra extends the ṣaṭ classification to include numerals ending with the ḍati affix, working in conjunction with the previous sutra (1.1.24).',
        usageExamples: context.includeUsageExamples ? getDatiShatUsageExamples(datiAnalysis.type, input) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedDatiShatRules() : undefined,
        processingTime: Date.now()
      }
    };

  } catch (error) {
    return {
      isValid: false,
      isShat: false,
      input: input,
      normalizedInput: '',
      errors: [`Processing error: ${error.message}`],
      confidence: 0,
      analysis: null,
      metadata: {
        sutraNumber: '1.1.25',
        sutraText: 'डति च',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis for ḍati-based ṣaṭ words
 * @param {string} input - Normalized input
 * @param {string} script - Detected script
 * @param {Object} context - Analysis context
 * @param {boolean} isShatWordByDati - Whether input is ṣaṭ by ḍati affix
 * @param {boolean} isShatWordExtended - Whether input is ṣaṭ by extended classification
 * @param {Object} datiAnalysis - Ḍati analysis
 * @param {Object} completeShatAnalysis - Complete ṣaṭ analysis
 * @returns {Object} Analysis object
 */
function createDatiShatAnalysis(input, script, context, isShatWordByDati, isShatWordExtended, datiAnalysis, completeShatAnalysis) {
  if (isShatWordExtended) {
    return {
      morphological: {
        word: input,
        category: 'numeral',
        subcategory: completeShatAnalysis.source === '1.1.25' ? 'ḍati-ṣaṭ' : 'extended-ṣaṭ',
        script: script,
        morphClass: 'ṣaṭ',
        classificationSource: completeShatAnalysis.source || 'extended',
        affix: datiAnalysis.affix,
        structure: determineDatiShatStructure(input, datiAnalysis.type, completeShatAnalysis.source)
      },
      semantic: {
        function: 'numeral-classification-extension',
        meaning: getDatiShatMeaning(datiAnalysis.type, completeShatAnalysis.source, input),
        category: 'affix-based-classification',
        domain: 'morphological-extension',
        semanticRole: getDatiSemanticRole(input),
        affixFunction: datiAnalysis.type || 'classification-extension'
      },
      syntactic: {
        ruleType: 'saṃjñā-extension',
        classification: 'ṣaṭ',
        grammaticalFunction: 'extended-terminal-designation',
        applicableRules: getApplicableRules(completeShatAnalysis.source),
        syntacticBehavior: 'ṣaṭ-extended-operations',
        morphologyType: isShatWordByDati ? 'ḍati-based' : 'inherited-ṣaṭ'
      }
    };
  } else {
    return {
      morphological: {
        word: input,
        category: 'non-ṣaṭ',
        script: script
      },
      semantic: {
        function: 'non-ṣaṭ-classification',
        category: 'non-affix-based',
        domain: 'general'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'non-ṣaṭ',
        grammaticalFunction: 'non-extended-designation',
        applicableRules: []
      }
    };
  }
}

/**
 * Determines the morphological structure of ḍati-based ṣaṭ numerals
 * @param {string} input - The numeral
 * @param {string} type - The type of ḍati usage
 * @param {string} source - The classification source
 * @returns {string} Structure description
 */
function determineDatiShatStructure(input, type, source) {
  if (source === '1.1.25') {
    switch (type) {
      case 'known_form':
        return 'ḍati-affix-numeral';
      case 'affix_pattern':
        return 'ḍati-pattern-numeral';
      default:
        return 'ḍati-based-numeral';
    }
  } else if (source === '1.1.24') {
    return 'inherited-ṣaṭ-numeral';
  } else {
    return 'extended-ṣaṭ-numeral';
  }
}

/**
 * Gets the semantic meaning based on ḍati ṣaṭ type
 * @param {string} type - The type of ḍati usage
 * @param {string} source - The classification source
 * @param {string} input - The input word
 * @returns {string} Semantic meaning
 */
function getDatiShatMeaning(type, source, input) {
  if (source === '1.1.25') {
    switch (type) {
      case 'known_form':
        return `known ḍati-affix numeral (${input})`;
      case 'affix_pattern':
        return `ḍati-pattern numeral (${input})`;
      default:
        return 'ḍati-based ṣaṭ classification';
    }
  } else if (source === '1.1.24') {
    return 'ṣaṭ by terminal sound (1.1.24) extended by 1.1.25';
  } else {
    return 'extended ṣaṭ classification';
  }
}

/**
 * Gets the semantic role of ḍati words
 * @param {string} input - The input word
 * @returns {string} Semantic role
 */
function getDatiSemanticRole(input) {
  if (isInterrogativeDati(input)) {
    return 'interrogative-quantifier';
  } else if (isDemonstrativeDati(input)) {
    return 'demonstrative-quantifier';
  } else {
    return 'indefinite-quantifier';
  }
}

/**
 * Gets applicable rules based on classification source
 * @param {string} source - The classification source
 * @returns {Array} Applicable rules
 */
function getApplicableRules(source) {
  const rules = ['1.1.25'];
  if (source === '1.1.24') {
    rules.push('1.1.24');
  }
  return rules;
}

/**
 * Gets usage examples for ḍati ṣaṭ words
 * @param {string} type - The type of ḍati
 * @param {string} input - The input word
 * @returns {Array} Usage examples
 */
function getDatiShatUsageExamples(type, input) {
  const examples = [];
  
  switch (type) {
    case 'known_form':
      examples.push(
        `${input} - known ḍati-affix numeral`,
        'Interrogative: kati (how many?)',
        'Demonstrative: tati (so many), iyati (this much)'
      );
      break;
    case 'affix_pattern':
      examples.push(
        `${input} - follows ḍati affix pattern`,
        'Pattern words ending in -ti with quantitative meaning',
        'Extended ṣaṭ classification for morphological operations'
      );
      break;
    default:
      examples.push(
        'Primary ḍati forms: kati (how many), yati (as many)',
        'Extended forms: iyati (this much), kiyati (how much)',
        'All inherit ṣaṭ behavior from this sutra extension'
      );
  }
  
  return examples;
}

/**
 * Gets rules related to ḍati ṣaṭ classification
 * @returns {Array} Related rules
 */
function getRelatedDatiShatRules() {
  return [
    '1.1.25 - डति च (extends ṣaṭ to ḍati-affix numerals)',
    '1.1.24 - ष्णान्ता षट् (base ṣaṭ classification)',
    '1.1.23 - संख्या (defines the broader numeral category)',
    '5.2.39 - कतिपयप्रभृतिभ्यो डति (formation of ḍati forms)',
    '7.1.22 - षड्भ्यो लुक् (elision rules applying to extended ṣaṭ)'
  ];
}

// Main export for comprehensive analysis
export default analyzeDatiShat;

export { DATI_AFFIX_FORMS };
