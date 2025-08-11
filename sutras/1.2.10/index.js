/**
 * Sutra 1.2.10: हलन्ताच्च (halantācca)
 * 
 * The affixes सन् beginning with consonants (झल्) are कित् after roots ending 
 * in consonants (हल्). This is an extension of Sutra 1.2.9.
 * 
 * Sanskrit Text: हलन्ताच्च
 * Transliteration: halantācca
 * Translation: And after (roots ending in) consonants
 * 
 * Type: कित्त्वातिदेश (kit-designation rule)
 * 
 * Implementation Logic:
 * 1. Check if root ends with a consonant (हल्)
 * 2. Check if affix is सन् (desiderative)
 * 3. If both conditions are met, designate the affix as कित्
 * 
 * Dependencies: Uses shared kit-designation utilities for consistent analysis
 * Created: December 2025
 */

import { 
  validateSanskritWord 
} from '../sanskrit-utils/validation.js';

import {
  detectScript
} from '../sanskrit-utils/script-detection.js';

import { 
  endsWithHal,
  isSanAffix,
  isKitBySutra1210,
  analyzeKitDesignation
} from '../sanskrit-utils/kit-designation.js';

/**
 * Main function implementing Sutra 1.2.10
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context object
 * @param {string} context.root - The root if known
 * @param {string} context.affix - The affix if known
 * @param {boolean} context.debug - Enable debug output
 * @returns {Object} Analysis result
 */
export function sutra1210(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      applicable: false,
      transformed: word,
      explanation: 'Invalid input: word must be a non-empty string',
      debug: []
    };
  }

  const debug = [];
  function addDebug(message) {
    if (context.debug) {
      debug.push(`[1.2.10] ${message}`);
    }
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      applicable: false,
      transformed: word,
      explanation: 'Input word is empty',
      debug
    };
  }

  // Validate Sanskrit
  const validation = validateSanskritWord(trimmedWord);
  if (!validation.isValid) {
    addDebug(`Invalid Sanskrit word: ${trimmedWord}`);
    return {
      applicable: false,
      transformed: word,
      explanation: 'Input is not valid Sanskrit',
      debug
    };
  }

  const script = detectScript(trimmedWord);
  addDebug(`Detected script: ${script}`);

  // Try to extract root and affix if not provided
  let root = context.root;
  let affix = context.affix;

  if (!root || !affix) {
    // Basic root-affix separation for analysis
    // This is a simplified approach - full morphological analysis would be more complex
    addDebug('Attempting to identify root and affix from word structure');
    
    // For this sutra, we're specifically looking for सन् affix combinations
    // Common सन् affixes: सि, सत्, सन्, स
    const sanAffixPatterns = script === 'Devanagari' 
      ? ['सि', 'सत्', 'सन्', 'स'] 
      : ['si', 'sat', 'san', 's'];
    
    for (const pattern of sanAffixPatterns) {
      if (trimmedWord.includes(pattern)) {
        const index = trimmedWord.indexOf(pattern);
        if (index > 0) {
          root = trimmedWord.substring(0, index);
          affix = trimmedWord.substring(index);
          addDebug(`Tentative root-affix split: root="${root}", affix="${affix}"`);
          break;
        }
      }
    }
    
    if (!root || !affix) {
      addDebug('Could not identify clear root-affix boundary');
      // Fall back to analyzing the whole word as root
      root = trimmedWord;
      affix = 'सन्'; // Assume सन् for analysis
    }
  }

  addDebug(`Analyzing root: "${root}", affix: "${affix}"`);

  // Check if Sutra 1.2.10 applies
  let applicable = false;
  let explanation = '';

  try {
    if (isKitBySutra1210(root, affix)) {
      applicable = true;
      const sutraText = script === 'IAST' ? 'halantācca' : 'हलन्ताच्च';
      const affixText = script === 'IAST' ? 'san affix' : 'सन् affix';
      const rootText = script === 'IAST' ? 'hal-ending root' : 'हल्-ending root';
      
      explanation = `${sutraText} - The ${affixText} "${affix}" is कित् after ${rootText} "${root}"`;
      addDebug('Sutra 1.2.10 applies: हल्-ending root + सन् affix → कित्');
    } else {
      // Check why it doesn't apply
      const rootEndsWithHal = endsWithHal(root);
      const affixIsSan = isSanAffix(affix);
      
      addDebug(`Root ends with हल्: ${rootEndsWithHal}`);
      addDebug(`Affix is सन्: ${affixIsSan}`);
      
      if (!rootEndsWithHal) {
        explanation = `Root "${root}" does not end with a consonant (हल्)`;
      } else if (!affixIsSan) {
        explanation = `Affix "${affix}" is not a सन् (desiderative) affix`;
      } else {
        explanation = `Conditions not met for Sutra 1.2.10 application`;
      }
    }
  } catch (error) {
    addDebug(`Error in analysis: ${error.message}`);
    
    try {
      // Try to use shared kit-designation utility as fallback
      const kitResult = analyzeKitDesignation(root, affix, context);
      if (kitResult.applicableSutras.includes('1.2.10')) {
        applicable = true;
        explanation = `Analyzed using shared kit-designation utility: ${kitResult.explanation || 'कित् designation by Sutra 1.2.10'}`;
        addDebug('Used shared kit-designation utility for analysis');
      }
    } catch (utilError) {
      addDebug(`Kit-designation utility error: ${utilError.message}`);
    }
    
    if (!applicable) {
      explanation = 'Analysis could not be completed due to processing error';
    }
  }

  // For कित्त्वातिदेश rules, the transformation is typically about 
  // marking the affix as कित्, which affects subsequent operations
  const transformed = applicable ? trimmedWord : trimmedWord;

  return {
    applicable,
    transformed,
    explanation,
    debug,
    details: {
      sutra: '1.2.10',
      sutraText: 'हलन्ताच्च',
      transliteration: 'halantācca',
      translation: 'And after (roots ending in) consonants',
      type: 'कित्त्वातिदेश',
      root: root,
      affix: affix,
      analysis: {
        rootEndsWithHal: root ? endsWithHal(root) : null,
        affixIsSan: affix ? isSanAffix(affix) : null,
        script: script
      }
    }
  };
}

/**
 * Check if Sutra 1.2.10 applies to a specific root-affix combination
 * @param {string} root - The root to check
 * @param {string} affix - The affix to check  
 * @returns {boolean} - True if the sutra applies
 */
export function checkSutra1210Applicability(root, affix) {
  if (!root || !affix) return false;
  
  try {
    return isKitBySutra1210(root, affix);
  } catch (error) {
    return false;
  }
}

/**
 * Get detailed analysis of why Sutra 1.2.10 does or doesn't apply
 * @param {string} root - The root to analyze
 * @param {string} affix - The affix to analyze
 * @returns {Object} - Detailed analysis
 */
export function analyzeSutra1210(root, affix) {
  const result = {
    applies: false,
    conditions: {
      rootEndsWithHal: false,
      affixIsSan: false
    },
    reasoning: []
  };

  if (!root || !affix) {
    result.reasoning.push('Invalid input: both root and affix required');
    return result;
  }

  try {
    result.conditions.rootEndsWithHal = endsWithHal(root);
    result.conditions.affixIsSan = isSanAffix(affix);
    
    if (result.conditions.rootEndsWithHal) {
      result.reasoning.push(`Root "${root}" ends with हल् (consonant)`);
    } else {
      result.reasoning.push(`Root "${root}" does not end with हल् (consonant)`);
    }
    
    if (result.conditions.affixIsSan) {
      result.reasoning.push(`Affix "${affix}" is सन् (desiderative)`);
    } else {
      result.reasoning.push(`Affix "${affix}" is not सन् (desiderative)`);
    }
    
    result.applies = result.conditions.rootEndsWithHal && result.conditions.affixIsSan;
    
    if (result.applies) {
      result.reasoning.push('Sutra 1.2.10 applies: हल्-ending root + सन् affix → कित्');
    } else {
      result.reasoning.push('Sutra 1.2.10 does not apply');
    }
    
  } catch (error) {
    result.reasoning.push(`Analysis error: ${error.message}`);
  }

  return result;
}

// Export metadata
export const metadata = {
  sutra: '1.2.10',
  sutraText: 'हलन्ताच्च',
  transliteration: 'halantācca', 
  translation: 'And after (roots ending in) consonants',
  category: 'कित्त्वातिदेश',
  type: 'Kit-designation rule',
  scope: {
    domain: 'Affix operations',
    conditions: ['हल्-ending roots', 'सन् affix'],
    effects: ['कित् designation']
  },
  dependencies: ['1.2.9'],
  relatedSutras: ['1.2.8', '1.2.9', '1.2.14', '1.2.15'],
  implementation: {
    status: 'Complete',
    functions: ['sutra1210', 'checkSutra1210Applicability', 'analyzeSutra1210'],
    utilities: ['endsWithHal', 'isSanAffix', 'isKitBySutra1210'],
    testCoverage: 'Comprehensive'
  }
};

// Default export
export default sutra1210;
