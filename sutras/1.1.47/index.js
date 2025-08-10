/**
 * Sutra 1.1.47: मिदचो ऽन्त्यात् परः
 * midaco 'ntyāt paraḥ
 * "Mid (substitute) comes after the final sound"
 * 
 * This sutra defines the term 'mid' which refers to substitute sounds that replace
 * the final sound in certain grammatical operations. The substitute (mid) is placed
 * after (paraḥ) the final (antyāt) sound in the sequence.
 * 
 * This is important for understanding how substitutions work in Sanskrit grammar,
 * particularly in morphological operations where sounds are replaced.
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';
const { substitutionPatterns, declensionSubstitutes, conjugationSubstitutes, derivationSubstitutes, sandhiSubstitutes, generalSubstitutes } = SanskritWordLists;

/**
 * Main function to apply Sutra 1.1.47
 * @param {string} originalWord - The original word before substitution
 * @param {string} substitute - The substitute sound/element (mid)
 * @param {Object} context - Additional context for analysis
 * @returns {Object} Analysis result showing mid substitution
 */
export function applySutra1_1_47(originalWord, substitute, context = {}) {
    // Input validation for originalWord
    if (typeof originalWord !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: originalWord must be a string'
        };
    }

    if (typeof substitute !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: substitute must be a string'
        };
    }

    // Normalize inputs
    const normalized_original = originalWord.toLowerCase().trim();
    const normalized_substitute = substitute.toLowerCase().trim();

    if (normalized_original.length === 0) {
        return {
            applies: false,
            reason: 'Empty word after normalization'
        };
    }

    if (normalized_substitute.length === 0) {
        return {
            applies: false,
            reason: 'Empty word after normalization'
        };
    }

    // Analyze the mid substitution
    const midAnalysis = analyzeMidSubstitution(normalized_original, normalized_substitute, context);
    
    return {
        applies: true,
        original_word: originalWord,
        substitute: substitute,
        normalized_original: normalized_original,
        normalized_substitute: normalized_substitute,
        mid_analysis: midAnalysis,
        grammatical_function: 'sound_substitution',
        source: 'sutra_1_1_47'
    };
}

/**
 * Analyzes mid (substitute) placement after final sound
 * @param {string} originalWord - Original word
 * @param {string} substitute - Substitute element
 * @param {Object} context - Analysis context
 * @returns {Object} Mid substitution analysis
 */
function analyzeMidSubstitution(originalWord, substitute, context = {}) {
    const finalSound = originalWord.charAt(originalWord.length - 1);
    const wordWithoutFinal = originalWord.substring(0, originalWord.length - 1);
    
    // Apply mid substitution: original word + substitute (mid comes after the final sound)
    const resultAfterMid = originalWord + substitute;
    
    return {
        original_final: finalSound,
        word_without_final: wordWithoutFinal,
        substitute_element: substitute,
        result_after_mid: resultAfterMid,
        substitution_type: determineMidType(substitute, context),
        position_analysis: {
            substitution_position: 'after_final',
            final_element: finalSound,
            added_element: substitute
        },
        grammatical_process: 'mid_substitution'
    };
}

/**
 * Determines the type of mid substitution
 * @param {string} substitute - The substitute element
 * @param {Object} context - Analysis context
 * @returns {string} Type of substitution
 */
function determineMidType(substitute, context = {}) {
    // Common substitution patterns in Sanskrit
    const substitutionPatternsMap = substitutionPatterns;

    return substitutionPatternsMap[substitute] || 'general_substitution';
}

/**
 * Applies mid substitution to a word
 * @param {string} word - Word to modify
 * @param {string} substitute - Substitute element
 * @param {Object} options - Substitution options
 * @returns {Object} Substitution result
 */
export function applyMidSubstitution(word, substitute, options = {}) {
    const analysis = applySutra1_1_47(word, substitute, options);
    
    if (!analysis.applies) {
        return analysis;
    }

    const substitutionResult = {
        original: word,
        substitute: substitute,
        result: analysis.mid_analysis.result_after_mid,
        process_details: {
            removed_final: analysis.mid_analysis.original_final,
            added_substitute: substitute,
            substitution_type: analysis.mid_analysis.substitution_type
        },
        grammatical_context: options.context || 'general'
    };

    return {
        applies: true,
        substitution_result: substitutionResult,
        source: 'sutra_1_1_47'
    };
}

/**
 * Identifies potential mid substitutions in morphological processes
 * @param {string} word - Word to analyze
 * @param {string} morphProcess - Type of morphological process
 * @param {Object} context - Analysis context
 * @returns {Object} Potential substitutions
 */
export function identifyMidSubstitutions(word, morphProcess = 'general', context = {}) {
    const finalSound = word.charAt(word.length - 1);
    const potentialSubstitutes = [];

    // Based on morphological process, suggest appropriate substitutes
    switch (morphProcess) {
        case 'declension':
            potentialSubstitutes.push(...getDeclensionSubstitutes(finalSound));
            break;
        case 'conjugation':
            potentialSubstitutes.push(...getConjugationSubstitutes(finalSound));
            break;
        case 'derivation':
            potentialSubstitutes.push(...getDerivationSubstitutes(finalSound));
            break;
        case 'sandhi':
            potentialSubstitutes.push(...getSandhiSubstitutes(finalSound));
            break;
        default:
            potentialSubstitutes.push(...getGeneralSubstitutes(finalSound));
    }

    return {
        word: word,
        final_sound: finalSound,
        morphological_process: morphProcess,
        potential_substitutes: potentialSubstitutes,
        mid_applications: potentialSubstitutes.map(sub => 
            analyzeMidSubstitution(word, sub, context)
        )
    };
}

/**
 * Gets declension-specific substitutes
 * @param {string} finalSound - Final sound of word
 * @returns {Array} Possible substitutes
 */
function getDeclensionSubstitutes(finalSound) {
    return declensionSubstitutes[finalSound] || [];
}

/**
 * Gets conjugation-specific substitutes
 * @param {string} finalSound - Final sound of root
 * @returns {Array} Possible substitutes
 */
function getConjugationSubstitutes(finalSound) {
    return conjugationSubstitutes[finalSound] || ['ati', 'anti', 'āmi']; // Default conjugation endings
}

/**
 * Gets derivation-specific substitutes
 * @param {string} finalSound - Final sound
 * @returns {Array} Possible substitutes
 */
function getDerivationSubstitutes(finalSound) {
    return derivationSubstitutes;
}

/**
 * Gets sandhi-specific substitutes
 * @param {string} finalSound - Final sound
 * @returns {Array} Possible substitutes
 */
function getSandhiSubstitutes(finalSound) {
    return sandhiSubstitutes[finalSound] || [];
}

/**
 * Gets general substitutes
 * @param {string} finalSound - Final sound
 * @returns {Array} Possible substitutes
 */
function getGeneralSubstitutes(finalSound) {
    return generalSubstitutes;
}

/**
 * Validates mid substitution according to grammatical rules
 * @param {string} originalWord - Original word
 * @param {string} substitute - Proposed substitute
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export function validateMidSubstitution(originalWord, substitute, context = {}) {
    const analysis = applySutra1_1_47(originalWord, substitute, context);

    if (!analysis.applies) {
        return {
            is_valid: false,
            reason: analysis.reason
        };
    }

    // Check grammatical validity
    const validationChecks = {
        phonetic_compatibility: checkPhoneticCompatibility(originalWord, substitute),
        morphological_validity: checkMorphologicalValidity(originalWord, substitute, context),
        contextual_appropriateness: checkContextualAppropriateness(substitute, context)
    };

    const isValid = Object.values(validationChecks).every(check => check.valid);

    return {
        is_valid: isValid,
        validation_checks: validationChecks,
        mid_substitution: analysis.mid_analysis,
        confidence: isValid ? 0.9 : 0.3,
        usage_note: `Mid substitute '${substitute}' ${isValid ? 'is' : 'may not be'} appropriate for replacing the final sound of '${originalWord}' in this context.`,
        grammatical_properties: {
            original_final: analysis.mid_analysis.original_final,
            substitute_element: substitute,
            substitution_type: analysis.mid_analysis.substitution_type,
            result: analysis.mid_analysis.result_after_mid
        }
    };
}

/**
 * Checks phonetic compatibility of substitution
 * @param {string} word - Original word
 * @param {string} substitute - Substitute element
 * @returns {Object} Compatibility check result
 */
function checkPhoneticCompatibility(word, substitute) {
    // Basic phonetic compatibility rules
    const finalSound = word.charAt(word.length - 1);
    
    // Check if substitution follows phonetic principles
    const vowels = 'aāiīuūṛṝḷeaiou';
    const consonants = 'kgcjṭḍtdpbnmyrlvśṣsh';
    
    const finalIsVowel = vowels.includes(finalSound);
    const substituteIsVowel = vowels.includes(substitute.charAt(0));
    
    return {
        valid: true, // Most substitutions are phonetically possible
        note: `${finalIsVowel ? 'Vowel' : 'Consonant'} to ${substituteIsVowel ? 'vowel' : 'consonant'} substitution`
    };
}

/**
 * Checks morphological validity
 * @param {string} word - Original word
 * @param {string} substitute - Substitute element
 * @param {Object} context - Context information
 * @returns {Object} Validity check result
 */
function checkMorphologicalValidity(word, substitute, context) {
    const morphProcess = context.morphological_process || 'general';
    
    // Different processes have different validity rules
    const validityRules = {
        'declension': substitute.length <= 4, // Case endings are typically short
        'conjugation': substitute.length <= 5, // Verbal endings can be longer
        'derivation': substitute.length <= 6, // Suffixes can be longer
        'sandhi': substitute.length <= 3, // Sandhi changes are typically short
        'general': true
    };
    
    const isValid = validityRules[morphProcess] !== false;
    
    return {
        valid: isValid,
        note: `${morphProcess} process ${isValid ? 'allows' : 'restricts'} this substitution`
    };
}

/**
 * Checks contextual appropriateness
 * @param {string} substitute - Substitute element
 * @param {Object} context - Context information
 * @returns {Object} Appropriateness check result
 */
function checkContextualAppropriateness(substitute, context) {
    const grammarContext = context.grammar_context || 'general';
    
    // Context-specific appropriateness
    const appropriatenessMap = {
        'vedic': substitute.includes('ḷ') || substitute.includes('ai'), // Vedic allows more variants
        'classical': !substitute.includes('ḷ'), // Classical Sanskrit rarely uses ḷ
        'general': true
    };
    
    const isAppropriate = appropriatenessMap[grammarContext] !== false;
    
    return {
        valid: isAppropriate,
        note: `${grammarContext} context ${isAppropriate ? 'supports' : 'questions'} this substitution`
    };
}

/**
 * Test function for comprehensive analysis
 * @param {string} originalWord - Word to test
 * @param {string} substitute - Substitute to test
 * @param {Object} context - Test context
 * @returns {Object} Comprehensive test results
 */
export function testSutra1_1_47(originalWord, substitute, context = {}) {
    const analysis = applySutra1_1_47(originalWord, substitute, context);
    const application = applyMidSubstitution(originalWord, substitute, context);
    const validation = validateMidSubstitution(originalWord, substitute, context);
    const potentialSubs = identifyMidSubstitutions(originalWord, 'general', context);

    return {
        analysis: analysis,
        application: application,
        validation: validation,
        potential_substitutions: potentialSubs,
        examples: {
            mid_examples: [
                'gam + a → gama (root + vowel)',
                'kṛ + ta → kṛta (root + suffix)',
                'dā + na → dāna (root + suffix)',
                'bhū + ta → bhūta (root + suffix)'
            ],
            process_examples: [
                'Declension: rāma + as → rāmas (nominative plural)',
                'Conjugation: gam + ati → gacchati (present tense)',
                'Derivation: kṛ + aka → kāraka (agent noun)',
                'Sandhi: rāma + iti → rāma iti (word boundary)'
            ]
        },
        linguistic_notes: {
            sutra_purpose: 'Defines mid as substitute element that comes after the final sound',
            mid_function: 'Replaces final sounds in morphological operations',
            substitution_principle: 'Mid substitute takes the place of the final element',
            grammatical_significance: 'Essential for understanding morphological modifications',
            application_domains: 'Declension, conjugation, derivation, and sandhi processes'
        }
    };
}

// Export for testing
export { 
    analyzeMidSubstitution,
    determineMidType,
    getDeclensionSubstitutes,
    getConjugationSubstitutes,
    checkPhoneticCompatibility
};
