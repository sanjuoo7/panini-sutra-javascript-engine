/**
 * Sutra 1.1.53: ङिच्च (ṅicca)
 * "And the substitute which has indicatory ङ् (even though it consists of more than one letter) 
 * takes the place of the final letter only of the original expression."
 * 
 * This sutra specifies that substitutes marked with ङित् (having indicatory ङ्) replace only 
 * the final letter of the original term (sthāni), regardless of the substitute's length.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.53 - ङित् substitution rules
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Checks if a substitute has the ङित् (ṅit) marker
 * 
 * @param {string} substitute - The substitute form to check
 * @returns {boolean} - True if substitute has ङित् marker
 */
export function isNgitSubstitute(substitute) {
  if (!substitute || typeof substitute !== 'string') {
    return false;
  }

  try {
    const script = detectScript(substitute);
    
    if (script === 'Devanagari') {
      // Check for ङ् at the end
      return substitute.endsWith('ङ्');
    } else {
      // IAST - check for ṅ at the end
      return substitute.endsWith('ṅ');
    }
  } catch (error) {
    return false;
  }
}

/**
 * Extracts the final letter/phoneme from a Sanskrit word
 * 
 * @param {string} word - The word to process
 * @returns {string} - The final letter/phoneme
 */
export function extractFinalLetter(word) {
  if (!word || word.length === 0) {
    return '';
  }

  try {
    const script = detectScript(word);
    
    if (script === 'Devanagari') {
      // Handle Devanagari conjuncts and vowel marks
      if (word.length === 1) {
        return word;
      }
      
      // For conjunct consonants like गम्, we want to return म्, not just ्
      // Look for patterns like consonant + virama
      if (word.length >= 2 && word.endsWith('्')) {
        // Return the consonant + virama
        return word.slice(-2);
      }
      
      // For vowel marks and other cases, return last character
      return word.charAt(word.length - 1);
    } else {
      // IAST - return last character
      return word.charAt(word.length - 1);
    }
  } catch (error) {
    // Fallback to last character
    return word.charAt(word.length - 1);
  }
}

/**
 * Removes ङित् markers from a substitute
 * 
 * @param {string} substitute - The substitute with potential ङित् marker
 * @returns {string} - The substitute without ङित् marker
 */
export function removeItMarkers(substitute) {
  if (!substitute) {
    return substitute;
  }

  try {
    const script = detectScript(substitute);
    
    if (script === 'Devanagari') {
      if (substitute.endsWith('ङ्')) {
        return substitute.slice(0, -2); // Remove ङ्
      }
    } else {
      if (substitute.endsWith('ṅ')) {
        return substitute.slice(0, -1); // Remove ṅ
      }
    }
    
    return substitute;
  } catch (error) {
    return substitute;
  }
}

/**
 * Applies ङित् substitution rule - replaces only the final letter
 * 
 * @param {string} sthani - The original term to be replaced
 * @param {string} adesha - The substitute (with ङित् marker)
 * @param {Object} context - Additional context
 * @returns {Object} - Detailed substitution result
 */
export function applyNgitSubstitution(sthani, adesha, context = {}) {
  if (!sthani || !adesha) {
    throw new Error('Both sthāni and ādeśa must be provided');
  }

  const script = detectScript(sthani);
  const finalLetter = extractFinalLetter(sthani);
  const substituteWithoutNgit = removeItMarkers(adesha);
  
  // Calculate the result - ङित् substitute replaces only final letter
  let output;
  let preservedPortion = '';
  
  if (sthani.length === 1) {
    // If sthāni is single letter, replace entirely with substitute (without ङित्)
    output = substituteWithoutNgit;
  } else {
    // Replace only the final letter with the substitute (without ङित्)
    if (script === 'Devanagari' && finalLetter.length === 2 && finalLetter.endsWith('्')) {
      // Handle conjunct consonants like म्
      preservedPortion = sthani.slice(0, -2);
    } else {
      preservedPortion = sthani.slice(0, -1);
    }
    output = preservedPortion + substituteWithoutNgit;
  }

  return {
    sthani: sthani,
    adesha: adesha,
    finalLetterReplaced: finalLetter,
    substituteWithoutNgit: substituteWithoutNgit,
    preservedPortion: preservedPortion,
    output: output,
    script: script,
    ruleApplied: true,
    substitutionType: 'ngit_final_only',
    context: context
  };
}

/**
 * Main sutra function implementing ङित् substitution rules
 * 
 * @param {string} sthani - The original term (what is being replaced)
 * @param {string} adesha - The substitute term
 * @param {Object} context - Grammatical and operational context
 * @returns {Object} - Comprehensive analysis and result
 */
export function sutra1153(sthani, adesha, context = {}) {
  // Input validation
  if (!sthani || typeof sthani !== 'string') {
    throw new Error('Invalid input: sthāni must be a non-empty string');
  }
  
  if (!adesha || typeof adesha !== 'string') {
    throw new Error('Invalid input: ādeśa must be a non-empty string');
  }

  // Validate Sanskrit text
  const sthaniValidation = validateSanskritWord(sthani);
  if (!sthaniValidation.isValid) {
    throw new Error(`Invalid sthāni: ${sthaniValidation.error}`);
  }

  const adeshaValidation = validateSanskritWord(adesha);
  if (!adeshaValidation.isValid) {
    throw new Error(`Invalid ādeśa: ${adeshaValidation.error}`);
  }

  try {
    const script = detectScript(sthani);
    const { analysisLevel = 'basic' } = context;
    
    // Educational analysis object
    const analysis = {
      sutraNumber: '1.1.53',
      sutraText: {
        devanagari: 'ङिच्च',
        iast: 'ṅicca',
        translation: 'And the substitute which has indicatory ङ् takes the place of the final letter only'
      },
      
      traditionalCommentary: 'यो ङित् आदेशः स अन्त्यस्य स्थानी भवति। सर्वादेशोऽन्त्यस्यैव।',
      modernExplanation: 'Substitutes marked with ङित् replace only the final phoneme of the original term',
      
      linguisticCategory: 'ङित् substitution',
      grammaticalProcess: 'morphological substitution with positional restriction',
      
      technicalDetails: {
        markerType: 'ङित् (ṅit)',
        replacementScope: 'final letter only',
        preservationRule: 'all letters except final are preserved',
        applicabilityCondition: 'substitute must have ङित् marker'
      }
    };

    // Check if this rule applies
    const hasNgitMarker = isNgitSubstitute(adesha);
    
    if (!hasNgitMarker) {
      return {
        sthani: sthani,
        adesha: adesha,
        output: sthani, // unchanged
        script: script,
        sutraApplied: '1.1.53',
        ruleApplied: false,
        confidence: 0.0,
        explanation: `Substitute "${adesha}" does not have ङित् marker, so this rule does not apply`,
        analysis: {
          ...analysis,
          result: 'Rule not applicable',
          reason: 'Substitute lacks required ङित् marker',
          recommendation: 'Check if substitute should have ङित् or if different substitution rule applies'
        },
        context: context
      };
    }

    // Apply the ङित् substitution
    const substitutionResult = applyNgitSubstitution(sthani, adesha, context);
    
    // Enhanced analysis for detailed mode
    const detailedAnalysis = analysisLevel === 'detailed' ? {
      ...analysis,
      step_by_step: {
        step1: `Original (sthāni): "${sthani}"`,
        step2: `Substitute (ādeśa): "${adesha}"`,
        step3: `ङित् marker detected: true`,
        step4: `Final letter to replace: "${substitutionResult.finalLetterReplaced}"`,
        step5: `Substitute without ङित्: "${substitutionResult.substituteWithoutNgit}"`,
        step6: `Result: "${substitutionResult.output}"`
      },
      
      morphological_analysis: {
        original_structure: `${substitutionResult.preservedPortion} + ${substitutionResult.finalLetterReplaced}`,
        substitute_structure: `${substitutionResult.substituteWithoutNgit} + ङित्`,
        result_structure: `${substitutionResult.preservedPortion} + ${substitutionResult.substituteWithoutNgit}`,
        transformation_type: 'final-letter replacement with ङित् marking'
      },
      
      traditional_examples: [
        { sthani: 'कृ', adesha: 'करङ्', result: 'कर', explanation: 'Root substitution' },
        { sthani: 'गम्', adesha: 'गछङ्', result: 'गछ', explanation: 'Verbal form substitution' },
        { sthani: 'हृ', adesha: 'हरङ्', result: 'हर', explanation: 'Classical example' }
      ]
    } : analysis;

    return {
      sthani: sthani,
      adesha: adesha,
      output: substitutionResult.output,
      script: script,
      sutraApplied: '1.1.53',
      ruleApplied: true,
      confidence: 1.0,
      isPragrhya: false, // This sutra is about substitution, not pragrhya
      explanation: `ङित् substitute "${adesha}" replaces only final "${substitutionResult.finalLetterReplaced}" of "${sthani}"`,
      
      substitutionDetails: {
        finalLetterReplaced: substitutionResult.finalLetterReplaced,
        preservedPortion: substitutionResult.preservedPortion,
        substituteWithoutMarker: substitutionResult.substituteWithoutNgit,
        substitutionType: substitutionResult.substitutionType
      },
      
      analysis: detailedAnalysis,
      context: context,
      
      // For integration with other rules
      resultForChaining: {
        finalOutput: substitutionResult.output,
        substitutionType: 'ngit_final_only',
        markerProcessed: 'ङित्',
        canChain: true
      },
      
      // Metadata for debugging and validation
      metadata: {
        processingTime: new Date().toISOString(),
        ruleCategory: 'substitution_restriction',
        validationPassed: true,
        scriptDetected: script
      }
    };
    
  } catch (error) {
    return {
      sthani: sthani,
      adesha: adesha,
      output: sthani, // unchanged on error
      script: 'unknown',
      sutraApplied: '1.1.53',
      ruleApplied: false,
      confidence: 0.0,
      explanation: `Error processing ङित् substitution: ${error.message}`,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during ङित् substitution analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      },
      context: context
    };
  }
}

// Export main function as default and with alternative names
export default sutra1153;
export { sutra1153 as sutra1_1_53 };
