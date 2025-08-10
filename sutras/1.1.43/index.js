/**
 * Sutra 1.1.43: सुडनपुंसकस्य
 * Translation: "Of the neuter (gender) with sup ending"
 * 
 * This sutra specifies that when referring to neuter forms with nominal endings (sup),
 * the stem is considered as the referent for grammatical operations.
 */

/**
 * Main function to apply Sutra 1.1.43
 * @param {string} word - The word to analyze
 * @param {Object} context - Context with grammatical information
 * @returns {Object} Analysis result with neuter sup information
 */
function applySutra1_1_43(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            applies: false,
            is_neuter_sup: false,
            has_sup_ending: false,
            reason: 'Invalid input: word must be a non-empty string'
        };
    }

    // Check if gender is neuter first
    const genderAnalysis = analyzeNeuterGender(word, context);
    if (!genderAnalysis.is_neuter) {
        return {
            applies: false,
            is_neuter_sup: false,
            has_sup_ending: false,
            reason: 'Word is not neuter gender'
        };
    }

    // Check if word has sup ending
    const supAnalysis = analyzeSupEnding(word, context);
    if (!supAnalysis.has_sup_ending) {
        return {
            applies: false,
            is_neuter_sup: false,
            has_sup_ending: false,
            reason: 'Word does not have sup ending'
        };
    }

    return {
        applies: true,
        is_neuter_sup: true,
        has_sup_ending: true,
        stem: genderAnalysis.stem,
        ending: supAnalysis.ending,
        case_number: supAnalysis.case_number,
        gender: 'neuter',
        grammatical_function: analyzeGrammaticalFunction(word, context),
        context_type: context.grammatical_context || 'general',
        examples: genderAnalysis.examples
    };
}

/**
 * Analyzes the presence of sup endings in words
 * @param {string} word - Word to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Analysis of sup ending presence
 */
function analyzeSupEnding(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            has_sup_ending: false,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit sup information
    if (context && context.has_sup_ending !== undefined) {
        return {
            has_sup_ending: context.has_sup_ending,
            ending: context.sup_ending,
            source: 'context'
        };
    }

    // Sup endings for neuter forms (simplified set)
    const neuter_sup_endings = {
        // Nominative/Accusative
        'am': { case: 'nominative/accusative', number: 'singular', example: 'phalam' },
        'ā': { case: 'nominative/accusative', number: 'dual', example: 'phale' },
        'e': { case: 'nominative/accusative', number: 'dual', example: 'phale' },
        'āni': { case: 'nominative/accusative', number: 'plural', example: 'phalāni' },
        'i': { case: 'nominative/accusative', number: 'plural', example: 'nāmāni' },
        
        // Instrumental
        'ena': { case: 'instrumental', number: 'singular', example: 'phalena' },
        'ābhyām': { case: 'instrumental/dative', number: 'dual', example: 'phalābhyām' },
        'aiḥ': { case: 'instrumental', number: 'plural', example: 'phalaiḥ' },
        'ais': { case: 'instrumental', number: 'plural', example: 'phalais' },
        
        // Dative
        'āya': { case: 'dative', number: 'singular', example: 'phalāya' },
        'ebhyaḥ': { case: 'dative/ablative', number: 'plural', example: 'phalebhyaḥ' },
        
        // Ablative
        'āt': { case: 'ablative', number: 'singular', example: 'phalāt' },
        
        // Genitive
        'asya': { case: 'genitive', number: 'singular', example: 'phalasya' },
        'ayoḥ': { case: 'genitive/locative', number: 'dual', example: 'phalayoḥ' },
        'ānām': { case: 'genitive', number: 'plural', example: 'phalānām' },
        
        // Locative
        'e': { case: 'locative', number: 'singular', alt_case: 'nominative/accusative dual', example: 'phale' },
        'eṣu': { case: 'locative', number: 'plural', example: 'phaleṣu' }
    };

    // Special patterns for neuter words
    const neuter_patterns = [
        { pattern: /.*am$/, ending: 'am', case: 'nom/acc', number: 'sg' },
        { pattern: /.*e$/, ending: 'e', case: 'nom/acc/loc', number: 'dual/sg' },
        { pattern: /.*āni$/, ending: 'āni', case: 'nom/acc', number: 'pl' },
        { pattern: /.*ōni$/, ending: 'ōni', case: 'nom/acc', number: 'pl' },
        { pattern: /.*ūni$/, ending: 'ūni', case: 'nom/acc', number: 'pl' },
        { pattern: /.*ena$/, ending: 'ena', case: 'instrumental', number: 'sg' },
        { pattern: /.*asya$/, ending: 'asya', case: 'genitive', number: 'sg' },
        { pattern: /.*āya$/, ending: 'āya', case: 'dative', number: 'sg' },
        { pattern: /.*āt$/, ending: 'āt', case: 'ablative', number: 'sg' },
        { pattern: /^nāma$/, ending: '', case: 'nom/acc', number: 'sg' } // Special for nāma
    ];

    // Normalize word for analysis
    const normalized_word = word.toLowerCase();
    
    // Check direct ending matches
    for (const [ending, info] of Object.entries(neuter_sup_endings)) {
        if (normalized_word.endsWith(ending)) {
            return {
                has_sup_ending: true,
                ending: ending,
                case_number: `${info.case} ${info.number}`,
                case: info.case,
                number: info.number,
                example: info.example,
                source: 'ending_analysis'
            };
        }
    }

    // Check pattern matches
    for (const pattern_info of neuter_patterns) {
        if (pattern_info.pattern.test(normalized_word)) {
            let number = pattern_info.number;
            // Special handling for 'e' ending
            if (pattern_info.ending === 'e' && normalized_word.endsWith('e')) {
                // In neuter, 'e' can be dual nominative/accusative
                if (pattern_info.case.includes('dual')) {
                    number = 'dual';
                } else {
                    number = 'singular'; // locative singular
                }
            }
            
            return {
                has_sup_ending: true,
                ending: pattern_info.ending,
                case_number: `${pattern_info.case} ${number}`,
                case: pattern_info.case,
                number: number,
                source: 'pattern_analysis'
            };
        }
    }

    return {
        has_sup_ending: false,
        source: 'analysis',
        reason: 'No sup ending pattern detected'
    };
}

/**
 * Analyzes neuter gender characteristics
 * @param {string} word - Word to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Analysis of neuter gender
 */
function analyzeNeuterGender(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_neuter: false,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit gender information
    if (context && context.gender) {
        return {
            is_neuter: context.gender === 'neuter',
            gender: context.gender,
            source: 'context'
        };
    }

    // Common neuter word patterns and stems
    const neuter_words = {
        // Common neuter nouns
        'phala': { 
            meaning: 'fruit', 
            stem: 'phala',
            examples: ['phalam', 'phale', 'phalāni']
        },
        'nāma': { 
            meaning: 'name', 
            stem: 'nāman',
            examples: ['nāma', 'nāmāni', 'nāmnā']
        },
        'karma': { 
            meaning: 'action', 
            stem: 'karman',
            examples: ['karma', 'karmāṇi', 'karmaṇā']
        },
        'jala': { 
            meaning: 'water', 
            stem: 'jala',
            examples: ['jalam', 'jale', 'jalāni']
        },
        'vana': { 
            meaning: 'forest', 
            stem: 'vana',
            examples: ['vanam', 'vane', 'vanāni']
        },
        'gṛha': { 
            meaning: 'house', 
            stem: 'gṛha',
            examples: ['gṛham', 'gṛhe', 'gṛhāṇi']
        },
        'puṣpa': { 
            meaning: 'flower', 
            stem: 'puṣpa',
            examples: ['puṣpam', 'puṣpe', 'puṣpāṇi']
        },
        'yuga': { 
            meaning: 'age, yoke', 
            stem: 'yuga',
            examples: ['yugam', 'yuge', 'yugāni']
        },
        'śrī': { 
            meaning: 'prosperity', 
            stem: 'śrī',
            examples: ['śrī', 'śriyau', 'śrīs'] // Note: can also be feminine
        },
        'citta': { 
            meaning: 'mind', 
            stem: 'citta',
            examples: ['cittam', 'citte', 'cittāni']
        }
    };

    // Typical neuter endings and patterns
    const neuter_stem_patterns = [
        { pattern: /.*a$/, type: 'a_stem' },
        { pattern: /.*i$/, type: 'i_stem' },
        { pattern: /.*u$/, type: 'u_stem' },
        { pattern: /.*man$/, type: 'man_stem' },
        { pattern: /.*as$/, type: 'as_stem' },
        { pattern: /.*is$/, type: 'is_stem' },
        { pattern: /.*us$/, type: 'us_stem' }
    ];

    // Extract stem from inflected form
    const stem = extractStem(word);
    const normalized_stem = stem.toLowerCase();
    
    // Check if stem is a known neuter word
    if (neuter_words[normalized_stem]) {
        const word_info = neuter_words[normalized_stem];
        return {
            is_neuter: true,
            gender: 'neuter',
            stem: word_info.stem,
            meaning: word_info.meaning,
            examples: word_info.examples,
            source: 'neuter_word_list'
        };
    }

    // Check patterns for likely neuter stems
    for (const pattern_info of neuter_stem_patterns) {
        if (pattern_info.pattern.test(normalized_stem)) {
            // Additional verification for common neuter patterns
            if (pattern_info.type === 'a_stem' && isLikelyNeuterAStem(normalized_stem)) {
                return {
                    is_neuter: true,
                    gender: 'neuter',
                    stem: normalized_stem,
                    stem_type: pattern_info.type,
                    source: 'pattern_analysis',
                    confidence: 0.7
                };
            }
        }
    }

    // Check for neuter forms in context
    if (word.endsWith('am') || word.endsWith('āni') || word.endsWith('e')) {
        return {
            is_neuter: true,
            gender: 'neuter',
            stem: stem,
            source: 'form_analysis',
            confidence: 0.8,
            note: 'Determined from characteristic neuter endings'
        };
    }

    return {
        is_neuter: false,
        gender: 'undetermined',
        source: 'analysis'
    };
}

/**
 * Extracts stem from inflected neuter word
 * @param {string} word - Inflected word
 * @returns {string} Extracted stem
 */
function extractStem(word) {
    // Simple stem extraction rules for neuter words
    const stem_extraction_rules = [
        { pattern: /(.*)am$/, replacement: '$1a' },
        { pattern: /(.*)āni$/, replacement: '$1a' },
        { pattern: /(.*)ena$/, replacement: '$1a' },
        { pattern: /(.*)asya$/, replacement: '$1a' },
        { pattern: /(.*)āya$/, replacement: '$1a' },
        { pattern: /(.*)āt$/, replacement: '$1a' },
        { pattern: /(.*)e$/, replacement: '$1a' }, // Could also be locative
        { pattern: /(.*)ā$/, replacement: '$1a' }, // Dual forms
        { pattern: /(.*)ūni$/, replacement: '$1u' },
        { pattern: /(.*)ōni$/, replacement: '$1o' }
    ];

    for (const rule of stem_extraction_rules) {
        if (rule.pattern.test(word)) {
            return word.replace(rule.pattern, rule.replacement);
        }
    }

    return word; // Return as-is if no pattern matches
}

/**
 * Checks if an 'a' stem is likely neuter
 * @param {string} stem - Stem to check
 * @returns {boolean} Whether likely neuter
 */
function isLikelyNeuterAStem(stem) {
    // Common patterns for neuter a-stems
    const neuter_indicators = [
        /.*phala$/, // fruit words
        /.*vana$/, // forest words
        /.*gṛha$/, // house words
        /.*puṣpa$/, // flower words
        /.*yuga$/, // time/yoke words
        /.*kṣetra$/, // field words
        /.*śāstra$/, // text words
        /.*rūpa$/, // form words
        /.*citta$/, // mind words
        /.*hṛdaya$/ // heart words
    ];

    return neuter_indicators.some(pattern => pattern.test(stem));
}

/**
 * Analyzes grammatical function of neuter sup forms
 * @param {string} word - Word to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Grammatical function analysis
 */
function analyzeGrammaticalFunction(word, context = {}) {
    const sup_analysis = analyzeSupEnding(word, context);
    
    if (!sup_analysis.has_sup_ending) {
        return {
            function: 'unknown',
            reason: 'No sup ending detected'
        };
    }

    // Map cases to grammatical functions
    const case_functions = {
        'nominative': 'subject',
        'accusative': 'direct_object',
        'instrumental': 'instrument/agent',
        'dative': 'indirect_object',
        'ablative': 'source/separation',
        'genitive': 'possessor/relation',
        'locative': 'location/time'
    };

    let primary_function = 'unknown';
    let syntactic_role = 'nominal';
    
    // Handle the case analysis
    if (sup_analysis.case) {
        if (sup_analysis.case.includes('nominative')) {
            primary_function = case_functions['nominative'];
            syntactic_role = 'subject';
        } else if (sup_analysis.case.includes('accusative')) {
            primary_function = case_functions['accusative'];
            syntactic_role = 'direct_object';
        } else if (sup_analysis.case.includes('instrumental')) {
            primary_function = case_functions['instrumental'];
            syntactic_role = 'instrument';
        } else if (sup_analysis.case.includes('genitive')) {
            primary_function = case_functions['genitive'];
            syntactic_role = 'possessor';
        } else if (sup_analysis.case.includes('dative')) {
            primary_function = case_functions['dative'];
            syntactic_role = 'recipient';
        } else if (sup_analysis.case.includes('ablative')) {
            primary_function = case_functions['ablative'];
            syntactic_role = 'source';
        } else if (sup_analysis.case.includes('locative')) {
            primary_function = case_functions['locative'];
            syntactic_role = 'location';
        }
    }

    return {
        function: primary_function,
        syntactic_role: syntactic_role,
        case: sup_analysis.case,
        number: sup_analysis.number,
        ending: sup_analysis.ending,
        grammatical_note: `Neuter form functioning as ${primary_function}`
    };
}

/**
 * Validates the application of Sutra 1.1.43
 * @param {string} word - Word to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result
 */
function validateNeuterSup(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_valid_application: false,
            is_neuter_sup: false,
            confidence: 0,
            explanation: 'Invalid input: word must be a non-empty string'
        };
    }

    const sutra_result = applySutra1_1_43(word, context);
    
    if (!sutra_result.applies) {
        return {
            is_valid_application: false,
            is_neuter_sup: false,
            confidence: 0,
            explanation: `Sutra 1.1.43 does not apply: ${sutra_result.reason}`,
            word_analysis: sutra_result
        };
    }

    // Calculate confidence based on evidence
    let confidence = 0.6; // Base confidence for neuter sup
    
    if (sutra_result.stem && context.grammatical_context) {
        confidence += 0.2; // Higher confidence with context
    }
    
    if (sutra_result.examples && sutra_result.examples.length > 0) {
        confidence += 0.1; // Examples support the analysis
    }

    if (sutra_result.case_number) {
        confidence += 0.1; // Clear case identification
    }
    
    // Cap confidence at 1.0
    confidence = Math.min(confidence, 1.0);

    return {
        is_valid_application: true,
        is_neuter_sup: true,
        confidence: confidence,
        usage_note: `The word '${word}' is a neuter form with sup ending '${sutra_result.ending}' according to Sutra 1.1.43, functioning as ${sutra_result.grammatical_function?.syntactic_role || 'nominal element'}.`,
        grammatical_properties: {
            gender: 'neuter',
            has_sup_ending: true,
            case: sutra_result.case_number,
            stem: sutra_result.stem,
            syntactic_function: sutra_result.grammatical_function?.function
        },
        examples: sutra_result.examples || []
    };
}

/**
 * Comprehensive test function for Sutra 1.1.43
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Comprehensive test results
 */
function testSutra1_1_43(word, context = {}) {
    const analysis = applySutra1_1_43(word, context);
    const validation = validateNeuterSup(word, context);
    
    return {
        sutra: '1.1.43 सुडनपुंसकस्य',
        analysis: analysis,
        validation: validation,
        examples: {
            neuter_nominative: ['phalam (fruit)', 'vanam (forest)', 'nāma (name)'],
            neuter_accusative: ['phalam', 'jalam', 'puṣpam'],
            neuter_dual: ['phale', 'nāmni', 'jale'],
            neuter_plural: ['phalāni', 'nāmāni', 'jalāni'],
            case_examples: [
                'phalena (instrumental)',
                'phalasya (genitive)',
                'phalāya (dative)',
                'phale (locative)'
            ]
        },
        linguistic_notes: {
            sup_concept: 'Sup endings are nominal case terminations',
            neuter_characteristics: 'Neuter nouns have identical nominative and accusative forms',
            grammatical_function: 'Sutra specifies how neuter sup forms function in syntax',
            morphology: 'Neuter declension patterns differ from masculine and feminine'
        },
        timestamp: new Date().toISOString()
    };
}

// Export functions for testing and use
export {
    applySutra1_1_43,
    analyzeSupEnding,
    analyzeNeuterGender,
    analyzeGrammaticalFunction,
    validateNeuterSup,
    testSutra1_1_43
};
