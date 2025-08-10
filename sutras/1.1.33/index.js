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
 */

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

    // Check if followed by jas (nominative plural)
    if (!context.case || context.case.vibhakti !== 'prathama' || context.case.vacana !== 'bahuvacana') {
        result.reason = 'Not followed by nominative plural (jas)';
        return result;
    }

    // Define the specific words mentioned in the sutra
    const specified_words = [
        'pratham',    // प्रथम - first (base without final 'a')
        'prathama',   // प्रथम - first (with final 'a')
        'caram',      // चरम - last (base without final 'a')
        'carama',     // चरम - last (with final 'a')
        'alp',        // अल्प - few (base)
        'alpa',       // अल्प - few (with final 'a')
        'ardh',       // अर्ध - half (base)
        'ardha',      // अर्ध - half (with final 'a')
        'katipay',    // कतिपय - some (base)
        'katipaya',   // कतिपय - some (with final 'a')
        'nem',        // नेम - half (base)
        'nema'        // नेम - half (with final 'a')
    ];

    // Check for words with तय affix (taya)
    const has_taya_affix = hasTayaAffix(word, context);
    
    // Check if word is one of the specified words
    const word_base = getWordBase(word);
    const is_specified_word = specified_words.some(specWord => 
        word_base === specWord || word_base.startsWith(specWord)
    );

    if (!is_specified_word && !has_taya_affix) {
        result.reason = 'Word is not among the specified words (prathama, carama, etc.) or does not have taya affix';
        return result;
    }

    result.applies = true;
    result.sarvanama_status = 'optional'; // The sutra indicates optionality
    result.reason = has_taya_affix ? 
        'Word with taya affix before jas - optional sarvanama status' :
        `Specified word (${word_base}) before jas - optional sarvanama status`;

    return result;
}

/**
 * Checks if a word has the तय (taya) affix
 * @param {string} word - The word to check
 * @param {Object} context - Context with affix information
 * @returns {boolean} True if word has taya affix
 */
function hasTayaAffix(word, context) {
    // Check context for affix information
    if (context.affixes && context.affixes.includes('taya')) {
        return true;
    }
    
    // Check word ending pattern for taya
    const taya_patterns = ['taya', 'tīya', 'tya'];
    return taya_patterns.some(pattern => word.includes(pattern));
}

/**
 * Extracts the base form of a word for comparison
 * @param {string} word - The inflected word
 * @returns {string} Base form
 */
function getWordBase(word) {
    // Remove common case endings to get base
    const case_endings = ['āḥ', 'ān', 'aiḥ', 'aḥ', 'e', 'au', 'am', 'ena', 'ābhyām', 'bhis'];
    
    let base = word.toLowerCase();
    for (const ending of case_endings) {
        if (base.endsWith(ending)) {
            base = base.slice(0, -ending.length);
            break;
        }
    }
    
    return base;
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
 * Validates if a word qualifies under this sutra
 * @param {string} word - Word to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result
 */
function validateWord1_1_33(word, context) {
    const specified_words = ['pratham', 'prathama', 'caram', 'carama', 'alp', 'alpa', 'ardh', 'ardha', 'katipay', 'katipaya', 'nem', 'nema'];
    const word_base = getWordBase(word);
    const has_taya = hasTayaAffix(word, context);
    
    return {
        is_specified_word: specified_words.includes(word_base),
        has_taya_affix: has_taya,
        word_base,
        qualifies: specified_words.includes(word_base) || has_taya
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
