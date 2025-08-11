/**
 * Sutra 1.2.15: यमो गन्धने (yamaḥ gandhane)
 * "यम् (root) in the sense of गन्धने (divulging)"
 * 
 * This sutra establishes that सिच् affix is कित् when it follows the root यम् 
 * specifically in the meaning of "divulging/revealing" (गन्धने) in आत्मनेपद contexts.
 * 
 * This is a semantically constrained अतिदेश (extension) rule that specifies कित् 
 * designation for a particular root-affix-meaning combination. Unlike general 
 * applications of यम् (to restrain), this rule applies only when यम् has the 
 * specific meaning of "to divulge" or "to reveal".
 * 
 * Dependencies:
 * - Root identification: यम् and its variants
 * - Affix identification: सिच् (vikaraṇa affix)
 * - Context: आत्मनेपद (reflexive voice)
 * - Semantic constraint: गन्धने meaning (divulging/revealing)
 * 
 * @author AI Assistant
 * @since 2025
 */

import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { 
  isYamRoot,
  isSicAffix
} from '../sanskrit-utils/kit-designation.js';
import { 
  isAtmanepadaAffix 
} from '../sanskrit-utils/pada-analysis.js';

/**
 * Applies Sutra 1.2.15: यमो गन्धने
 * 
 * This function determines if the सिच् affix should be treated as कित्
 * when it follows the root यम् specifically in the meaning of गन्धने 
 * (divulging/revealing) in आत्मनेपद contexts.
 * 
 * The rule establishes:
 * - सिच् affix after यम् root is कित्
 * - Only when यम् has the meaning "to divulge" (गन्धने)
 * - This applies in आत्मनेपद contexts
 * - The कित् designation affects subsequent grammatical operations
 * 
 * @param {string} word - The Sanskrit word containing the root यम्
 * @param {Object} context - Context object containing affix and grammatical information
 * @param {string} context.affix - The affix being analyzed (should be सिच्)
 * @param {string} [context.followingAffix] - The following affix (for पद analysis)
 * @param {string} [context.meaning] - Semantic meaning constraint ('गन्धने' for divulging)
 * @param {boolean} [context.debug] - Enable debug output
 * @returns {Object} Analysis result with कित् designation information
 */
export function sutra_1_2_15(word, context = {}) {
  const result = {
    applies: false,
    kit: false,
    reasoning: [],
    analysis: {
      isYamRoot: false,
      isSicAffix: false,
      isAtmanepada: false,
      hasGandhanaMeaning: false,
      rootVariant: null
    },
    debug: []
  };

  // Debug helper
  const addDebug = (msg) => {
    if (context.debug) {
      result.debug.push(`[1.2.15] ${msg}`);
    }
  };

  try {
    // Validate inputs
    if (!validateSanskritWord(word) || !context.affix) {
      addDebug('Invalid input: word or affix missing');
      return result;
    }

    addDebug(`Analyzing word: '${word}', affix: '${context.affix}'`);

    // Check if the root is यम्
    result.analysis.isYamRoot = isYamRoot(word);
    addDebug(`Root is यम्: ${result.analysis.isYamRoot}`);

    if (!result.analysis.isYamRoot) {
      addDebug('Rule does not apply: root is not यम्');
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

    // Check semantic constraint: गन्धने meaning
    result.analysis.hasGandhanaMeaning = isGandhanaMeaning(context.meaning);
    
    addDebug(`Semantic meaning constraint (गन्धने): ${result.analysis.hasGandhanaMeaning}`);
    addDebug(`Provided meaning: '${context.meaning || 'not specified'}'`);

    if (!result.analysis.hasGandhanaMeaning) {
      addDebug('Rule does not apply: यम् root does not have गन्धने (divulging) meaning');
      result.reasoning.push('यम् root requires गन्धने (divulging) meaning for this rule');
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
    
    result.reasoning.push(`यम् root with गन्धने meaning + सिच् affix in आत्मनेपद`);
    result.reasoning.push('यमो गन्धने - सिच् is कित् after यम् root in divulging sense');
    
    addDebug(`Rule applies: सिच् is कित् after यम् root with गन्धने meaning in आत्मनेपद`);

    return result;

  } catch (error) {
    addDebug(`Error in sutra_1_2_15: ${error.message}`);
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
 * Helper function to check if सिच् affix is कित् after यम् root in divulging sense
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Context with affix and meaning information
 * @returns {boolean} True if सिच् affix is कित् due to this sutra
 */
export function isSicKitAfterYamDivulging(word, context = {}) {
  const result = sutra_1_2_15(word, context);
  return result.applies && result.kit;
}

/**
 * Get detailed analysis of Sutra 1.2.15 application
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Context with affix and meaning information
 * @returns {Object} Detailed analysis including semantic verification
 */
export function analyzeYamSicKit(word, context = {}) {
  return sutra_1_2_15(word, { ...context, debug: true });
}

/**
 * Check if a given context represents यम् in divulging sense with सिच्
 * 
 * @param {string} root - The root to check
 * @param {string} affix - The affix to check
 * @param {string} meaning - The semantic meaning
 * @returns {boolean} True if it matches यम् + सिच् + गन्धने pattern
 */
export function isYamDivulgingContext(root, affix, meaning) {
  const hasYamRoot = isYamRoot(root);
  const hasSicAffix = isSicAffix(affix);
  const hasGandhanaMeaning = meaning === 'गन्धने' || 
                            meaning === 'gandhane' ||
                            meaning === 'divulging' ||
                            meaning === 'revealing';
  
  return hasYamRoot && hasSicAffix && hasGandhanaMeaning;
}

/**
 * Check if यम् root has the गन्धने (divulging) meaning
 * 
 * @param {string} meaning - The meaning to check
 * @returns {boolean} True if meaning represents divulging/revealing
 */
export function isGandhanaMeaning(meaning) {
  if (!meaning || typeof meaning !== 'string') {
    return false;
  }
  
  const normalizedMeaning = meaning.toLowerCase().trim();
  
  // Sanskrit terms
  if (normalizedMeaning === 'गन्धने' || normalizedMeaning === 'gandhane') {
    return true;
  }
  
  // English equivalents
  const divulgingTerms = [
    'divulging', 'revealing', 'disclosing', 'exposing',
    'divulge', 'reveal', 'disclose', 'expose',
    'to divulge', 'to reveal', 'to disclose', 'to expose'
  ];
  
  return divulgingTerms.includes(normalizedMeaning);
}
