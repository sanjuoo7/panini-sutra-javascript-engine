/**
 * Similarity Analysis Utilities
 * 
 * This module provides functions for analyzing phonetic, articulatory, 
 * grammatical, and positional similarity between Sanskrit elements.
 * Used primarily for implementing Sutra 1.1.50 (स्थानेऽन्तरतमः).
 * 
 * Created: August 10, 2025
 */

import { isVowel, isConsonant } from './classification.js';

// ==================== PHONETIC SIMILARITY ====================

/**
 * Enhanced phonetic features mapping for Sanskrit phonemes
 */
export const PHONETIC_FEATURES = {
    // Vowels with detailed features
    'अ': ['vowel', 'short', 'central', 'low', 'a_quality'],
    'आ': ['vowel', 'long', 'central', 'low', 'a_quality'],
    'इ': ['vowel', 'short', 'front', 'high', 'i_quality'],
    'ई': ['vowel', 'long', 'front', 'high', 'i_quality'],
    'उ': ['vowel', 'short', 'back', 'high', 'u_quality'],
    'ऊ': ['vowel', 'long', 'back', 'high', 'u_quality'],
    'ए': ['vowel', 'long', 'front', 'mid', 'e_quality'],
    'ओ': ['vowel', 'long', 'back', 'mid', 'o_quality'],
    
    // Consonants - stops
    'क': ['consonant', 'stop', 'voiceless', 'velar'],
    'ग': ['consonant', 'stop', 'voiced', 'velar'],
    'च': ['consonant', 'stop', 'voiceless', 'palatal'],
    'ज': ['consonant', 'stop', 'voiced', 'palatal'],
    'त': ['consonant', 'stop', 'voiceless', 'dental'],
    'द': ['consonant', 'stop', 'voiced', 'dental'],
    'प': ['consonant', 'stop', 'voiceless', 'labial'],
    'ब': ['consonant', 'stop', 'voiced', 'labial'],
    
    // Nasals
    'न': ['consonant', 'nasal', 'voiced', 'dental'],
    'म': ['consonant', 'nasal', 'voiced', 'labial'],
    
    // Liquids
    'र': ['consonant', 'liquid', 'voiced', 'dental'],
    'ल': ['consonant', 'liquid', 'voiced', 'dental']
};

/**
 * Calculates phonetic similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @returns {Object} Phonetic similarity analysis
 */
export function calculatePhoneticSimilarity(original, substitute) {
    const originalFeatures = PHONETIC_FEATURES[original] || ['unknown'];
    const substituteFeatures = PHONETIC_FEATURES[substitute] || ['unknown'];

    // Calculate feature overlap with special weight for vowel quality
    const commonFeatures = originalFeatures.filter(f => substituteFeatures.includes(f));
    let score = 0;
    
    // Special bonus for exact vowel quality match (इ-ई, उ-ऊ, अ-आ)
    const vowelQualityMatch = commonFeatures.some(f => f.endsWith('_quality'));
    if (vowelQualityMatch) {
        score += 0.6; // Strong bonus for same vowel quality
    }
    
    // General feature overlap score
    const maxFeatures = Math.max(originalFeatures.length, substituteFeatures.length);
    if (maxFeatures > 0) {
        score += (commonFeatures.length / maxFeatures) * 0.4;
    }

    return {
        score: Math.min(score, 1.0),
        original_features: originalFeatures,
        substitute_features: substituteFeatures,
        common_features: commonFeatures,
        feature_overlap: `${commonFeatures.length}/${maxFeatures}`,
        vowel_quality_match: vowelQualityMatch
    };
}

// ==================== ARTICULATORY SIMILARITY ====================

/**
 * Place of articulation mapping for Sanskrit consonants
 */
export const ARTICULATION_PLACES = {
    'क': 'velar', 'ख': 'velar', 'ग': 'velar', 'घ': 'velar', 'ङ': 'velar',
    'च': 'palatal', 'छ': 'palatal', 'ज': 'palatal', 'झ': 'palatal', 'ञ': 'palatal',
    'ट': 'retroflex', 'ठ': 'retroflex', 'ड': 'retroflex', 'ढ': 'retroflex', 'ण': 'retroflex',
    'त': 'dental', 'थ': 'dental', 'द': 'dental', 'ध': 'dental', 'न': 'dental',
    'प': 'labial', 'फ': 'labial', 'ब': 'labial', 'भ': 'labial', 'म': 'labial',
    'य': 'palatal', 'र': 'dental', 'ल': 'dental', 'व': 'labial',
    'श': 'palatal', 'ष': 'retroflex', 'स': 'dental', 'ह': 'glottal'
};

/**
 * Calculates articulatory similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @returns {Object} Articulatory similarity analysis
 */
export function calculateArticulatorySimilarity(original, substitute) {
    const originalPlace = ARTICULATION_PLACES[original];
    const substitutePlace = ARTICULATION_PLACES[substitute];

    let score = 0;
    let similarity_type = 'no_match';

    if (originalPlace && substitutePlace) {
        if (originalPlace === substitutePlace) {
            score = 1.0;
            similarity_type = 'same_place';
        } else {
            // Adjacent places get partial similarity
            const placeOrder = ['labial', 'dental', 'retroflex', 'palatal', 'velar', 'glottal'];
            const originalIndex = placeOrder.indexOf(originalPlace);
            const substituteIndex = placeOrder.indexOf(substitutePlace);
            
            if (originalIndex !== -1 && substituteIndex !== -1) {
                const distance = Math.abs(originalIndex - substituteIndex);
                score = Math.max(0, 1 - (distance * 0.2));
                similarity_type = distance === 1 ? 'adjacent_place' : 'distant_place';
            }
        }
    }

    return {
        score: score,
        original_place: originalPlace || 'unknown',
        substitute_place: substitutePlace || 'unknown',
        similarity_type: similarity_type,
        articulatory_distance: originalPlace && substitutePlace ? 
            Math.abs((ARTICULATION_PLACES[original] || '').length - (ARTICULATION_PLACES[substitute] || '').length) : 'unknown'
    };
}

// ==================== GRAMMATICAL SIMILARITY ====================

/**
 * Gets the length of a vowel (short/long)
 * @param {string} vowel - Vowel to analyze
 * @returns {string} 'short' or 'long'
 */
export function getVowelLength(vowel) {
    const longVowels = 'आईऊएओ';
    return longVowels.includes(vowel) ? 'long' : 'short';
}

/**
 * Gets the type of a consonant
 * @param {string} consonant - Consonant to analyze
 * @returns {string} Consonant type
 */
export function getConsonantType(consonant) {
    const stops = 'कगचजटडतदपब';
    const nasals = 'ङञणनम';
    const liquids = 'रल';
    const fricatives = 'शषसह';
    
    if (stops.includes(consonant)) return 'stop';
    if (nasals.includes(consonant)) return 'nasal';
    if (liquids.includes(consonant)) return 'liquid';
    if (fricatives.includes(consonant)) return 'fricative';
    return 'other';
}

/**
 * Gets the grammatical type of an element
 * @param {string} element - Element to analyze
 * @returns {string} 'vowel', 'consonant', or 'other'
 */
export function getElementGrammaticalType(element) {
    if (isVowel(element)) return 'vowel';
    if (isConsonant(element)) return 'consonant';
    return 'other';
}

/**
 * Calculates grammatical similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @param {Object} context - Grammatical context
 * @returns {Object} Grammatical similarity analysis
 */
export function calculateGrammaticalSimilarity(original, substitute, context = {}) {
    let score = 0.5; // Default neutral similarity
    const similarities = [];

    // Vowel length similarity
    if (isVowel(original) && isVowel(substitute)) {
        const originalLength = getVowelLength(original);
        const substituteLength = getVowelLength(substitute);
        
        if (originalLength === substituteLength) {
            score += 0.3;
            similarities.push('same_vowel_length');
        }
    }

    // Consonant type similarity
    if (isConsonant(original) && isConsonant(substitute)) {
        const originalType = getConsonantType(original);
        const substituteType = getConsonantType(substitute);
        
        if (originalType === substituteType) {
            score += 0.3;
            similarities.push('same_consonant_type');
        }
    }

    // Grammatical function similarity from context
    if (context.grammatical_function) {
        if (context.preferred_substitute_type) {
            const substituteType = getElementGrammaticalType(substitute);
            if (substituteType === context.preferred_substitute_type) {
                score += 0.2;
                similarities.push('preferred_grammatical_type');
            }
        }
    }

    return {
        score: Math.min(score, 1.0),
        similarities: similarities,
        vowel_analysis: isVowel(original) && isVowel(substitute) ? {
            original_length: getVowelLength(original),
            substitute_length: getVowelLength(substitute)
        } : null,
        consonant_analysis: isConsonant(original) && isConsonant(substitute) ? {
            original_type: getConsonantType(original),
            substitute_type: getConsonantType(substitute)
        } : null
    };
}

// ==================== POSITIONAL SIMILARITY ====================

/**
 * Gets position favorability for a substitute in a given position
 * @param {string} substitute - Substitute element
 * @param {string} position - Position ('initial', 'medial', 'final')
 * @returns {number} Favorability score (0-1)
 */
export function getPositionFavorability(substitute, position) {
    // Simple heuristic - some sounds are more favorable in certain positions
    const positionPreferences = {
        'initial': { 'अ': 0.8, 'क': 0.7, 'प': 0.6 },
        'medial': { 'र': 0.8, 'न': 0.7, 'म': 0.6 },
        'final': { 'त': 0.8, 'न': 0.7, 'म': 0.7 }
    };
    
    return positionPreferences[position]?.[substitute] || 0.5;
}

/**
 * Calculates environment similarity for a substitute
 * @param {string} substitute - Substitute element
 * @param {Object} context - Environment context
 * @returns {number} Environment compatibility score (0-1)
 */
export function calculateEnvironmentSimilarity(substitute, context) {
    // Simple environment compatibility check
    let score = 0.5;
    
    // Avoid certain combinations that are phonetically difficult
    if (context.preceding_sound === 'त' && substitute === 'त') {
        score -= 0.2; // Avoid gemination unless specifically required
    }
    
    return Math.max(0, Math.min(1, score));
}

/**
 * Calculates positional similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @param {Object} context - Positional context
 * @returns {Object} Positional similarity analysis
 */
export function calculatePositionalSimilarity(original, substitute, context = {}) {
    let score = 0.5; // Default neutral similarity
    const factors = [];

    // Position in word
    if (context.position) {
        const positionFavorability = getPositionFavorability(substitute, context.position);
        score += positionFavorability * 0.3;
        factors.push(`position_${context.position}`);
    }

    // Context environment
    if (context.preceding_sound || context.following_sound) {
        const environmentScore = calculateEnvironmentSimilarity(substitute, context);
        score += environmentScore * 0.2;
        factors.push('environment_compatibility');
    }

    return {
        score: Math.min(score, 1.0),
        influencing_factors: factors,
        position_context: context.position || 'unspecified',
        environment_analysis: {
            preceding: context.preceding_sound || null,
            following: context.following_sound || null
        }
    };
}

// ==================== COMBINED SIMILARITY ANALYSIS ====================

/**
 * Analyzes similarity between original element and possible substitutes
 * @param {string} original - Original element
 * @param {Array} substitutes - Array of substitute candidates
 * @param {Object} context - Analysis context
 * @returns {Array} Similarity analysis for each substitute
 */
export function analyzeSimilarity(original, substitutes, context = {}) {
    return substitutes.map(substitute => {
        if (typeof substitute !== 'string') {
            return {
                substitute: substitute,
                similarity_score: 0,
                error: 'Invalid substitute type'
            };
        }

        const phoneticSimilarity = calculatePhoneticSimilarity(original, substitute);
        const articulatorySimilarity = calculateArticulatorySimilarity(original, substitute);
        const grammaticalSimilarity = calculateGrammaticalSimilarity(original, substitute, context);
        const positionalSimilarity = calculatePositionalSimilarity(original, substitute, context);

        const overallScore = (
            phoneticSimilarity.score * 0.3 +
            articulatorySimilarity.score * 0.3 +
            grammaticalSimilarity.score * 0.2 +
            positionalSimilarity.score * 0.2
        );

        return {
            substitute: substitute,
            similarity_score: overallScore,
            phonetic_similarity: phoneticSimilarity,
            articulatory_similarity: articulatorySimilarity,
            grammatical_similarity: grammaticalSimilarity,
            positional_similarity: positionalSimilarity,
            analysis_complete: true
        };
    });
}

/**
 * Finds the substitute with the highest similarity score
 * @param {Array} similarityAnalysis - Array of similarity analyses
 * @param {Object} context - Selection context
 * @returns {Object} Closest substitute information
 */
export function findClosestSubstitute(similarityAnalysis, context = {}) {
    if (similarityAnalysis.length === 0) {
        return {
            substitute: null,
            error: 'No substitutes to analyze'
        };
    }

    // Filter out invalid substitutes
    const validSubstitutes = similarityAnalysis.filter(s => !s.error);
    
    if (validSubstitutes.length === 0) {
        return {
            substitute: null,
            error: 'No valid substitutes found'
        };
    }

    // Find the substitute with the highest similarity score
    const closest = validSubstitutes.reduce((best, current) => 
        current.similarity_score > best.similarity_score ? current : best
    );

    return {
        selected_substitute: closest.substitute,
        similarity_score: closest.similarity_score,
        selection_reasoning: `Highest similarity score (${closest.similarity_score.toFixed(3)})`,
        detailed_analysis: closest,
        ranking: validSubstitutes
            .sort((a, b) => b.similarity_score - a.similarity_score)
            .map((s, index) => ({
                rank: index + 1,
                substitute: s.substitute,
                score: s.similarity_score.toFixed(3)
            }))
    };
}
