/**
 * Sutra 1.3.74: णिचश्च (ṇicaśca)
 * "After a verb ending in the affix णि (causal) when the fruit of the action 
 * accrues to the agent, the आत्मनेपद is used."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: Causative verbs (णि suffix) when action benefits the agent
 * CONDITIONS: 1) Verb has णि (causative) suffix, 2) Action fruit accrues to agent (कर्त्रभिप्राय)
 * TRANSFORMATIONS: Forces Ātmanepada for causative verbs when agent benefits
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.74
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.74 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Base verbal root
 * @param {boolean} context.hasCausative - Whether the verb has णि/causative suffix
 * @param {boolean} context.benefitsAgent - Whether action fruit accrues to agent (कर्त्रभिप्राय)
 * @param {string} context.meaning - Semantic meaning/context
 * @param {string} context.affix - The specific affix used
 * @returns {Object} Analysis result
 */
export function sutra1374(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.74",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.74",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for causative (णि) patterns
    let hasCausative = false;
    
    // Check explicit context
    if (context.hasCausative === true) {
      hasCausative = true;
    }
    
    // Check for causative patterns in the word
    if (!hasCausative) {
      const causativePatterns = {
        devanagari: {
          patterns: ['य', 'पय', 'आपय', 'एय'],
          suffixMarkers: ['णि', 'णिज्', 'णी']
        },
        iast: {
          patterns: ['ya', 'paya', 'āpaya', 'eya'],
          suffixMarkers: ['ṇi', 'ṇij', 'ṇī']
        }
      };
      
      const patterns = script === 'Devanagari' ? 
        causativePatterns.devanagari : causativePatterns.iast;
      
      // Check for causative markers
      for (const pattern of patterns.patterns) {
        if (word.includes(pattern)) {
          hasCausative = true;
          break;
        }
      }
      
      // Check affix context
      if (context.affix && patterns.suffixMarkers.includes(context.affix)) {
        hasCausative = true;
      }
    }
    
    // Check for agent benefit condition (कर्त्रभिप्राय)
    let benefitsAgent = context.benefitsAgent === true;
    
    // Semantic patterns that typically indicate agent benefit
    if (!benefitsAgent && context.meaning) {
      const agentBenefitKeywords = {
        devanagari: ['स्वार्थ', 'आत्मन्', 'निज', 'स्व', 'कर्तृ'],
        iast: ['svārtha', 'ātman', 'nija', 'sva', 'kartṛ'],
        english: ['for oneself', 'self', 'own benefit', 'agent benefit', 'personal']
      };
      
      const allKeywords = [
        ...agentBenefitKeywords.devanagari,
        ...agentBenefitKeywords.iast,
        ...agentBenefitKeywords.english
      ];
      
      benefitsAgent = allKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // Apply the rule
    const applies = hasCausative && benefitsAgent;
    const isAtmanepada = applies;
    
    let reason = "";
    let confidence = 0;
    
    if (!hasCausative) {
      reason = "Verb does not have causative (णि) suffix";
      confidence = 0;
    } else if (!benefitsAgent) {
      reason = "Action fruit does not accrue to agent (कर्त्रभिप्राय not satisfied)";
      confidence = 0.3; // Some evidence but not complete
    } else {
      reason = "Causative verb with agent benefit → Ātmanepada";
      confidence = 0.95;
    }
    
    return {
      applies,
      isAtmanepada,
      reason,
      sutra: "1.3.74",
      details: {
        hasCausative,
        benefitsAgent,
        detectedScript: script,
        ruleType: "Ātmanepada designation for causatives with agent benefit"
      },
      confidence
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Error in sutra analysis: ${error.message}`,
      sutra: "1.3.74",
      confidence: 0
    };
  }
}

/**
 * Alternate export name for consistency
 */
export const checkCausativeAtmanepada = sutra1374;

/**
 * Export default for module compatibility
 */
export default sutra1374;
