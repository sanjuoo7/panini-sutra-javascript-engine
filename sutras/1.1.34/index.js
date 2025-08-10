/**
 * Sutra 1.1.34: सिद्धं तु निपाते प्रातिपदिकग्रहणे (siddhaṃ tu nipāte prātipadikagrahane)
 * 
 * Text: सिद्धं तु निपाते प्रातिपदिकग्रहणे
 * Translation: But in the case of nipāta (particles), the mention of prātipadika is established/valid.
 * 
 * This sutra clarifies that nipātas (indeclinable particles) can be treated as prātipadikas
 * (nominal stems) in certain grammatical contexts, even though they don't undergo declension.
 * 
 * REFACTORED: Now uses shared constants and patterns to eliminate redundancy
 */

// Import shared utilities to eliminate redundant code
import { SanskritWordLists } from '../sanskrit-utils/constants.js';

/**
 * Determines if a nipāta can be treated as prātipadika according to sutra 1.1.34
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing grammatical information
 * @returns {Object} Analysis result
 */
function applySutra1_1_34(word, context = {}) {
    const result = {
        applies: false,
        can_be_pratipadika: false,
        nipata_type: null,
        reason: '',
        sutra: '1.1.34',
        description: 'Treatment of nipātas as prātipadikas in specific contexts'
    };

    // Input validation
    if (!word || typeof word !== 'string') {
        result.reason = 'Invalid input - word must be a non-empty string';
        return result;
    }

    // Check if word is a nipāta (particle)
    const nipata_analysis = analyzeNipata(word, context);
    
    if (!nipata_analysis.is_nipata) {
        result.reason = 'Word is not a nipāta (indeclinable particle)';
        return result;
    }

    // Check if the context allows prātipadika treatment
    const pratipadika_context = analyzepratipadikaContext(word, context);
    
    if (!pratipadika_context.allows_pratipadika_treatment) {
        result.reason = `Nipāta '${word}' cannot be treated as prātipadika in this context`;
        return result;
    }

    result.applies = true;
    result.can_be_pratipadika = true;
    result.nipata_type = nipata_analysis.nipata_type;
    result.context_type = pratipadika_context.context_type;
    result.reason = `Nipāta '${word}' (${nipata_analysis.nipata_type}) can be treated as prātipadika in ${pratipadika_context.context_type} context`;

    return result;
}

/**
 * Analyzes if a word is a nipāta (indeclinable particle)
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with grammatical information
 * @returns {Object} Nipāta analysis
 */
function analyzeNipata(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_nipata: false,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit nipāta information
    if (context && context.word_type === 'nipata') {
        return {
            is_nipata: true,
            nipata_type: context.nipata_type || 'general',
            source: 'context'
        };
    }

    // Check if word is a known nipāta using shared constants
    const normalized_word = word.toLowerCase();
    const nipata_words = SanskritWordLists.nipataWords;
    if (nipata_words[normalized_word]) {
        return {
            is_nipata: true,
            nipata_type: nipata_words[normalized_word].type,
            meaning: nipata_words[normalized_word].meaning,
            source: 'word_list'
        };
    }

    // Pattern-based analysis for certain nipāta formations using shared constants
    const nipata_patterns = SanskritWordLists.nipataSemanticPatterns;

    // List of common words that might match patterns but are not nipātas using shared constants
    const non_nipata_exclusions = SanskritWordLists.nonNipataExclusions.iast;
    
    // Don't apply pattern matching to excluded words
    if (non_nipata_exclusions.includes(normalized_word)) {
        return {
            is_nipata: false,
            nipata_type: null,
            source: 'exclusion_list'
        };
    }

    for (const pattern_info of nipata_patterns) {
        if (pattern_info.pattern.test(normalized_word)) {
            return {
                is_nipata: true,
                nipata_type: pattern_info.type,
                meaning: pattern_info.meaning,
                source: 'pattern_matching'
            };
        }
    }

    return {
        is_nipata: false,
        nipata_type: null,
        source: 'analysis'
    };
}

/**
 * Analyzes if the context allows prātipadika treatment
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with grammatical information
 * @returns {Object} Prātipadika context analysis
 */
function analyzepratipadikaContext(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            allows_pratipadika_treatment: false,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit prātipadika permission
    if (context && context.allows_pratipadika === true) {
        return {
            allows_pratipadika_treatment: true,
            context_type: context.context_type || 'specified',
            source: 'context'
        };
    }

    // Contexts where nipātas can be treated as prātipadikas
    const valid_contexts = [
        'compound_formation',    // In compound words
        'derivational_process',  // During word derivation
        'grammatical_analysis',  // For grammatical categorization
        'semantic_grouping',     // For semantic classification
        'morphological_study'    // For morphological analysis
    ];

    // Check if current context is valid
    if (context.grammatical_context && valid_contexts.includes(context.grammatical_context)) {
        return {
            allows_pratipadika_treatment: true,
            context_type: context.grammatical_context,
            source: 'grammatical_rules'
        };
    }

    // Default contexts where this sutra commonly applies
    const default_contexts = ['educational', 'linguistic_analysis'];
    
    if (!context.grammatical_context || default_contexts.includes(context.grammatical_context)) {
        return {
            allows_pratipadika_treatment: true,
            context_type: 'general_linguistic',
            source: 'default_application'
        };
    }

    return {
        allows_pratipadika_treatment: false,
        context_type: null,
        reason: 'Context does not permit prātipadika treatment',
        source: 'analysis'
    };
}

/**
 * Validates the application of sutra 1.1.34
 * @param {string} word - Word to validate
 * @param {Object} context - Context with validation information
 * @returns {Object} Validation result
 */
function validateNipatapratipadika(word, context = {}) {
    const analysis = applySutra1_1_34(word, context);
    const nipata_analysis = analyzeNipata(word, context);
    
    // Calculate confidence based on analysis results
    let confidence = 0.5;
    if (analysis.applies) {
        confidence = 0.8;
        if (nipata_analysis.source === 'word_list') confidence = 0.9;
        if (nipata_analysis.source === 'context') confidence = 0.95;
    }

    // Generate usage note
    let usage_note = '';
    if (analysis.applies) {
        usage_note = `The nipāta '${word}' (${analysis.nipata_type}) can function as a prātipadika in ${analysis.context_type} contexts. `;
        usage_note += `This allows it to participate in grammatical processes typically reserved for nominal stems.`;
    }

    return {
        can_be_pratipadika: analysis.can_be_pratipadika,
        is_valid_application: analysis.applies,
        nipata_type: analysis.nipata_type,
        context_type: analysis.context_type,
        confidence: confidence,
        usage_note: usage_note,
        explanation: analysis.applies ? 
            'Nipāta can be treated as prātipadika in appropriate contexts per sutra 1.1.34' :
            'Word does not qualify for prātipadika treatment under this sutra'
    };
}

/**
 * Comprehensive test for sutra 1.1.34
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_34(word, context = {}) {
    const analysis = applySutra1_1_34(word, context);
    const validation = validateNipatapratipadika(word, context);
    
    // Provide example nipātas for educational purposes
    const examples = {
        coordinating: ['ca', 'va', 'api', 'tu'],
        emphatic: ['eva', 'hi', 'khalu', 'nūnam'],
        negative: ['na', 'mā', 'no'],
        temporal: ['tadā', 'yadā', 'sarvadā'],
        locative: ['yatra', 'tatra', 'sarvatra'],
        manner: ['tathā', 'yathā', 'kathāñcit'],
        directional: ['ūrdhvatas', 'adhastāt', 'paritas']
    };
    
    return {
        word,
        sutra: '1.1.34',
        analysis,
        validation,
        examples,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_34,
    analyzeNipata,
    analyzepratipadikaContext,
    validateNipatapratipadika,
    testSutra1_1_34
};
