/**
 * Sutra 1.1.35: कृण्वादयः कर्मकाः
 * Translation: "Kṛṇvādi verbs are transitive"
 * 
 * This sutra establishes that verbs in the kṛṇvādi gaṇa (Class V verbs)
 * are inherently transitive and take direct objects.
 * 
 * REFACTORED: Now uses shared constants to eliminate redundant verb data
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';
const { 
    krinvadiVerbs: krinvadiVerbsData,
    krinvadiTransitivityContexts,
    krinvadiInflectionPatterns,
    krinvadiRootMappings
} = SanskritWordLists;

/**
 * Main function to apply Sutra 1.1.35
 * @param {string} verb - The verb to analyze
 * @param {Object} context - Context with grammatical information
 * @returns {Object} Analysis result with transitivity information
 */
function applySutra1_1_35(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            applies: false,
            is_krinvadi: false,
            is_transitive: false,
            reason: 'Invalid input: verb must be a non-empty string'
        };
    }

    // Analyze krinvadi verb classification using shared constants
    const krinvadi_analysis = analyzeKrinvadiVerb(verb, context);
    
    if (!krinvadi_analysis.is_krinvadi) {
        return {
            applies: false,
            is_krinvadi: false,
            is_transitive: false,
            reason: 'Verb is not from kṛṇvādi gaṇa (Class V)',
            verb_class: 'Not kṛṇvādi'
        };
    }

    // Analyze transitivity context
    const transitivity_analysis = analyzeTransitivityContext(verb, context);
    
    return {
        applies: true,
        is_krinvadi: true,
        is_transitive: true,
        verb_class: 'Class V (kṛṇvādi)',
        root: krinvadi_analysis.root,
        meaning: krinvadi_analysis.meaning,
        transitivity_type: 'transitive',
        can_take_object: true,
        context_type: transitivity_analysis.context_type,
        examples: krinvadi_analysis.examples,
        forms: krinvadi_analysis.forms
    };
}

/**
 * Analyzes if a verb belongs to kṛṇvādi gaṇa (Class V)
 * @param {string} verb - Verb to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Analysis of kṛṇvādi classification
 */
function analyzeKrinvadiVerb(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            is_krinvadi: false,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit krinvadi information
    if (context && (context.verb_class === 'krinvadi' || context.verb_class === 'Class V')) {
        return {
            is_krinvadi: true,
            source: 'context',
            verb_class: 'Class V (kṛṇvādi)'
        };
    }

    // Normalize verb for lookup
    const normalized_verb = verb.toLowerCase();
    
    // Check if verb is in krinvadi dictionary - using shared constants
    const krinvadi_verbs = krinvadiVerbsData;
    
    if (krinvadi_verbs[normalized_verb]) {
        const verb_info = krinvadi_verbs[normalized_verb];
        return {
            is_krinvadi: true,
            root: verb_info.root || normalized_verb,
            inflected_form: verb_info.root ? normalized_verb : normalized_verb,
            form_type: verb_info.form_type,
            meaning: verb_info.meaning,
            forms: verb_info.forms,
            examples: verb_info.examples,
            verb_class: verb_info.class,
            transitivity: verb_info.transitivity,
            source: verb_info.root ? 'inflected_form_list' : 'krinvadi_list'
        };
    }

    // Pattern-based analysis for inflected forms using shared constants
    const krinvadi_patterns = krinvadiInflectionPatterns;

    for (const pattern_info of krinvadi_patterns) {
        if (pattern_info.pattern.test(normalized_verb)) {
            const potential_root = pattern_info.extraction(normalized_verb);
            
            // Special mappings for irregular forms using shared constants
            const root_mappings = krinvadiRootMappings;
            
            const mapped_root = root_mappings[potential_root] || potential_root;
            
            if (krinvadi_verbs[mapped_root]) {
                return {
                    is_krinvadi: true,
                    root: mapped_root,
                    inflected_form: normalized_verb,
                    form_type: pattern_info.type,
                    meaning: krinvadi_verbs[mapped_root].meaning,
                    examples: krinvadi_verbs[mapped_root].examples,
                    verb_class: krinvadi_verbs[mapped_root].class,
                    transitivity: krinvadi_verbs[mapped_root].transitivity,
                    source: 'krinvadi_inflection_analysis'
                };
            }
        }
    }

    return {
        is_krinvadi: false,
        source: 'analysis',
        reason: 'Verb not found in kṛṇvādi gaṇa'
    };
}

/**
 * Analyzes transitivity context for kṛṇvādi verbs
 * @param {string} verb - Verb to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Transitivity context analysis
 */
function analyzeTransitivityContext(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            is_valid_context: false,
            reason: 'Invalid input'
        };
    }

    // Check for explicit transitivity information in context
    if (context && context.transitivity === 'transitive') {
        return {
            is_valid_context: true,
            transitivity_type: 'transitive',
            context_type: 'explicit',
            source: 'context'
        };
    }

    // Analyze grammatical context for transitivity indicators using shared constants
    const transitivity_contexts = krinvadiTransitivityContexts;

    if (context && context.grammatical_context) {
        if (transitivity_contexts.includes(context.grammatical_context)) {
            return {
                is_valid_context: true,
                transitivity_type: 'transitive',
                context_type: context.grammatical_context,
                source: 'grammatical_context'
            };
        }
    }

    // Default analysis for krinvadi verbs
    return {
        is_valid_context: true,
        transitivity_type: 'transitive',
        context_type: 'inherent_krinvadi',
        source: 'sutra_application',
        explanation: 'Kṛṇvādi verbs are inherently transitive by Sutra 1.1.35'
    };
}

/**
 * Validates the application of Sutra 1.1.35
 * @param {string} verb - Verb to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result
 */
function validateKrinvadiTransitive(verb, context = {}) {
    // Input validation
    if (!verb || typeof verb !== 'string') {
        return {
            is_valid_application: false,
            can_be_transitive: false,
            confidence: 0,
            explanation: 'Invalid input: verb must be a non-empty string'
        };
    }

    const sutra_result = applySutra1_1_35(verb, context);
    
    if (!sutra_result.applies) {
        return {
            is_valid_application: false,
            can_be_transitive: false,
            confidence: 0,
            explanation: `Sutra 1.1.35 does not apply: ${sutra_result.reason}`,
            verb_analysis: sutra_result
        };
    }

    // Calculate confidence based on evidence
    let confidence = 0.9; // High confidence for krinvadi verbs
    
    if (sutra_result.root && context.grammatical_context) {
        confidence += 0.05; // Slightly higher confidence with context
    }
    
    if (sutra_result.examples && sutra_result.examples.length > 0) {
        confidence += 0.05; // Examples support the analysis
    }
    
    // Cap confidence at 1.0
    confidence = Math.min(confidence, 1.0);

    return {
        is_valid_application: true,
        can_be_transitive: true,
        confidence: confidence,
        usage_note: `The verb '${verb}' belongs to kṛṇvādi gaṇa (Class V) and is inherently transitive according to Sutra 1.1.35, meaning it typically takes direct objects.`,
        grammatical_properties: {
            verb_class: 'Class V (kṛṇvādi)',
            transitivity: 'transitive',
            can_take_object: true,
            voice_options: ['active', 'middle', 'passive'],
            typical_objects: 'karma (direct object in accusative case)'
        },
        examples: sutra_result.examples || [],
        forms: sutra_result.forms || []
    };
}

/**
 * Comprehensive test function for Sutra 1.1.35
 * @param {string} verb - Verb to test
 * @param {Object} context - Test context
 * @returns {Object} Comprehensive test results
 */
function testSutra1_1_35(verb, context = {}) {
    const analysis = applySutra1_1_35(verb, context);
    const validation = validateKrinvadiTransitive(verb, context);
    
    return {
        sutra: '1.1.35 कृण्वादयः कर्मकाः',
        analysis: analysis,
        validation: validation,
        examples: {
            krinvadi_roots: ['kṛ', 'śru', 'brū', 'yuj'],
            transitive_usage: ['karma karoti', 'śabdaṃ śṛṇoti', 'vākyaṃ bravīti', 'aśvān yunakti'],
            inflected_forms: [
                'karoti, kurute (from kṛ)',
                'śṛṇoti, śṛṇute (from śru)',
                'bravīti, brūte (from brū)',
                'yunakti, yuṅkte (from yuj)'
            ],
            class_v_characteristics: [
                'nasal infix (nu/nv/na/nā)',
                'inherent transitivity',
                'direct object requirement',
                'active and middle voice forms'
            ]
        },
        linguistic_notes: {
            verb_class: 'Class V verbs (kṛṇvādi gaṇa)',
            transitivity: 'Inherently transitive',
            morphology: 'Characterized by nasal infix in present stem',
            syntax: 'Requires direct object (karman) in active voice'
        },
        timestamp: new Date().toISOString()
    };
}

// Export the main functions
export { 
    applySutra1_1_35, 
    analyzeKrinvadiVerb, 
    analyzeTransitivityContext,
    validateKrinvadiTransitive,
    testSutra1_1_35
};
