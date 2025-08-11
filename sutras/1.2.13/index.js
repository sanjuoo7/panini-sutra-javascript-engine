/**
 * Sutra 1.2.13: वा गमः (vā gamaḥ)
 * "Optionally, गम्"
 * 
 * This sutra makes the कित् designation optional for the root गम् when followed by
 * लिङ् affix or सिच् affix beginning with झल् consonants in the आत्मनेपद.
 * 
 * This is an अतिदेश (extension) rule that modifies the mandatory application
 * of sutras 1.2.11 and 1.2.12 specifically for the गम् root, making the
 * कित् designation optional (वा = optionally).
 * 
 * Dependencies:
 * - Sutra 1.2.11: लिङश्च (liṅaśca) - लिङ् affix is कित् in आत्मनेपद
 * - Sutra 1.2.12: सिज्झल्यमाने (sijjhalyamāne) - सिच् beginning with झल् is कित् in आत्मनेपद
 * 
 * @author AI Assistant
 * @since 2025
 */

import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { 
  isGamRoot,
  isSicAffix,
  isLingAffix, 
  beginsWithJhal
} from '../sanskrit-utils/kit-designation.js';
import { 
  isAtmanepadaAffix 
} from '../sanskrit-utils/pada-analysis.js';

/**
 * Applies Sutra 1.2.13: वा गमः
 * 
 * This function determines if the कित् designation is optional for the गम् root
 * when conditions from sutras 1.2.11 or 1.2.12 are met.
 * 
 * The optionality means:
 * - The affix CAN be treated as कित् (following 1.2.11/1.2.12)
 * - The affix CAN also be treated as NOT कित् (due to वा)
 * 
 * @param {string} word - The Sanskrit word containing the root गम्
 * @param {Object} context - Context object containing affix and grammatical information
 * @param {string} context.affix - The affix being analyzed
 * @param {string} [context.followingAffix] - The following affix (for पद analysis)
 * @param {boolean} [context.debug] - Enable debug output
 * @returns {Object} Analysis result with optionality information
 */
export function sutra_1_2_13(word, context = {}) {
  const result = {
    applies: false,
    optional: false,
    reasoning: [],
    analysis: {
      isGamRoot: false,
      isValidAffix: false,
      affixType: null,
      beginsWithJhal: false,
      isAtmanepada: false,
      conditions1211Met: false, // लिङ् in आत्मनेपद
      conditions1212Met: false  // सिच् + झल् in आत्मनेपद
    },
    debug: []
  };

  // Debug helper
  const addDebug = (msg) => {
    if (context.debug) {
      result.debug.push(`[1.2.13] ${msg}`);
    }
  };

  try {
    // Validate inputs
    if (!validateSanskritWord(word) || !context.affix) {
      addDebug('Invalid input: word or affix missing');
      return result;
    }

    addDebug(`Analyzing word: '${word}', affix: '${context.affix}'`);

    // Check if the root is गम्
    result.analysis.isGamRoot = isGamRoot(word);
    addDebug(`Root is गम्: ${result.analysis.isGamRoot}`);

    if (!result.analysis.isGamRoot) {
      addDebug('Rule does not apply: root is not गम्');
      return result;
    }

    // Check if affix is लिङ् or सिच्
    const isLing = isLingAffix(context.affix);
    const isSic = isSicAffix(context.affix);
    
    result.analysis.isValidAffix = isLing || isSic;
    result.analysis.affixType = isLing ? 'लिङ्' : (isSic ? 'सिच्' : null);
    
    addDebug(`Affix is लिङ्: ${isLing}, Affix is सिच्: ${isSic}`);

    if (!result.analysis.isValidAffix) {
      addDebug('Rule does not apply: affix is neither लिङ् nor सिच्');
      return result;
    }

    // For सिच्, check if it begins with झल्
    if (isSic) {
      result.analysis.beginsWithJhal = beginsWithJhal(context.affix);
      addDebug(`सिच् affix begins with झल्: ${result.analysis.beginsWithJhal}`);
      
      if (!result.analysis.beginsWithJhal) {
        addDebug('Rule does not apply: सिच् affix does not begin with झल्');
        return result;
      }
    }

    // Check if the following affix is आत्मनेपद
    if (context.followingAffix) {
      result.analysis.isAtmanepada = isAtmanepadaAffix(context.followingAffix);
      addDebug(`Following affix '${context.followingAffix}' is आत्मनेपद: ${result.analysis.isAtmanepada}`);
      
      if (!result.analysis.isAtmanepada) {
        addDebug('Rule does not apply: not in आत्मनेपद');
        return result;
      }
    } else {
      addDebug('Warning: followingAffix not provided, assuming आत्मनेपद context');
      result.analysis.isAtmanepada = true; // Assume आत्मनेपद if not specified
    }

    // Determine which base rule conditions are met
    if (isLing && result.analysis.isAtmanepada) {
      result.analysis.conditions1211Met = true;
      addDebug('Conditions of Sutra 1.2.11 (लिङश्च) are met');
    }

    if (isSic && result.analysis.beginsWithJhal && result.analysis.isAtmanepada) {
      result.analysis.conditions1212Met = true;
      addDebug('Conditions of Sutra 1.2.12 (सिज्झल्यमाने) are met');
    }

    // The rule applies if either base condition is met
    if (result.analysis.conditions1211Met || result.analysis.conditions1212Met) {
      result.applies = true;
      result.optional = true; // The key aspect: वा makes it optional
      
      const baseRule = result.analysis.conditions1211Met ? '1.2.11' : '1.2.12';
      result.reasoning.push(`गम् root with conditions of Sutra ${baseRule} met`);
      result.reasoning.push('Due to वा (optionally), कित् designation is optional');
      
      addDebug(`Rule applies: गम् root meets ${baseRule} conditions, कित् is optional`);
    }

    return result;

  } catch (error) {
    addDebug(`Error in sutra_1_2_13: ${error.message}`);
    return {
      applies: false,
      optional: false,
      reasoning: ['Error in analysis'],
      analysis: result.analysis,
      debug: result.debug,
      error: error.message
    };
  }
}

/**
 * Helper function to check if Sutra 1.2.13 makes कित् designation optional
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Context with affix information
 * @returns {boolean} True if कित् designation is optional due to this sutra
 */
export function isKitOptionalForGam(word, context = {}) {
  const result = sutra_1_2_13(word, context);
  return result.applies && result.optional;
}

/**
 * Get detailed analysis of Sutra 1.2.13 application
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Context with affix information
 * @returns {Object} Detailed analysis including base rule dependencies
 */
export function analyzeGamOptionalKit(word, context = {}) {
  return sutra_1_2_13(word, { ...context, debug: true });
}
