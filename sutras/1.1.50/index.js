/**
 * Sutra 1.1.50: स्थानेऽन्तरतमः
 * sthāne'ntaratamaḥ
 * "The closest/most similar (substitute) in place"
 * 
 * This sutra establishes a fundamental paribhasha (interpretive rule) for determining
 * which specific substitute should be chosen when multiple options are available.
 * When a general term is prescribed as a substitute, the most similar or closest
 * substitute to the original element should be selected.
 * 
 * This rule ensures that substitutions maintain phonetic, articulatory, or
 * grammatical similarity as much as possible, preserving the natural flow
 * and characteristics of Sanskrit speech.
 */

import { 
    analyzeSimilarity, 
    findClosestSubstitute 
} from '../sanskrit-utils/similarity-analysis.js';

/**
 * Main function to apply Sutra 1.1.50
 * @param {string} originalElement - The original element being replaced
 * @param {Array} possibleSubstitutes - Array of possible substitute elements
 * @param {Object} context - Additional context for similarity analysis
 * @returns {Object} Analysis result showing the closest substitute
 */
export function applySutra1_1_50(originalElement, possibleSubstitutes, context = {}) {
    // Input validation
    if (typeof originalElement !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: originalElement must be a string'
        };
    }

    if (!Array.isArray(possibleSubstitutes)) {
        return {
            applies: false,
            reason: 'Invalid input: possibleSubstitutes must be an array'
        };
    }

    // Normalize inputs
    const normalized_original = originalElement.trim();
    const normalized_substitutes = possibleSubstitutes.map(s => 
        typeof s === 'string' ? s.trim() : s
    );

    if (normalized_original.length === 0) {
        return {
            applies: false,
            reason: 'Empty original element after normalization'
        };
    }

    if (normalized_substitutes.length === 0) {
        return {
            applies: false,
            reason: 'No substitute elements provided'
        };
    }

    // Analyze similarity and find the closest substitute
    const similarityAnalysis = analyzeSimilarity(normalized_original, normalized_substitutes, context);
    const closestSubstitute = findClosestSubstitute(similarityAnalysis, context);

    return {
        applies: true,
        original_element: originalElement,
        possible_substitutes: possibleSubstitutes,
        normalized_original: normalized_original,
        normalized_substitutes: normalized_substitutes,
        similarity_analysis: similarityAnalysis,
        closest_substitute: closestSubstitute,
        paribhasha_type: 'substitution_selection',
        grammatical_function: 'similarity_based_selection',
        source: 'sutra_1_1_50'
    };
}

/**
 * Validates whether a substitution follows the antartama principle
 * @param {string} original - Original element
 * @param {string} chosen - Chosen substitute
 * @param {Array} alternatives - Alternative substitutes
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export function validateAntartamaSelection(original, chosen, alternatives, context = {}) {
    const analysis = applySutra1_1_50(original, [chosen, ...alternatives], context);
    
    if (!analysis.applies) {
        return {
            is_valid: false,
            reason: analysis.reason
        };
    }

    const selectedSubstitute = analysis.closest_substitute.selected_substitute;
    const isOptimal = selectedSubstitute === chosen;

    return {
        is_valid: isOptimal,
        selected_substitute: selectedSubstitute,
        chosen_substitute: chosen,
        similarity_score: analysis.closest_substitute.similarity_score,
        reasoning: isOptimal ? 
            `Correct: ${chosen} is the most similar substitute (score: ${analysis.closest_substitute.similarity_score.toFixed(3)})` :
            `Suboptimal: ${selectedSubstitute} would be more similar (score: ${analysis.closest_substitute.similarity_score.toFixed(3)})`,
        alternative_ranking: analysis.closest_substitute.ranking,
        paribhasha_compliance: isOptimal ? 'compliant' : 'non_compliant'
    };
}
