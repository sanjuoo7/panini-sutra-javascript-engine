/**
 * Sutra 1.1.40: क्त्वातोसुन्कसुनः (ktvātosuṅkasunḥ)
 * 
 * Text: क्त्वातोसुन्कसुनः
 * Translation: The words ending in क्त्व, तोसुन्, and कसुन् are अव्यय or indeclinables.
 * 
 * This sutra specifically classifies words ending in these three affixes as अव्यय:
 * - क्त्व (ktvā): Absolutive/gerund affix
 * - तोसुन् (tosun): Specific verbal derivative affix
 * - कसुन् (kasun): Specific verbal derivative affix
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';

/**
 * Determines if a word ending in ktvā, tosun, or kasun is avyaya according to sutra 1.1.40
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing affix information
 * @returns {Object} Analysis result
 */
function applySutra1_1_40(word, context = {}) {
    const result = {
        applies: false,
        avyaya_status: false,
        affix_type: null,
        reason: '',
        sutra: '1.1.40',
        description: 'Classification of ktvā, tosun, kasun endings as avyaya'
    };

    // Input validation
    if (!word || typeof word !== 'string') {
        result.reason = 'Invalid input - word must be a non-empty string';
        return result;
    }

    // Analyze the word for qualifying affixes
    const affix_analysis = analyzeQualifyingAffixes(word, context);
    
    if (!affix_analysis.has_qualifying_affix) {
        result.reason = 'Word does not end in क्त्व (ktvā), तोसुन् (tosun), or कसुन् (kasun)';
        return result;
    }

    result.applies = true;
    result.avyaya_status = true;
    result.affix_type = affix_analysis.affix_type;
    result.reason = `Word ends in ${affix_analysis.affix_type} - therefore avyaya`;

    return result;
}

/**
 * Analyzes if a word has qualifying affixes (ktvā, tosun, kasun)
 * @param {string} word - Word to analyze
 * @param {Object} context - Context with affix information
 * @returns {Object} Affix analysis
 */
function analyzeQualifyingAffixes(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            has_qualifying_affix: false,
            affix_type: null,
            source: 'invalid_input'
        };
    }

    // Check context for explicit affix information
    if (context && context.affixes) {
        const qualifying_context_affixes = SanskritWordLists.qualifyingContextAffixes;
        const found_affix = context.affixes.find(affix => 
            qualifying_context_affixes.includes(affix)
        );
        
        if (found_affix) {
            return {
                has_qualifying_affix: true,
                affix_type: found_affix,
                source: 'context'
            };
        }
    }

    // Pattern matching for the specific affixes using shared constants
    const affix_patterns = SanskritWordLists.sutra140AffixPatterns;

    const word_lower = word.toLowerCase();
    
    for (const affix_info of affix_patterns) {
        for (const pattern of affix_info.patterns) {
            if (pattern.test(word_lower)) {
                return {
                    has_qualifying_affix: true,
                    affix_type: affix_info.type,
                    devanagari: affix_info.devanagari,
                    meaning: affix_info.meaning,
                    source: 'pattern_matching'
                };
            }
        }
    }

    return {
        has_qualifying_affix: false,
        affix_type: null,
        source: 'analysis'
    };
}

/**
 * Checks if a word is likely a ktvā (absolutive) form
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} True if likely ktvā form
 */
function isKtvaForm(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return false;
    }

    // Common ktvā patterns using shared constants
    const ktva_patterns = SanskritWordLists.ktvaPatterns;
    
    const word_lower = word.toLowerCase();
    
    // Check patterns
    for (const pattern of ktva_patterns) {
        if (pattern.test(word_lower)) {
            return true;
        }
    }
    
    // Check context
    if (context && (context.word_type === 'absolutive' || context.word_type === 'gerund')) {
        return true;
    }
    
    return false;
}

/**
 * Validates if a word correctly follows the avyaya rules for these affixes
 * @param {string} word - Word to validate
 * @param {Object} context - Context with usage information
 * @returns {Object} Validation result
 */
function validateSpecificAffix1_1_40(word, context) {
    const analysis = applySutra1_1_40(word, context);
    
    return {
        is_avyaya: analysis.avyaya_status,
        should_be_invariant: analysis.avyaya_status,
        affix_type: analysis.affix_type,
        usage_note: getUsageNote(analysis.affix_type),
        explanation: analysis.avyaya_status ? 
            `Word with ${analysis.affix_type} ending should remain unchanged across all usages` :
            'Word does not have qualifying affix endings'
    };
}

/**
 * Provides usage notes for different affix types
 * @param {string} affix_type - Type of affix
 * @returns {string} Usage note
 */
function getUsageNote(affix_type) {
    const usage_notes = {
        'ktvā': 'Used as absolutive/gerund - "having done X", connects sequential actions',
        'tosun': 'Rare verbal derivative - specialized grammatical formation',
        'kasun': 'Rare verbal derivative - specialized grammatical formation'
    };
    
    return usage_notes[affix_type] || 'No specific usage notes available';
}

/**
 * Gets common examples for each affix type
 * @param {string} affix_type - Type of affix
 * @returns {Array} Examples array
 */
function getExamples(affix_type) {
    const examples = {
        'ktvā': [
            { word: 'gatvā', meaning: 'having gone', root: 'gam' },
            { word: 'kṛtvā', meaning: 'having done', root: 'kṛ' },
            { word: 'bhuktvā', meaning: 'having eaten', root: 'bhuj' },
            { word: 'dṛṣṭvā', meaning: 'having seen', root: 'dṛś' }
        ],
        'tosun': [
            { note: 'Examples are rare in classical Sanskrit literature' }
        ],
        'kasun': [
            { note: 'Examples are rare in classical Sanskrit literature' }
        ]
    };
    
    return examples[affix_type] || [];
}

/**
 * Comprehensive test for sutra 1.1.40
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_40(word, context) {
    const analysis = applySutra1_1_40(word, context);
    const validation = validateSpecificAffix1_1_40(word, context);
    
    return {
        word,
        sutra: '1.1.40',
        analysis,
        validation,
        examples: getExamples(analysis.affix_type),
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_40,
    analyzeQualifyingAffixes,
    isKtvaForm,
    validateSpecificAffix1_1_40,
    getUsageNote,
    getExamples,
    testSutra1_1_40
};
