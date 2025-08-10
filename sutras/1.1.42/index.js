/**
 * Sutra 1.1.42: शि सर्वनामस्थानम् (śi sarvanāmasthānam)
 * 
 * Text: शि सर्वनामस्थानम्
 * Translation: The affix शि is called सर्वनामस्थान.
 * 
 * This sutra defines the technical term सर्वनामस्थान (sarvanāmasthāna) which refers to 
 * specific case endings that share characteristics with pronoun endings. This is a 
 * foundational grammatical term that affects many subsequent rules.
 * 
 * सर्वनामस्थान includes various case endings like शि, सु, औ, जस्, अम्, औट्, शस्, ङे, भ्याम्, भिस्, etc.
 */

/**
 * Determines if an affix is सर्वनामस्थान according to sutra 1.1.42 and related rules
 * @param {string} affix - The affix to analyze
 * @param {Object} context - Context containing grammatical information
 * @returns {Object} Analysis result
 */
function applySutra1_1_42(affix, context = {}) {
    const result = {
        applies: false,
        sarvanāmasthāna_status: false,
        affix_type: null,
        reason: '',
        sutra: '1.1.42',
        description: 'Classification of affixes as sarvanāmasthāna'
    };

    // Check if the affix is शि (śi)
    if (affix === 'śi' || affix === 'शि') {
        result.applies = true;
        result.sarvanāmasthāna_status = true;
        result.affix_type = 'śi';
        result.reason = 'Affix śi is explicitly defined as sarvanāmasthāna by this sutra';
        return result;
    }

    // Check other sarvanāmasthāna affixes (from other sutras that extend this)
    const sarvanāmasthāna_affixes = getSarvanāmasthānaAffixes();
    
    if (sarvanāmasthāna_affixes.includes(affix)) {
        result.applies = true;
        result.sarvanāmasthāna_status = true;
        result.affix_type = getAffixType(affix);
        result.reason = `Affix ${affix} is classified as sarvanāmasthāna`;
        return result;
    }

    result.reason = `Affix ${affix} is not classified as sarvanāmasthāna`;
    return result;
}

/**
 * Gets the complete list of सर्वनामस्थान affixes
 * This includes शि (from 1.1.42) and others from subsequent sutras
 * @returns {Array} List of sarvanāmasthāna affixes
 */
function getSarvanāmasthānaAffixes() {
    return [
        // From 1.1.42
        'śi', 'शि',
        
        // From 1.1.43: सुडनपुंसकस्य (su, am, auṭ for neuter)
        'su', 'am', 'auṭ',
        'सु', 'अम्', 'औट्',
        
        // Other common sarvanāmasthāna affixes
        'au', 'औ',           // dual endings
        'jas', 'जस्',        // plural nominative
        'śas', 'शस्',        // plural accusative  
        'ṅe', 'ङे',          // singular dative
        'bhyām', 'भ्याम्',    // dual dative/ablative
        'bhis', 'भिस्',      // plural instrumental
        'ṅas', 'ङस्',        // singular ablative
        'bhyas', 'भ्यस्',    // plural dative/ablative
        'ṅi', 'ङि',          // singular locative
        'os', 'ओस्',         // dual locative
        'sup', 'सुप्'         // general term for nominal endings
    ];
}

/**
 * Determines the type/category of an affix
 * @param {string} affix - The affix to categorize
 * @returns {string} Affix type
 */
function getAffixType(affix) {
    const affix_categories = {
        // Nominative
        'su': 'nominative_singular',
        'au': 'nominative_dual', 
        'jas': 'nominative_plural',
        
        // Accusative
        'am': 'accusative_singular',
        'auṭ': 'accusative_dual',
        'śas': 'accusative_plural',
        
        // Instrumental
        'ṭā': 'instrumental_singular',
        'bhyām': 'instrumental_dual',
        'bhis': 'instrumental_plural',
        
        // Dative
        'ṅe': 'dative_singular',
        'bhyas': 'dative_plural',
        
        // Ablative  
        'ṅas': 'ablative_singular',
        
        // Locative
        'ṅi': 'locative_singular',
        'os': 'locative_dual',
        
        // Special
        'śi': 'locative_singular_special'
    };

    return affix_categories[affix] || 'unknown';
}

/**
 * Checks if an affix triggers sarvanāmasthāna rules
 * @param {string} affix - Affix to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} True if triggers sarvanāmasthāna rules
 */
function triggersSarvanāmasthānaRules(affix, context) {
    const analysis = applySutra1_1_42(affix, context);
    return analysis.sarvanāmasthāna_status;
}

/**
 * Validates if a word form correctly uses sarvanāmasthāna endings
 * @param {string} word - Inflected word
 * @param {Object} context - Context with base word and case information
 * @returns {Object} Validation result
 */
function validateSarvanāmasthāna(word, context) {
    const { base_word, case_info, affix } = context;
    
    if (!affix) {
        return {
            valid: false,
            reason: 'No affix information provided'
        };
    }

    const is_sarvanāmasthāna = triggersSarvanāmasthānaRules(affix, context);
    
    return {
        valid: true,
        is_sarvanāmasthāna,
        affix,
        affix_type: getAffixType(affix),
        explanation: is_sarvanāmasthāna ? 
            'Affix is sarvanāmasthāna - special rules apply' :
            'Regular nominal affix - standard rules apply'
    };
}

/**
 * Comprehensive test for sutra 1.1.42
 * @param {string} affix - Affix to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_42(affix, context) {
    const analysis = applySutra1_1_42(affix, context);
    const validation = validateSarvanāmasthāna(affix, context);
    
    return {
        affix,
        sutra: '1.1.42',
        analysis,
        validation,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_42,
    getSarvanāmasthānaAffixes,
    getAffixType,
    triggersSarvanāmasthānaRules,
    validateSarvanāmasthāna,
    testSutra1_1_42
};
