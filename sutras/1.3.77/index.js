/**
 * Sutra 1.3.77: विभाषोपपदेन प्रतीयमाने (vibhāṣopapadena pratīyamāne)
 * "The आत्मनेपद is optionally used, when the fact of the fruit of the action 
 * accruing to the agent is indicated by an उपपद i.e. by a word used along with the verb."
 * 
 * RULE TYPE: vidhāna (optional Ātmanepada designation)
 * SCOPE: Any verb when उपपद indicates agent benefit
 * CONDITIONS: 1) उपपद present indicating agent benefit, 2) Optional application (विभाषा)
 * TRANSFORMATIONS: Optionally allows Ātmanepada when उपपद shows agent benefit
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.77
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.77 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.upapada - The उपपद word indicating agent benefit
 * @param {boolean} context.hasUpapada - Whether an उपपद is present
 * @param {string} context.meaning - Semantic meaning/context
 * @param {boolean} context.agentBenefitIndicated - Whether उपपद indicates agent benefit
 * @returns {Object} Analysis result
 */
export function sutra1377(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.77",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.77",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for उपपद presence
    let hasUpapada = context.hasUpapada === true || Boolean(context.upapada);
    
    // Check for agent benefit indication through उपपद
    let agentBenefitIndicated = context.agentBenefitIndicated === true;
    
    // Common उपपद words that indicate agent benefit
    const agentBenefitUpapadaWords = {
      devanagari: [
        'स्व', 'आत्मन्', 'निज', 'स्वकीय', 'स्वार्थ', 'स्वयं',
        'आत्मार्थ', 'स्वहित', 'निजार्थ', 'स्वप्रयोजन'
      ],
      iast: [
        'sva', 'ātman', 'nija', 'svakīya', 'svārtha', 'svayaṃ',
        'ātmārtha', 'svahita', 'nijārtha', 'svaprayojana'
      ],
      english: [
        'self', 'own', 'personal', 'for oneself', 'one\'s own',
        'privately', 'personally', 'individually'
      ]
    };
    
    // Check if upapada indicates agent benefit
    if (!agentBenefitIndicated && context.upapada) {
      const allBenefitWords = [
        ...agentBenefitUpapadaWords.devanagari,
        ...agentBenefitUpapadaWords.iast,
        ...agentBenefitUpapadaWords.english
      ];
      
      agentBenefitIndicated = allBenefitWords.some(word => 
        context.upapada.toLowerCase().includes(word.toLowerCase())
      );
    }
    
    // Check meaning for upapada-like constructions
    if (!hasUpapada && context.meaning) {
      const meaningBenefitPatterns = [
        'स्वार्थ', 'निजार्थ', 'आत्मार्थ', 'स्वहित',
        'for own benefit', 'for oneself', 'personally', 'own advantage',
        'self-benefit', 'personal gain', 'individual benefit'
      ];
      
      const foundPattern = meaningBenefitPatterns.find(pattern => 
        context.meaning.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (foundPattern) {
        hasUpapada = true;
        agentBenefitIndicated = true;
      }
    }
    
    // Apply the rule (विभाषा = optional)
    const applies = hasUpapada && agentBenefitIndicated;
    const isAtmanepada = applies; // When applies, Ātmanepada is used (though optionally)
    
    let reason = "";
    let confidence = 0;
    
    if (!hasUpapada) {
      reason = "No उपपद present to indicate agent benefit";
      confidence = 0;
    } else if (!agentBenefitIndicated) {
      reason = "उपपद does not indicate agent benefit";
      confidence = 0.2;
    } else {
      reason = "उपपद indicates agent benefit → Optional Ātmanepada (विभाषा)";
      confidence = 0.8; // Lower confidence because it's optional (विभाषा)
    }
    
    return {
      applies,
      isAtmanepada,
      reason,
      sutra: "1.3.77",
      details: {
        hasUpapada,
        agentBenefitIndicated,
        upapada: context.upapada || null,
        detectedScript: script,
        ruleType: "Optional Ātmanepada when उपपद indicates agent benefit",
        isOptional: true
      },
      confidence
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Error in sutra analysis: ${error.message}`,
      sutra: "1.3.77",
      confidence: 0
    };
  }
}

/**
 * Alternate export name for consistency
 */
export const checkUpapadaAtmanepada = sutra1377;

/**
 * Export default for module compatibility
 */
export default sutra1377;
