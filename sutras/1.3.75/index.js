/**
 * Sutra 1.3.75: समुदाङ्भ्यो यमोऽग्रन्थे (samudāṅgbhyo yamo'granthe)
 * "After the verb यम् 'to strive', preceded by सम्, उद् and आङ्, when it does not 
 * refer to a book, the आत्मनेपद is used, when the fruit of the action accrues to the agent."
 * 
 * RULE TYPE: vidhāna (Ātmanepada designation)
 * SCOPE: यम् root with specific prefixes (सम्/उद्/आङ्) in non-book contexts
 * CONDITIONS: 1) Root is यम्, 2) Has सम्/उद्/आङ् prefix, 3) Not book context, 4) Agent benefits
 * TRANSFORMATIONS: Forces Ātmanepada for यम् with specified prefixes in non-book contexts
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.75
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.75 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} context.root - Verbal root (should be यम्/yam)
 * @param {string} context.upasarga - Prefix (should be सम्/उद्/आङ्)
 * @param {boolean} context.benefitsAgent - Whether action fruit accrues to agent
 * @param {boolean} context.isBookContext - Whether it refers to a book/text
 * @param {string} context.meaning - Semantic meaning/context
 * @returns {Object} Analysis result
 */
export function sutra1375(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid input: word must be a non-empty string",
        sutra: "1.3.75",
        confidence: 0
      };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isAtmanepada: false,
        reason: "Invalid Sanskrit word format",
        sutra: "1.3.75",
        confidence: 0
      };
    }

    const script = detectScript(word);
    
    // Check for यम् root
    let hasYamRoot = false;
    
    const yamRootPatterns = {
      devanagari: ['यम्', 'यम', 'यच्छ', 'यत्न'],
      iast: ['yam', 'yacch', 'yatna']
    };
    
    if (context.root) {
      const rootPatterns = script === 'Devanagari' ? 
        yamRootPatterns.devanagari : yamRootPatterns.iast;
      hasYamRoot = rootPatterns.includes(context.root);
    }
    
    // Also check for यम् patterns in the word
    if (!hasYamRoot) {
      const patterns = script === 'Devanagari' ? 
        yamRootPatterns.devanagari : yamRootPatterns.iast;
      
      hasYamRoot = patterns.some(pattern => word.includes(pattern));
    }
    
    // Check for required prefixes (सम्/उद्/आङ्)
    let hasRequiredPrefix = false;
    let detectedPrefix = '';
    
    const requiredPrefixes = {
      devanagari: {
        'सम्': ['सम्', 'सं', 'सन्'],
        'उद्': ['उद्', 'उत्', 'उन्'],
        'आङ्': ['आ', 'आङ्', 'आन्']
      },
      iast: {
        'sam': ['sam', 'saṃ', 'san'],
        'ud': ['ud', 'ut', 'un'],
        'ā': ['ā', 'āṅ', 'ān']
      }
    };
    
    const prefixes = script === 'Devanagari' ? 
      requiredPrefixes.devanagari : requiredPrefixes.iast;
    
    // Check explicit upasarga context
    if (context.upasarga) {
      for (const [basePrefix, variants] of Object.entries(prefixes)) {
        if (variants.includes(context.upasarga)) {
          hasRequiredPrefix = true;
          detectedPrefix = basePrefix;
          break;
        }
      }
    }
    
    // Check for prefix patterns in the word
    if (!hasRequiredPrefix) {
      for (const [basePrefix, variants] of Object.entries(prefixes)) {
        for (const variant of variants) {
          if (word.startsWith(variant)) {
            hasRequiredPrefix = true;
            detectedPrefix = basePrefix;
            break;
          }
        }
        if (hasRequiredPrefix) break;
      }
    }
    
    // Check for non-book context (अग्रन्थे)
    let isNonBookContext = true; // Default to true unless explicitly book context
    
    if (context.isBookContext === true) {
      isNonBookContext = false;
    }
    
    // Check meaning for book-related terms
    if (context.meaning) {
      const bookKeywords = {
        devanagari: ['ग्रन्थ', 'पुस्तक', 'शास्त्र', 'पाठ'],
        iast: ['grantha', 'pustaka', 'śāstra', 'pāṭha'],
        english: ['book', 'text', 'scripture', 'manuscript', 'treatise']
      };
      
      const allBookKeywords = [
        ...bookKeywords.devanagari,
        ...bookKeywords.iast,
        ...bookKeywords.english
      ];
      
      const hasBookContext = allBookKeywords.some(keyword => 
        context.meaning.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (hasBookContext) {
        isNonBookContext = false;
      }
    }
    
    // Check for agent benefit condition
    let benefitsAgent = context.benefitsAgent === true;
    
    // Semantic patterns for agent benefit
    if (!benefitsAgent && context.meaning) {
      const agentBenefitKeywords = {
        devanagari: ['स्वार्थ', 'आत्मन्', 'स्वयं'],
        iast: ['svārtha', 'ātman', 'svayaṃ'],
        english: ['for oneself', 'self-control', 'own effort', 'personal striving']
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
    const applies = hasYamRoot && hasRequiredPrefix && isNonBookContext && benefitsAgent;
    const isAtmanepada = applies;
    
    let reason = "";
    let confidence = 0;
    
    if (!hasYamRoot) {
      reason = "Root is not यम् (yam)";
      confidence = 0;
    } else if (!hasRequiredPrefix) {
      reason = "Missing required prefix (सम्/उद्/आङ्)";
      confidence = 0.2;
    } else if (!isNonBookContext) {
      reason = "Rule does not apply in book/text context (अग्रन्थे condition)";
      confidence = 0.3;
    } else if (!benefitsAgent) {
      reason = "Action fruit does not accrue to agent";
      confidence = 0.4;
    } else {
      reason = `यम् with ${detectedPrefix} prefix in non-book context with agent benefit → Ātmanepada`;
      confidence = 0.95;
    }
    
    return {
      applies,
      isAtmanepada,
      reason,
      sutra: "1.3.75",
      details: {
        hasYamRoot,
        hasRequiredPrefix,
        detectedPrefix,
        isNonBookContext,
        benefitsAgent,
        detectedScript: script,
        ruleType: "Ātmanepada for यम् with specific prefixes in non-book contexts"
      },
      confidence
    };
    
  } catch (error) {
    return {
      applies: false,
      isAtmanepada: false,
      reason: `Error in sutra analysis: ${error.message}`,
      sutra: "1.3.75",
      confidence: 0
    };
  }
}

/**
 * Alternate export name for consistency
 */
export const checkYamPrefixAtmanepada = sutra1375;

/**
 * Export default for module compatibility
 */
export default sutra1375;
