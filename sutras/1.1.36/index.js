/**
 * Sutra 1.1.36: विदेह विकरणा अकर्मकाः
 * Translation: "Verbs without vikaraṇa are intransitive"
 * 
 * This sutra establishes that verbs which lack vikaraṇa (thematic suffixes)
 * are generally intransitive and do not take direct objects.
 */

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

    // Avikaraṇa verbs (Class II and Class III primarily)
    const avikarana_verbs = {
        // Class II (adi-gaṇa) - typically intransitive
        'i': { 
            meaning: 'to go', 
            forms: ['eti', 'ite'],
            examples: ['gṛhaṃ eti', 'vanaṃ eti'],
            class: 'Class II (adi)',
            transitivity: 'intransitive'
        },
        'as': { 
            meaning: 'to be, exist', 
            forms: ['asti', 'āste'],
            examples: ['sūryo asti', 'rājā āste'],
            class: 'Class II (adi)',
            transitivity: 'intransitive'
        },
        'dvis': { 
            meaning: 'to hate', 
            forms: ['dveṣṭi', 'dviṣṭe'],
            examples: ['śatruṃ dveṣṭi'],
            class: 'Class II (adi)',
            transitivity: 'transitive' // Exception
        },
        'śās': { 
            meaning: 'to rule, govern', 
            forms: ['śāsti', 'śiṣṭe'],
            examples: ['rājyaṃ śāsti'],
            class: 'Class II (adi)',
            transitivity: 'transitive' // Exception
        },
        
        // Class III (hu-gaṇa) - typically intransitive
        'hu': { 
            meaning: 'to sacrifice, offer', 
            forms: ['juhoti', 'juhute'],
            examples: ['agniṃ juhoti', 'haviṣ juhoti'],
            class: 'Class III (hu)',
            transitivity: 'transitive' // Exception - takes object
        },
        'dā': { 
            meaning: 'to give', 
            forms: ['dadāti', 'datte'],
            examples: ['dānaṃ dadāti', 'dhanaṃ datte'],
            class: 'Class III (hu)',
            transitivity: 'transitive' // Exception
        },
        'dhā': { 
            meaning: 'to place, put', 
            forms: ['dadhāti', 'dhatte'],
            examples: ['bhūmau dadhāti'],
            class: 'Class III (hu)',
            transitivity: 'transitive' // Exception
        },
        'mā': { 
            meaning: 'to measure', 
            forms: ['mimāti', 'mimate'],
            examples: ['bhūmiṃ mimāti'],
            class: 'Class III (hu)',
            transitivity: 'transitive' // Exception
        },
        'hā': { 
            meaning: 'to abandon', 
            forms: ['jahāti', 'jahīte'],
            examples: ['gṛhaṃ jahāti'],
            class: 'Class III (hu)',
            transitivity: 'transitive' // Exception
        },
        
        // Truly intransitive avikaraṇa verbs
        'ās': { 
            meaning: 'to sit', 
            forms: ['āste'],
            examples: ['āsane āste', 'vṛkṣe āste'],
            class: 'Class II (adi)',
            transitivity: 'intransitive'
        },
        'śī': { 
            meaning: 'to lie down', 
            forms: ['śete'],
            examples: ['śayyāyāṃ śete'],
            class: 'Class II (adi)',
            transitivity: 'intransitive'
        },
        'sthā': { 
            meaning: 'to stand', 
            forms: ['tiṣṭhati', 'tiṣṭhate'],
            examples: ['dvāre tiṣṭhati'],
            class: 'Class I (bhū)', // Actually has vikaraṇa 'a'
            transitivity: 'intransitive'
        },
        
        // Additional inflected forms for easier recognition
        'eti': { 
            meaning: 'goes', 
            forms: ['eti'],
            examples: ['gṛhaṃ eti'],
            root: 'i',
            class: 'Class II (adi)',
            transitivity: 'intransitive',
            form_type: 'class_ii_active'
        },
        'ite': { 
            meaning: 'goes (middle)', 
            forms: ['ite'],
            examples: ['svargaṃ ite'],
            root: 'i',
            class: 'Class II (adi)',
            transitivity: 'intransitive',
            form_type: 'class_ii_middle'
        },
        'asti': { 
            meaning: 'is, exists', 
            forms: ['asti'],
            examples: ['sūryo asti'],
            root: 'as',
            class: 'Class II (adi)',
            transitivity: 'intransitive',
            form_type: 'class_ii_active_s'
        },
        'āste': { 
            meaning: 'sits', 
            forms: ['āste'],
            examples: ['āsane āste'],
            root: 'ās',
            class: 'Class II (adi)',
            transitivity: 'intransitive',
            form_type: 'class_ii_middle'
        },
        'śete': { 
            meaning: 'lies down', 
            forms: ['śete'],
            examples: ['śayyāyāṃ śete'],
            root: 'śī',
            class: 'Class II (adi)',
            transitivity: 'intransitive',
            form_type: 'class_ii_middle'
        },
        'juhoti': { 
            meaning: 'offers, sacrifices', 
            forms: ['juhoti'],
            examples: ['agniṃ juhoti'],
            root: 'hu',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_active'
        },
        'juhute': { 
            meaning: 'offers (middle)', 
            forms: ['juhute'],
            examples: ['haviṣ juhute'],
            root: 'hu',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_middle'
        },
        'dadāti': { 
            meaning: 'gives', 
            forms: ['dadāti'],
            examples: ['dānaṃ dadāti'],
            root: 'dā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long'
        },
        'datte': { 
            meaning: 'gives (middle)', 
            forms: ['datte'],
            examples: ['dhanaṃ datte'],
            root: 'dā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long_middle'
        },
        'dadhāti': { 
            meaning: 'places, puts', 
            forms: ['dadhāti'],
            examples: ['bhūmau dadhāti'],
            root: 'dhā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long'
        },
        'dhatte': { 
            meaning: 'places (middle)', 
            forms: ['dhatte'],
            examples: ['hṛdaye dhatte'],
            root: 'dhā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long_middle'
        },
        'mimāti': { 
            meaning: 'measures', 
            forms: ['mimāti'],
            examples: ['bhūmiṃ mimāti'],
            root: 'mā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long'
        },
        'mimate': { 
            meaning: 'measures (middle)', 
            forms: ['mimate'],
            examples: ['kṣetraṃ mimate'],
            root: 'mā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long_middle'
        },
        'jahāti': { 
            meaning: 'abandons', 
            forms: ['jahāti'],
            examples: ['gṛhaṃ jahāti'],
            root: 'hā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long'
        },
        'jahīte': { 
            meaning: 'abandons (middle)', 
            forms: ['jahīte'],
            examples: ['sarvaṃ jahīte'],
            root: 'hā',
            class: 'Class III (hu)',
            transitivity: 'transitive',
            form_type: 'class_iii_long_middle'
        }
    };

    // Verbs with vikaraṇa (Classes I, IV, VI, X)
    const vikarana_indicators = {
        // Class I (bhū-gaṇa) - vikaraṇa 'a'
        'bhū': { 
            vikarana: 'a', 
            class: 'Class I (bhū)',
            forms: ['bhavati', 'bhavate'],
            transitivity: 'intransitive'
        },
        'gam': { 
            vikarana: 'a', 
            class: 'Class I (bhū)',
            forms: ['gacchati', 'gacchate'],
            transitivity: 'intransitive'
        },
        'pat': { 
            vikarana: 'a', 
            class: 'Class I (bhū)',
            forms: ['patati', 'patate'],
            transitivity: 'intransitive'
        },
        
        // Class IV (div-gaṇa) - vikaraṇa 'ya'
        'div': { 
            vikarana: 'ya', 
            class: 'Class IV (div)',
            forms: ['dīvyati', 'dīvyate'],
            transitivity: 'intransitive'
        },
        'nṛt': { 
            vikarana: 'ya', 
            class: 'Class IV (div)',
            forms: ['nṛtyati', 'nṛtyate'],
            transitivity: 'intransitive'
        },
        
        // Class VI (tud-gaṇa) - vikaraṇa 'a'
        'tud': { 
            vikarana: 'a', 
            class: 'Class VI (tud)',
            forms: ['tudati', 'tudate'],
            transitivity: 'transitive'
        },
        'kṛṣ': { 
            vikarana: 'a', 
            class: 'Class VI (tud)',
            forms: ['kṛṣati', 'kṛṣate'],
            transitivity: 'transitive'
        },
        
        // Class X (cur-gaṇa) - vikaraṇa 'aya'
        'cur': { 
            vikarana: 'aya', 
            class: 'Class X (cur)',
            forms: ['corayati', 'corayate'],
            transitivity: 'transitive'
        },
        'cint': { 
            vikarana: 'aya', 
            class: 'Class X (cur)',
            forms: ['cintayati', 'cintayate'],
            transitivity: 'transitive'
        }
    };

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

    // Pattern-based analysis for inflected forms
    const avikarana_patterns = [
        { pattern: /^.*eti$/, type: 'class_ii_active', extraction: verb => verb.replace(/eti$/, 'i') },
        { pattern: /^.*ite$/, type: 'class_ii_middle', extraction: verb => verb.replace(/ite$/, 'i') },
        { pattern: /^.*sti$/, type: 'class_ii_active_s', extraction: verb => verb.replace(/sti$/, 's') },
        { pattern: /^.*ṣṭi$/, type: 'class_ii_active_dental', extraction: verb => verb.replace(/ṣṭi$/, 's') },
        { pattern: /^.*oti$/, type: 'class_iii_active', extraction: verb => verb.replace(/oti$/, 'u') },
        { pattern: /^.*ute$/, type: 'class_iii_middle', extraction: verb => verb.replace(/ute$/, 'u') },
        { pattern: /^.*āti$/, type: 'class_iii_long', extraction: verb => verb.replace(/āti$/, 'ā') },
        { pattern: /^.*ate$/, type: 'class_iii_long_middle', extraction: verb => verb.replace(/ate$/, 'ā') }
    ];

    for (const pattern_info of avikarana_patterns) {
        if (pattern_info.pattern.test(normalized_verb)) {
            const potential_root = pattern_info.extraction(normalized_verb);
            
            // Special mappings for irregular forms
            const root_mappings = {
                'dadā': 'dā',
                'dadhā': 'dhā',
                'jahā': 'hā',
                'mimā': 'mā',
                'juho': 'hu',
                'tiṣṭha': 'sthā'
            };
            
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

    // If not found in specific lists, check for vikaraṇa patterns in the verb
    const vikarana_patterns = [
        /.*ati$/, /.*ate$/,  // Class I, VI patterns
        /.*yati$/, /.*yate$/, // Class IV patterns  
        /.*ayati$/, /.*ayate$/ // Class X patterns
    ];

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

    // Analyze grammatical context for intransitivity indicators
    const intransitivity_contexts = [
        'no_object_present',       // No direct object
        'motion_verb',             // Verbs of motion (typically intransitive)
        'state_verb',              // Verbs of state/condition
        'existence_verb',          // Verbs of existence
        'intransitive_usage',      // Explicitly intransitive usage
        'syntactic_analysis'       // General syntactic analysis
    ];

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

    // Handle exceptions (avikaraṇa verbs that can be transitive)
    const transitive_exceptions = ['dvis', 'śās', 'hu', 'dā', 'dhā', 'mā', 'hā'];
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
