/**
 * Sutra 1.1.41: अव्ययीभावश्च (avyayībhāvaśca)
 * 
 * Text: अव्ययीभावश्च
 * Translation: And अव्ययीभाव compounds are also अव्यय (indeclinables).
 * 
 * This sutra classifies अव्ययीभाव (avyayībhāva) compounds as अव्यय (indeclinable).
 * Avyayībhāva is a type of compound where:
 * - The first member is an avyaya (indeclinable)
 * - The whole compound becomes indeclinable
 * - The meaning is generally adverbial
 * 
 * Examples: अधिगङ्गम् (adhigaṅgam - near the Ganges), प्रतिदिनम् (pratidinam - daily)
 */

/**
 * Determines if a compound is an avyayībhāva and therefore avyaya according to sutra 1.1.41
 * @param {string} word - The compound word to analyze
 * @param {Object} context - Context containing compound information
 * @returns {Object} Analysis result
 */
function applySutra1_1_41(word, context = {}) {
    const result = {
        applies: false,
        avyaya_status: false,
        compound_type: null,
        first_member: null,
        reason: '',
        sutra: '1.1.41',
        description: 'Classification of avyayībhāva compounds as avyaya'
    };

    // Analyze for avyayībhāva compound characteristics
    const compound_analysis = analyzeAvyayībhāva(word, context);
    
    if (!compound_analysis.is_avyayībhāva) {
        result.reason = 'Word is not an avyayībhāva compound';
        return result;
    }

    result.applies = true;
    result.avyaya_status = true;
    result.compound_type = 'avyayībhāva';
    result.first_member = compound_analysis.first_member;
    result.reason = `Word is avyayībhāva compound with first member '${compound_analysis.first_member}' - therefore avyaya`;

    return result;
}

/**
 * Analyzes if a word is an avyayībhāva compound
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with compound information
 * @returns {Object} Compound analysis
 */
function analyzeAvyayībhāva(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_avyayībhāva: false,
            reason: 'Invalid input'
        };
    }

    // Check explicit context information
    if (context && (context.compound_type === 'avyayībhāva' || context.compound_type === 'अव्ययीभाव')) {
        return {
            is_avyayībhāva: true,
            first_member: context.first_member || extractFirstMember(word),
            source: 'context',
            confidence: 'high'
        };
    }

    // Check if context provides compound members
    if (context && context.members && Array.isArray(context.members) && context.members.length >= 2) {
        const first_member = context.members[0];
        if (isAvyayaElement(first_member, context)) {
            return {
                is_avyayībhāva: true,
                first_member: first_member,
                members: context.members,
                source: 'context_analysis',
                confidence: 'high'
            };
        }
    }

    // Pattern-based analysis for known avyayībhāva patterns
    const pattern_analysis = analyzeAvyayībhāvaPatterns(word);
    if (pattern_analysis.is_likely_avyayībhāva) {
        return {
            is_avyayībhāva: true,
            first_member: pattern_analysis.first_member,
            pattern: pattern_analysis.pattern_type,
            source: 'pattern_matching',
            confidence: pattern_analysis.confidence
        };
    }

    return {
        is_avyayībhāva: false,
        reason: 'No avyayībhāva characteristics detected'
    };
}

/**
 * Analyzes word patterns for avyayībhāva compounds
 * @param {string} word - Word to analyze
 * @returns {Object} Pattern analysis
 */
function analyzeAvyayībhāvaPatterns(word) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_likely_avyayībhāva: false,
            confidence: 'low'
        };
    }

    const word_lower = word.toLowerCase();
    
    // Check for known avyayībhāva examples first (highest confidence)
    const known_compounds = [
        'adhigaṅgam', 'pratidinam', 'prativarṣam', 'anukūlam', 'pratikūlam',
        'upanagaraṃ', 'adhipatha', 'abhimukham', 'āsamudram', 'samayas'
    ];

    if (known_compounds.includes(word_lower)) {
        return {
            is_likely_avyayībhāva: true,
            first_member: extractFirstMember(word_lower),
            pattern_type: 'known_compound',
            confidence: 'high'
        };
    }

    // Common avyayībhāva prefixes (first members that are avyaya)
    const avyaya_prefixes = [
        // Spatial/directional prefixes
        { prefix: 'adhi', meaning: 'above/over', examples: ['adhigaṅgam', 'adhipatha'] },
        { prefix: 'anu', meaning: 'after/along', examples: ['anugaṅgam', 'anuvṛkṣam'] },
        { prefix: 'apa', meaning: 'away from', examples: ['apagaṅgam'] },
        { prefix: 'abhi', meaning: 'towards/against', examples: ['abhimukham'] },
        { prefix: 'ava', meaning: 'down/away', examples: ['avagaṅgam'] },
        { prefix: 'ā', meaning: 'up to/until', examples: ['āsamudram'] },
        { prefix: 'ud', meaning: 'up/out', examples: ['udbhavam'] },
        { prefix: 'upa', meaning: 'near/towards', examples: ['upagaṅgam', 'upanagaraṃ'] },
        { prefix: 'pari', meaning: 'around', examples: ['parigṛham'] },
        { prefix: 'pra', meaning: 'forth/forward', examples: ['prabhātam'] },
        { prefix: 'prati', meaning: 'towards/each', examples: ['pratidinam', 'prativarṣam'] },
        { prefix: 'vi', meaning: 'apart/without', examples: ['vigṛham'] },
        { prefix: 'sam', meaning: 'together/with', examples: ['samayas'] },
        
        // Temporal prefixes
        { prefix: 'sadā', meaning: 'always', examples: ['sadākālam'] },
        { prefix: 'kadā', meaning: 'when', examples: ['kadācit'] },
        
        // Negation
        { prefix: 'a', meaning: 'not/without', examples: ['aśubham'] },
        { prefix: 'an', meaning: 'not/without', examples: ['anarthakam'] }
    ];

    // Sort by length (longest first) to match longer prefixes first
    avyaya_prefixes.sort((a, b) => b.prefix.length - a.prefix.length);

    for (const prefix_info of avyaya_prefixes) {
        if (word_lower.startsWith(prefix_info.prefix)) {
            const remaining = word_lower.substring(prefix_info.prefix.length);
            
            // Check if there's a substantial remaining part (likely second member)
            if (remaining.length >= 2) {
                return {
                    is_likely_avyayībhāva: true,
                    first_member: prefix_info.prefix,
                    second_member: remaining,
                    pattern_type: 'avyaya_prefix',
                    meaning: prefix_info.meaning,
                    confidence: 'medium'
                };
            }
        }
    }

    return {
        is_likely_avyayībhāva: false,
        confidence: 'low'
    };
}

/**
 * Checks if an element is an avyaya (indeclinable)
 * @param {string} element - Element to check
 * @param {Object} context - Context information
 * @returns {boolean} True if element is avyaya
 */
function isAvyayaElement(element, context = {}) {
    // Input validation
    if (!element || typeof element !== 'string') {
        return false;
    }

    // Common avyaya elements
    const common_avyayas = [
        'adhi', 'anu', 'apa', 'abhi', 'ava', 'ā', 'ud', 'upa', 'pari', 'pra', 'prati', 'vi', 'sam',
        'sadā', 'kadā', 'yāvat', 'tāvat', 'ittham', 'evam', 'kim', 'na', 'mā'
    ];

    const element_lower = element.toLowerCase();
    
    // Check against known avyayas
    if (common_avyayas.includes(element_lower)) {
        return true;
    }

    // Check context
    if (context && context.avyaya_elements && context.avyaya_elements.includes(element)) {
        return true;
    }

    // Basic patterns for avyaya
    if (element_lower.length <= 4 && /^[aeiou]/.test(element_lower)) {
        return true; // Many short elements starting with vowels are avyaya
    }

    return false;
}

/**
 * Extracts the first member from a compound word
 * @param {string} word - Compound word
 * @returns {string} Likely first member
 */
function extractFirstMember(word) {
    const word_lower = word.toLowerCase();
    
    // Try common prefixes
    const prefixes = ['adhi', 'prati', 'anu', 'apa', 'abhi', 'ava', 'upa', 'pari', 'pra', 'vi', 'sam', 'ud'];
    
    for (const prefix of prefixes) {
        if (word_lower.startsWith(prefix)) {
            return prefix;
        }
    }

    // Fallback: assume first 2-4 characters
    if (word_lower.length >= 4) {
        return word_lower.substring(0, Math.min(4, Math.floor(word_lower.length / 2)));
    }

    return word_lower;
}

/**
 * Validates if a compound correctly follows avyayībhāva rules
 * @param {string} word - Compound to validate
 * @param {Object} context - Context with compound information
 * @returns {Object} Validation result
 */
function validateAvyayībhāva1_1_41(word, context) {
    const analysis = applySutra1_1_41(word, context);
    const compound_info = analyzeAvyayībhāva(word, context);
    
    return {
        is_avyaya: analysis.avyaya_status,
        should_be_invariant: analysis.avyaya_status,
        compound_type: analysis.compound_type,
        first_member: analysis.first_member,
        structure_note: getStructureNote(compound_info),
        usage_note: getCompoundUsageNote(analysis.first_member),
        explanation: analysis.avyaya_status ? 
            `Compound with avyaya first member '${analysis.first_member}' - whole compound becomes indeclinable` :
            'Compound does not qualify as avyayībhāva'
    };
}

/**
 * Provides structural notes for the compound
 * @param {Object} compound_info - Compound analysis information
 * @returns {string} Structure note
 */
function getStructureNote(compound_info) {
    if (!compound_info.is_avyayībhāva) {
        return 'Not identified as avyayībhāva compound';
    }
    
    const notes = {
        'context': 'Structure confirmed by explicit context information',
        'context_analysis': 'First member identified as avyaya from compound member analysis',
        'pattern_matching': `Pattern-based identification with ${compound_info.confidence} confidence`
    };
    
    return notes[compound_info.source] || 'Structure analysis completed';
}

/**
 * Provides usage notes based on first member
 * @param {string} first_member - First member of compound
 * @returns {string} Usage note
 */
function getCompoundUsageNote(first_member) {
    const usage_notes = {
        'adhi': 'Indicates location above or superiority - generally spatial',
        'prati': 'Indicates repetition, opposition, or correspondence - "each/every"',
        'anu': 'Indicates following, conformity, or succession - "along/after"',
        'upa': 'Indicates proximity or approach - "near/towards"',
        'ā': 'Indicates extent or limit - "up to/until"',
        'pari': 'Indicates surrounding or encompassing - "around"',
        'vi': 'Indicates separation or distinction - "apart/differently"',
        'sam': 'Indicates union or completeness - "together/completely"'
    };
    
    return usage_notes[first_member] || 'Compound functions as indeclinable adverbial expression';
}

/**
 * Gets examples of avyayībhāva compounds
 * @param {string} prefix_type - Type of prefix
 * @returns {Array} Examples array
 */
function getCompoundExamples(prefix_type) {
    const examples = {
        'spatial': [
            { word: 'adhigaṅgam', meaning: 'near/along the Ganges', structure: 'adhi + gaṅgā' },
            { word: 'upanagaraṃ', meaning: 'near the city', structure: 'upa + nagara' },
            { word: 'āsamudram', meaning: 'up to the ocean', structure: 'ā + samudra' }
        ],
        'temporal': [
            { word: 'pratidinam', meaning: 'daily/every day', structure: 'prati + dina' },
            { word: 'prativarṣam', meaning: 'yearly/every year', structure: 'prati + varṣa' },
            { word: 'sadākālam', meaning: 'always/at all times', structure: 'sadā + kāla' }
        ],
        'manner': [
            { word: 'anukūlam', meaning: 'favorably', structure: 'anu + kūla' },
            { word: 'pratikūlam', meaning: 'unfavorably', structure: 'prati + kūla' },
            { word: 'abhimukham', meaning: 'facing towards', structure: 'abhi + mukha' }
        ]
    };
    
    return examples[prefix_type] || examples['spatial'];
}

/**
 * Comprehensive test for sutra 1.1.41
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_41(word, context) {
    const analysis = applySutra1_1_41(word, context);
    const validation = validateAvyayībhāva1_1_41(word, context);
    
    return {
        word,
        sutra: '1.1.41',
        analysis,
        validation,
        examples: getCompoundExamples('spatial'),
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_41,
    analyzeAvyayībhāva,
    analyzeAvyayībhāvaPatterns,
    isAvyayaElement,
    extractFirstMember,
    validateAvyayībhāva1_1_41,
    getCompoundExamples,
    testSutra1_1_41
};
