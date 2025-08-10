/**
 * Sutra 1.1.33: प्रथमचरमतयाल्पार्धकतिपयनेमाश्च (prathamacaramatayālpārdhakatipayanemāśca)
 * 
 * Text: प्रथमचरमतयाल्पार्धकतिपयनेमाश्च
 * Translation: And also the words प्रथम 'first', चरम 'last', words with the affix तय, 
 * अल्प 'few', अर्ध 'half', कतिपय 'some' and नेम 'half' are optionally सर्वनाम, 
 * before the Nominative Plural termination.
 * 
 * This sutra extends the optional sarvanama status to additional specific words
 * when they appear before the nominative plural ending जस्.
 * 
 * REFACTORED: Now uses shared case operations and word lists to eliminate redundancy
 */

// Import shared utilities to eliminate redundant code
import { SanskritWordLists } from '../sanskrit-utils/constants.js';
import { 
  validatePrathmaadi, 
  isFollowedByJas,
  getWordBase as sharedGetWordBase,
  hasTayaAffix as sharedHasTayaAffix 
} from '../sanskrit-utils/case-operations.js';

/**
 * Determines if specific words (prathama, carama, etc.) have optional sarvanama status before jas
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing case information
 * @returns {Object} Analysis result
 */
function applySutra1_1_33(word, context = {}) {
    const result = {
        applies: false,
        sarvanama_status: null,
        reason: '',
        sutra: '1.1.33',
        description: 'Optional sarvanama status for specific words before jas'
    };

        // Check if followed by jas (nominative plural) using shared utility
    if (!isFollowedByJas(word, context)) {
        result.reason = 'Not followed by nominative plural (jas)';
        return result;
    }

    // Use shared utility to validate word qualification
    const validation = validatePrathmaadi(word, context);
    
    if (validation.qualifies) {
        result.applies = true;
        result.sarvanama_status = 'optional';
        result.reason = validation.has_taya_affix ? 
            'Word with taya affix before jas - optional sarvanama status' :
            `Specified word (${validation.word_base}) before jas - optional sarvanama status`;
        result.word_base = validation.word_base;
        result.is_prathmaadi = validation.is_prathmaadi;
        result.has_taya_affix = validation.has_taya_affix;
    } else {
        result.reason = `Word '${validation.word_base}' is not among the specified words and lacks तय affix`;
    }

    return result;
}

/**
 * Checks if a word has तय (taya) affix - now using shared utility
 * @param {string} word - The word to check
 * @param {Object} context - Context with affix information
 * @returns {boolean} True if has taya affix
 */
function hasTayaAffix(word, context) {
    // Wrapper for backward compatibility - delegates to shared utility
    return sharedHasTayaAffix(word, context);
}

/**
 * Extracts the base form of a word for comparison - now using shared utility
 * @param {string} word - The inflected word
 * @returns {string} Base form
 */
function getWordBase(word) {
    // Wrapper for backward compatibility - delegates to shared utility
    return sharedGetWordBase(word);
}

/**
 * Checks if the case is nominative plural (jas) - now using shared utility
 * @param {Object} caseInfo - Case information
 * @returns {boolean} True if nominative plural
 */
function isNominativePlural(caseInfo) {
    // Wrapper for backward compatibility - delegates to shared utility
    return isFollowedByJas('', { case: caseInfo });
}

/**
 * Validates if a word qualifies under this sutra - now using shared utility
 * @param {string} word - Word to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result
 */
function validateWord1_1_33(word, context) {
    // Get enhanced validation from shared utility
    const validation = validatePrathmaadi(word, context);
    
    // Transform to match expected API format
    return {
        is_specified_word: validation.is_prathmaadi,
        has_taya_affix: validation.has_taya_affix,
        word_base: validation.word_base,
        qualifies: validation.qualifies
    };
}

/**
 * Comprehensive test for sutra 1.1.33
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_33(word, context) {
    const analysis = applySutra1_1_33(word, context);
    const validation = validateWord1_1_33(word, context);
    
    return {
        word,
        sutra: '1.1.33',
        analysis,
        validation,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_33,
    hasTayaAffix,
    getWordBase,
    isNominativePlural,
    validateWord1_1_33,
    testSutra1_1_33
};
