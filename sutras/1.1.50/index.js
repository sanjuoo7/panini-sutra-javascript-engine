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
 * Analyzes similarity between original element and possible substitutes
 * @param {string} original - Original element
 * @param {Array} substitutes - Array of substitute candidates
 * @param {Object} context - Analysis context
 * @returns {Array} Similarity analysis for each substitute
 */
function analyzeSimilarity(original, substitutes, context = {}) {
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
 * Calculates phonetic similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @returns {Object} Phonetic similarity analysis
 */
function calculatePhoneticSimilarity(original, substitute) {
    // Enhanced phonetic features mapping with more detailed vowel analysis
    const phoneticFeatures = {
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

    const originalFeatures = phoneticFeatures[original] || ['unknown'];
    const substituteFeatures = phoneticFeatures[substitute] || ['unknown'];

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

/**
 * Calculates articulatory similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @returns {Object} Articulatory similarity analysis
 */
function calculateArticulatorySimilarity(original, substitute) {
    // Place of articulation mapping
    const articulationPlaces = {
        'क': 'velar', 'ख': 'velar', 'ग': 'velar', 'घ': 'velar', 'ङ': 'velar',
        'च': 'palatal', 'छ': 'palatal', 'ज': 'palatal', 'झ': 'palatal', 'ञ': 'palatal',
        'ट': 'retroflex', 'ठ': 'retroflex', 'ड': 'retroflex', 'ढ': 'retroflex', 'ण': 'retroflex',
        'त': 'dental', 'थ': 'dental', 'द': 'dental', 'ध': 'dental', 'न': 'dental',
        'प': 'labial', 'फ': 'labial', 'ब': 'labial', 'भ': 'labial', 'म': 'labial',
        'य': 'palatal', 'र': 'dental', 'ल': 'dental', 'व': 'labial',
        'श': 'palatal', 'ष': 'retroflex', 'स': 'dental', 'ह': 'glottal'
    };

    const originalPlace = articulationPlaces[original];
    const substitutePlace = articulationPlaces[substitute];

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
            Math.abs((articulationPlaces[original] || '').length - (articulationPlaces[substitute] || '').length) : 'unknown'
    };
}

/**
 * Calculates grammatical similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @param {Object} context - Grammatical context
 * @returns {Object} Grammatical similarity analysis
 */
function calculateGrammaticalSimilarity(original, substitute, context = {}) {
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

/**
 * Calculates positional similarity between two elements
 * @param {string} original - Original element
 * @param {string} substitute - Substitute element
 * @param {Object} context - Positional context
 * @returns {Object} Positional similarity analysis
 */
function calculatePositionalSimilarity(original, substitute, context = {}) {
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

/**
 * Finds the substitute with the highest similarity score
 * @param {Array} similarityAnalysis - Array of similarity analyses
 * @param {Object} context - Selection context
 * @returns {Object} Closest substitute information
 */
function findClosestSubstitute(similarityAnalysis, context = {}) {
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

// Helper functions

function isVowel(char) {
    return 'अआइईउऊएओ'.includes(char);
}

function isConsonant(char) {
    return !isVowel(char) && /[क-ह]/.test(char);
}

function getVowelLength(vowel) {
    const longVowels = 'आईऊएओ';
    return longVowels.includes(vowel) ? 'long' : 'short';
}

function getConsonantType(consonant) {
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

function getElementGrammaticalType(element) {
    if (isVowel(element)) return 'vowel';
    if (isConsonant(element)) return 'consonant';
    return 'other';
}

function getPositionFavorability(substitute, position) {
    // Simple heuristic - some sounds are more favorable in certain positions
    const positionPreferences = {
        'initial': { 'अ': 0.8, 'क': 0.7, 'प': 0.6 },
        'medial': { 'र': 0.8, 'न': 0.7, 'म': 0.6 },
        'final': { 'त': 0.8, 'न': 0.7, 'म': 0.7 }
    };
    
    return positionPreferences[position]?.[substitute] || 0.5;
}

function calculateEnvironmentSimilarity(substitute, context) {
    // Simple environment compatibility check
    let score = 0.5;
    
    // Avoid certain combinations that are phonetically difficult
    if (context.preceding_sound === 'त' && substitute === 'त') {
        score -= 0.2; // Avoid gemination unless specifically required
    }
    
    return Math.max(0, Math.min(1, score));
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
