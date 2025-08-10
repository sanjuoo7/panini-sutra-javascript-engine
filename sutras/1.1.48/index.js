/**
 * Sutra 1.1.48: एच इग्घ्रस्वादेशे
 * eca igagharasavaādeśe
 * "Of ec (vowels), ik (is the substitute) when short substitute is to be made"
 * 
 * This sutra establishes that when a short vowel substitute needs to be made
 * for vowels from the ec group (e, o, ai, au), the corresponding ik vowel
 * (i, u, i, u respectively) should be used as the substitute.
 * 
 * This is a paribhasha (interpretive rule) that governs vowel substitutions
 * in various grammatical operations where shortening is required.
 */

/**
 * Main function to apply Sutra 1.1.48
 * @param {string} originalVowel - The original ec vowel (e, o, ai, au)
 * @param {Object} context - Additional context for analysis
 * @returns {Object} Analysis result showing appropriate ik substitute
 */
export function applySutra1_1_48(originalVowel, context = {}) {
    // Input validation
    if (typeof originalVowel !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: originalVowel must be a string'
        };
    }

    // Normalize input
    const normalized_vowel = originalVowel.toLowerCase().trim();

    if (normalized_vowel.length === 0) {
        return {
            applies: false,
            reason: 'Empty vowel after normalization'
        };
    }

    // Check if the vowel belongs to ec group
    const ecAnalysis = analyzeEcVowel(normalized_vowel);
    
    if (!ecAnalysis.is_ec_vowel) {
        return {
            applies: false,
            reason: `'${originalVowel}' is not an ec vowel (e, o, ai, au)`
        };
    }

    // Get the appropriate ik substitute for short substitution
    const ikSubstitute = getIkSubstitute(normalized_vowel, context);

    return {
        applies: true,
        original_vowel: originalVowel,
        normalized_vowel: normalized_vowel,
        ec_analysis: ecAnalysis,
        ik_substitute: ikSubstitute,
        substitution_type: 'short_vowel_substitution',
        grammatical_function: 'vowel_shortening',
        source: 'sutra_1_1_48'
    };
}

/**
 * Analyzes whether a vowel belongs to the ec group
 * @param {string} vowel - Vowel to analyze
 * @returns {Object} Analysis of ec vowel classification
 */
function analyzeEcVowel(vowel) {
    // ec group: e, o, ai, au (as per traditional classification)
    const ecVowels = {
        'e': { type: 'simple_guna', base: 'a+i', description: 'guna of a and i' },
        'o': { type: 'simple_guna', base: 'a+u', description: 'guna of a and u' },
        'ai': { type: 'vriddhi', base: 'a+a+i', description: 'vriddhi of i' },
        'au': { type: 'vriddhi', base: 'a+a+u', description: 'vriddhi of u' },
        'ै': { type: 'vriddhi', base: 'a+a+i', description: 'vriddhi of i (Devanagari)' },
        'ौ': { type: 'vriddhi', base: 'a+a+u', description: 'vriddhi of u (Devanagari)' },
        'े': { type: 'simple_guna', base: 'a+i', description: 'guna of a and i (Devanagari)' },
        'ो': { type: 'simple_guna', base: 'a+u', description: 'guna of a and u (Devanagari)' }
    };

    const vowelInfo = ecVowels[vowel];
    
    return {
        is_ec_vowel: vowelInfo !== undefined,
        vowel_type: vowelInfo ? vowelInfo.type : null,
        base_composition: vowelInfo ? vowelInfo.base : null,
        description: vowelInfo ? vowelInfo.description : 'Not an ec vowel',
        phonetic_class: vowelInfo ? (vowelInfo.type === 'vriddhi' ? 'vriddhi_vowel' : 'guna_vowel') : 'other'
    };
}

/**
 * Determines the appropriate ik substitute for an ec vowel
 * @param {string} ecVowel - The ec vowel requiring substitution
 * @param {Object} context - Substitution context
 * @returns {Object} Ik substitute information
 */
function getIkSubstitute(ecVowel, context = {}) {
    // Mapping from ec vowels to their ik substitutes for short substitution
    const ecToIkMapping = {
        'e': { 
            substitute: 'i', 
            type: 'simple_shortening',
            reasoning: 'e (guna) → i (original simple vowel)',
            process: 'guna_to_simple'
        },
        'o': { 
            substitute: 'u', 
            type: 'simple_shortening',
            reasoning: 'o (guna) → u (original simple vowel)',
            process: 'guna_to_simple'
        },
        'ai': { 
            substitute: 'i', 
            type: 'vriddhi_shortening',
            reasoning: 'ai (vriddhi) → i (simple vowel)',
            process: 'vriddhi_to_simple'
        },
        'au': { 
            substitute: 'u', 
            type: 'vriddhi_shortening',
            reasoning: 'au (vriddhi) → u (simple vowel)',
            process: 'vriddhi_to_simple'
        },
        'ै': { 
            substitute: 'ि', 
            type: 'vriddhi_shortening',
            reasoning: 'ै (vriddhi) → ि (simple vowel)',
            process: 'vriddhi_to_simple'
        },
        'ौ': { 
            substitute: 'ु', 
            type: 'vriddhi_shortening',
            reasoning: 'ौ (vriddhi) → ु (simple vowel)',
            process: 'vriddhi_to_simple'
        },
        'े': { 
            substitute: 'ि', 
            type: 'simple_shortening',
            reasoning: 'े (guna) → ि (simple vowel)',
            process: 'guna_to_simple'
        },
        'ो': { 
            substitute: 'ु', 
            type: 'simple_shortening',
            reasoning: 'ो (guna) → ु (simple vowel)',
            process: 'guna_to_simple'
        }
    };

    const mapping = ecToIkMapping[ecVowel];
    
    if (!mapping) {
        return {
            substitute: null,
            error: `No ik substitute defined for '${ecVowel}'`
        };
    }

    return {
        original_ec: ecVowel,
        ik_substitute: mapping.substitute,
        substitution_type: mapping.type,
        linguistic_reasoning: mapping.reasoning,
        grammatical_process: mapping.process,
        is_valid_substitution: true,
        vowel_quality_change: analyzeVowelQualityChange(ecVowel, mapping.substitute)
    };
}

/**
 * Analyzes the quality change in vowel substitution
 * @param {string} original - Original ec vowel
 * @param {string} substitute - Ik substitute
 * @returns {Object} Quality change analysis
 */
function analyzeVowelQualityChange(original, substitute) {
    const qualityAnalysis = {
        length_change: 'shortened',
        articulatory_change: null,
        phonetic_similarity: null
    };

    // Determine articulatory position change
    const articulatoryMap = {
        'e': 'front_mid', 'i': 'front_high', 'ि': 'front_high',
        'o': 'back_mid', 'u': 'back_high', 'ु': 'back_high',
        'ai': 'front_diphthong', 'ै': 'front_diphthong',
        'au': 'back_diphthong', 'ौ': 'back_diphthong',
        'े': 'front_mid', 'ो': 'back_mid'
    };

    const originalPosition = articulatoryMap[original];
    const substitutePosition = articulatoryMap[substitute];

    if (originalPosition && substitutePosition) {
        if (originalPosition.includes('front') && substitutePosition.includes('front')) {
            qualityAnalysis.articulatory_change = 'front_series_preserved';
            qualityAnalysis.phonetic_similarity = 'high';
        } else if (originalPosition.includes('back') && substitutePosition.includes('back')) {
            qualityAnalysis.articulatory_change = 'back_series_preserved';
            qualityAnalysis.phonetic_similarity = 'high';
        } else {
            qualityAnalysis.articulatory_change = 'series_change';
            qualityAnalysis.phonetic_similarity = 'medium';
        }
    }

    return qualityAnalysis;
}

/**
 * Applies ik substitution to a word containing ec vowel
 * @param {string} word - Word containing ec vowel
 * @param {string} ecVowel - The ec vowel to substitute
 * @param {Object} options - Substitution options
 * @returns {Object} Substitution result
 */
export function applyIkSubstitution(word, ecVowel, options = {}) {
    const analysis = applySutra1_1_48(ecVowel, options);
    
    if (!analysis.applies) {
        return {
            success: false,
            original_word: word,
            reason: analysis.reason
        };
    }

    const ikSubstitute = analysis.ik_substitute.ik_substitute;
    const resultWord = word.replace(new RegExp(ecVowel, 'g'), ikSubstitute);

    return {
        success: true,
        original_word: word,
        result_word: resultWord,
        substitution_details: {
            original_vowel: ecVowel,
            substitute_vowel: ikSubstitute,
            substitution_type: analysis.ik_substitute.substitution_type,
            process: analysis.ik_substitute.grammatical_process
        },
        analysis: analysis
    };
}

/**
 * Validates whether a proposed substitution follows sutra 1.1.48
 * @param {string} original - Original ec vowel
 * @param {string} proposed - Proposed substitute
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export function validateIkSubstitution(original, proposed, context = {}) {
    const analysis = applySutra1_1_48(original, context);
    
    if (!analysis.applies) {
        return {
            is_valid: false,
            reason: analysis.reason
        };
    }

    const expectedSubstitute = analysis.ik_substitute.ik_substitute;
    const isValid = proposed === expectedSubstitute;

    return {
        is_valid: isValid,
        original_vowel: original,
        proposed_substitute: proposed,
        expected_substitute: expectedSubstitute,
        reasoning: isValid ? 
            `Correct: ${original} → ${proposed} follows sutra 1.1.48` :
            `Incorrect: ${original} should become ${expectedSubstitute}, not ${proposed}`,
        sutra_compliance: isValid ? 'compliant' : 'non_compliant'
    };
}
