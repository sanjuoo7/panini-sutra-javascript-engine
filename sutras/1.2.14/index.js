/**
 * Sutra 1.2.14: हनः सिच् (hanaḥ sic)
 * "After हन्, सिच्"
 * 
 * This sutra establishes that सिच् affix is कित् when it follows the root हन् (to kill/strike)
 * in आत्मनेपद contexts. This is a specific rule that adds to the general framework
 * of कित् designation for विकरण affixes.
 * 
 * This is an अतिदेश (extension) rule that specifies कित् designation for a particular
 * root-affix combination, ensuring consistent treatment of हन् + सिच् in grammatical operations.
 * 
 * Dependencies:
 * - Root identification: हन् and its variants
 * - Affix identification: सिच् (vikaraṇa affix)
 * - Context: आत्मनेपद (reflexive voice)
 * 
 * @author AI Assistant
 * @since 2025
 */

import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { 
  isHanRoot,
  isSicAffix
} from '../sanskrit-utils/kit-designation.js';
import { 
  isAtmanepadaAffix 
} from '../sanskrit-utils/pada-analysis.js';

/**
 * Applies Sutra 1.2.14: हनः सिच्
 * 
 * This function determines if the सिच् affix should be treated as कित्
 * when it follows the root हन् in आत्मनेपद contexts.
 * 
 * The rule establishes:
 * - सिच् affix after हन् root is कित्
 * - This applies in आत्मनेपद contexts
 * - The कित् designation affects subsequent grammatical operations
 * 
 * @param {string} word - The Sanskrit word containing the root हन्
 * @param {Object} context - Context object containing affix and grammatical information
 * @param {string} context.affix - The affix being analyzed (should be सिच्)
 * @param {string} [context.followingAffix] - The following affix (for पद analysis)
 * @param {boolean} [context.debug] - Enable debug output
 * @returns {Object} Analysis result with कित् designation information
 */
export function sutra_1_2_14(word, context = {}) {
  const result = {
    applies: false,
    kit: false,
    reasoning: [],
    analysis: {
      isHanRoot: false,
      isSicAffix: false,
      isAtmanepada: false,
      rootVariant: null
    },
    debug: []
  };

  // Debug helper
  const addDebug = (msg) => {
    if (context.debug) {
      result.debug.push(`[1.2.14] ${msg}`);
    }
  };

  try {
    // Validate inputs
    if (!validateSanskritWord(word) || !context.affix) {
      addDebug('Invalid input: word or affix missing');
      return result;
    }

    addDebug(`Analyzing word: '${word}', affix: '${context.affix}'`);

    // Check if the root is हन्
    result.analysis.isHanRoot = isHanRoot(word);
    addDebug(`Root is हन्: ${result.analysis.isHanRoot}`);

    if (!result.analysis.isHanRoot) {
      addDebug('Rule does not apply: root is not हन्');
      return result;
    }

    // Determine root variant for detailed analysis
    const script = detectScript(word);
    result.analysis.rootVariant = word.trim();
    addDebug(`Root variant: '${result.analysis.rootVariant}' (${script})`);

    // Check if affix is सिच्
    result.analysis.isSicAffix = isSicAffix(context.affix);
    addDebug(`Affix is सिच्: ${result.analysis.isSicAffix}`);

    if (!result.analysis.isSicAffix) {
      addDebug('Rule does not apply: affix is not सिच्');
      return result;
    }

    // Check if the context is आत्मनेपद
    if (context.followingAffix) {
      result.analysis.isAtmanepada = isAtmanepadaAffix(context.followingAffix);
      addDebug(`Following affix '${context.followingAffix}' is आत्मनेपद: ${result.analysis.isAtmanepada}`);
      
      if (!result.analysis.isAtmanepada) {
        addDebug('Rule does not apply: not in आत्मनेपद context');
        return result;
      }
    } else {
      addDebug('Warning: followingAffix not provided, assuming आत्मनेपद context');
      result.analysis.isAtmanepada = true; // Assume आत्मनेपद if not specified
    }

    // All conditions met - rule applies
    result.applies = true;
    result.kit = true;
    
    result.reasoning.push(`हन् root with सिच् affix in आत्मनेपद`);
    result.reasoning.push('हनः सिच् - सिच् is कित् after हन् root');
    
    addDebug(`Rule applies: सिच् is कित् after हन् root in आत्मनेपद`);

    return result;

  } catch (error) {
    addDebug(`Error in sutra_1_2_14: ${error.message}`);
    return {
      applies: false,
      kit: false,
      reasoning: ['Error in analysis'],
      analysis: result.analysis,
      debug: result.debug,
      error: error.message
    };
  }
}

/**
 * Helper function to check if सिच् affix is कित् after हन् root
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Context with affix information
 * @returns {boolean} True if सिच् affix is कित् due to this sutra
 */
export function isSicKitAfterHan(word, context = {}) {
  const result = sutra_1_2_14(word, context);
  return result.applies && result.kit;
}

/**
 * Get detailed analysis of Sutra 1.2.14 application
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Context with affix information
 * @returns {Object} Detailed analysis including root and affix verification
 */
export function analyzeHanSicKit(word, context = {}) {
  return sutra_1_2_14(word, { ...context, debug: true });
}

/**
 * Check if a given root-affix combination matches हन् + सिच् pattern
 * 
 * @param {string} root - The root to check
 * @param {string} affix - The affix to check
 * @returns {boolean} True if it matches हन् + सिच् pattern
 */
export function isHanSicCombination(root, affix) {
  return isHanRoot(root) && isSicAffix(affix);
}
