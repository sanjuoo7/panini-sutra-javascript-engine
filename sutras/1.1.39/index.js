/**
 * Sutra 1.1.39: कृन्मेजन्तः (kṛnmejantaḥ)
 * 
 * Text: कृन्मेजन्तः
 * Translation: The words formed by those कृत् or primary affixes which end with a म् 
 * or in a ए, ओ, ऐ and औ are also अव्यय or indeclinables.
 * 
 * This sutra classifies words formed with कृत् (primary) affixes that end in specific 
 * letters (म्, ए, ओ, ऐ, औ) as अव्यय (indeclinables).
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';

/**
 * Determines if a word with krit affixes is avyaya according to sutra 1.1.39
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing affix and formation information
 * @returns {Object} Analysis result
 */
function applySutra1_1_39(word, context = {}) {
    const result = {
        applies: false,
        avyaya_status: false,
        krit_type: null,
        ending_type: null,
        reason: '',
        sutra: '1.1.39',
        description: 'Classification of krit words with specific endings as avyaya'
    };

    // Input validation
    if (!word || typeof word !== 'string') {
        result.reason = 'Invalid input - word must be a non-empty string';
        return result;
    }

    // Check if word has कृत् (krit/primary) affixes
    const krit_analysis = analyzeKrit(word, context);
    
    if (!krit_analysis.is_krit) {
        result.reason = 'Word does not have कृत् (primary) affixes';
        return result;
    }
    
    // Set affix type in result
    result.affix_type = krit_analysis.affix_type;

    // Check if the krit affix ends in म्, ए, ओ, ऐ, औ
    const ending_analysis = analyzeKritEnding(krit_analysis, word, context);
    
    if (!ending_analysis.has_qualifying_ending) {
        result.reason = `कृत् affix does not end in म्/ए/ओ/ऐ/औ (ends in: ${ending_analysis.actual_ending})`;
        return result;
    }

    result.applies = true;
    result.avyaya_status = true;
    result.krit_type = krit_analysis.affix_type;
    result.ending_type = ending_analysis.ending_type;
    result.reason = `Word with कृत् affix (${krit_analysis.affix_type}) ending in ${ending_analysis.ending_type} - therefore avyaya`;

    return result;
}

/**
 * Analyzes if a word has कृत् (primary) affixes
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with affix information
 * @returns {Object} Krit analysis
 */
function analyzeKrit(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_krit: false,
            reason: 'Invalid input'
        };
    }

    // Check context for explicit krit information
    if (context && context.affixes && Array.isArray(context.affixes) && context.affixes.some(affix => context.krit_affixes?.includes(affix))) {
        return {
            is_krit: true,
            affix_type: context.affixes.find(affix => context.krit_affixes?.includes(affix)),
            source: 'context'
        };
    }

    // Check if context provides krit affixes list  
    if (context && context.affixes && Array.isArray(context.affixes) && context.affixes.includes('krit')) {
        return {
            is_krit: true,
            affix_type: 'krit',
            source: 'context'
        };
    }

    // Common कृत् affixes and their patterns using shared constants
    const krit_patterns = SanskritWordLists.kritPatterns;

    for (const pattern_info of krit_patterns) {
        if (pattern_info.pattern.test(word.toLowerCase())) {
            return {
                is_krit: true,
                affix_type: pattern_info.type,
                ending: pattern_info.ending,
                meaning: pattern_info.meaning,
                pattern_type: pattern_info.meaning,
                source: 'pattern_matching'
            };
        }
    }

    // Check for verbal derivatives (common source of krit affixes)
    if (context.derived_from_dhatu || context.word_type === 'verbal_derivative') {
        return {
            is_krit: true,
            affix_type: 'general_krit',
            source: 'contextual_analysis'
        };
    }

    return {
        is_krit: false,
        affix_type: null,
        source: 'analysis'
    };
}

/**
 * Analyzes if a krit affix has qualifying endings (म्, ए, ओ, ऐ, औ)
 * @param {Object} krit_analysis - Result from analyzeKrit
 * @param {string} word - The word being analyzed
 * @param {Object} context - Context information
 * @returns {Object} Ending analysis
 */
function analyzeKritEnding(krit_analysis, word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            has_qualifying_ending: false,
            reason: 'Invalid input'
        };
    }

    const qualifying_endings = SanskritWordLists.kritQualifyingEndings;

    // If krit analysis already identified the ending
    if (krit_analysis && krit_analysis.ending && Object.values(qualifying_endings).includes(krit_analysis.ending)) {
        return {
            has_qualifying_ending: true,
            ending_type: krit_analysis.ending,
            source: 'krit_analysis'
        };
    }

    // Check word ending directly
    const word_lower = word.toLowerCase();
    
    for (const [ending_pattern, devanagari] of Object.entries(qualifying_endings)) {
        if (word_lower.endsWith(ending_pattern)) {
            return {
                has_qualifying_ending: true,
                ending_type: devanagari,
                ending_pattern,
                source: 'word_ending'
            };
        }
    }

    // Determine actual ending for reporting
    const actual_ending = word_lower.slice(-2) || word_lower;
    
    return {
        has_qualifying_ending: false,
        actual_ending,
        source: 'analysis'
    };
}

/**
 * Checks if a krit affix typically creates words with qualifying endings
 * @param {string} affix_type - Type of krit affix
 * @returns {boolean} True if typically has qualifying endings
 */
function hasQualifyingEndings(affix_type) {
    const qualifying_affixes = SanskritWordLists.kritQualifyingAffixes;
    
    return qualifying_affixes.includes(affix_type);
}

/**
 * Validates if a word correctly follows krit avyaya rules
 * @param {string} word - Word to validate
 * @param {Object} context - Context with usage information
 * @returns {Object} Validation result
 */
function validateKritAvyaya(word, context) {
    const analysis = applySutra1_1_39(word, context);
    const kritAnalysis = analyzeKrit(word, context);
    
    // Calculate confidence based on analysis results
    let confidence = 0.5;
    if (analysis.applies) {
        confidence = 0.9;
        if (kritAnalysis.source === 'context') confidence = 0.95;
        if (kritAnalysis.source === 'pattern_matching') confidence = 0.85;
    }
    
    // Generate usage note
    let usage_note = '';
    if (analysis.applies) {
        usage_note = `This कृत् (${kritAnalysis.affix_type || 'primary'}) formation with ${analysis.ending_type} ending functions as अव्यय (indeclinable). `;
        usage_note += `It should remain invariant in all contexts. Common in participial and verbal derivative constructions.`;
    }
    
    return {
        is_avyaya: analysis.avyaya_status,
        should_be_invariant: analysis.avyaya_status,
        krit_type: analysis.krit_type,
        ending_type: analysis.ending_type,
        confidence: confidence,
        usage_note: usage_note,
        explanation: analysis.avyaya_status ? 
            'Word should remain unchanged across all usages (कृत् affix with qualifying ending)' :
            'Word may inflect normally (कृत् affix without qualifying ending or not कृत्-derived)'
    };
}

/**
 * Comprehensive test for sutra 1.1.39
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_39(word, context) {
    const analysis = applySutra1_1_39(word, context);
    const validation = validateKritAvyaya(word, context);
    
    // Provide example words for educational purposes
    const examples = {
        qualifying_म: ['gatvam', 'hatvam', 'kritvam', 'bhūtvam'],
        qualifying_ए: ['gane', 'dane', 'jane', 'kare'],
        qualifying_ओ: ['gamo', 'dano', 'jano', 'karo'],
        qualifying_ऐ: ['gamai', 'damai', 'jamai', 'karai'],
        qualifying_औ: ['gamau', 'damau', 'jamau', 'karau'],
        non_qualifying: ['gata', 'data', 'jana', 'kara']
    };
    
    return {
        word,
        sutra: '1.1.39',
        analysis,
        validation,
        examples,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_39,
    analyzeKrit,
    analyzeKritEnding,
    hasQualifyingEndings,
    validateKritAvyaya,
    testSutra1_1_39
};
