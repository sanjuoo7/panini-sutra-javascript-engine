/**
 * Sutra 1.1.38: तद्धितश्चासर्वविभक्तिः (taddhitaścāsarvaviKbhakatiḥ)
 * 
 * Text: तद्धितश्चासर्वविभक्तिः
 * Translation: And the words ending in तद्धित or secondary affixes which are not declined 
 * in all the cases are also अव्यय or indeclinables.
 * 
 * This sutra extends the अव्यय classification to words formed with तद्धित (secondary) 
 * affixes that are असर्वविभक्ति (not declined in all cases).
 */

/**
 * Determines if a word with taddhita affixes is avyaya according to sutra 1.1.38
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing affix and declension information
 * @returns {Object} Analysis result
 */
function applySutra1_1_38(word, context = {}) {
    const result = {
        applies: false,
        avyaya_status: false,
        taddhita_type: null,
        reason: '',
        sutra: '1.1.38',
        description: 'Classification of taddhita words as avyaya when not fully declined'
    };

    // Check if word has taddhita affixes
    const taddhita_analysis = analyzeTaddhita(word, context);
    
    if (!taddhita_analysis.has_taddhita) {
        result.reason = 'Word does not have taddhita (secondary) affixes';
        return result;
    }

    // Check if the word is असर्वविभक्ति (not declined in all cases)
    const declension_analysis = analyzeDeclension(word, context);
    
    if (declension_analysis.is_fully_declined) {
        result.reason = 'Word is declined in all cases (सर्वविभक्ति), not असर्वविभक्ति';
        return result;
    }

    result.applies = true;
    result.avyaya_status = true;
    result.taddhita_type = taddhita_analysis.affix_type;
    result.reason = `Word with taddhita affix (${taddhita_analysis.affix_type}) that is not fully declined - therefore avyaya`;

    return result;
}

/**
 * Analyzes if a word has taddhita (secondary) affixes
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with affix information
 * @returns {Object} Taddhita analysis
 */
function analyzeTaddhita(word, context) {
    if (!word || typeof word !== 'string') {
        return { has_taddhita: false, affix_type: null, source: 'analysis' };
    }
    // Check context for explicit taddhita information
    if (context.affixes && context.affixes.some(affix => context.taddhita_affixes?.includes(affix))) {
        return {
            has_taddhita: true,
            affix_type: context.affixes.find(affix => context.taddhita_affixes?.includes(affix)),
            source: 'context'
        };
    }

    // Common taddhita affixes and their patterns (ordered by specificity/length)
    const taddhita_patterns = [
        // Longer patterns first to avoid shorter matches
        { pattern: /.*ayana$/i, type: 'ayana', meaning: 'descendant of' },
        { pattern: /.*maya$/i, type: 'maya', meaning: 'made of' },
        { pattern: /.*kalpa$/i, type: 'kalpa', meaning: 'like/almost' },
        { pattern: /.*prakara$/i, type: 'prakāra', meaning: 'manner/type' },
        { pattern: /.*tana$/i, type: 'tana', meaning: 'extending to' },
        
        // Medium length patterns
        { pattern: /.*eya$/i, type: 'eya', meaning: 'descendant of' },
        { pattern: /.*ika$/i, type: 'ika', meaning: 'relating to' },
        { pattern: /.*iya$/i, type: 'iya', meaning: 'belonging to' },
        { pattern: /.*tva$/i, type: 'tva', meaning: 'abstract quality' },
        { pattern: /.*tas$/i, type: 'tas', meaning: 'from/in direction of' },
        { pattern: /.*tra$/i, type: 'tra', meaning: 'in the direction of' },
        { pattern: /.*dhā$/i, type: 'dhā', meaning: 'fold/manner' },
        { pattern: /.*dha$/i, type: 'dha', meaning: 'fold/manner' },
        { pattern: /.*sat$/i, type: 'śat', meaning: 'hundred-fold' },
        { pattern: /.*vat$/i, type: 'vat', meaning: 'like/having' },
        
        // Shorter patterns last
        { pattern: /.*ya$/i, type: 'ya', meaning: 'descendant of' },
        { pattern: /.*ta$/i, type: 'ta', meaning: 'abstract quality' }
    ];

    for (const pattern_info of taddhita_patterns) {
        if (pattern_info.pattern.test(word)) {
            return {
                has_taddhita: true,
                affix_type: pattern_info.type,
                meaning: pattern_info.meaning,
                source: 'pattern_matching'
            };
        }
    }

    return {
        has_taddhita: false,
        affix_type: null,
        source: 'analysis'
    };
}

/**
 * Analyzes the declension pattern of a word
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with declension information
 * @returns {Object} Declension analysis
 */
function analyzeDeclension(word, context) {
    // Check context for explicit declension information
    if (context.declension) {
        return {
            is_fully_declined: context.declension.type === 'sarvaviKbhakti',
            declension_type: context.declension.type,
            missing_cases: context.declension.missing_cases || [],
            source: 'context'
        };
    }

    // Analyze based on affix type - certain taddhita affixes are typically indeclinable
    const taddhita_analysis = analyzeTaddhita(word, context);
    
    if (taddhita_analysis.has_taddhita) {
        const typically_indeclinable = [
            'tas', 'tra', 'dha', 'dhā', 'śat', 'kalpa', 'prakāra'
        ];
        
        if (typically_indeclinable.includes(taddhita_analysis.affix_type)) {
            return {
                is_fully_declined: false,
                declension_type: 'asarvaviKbhakti',
                reason: `Affix ${taddhita_analysis.affix_type} typically forms indeclinable words`,
                source: 'affix_analysis'
            };
        }
    }

    // Default assumption - most words are fully declined unless specified otherwise
    return {
        is_fully_declined: true,
        declension_type: 'sarvaviKbhakti',
        source: 'default'
    };
}

/**
 * Checks if a taddhita affix typically creates indeclinable words
 * @param {string} affix_type - Type of taddhita affix
 * @returns {boolean} True if typically indeclinable
 */
function isTypicallyIndeclinable(affix_type) {
    const indeclinable_affixes = [
        'tas',      // direction/source
        'tra',      // direction  
        'dha',      // manner/fold
        'śat',      // hundred-fold
        'kalpa',    // like/almost
        'prakāra'   // manner/type
    ];
    
    return indeclinable_affixes.includes(affix_type);
}

/**
 * Validates if a word correctly follows avyaya rules
 * @param {string} word - Word to validate
 * @param {Object} context - Context with usage information
 * @returns {Object} Validation result
 */
function validateTaddhitaAvyaya(word, context) {
    const analysis = applySutra1_1_38(word, context);
    
    return {
        is_avyaya: analysis.avyaya_status,
        should_be_invariant: analysis.avyaya_status,
        taddhita_type: analysis.taddhita_type,
        explanation: analysis.avyaya_status ? 
            'Word should remain unchanged across all usages' :
            'Word may inflect normally according to its declension pattern'
    };
}

/**
 * Comprehensive test for sutra 1.1.38
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_38(word, context) {
    const analysis = applySutra1_1_38(word, context);
    const validation = validateTaddhitaAvyaya(word, context);
    
    return {
        word,
        sutra: '1.1.38',
        analysis,
        validation,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_38,
    analyzeTaddhita,
    analyzeDeclension,
    isTypicallyIndeclinable,
    validateTaddhitaAvyaya,
    testSutra1_1_38
};
