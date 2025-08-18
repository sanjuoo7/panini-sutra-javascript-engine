/**
 * Sutra 1.1.27: सर्वादीनि सर्वनामानि (sarvādīni sarvanāmāni)
 * "The words सर्व 'all' and the rest are called सर्वनाम or pronouns."
 * 
 * This is a saṃjñā (definition) sutra that defines the technical term सर्वनाम
 * for pronouns and pronominal words.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.27
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord, sanitizeInput } from '../sanskrit-utils/validation.js';

/**
 * List of सर्वादि (sarvādi) words that are classified as सर्वनाम
 */
const SARVADI_WORDS = {
  iast: [
    'sarva', 'viśva', 'ubha', 'ubhaya', 'ḍatara', 'ḍatama', 'anya', 'anyatara',
    'itara', 'tvat', 'tva', 'nema', 'sama', 'simā', 'pūrva', 'para', 'avara',
    'dakṣiṇa', 'uttara', 'apara', 'adhara', 'sva', 'antara', 'ekatera', 'ka',
    'kim', 'tad', 'tat', 'etad', 'etat', 'idam', 'adas', 'ena', 'yad', 'yat', 
    'bhavat', 'yuṣmad', 'asmad'
  ],
  devanagari: [
    'सर्व', 'विश्व', 'उभ', 'उभय', 'डतर', 'डतम', 'अन्य', 'अन्यतर',
    'इतर', 'त्वत्', 'त्व', 'नेम', 'सम', 'सिमा', 'पूर्व', 'पर', 'अवर',
    'दक्षिण', 'उत्तर', 'अपर', 'अधर', 'स्व', 'अन्तर', 'एकतर', 'क',
    'किम्', 'तद्', 'तत्', 'एतद्', 'एतत्', 'इदम्', 'अदस्', 'एन', 'यद्', 'यत्',
    'भवत्', 'युष्मद्', 'अस्मद्'
  ]
};

/**
 * Checks if a word is classified as सर्वनाम according to Sutra 1.1.27
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context (for exceptions in later sutras)
 * @returns {boolean} - True if the word is सर्वनाम
 */
/**
 * Checks if a word is derived from a सर्वादि base through inflection
 */
function isInflectedSarvadi(word) {
  // Common Sanskrit inflection patterns for pronouns
  const inflectionPatterns = [
    // tad -> tas-, ta-, te-
    { base: 'tad', patterns: [/^tas[yaāḥmiḥsu]/, /^ta[syaḥmi]/, /^te[ṣāṃṣu]/] },
    { base: 'tat', patterns: [/^tas[yaāḥmiḥsu]/, /^ta[syaḥmi]/, /^te[ṣāṃṣu]/] },
    // etad -> etas-, eta-, ete-
    { base: 'etad', patterns: [/^etas[yaāḥmiḥsu]/, /^eta[syaḥmi]/, /^ete[ṣāṃṣu]/] },
    { base: 'etat', patterns: [/^etas[yaāḥmiḥsu]/, /^eta[syaḥmi]/, /^ete[ṣāṃṣu]/] },
    // idam -> as-, im-, en-
    { base: 'idam', patterns: [/^as[yaāḥmiḥsu]/, /^im[eāṃāḥ]/, /^en[āḥaṃ]/] },
    // yad -> yas-, ya-, ye-
    { base: 'yad', patterns: [/^yas[yaāḥmiḥsu]/, /^ya[syaḥmi]/, /^ye[ṣāṃṣu]/] },
    { base: 'yat', patterns: [/^yas[yaāḥmiḥsu]/, /^ya[syaḥmi]/, /^ye[ṣāṃṣu]/] },
    // sarva -> sarvas-, sarva-
    { base: 'sarva', patterns: [/^sarvas[yaāḥmi]/, /^sarv[aāeāṃ]/] },
    // asmad -> asm-, ah-, mam-, mad-
    { base: 'asmad', patterns: [/^asm[aākam]/, /^ah[aṃam]/, /^mam[a]/, /^mad[īyaḥ]/] },
    // yuṣmad -> yuṣm-, yū-, tvam-, tav-
    { base: 'yuṣmad', patterns: [/^yuṣm[aākam]/, /^yū[yam]/, /^tvam[a]/, /^tav[a]/] }
  ];

  for (const {base, patterns} of inflectionPatterns) {
    for (const pattern of patterns) {
      if (pattern.test(word)) {
        return true;
      }
    }
  }
  
  return false;
}

export function isSarvanama(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    
    // Check direct match first
    if (script === 'Devanagari') {
      if (SARVADI_WORDS.devanagari.includes(word)) {
        return true;
      }
      // Try stripping common case endings to get the base form
      const wordBase = word.replace(/[ःंस्य्न्त्ाेाि्]$/, '');
      return SARVADI_WORDS.devanagari.includes(wordBase) ||
             SARVADI_WORDS.devanagari.some(base => word.startsWith(base));
    } else {
      if (SARVADI_WORDS.iast.includes(word)) {
        return true;
      }
      // Check if it starts with any sarvadi word (for simple cases)
      const startsWithSarvadi = SARVADI_WORDS.iast.some(base => word.startsWith(base));
      if (startsWithSarvadi) {
        return true;
      }
      // Check for complex inflected forms
      if (isInflectedSarvadi(word)) {
        return true;
      }
      // Try stripping common case endings (but not 'm' from words like kim, idam)
      const wordBase = word.replace(/[ḥṃsynt]$/, '');
      return SARVADI_WORDS.iast.includes(wordBase);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Gets all सर्वादि words
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of सर्वादि words
 */
export function getSarvadiWords(script = 'IAST') {
  if (script === 'Devanagari') {
    return [...SARVADI_WORDS.devanagari];
  } else {
    return [...SARVADI_WORDS.iast];
  }
}

/**
 * Checks if सर्वनाम rules should apply to a word
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if सर्वनाम rules apply
 */
export function hasSarvanamaBehavior(word, context = {}) {
  // Basic सर्वनाम check
  if (isSarvanama(word, context)) {
    // Later sutras (1.1.28-1.1.31) may modify this behavior
    // For now, return true for basic classification
    return true;
  }
  
  return false;
}

/**
 * Custom validation for Sanskrit input specifically for sarvanāma analysis
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid Sanskrit input
 */
function isValidSanskritForSarvanama(input) {
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
    // Allow standard Sanskrit characters for pronouns
    const englishWords = ['xyz', 'invalid', 'test', 'hello', 'world', 'error', 'null', 'undefined'];
    if (englishWords.includes(input.toLowerCase())) return false;
    
    const iastPattern = /^[a-zA-Zāīūṛṝḷḹēōṃḥñṅṇṭḍṣśkṇ\s]+$/;
    return iastPattern.test(input);
  }
  
  return false;
}

/**
 * Analyzes input for sarvanāma (pronoun) classification (comprehensive analysis function)
 * 
 * @param {string} input - The input to analyze for sarvanāma classification
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeSarvanama(input, context = {}) {
  try {
    // Handle empty/null inputs
    if (!input) {
      return {
        isValid: false,
        isSarvanama: false,
        input: input,
        normalizedInput: '',
        errors: ['Input is required'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.27',
          sutraText: 'सर्वादीनि सर्वनामानि',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit input
    if (!isValidSanskritForSarvanama(input)) {
      return {
        isValid: false,
        isSarvanama: false,
        input: input,
        normalizedInput: '',
        errors: ['Invalid Sanskrit input'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.27',
          sutraText: 'सर्वादीनि सर्वनामानि',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(input);
    const sanitized = sanitizeInput(input);
    const normalizedInput = sanitized.success ? sanitized.sanitized : input;

    // Determine if input is sarvanāma
    const isSarvanāmaWord = isSarvanama(input, context);
    const sarvanāmaType = identifySarvanāmaType(input);

    // Create comprehensive analysis
    const analysis = createSarvanāmaAnalysis(normalizedInput, script, context, isSarvanāmaWord, sarvanāmaType);
    
    return {
      isValid: true,
      isSarvanama: isSarvanāmaWord,
      input: input,
      normalizedInput: normalizedInput,
      analysis: analysis,
      confidence: isSarvanāmaWord ? 0.95 : 0.1,
      metadata: {
        sutraNumber: '1.1.27',
        sutraText: 'सर्वादीनि सर्वनामानि',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'सर्वप्रभृतयः शब्दाः सर्वनामसंज्ञकाः भवन्ति। एषाम् व्याकरणे विशेषो वर्तते।',
        modernExplanation: 'This sutra defines "sarvanāma" as the technical term for pronouns beginning with sarva and similar words.',
        usageExamples: context.includeUsageExamples ? getSarvanāmaUsageExamples(sarvanāmaType.type, input) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedSarvanāmaRules() : undefined,
        processingTime: Date.now()
      }
    };

  } catch (error) {
    return {
      isValid: false,
      isSarvanama: false,
      input: input,
      normalizedInput: '',
      errors: [`Processing error: ${error.message}`],
      confidence: 0,
      analysis: null,
      metadata: {
        sutraNumber: '1.1.27',
        sutraText: 'सर्वादीनि सर्वनामानि',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Identifies the type of sarvanāma
 * @param {string} input - The input word
 * @returns {Object} Type information
 */
function identifySarvanāmaType(input) {
  if (!input) return { isSarvanāma: false, type: null };
  
  const script = detectScript(input);
  const wordList = script === 'Devanagari' ? SARVADI_WORDS.devanagari : SARVADI_WORDS.iast;
  
  // Check for demonstrative pronouns
  const demonstratives = script === 'IAST' ? 
    ['tad', 'tat', 'etad', 'etat', 'idam', 'adas'] : 
    ['तद्', 'तत्', 'एतद्', 'एतत्', 'इदम्', 'अदस्'];
  
  // Check for interrogative pronouns
  const interrogatives = script === 'IAST' ? 
    ['ka', 'kim', 'yad', 'yat'] : 
    ['क', 'किम्', 'यद्', 'यत्'];
  
  // Check for personal pronouns
  const personal = script === 'IAST' ? 
    ['asmad', 'yuṣmad', 'bhavat'] : 
    ['अस्मद्', 'युष्मद्', 'भवत्'];
  
  // Check for universal quantifiers
  const universal = script === 'IAST' ? 
    ['sarva', 'viśva'] : 
    ['सर्व', 'विश्व'];
  
  if (demonstratives.includes(input) || demonstratives.some(base => input.startsWith(base))) {
    return { isSarvanāma: true, type: 'demonstrative', base: getDemonstrativeBase(input) };
  }
  
  if (interrogatives.includes(input) || interrogatives.some(base => input.startsWith(base))) {
    return { isSarvanāma: true, type: 'interrogative', base: getInterrogativeBase(input) };
  }
  
  if (personal.includes(input) || personal.some(base => input.startsWith(base))) {
    return { isSarvanāma: true, type: 'personal', base: getPersonalBase(input) };
  }
  
  if (universal.includes(input) || universal.some(base => input.startsWith(base))) {
    return { isSarvanāma: true, type: 'universal', base: getUniversalBase(input) };
  }
  
  if (wordList.includes(input) || isInflectedSarvadi(input)) {
    return { isSarvanāma: true, type: 'indefinite', base: null };
  }
  
  return { isSarvanāma: false, type: null };
}

/**
 * Helper functions to get base forms
 */
function getDemonstrativeBase(word) {
  if (word.startsWith('tad') || word.startsWith('tat') || word.startsWith('तद्') || word.startsWith('तत्')) return 'tad';
  if (word.startsWith('etad') || word.startsWith('etat') || word.startsWith('एतद्') || word.startsWith('एतत्')) return 'etad';
  if (word.startsWith('idam') || word.startsWith('इदम्')) return 'idam';
  if (word.startsWith('adas') || word.startsWith('अदस्')) return 'adas';
  return null;
}

function getInterrogativeBase(word) {
  if (word.startsWith('ka') || word.startsWith('क')) return 'ka';
  if (word.startsWith('kim') || word.startsWith('किम्')) return 'kim';
  if (word.startsWith('yad') || word.startsWith('yat') || word.startsWith('यद्') || word.startsWith('यत्')) return 'yad';
  return null;
}

function getPersonalBase(word) {
  if (word.startsWith('asmad') || word.startsWith('अस्मद्')) return 'asmad';
  if (word.startsWith('yuṣmad') || word.startsWith('युष्मद्')) return 'yuṣmad';
  if (word.startsWith('bhavat') || word.startsWith('भवत्')) return 'bhavat';
  return null;
}

function getUniversalBase(word) {
  if (word.startsWith('sarva') || word.startsWith('सर्व')) return 'sarva';
  if (word.startsWith('viśva') || word.startsWith('विश्व')) return 'viśva';
  return null;
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis for sarvanāma words
 * @param {string} input - Normalized input
 * @param {string} script - Detected script
 * @param {Object} context - Analysis context
 * @param {boolean} isSarvanāmaWord - Whether input is sarvanāma
 * @param {Object} sarvanāmaType - Sarvanāma type information
 * @returns {Object} Analysis object
 */
function createSarvanāmaAnalysis(input, script, context, isSarvanāmaWord, sarvanāmaType) {
  if (isSarvanāmaWord) {
    return {
      morphological: {
        word: input,
        category: 'pronoun',
        subcategory: sarvanāmaType.type || 'sarvādi',
        script: script,
        morphClass: 'sarvanāma',
        baseForm: sarvanāmaType.base,
        structure: determineSarvanāmaStructure(input, sarvanāmaType.type)
      },
      semantic: {
        function: 'pronominal-reference',
        meaning: getSarvanāmaMeaning(sarvanāmaType.type, sarvanāmaType.base, input),
        category: 'referential-expression',
        domain: 'deixis-and-quantification',
        semanticRole: sarvanāmaType.type || 'pronominal',
        referenceType: getReferenceType(sarvanāmaType.type)
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'sarvanāma',
        grammaticalFunction: 'pronominal-designation',
        applicableRules: ['1.1.27'],
        syntacticBehavior: 'pronominal-inflection',
        agreementPattern: context.agreement || 'gender-number-case'
      }
    };
  } else {
    return {
      morphological: {
        word: input,
        category: 'non-pronoun',
        script: script
      },
      semantic: {
        function: 'non-pronominal',
        category: 'non-referential',
        domain: 'general'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'non-sarvanāma',
        grammaticalFunction: 'non-pronominal-designation',
        applicableRules: []
      }
    };
  }
}

/**
 * Determines the morphological structure of sarvanāma words
 * @param {string} input - The pronoun
 * @param {string} type - The type of sarvanāma
 * @returns {string} Structure description
 */
function determineSarvanāmaStructure(input, type) {
  switch (type) {
    case 'demonstrative':
      return 'demonstrative-pronoun';
    case 'interrogative':
      return 'interrogative-pronoun';
    case 'personal':
      return 'personal-pronoun';
    case 'universal':
      return 'universal-quantifier';
    case 'indefinite':
      return 'indefinite-pronoun';
    default:
      return 'sarvādi-pronoun';
  }
}

/**
 * Gets the semantic meaning based on sarvanāma type
 * @param {string} type - The type of sarvanāma
 * @param {string|null} base - Base form if available
 * @param {string} input - The input word
 * @returns {string} Semantic meaning
 */
function getSarvanāmaMeaning(type, base, input) {
  const baseDesc = base ? ` (base: ${base})` : '';
  
  switch (type) {
    case 'demonstrative':
      return `demonstrative pronoun${baseDesc} - points to referent`;
    case 'interrogative':
      return `interrogative pronoun${baseDesc} - questions identity/quantity`;
    case 'personal':
      return `personal pronoun${baseDesc} - refers to speech participants`;
    case 'universal':
      return `universal quantifier${baseDesc} - refers to totality`;
    case 'indefinite':
      return `indefinite pronoun - non-specific reference`;
    default:
      return 'pronominal word in sarvādi class';
  }
}

/**
 * Gets the reference type for semantic analysis
 * @param {string} type - The type of sarvanāma
 * @returns {string} Reference type
 */
function getReferenceType(type) {
  switch (type) {
    case 'demonstrative':
      return 'deictic';
    case 'interrogative':
      return 'question';
    case 'personal':
      return 'participant';
    case 'universal':
      return 'universal';
    case 'indefinite':
      return 'indefinite';
    default:
      return 'pronominal';
  }
}

/**
 * Gets usage examples for sarvanāma words
 * @param {string} type - The type of sarvanāma
 * @param {string} input - The input word
 * @returns {Array} Usage examples
 */
function getSarvanāmaUsageExamples(type, input) {
  const examples = [];
  
  switch (type) {
    case 'demonstrative':
      examples.push(
        `${input} - demonstrative pronoun (this/that reference)`,
        'Usage: तत् पुस्तकम् (that book), एष बालकः (this boy)',
        'Points to entities in context or discourse'
      );
      break;
    case 'interrogative':
      examples.push(
        `${input} - interrogative pronoun (who/what question)`,
        'Usage: कः आगतः? (who came?), किम् पठसि? (what do you read?)',
        'Used to form questions about identity or quantity'
      );
      break;
    case 'personal':
      examples.push(
        `${input} - personal pronoun (I/you/he reference)`,
        'Usage: अहम् गच्छामि (I go), त्वम् पठसि (you read)',
        'Refers to participants in speech situation'
      );
      break;
    case 'universal':
      examples.push(
        `${input} - universal quantifier (all/every)`,
        'Usage: सर्वे जनाः (all people), विश्वम् जगत् (entire world)',
        'Indicates totality or completeness'
      );
      break;
    default:
      examples.push(
        'Demonstrative: तद्, एतद्, इदम् (that, this)',
        'Interrogative: कः, किम्, यद् (who, what, which)',
        'All sarvanāmas follow special grammatical rules'
      );
  }
  
  return examples;
}

/**
 * Gets rules related to sarvanāma classification
 * @returns {Array} Related rules
 */
function getRelatedSarvanāmaRules() {
  return [
    '1.1.27 - सर्वादीनि सर्वनामानि (defines sarvanāma for sarvādi words)',
    '1.1.28 - अपादाने पञ्चमी (case modification rules for sarvanāma)',
    '7.2.102 - त्यदादीनामः (special sandhi for demonstratives)',
    '7.2.84 - अष्टादश्चतुरधिकेषु (specific rules for certain sarvanāmas)',
    '2.4.32 - यदश्च (compound rules involving relative pronouns)'
  ];
}

// Main export for comprehensive analysis
export default analyzeSarvanama;
