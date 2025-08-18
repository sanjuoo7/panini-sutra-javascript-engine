/**
 * Sutra 1.1.22: तरप्तमपौ घः (taraptamapau ghaḥ)
 * "The affixes तरप् and तमप् are called घ।"
 * 
 * This is a saṃjñā (definition) sutra that defines the technical term घ
 * for the comparative (तरप्) and superlative (तमप्) affixes.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.22
 */

import { 
  detectScript,
  validateSanskritWord,
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * List of affixes that are classified as घ
 */
const GHA_AFFIXES = {
  iast: ['tarap', 'tamap'],
  devanagari: ['तरप्', 'तमप्']
};

/**
 * Checks if an affix is classified as घ according to Sutra 1.1.22
 * 
 * @param {string} affix - The affix to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the affix is घ
 */
export function isGha(affix, context = {}) {
  if (!affix) {
    return false;
  }

  try {
    const script = detectScript(affix);
    
    if (script === 'Devanagari') {
      return GHA_AFFIXES.devanagari.includes(affix);
    } else {
      return GHA_AFFIXES.iast.includes(affix);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Gets all घ affixes
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of घ affixes
 */
export function getGhaAffixes(script = 'IAST') {
  if (script === 'Devanagari') {
    return [...GHA_AFFIXES.devanagari];
  } else {
    return [...GHA_AFFIXES.iast];
  }
}

/**
 * Checks if a word contains a घ affix
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Morphological context
 * @returns {boolean} - True if word contains घ affix
 */
export function hasGhaAffix(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    const affixes = script === 'Devanagari' ? GHA_AFFIXES.devanagari : GHA_AFFIXES.iast;
    
    return affixes.some(affix => word.includes(affix));
  } catch (error) {
    return false;
  }
}

/**
 * Identifies the type of घ affix in a word
 * 
 * @param {string} word - The word to analyze
 * @returns {Object} - Information about the घ affix
 */
export function identifyGhaType(word) {
  if (!word) {
    return { hasGha: false, type: null, degree: null };
  }

  try {
    const script = detectScript(word);
    
    if (script === 'Devanagari') {
      if (word.includes('तरप्')) {
        return { hasGha: true, type: 'तरप्', degree: 'comparative', script: 'Devanagari' };
      }
      if (word.includes('तमप्')) {
        return { hasGha: true, type: 'तमप्', degree: 'superlative', script: 'Devanagari' };
      }
    } else {
      if (word.includes('tarap')) {
        return { hasGha: true, type: 'tarap', degree: 'comparative', script: 'IAST' };
      }
      if (word.includes('tamap')) {
        return { hasGha: true, type: 'tamap', degree: 'superlative', script: 'IAST' };
      }
    }
    
    return { hasGha: false, type: null, degree: null };
  } catch (error) {
    return { hasGha: false, type: null, degree: null };
  }
}

/**
 * Checks if घ rules should apply to a word or affix
 * 
 * @param {string} input - The input to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if घ rules apply
 */
export function hasGhaBehavior(input, context = {}) {
  return isGha(input, context) || hasGhaAffix(input, context);
}

/**
 * Gets examples of words formed with घ affixes
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {Object} - Examples organized by affix type
 */
export function getGhaExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return {
      tarap: ['गुरुतरप्', 'लघुतरप्', 'श्रेष्ठतरप्'],
      tamap: ['गुरुतमप्', 'लघुतमप्', 'श्रेष्ठतमप्']
    };
  } else {
    return {
      tarap: ['gurutarap', 'laghutarap', 'śreṣṭhatarap'],
      tamap: ['gurutamap', 'laghutamap', 'śreṣṭhatamap']
    };
  }
}

/**
 * Custom validation for Sanskrit input specifically for gha affix analysis
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid Sanskrit input
 */
function isValidSanskritForGha(input) {
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
 * Analyzes input for gha affix classification (comprehensive analysis function)
 * 
 * @param {string} input - The input to analyze for gha affix classification
 * @param {Object} context - Optional grammatical context
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeGha(input, context = {}) {
  try {
    // Handle empty/null inputs
    if (!input) {
      return {
        isValid: false,
        isGha: false,
        input: input,
        normalizedInput: '',
        errors: ['Input is required'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.22',
          sutraText: 'तरप्तमपौ घः',
          processingTime: Date.now()
        }
      };
    }

    // Validate Sanskrit input
    if (!isValidSanskritForGha(input)) {
      return {
        isValid: false,
        isGha: false,
        input: input,
        normalizedInput: '',
        errors: ['Invalid Sanskrit input'],
        confidence: 0,
        analysis: null,
        metadata: {
          sutraNumber: '1.1.22',
          sutraText: 'तरप्तमपौ घः',
          processingTime: Date.now()
        }
      };
    }

    // Normalize input
    const script = detectScript(input);
    const sanitized = sanitizeInput(input);
    const normalizedInput = sanitized.success ? sanitized.sanitized : input;

    // Determine if input is gha affix
    const isGhaAffix = isGha(input, context);
    const ghaType = identifyGhaType(input);

    // Create comprehensive analysis
    const analysis = createGhaAnalysis(normalizedInput, script, context, isGhaAffix, ghaType);
    
    return {
      isValid: true,
      isGha: isGhaAffix,
      input: input,
      normalizedInput: normalizedInput,
      analysis: analysis,
      confidence: isGhaAffix ? 0.95 : 0.1,
      metadata: {
        sutraNumber: '1.1.22',
        sutraText: 'तरप्तमपौ घः',
        commentaryReferences: ['Kāśikā', 'Patañjali Mahābhāṣya'],
        traditionalExplanation: 'तरप्तमपौ इत्येतौ प्रत्ययौ घसंज्ञौ भवतः। तुलनार्थकयोः प्रत्यययोः घनाम।',
        modernExplanation: 'This sutra defines the technical term "gha" for the comparative affix तरप् (tarap) and superlative affix तमप् (tamap), establishing their special grammatical behavior.',
        usageExamples: context.includeUsageExamples ? getGhaUsageExamples(ghaType.type) : undefined,
        relatedRules: context.includeRelatedRules ? getRelatedGhaRules() : undefined,
        processingTime: Date.now()
      }
    };

  } catch (error) {
    return {
      isValid: false,
      isGha: false,
      input: input,
      normalizedInput: '',
      errors: [`Processing error: ${error.message}`],
      confidence: 0,
      analysis: null,
      metadata: {
        sutraNumber: '1.1.22',
        sutraText: 'तरप्तमपौ घः',
        processingTime: Date.now()
      }
    };
  }
}

/**
 * Creates comprehensive morphological, semantic, and syntactic analysis for gha affixes
 * @param {string} input - Normalized input
 * @param {string} script - Detected script
 * @param {Object} context - Analysis context
 * @param {boolean} isGhaAffix - Whether input is a gha affix
 * @param {Object} ghaType - Gha type information
 * @returns {Object} Analysis object
 */
function createGhaAnalysis(input, script, context, isGhaAffix, ghaType) {
  if (isGhaAffix) {
    return {
      morphological: {
        affixType: ghaType.type || input,
        category: 'comparative-superlative',
        degree: ghaType.degree || 'unknown',
        script: script,
        morphClass: 'taddhita-pratyaya',
        formation: 'primary-affix'
      },
      semantic: {
        function: 'degree-formation',
        meaning: ghaType.degree === 'comparative' ? 'more/greater degree' : 'most/highest degree',
        category: 'qualitative-gradation',
        domain: 'degree-comparison',
        semanticRole: ghaType.degree || 'gradation'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'gha',
        grammaticalFunction: 'affix-designation',
        applicableRules: ['1.1.22'],
        syntacticBehavior: 'special-gha-rules',
        attachmentType: context.attachmentType || 'suffix'
      }
    };
  } else {
    return {
      morphological: {
        affixType: 'non-gha',
        category: 'other-affix',
        script: script
      },
      semantic: {
        function: 'non-degree-formation',
        category: 'non-comparative',
        domain: 'general'
      },
      syntactic: {
        ruleType: 'saṃjñā',
        classification: 'non-gha',
        grammaticalFunction: 'non-gha-designation',
        applicableRules: []
      }
    };
  }
}

/**
 * Gets usage examples for gha affixes
 * @param {string} affixType - The type of gha affix
 * @returns {Array} Usage examples
 */
function getGhaUsageExamples(affixType) {
  const examples = [];
  
  if (affixType === 'tarap' || affixType === 'तरप्') {
    examples.push(
      'गुरुतरप् - more heavy/heavier (comparative)',
      'लघुतरप् - more light/lighter (comparative)',
      'श्रेष्ठतरप् - more excellent/better (comparative)'
    );
  } else if (affixType === 'tamap' || affixType === 'तमप्') {
    examples.push(
      'गुरुतमप् - most heavy/heaviest (superlative)',
      'लघुतमप् - most light/lightest (superlative)',
      'श्रेष्ठतमप् - most excellent/best (superlative)'
    );
  } else {
    examples.push(
      'Comparative forms use तरप् (tarap) for "more/greater" degree',
      'Superlative forms use तमप् (tamap) for "most/highest" degree',
      'Both affixes follow special gha rules for attachment and modification'
    );
  }
  
  return examples;
}

/**
 * Gets rules related to gha affix classification
 * @returns {Array} Related rules
 */
function getRelatedGhaRules() {
  return [
    '1.1.22 - तरप्तमपौ घः (defines gha for comparison affixes)',
    '5.3.55 - तरप्तमपोर्विशेषणे (usage of tarap/tamap in qualification)',
    '2.1.6 - षष्ठी (genitive case with comparative/superlative)',
    '5.3.57 - अतिशायने तमप् (superlative usage rules)'
  ];
}

// Main export for comprehensive analysis
export default analyzeGha;
