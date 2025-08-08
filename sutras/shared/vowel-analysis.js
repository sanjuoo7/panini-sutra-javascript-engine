/**
 * Vowel Analysis and Transformation Utilities
 * 
 * This module provides comprehensive vowel analysis and transformation functions:
 * - Detailed vowel analysis
 * - Vowel gradation (guṇa/vṛddhi transformations)
 * - First vowel extraction
 * - Cross-sutra compatible analysis
 * 
 * Created: August 8, 2025
 */

import { detectScript } from './script-detection.js';
import { tokenizePhonemes } from './phoneme-tokenization.js';
import { getVowelClassifications, getVowelCategory, isVowel } from './classification.js';
import { VowelGradations } from './constants.js';

// ==================== VOWEL ANALYSIS ====================

/**
 * Analyzes a vowel and provides comprehensive classification
 * @param {string} vowel - Vowel to analyze
 * @returns {Object} - Detailed analysis result
 */
export function analyzeVowel(vowel) {
  if (!vowel) {
    return {
      vowel: null,
      isValid: false,
      script: null,
      classifications: {},
      category: null,
      explanation: 'Invalid or empty vowel'
    };
  }

  const script = detectScript(vowel);
  const classifications = getVowelClassifications(vowel);
  const category = getVowelCategory(vowel);

  const primaryClassification = classifications.isVrddhi ? 'vṛddhi' : 
                                classifications.isGuna ? 'guṇa' :
                                classifications.isIk ? 'ik' : 'other';

  return {
    vowel,
    isValid: classifications.isVowel,
    script,
    classifications,
    category,
    primaryClassification,
    explanation: `${vowel} is ${classifications.isVowel ? 'a valid' : 'not a valid'} Sanskrit vowel` +
                 (category ? ` (${category})` : '') +
                 (primaryClassification !== 'other' ? ` classified as ${primaryClassification}` : '')
  };
}

// ==================== VOWEL TRANSFORMATIONS ====================

/**
 * Applies guṇa transformation to an ik vowel
 * @param {string} vowel - Vowel to transform
 * @returns {string|null} - Transformed vowel or null if not applicable
 */
export function applyGunaTransformation(vowel) {
  if (!vowel) return null;
  
  const script = detectScript(vowel);
  const mappings = script === 'Devanagari' ? 
    VowelGradations.guna.devanagari : 
    VowelGradations.guna.iast;
  
  return mappings[vowel] || null;
}

/**
 * Applies vṛddhi transformation to an ik vowel
 * @param {string} vowel - Vowel to transform
 * @returns {string|null} - Transformed vowel or null if not applicable
 */
export function applyVrddhiTransformation(vowel) {
  if (!vowel) return null;
  
  const script = detectScript(vowel);
  const mappings = script === 'Devanagari' ? 
    VowelGradations.vrddhi.devanagari : 
    VowelGradations.vrddhi.iast;
  
  return mappings[vowel] || null;
}

/**
 * Gets the guṇa form of any vowel if applicable
 * @param {string} vowel - Input vowel
 * @returns {string|null} - Guṇa form or null
 */
export function getGunaForm(vowel) {
  // First try ik-specific transformation
  const ikGuna = applyGunaTransformation(vowel);
  if (ikGuna) return ikGuna;
  
  // For non-ik vowels, guṇa might not apply or be the same
  return null;
}

/**
 * Gets the vṛddhi form of any vowel if applicable
 * @param {string} vowel - Input vowel
 * @returns {string|null} - Vṛddhi form or null
 */
export function getVrddhiForm(vowel) {
  // Try vṛddhi transformation
  const vrddhiForm = applyVrddhiTransformation(vowel);
  if (vrddhiForm) return vrddhiForm;
  
  return null;
}

/**
 * Validates if a transformation is a proper guṇa transformation
 * @param {string} original - Original vowel
 * @param {string} transformed - Transformed vowel
 * @returns {boolean} - True if valid guṇa transformation
 */
export function isValidGunaTransformation(original, transformed) {
  const expectedGuna = getGunaForm(original);
  return expectedGuna === transformed;
}

/**
 * Validates if a transformation is a proper vṛddhi transformation
 * @param {string} original - Original vowel
 * @param {string} transformed - Transformed vowel
 * @returns {boolean} - True if valid vṛddhi transformation
 */
export function isValidVrddhiTransformation(original, transformed) {
  const expectedVrddhi = getVrddhiForm(original);
  return expectedVrddhi === transformed;
}

// ==================== VOWEL EXTRACTION ====================

/**
 * Extracts the first vowel from a word using proper phoneme tokenization
 * @param {string} word - Word to analyze
 * @returns {Object} - Result with first vowel and metadata
 */
export function getFirstVowel(word) {
  if (!word || typeof word !== 'string') {
    return { vowel: null, position: -1, script: 'Unknown', error: 'Invalid word' };
  }

  const tokenResult = tokenizePhonemes(word);
  const { phonemes, script } = tokenResult;

  for (let i = 0; i < phonemes.length; i++) {
    const phoneme = phonemes[i];
    if (isVowel(phoneme)) {
      return {
        vowel: phoneme,
        position: i,
        script,
        phonemes,
        analysis: analyzeVowel(phoneme),
        tokenization: tokenResult
      };
    }
  }

  // Handle inherent 'a' in Devanagari consonants
  if (script === 'Devanagari') {
    for (let i = 0; i < phonemes.length; i++) {
      const phoneme = phonemes[i];
      // Check if it's a consonant without explicit halanta
      if (/^[क-ह]$/.test(phoneme) && !phonemes[i + 1]?.includes('्')) {
        return {
          vowel: 'अ',
          position: i,
          script,
          phonemes,
          inherent: true,
          analysis: analyzeVowel('अ'),
          tokenization: tokenResult
        };
      }
    }
  }

  return { vowel: null, position: -1, script, phonemes, tokenization: tokenResult, error: 'No vowel found' };
}

/**
 * Extracts all vowels from a word with their positions
 * @param {string} word - Word to analyze
 * @returns {Object} - Result with all vowels and metadata
 */
export function getAllVowels(word) {
  if (!word || typeof word !== 'string') {
    return { vowels: [], script: 'Unknown', error: 'Invalid word' };
  }

  const tokenResult = tokenizePhonemes(word);
  const { phonemes, script } = tokenResult;
  const vowels = [];

  phonemes.forEach((phoneme, index) => {
    if (isVowel(phoneme)) {
      vowels.push({
        vowel: phoneme,
        position: index,
        analysis: analyzeVowel(phoneme)
      });
    }
  });

  // Handle inherent vowels in Devanagari
  if (script === 'Devanagari') {
    phonemes.forEach((phoneme, index) => {
      if (/^[क-ह]$/.test(phoneme) && !phonemes[index + 1]?.includes('्')) {
        // Check if we already found a vowel at this position
        const existingVowel = vowels.find(v => v.position === index);
        if (!existingVowel) {
          vowels.push({
            vowel: 'अ',
            position: index,
            inherent: true,
            analysis: analyzeVowel('अ')
          });
        }
      }
    });
  }

  return {
    vowels: vowels.sort((a, b) => a.position - b.position),
    script,
    phonemes,
    tokenization: tokenResult,
    count: vowels.length
  };
}

// ==================== ADVANCED ANALYSIS ====================

/**
 * Analyzes vowel gradation possibilities for a word
 * @param {string} word - Word to analyze
 * @returns {Object} - Gradation analysis result
 */
export function analyzeVowelGradations(word) {
  const allVowels = getAllVowels(word);
  
  const gradationAnalysis = allVowels.vowels.map(vowelInfo => {
    const { vowel, position, analysis } = vowelInfo;
    
    return {
      ...vowelInfo,
      gradations: {
        guna: getGunaForm(vowel),
        vrddhi: getVrddhiForm(vowel),
        canTransform: analysis.classifications.isIk,
        transformationType: analysis.classifications.isIk ? 'ik-gradation' : 'non-ik'
      }
    };
  });

  return {
    ...allVowels,
    gradationAnalysis,
    transformableVowels: gradationAnalysis.filter(v => v.gradations.canTransform),
    hasTransformableVowels: gradationAnalysis.some(v => v.gradations.canTransform)
  };
}

/**
 * Determines the scope of guṇa/vṛddhi operations in a word
 * @param {string} word - Word to analyze
 * @returns {Object} - Scope analysis result
 */
export function getGunaVrddhiScope(word) {
  const gradationAnalysis = analyzeVowelGradations(word);
  
  return {
    word,
    script: gradationAnalysis.script,
    results: gradationAnalysis.gradationAnalysis.map(v => ({
      vowel: v.vowel,
      position: v.position,
      isIk: v.analysis.classifications.isIk,
      gunaForm: v.gradations.guna,
      vrddhiForm: v.gradations.vrddhi,
      canTransform: v.gradations.canTransform
    })),
    transformableCount: gradationAnalysis.transformableVowels.length,
    totalVowels: gradationAnalysis.count,
    tokenization: gradationAnalysis.tokenization
  };
}
