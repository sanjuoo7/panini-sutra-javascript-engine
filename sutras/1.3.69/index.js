/**
 * Sutra 1.3.69: गृधिवञ्च्योः प्रलम्भने (gṛdhivañacayoḥ paralambhane)
 * "After the causatives of the verbs गृध 'to covet' and वञ्च 'to go' the Ātmanepada is used 
 * in the sense of 'deceiving' even though the fruit of the action does not accrue to the agent."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: Causative forms of गृध् and वञ्च् in deception sense
 * CONDITIONS: 1) Root is गृध् or वञ्च्, 2) Causative formation (णिच्), 3) Deception meaning (प्रलम्भ)
 * TRANSFORMATIONS: Forces Ātmanepada regardless of fruit accruing to agent
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.69
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.69 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Verbal root
 * @param {boolean} context.isCausative - Whether the form is causative
 * @param {string} context.meaning - Semantic meaning/context
 * @param {boolean} context.isDeceptionSense - Whether used in deception sense
 * @returns {Object} Analysis result
 */
export function sutra1369(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.69",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.69",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for required root (गृध् or वञ्च्)
    const targetRoots = {
      devanagari: ['गृध्', 'वञ्च्'],
      iast: ['gṛdh', 'vañc']
    };
    
    const relevantRoots = script === 'Devanagari' ? targetRoots.devanagari : targetRoots.iast;
    
    // Check if root is provided in context or detectable in word
    let rootMatches = false;
    if (context.root) {
      rootMatches = relevantRoots.includes(context.root) || 
                   targetRoots.devanagari.includes(context.root) ||
                   targetRoots.iast.includes(context.root);
    }
    
    // Surface analysis for गृध्/वञ्च् patterns
    if (!rootMatches) {
      const rootPatterns = {
        devanagari: /गृध|वञ्च/,
        iast: /(gṛdh|vañc)/
      };
      
      const pattern = script === 'Devanagari' ? rootPatterns.devanagari : rootPatterns.iast;
      rootMatches = pattern.test(word);
    }
    
    if (!rootMatches) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Root is not गृध् (gṛdh) or वञ्च् (vañc)",
        sutra: "1.3.69",
        confidence: 0.9
      };
    }
    
    // Check for causative formation
    if (context.isCausative === false) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Causative formation (णिच्) required",
        sutra: "1.3.69",
        confidence: 0.9
      };
    }
    
    // Check for causative patterns in word
    let isCausative = context.isCausative === true;
    if (!isCausative) {
      const causativePatterns = {
        devanagari: /य|आपय|इ/,
        iast: /(y|āpay|i)/
      };
      
      const pattern = script === 'Devanagari' ? causativePatterns.devanagari : causativePatterns.iast;
      isCausative = pattern.test(word);
    }
    
    if (!isCausative) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Causative formation not detected",
        sutra: "1.3.69",
        confidence: 0.8
      };
    }
    
    // Check for deception sense (प्रलम्भ)
    let isDeceptionSense = context.isDeceptionSense === true;
    
    if (!isDeceptionSense && context.meaning) {
      const deceptionKeywords = [
        'deceive', 'deception', 'deceit', 'trick', 'cheat', 'fraud',
        'प्रलम्भ', 'छल', 'व्यवसाय', 'भ्रम'
      ];
      
      isDeceptionSense = deceptionKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // Default to true if no explicit meaning provided (assumption for this rule)
    if (!isDeceptionSense && !context.meaning && !context.hasOwnProperty('isDeceptionSense')) {
      isDeceptionSense = true; // Default assumption when using these roots with causative
    }
    
    if (!isDeceptionSense) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Deception sense (प्रलम्भने) required",
        sutra: "1.3.69",
        confidence: 0.7
      };
    }
    
    // All conditions met - applies regardless of fruit accruing to agent
    return {
      applies: true,
      isAtmanepada: true,
      reason: "गृधिवञ्च्योः प्रलम्भने - causative of गृध्/वञ्च् in deception sense takes Ātmanepada",
      sutra: "1.3.69",
      confidence: 0.95,
      overridesFruit: true, // Important: overrides normal fruit-to-agent requirement
      detectedRoot: context.root || (rootMatches ? 'detected' : 'unknown'),
      detectedCausative: isCausative,
      detectedDeceptionSense: isDeceptionSense
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Analysis error: ${error.message}`,
      sutra: "1.3.69",
      confidence: 0
    };
  }
}

/**
 * Export the main function as default
 */
export default sutra1369;
