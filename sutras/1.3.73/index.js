/**
 * Sutra 1.3.73: अपाद्वदः (apādvadaḥ)
 * "When the verb वद् 'to speak' is preceded by अप (apa), it takes Ātmanepada 
 * when the fruit of the action accrues to the agent."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: वद् when prefixed with अप and action benefits agent
 * CONDITIONS: 1) Root is वद्, 2) अप upasarga/prefix present, 3) Action fruit accrues to agent
 * TRANSFORMATIONS: Forces Ātmanepada with अप + वद् when agent benefits
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.73
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.73 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Verbal root (should be वद्/vad)
 * @param {string} context.upasarga - Prefix/upasarga (should be अप/apa)
 * @param {boolean} context.benefitsAgent - Whether action fruit accrues to agent
 * @param {string} context.meaning - Semantic meaning/context
 * @returns {Object} Analysis result
 */
export function sutra1373(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.73",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.73",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for required root (वद्)
    const targetRoots = {
      devanagari: ['वद्'],
      iast: ['vad']
    };
    
    const relevantRoots = script === 'Devanagari' ? targetRoots.devanagari : targetRoots.iast;
    
    // Check if root is provided in context or detectable in word
    let rootMatches = false;
    if (context.root) {
      rootMatches = relevantRoots.includes(context.root) || 
                   targetRoots.devanagari.includes(context.root) ||
                   targetRoots.iast.includes(context.root);
    }
    
    // Surface analysis for वद् patterns
    if (!rootMatches) {
      const rootPatterns = {
        devanagari: /वद्?|वच्?|वाद/,
        iast: /(vad|vac|vād)/
      };
      
      const pattern = script === 'Devanagari' ? rootPatterns.devanagari : rootPatterns.iast;
      rootMatches = pattern.test(word);
    }
    
    if (!rootMatches) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Root is not वद् (vad)",
        sutra: "1.3.73",
        confidence: 0.9
      };
    }
    
    // Check for अप upasarga (prefix)
    let hasApaUpasarga = false;
    
    // Check explicit upasarga context
    if (context.upasarga) {
      const apaForms = ['अप', 'apa'];
      hasApaUpasarga = apaForms.some(form => 
        context.upasarga.toLowerCase().includes(form.toLowerCase())
      );
    }
    
    // Check for अप pattern in the word itself
    if (!hasApaUpasarga) {
      const apaPatterns = {
        devanagari: /अप/,
        iast: /apa/
      };
      
      const pattern = script === 'Devanagari' ? apaPatterns.devanagari : apaPatterns.iast;
      hasApaUpasarga = pattern.test(word);
    }
    
    if (!hasApaUpasarga) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "अप upasarga (prefix) not found",
        sutra: "1.3.73",
        confidence: 0.9
      };
    }
    
    // Check for agent benefit (कर्त्रभिप्राय)
    let benefitsAgent = context.benefitsAgent === true;
    
    if (!benefitsAgent && context.meaning) {
      const agentBenefitKeywords = [
        'for oneself', 'to oneself', 'own benefit', 'self benefit', 'agent benefit',
        'कर्त्रभिप्राय', 'करत्रभिप्राय', 'स्वार्थ', 'आत्मन्', 'स्वयं', 'निज',
        'अपने लिए', 'स्वकृत', 'स्वफल', 'अपवाद', 'निन्दा'
      ];
      
      benefitsAgent = agentBenefitKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // Check for specific meanings associated with अपवाद (censure, blame)
    if (!benefitsAgent && context.meaning) {
      const apavadaKeywords = [
        'censure', 'blame', 'criticize', 'condemn', 'denounce', 'reproach',
        'अपवाद', 'निन्दा', 'दूषण', 'कलंक', 'तिरस्कार'
      ];
      
      benefitsAgent = apavadaKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // Default assumption for अप + वद् if no explicit context
    if (!benefitsAgent && !context.meaning && 
        !context.hasOwnProperty('benefitsAgent')) {
      benefitsAgent = true; // Common assumption for अप + वद् constructions
    }
    
    if (!benefitsAgent) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Agent benefit not established for अप + वद्",
        sutra: "1.3.73",
        confidence: 0.8
      };
    }
    
    // All conditions met
    return {
      applies: true,
      isAtmanepada: true,
      reason: "अपाद्वदः - अप + वद् with agent benefit takes Ātmanepada",
      sutra: "1.3.73",
      confidence: 0.95,
      detectedRoot: context.root || (rootMatches ? 'detected' : 'unknown'),
      detectedApaUpasarga: hasApaUpasarga,
      detectedAgentBenefit: benefitsAgent,
      construction: 'अप + वद्'
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Analysis error: ${error.message}`,
      sutra: "1.3.73",
      confidence: 0
    };
  }
}

/**
 * Export the main function as default
 */
export default sutra1373;
