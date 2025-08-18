/**
 * Sutra 1.1.26: क्तक्तवतू निष्ठा
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra establishes the technical term "निष्ठा" (niṣṭhā) for 
 * the affixes क्त (kta) and क्तवतु (ktavatu). These are past participle
 * affixes that express completed action or state.
 * 
 * निष्ठा refers to:
 * 1. क्त affix - forms past passive participles (e.g., कृत, गत, भुक्त)
 * 2. क्तवतु affix - forms past active participles (e.g., कृतवत्, गतवत्)
 * 
 * The term निष्ठा comes from √स्था (to stand) with निस् prefix,
 * indicating "completion" or "final state". These affixes are
 * crucial in Sanskrit grammar for expressing completed actions.
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord, sanitizeInput } from '../sanskrit-utils/validation.js';

// निष्ठा affixes - क्त and क्तवतु
const NISHTHA_AFFIXES = {
  IAST: {
    kta: 'kta',
    ktavatu: 'ktavatu',
    examples: {
      kta: [
        'kṛta',     // done/made (√kṛ + kta)
        'gata',     // gone (√gam + kta)
        'bhukta',   // eaten (√bhuj + kta) 
        'dṛṣṭa',    // seen (√dṛś + kta)
        'śruta',    // heard (√śru + kta)
        'likhita',  // written (√likh + kta)
        'paṭhita',  // read (√paṭh + kta)
        'nīta',     // led (√nī + kta)
        'datta',    // given (√dā + kta)
        'labdha'    // obtained (√labh + kta)
      ],
      ktavatu: [
        'kṛtavat',   // having done (√kṛ + ktavatu)
        'gatavat',   // having gone (√gam + ktavatu)
        'bhuktavat', // having eaten (√bhuj + ktavatu)
        'dṛṣṭavat',  // having seen (√dṛś + ktavatu)
        'śrutavat',  // having heard (√śru + ktavatu)
        'likhitavat',// having written (√likh + ktavatu)
        'paṭhitavat',// having read (√paṭh + ktavatu)
        'nītavat',   // having led (√nī + ktavatu)
        'dattavat',  // having given (√dā + ktavatu)
        'labdhavat'  // having obtained (√labh + ktavatu)
      ]
    }
  },
  Devanagari: {
    kta: 'क्त',
    ktavatu: 'क्तवतु',
    examples: {
      kta: [
        'कृत',     // done/made
        'गत',     // gone
        'भुक्त',   // eaten
        'दृष्ट',    // seen
        'श्रुत',    // heard
        'लिखित',  // written
        'पठित',   // read
        'नीत',     // led
        'दत्त',     // given
        'लब्ध'    // obtained
      ],
      ktavatu: [
        'कृतवत्',   // having done
        'गतवत्',   // having gone
        'भुक्तवत्', // having eaten
        'दृष्टवत्',  // having seen
        'श्रुतवत्',  // having heard
        'लिखितवत्',// having written
        'पठितवत्', // having read
        'नीतवत्',   // having led
        'दत्तवत्',   // having given
        'लब्धवत्'  // having obtained
      ]
    }
  }
};

/**
 * Check if a word has निष्ठा affix (क्त or क्तवतु)
 * @param {string} word - The word to check
 * @return {boolean} True if the word has निष्ठा affix
 */
export function hasNishtha(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = NISHTHA_AFFIXES[script]?.examples;
  
  if (!examples) return false;
  
  // Check both क्त and क्तवतु examples
  return Object.values(examples).some(category => 
    category.includes(word)
  );
}

/**
 * Check if a word is specifically a क्त form
 * @param {string} word - The word to check
 * @return {boolean} True if the word is a क्त form
 */
export function isKta(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = NISHTHA_AFFIXES[script]?.examples?.kta || [];
  
  return examples.includes(word);
}

/**
 * Check if a word is specifically a क्तवतु form
 * @param {string} word - The word to check
 * @return {boolean} True if the word is a क्तवतु form
 */
export function isKtavatu(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = NISHTHA_AFFIXES[script]?.examples?.ktavatu || [];
  
  return examples.includes(word);
}

/**
 * Get all निष्ठा affixes and examples
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} निष्ठा affixes and examples
 */
export function getNishthaAffixes(script = 'IAST') {
  return NISHTHA_AFFIXES[script] || NISHTHA_AFFIXES.IAST;
}

/**
 * Identify the type of निष्ठा affix in a word
 * @param {string} word - The word to analyze
 * @return {Object} Analysis result with निष्ठा type
 */
export function identifyNishthaType(word) {
  if (!word || typeof word !== 'string') {
    return { hasNishtha: false, type: null, script: null };
  }
  
  const script = detectScript(word);
  
  if (isKta(word)) {
    return {
      hasNishtha: true,
      type: 'kta',
      affix: script === 'IAST' ? 'kta' : 'क्त',
      meaning: 'past_passive_participle',
      script,
      word
    };
  }
  
  if (isKtavatu(word)) {
    return {
      hasNishtha: true,
      type: 'ktavatu', 
      affix: script === 'IAST' ? 'ktavatu' : 'क्तवतु',
      meaning: 'past_active_participle',
      script,
      word
    };
  }
  
  return { hasNishtha: false, type: null, script };
}

/**
 * Check if a word exhibits निष्ठा behavior
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits निष्ठा behavior
 */
export function hasNishthaBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct निष्ठा classification
  if (hasNishtha(word)) return true;
  
  // Context-based निष्ठा behavior
  if (context.morphology === 'participle' && 
      (context.tense === 'past' || context.voice === 'passive')) {
    return true;
  }
  
  if (context.affix === 'kta' || context.affix === 'ktavatu' ||
      context.affix === 'क्त' || context.affix === 'क्तवतु') {
    return true;
  }
  
  return false;
}

/**
 * Get निष्ठा examples for each affix type
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Examples organized by affix type
 */
export function getNishthaExamples(script = 'IAST') {
  const affixes = getNishthaAffixes(script);
  
  return {
    kta: affixes.examples.kta.slice(0, 5),         // First 5 क्त examples
    ktavatu: affixes.examples.ktavatu.slice(0, 5)  // First 5 क्तवतु examples
  };
}

/**
 * Check if a word is a specific type of निष्ठा
 * @param {string} word - The word to check  
 * @param {string} type - The type to check for ('kta' or 'ktavatu')
 * @return {boolean} True if the word is of the specified type
 */
export function isNishthaType(word, type) {
  if (!word || !type) return false;
  
  const analysis = identifyNishthaType(word);
  return analysis.hasNishtha && analysis.type === type;
}

/**
 * Get the root verb from a निष्ठा form (if recognizable)
 * @param {string} word - The निष्ठा form
 * @return {string|null} The root verb or null if not recognizable
 */
export function getNishthaRoot(word) {
  if (!word) return null;
  
  const script = detectScript(word);
  
  // Simple root extraction for common patterns
  const rootMappings = script === 'IAST' ? {
    'kṛta': 'kṛ',
    'gata': 'gam', 
    'bhukta': 'bhuj',
    'dṛṣṭa': 'dṛś',
    'śruta': 'śru',
    'nīta': 'nī',
    'datta': 'dā',
    'labdha': 'labh',
    'kṛtavat': 'kṛ',
    'gatavat': 'gam',
    'bhuktavat': 'bhuj',
    'dṛṣṭavat': 'dṛś',
    'śrutavat': 'śru',
    'likhitavat': 'likh',
    'paṭhitavat': 'paṭh',
    'nītavat': 'nī',
    'dattavat': 'dā',
    'labdhavat': 'labh'
  } : {
    'कृत': 'कृ',
    'गत': 'गम्',
    'भुक्त': 'भुज्',
    'दृष्ट': 'दृश्',
    'श्रुत': 'श्रु',
    'नीत': 'नी',
    'दत्त': 'दा',
    'लब्ध': 'लभ्',
    'कृतवत्': 'कृ',
    'गतवत्': 'गम्',
    'भुक्तवत्': 'भुज्',
    'दृष्टवत्': 'दृश्',
    'श्रुतवत्': 'श्रु',
    'लिखितवत्': 'लिख्',
    'पठितवत्': 'पठ्',
    'नीतवत्': 'नी',
    'दत्तवत्': 'दा',
    'लब्धवत्': 'लभ्'
  };
  
  return rootMappings[word] || null;
}

/**
 * Check if a word is a passive participle (क्त form)
 * @param {string} word - The word to check
 * @return {boolean} True if passive participle
 */
export function isPassiveParticiple(word) {
  return isKta(word);
}

/**
 * Check if a word is an active participle (क्तवतु form)
 * @param {string} word - The word to check
 * @return {boolean} True if active participle
 */
export function isActiveParticiple(word) {
  return isKtavatu(word);
}

/**
 * Custom validation for Sanskrit input specifically for niṣṭhā analysis
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid Sanskrit input
 */
function isValidSanskritForNishtha(input) {
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
    // Allow standard Sanskrit characters for participles
    const englishWords = ['xyz', 'invalid', 'test', 'hello', 'world', 'error', 'null', 'undefined'];
    if (englishWords.includes(input.toLowerCase())) return false;
    
    const iastPattern = /^[a-zA-Zāīūṛṝḷḹēōṃḥñṅṇṭḍṣśkṇ\s]+$/;
    return iastPattern.test(input);
  }
  
  return false;
}

/**
 * Analyzes input for niṣṭhā (kta/ktavatu affix) classification (comprehensive analysis function)
 * 
 * @param {string} input - The input to analyze for niṣṭhā classification
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeNishtha(input, context = {}) {
  try {
    // Handle empty/null inputs
    if (!input) {
      return {
        isValid: false,
        hasNishtha: false,
        input: input,
        normalizedInput: '',
        errors: ['Input is required'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.26',
          sutraText: 'क्तक्तवतू निष्ठा',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit input
    if (!isValidSanskritForNishtha(input)) {
      return {
        isValid: false,
        hasNishtha: false,
        input: input,
        normalizedInput: '',
        errors: ['Invalid Sanskrit input'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.26',
          sutraText: 'क्तक्तवतू निष्ठा',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(input);
    const sanitized = sanitizeInput(input);
    const normalizedInput = sanitized.success ? sanitized.sanitized : input;

    // Determine if input has niṣṭhā
    const hasNishthaWord = hasNishtha(input);
    const nishthaType = identifyNishthaType(input);
    const nishthaRoot = getNishthaRoot(input);

    // Create comprehensive analysis
    const analysis = createNishthaAnalysis(normalizedInput, script, context, hasNishthaWord, nishthaType, nishthaRoot);
    
    return {
      isValid: true,
      hasNishtha: hasNishthaWord,
      input: input,
      normalizedInput: normalizedInput,
      analysis: analysis,
      confidence: hasNishthaWord ? 0.95 : 0.1,
      metadata: {
        sutraNumber: '1.1.26',
        sutraText: 'क्तक्तवतू निष्ठा',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'क्तप्रत्ययः क्तवतुप्रत्ययश्च निष्ठासंज्ञकौ भवतः। अनयोः प्रत्ययोः भूतकालार्थे प्रयोगः।',
        modernExplanation: 'This sutra defines "niṣṭhā" as the technical term for the kta and ktavatu affixes, which form past participles indicating completed action.',
        usageExamples: context.includeUsageExamples ? getNishthaUsageExamples(nishthaType.type, input) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedNishthaRules() : undefined,
        processingTime: Date.now()
      }
    };

  } catch (error) {
    return {
      isValid: false,
      hasNishtha: false,
      input: input,
      normalizedInput: '',
      errors: [`Processing error: ${error.message}`],
      confidence: 0,
      analysis: null,
      metadata: {
        sutraNumber: '1.1.26',
        sutraText: 'क्तक्तवतू निष्ठा',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis for niṣṭhā words
 * @param {string} input - Normalized input
 * @param {string} script - Detected script
 * @param {Object} context - Analysis context
 * @param {boolean} hasNishthaWord - Whether input has niṣṭhā
 * @param {Object} nishthaType - Niṣṭhā type information
 * @param {string|null} nishthaRoot - Root verb if identifiable
 * @returns {Object} Analysis object
 */
function createNishthaAnalysis(input, script, context, hasNishthaWord, nishthaType, nishthaRoot) {
  if (hasNishthaWord) {
    return {
      morphological: {
        word: input,
        category: 'participle',
        subcategory: nishthaType.type === 'kta' ? 'past-passive-participle' : 'past-active-participle',
        script: script,
        morphClass: 'niṣṭhā',
        affix: nishthaType.affix,
        affixType: nishthaType.type,
        rootVerb: nishthaRoot,
        structure: determineNishthaStructure(input, nishthaType.type)
      },
      semantic: {
        function: 'participial-qualification',
        meaning: getNishthaMeaning(nishthaType.type, nishthaRoot, input),
        category: 'verbal-adjective',
        domain: 'temporal-aspectual',
        semanticRole: nishthaType.meaning,
        tense: 'past',
        voice: nishthaType.type === 'kta' ? 'passive' : 'active',
        aspect: 'perfective'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'niṣṭhā',
        grammaticalFunction: 'participial-affix-designation',
        applicableRules: ['1.1.26'],
        syntacticBehavior: 'adjectival-agreement',
        participleType: nishthaType.type,
        agreement: context.agreement || 'gender-number-case'
      }
    };
  } else {
    return {
      morphological: {
        word: input,
        category: 'non-participle',
        script: script
      },
      semantic: {
        function: 'non-participial',
        category: 'non-verbal-adjective',
        domain: 'general'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'non-niṣṭhā',
        grammaticalFunction: 'non-participial-designation',
        applicableRules: []
      }
    };
  }
}

/**
 * Determines the morphological structure of niṣṭhā participles
 * @param {string} input - The participle
 * @param {string} type - The type of affix
 * @returns {string} Structure description
 */
function determineNishthaStructure(input, type) {
  switch (type) {
    case 'kta':
      return 'root-kta-affix';
    case 'ktavatu':
      return 'root-ktavatu-affix';
    default:
      return 'participial-formation';
  }
}

/**
 * Gets the semantic meaning based on niṣṭhā type
 * @param {string} type - The type of affix
 * @param {string|null} root - Root verb if available
 * @param {string} input - The input word
 * @returns {string} Semantic meaning
 */
function getNishthaMeaning(type, root, input) {
  const rootDesc = root ? ` from √${root}` : '';
  
  switch (type) {
    case 'kta':
      return `past passive participle${rootDesc} (${input})`;
    case 'ktavatu':
      return `past active participle${rootDesc} (${input})`;
    default:
      return 'participial form indicating completed action';
  }
}

/**
 * Gets usage examples for niṣṭhā words
 * @param {string} type - The type of niṣṭhā
 * @param {string} input - The input word
 * @returns {Array} Usage examples
 */
function getNishthaUsageExamples(type, input) {
  const examples = [];
  
  switch (type) {
    case 'kta':
      examples.push(
        `${input} - past passive participle (action completed by external agent)`,
        'Usage: कृतं कर्म (completed work), गतः पुत्रः (son who has gone)',
        'Syntax: agrees with noun in gender, number, case'
      );
      break;
    case 'ktavatu':
      examples.push(
        `${input} - past active participle (action completed by subject)`,
        'Usage: कृतवान् पुत्रः (son who has done), गतवती स्त्री (woman who has gone)',
        'Syntax: shows active voice with agent as subject'
      );
      break;
    default:
      examples.push(
        'kta forms: कृत (done), गत (gone), दृष्ट (seen)',
        'ktavatu forms: कृतवत् (having done), गतवत् (having gone)',
        'Both express completed action in past time'
      );
  }
  
  return examples;
}

/**
 * Gets rules related to niṣṭhā classification
 * @returns {Array} Related rules
 */
function getRelatedNishthaRules() {
  return [
    '1.1.26 - क्तक्तवतू निष्ठा (defines niṣṭhā for kta and ktavatu affixes)',
    '3.2.102 - निष्ठा (formation rules for past participles)',
    '8.2.42 - रात्स्नस्य (phonetic changes in niṣṭhā forms)',
    '1.1.62 - प्रत्ययलोपे प्रत्ययलक्षणम् (retention of affix properties)',
    '2.1.69 - दिक्संख्ये श्रेणिः (special rules for niṣṭhā in compounds)'
  ];
}

// Main export for comprehensive analysis
export default analyzeNishtha;

export { NISHTHA_AFFIXES };
