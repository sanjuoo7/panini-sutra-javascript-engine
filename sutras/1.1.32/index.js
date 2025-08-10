/**
 * Sutra 1.1.32: विभाषा जसि (vibhāṣā jasi)
 * 
 * Text: विभाषा जसि
 * Translation: Their द्वन्द्व compounds are optionally सर्वनाम when the nominative plural termination जस् follows.
 * 
 * This sutra states that when the nominal words सर्व etc. are in द्वन्द्व compounds 
 * and followed by the nominative plural ending जस्, they optionally retain their सर्वनाम status.
 * 
 * REFACTORED: Now uses shared constants to eliminate hardcoded word lists
 */

// Import shared utilities
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { SanskritWordLists } from '../sanskrit-utils/constants.js';

/**
 * Determines if a dvandva compound with sarvaadi words optionally has sarvanama status before jas
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing compound information and case information
 * @returns {Object} Analysis result
 */
function applySutra1_1_32(word, context = {}) {
    const result = {
        applies: false,
        sarvanama_status: null,
        reason: '',
        sutra: '1.1.32',
        description: 'Optional sarvanama status for dvandva compounds before jas'
    };

    // Validate input using shared utility
    if (!validateSanskritWord(word).isValid) {
        result.reason = 'Invalid Sanskrit word';
        return result;
    }

    // Check if context indicates dvandva compound
    if (!context.compound || !context.compound.type || context.compound.type !== 'dvandva') {
        result.reason = 'Not a dvandva compound';
        return result;
    }

    // Check if followed by jas (nominative plural)
    if (!context.case || context.case.vibhakti !== 'prathama' || context.case.vacana !== 'bahuvacana') {
        result.reason = 'Not followed by nominative plural (jas)';
        return result;
    }

    // Use shared constants instead of hardcoded array
    const sarvaadi_words = SanskritWordLists.sarvaadi.iast;

    const compound_parts = context.compound.parts || [];
    const has_sarvaadi = compound_parts.some(part => 
        sarvaadi_words.includes(part) || sarvaadi_words.includes(part.toLowerCase())
    );

    if (!has_sarvaadi) {
        result.reason = 'Compound does not contain sarvaadi words';
        return result;
    }

    result.applies = true;
    result.sarvanama_status = 'optional'; // विभाषा indicates optionality
    result.reason = 'Dvandva compound with sarvaadi words before jas - optional sarvanama status';

    return result;
}

/**
 * Checks if a compound is dvandva type
 * @param {Object} compound - Compound information
 * @returns {boolean} True if dvandva compound
 */
function isDvandvaCompound(compound) {
    if (!compound || !compound.type) return false;
    return compound.type === 'dvandva';
}

/**
 * Checks if the case is nominative plural (jas)
 * @param {Object} caseInfo - Case information
 * @returns {boolean} True if nominative plural
 */
function isNominativePlural(caseInfo) {
    if (!caseInfo) return false;
    return caseInfo.vibhakti === 'prathama' && caseInfo.vacana === 'bahuvacana';
}

/**
 * Comprehensive test for sutra 1.1.32
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_32(word, context) {
    const analysis = applySutra1_1_32(word, context);
    
    return {
        word,
        sutra: '1.1.32',
        analysis,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_32,
    isDvandvaCompound,
    isNominativePlural,
    testSutra1_1_32
};
