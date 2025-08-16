/**
 * Sutra 1.3.78: शेषात् कर्तरि परस्मैपदम् (śeṣāt kartari parasmaipada)
 * "After the rest i.e. all those verbs not falling under any one of the previous 
 * provisions, the terminations of the परस्मैपद are used, in marking the agent 
 * i.e. in the active voice."
 * 
 * RULE TYPE: vidhāna (default Parasmaipada designation)
 * SCOPE: All remaining verbs not covered by specific Ātmanepada rules
 * CONDITIONS: 1) Verb not covered by previous Ātmanepada rules, 2) Active voice (कर्तरि)
 * TRANSFORMATIONS: Default Parasmaipada for all other verbs in active voice
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.78
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.78 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {boolean} context.isActiveVoice - Whether verb is in active voice (कर्तरि)
 * @param {boolean} context.hasAtmanepadaRule - Whether covered by previous Ātmanepada rules
 * @param {string} context.voiceType - Explicit voice type ('active', 'passive', 'middle')
 * @param {string} context.meaning - Semantic meaning/context
 * @returns {Object} Analysis result
 */
export function sutra1378(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isParasmaipada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.78",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isParasmaipada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.78",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for active voice (कर्तरि)
    let isActiveVoice = true; // Default assumption
    
    // Check explicit context
    if (context.isActiveVoice === false) {
      isActiveVoice = false;
    }
    
    if (context.voiceType) {
      isActiveVoice = context.voiceType.toLowerCase() === 'active';
    }
    
    // Check for passive voice indicators
    if (context.meaning) {
      const passiveIndicators = [
        'passive', 'is done', 'is made', 'कृत', 'किया जाता',
        'कर्म', 'karma', 'object-focused'
      ];
      
      const hasPassiveIndicator = passiveIndicators.some(indicator =>
        context.meaning.toLowerCase().includes(indicator.toLowerCase())
      );
      
      if (hasPassiveIndicator) {
        isActiveVoice = false;
      }
    }
    
    // Check for Parasmaipada endings (indicators of active voice)
    const parasmaipadaEndings = {
      devanagari: ['ति', 'तः', 'न्ति', 'सि', 'थः', 'थ', 'मि', 'वः', 'मः'],
      iast: ['ti', 'taḥ', 'nti', 'si', 'thaḥ', 'tha', 'mi', 'vaḥ', 'maḥ']
    };
    
    const endings = script === 'Devanagari' ? 
      parasmaipadaEndings.devanagari : parasmaipadaEndings.iast;
    
    const hasParasmaipadaEnding = endings.some(ending => word.endsWith(ending));
    
    // Check if NOT covered by previous Ātmanepada rules (शेष = remainder)
    let isRemainder = true; // Default: assume it's remainder unless explicitly covered
    
    if (context.hasAtmanepadaRule === true) {
      isRemainder = false;
    }
    
    // Check for typical Ātmanepada contexts that would exclude this rule
    if (context.meaning) {
      const atmanepadaIndicators = [
        'agent benefit', 'स्वार्थ', 'कर्त्रभिप्राय', 'reciprocal',
        'middle voice', 'ātmanepada', 'आत्मनेपद', 'for oneself'
      ];
      
      const hasAtmanepadaIndicator = atmanepadaIndicators.some(indicator =>
        context.meaning.toLowerCase().includes(indicator.toLowerCase())
      );
      
      if (hasAtmanepadaIndicator) {
        isRemainder = false;
      }
    }
    
    // Apply the rule (default Parasmaipada for remaining verbs in active voice)
    const applies = isActiveVoice && isRemainder;
    const isParasmaipada = applies;
    
    let reason = "";
    let confidence = 0;
    
    if (!isActiveVoice) {
      reason = "Not in active voice (कर्तरि)";
      confidence = 0;
    } else if (!isRemainder) {
      reason = "Covered by specific Ātmanepada rule (not शेष)";
      confidence = 0.3;
    } else {
      reason = "Default Parasmaipada for active voice verbs (शेष)";
      confidence = 0.9; // High confidence as this is the default rule
    }
    
    return {
      applies,
      isParasmaipada,
      reason,
      sutra: "1.3.78",
      details: {
        isActiveVoice,
        isRemainder,
        hasParasmaipadaEnding,
        detectedScript: script,
        ruleType: "Default Parasmaipada for remaining active voice verbs"
      },
      confidence
    };
    
  } catch (error) {
    return {
      applies: false,
      isParasmaipada: false,
      reason: `Error in sutra analysis: ${error.message}`,
      sutra: "1.3.78",
      confidence: 0
    };
  }
}

/**
 * Alternate export name for consistency
 */
export const checkDefaultParasmaipada = sutra1378;

/**
 * Export default for module compatibility
 */
export default sutra1378;
