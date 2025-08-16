/**
 * Sutra 1.3.71: मिथ्योपपदात् कृञोऽभ्यासे (mithyopapadāt kṛñoʿbhyāse)
 * "When कृ is preceded by मिथ्या as उपपद (preverb/prefix), it takes Ātmanepada 
 * in the sense of 'abhyāsa' (repeated wrong utterance/falsehood)."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: कृ when prefixed with मिथ्या उपपद in repetition/falsehood sense
 * CONDITIONS: 1) Root is कृ, 2) मिथ्या उपपद present, 3) Abhyāsa sense (repeated wrong utterance)
 * TRANSFORMATIONS: Forces Ātmanepada with मिथ्या + कृ combinations
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.71
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.71 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Verbal root
 * @param {string} context.upapada - Preverb/prefix (should be मिथ्या/mithyā)
 * @param {boolean} context.hasAbhyasaSense - Whether used in abhyāsa (repetition/falsehood) sense
 * @param {string} context.meaning - Semantic meaning/context
 * @returns {Object} Analysis result
 */
export function sutra1371(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.71",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.71",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for required root (कृ)
    const targetRoots = {
      devanagari: ['कृ'],
      iast: ['kṛ', 'kar']
    };
    
    const relevantRoots = script === 'Devanagari' ? targetRoots.devanagari : targetRoots.iast;
    
    // Check if root is provided in context or detectable in word
    let rootMatches = false;
    if (context.root) {
      rootMatches = relevantRoots.includes(context.root) || 
                   targetRoots.devanagari.includes(context.root) ||
                   targetRoots.iast.includes(context.root);
    }
    
    // Surface analysis for कृ patterns
    if (!rootMatches) {
      const rootPatterns = {
        devanagari: /कृ|कर/,
        iast: /(kṛ|kar)/
      };
      
      const pattern = script === 'Devanagari' ? rootPatterns.devanagari : rootPatterns.iast;
      rootMatches = pattern.test(word);
    }
    
    if (!rootMatches) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Root is not कृ (kṛ)",
        sutra: "1.3.71",
        confidence: 0.9
      };
    }
    
    // Check for मिथ्या उपपद (preverb/prefix)
    let hasMithyaUpapada = false;
    
    // Check explicit upapada context
    if (context.upapada) {
      const mithyaForms = ['मिथ्या', 'mithyā'];
      hasMithyaUpapada = mithyaForms.some(form => 
        context.upapada.toLowerCase().includes(form.toLowerCase())
      );
    }
    
    // Check for मिथ्या pattern in the word itself
    if (!hasMithyaUpapada) {
      const mithyaPatterns = {
        devanagari: /मिथ्या/,
        iast: /mithyā/
      };
      
      const pattern = script === 'Devanagari' ? mithyaPatterns.devanagari : mithyaPatterns.iast;
      hasMithyaUpapada = pattern.test(word);
    }
    
    if (!hasMithyaUpapada) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "मिथ्या उपपद (upapada) not found",
        sutra: "1.3.71",
        confidence: 0.9
      };
    }
    
    // Check for abhyāsa sense (repeated wrong utterance/falsehood)
    let hasAbhyasaSense = context.hasAbhyasaSense === true;
    
    if (!hasAbhyasaSense && context.meaning) {
      const abhyasaKeywords = [
        'repetition', 'repeated', 'repeat', 'abhyasa', 'abhyāsa',
        'falsehood', 'false', 'wrong', 'untrue', 'lie', 'lying',
        'utterance', 'speaking', 'saying', 'telling',
        'अभ्यास', 'मिथ्या', 'झूठ', 'असत्य', 'वचन', 'कथन'
      ];
      
      hasAbhyasaSense = abhyasaKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // If मिथ्या is present and no explicit sense given, assume abhyāsa context
    if (!hasAbhyasaSense && !context.meaning && 
        !context.hasOwnProperty('hasAbhyasaSense')) {
      hasAbhyasaSense = true; // Default assumption with मिथ्या + कृ
    }
    
    if (!hasAbhyasaSense) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Abhyāsa sense (repeated wrong utterance) not found",
        sutra: "1.3.71",
        confidence: 0.7
      };
    }
    
    // All conditions met
    return {
      applies: true,
      isAtmanepada: true,
      reason: "मिथ्योपपदात् कृञोऽभ्यासे - कृ with मिथ्या उपपद in abhyāsa sense takes Ātmanepada",
      sutra: "1.3.71",
      confidence: 0.95,
      detectedRoot: context.root || (rootMatches ? 'detected' : 'unknown'),
      detectedMithyaUpapada: hasMithyaUpapada,
      detectedAbhyasaSense: hasAbhyasaSense,
      construction: 'मिथ्या + कृ'
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Analysis error: ${error.message}`,
      sutra: "1.3.71",
      confidence: 0
    };
  }
}

/**
 * Export the main function as default
 */
export default sutra1371;
