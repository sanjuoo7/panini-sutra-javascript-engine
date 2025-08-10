/**
 * Sutra 1.1.36: विदेह विकरणा अकर्मकाः
 * Translation: "Verbs without vikaraṇa are intransitive"
 * 
 * This sutra establishes that verbs which lack vikaraṇa (thematic suffixes)
 * are generally intransitive and do not take direct objects.
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';
const { 
    avikaranaTransitiveExceptions, 
    intransitivityContexts, 
    vikaranaPatterns, 
    avikaranaInflectionPatterns, 
    avikaranaRootMappings,
    avikaranaVerbs: avikaranaVerbsData,
    vikaranaIndicators: vikaranaIndicatorsData
} = SanskritWordLists;

/**
 * Main function to apply Sutra 1.1.36
 * @param {string} verb - The verb to analyze
 * @param {Object} context - Context with grammatical information
 * @returns {Object} Analysis result with intransitivity information
 */
function applySutra1_1_36(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            applies: false,
            has_vikarana: null,
            is_intransitive: false,
            reason: 'Invalid input: verb must be a non-empty string'
        };
    }

    // Analyze vikaraṇa presence
    const vikarana_analysis = analyzeVikaranaPresence(verb, context);
    
    if (vikarana_analysis.has_vikarana) {
        return {
            applies: false,
            has_vikarana: true,
            is_intransitive: false,
            reason: 'Verb has vikaraṇa, so Sutra 1.1.36 does not apply',
            vikarana_type: vikarana_analysis.vikarana_type,
            verb_class: vikarana_analysis.verb_class
        };
    }

    // Analyze intransitivity context
    const intransitivity_analysis = analyzeIntransitivityContext(verb, context);
    
    return {
        applies: true,
        has_vikarana: false,
        is_intransitive: true,
        verb_type: 'avikarana',
        root: vikarana_analysis.root,
        meaning: vikarana_analysis.meaning,
        intransitivity_type: intransitivity_analysis.intransitivity_type,
        cannot_take_object: true,
        context_type: intransitivity_analysis.context_type,
        examples: vikarana_analysis.examples
    };
}

/**
 * Analyzes the presence or absence of vikaraṇa in verbs
 * @param {string} verb - Verb to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Analysis of vikaraṇa presence
 */
function analyzeVikaranaPresence(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            has_vikarana: null,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit vikaraṇa information
    if (context && context.has_vikarana !== undefined) {
        return {
            has_vikarana: context.has_vikarana,
            source: 'context',
            verb_class: context.verb_class || 'unspecified'
        };
    }

    // Avikaraṇa verbs (Class II and Class III primarily) - using shared constants
    const avikarana_verbs = avikaranaVerbsData;

    // Verbs with vikaraṇa (Classes I, IV, VI, X) - using shared constants
    const vikarana_indicators = vikaranaIndicatorsData;

    // Normalize verb for lookup
    const normalized_verb = verb.toLowerCase();
    
    // Check if verb is avikaraṇa or inflected form
    if (avikarana_verbs[normalized_verb]) {
        const verb_info = avikarana_verbs[normalized_verb];
        return {
            has_vikarana: false,
            root: verb_info.root || normalized_verb,
            inflected_form: verb_info.root ? normalized_verb : undefined,
            form_type: verb_info.form_type,
            meaning: verb_info.meaning,
            forms: verb_info.forms,
            examples: verb_info.examples,
            verb_class: verb_info.class,
            transitivity: verb_info.transitivity,
            source: verb_info.root ? 'inflected_form_list' : 'avikarana_list'
        };
    }
    
    // Check if verb has vikaraṇa
    if (vikarana_indicators[normalized_verb]) {
        const verb_info = vikarana_indicators[normalized_verb];
        return {
            has_vikarana: true,
            vikarana_type: verb_info.vikarana,
            root: normalized_verb,
            forms: verb_info.forms,
            verb_class: verb_info.class,
            transitivity: verb_info.transitivity,
            source: 'vikarana_list'
        };
    }

    // Pattern-based analysis for inflected forms using shared constants
    const avikarana_patterns = avikaranaInflectionPatterns;

    for (const pattern_info of avikarana_patterns) {
        if (pattern_info.pattern.test(normalized_verb)) {
            const potential_root = pattern_info.extraction(normalized_verb);
            
            // Special mappings for irregular forms using shared constants
            const root_mappings = avikaranaRootMappings;
            
            const mapped_root = root_mappings[potential_root] || potential_root;
            
            if (avikarana_verbs[mapped_root]) {
                return {
                    has_vikarana: false,
                    root: mapped_root,
                    inflected_form: normalized_verb,
                    form_type: pattern_info.type,
                    meaning: avikarana_verbs[mapped_root].meaning,
                    examples: avikarana_verbs[mapped_root].examples,
                    verb_class: avikarana_verbs[mapped_root].class,
                    transitivity: avikarana_verbs[mapped_root].transitivity,
                    source: 'avikarana_inflection_analysis'
                };
            }
        }
    }

    // If not found in specific lists, check for vikaraṇa patterns in the verb using shared constants
    const vikarana_patterns = vikaranaPatterns;

    for (const pattern of vikarana_patterns) {
        if (pattern.test(normalized_verb)) {
            return {
                has_vikarana: true,
                vikarana_detected: true,
                inflected_form: normalized_verb,
                source: 'pattern_analysis',
                reason: 'Verb form suggests presence of vikaraṇa'
            };
        }
    }

    return {
        has_vikarana: null,
        source: 'analysis',
        reason: 'Unable to determine vikaraṇa presence from given form'
    };
}

/**
 * Analyzes intransitivity context for avikaraṇa verbs
 * @param {string} verb - Verb to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Intransitivity context analysis
 */
function analyzeIntransitivityContext(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            is_valid_context: false,
            reason: 'Invalid input'
        };
    }

    // Check for explicit intransitivity information in context
    if (context && context.transitivity === 'intransitive') {
        return {
            is_valid_context: true,
            intransitivity_type: 'explicit',
            context_type: 'explicit',
            source: 'context'
        };
    }

    // Analyze grammatical context for intransitivity indicators using shared constants
    const intransitivity_contexts = intransitivityContexts;

    if (context && context.grammatical_context) {
        if (intransitivity_contexts.includes(context.grammatical_context)) {
            return {
                is_valid_context: true,
                intransitivity_type: 'contextual',
                context_type: context.grammatical_context,
                source: 'grammatical_context'
            };
        }
    }

    // Default analysis for avikaraṇa verbs
    return {
        is_valid_context: true,
        intransitivity_type: 'inherent_avikarana',
        context_type: 'inherent_avikarana',
        source: 'sutra_application',
        explanation: 'Avikaraṇa verbs are typically intransitive by Sutra 1.1.36'
    };
}

/**
 * Validates the application of Sutra 1.1.36
 * @param {string} verb - Verb to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result
 */
function validateAvikaranaIntransitive(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            is_valid_application: false,
            can_be_intransitive: false,
            confidence: 0,
            explanation: 'Invalid input: verb must be a non-empty string'
        };
    }

    const sutra_result = applySutra1_1_36(verb, context);
    
    if (!sutra_result.applies) {
        return {
            is_valid_application: false,
            can_be_intransitive: false,
            confidence: 0,
            explanation: `Sutra 1.1.36 does not apply: ${sutra_result.reason}`,
            verb_analysis: sutra_result
        };
    }

    // Calculate confidence based on evidence
    let confidence = 0.6; // Base confidence for avikaraṇa verbs
    
    if (sutra_result.root && context.grammatical_context) {
        confidence += 0.2; // Higher confidence with context
    }
    
    if (sutra_result.examples && sutra_result.examples.length > 0) {
        confidence += 0.1; // Examples support the analysis
    }

    // Handle exceptions (avikaraṇa verbs that can be transitive) using shared constants
    const transitive_exceptions = avikaranaTransitiveExceptions.iast;
    if (transitive_exceptions.includes(sutra_result.root)) {
        confidence = 0.3; // Lower confidence for exceptional cases
    }
    
    // Cap confidence at 1.0
    confidence = Math.min(confidence, 1.0);

    return {
        is_valid_application: true,
        can_be_intransitive: true,
        confidence: confidence,
        usage_note: `The verb '${verb}' lacks vikaraṇa and is typically intransitive according to Sutra 1.1.36, meaning it generally does not take direct objects.`,
        grammatical_properties: {
            verb_type: 'avikaraṇa',
            has_vikarana: false,
            typical_transitivity: 'intransitive',
            can_take_object: false,
            exceptions_exist: transitive_exceptions.includes(sutra_result.root)
        },
        examples: sutra_result.examples || [],
        exceptions: transitive_exceptions.includes(sutra_result.root) ? 
            'This verb is an exception and can take direct objects in certain contexts' : null
    };
}

/**
 * Comprehensive test function for Sutra 1.1.36
 * @param {string} verb - Verb to test
 * @param {Object} context - Test context
 * @returns {Object} Comprehensive test results
 */
function testSutra1_1_36(verb, context = {}) {
    const analysis = applySutra1_1_36(verb, context);
    const validation = validateAvikaranaIntransitive(verb, context);
    
    return {
        sutra: '1.1.36 विदेह विकरणा अकर्मकाः',
        analysis: analysis,
        validation: validation,
        examples: {
            avikarana_intransitive: ['i (to go)', 'as (to be)', 'ās (to sit)', 'śī (to lie)'],
            avikarana_transitive_exceptions: ['dvis (to hate)', 'śās (to rule)', 'dā (to give)', 'hu (to offer)'],
            class_ii_adi: ['i', 'as', 'dvis', 'śās'],
            class_iii_hu: ['hu', 'dā', 'dhā', 'mā', 'hā'],
            inflected_forms: [
                'eti, ite (from i)',
                'asti, āste (from as)',
                'juhoti, juhute (from hu)',
                'dadāti, datte (from dā)'
            ]
        },
        linguistic_notes: {
            vikarana_concept: 'Vikaraṇa are thematic suffixes that appear between root and endings',
            avikarana_classes: 'Primarily Class II (adi-gaṇa) and Class III (hu-gaṇa)',
            transitivity_tendency: 'Generally intransitive, but significant exceptions exist',
            morphology: 'Direct attachment of endings to root without thematic vowel'
        },
        timestamp: new Date().toISOString()
    };
}

// Export functions for testing and use
export {
    applySutra1_1_36,
    analyzeVikaranaPresence,
    analyzeIntransitivityContext,
    validateAvikaranaIntransitive,
    testSutra1_1_36
};
