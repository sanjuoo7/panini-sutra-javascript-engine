/**
 * Sutra 1.3.76: अनुपसर्गाज्ज्ञः (anupasargājjñaḥ)
 * "After the verb ज्ञा, when not preceded by any उपसर्ग, the terminations 
 * are of the आत्मनेपद, when the fruit of the action accrues to the agent."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: ज्ञा root without any prefix when action benefits agent
 * CONDITIONS: 1) Root is ज्ञा, 2) No उपसर्ग prefix, 3) Action fruit accrues to agent
 * TRANSFORMATIONS: Forces Ātmanepada for unprefixed ज्ञा when agent benefits
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.76
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.76 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Verbal root (should be ज्ञा/jñā)
 * @param {string} context.upasarga - Prefix (should be null/empty for this rule)
 * @param {boolean} context.hasPrefix - Whether verb has any prefix
 * @param {boolean} context.benefitsAgent - Whether action fruit accrues to agent
 * @param {string} context.meaning - Semantic meaning/context
 * @returns {Object} Analysis result
 */
export function sutra1376(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.76",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.76",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for ज्ञा root
    let hasJnaRoot = false;
    
    const jnaRootPatterns = {
      devanagari: ['ज्ञा', 'ज्ञ', 'जान', 'जाना'],
      iast: ['jñā', 'jñ', 'jāna', 'jānā']
    };
    
    if (context.root) {
      const rootPatterns = script === 'Devanagari' ? 
        jnaRootPatterns.devanagari : jnaRootPatterns.iast;
      hasJnaRoot = rootPatterns.includes(context.root);
    }
    
    // Also check for ज्ञा patterns in the word
    if (!hasJnaRoot) {
      const patterns = script === 'Devanagari' ? 
        jnaRootPatterns.devanagari : jnaRootPatterns.iast;
      
      hasJnaRoot = patterns.some(pattern => word.includes(pattern));
    }
    
    // Check for absence of उपसर्ग (अनुपसर्ग condition)
    let hasNoPrefix = true;
    
    // Check explicit context
    if (context.hasPrefix === true || context.upasarga) {
      hasNoPrefix = false;
    }
    
    // Check for common prefixes in the word
    if (hasNoPrefix) {
      const commonPrefixes = {
        devanagari: [
          'अति', 'अधि', 'अनु', 'अप', 'अभि', 'अव', 'आ', 'उद्', 'उप', 'नि', 
          'निर्', 'निस्', 'पर', 'परा', 'परि', 'प्र', 'प्रति', 'वि', 'सम्', 'सु'
        ],
        iast: [
          'ati', 'adhi', 'anu', 'apa', 'abhi', 'ava', 'ā', 'ud', 'upa', 'ni',
          'nir', 'nis', 'para', 'parā', 'pari', 'pra', 'prati', 'vi', 'sam', 'su'
        ]
      };
      
      const prefixes = script === 'Devanagari' ? 
        commonPrefixes.devanagari : commonPrefixes.iast;
      
      // Check if word starts with any common prefix
      for (const prefix of prefixes) {
        if (word.startsWith(prefix)) {
          hasNoPrefix = false;
          break;
        }
      }
    }
    
    // Check for agent benefit condition
    let benefitsAgent = context.benefitsAgent === true;
    
    // Semantic patterns for agent benefit
    if (!benefitsAgent && context.meaning) {
      const agentBenefitKeywords = {
        devanagari: ['स्वार्थ', 'आत्मन्', 'स्वयं', 'निज'],
        iast: ['svārtha', 'ātman', 'svayaṃ', 'nija'],
        english: ['for oneself', 'self-knowledge', 'personal understanding', 'own knowing']
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
    const applies = hasJnaRoot && hasNoPrefix && benefitsAgent;
    const isAtmanepada = applies;
    
    let reason = "";
    let confidence = 0;
    
    if (!hasJnaRoot) {
      reason = "Root is not ज्ञा (jñā)";
      confidence = 0;
    } else if (!hasNoPrefix) {
      reason = "Verb has उपसर्ग prefix (अनुपसर्ग condition not satisfied)";
      confidence = 0.2;
    } else if (!benefitsAgent) {
      reason = "Action fruit does not accrue to agent";
      confidence = 0.4;
    } else {
      reason = "ज्ञा without prefix with agent benefit → Ātmanepada";
      confidence = 0.95;
    }
    
    return {
      applies,
      isAtmanepada,
      reason,
      sutra: "1.3.76",
      details: {
        hasJnaRoot,
        hasNoPrefix,
        benefitsAgent,
        detectedScript: script,
        ruleType: "Ātmanepada for unprefixed ज्ञा with agent benefit"
      },
      confidence
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Error in sutra analysis: ${error.message}`,
      sutra: "1.3.76",
      confidence: 0
    };
  }
}

/**
 * Alternate export name for consistency
 */
export const checkJnaNoPrefixAtmanepada = sutra1376;

/**
 * Export default for module compatibility
 */
export default sutra1376;
