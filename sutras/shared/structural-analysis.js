/**
 * Structural Analysis Utilities
 * 
 * This module provides structural and phonetic analysis functions extracted from
 * Sutra 1.1.4's comprehensive feature-based system, making them available
 * for use across all sutras that need structural analysis.
 * 
 * Created: August 9, 2025
 */

import { isVowel, isConsonant } from './classification.js';
import { tokenizePhonemes } from './phoneme-tokenization.js';

/**
 * Analyzes the phonological structure of a morphological unit
 * Extracted from Sutra 1.1.4's structure analysis
 * 
 * @param {string} unit - Morphological unit to analyze (dhātu, affix, etc.)
 * @returns {Object} - Phonological structure analysis
 */
export function analyzePhonologicalStructure(unit) {
  if (!unit || typeof unit !== 'string') {
    return {
      isValid: false,
      unit: null,
      patterns: [],
      complexity: 0,
      vowelCount: 0,
      consonantCount: 0
    };
  }

  const phonemes = tokenizePhonemes(unit);
  const patterns = [];
  let vowelCount = 0;
  let consonantCount = 0;
  let complexity = 0;

  // Handle case where tokenizePhonemes returns a string instead of array
  const phonemsArray = Array.isArray(phonemes) ? phonemes : (typeof phonemes === 'string' ? phonemes.split('') : []);

  // Analyze phoneme patterns
  phonemsArray.forEach((phoneme, index) => {
    if (isVowel(phoneme)) {
      vowelCount++;
      if (index === 0) patterns.push('vowel_initial');
      if (phoneme.length > 1) patterns.push('long_vowel');
    } else if (isConsonant(phoneme)) {
      consonantCount++;
      if (index === 0) patterns.push('consonant_initial');
      if (phoneme.length > 1) patterns.push('aspirated_consonant');
    }
  });

  // Check for clusters
  let hasConsonantCluster = false;
  for (let i = 0; i < phonemsArray.length - 1; i++) {
    if (isConsonant(phonemsArray[i]) && isConsonant(phonemsArray[i + 1])) {
      hasConsonantCluster = true;
      patterns.push('consonant_cluster');
      complexity += 1;
      break;
    }
  }

  // Calculate complexity score
  complexity += vowelCount * 0.5 + consonantCount * 0.3;
  if (hasConsonantCluster) complexity += 1;
  if (patterns.includes('vowel_initial')) complexity += 0.2;

  return {
    isValid: true,
    unit: unit,
    patterns: patterns,
    complexity: complexity,
    vowelCount: vowelCount,
    consonantCount: consonantCount,
    hasConsonantCluster: hasConsonantCluster,
    phonemes: phonemsArray
  };
}

/**
 * Analyzes the internal phonetic structure of a verbal root
 * Extracted from Sutra 1.1.4
 * 
 * @param {string} dhatu - Verbal root to analyze
 * @returns {Object} - Phonetic structure analysis
 */
export function analyzeDhatuPhoneticStructure(dhatu) {
  if (!dhatu || typeof dhatu !== 'string') {
    return {
      isValid: false,
      dhatu: null,
      nucleus: null,
      consonantPattern: null,
      structure: null
    };
  }

  const nucleus = extractNucleusVowel(dhatu);
  const consonantPattern = extractConsonantPattern(dhatu);
  
  // Analyze overall structure
  const structure = analyzePhonologicalStructure(dhatu);
  
  return {
    isValid: true,
    dhatu: dhatu,
    nucleus: nucleus,
    consonantPattern: consonantPattern,
    structure: structure,
    syllableCount: structure.vowelCount,
    isMonosyllabic: structure.vowelCount === 1,
    hasCentralVowel: nucleus && nucleus.includes('a'),
    endsInStop: consonantPattern && /[kghṅcjñṭḍṇtdnpb]$/.test(consonantPattern)
  };
}

/**
 * Extracts the nuclear vowel from a dhātu
 * @param {string} dhatu - The verbal root
 * @returns {string|null} - The nuclear vowel or null if not found
 */
export function extractNucleusVowel(dhatu) {
  if (!dhatu) return null;
  
  const vowelMatch = dhatu.match(/[aāiīuūṛṝḷḹeēoōaiāu]/);
  return vowelMatch ? vowelMatch[0] : null;
}

/**
 * Extracts the consonant pattern from a dhātu
 * @param {string} dhatu - The verbal root
 * @returns {string} - The consonant pattern
 */
export function extractConsonantPattern(dhatu) {
  if (!dhatu) return '';
  
  return dhatu.replace(/[aāiīuūṛṝḷḹeēoōaiāu]/g, '');
}

/**
 * Analyzes the phonetic environment around a morpheme boundary
 * @param {string} dhatu - The verbal root
 * @param {string} affix - The affix
 * @returns {Object} - Phonetic environment analysis
 */
export function analyzePhoneticEnvironment(dhatu, affix) {
  if (!dhatu || !affix) {
    return {
      isValid: false,
      dhatuFinal: null,
      affixInitial: null,
      boundary: null,
      interactions: []
    };
  }

  const dhatuFinal = dhatu.slice(-1);
  const affixInitial = affix.slice(0, 1);
  const interactions = [];

  // Analyze potential interactions
  if (isConsonant(dhatuFinal) && isConsonant(affixInitial)) {
    interactions.push('consonant_cluster_formation');
  }
  
  if (isVowel(dhatuFinal) && isVowel(affixInitial)) {
    interactions.push('vowel_sandhi');
  }
  
  if (dhatuFinal === 'd' && affixInitial === 't') {
    interactions.push('retroflex_assimilation');
  }

  return {
    isValid: true,
    dhatuFinal: dhatuFinal,
    affixInitial: affixInitial,
    boundary: dhatuFinal + '+' + affixInitial,
    interactions: interactions,
    hasClusterFormation: interactions.includes('consonant_cluster_formation'),
    hasVowelSandhi: interactions.includes('vowel_sandhi')
  };
}

/**
 * Analyzes morpheme boundary interactions
 * @param {string} dhatu - The verbal root
 * @param {string} affix - The affix
 * @returns {Object} - Boundary analysis
 */
export function analyzeMorphemeBoundary(dhatu, affix) {
  const phoneticEnv = analyzePhoneticEnvironment(dhatu, affix);
  const dhatuStructure = analyzeDhatuPhoneticStructure(dhatu);
  const affixStructure = analyzePhonologicalStructure(affix);
  
  return {
    isValid: true,
    dhatu: dhatu,
    affix: affix,
    phoneticEnvironment: phoneticEnv,
    dhatuStructure: dhatuStructure,
    affixStructure: affixStructure,
    boundaryComplexity: phoneticEnv.interactions.length + 
                       (dhatuStructure.structure?.complexity || 0) + 
                       (affixStructure.complexity || 0)
  };
}

/**
 * Batch structural analysis for multiple units
 * @param {Array<string>} units - Units to analyze
 * @returns {Array<Object>} - Analysis results
 */
export function batchStructuralAnalysis(units) {
  if (!Array.isArray(units)) {
    return [];
  }
  
  return units.map(unit => analyzePhonologicalStructure(unit));
}
