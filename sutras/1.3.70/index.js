/**
 * Sutra 1.3.70: लियः सम्माननशालिनीकरणयोश्च (liyaḥ sammānanañālinīkaraṇayośca)
 * "The causative of the verb लि 'to adhere' takes Ātmanepada in the senses of 
 * 'showing respect' (सम्मानन), 'subduing' (शालिनीकरण), and 'deceiving' (as continued from previous sutra)."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: Causative forms of लि in specific semantic contexts
 * CONDITIONS: 1) Root is लि, 2) Causative formation (णिच्), 3) Specific meanings (respect/subduing/deceiving)
 * TRANSFORMATIONS: Forces Ātmanepada in specified semantic contexts
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.70
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.70 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Verbal root
 * @param {boolean} context.isCausative - Whether the form is causative
 * @param {string} context.meaning - Semantic meaning/context
 * @param {boolean} context.isRespectSense - Whether used in respect sense (सम्मानन)
 * @param {boolean} context.isSubduingSense - Whether used in subduing sense (शालिनीकरण)
 * @param {boolean} context.isDeceptionSense - Whether used in deception sense (continued from 1.3.69)
 * @returns {Object} Analysis result
 */
export function sutra1370(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.70",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.70",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for required root (लि)
    const targetRoots = {
      devanagari: ['लि'],
      iast: ['li']
    };
    
    const relevantRoots = script === 'Devanagari' ? targetRoots.devanagari : targetRoots.iast;
    
    // Check if root is provided in context or detectable in word
    let rootMatches = false;
    if (context.root) {
      rootMatches = relevantRoots.includes(context.root) || 
                   targetRoots.devanagari.includes(context.root) ||
                   targetRoots.iast.includes(context.root);
    }
    
    // Surface analysis for लि patterns
    if (!rootMatches) {
      const rootPatterns = {
        devanagari: /लि/,
        iast: /li/
      };
      
      const pattern = script === 'Devanagari' ? rootPatterns.devanagari : rootPatterns.iast;
      rootMatches = pattern.test(word);
    }
    
    if (!rootMatches) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Root is not लि (li)",
        sutra: "1.3.70",
        confidence: 0.9
      };
    }
    
    // Check for causative formation
    if (context.isCausative === false) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Causative formation (णिच्) required",
        sutra: "1.3.70",
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
        sutra: "1.3.70",
        confidence: 0.8
      };
    }
    
    // Check for specific senses (सम्मानन, शालिनीकरण, deception)
    let hasValidSense = false;
    let detectedSenses = [];
    
    // Check respect sense (सम्मानन)
    let isRespectSense = context.isRespectSense === true;
    if (!isRespectSense && context.meaning) {
      const respectKeywords = [
        'respect', 'honor', 'revere', 'worship', 'venerate', 'esteem',
        'सम्मानन', 'सम्मान', 'पूजा', 'आदर'
      ];
      
      isRespectSense = respectKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    if (isRespectSense) {
      hasValidSense = true;
      detectedSenses.push('respect');
    }
    
    // Check subduing sense (शालिनीकरण)
    let isSubduingSense = context.isSubduingSense === true;
    if (!isSubduingSense && context.meaning) {
      const subduingKeywords = [
        'subdue', 'subduing', 'subjugate', 'subjugating', 'conquer', 'conquering', 
        'overcome', 'overcoming', 'dominate', 'dominating', 'control', 'controlling',
        'शालिनीकरण', 'वश', 'नियन्त्रण', 'दमन'
      ];
      
      isSubduingSense = subduingKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    if (isSubduingSense) {
      hasValidSense = true;
      detectedSenses.push('subduing');
    }
    
    // Check deception sense (continuation from 1.3.69)
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
    
    if (isDeceptionSense) {
      hasValidSense = true;
      detectedSenses.push('deception');
    }
    
    // If no explicit sense provided but context suggests causative usage
    if (!hasValidSense && !context.meaning && 
        !context.hasOwnProperty('isRespectSense') && 
        !context.hasOwnProperty('isSubduingSense') && 
        !context.hasOwnProperty('isDeceptionSense')) {
      // Default assumption for लि causative - check for common patterns
      hasValidSense = true;
      detectedSenses.push('inferred');
    }
    
    if (!hasValidSense) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Required sense not found (सम्मानन/शालिनीकरण/प्रलम्भ)",
        sutra: "1.3.70",
        confidence: 0.7
      };
    }
    
    // All conditions met
    return {
      applies: true,
      isAtmanepada: true,
      reason: `लियः सम्माननशालिनीकरणयोश्च - causative of लि in ${detectedSenses.join('/')} sense takes Ātmanepada`,
      sutra: "1.3.70",
      confidence: 0.95,
      detectedRoot: context.root || (rootMatches ? 'detected' : 'unknown'),
      detectedCausative: isCausative,
      detectedSenses: detectedSenses,
      validSenses: {
        respect: isRespectSense,
        subduing: isSubduingSense,
        deception: isDeceptionSense
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Analysis error: ${error.message}`,
      sutra: "1.3.70",
      confidence: 0
    };
  }
}

/**
 * Export the main function as default
 */
export default sutra1370;
