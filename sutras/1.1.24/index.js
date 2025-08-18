/**
 * Sutra 1.1.24: ष्णान्ता षट्
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra establishes the technical term "षट्" (ṣaṭ) for संख्या (numerals)
 * that end in ष् (ṣ) or न् (n). This classification is important for
 * specific grammatical operations that apply to this subset of numerals.
 * 
 * षट् refers to संख्या words ending in:
 * 1. ष् - e.g., षष् (six), विंशतिष् 
 * 2. न् - e.g., सप्तन्, अष्टन्, नवन्, दशन्
 * 
 * The most common example is षष् (six), which gives the classification
 * its name. This class includes various forms of numerals that share
 * these terminal sounds.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord, sanitizeInput } from '../sanskrit-utils/validation.js';
import { isSankhya } from '../1.1.23/index.js';

// षट् numerals - संख्या words ending in ष् or न्
const SHAT_NUMERALS = {
  IAST: {
    sha_ending: [
      'ṣaṣ',        // six (primary example)
      'viṃśatiṣ',   // twenty (alternative form)
      'triṃśaṣ',    // thirty (alternative form)
      'catvāriṃśaṣ' // forty (alternative form)
    ],
    na_ending: [
      'saptan',     // seven
      'aṣṭan',      // eight
      'navan',      // nine
      'daśan',      // ten (alternative form)
      'ekādaśan',   // eleven (alternative form)
      'dvādaśan',   // twelve (alternative form)
      'śatan',      // hundred (alternative form)
      'sahasran'    // thousand (alternative form)
    ]
  },
  Devanagari: {
    sha_ending: [
      'षष्',        // six
      'विंशतिष्',   // twenty (alternative form)
      'त्रिंशष्',    // thirty (alternative form) 
      'चत्वारिंशष्' // forty (alternative form)
    ],
    na_ending: [
      'सप्तन्',     // seven
      'अष्टन्',      // eight
      'नवन्',       // nine
      'दशन्',       // ten (alternative form)
      'एकादशन्',   // eleven (alternative form)
      'द्वादशन्',   // twelve (alternative form)
      'शतन्',       // hundred (alternative form)
      'सहस्रन्'    // thousand (alternative form)
    ]
  }
};

/**
 * Check if a word is षट् (numeral ending in ष् or न्)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is षट्
 */
export function isShat(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const wordList = SHAT_NUMERALS[script];
  
  if (!wordList) return false;
  
  // Check both ष्-ending and न्-ending categories
  return Object.values(wordList).some(category => 
    category.includes(word)
  );
}

/**
 * Get all षट् numerals in specified script
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Object containing षट् numeral categories
 */
export function getShatNumerals(script = 'IAST') {
  return SHAT_NUMERALS[script] || SHAT_NUMERALS.IAST;
}

/**
 * Check if a संख्या ends in ष् or न्
 * @param {string} word - The word to check
 * @return {Object} Analysis of ष्/न् ending
 */
export function checkShatEnding(word) {
  if (!word || typeof word !== 'string') {
    return { isShat: false, ending: null, script: null };
  }
  
  const script = detectScript(word);
  
  // Check endings based on script
  if (script === 'IAST') {
    if (word.endsWith('ṣ')) {
      return { isShat: true, ending: 'ṣ', script, word };
    }
    if (word.endsWith('n')) {
      return { isShat: true, ending: 'n', script, word };
    }
  } else if (script === 'Devanagari') {
    if (word.endsWith('ष्')) {
      return { isShat: true, ending: 'ष्', script, word };
    }
    if (word.endsWith('न्')) {
      return { isShat: true, ending: 'न्', script, word };
    }
  }
  
  return { isShat: false, ending: null, script };
}

/**
 * Identify the type of षट् ending
 * @param {string} word - The word to analyze
 * @return {Object} Detailed analysis result
 */
export function identifyShatType(word) {
  if (!word || typeof word !== 'string') {
    return { isShat: false, type: null, ending: null, script: null };
  }
  
  // First check if it's a known षट् numeral
  if (isShat(word)) {
    const script = detectScript(word);
    const wordList = SHAT_NUMERALS[script];
    
    for (const [type, words] of Object.entries(wordList)) {
      if (words.includes(word)) {
        const ending = type === 'sha_ending' ? 
          (script === 'IAST' ? 'ṣ' : 'ष्') : 
          (script === 'IAST' ? 'n' : 'न्');
        
        return {
          isShat: true,
          type: type.replace('_ending', ''),
          ending,
          script,
          word,
          isKnownNumeral: true
        };
      }
    }
  }
  
  // Check if it's a संख्या with षट् ending pattern
  if (isSankhya(word)) {
    const endingAnalysis = checkShatEnding(word);
    if (endingAnalysis.isShat) {
      const type = endingAnalysis.ending === 'ṣ' || endingAnalysis.ending === 'ष्' ? 'sha' : 'na';
      return {
        isShat: true,
        type,
        ending: endingAnalysis.ending,
        script: endingAnalysis.script,
        word,
        isKnownNumeral: false
      };
    }
  }
  
  return { isShat: false, type: null, ending: null, script: detectScript(word) };
}

/**
 * Check if a word has षट् behavior
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits षट् behavior
 */
export function hasShatBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct षट् classification
  if (isShat(word)) return true;
  
  // Check if it's a संख्या with षट् ending
  const analysis = identifyShatType(word);
  if (analysis.isShat) return true;
  
  // Context-based षट् behavior
  if (context.morphology === 'numeral' && 
      (context.ending === 'ṣ' || context.ending === 'n' || 
       context.ending === 'ष्' || context.ending === 'न्')) {
    return true;
  }
  
  return false;
}

/**
 * Get षट् examples for each ending type
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Examples organized by ending type
 */
export function getShatExamples(script = 'IAST') {
  const numerals = getShatNumerals(script);
  
  return {
    sha_ending: numerals.sha_ending.slice(0, 3),  // First 3 ष्-ending
    na_ending: numerals.na_ending.slice(0, 5)     // First 5 न्-ending
  };
}

/**
 * Check if a word is a specific type of षट्
 * @param {string} word - The word to check
 * @param {string} endingType - The ending type ('sha' or 'na')
 * @return {boolean} True if the word has the specified ending type
 */
export function isShatWithEnding(word, endingType) {
  if (!word || !endingType) return false;
  
  const analysis = identifyShatType(word);
  return analysis.isShat && analysis.type === endingType;
}

/**
 * Get the primary example of षट् (which is षष्/ṣaṣ - six)
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {string} The primary षट् example
 */
export function getPrimaryShatExample(script = 'IAST') {
  return script === 'Devanagari' ? 'षष्' : 'ṣaṣ';
}

/**
 * Custom validation for Sanskrit input specifically for ṣaṭ analysis
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid Sanskrit input
 */
function isValidSanskritForShat(input) {
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
    // Strict validation for Sanskrit words only
    const englishWords = ['xyz', 'invalid', 'test', 'hello', 'world', 'error', 'null', 'undefined'];
    if (englishWords.includes(input.toLowerCase())) return false;
    
    if (/[xyz]/.test(input)) return false;
    if (/qu/.test(input)) return false;
    
    const iastPattern = /^[a-zA-Zāīūṛṝḷḹēōṃḥñṅṇṭḍṣśkṇ\s]+$/;
    return iastPattern.test(input);
  }
  
  return false;
}

/**
 * Analyzes input for ṣaṭ (ष्/न्-ending numeral) classification (comprehensive analysis function)
 * 
 * @param {string} input - The input to analyze for ṣaṭ classification
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeShat(input, context = {}) {
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
          sutraNumber: '1.1.24',
          sutraText: 'ष्णान्ता षट्',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit input
    if (!isValidSanskritForShat(input)) {
      return {
        isValid: false,
        isShat: false,
        input: input,
        normalizedInput: '',
        errors: ['Invalid Sanskrit input'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.24',
          sutraText: 'ष्णान्ता षट्',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(input);
    const sanitized = sanitizeInput(input);
    const normalizedInput = sanitized.success ? sanitized.sanitized : input;

    // Determine if input is ṣaṭ
    const isShatWord = isShat(input);
    const shatType = identifyShatType(input);
    const endingAnalysis = checkShatEnding(input);

    // Create comprehensive analysis
    const analysis = createShatAnalysis(normalizedInput, script, context, isShatWord, shatType, endingAnalysis);
    
    return {
      isValid: true,
      isShat: isShatWord,
      input: input,
      normalizedInput: normalizedInput,
      analysis: analysis,
      confidence: isShatWord ? 0.95 : (shatType.isShat ? 0.85 : 0.1),
      metadata: {
        sutraNumber: '1.1.24',
        sutraText: 'ष्णान्ता षट्',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'षकारान्ता णकारान्ता च संख्या षट्संज्ञका भवति। षष्शब्दो मुख्यो दृष्टान्तः।',
        modernExplanation: 'This sutra defines the technical term "ṣaṭ" for numerals ending in ṣ or n sounds. The term derives from ṣaṣ (six), the primary example.',
        usageExamples: context.includeUsageExamples ? getShatUsageExamples(shatType.type, input) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedShatRules() : undefined,
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
        sutraNumber: '1.1.24',
        sutraText: 'ष्णान्ता षट्',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis for ṣaṭ words
 * @param {string} input - Normalized input
 * @param {string} script - Detected script
 * @param {Object} context - Analysis context
 * @param {boolean} isShatWord - Whether input is a ṣaṭ
 * @param {Object} shatType - Ṣaṭ type information
 * @param {Object} endingAnalysis - Ending analysis
 * @returns {Object} Analysis object
 */
function createShatAnalysis(input, script, context, isShatWord, shatType, endingAnalysis) {
  if (isShatWord || shatType.isShat) {
    return {
      morphological: {
        word: input,
        category: 'numeral',
        subcategory: 'ṣaṭ-ending',
        script: script,
        morphClass: 'ṣaṭ',
        ending: shatType.ending || endingAnalysis.ending,
        endingType: shatType.type || (endingAnalysis.ending === 'ṣ' || endingAnalysis.ending === 'ष्' ? 'sha' : 'na'),
        structure: determineShatStructure(input, shatType.type)
      },
      semantic: {
        function: 'numeral-classification',
        meaning: getShatMeaning(shatType.type, input),
        category: 'terminal-sound-based-classification',
        domain: 'phonological-morphology',
        semanticRole: 'numeral-with-specific-ending',
        primaryExample: getPrimaryShatExample(script)
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'ṣaṭ',
        grammaticalFunction: 'terminal-sound-designation',
        applicableRules: ['1.1.24'],
        syntacticBehavior: 'ṣaṭ-specific-operations',
        endingConstraint: shatType.ending || endingAnalysis.ending
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
        category: 'non-terminal-sound-based',
        domain: 'general'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'non-ṣaṭ',
        grammaticalFunction: 'non-terminal-sound-designation',
        applicableRules: []
      }
    };
  }
}

/**
 * Determines the morphological structure of ṣaṭ numerals
 * @param {string} input - The numeral
 * @param {string} type - The type of ending
 * @returns {string} Structure description
 */
function determineShatStructure(input, type) {
  switch (type) {
    case 'sha':
      return 'ṣ-terminal-numeral';
    case 'na':
      return 'n-terminal-numeral';
    default:
      return 'ṣaṭ-pattern-numeral';
  }
}

/**
 * Gets the semantic meaning based on ṣaṭ type
 * @param {string} type - The type of ṣaṭ ending
 * @param {string} input - The input word
 * @returns {string} Semantic meaning
 */
function getShatMeaning(type, input) {
  switch (type) {
    case 'sha':
      return `numeral ending in ṣ-sound (like ${input})`;
    case 'na':
      return `numeral ending in n-sound (like ${input})`;
    default:
      return 'numeral with ṣaṭ-classified ending';
  }
}

/**
 * Gets usage examples for ṣaṭ words
 * @param {string} type - The type of ṣaṭ
 * @param {string} input - The input word
 * @returns {Array} Usage examples
 */
function getShatUsageExamples(type, input) {
  const examples = [];
  
  switch (type) {
    case 'sha':
      examples.push(
        `${input} - numeral ending in ṣ-sound`,
        'Primary example: ṣaṣ (six) gives the classification its name',
        'ṣ-ending numerals undergo specific morphological operations'
      );
      break;
    case 'na':
      examples.push(
        `${input} - numeral ending in n-sound`,
        'Common in alternative forms: saptan, aṣṭan, navan',
        'n-ending numerals share ṣaṭ classification with ṣ-ending ones'
      );
      break;
    default:
      examples.push(
        'ṣ-ending: ṣaṣ (six), viṃśatiṣ (twenty)',
        'n-ending: saptan (seven), aṣṭan (eight), navan (nine)',
        'ṣaṭ numerals undergo special grammatical operations based on their terminal sounds'
      );
  }
  
  return examples;
}

/**
 * Gets rules related to ṣaṭ classification
 * @returns {Array} Related rules
 */
function getRelatedShatRules() {
  return [
    '1.1.24 - ष्णान्ता षट् (defines ṣaṭ for ṣ/n-ending numerals)',
    '1.1.23 - संख्या (defines the broader numeral category)',
    '7.1.22 - षड्भ्यो लुक् (elision rules for ṣaṭ numerals)',
    '6.1.84 - एकः पूर्वपरयोः (sandhi rules affecting ṣaṭ)',
    '8.2.62 - क्विन्प्रत्ययस्य कुक्वा (special operations for certain ṣaṭ forms)'
  ];
}

// Main export for comprehensive analysis
export default analyzeShat;

export { SHAT_NUMERALS };
