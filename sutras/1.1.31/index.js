/**
 * Sutra 1.1.31: द्वन्द्वे च (dvandve ca)
 * "And in Collective Compound (द्वन्द्व), the words सर्व etc. are not सर्वनाम।"
 * 
 * This is a sañjñā (definition) sutra that extends  // Check for iterative patterns (समाहार द्वन्द्व)
  if (constituents.length > 2) {
    pattern = 'iterative';
    isIterative = true;
  }

  // Check for alternation patterns - look for actual vā/वा particles, not just the characters
  // Only override if not already iterative
  if (!isIterative && (/\bvā\b/.test(compound) || /\bवा\b/.test(compound) ||
      compound.includes('-vā-') || compound.includes('-वा-') ||
      compound.endsWith('vā') || compound.endsWith('वा'))) {
    hasAlternation = true;
    pattern = 'alternative';
  }m 1.1.30.
 * In द्वन्द्व compounds (copulative/collective compounds), words like सर्व, विश्व, उभ, etc.
 * also do not function as सर्वनाम (pronouns).
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.31
 */

import { detectScript } from '../shared/index.js';

/**
 * List of words that are normally सर्वनाम but lose this classification in द्वन्द्व
 */
const SARVA_WORDS = [
  // IAST forms
  'sarva', 'viśva', 'ubha', 'ubhaya', 'itara', 'anya', 'anyatara', 
  'ka', 'yat', 'tad', 'etad', 'idam', 'adas', 'ena', 'sva', 'para',
  'apara', 'adhara', 'avara', 'dakṣiṇa', 'uttara', 'apara', 'para',
  'antara', 'sima', 'pūrva', 'eka', 'dvaya', 'dvi', 'tri', 'catur',
  
  // Devanagari forms
  'सर्व', 'विश्व', 'उभ', 'उभय', 'इतर', 'अन्य', 'अन्यतर',
  'क', 'यत्', 'तत्', 'एतत्', 'इदम्', 'अदस्', 'एन', 'स्व', 'पर',
  'अपर', 'अधर', 'अवर', 'दक्षिण', 'उत्तर', 'अपर', 'पर',
  'अन्तर', 'सीम', 'पूर्व', 'एक', 'द्वय', 'द्वि', 'त्रि', 'चतुर्'
];

/**
 * Checks if a compound is a द्वन्द्व (copulative/collective compound)
 * 
 * @param {string} compound - The compound word to analyze
 * @param {Object} context - Grammatical context including compound type
 * @returns {boolean} - True if it's a द्वन्द्व
 */
export function isDvandva(compound, context = {}) {
  if (!compound) {
    return false;
  }

  // Check if explicitly marked as द्वन्द्व
  if (context.compoundType === 'dvandva' || 
      context.compoundType === 'copulative' ||
      context.compoundType === 'collective') {
    return true;
  }

  // Check for द्वन्द्व compound patterns
  if (context.semanticRelation === 'coordination' ||
      context.semanticRelation === 'copulative' ||
      context.semanticRelation === 'collective') {
    return true;
  }

  // Check for typical द्वन्द्व markers (conjunctions)
  if (context.hasConjunction || 
      compound.includes('ca') || 
      compound.includes('च') ||
      compound.includes('vā') ||
      compound.includes('वा')) {
    return true;
  }

  return false;
}

/**
 * Checks if a word normally classified as सर्वनाम loses this classification in द्वन्द्व
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if सर्वनाम classification is lost
 */
export function loseSarvanameInDvandva(word, context = {}) {
  if (!word) {
    return false;
  }

  // Check if the word is normally a सर्वनाम word
  const isSarvaWord = SARVA_WORDS.includes(word.toLowerCase()) || 
                      SARVA_WORDS.includes(word);

  if (!isSarvaWord) {
    return false;
  }

  // Check if we're in a द्वन्द्व context
  return isDvandva(context.compound || word, context);
}

/**
 * Determines if a word should be treated as सर्वनाम considering Sutra 1.1.31
 * 
 * @param {string} word - The word to classify
 * @param {Object} context - Grammatical and compound context
 * @returns {boolean} - True if the word functions as सर्वनाम
 */
export function isSarvanama(word, context = {}) {
  if (!word) {
    return false;
  }

  // Check if it's normally a सर्वनाम word
  const isNormallySarva = SARVA_WORDS.includes(word.toLowerCase()) || 
                          SARVA_WORDS.includes(word);

  if (!isNormallySarva) {
    return false;
  }

  // Apply Sutra 1.1.31: lose सर्वनाम status in द्वन्द्व
  if (loseSarvanameInDvandva(word, context)) {
    return false;
  }

  return true;
}

/**
 * Analyzes compound context to determine सर्वनाम classification in द्वन्द्व
 * 
 * @param {string} compound - The compound word
 * @param {Array} constituents - Array of compound constituents
 * @param {Object} context - Grammatical context
 * @returns {Object} - Analysis result
 */
export function analyzeDvandvaSarvaname(compound, constituents = [], context = {}) {
  if (!compound || !Array.isArray(constituents)) {
    return {
      isDvandva: false,
      sarvanameWords: [],
      nonSarvanameWords: [],
      sutraApplied: false
    };
  }

  const isDvandvaComp = isDvandva(compound, context);
  const sarvanameWords = [];
  const nonSarvanameWords = [];
  
  constituents.forEach(word => {
    if (isSarvanama(word, { ...context, compound })) {
      sarvanameWords.push(word);
    } else {
      nonSarvanameWords.push(word);
    }
  });

  return {
    isDvandva: isDvandvaComp,
    sarvanameWords,
    nonSarvanameWords,
    sutraApplied: isDvandvaComp && constituents.some(word => 
      SARVA_WORDS.includes(word.toLowerCase()) || SARVA_WORDS.includes(word)
    )
  };
}

/**
 * Checks for common द्वन्द्व patterns in Sanskrit compounds
 * 
 * @param {string} compound - The compound to analyze
 * @param {Array} constituents - Array of constituents
 * @returns {Object} - Pattern analysis
 */
export function analyzeDvandvaPatterns(compound, constituents = []) {
  if (!compound || !Array.isArray(constituents)) {
    return {
      pattern: 'unknown',
      isIterative: false,
      hasAlternation: false,
      semanticGroup: null
    };
  }

  let pattern = 'simple';
  let isIterative = false;
  let hasAlternation = false;
  let semanticGroup = null;

  // Check for iterative patterns (समाहार द्वन्द्व)
  if (constituents.length > 2) {
    pattern = 'iterative';
    isIterative = true;
  }

  // Check for alternation patterns - look for actual vā/वा particles, not just the characters
  if (/\bvā\b/.test(compound) || /\bवा\b/.test(compound) ||
      compound.includes('-vā-') || compound.includes('-वा-') ||
      compound.endsWith('vā') || compound.endsWith('वा')) {
    hasAlternation = true;
    pattern = 'alternative';
  }

  // Reset pattern if iterative was detected but alternation overrode it
  if (isIterative && !hasAlternation) {
    pattern = 'iterative';
  }

  // Determine semantic grouping
  const relatednessPatterns = [
    { group: 'kinship', words: ['mātā', 'pitā', 'mata', 'pita', 'माता', 'पिता'] },
    { group: 'directions', words: ['uttara', 'dakṣiṇa', 'pūrva', 'paścima', 'उत्तर', 'दक्षिण', 'पूर्व', 'पश्चिम'] },
    { group: 'numbers', words: ['eka', 'dvi', 'tri', 'catur', 'एक', 'द्वि', 'त्रि', 'चतुर्'] },
    { group: 'pronouns', words: SARVA_WORDS }
  ];

  for (const patternGroup of relatednessPatterns) {
    if (constituents.some(word => patternGroup.words.includes(word))) {
      semanticGroup = patternGroup.group;
      break;
    }
  }

  return {
    pattern,
    isIterative,
    hasAlternation,
    semanticGroup
  };
}

/**
 * Gets examples of द्वन्द्व compounds where सर्व etc. lose सर्वनाम status
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {Object} - Examples categorized by type
 */
export function getDvandvaExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return {
      simpleCoordinative: [
        'सर्वान्य', 'विश्वउभ', 'एकद्वि', 'पूर्वपर', 'उत्तरदक्षिण'
      ],
      iterativeCollective: [
        'सर्वविश्वान्य', 'एकद्वित्रि', 'पूर्वपरान्त'
      ],
      descriptions: [
        'सर्व + अन्य = सर्वान्य (all and other)',
        'विश्व + उभ = विश्वउभ (universe and both)',
        'एक + द्वि = एकद्वि (one and two)',
        'पूर्व + पर = पूर्वपर (previous and next)',
        'उत्तर + दक्षिण = उत्तरदक्षिण (north and south)'
      ]
    };
  } else {
    return {
      simpleCoordinative: [
        'sarvānya', 'viśvubha', 'ekadvi', 'pūrvapara', 'uttaradakṣiṇa'
      ],
      iterativeCollective: [
        'sarvaviśvānya', 'ekadvitri', 'pūrvaparānta'
      ],
      descriptions: [
        'sarva + anya = sarvānya (all and other)',
        'viśva + ubha = viśvubha (universe and both)',
        'eka + dvi = ekadvi (one and two)',
        'pūrva + para = pūrvapara (previous and next)',
        'uttara + dakṣiṇa = uttaradakṣiṇa (north and south)'
      ]
    };
  }
}

/**
 * Validates द्वन्द्व compound and applies appropriate सर्वनाम rules
 * 
 * @param {string} compound - The compound to validate
 * @param {Object} analysis - Compound analysis
 * @param {Object} context - Grammatical context
 * @returns {Object} - Validation result
 */
export function validateSarvanameInDvandva(compound, analysis = {}, context = {}) {
  const result = analyzeDvandvaSarvaname(compound, analysis.constituents, context);
  const patterns = analyzeDvandvaPatterns(compound, analysis.constituents);
  
  return {
    compound,
    isValid: true,
    dvandvaDetected: result.isDvandva,
    sutra1131Applied: result.sutraApplied,
    pattern: patterns.pattern,
    semanticGroup: patterns.semanticGroup,
    sarvanameCount: result.sarvanameWords.length,
    affectedWords: result.nonSarvanameWords.filter(word => 
      SARVA_WORDS.includes(word.toLowerCase()) || SARVA_WORDS.includes(word)
    ),
    recommendation: result.sutraApplied ? 
      'Words like सर्व lose सर्वनाम status in this द्वन्द्व compound' : 
      'Normal सर्वनाम classification applies'
  };
}

/**
 * Combines analysis from both 1.1.30 and 1.1.31 for comprehensive compound analysis
 * 
 * @param {string} compound - The compound to analyze
 * @param {Array} constituents - Array of constituents
 * @param {Object} context - Grammatical context
 * @returns {Object} - Combined analysis
 */
export function analyzeCombinedSarvanameExceptions(compound, constituents = [], context = {}) {
  // Analyze tritiyasamasa (from 1.1.30)
  const isTritiyasamasaComp = context.compoundType === 'tritiyasamasa' || 
                              context.compoundType === 'instrumental_determinative' ||
                              context.semanticRelation === 'instrumental' ||
                              context.semanticRelation === 'karana';
  
  const tritiyasamasaAnalysis = {
    isTritiyasamasa: isTritiyasamasaComp,
    sutra1130Applied: isTritiyasamasaComp && constituents.some(word => 
      SARVA_WORDS.includes(word.toLowerCase()) || SARVA_WORDS.includes(word)
    )
  };
  
  const dvandvaAnalysis = analyzeDvandvaSarvaname(compound, constituents, context);
  
  // Determine if any exceptions apply
  const anyExceptionApplied = tritiyasamasaAnalysis.sutra1130Applied || dvandvaAnalysis.sutraApplied;
  
  return {
    compound,
    constituents,
    tritiyasamasa: tritiyasamasaAnalysis,
    dvandva: dvandvaAnalysis,
    overallSarvanameStatus: dvandvaAnalysis.sarvanameWords,
    exceptionsApplied: {
      sutra1130: tritiyasamasaAnalysis.sutra1130Applied,
      sutra1131: dvandvaAnalysis.sutraApplied
    },
    recommendation: anyExceptionApplied ?
      'सर्वनाम exceptions apply due to compound type' :
      'Normal सर्वनाम classification applies'
  };
}
