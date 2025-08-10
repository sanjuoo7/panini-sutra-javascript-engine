/**
 * Sutra 1.1.35: कृण्वादयः कर्मकाः
 * Translation: "Kṛṇvādi verbs are transitive"
 * 
 * This sutra establishes that verbs in the kṛṇvādi gaṇa (Class V verbs)
 * are inherently transitive and take direct objects.
 */

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

    // Analyze if verb is from kṛṇvādi gaṇa
    const krinvadi_analysis = analyzeKrinvadiVerb(verb, context);
    
    if (!krinvadi_analysis.is_krinvadi) {
        return {
            applies: false,
            is_krinvadi: false,
            is_transitive: false,
            reason: 'Verb is not from kṛṇvādi gaṇa (Class V)',
            verb_class: krinvadi_analysis.verb_class
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
        transitivity_type: transitivity_analysis.transitivity_type,
        can_take_object: true,
        context_type: transitivity_analysis.context_type,
        examples: krinvadi_analysis.examples
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

    // Check context for explicit class information
    if (context && context.verb_class === 'Class V' || context.verb_class === 'krinvadi') {
        return {
            is_krinvadi: true,
            root: verb,
            source: 'context',
            verb_class: 'Class V (kṛṇvādi)'
        };
    }

    // Core kṛṇvādi verbs (Class V roots)
    const krinvadi_verbs = {
        // Primary kṛṇvādi roots
        'kṛ': { 
            meaning: 'to do, make', 
            forms: ['karoti', 'kurute', 'kṛṇoti'],
            examples: ['karma karoti', 'gṛhaṃ karoti']
        },
        'śru': { 
            meaning: 'to hear', 
            forms: ['śṛṇoti', 'śṛṇute'],
            examples: ['śabdaṃ śṛṇoti', 'kathāṃ śṛṇoti']
        },
        'brū': { 
            meaning: 'to speak, say', 
            forms: ['bravīti', 'brūte', 'brūva'],
            examples: ['vākyaṃ bravīti', 'satyaṃ brūte']
        },
        'sṛj': { 
            meaning: 'to create, emit', 
            forms: ['sṛjati', 'sṛjate'],
            examples: ['jagat sṛjati', 'aśru sṛjati']
        },
        'gṛh': { 
            meaning: 'to take, grasp', 
            forms: ['gṛhṇāti', 'gṛhṇīte'],
            examples: ['hastaṃ gṛhṇāti', 'pustakaṃ gṛhṇāti']
        },
        'bandh': { 
            meaning: 'to bind, tie', 
            forms: ['badhnāti', 'badhnīte'],
            examples: ['rajjuṃ badhnāti', 'granthiṃ badhnāti']
        },
        'chid': { 
            meaning: 'to cut, break', 
            forms: ['chinatti', 'chintte'],
            examples: ['vṛkṣaṃ chinatti', 'tantuṃ chinatti']
        },
        'bhid': { 
            meaning: 'to split, pierce', 
            forms: ['bhinatti', 'bhintte'],
            examples: ['bhittiṃ bhinatti', 'hṛdayaṃ bhinatti']
        },
        'yuj': { 
            meaning: 'to join, yoke', 
            forms: ['yunakti', 'yuṅkte'],
            examples: ['aśvān yunakti', 'yogaṃ yunakti']
        },
        'rudh': { 
            meaning: 'to obstruct, check', 
            forms: ['ruṇaddhi', 'rundhe'],
            examples: ['mārgaṃ ruṇaddhi', 'gamaṃ rundhe']
        },
        'vid': { 
            meaning: 'to find, obtain', 
            forms: ['vindati', 'vindate'],
            examples: ['dhanaṃ vindati', 'śāntiṃ vindati']
        },
        'spṛś': { 
            meaning: 'to touch', 
            forms: ['spṛśati', 'spṛśate'],
            examples: ['hastenā spṛśati', 'jalāṃ spṛśati']
        },
        'śaś': { 
            meaning: 'to hurt, injure', 
            forms: ['śaśati', 'śaśate'],
            examples: ['śatruṃ śaśati', 'prāṇān śaśati']
        },
        'stu': { 
            meaning: 'to praise', 
            forms: ['stauti', 'stute'],
            examples: ['devaṃ stauti', 'guruṃ stauti']
        },
        'nu': { 
            meaning: 'to praise', 
            forms: ['nauti', 'nute'],
            examples: ['īśvaraṃ nauti', 'virtūn nauti']
        },
        
        // Common inflected forms for easier recognition
        'karoti': { 
            meaning: 'does, makes', 
            forms: ['karoti'],
            examples: ['karma karoti'],
            root: 'kṛ'
        },
        'kurute': { 
            meaning: 'does, makes (middle)', 
            forms: ['kurute'],
            examples: ['svārthaṃ kurute'],
            root: 'kṛ'
        },
        'śṛṇoti': { 
            meaning: 'hears', 
            forms: ['śṛṇoti'],
            examples: ['śabdaṃ śṛṇoti'],
            root: 'śru'
        },
        'śṛṇute': { 
            meaning: 'hears (middle)', 
            forms: ['śṛṇute'],
            examples: ['kathāṃ śṛṇute'],
            root: 'śru'
        },
        'bravīti': { 
            meaning: 'speaks', 
            forms: ['bravīti'],
            examples: ['satyaṃ bravīti'],
            root: 'brū'
        },
        'brūte': { 
            meaning: 'speaks (middle)', 
            forms: ['brūte'],
            examples: ['vākyaṃ brūte'],
            root: 'brū'
        },
        'yunakti': { 
            meaning: 'joins, yokes', 
            forms: ['yunakti'],
            examples: ['aśvān yunakti'],
            root: 'yuj'
        },
        'yuṅkte': { 
            meaning: 'joins (middle)', 
            forms: ['yuṅkte'],
            examples: ['yogaṃ yuṅkte'],
            root: 'yuj'
        },
        'gṛhṇāti': { 
            meaning: 'takes, grasps', 
            forms: ['gṛhṇāti'],
            examples: ['hastaṃ gṛhṇāti'],
            root: 'gṛh'
        },
        'gṛhṇīte': { 
            meaning: 'takes (middle)', 
            forms: ['gṛhṇīte'],
            examples: ['phalaṃ gṛhṇīte'],
            root: 'gṛh'
        },
        'badhnāti': { 
            meaning: 'binds, ties', 
            forms: ['badhnāti'],
            examples: ['rajjuṃ badhnāti'],
            root: 'bandh'
        },
        'badhnīte': { 
            meaning: 'binds (middle)', 
            forms: ['badhnīte'],
            examples: ['granthiṃ badhnīte'],
            root: 'bandh'
        },
        'chinatti': { 
            meaning: 'cuts, breaks', 
            forms: ['chinatti'],
            examples: ['vṛkṣaṃ chinatti'],
            root: 'chid'
        },
        'chintte': { 
            meaning: 'cuts (middle)', 
            forms: ['chintte'],
            examples: ['tantuṃ chintte'],
            root: 'chid'
        },
        'bhinatti': { 
            meaning: 'splits, pierces', 
            forms: ['bhinatti'],
            examples: ['bhittiṃ bhinatti'],
            root: 'bhid'
        },
        'bhintte': { 
            meaning: 'splits (middle)', 
            forms: ['bhintte'],
            examples: ['hṛdayaṃ bhintte'],
            root: 'bhid'
        }
    };

    // Normalize verb for lookup
    const normalized_verb = verb.toLowerCase();
    
    // Check if verb is a known kṛṇvādi root or inflected form
    if (krinvadi_verbs[normalized_verb]) {
        const verb_info = krinvadi_verbs[normalized_verb];
        return {
            is_krinvadi: true,
            root: verb_info.root || normalized_verb,
            inflected_form: verb_info.root ? normalized_verb : undefined,
            meaning: verb_info.meaning,
            forms: verb_info.forms,
            examples: verb_info.examples,
            source: verb_info.root ? 'inflected_form_list' : 'root_list',
            verb_class: 'Class V (kṛṇvādi)'
        };
    }

    // Check for inflected forms that indicate kṛṇvādi class
    const krinvadi_patterns = [
        { pattern: /^.*oti$/, type: 'present_active_third_singular', extraction: verb => verb.replace(/oti$/, '') },
        { pattern: /^.*ute$/, type: 'present_middle_third_singular', extraction: verb => verb.replace(/ute$/, '') },
        { pattern: /^.*nāti$/, type: 'present_active_strengthened', extraction: verb => verb.replace(/nāti$/, '') },
        { pattern: /^.*nīte$/, type: 'present_middle_strengthened', extraction: verb => verb.replace(/nīte$/, '') },
        { pattern: /^.*atti$/, type: 'present_active_nasal', extraction: verb => verb.replace(/atti$/, '') },
        { pattern: /^.*tte$/, type: 'present_middle_nasal', extraction: verb => verb.replace(/tte$/, '') },
        { pattern: /^.*akti$/, type: 'present_active_yuj_type', extraction: verb => verb.replace(/akti$/, '') },
        { pattern: /^.*ṅkte$/, type: 'present_middle_yuj_type', extraction: verb => verb.replace(/ṅkte$/, '') }
    ];

    for (const pattern_info of krinvadi_patterns) {
        if (pattern_info.pattern.test(normalized_verb)) {
            // Try to extract root from inflected form
            const potential_root = pattern_info.extraction(normalized_verb);
            
            // Special mappings for irregular forms
            const root_mappings = {
                'kar': 'kṛ',
                'kur': 'kṛ',
                'śṛṇ': 'śru',
                'brav': 'brū',
                'brū': 'brū',
                'yun': 'yuj',
                'yuṅ': 'yuj',
                'gṛhṇ': 'gṛh',
                'badhn': 'bandh',
                'chin': 'chid',
                'bhin': 'bhid'
            };
            
            const mapped_root = root_mappings[potential_root] || potential_root;
            
            if (krinvadi_verbs[mapped_root]) {
                return {
                    is_krinvadi: true,
                    root: mapped_root,
                    inflected_form: normalized_verb,
                    form_type: pattern_info.type,
                    meaning: krinvadi_verbs[mapped_root].meaning,
                    examples: krinvadi_verbs[mapped_root].examples,
                    source: 'inflection_analysis',
                    verb_class: 'Class V (kṛṇvādi)'
                };
            }
        }
    }

    return {
        is_krinvadi: false,
        verb_class: 'non-kṛṇvādi',
        source: 'analysis'
    };
}

/**
 * Extracts kṛṇvādi root from inflected form
 * @param {string} inflected - Inflected verb form
 * @param {string} form_type - Type of inflection
 * @returns {string|null} Extracted root or null
 */
function extractKrinvadiRoot(inflected, form_type) {
    const extraction_rules = {
        'present_active_third_singular': verb => verb.replace(/oti$/, ''),
        'present_middle_third_singular': verb => verb.replace(/ute$/, ''),
        'present_active_strengthened': verb => verb.replace(/nāti$/, ''),
        'present_middle_strengthened': verb => verb.replace(/nīte$/, ''),
        'present_active_nasal': verb => verb.replace(/tti$/, ''),
        'present_middle_nasal': verb => verb.replace(/tte$/, ''),
        'present_active_yuj_type': verb => verb.replace(/akti$/, ''),
        'present_middle_yuj_type': verb => verb.replace(/ṅkte$/, '')
    };

    if (extraction_rules[form_type]) {
        return extraction_rules[form_type](inflected);
    }
    
    return null;
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
    if (context && context.transitivity) {
        return {
            is_valid_context: true,
            transitivity_type: context.transitivity,
            context_type: 'explicit',
            source: 'context'
        };
    }

    // Analyze grammatical context for transitivity indicators
    const transitivity_contexts = [
        'object_present',          // Direct object is present
        'causative_construction',  // Causative usage
        'passive_construction',    // Passive voice usage
        'compound_formation',      // Used in compound formation
        'derivational_process',    // Secondary derivation
        'syntactic_analysis'       // General syntactic analysis
    ];

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

    // Default analysis for kṛṇvādi verbs
    return {
        is_valid_context: true,
        transitivity_type: 'transitive',
        context_type: 'inherent_krinvadi',
        source: 'sutra_application',
        explanation: 'kṛṇvādi verbs are inherently transitive by Sutra 1.1.35'
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
    let confidence = 0.5; // Base confidence
    
    if (sutra_result.root && context.grammatical_context) {
        confidence += 0.3; // Higher confidence with context
    }
    
    if (sutra_result.examples && sutra_result.examples.length > 0) {
        confidence += 0.2; // Examples support the analysis
    }
    
    // Cap confidence at 1.0
    confidence = Math.min(confidence, 1.0);

    return {
        is_valid_application: true,
        can_be_transitive: true,
        confidence: confidence,
        usage_note: `The verb '${verb}' belongs to kṛṇvādi gaṇa (Class V) and is inherently transitive according to Sutra 1.1.35, meaning it can take direct objects.`,
        grammatical_properties: {
            verb_class: 'Class V (kṛṇvādi)',
            transitivity: 'transitive',
            can_take_object: true,
            voice_options: ['active', 'middle', 'passive']
        },
        examples: sutra_result.examples || []
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
            krinvadi_roots: ['kṛ', 'śru', 'brū', 'sṛj', 'gṛh', 'bandh', 'chid', 'bhid'],
            transitive_usage: [
                'karmaṇi karoti (does action)',
                'śabdaṃ śṛṇoti (hears sound)',
                'vākyaṃ bravīti (speaks words)',
                'jagat sṛjati (creates world)'
            ],
            inflected_forms: [
                'karoti, kurute (from kṛ)',
                'śṛṇoti, śṛṇute (from śru)',
                'bravīti, brūte (from brū)',
                'sṛjati, sṛjate (from sṛj)'
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

// Export functions for testing and use
export {
    applySutra1_1_35,
    analyzeKrinvadiVerb,
    analyzeTransitivityContext,
    validateKrinvadiTransitive,
    testSutra1_1_35
};
