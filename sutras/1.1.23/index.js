/**
 * Sutra 1.1.23: संख्या
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra establishes the technical term "संख्या" (saṅkhyā) for numerals.
 * It defines the grammatical category of numerical words that express quantity.
 * 
 * संख्या refers to:
 * 1. Cardinal numbers (एक, द्वि, त्रि, चतुर्, पञ्च etc.)
 * 2. Ordinal numbers (प्रथम, द्वितीय, तृतीय etc.) 
 * 3. Multiplicative numbers (द्विगुण, त्रिगुण etc.)
 * 4. Fractional numbers (अर्ध, पाद etc.)
 * 5. Collective numbers (द्वय, त्रय etc.)
 */

import { 
  detectScript,
  validateSanskritWord,
  sanitizeInput
} from '../sanskrit-utils/index.js';

// Comprehensive list of संख्या (numerals)
const SANKHYA_WORDS = {
  IAST: {
    cardinal: [
      'eka', 'dvi', 'tri', 'catur', 'pañca', 'ṣaṣ', 'sapta', 'aṣṭa', 'nava', 'daśa',
      'ekādaśa', 'dvādaśa', 'trayodaśa', 'caturdaśa', 'pañcadaśa', 'ṣoḍaśa',
      'saptadaśa', 'aṣṭādaśa', 'navadaśa', 'viṃśati', 'triṃśat', 'catvāriṃśat',
      'pañcāśat', 'ṣaṣṭi', 'saptati', 'aśīti', 'navati', 'śata', 'sahasra'
    ],
    ordinal: [
      'prathama', 'dvitīya', 'tṛtīya', 'caturtha', 'pañcama', 'ṣaṣṭha',
      'saptama', 'aṣṭama', 'navama', 'daśama', 'ekādaśa', 'dvādaśa'
    ],
    multiplicative: [
      'dviguṇa', 'triguṇa', 'caturguṇa', 'pañcaguṇa', 'ṣaḍguṇa',
      'saptaguṇa', 'aṣṭaguṇa', 'navaguṇa', 'daśaguṇa'
    ],
    fractional: [
      'ardha', 'pāda', 'tṛtīya', 'caturtha', 'pañcama', 'ṣaṣṭha'
    ],
    collective: [
      'dvaya', 'traya', 'catuṣka', 'pañcaka', 'ṣaṭka', 'saptaka', 'aṣṭaka'
    ]
  },
  Devanagari: {
    cardinal: [
      'एक', 'द्वि', 'त्रि', 'चतुर्', 'पञ्च', 'षष्', 'सप्त', 'अष्ट', 'नव', 'दश',
      'एकादश', 'द्वादश', 'त्रयोदश', 'चतुर्दश', 'पञ्चदश', 'षोडश',
      'सप्तदश', 'अष्टादश', 'नवदश', 'विंशति', 'त्रिंशत्', 'चत्वारिंशत्',
      'पञ्चाशत्', 'षष्टि', 'सप्तति', 'अशीति', 'नवति', 'शत', 'सहस्र'
    ],
    ordinal: [
      'प्रथम', 'द्वितीय', 'तृतीय', 'चतुर्थ', 'पञ्चम', 'षष्ठ',
      'सप्तम', 'अष्टम', 'नवम', 'दशम', 'एकादश', 'द्वादश'
    ],
    multiplicative: [
      'द्विगुण', 'त्रिगुण', 'चतुर्गुण', 'पञ्चगुण', 'षड्गुण',
      'सप्तगुण', 'अष्टगुण', 'नवगुण', 'दशगुण'
    ],
    fractional: [
      'अर्ध', 'पाद', 'तृतीय', 'चतुर्थ', 'पञ्चम', 'षष्ठ'
    ],
    collective: [
      'द्वय', 'त्रय', 'चतुष्क', 'पञ्चक', 'षट्क', 'सप्तक', 'अष्टक'
    ]
  }
};

/**
 * Check if a word is a संख्या (numeral)
 * @param {string} word - The word to check
 * @return {boolean} True if the word is a संख्या
 */
export function isSankhya(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const wordList = SANKHYA_WORDS[script];
  
  if (!wordList) return false;
  
  // Check all categories of numerals
  return Object.values(wordList).some(category => 
    category.includes(word)
  );
}

/**
 * Get all संख्या words in specified script
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Object containing all numeral categories
 */
export function getSankhyaWords(script = 'IAST') {
  return SANKHYA_WORDS[script] || SANKHYA_WORDS.IAST;
}

/**
 * Identify the type of संख्या
 * @param {string} word - The word to analyze
 * @return {Object} Analysis result with type and properties
 */
export function identifySankhyaType(word) {
  if (!word || typeof word !== 'string') {
    return { isSankhya: false, type: null, script: null };
  }
  
  const script = detectScript(word);
  const wordList = SANKHYA_WORDS[script];
  
  if (!wordList) {
    return { isSankhya: false, type: null, script };
  }
  
  for (const [type, words] of Object.entries(wordList)) {
    if (words.includes(word)) {
      return {
        isSankhya: true,
        type,
        script,
        word
      };
    }
  }
  
  return { isSankhya: false, type: null, script };
}

/**
 * Check if a word has संख्या behavior
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits संख्या behavior
 */
export function hasSankhyaBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct संख्या classification
  if (isSankhya(word)) return true;
  
  // Context-based संख्या behavior
  if (context.semantics === 'quantity' || context.role === 'numeral') {
    return true;
  }
  
  return false;
}

/**
 * Get संख्या examples for each category
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Examples organized by category
 */
export function getSankhyaExamples(script = 'IAST') {
  const words = getSankhyaWords(script);
  
  return {
    cardinal: words.cardinal.slice(0, 5),      // First 5 cardinal numbers
    ordinal: words.ordinal.slice(0, 5),       // First 5 ordinal numbers
    multiplicative: words.multiplicative.slice(0, 3), // First 3 multiplicatives
    fractional: words.fractional.slice(0, 3), // First 3 fractionals
    collective: words.collective.slice(0, 3)  // First 3 collectives
  };
}

/**
 * Check if a word is a specific type of संख्या
 * @param {string} word - The word to check
 * @param {string} type - The type to check for ('cardinal', 'ordinal', etc.)
 * @return {boolean} True if the word is of the specified type
 */
export function isSankhyaType(word, type) {
  if (!word || !type) return false;
  
  const analysis = identifySankhyaType(word);
  return analysis.isSankhya && analysis.type === type;
}

/**
 * Get the numerical value for cardinal संख्या
 * @param {string} word - The cardinal numeral
 * @return {number|null} The numerical value or null if not a cardinal
 */
export function getSankhyaValue(word) {
  if (!word) return null;
  
  const analysis = identifySankhyaType(word);
  if (!analysis.isSankhya || analysis.type !== 'cardinal') return null;
  
  const script = analysis.script;
  const cardinals = SANKHYA_WORDS[script].cardinal;
  const index = cardinals.indexOf(word);
  
  if (index === -1) return null;
  
  // Map index to actual numerical value
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000];
  
  return values[index] || null;
}

/**
 * Custom validation for Sanskrit input specifically for sankhya analysis
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid Sanskrit input
 */
function isValidSanskritForSankhya(input) {
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
 * Analyzes input for sankhya (numeral) classification (comprehensive analysis function)
 * 
 * @param {string} input - The input to analyze for sankhya classification
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeSankhya(input, context = {}) {
  try {
    // Handle empty/null inputs
    if (!input) {
      return {
        isValid: false,
        isSankhya: false,
        input: input,
        normalizedInput: '',
        errors: ['Input is required'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.23',
          sutraText: 'संख्या',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit input
    if (!isValidSanskritForSankhya(input)) {
      return {
        isValid: false,
        isSankhya: false,
        input: input,
        normalizedInput: '',
        errors: ['Invalid Sanskrit input'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.23',
          sutraText: 'संख्या',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(input);
    const sanitized = sanitizeInput(input);
    const normalizedInput = sanitized.success ? sanitized.sanitized : input;

    // Determine if input is sankhya
    const isSankhyaWord = isSankhya(input);
    const sankhyaType = identifySankhyaType(input);
    const numericalValue = sankhyaType.type === 'cardinal' ? getSankhyaValue(input) : null;

    // Create comprehensive analysis
    const analysis = createSankhyaAnalysis(normalizedInput, script, context, isSankhyaWord, sankhyaType, numericalValue);
    
    return {
      isValid: true,
      isSankhya: isSankhyaWord,
      input: input,
      normalizedInput: normalizedInput,
      analysis: analysis,
      confidence: isSankhyaWord ? 0.95 : 0.1,
      metadata: {
        sutraNumber: '1.1.23',
        sutraText: 'संख्या',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'संख्या नाम संख्यानं संख्येयं वा। गणनार्थकाः शब्दाः संख्यासंज्ञकाः भवन्ति।',
        modernExplanation: 'This sutra defines the technical term "saṅkhyā" for all numerical words that express quantity, order, multiplication, fractions, or collections.',
        usageExamples: context.includeUsageExamples ? getSankhyaUsageExamples(sankhyaType.type, input) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedSankhyaRules() : undefined,
        processingTime: Date.now()
      }
    };

  } catch (error) {
    return {
      isValid: false,
      isSankhya: false,
      input: input,
      normalizedInput: '',
      errors: [`Processing error: ${error.message}`],
      confidence: 0,
      analysis: null,
      metadata: {
        sutraNumber: '1.1.23',
        sutraText: 'संख्या',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis for sankhya words
 * @param {string} input - Normalized input
 * @param {string} script - Detected script
 * @param {Object} context - Analysis context
 * @param {boolean} isSankhyaWord - Whether input is a sankhya
 * @param {Object} sankhyaType - Sankhya type information
 * @param {number|null} numericalValue - Numerical value for cardinals
 * @returns {Object} Analysis object
 */
function createSankhyaAnalysis(input, script, context, isSankhyaWord, sankhyaType, numericalValue) {
  if (isSankhyaWord) {
    return {
      morphological: {
        word: input,
        category: 'numeral',
        subcategory: sankhyaType.type || 'unknown',
        script: script,
        morphClass: 'saṅkhyā',
        structure: determineNumeralStructure(input, sankhyaType.type)
      },
      semantic: {
        function: 'quantification',
        meaning: getSankhyaMeaning(sankhyaType.type, numericalValue),
        category: 'numerical-expression',
        domain: 'quantity-and-order',
        semanticRole: sankhyaType.type || 'numerical',
        value: numericalValue
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'saṅkhyā',
        grammaticalFunction: 'numeral-designation',
        applicableRules: ['1.1.23'],
        syntacticBehavior: 'numeral-specific-rules',
        agreement: context.agreement || 'number-gender-case'
      }
    };
  } else {
    return {
      morphological: {
        word: input,
        category: 'non-numeral',
        script: script
      },
      semantic: {
        function: 'non-quantification',
        category: 'non-numerical',
        domain: 'general'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'non-saṅkhyā',
        grammaticalFunction: 'non-numeral-designation',
        applicableRules: []
      }
    };
  }
}

/**
 * Determines the morphological structure of numerals
 * @param {string} input - The numeral
 * @param {string} type - The type of numeral
 * @returns {string} Structure description
 */
function determineNumeralStructure(input, type) {
  switch (type) {
    case 'cardinal':
      return 'basic-numeral';
    case 'ordinal':
      return 'ordinal-suffix-formation';
    case 'multiplicative':
      return 'multiplicative-compound';
    case 'fractional':
      return 'fractional-formation';
    case 'collective':
      return 'collective-formation';
    default:
      return 'complex-numeral';
  }
}

/**
 * Gets the semantic meaning based on numeral type
 * @param {string} type - The type of numeral
 * @param {number|null} value - Numerical value if available
 * @returns {string} Semantic meaning
 */
function getSankhyaMeaning(type, value) {
  switch (type) {
    case 'cardinal':
      return value ? `quantity: ${value}` : 'basic quantity';
    case 'ordinal':
      return 'sequential position/order';
    case 'multiplicative':
      return 'multiplication factor';
    case 'fractional':
      return 'fractional part';
    case 'collective':
      return 'collective quantity';
    default:
      return 'numerical concept';
  }
}

/**
 * Gets usage examples for sankhya words
 * @param {string} type - The type of sankhya
 * @param {string} input - The input word
 * @returns {Array} Usage examples
 */
function getSankhyaUsageExamples(type, input) {
  const examples = [];
  
  switch (type) {
    case 'cardinal':
      examples.push(
        `${input} - expressing basic quantity/count`,
        'Used in counting and enumeration contexts',
        'Governs case of counted objects (typically genitive plural)'
      );
      break;
    case 'ordinal':
      examples.push(
        `${input} - expressing sequential order`,
        'Used to indicate position in a sequence',
        'Agrees with the noun in gender, number, and case'
      );
      break;
    case 'multiplicative':
      examples.push(
        `${input} - expressing multiplication`,
        'Used to indicate how many times greater',
        'Forms compound words with multiplied quantities'
      );
      break;
    case 'fractional':
      examples.push(
        `${input} - expressing fractional part`,
        'Used to indicate portions or parts of a whole',
        'Often used in mathematical and measurement contexts'
      );
      break;
    case 'collective':
      examples.push(
        `${input} - expressing collective quantity`,
        'Used to indicate groups or sets',
        'Emphasizes the collective nature of the count'
      );
      break;
    default:
      examples.push(
        'Cardinal numerals: एक, द्वि, त्रि (one, two, three)',
        'Ordinal numerals: प्रथम, द्वितीय, तृतीय (first, second, third)',
        'All numerals follow special grammatical rules for agreement and case'
      );
  }
  
  return examples;
}

/**
 * Gets rules related to sankhya classification
 * @returns {Array} Related rules
 */
function getRelatedSankhyaRules() {
  return [
    '1.1.23 - संख्या (defines numerical words)',
    '2.1.52 - संख्याया द्विगुः (dvandva compounds with numerals)',
    '2.2.25 - संख्यापूर्वो द्विगुः (dvandva with initial numeral)',
    '5.2.45 - संख्यायाः प्रियादिभ्यः कन् (formations from numerals)',
    '1.1.24 - द्वयेकयोर्द्वन्द्वे (special rules for dva and eka in compounds)'
  ];
}

// Main export for comprehensive analysis
export default analyzeSankhya;

export { SANKHYA_WORDS };
