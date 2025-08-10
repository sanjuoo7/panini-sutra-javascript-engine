/**
 * Morphological Analysis Utilities
 * 
 * This module provides morphological analysis functions extracted from
 * Sutra 1.1.4's comprehensive feature-based system, making them available
 * for use across all sutras that need morphological classification.
 * 
 * Created: August 8, 2025
 */

import { isVowel, isConsonant } from './classification.js';
import { tokenizePhonemes } from './phoneme-tokenization.js';

/**
 * Morphological condition constants for affix classification
 * Extracted from Sutra 1.1.4's MORPHOLOGICAL_CONDITIONS
 */
export const MORPHOLOGICAL_CONDITIONS = {
  // Primary affix types
  TIN_AFFIXES: ['ti', 'ta', 'tha', 'tu', 'te', 'ante', 'si', 'thas'],
  TADDHITA_AFFIXES: ['a', 'ya', 'ana', 'in', 'vant', 'mat'],
  KRIT_AFFIXES: ['ta', 'ana', 'aka', 'tr'],
  
  // Functional categories
  PERSONAL_ENDINGS: ['mi', 'si', 'ti', 'vas', 'thas', 'tas', 'ma', 'tha', 'anti'],
  PARTICIPIAL_ENDINGS: ['ta', 'mana', 'ana'],
  DERIVATIVE_SUFFIXES: ['ana', 'aka', 'in', 'ya'],
  
  // Structural patterns
  VOWEL_INITIAL: /^[aāiīuūṛṝḷḹeēoōaiāu]/,
  CONSONANT_INITIAL: /^[kkhgghanācchajjhañaṭṭhaḍḍhaṇatathaddhananpaphababhamāyaralavāśaṣasaha]/
};

/**
 * Analyzes the morphological function of an affix
 * Enhanced version from Sutra 1.1.4
 * 
 * @param {string} affix - Affix to analyze
 * @returns {Object} - Morphological analysis result
 */
export function analyzeMorphologicalFunction(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      affix: null,
      functions: [],
      primary: null,
      confidence: 0
    };
  }
  
  const functions = [];
  let primaryFunction = null;
  let confidence = 0;
  
  // Check for verbal endings (tiṅ)
  if (MORPHOLOGICAL_CONDITIONS.TIN_AFFIXES.includes(affix) || 
      MORPHOLOGICAL_CONDITIONS.PERSONAL_ENDINGS.includes(affix)) {
    functions.push('verbal_ending');
    primaryFunction = 'verbal_ending';
    confidence += 0.8;
  }
  
  // Check for participial forms
  if (MORPHOLOGICAL_CONDITIONS.PARTICIPIAL_ENDINGS.some(ending => affix.includes(ending))) {
    functions.push('participial');
    if (!primaryFunction) primaryFunction = 'participial';
    confidence += 0.7;
  }
  
  // Check for derivative suffixes
  if (MORPHOLOGICAL_CONDITIONS.DERIVATIVE_SUFFIXES.includes(affix) ||
      MORPHOLOGICAL_CONDITIONS.TADDHITA_AFFIXES.includes(affix)) {
    functions.push('derivative');
    if (!primaryFunction) primaryFunction = 'derivative';
    confidence += 0.6;
  }
  
  // Check for kṛt affixes (primary derivatives)
  if (MORPHOLOGICAL_CONDITIONS.KRIT_AFFIXES.includes(affix)) {
    functions.push('krit_derivative');
    if (!primaryFunction) primaryFunction = 'krit_derivative';
    confidence += 0.9;
  }
  
  return {
    isValid: true,
    affix: affix,
    functions: functions,
    primary: primaryFunction || 'unknown',
    confidence: Math.min(confidence, 1.0),
    isVerbalEnding: functions.includes('verbal_ending'),
    isParticipal: functions.includes('participial'),
    isPrimaryDerivative: functions.includes('krit_derivative'),
    isSecondaryDerivative: functions.includes('derivative'),
    morphologicalType: primaryFunction || 'unclassified'
  };
}

/**
 * Analyzes phonological structure of morphological units
 * Extracted from Sutra 1.1.4's structure analysis
 * 
 * @param {string} unit - Morphological unit to analyze (dhātu, affix, etc.)
 * @returns {Object} - Phonological structure analysis
 */
export function analyzePhonologicalStructure(unit) {
  if (!unit || typeof unit !== 'string') {
    return {
      isValid: false,
      structure: null,
      patterns: [],
      complexity: 0
    };
  }
  
  const tokenResult = tokenizePhonemes(unit);
  const phonemes = tokenResult.phonemes || [];
  
  const analysis = {
    isValid: true,
    unit: unit,
    phonemes: phonemes,
    length: phonemes.length,
    structure: '',
    patterns: [],
    complexity: 0,
    script: tokenResult.script
  };
  
  // Build CV structure pattern
  let structure = '';
  let vowelCount = 0;
  let consonantCount = 0;
  
  phonemes.forEach(phoneme => {
    if (isVowel(phoneme)) {
      structure += 'V';
      vowelCount++;
    } else if (isConsonant(phoneme)) {
      structure += 'C';
      consonantCount++;
    } else {
      structure += 'X'; // Unknown
    }
  });
  
  analysis.structure = structure;
  analysis.vowelCount = vowelCount;
  analysis.consonantCount = consonantCount;
  
  // Identify common patterns
  if (structure.match(/^CV$/)) analysis.patterns.push('simple_cv');
  if (structure.match(/^CVC$/)) analysis.patterns.push('simple_cvc');
  if (structure.match(/^V/)) analysis.patterns.push('vowel_initial');
  if (structure.match(/C$/)) analysis.patterns.push('consonant_final');
  if (structure.match(/CC/)) analysis.patterns.push('consonant_cluster');
  if (vowelCount > 1) analysis.patterns.push('multisyllabic');
  
  // Calculate complexity score
  analysis.complexity = (consonantCount * 0.5) + (vowelCount * 0.3) + 
                       (structure.match(/CC/g)?.length || 0) * 0.7;
  
  return analysis;
}

/**
 * Determines if a unit has canonical CVC structure
 * @param {string} unit - Unit to analyze
 * @returns {boolean} - True if canonical CVC
 */
export function hasCanonicalCVCStructure(unit) {
  const analysis = analyzePhonologicalStructure(unit);
  return analysis.isValid && analysis.structure === 'CVC';
}

/**
 * Checks if a unit is monosyllabic
 * @param {string} unit - Unit to analyze  
 * @returns {boolean} - True if monosyllabic
 */
export function isMonosyllabic(unit) {
  const analysis = analyzePhonologicalStructure(unit);
  return analysis.isValid && analysis.vowelCount === 1;
}

/**
 * Determines root class based on morphological patterns
 * Enhanced from Sutra 1.1.4's root classification
 * 
 * @param {string} root - Root to classify
 * @returns {Object} - Root classification result
 */
export function determineRootClass(root) {
  if (!root || typeof root !== 'string') {
    return {
      isValid: false,
      root: null,
      class: 'unknown',
      patterns: [],
      confidence: 0
    };
  }
  
  const structure = analyzePhonologicalStructure(root);
  const patterns = [];
  let rootClass = 'unknown';
  let confidence = 0;
  
  // Basic structural classification
  if (structure.structure === 'CVC') {
    patterns.push('canonical_cvc');
    rootClass = 'canonical';
    confidence += 0.7;
  }
  
  if (structure.patterns.includes('consonant_cluster')) {
    patterns.push('cluster_root');
    if (rootClass === 'unknown') rootClass = 'complex';
    confidence += 0.5;
  }
  
  if (structure.vowelCount === 1) {
    patterns.push('monosyllabic');
    confidence += 0.6;
  }
  
  // Pattern-specific classification
  if (root.match(/^[aeiou]/)) {
    patterns.push('vowel_initial');
    if (rootClass === 'unknown') rootClass = 'vowel_initial';
    confidence += 0.4;
  }
  
  if (root.endsWith('ā') || root.endsWith('ī') || root.endsWith('ū')) {
    patterns.push('long_vowel_final');
    if (rootClass === 'unknown') rootClass = 'vowel_final';
    confidence += 0.5;
  }
  
  return {
    isValid: true,
    root: root,
    class: rootClass,
    patterns: patterns,
    confidence: Math.min(confidence, 1.0),
    structure: structure,
    isCanonical: patterns.includes('canonical_cvc'),
    isMonosyllabic: patterns.includes('monosyllabic'),
    hasCluster: patterns.includes('cluster_root')
  };
}

/**
 * Analyzes affix attachment properties
 * @param {string} affix - Affix to analyze
 * @returns {Object} - Attachment analysis
 */
export function analyzeAffixAttachment(affix) {
  const morphFunction = analyzeMorphologicalFunction(affix);
  const structure = analyzePhonologicalStructure(affix);
  
  return {
    affix: affix,
    morphologicalFunction: morphFunction,
    phonologicalStructure: structure,
    attachmentType: morphFunction.primary,
    isVowelInitial: structure.patterns.includes('vowel_initial'),
    isConsonantInitial: !structure.patterns.includes('vowel_initial'),
    complexity: structure.complexity,
    likelyOperations: getLikelyOperations(morphFunction, structure)
  };
}

/**
 * Determines likely phonological operations for an affix
 * @param {Object} morphFunction - Morphological function analysis
 * @param {Object} structure - Phonological structure analysis
 * @returns {Array<string>} - Likely operations
 */
function getLikelyOperations(morphFunction, structure) {
  const operations = [];
  
  if (morphFunction.isVerbalEnding) {
    operations.push('guna_possible', 'vrddhi_possible');
  }
  
  if (morphFunction.isPrimaryDerivative) {
    operations.push('strong_guna', 'potential_vrddhi');
  }
  
  if (structure.patterns.includes('vowel_initial')) {
    operations.push('sandhi_likely', 'elision_possible');
  }
  
  if (structure.patterns.includes('consonant_cluster')) {
    operations.push('cluster_resolution');
  }
  
  return operations;
}

/**
 * Batch morphological analysis
 * @param {Array<string>} units - Units to analyze
 * @returns {Array<Object>} - Analysis results
 */
export function batchMorphologicalAnalysis(units) {
  if (!Array.isArray(units)) return [];
  
  return units.map(unit => ({
    unit: unit,
    morphological: analyzeMorphologicalFunction(unit),
    phonological: analyzePhonologicalStructure(unit),
    rootClass: determineRootClass(unit),
    attachment: analyzeAffixAttachment(unit)
  }));
}
