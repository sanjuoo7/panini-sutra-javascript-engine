/**
 * Sutra 1.1.37: स्वरादिनिपातमव्ययम् (svarādinipātamavyayam)
 * 
 * Text: स्वरादिनिपातमव्ययम्
 * Translation: The words स्वर् 'heaven' etc. and the particles are called अव्यय or indeclinables.
 * 
 * This sutra defines the class of अव्यय (indeclinable words), which includes:
 * 1. Words beginning with स्वर् etc. (svarādi words)
 * 2. निपात (particles)
 * 
 * अव्यय words do not change their form regardless of case, number, or gender.
 */

/**
 * Determines if a word is अव्यय according to sutra 1.1.37
 * @param {string} word - The word to analyze
 * @param {Object} context - Context containing word type and semantic information
 * @returns {Object} Analysis result
 */
function applySutra1_1_37(word, context = {}) {
    const result = {
        applies: false,
        avyaya_status: false,
        category: null,
        reason: '',
        sutra: '1.1.37',
        description: 'Classification of svaradi words and nipatas as avyaya'
    };

    // Check if word is a nipata (particle)
    if (isNipata(word, context)) {
        result.applies = true;
        result.avyaya_status = true;
        result.category = 'nipata';
        result.reason = 'Word is classified as nipata (particle) - therefore avyaya';
        return result;
    }

    // Check if word is svaradi (begins with svar etc.)
    if (isSvaradi(word, context)) {
        result.applies = true;
        result.avyaya_status = true;
        result.category = 'svaradi';
        result.reason = 'Word belongs to svaradi class - therefore avyaya';
        return result;
    }

    result.reason = 'Word is neither nipata nor svaradi';
    return result;
}

/**
 * Checks if a word is निपात (particle)
 * @param {string} word - Word to check
 * @param {Object} context - Context with grammatical information
 * @returns {boolean} True if nipata
 */
function isNipata(word, context) {
    // Check context classification
    if (context.type === 'nipata' || context.word_class === 'particle') {
        return true;
    }

    // Known nipata words (particles)
    const nipata_words = [
        // Single vowel particles (as per 1.1.14)
        'a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o', 'ai', 'au',
        
        // Common particles
        'ca', 'vā', 'hi', 'tu', 'nu', 'kila', 'nāma', 'vai', 'sma', 'ha',
        'atha', 'atho', 'uta', 'atha vā', 'kiṃ ca', 'yathā ca',
        'iti', 'cet', 'yadi', 'ced', 'no', 'mā', 'na',
        
        // Emphatic particles
        'eva', 'tu', 'hi', 'vai', 'nūnam', 'khalu', 'kila',
        
        // Conjunctions
        'atha', 'tathā', 'yathā', 'tadvat', 'evam',
        
        // Negation particles
        'na', 'mā', 'no'
    ];

    const word_lower = word.toLowerCase();
    return nipata_words.includes(word_lower);
}

/**
 * Checks if a word belongs to स्वरादि class
 * @param {string} word - Word to check  
 * @param {Object} context - Context with semantic information
 * @returns {boolean} True if svaradi
 */
function isSvaradi(word, context) {
    // Check context classification
    if (context.type === 'svaradi' || context.word_class === 'svaradi') {
        return true;
    }

    // स्वरादि words (words beginning with स्वर् etc.)
    const svaradi_words = [
        'svar',      // स्वर् - heaven
        'punar',     // पुनर् - again
        'santar',    // सन्तर् - within
        'antar',     // अन्तर् - between/within
        'prātar',    // प्रातर् - morning
        'ciraṃ',     // चिरम् - long time
        'sāyam',     // सायम् - evening
        'sadyaḥ',    // सद्यः - immediately
        'śaśvat',    // शश्वत् - always
        'sanāt',     // सनात् - from old times
        'purā',      // पुरा - formerly
        'yugapat',   // युगपत् - simultaneously
        'ekadā',     // एकदा - once
        'kadā',      // कदा - when
        'tadā',      // तदा - then
        'yadā',      // यदा - when
        'sarvadā',   // सर्वदा - always
        'kadācit',   // कदाचित् - sometimes
        'muhur',     // मुहुर् - repeatedly
        'drāk',      // द्राक् - quickly
        'śīghram',   // शीघ्रम् - quickly
        'sahasā',    // सहसा - suddenly
        'akasmat'    // अकस्मात् - suddenly
    ];

    const word_lower = word.toLowerCase();
    
    // Check exact matches
    if (svaradi_words.includes(word_lower)) {
        return true;
    }

    // Check if word starts with known svaradi roots
    const svaradi_prefixes = ['svar', 'punar', 'antar', 'santar', 'prātar'];
    return svaradi_prefixes.some(prefix => word_lower.startsWith(prefix));
}

/**
 * Determines the specific category of avyaya
 * @param {string} word - The word to categorize
 * @param {Object} context - Context information
 * @returns {string} Category of avyaya
 */
function getAvyayaCategory(word, context) {
    if (isNipata(word, context)) {
        return 'nipata';
    }
    if (isSvaradi(word, context)) {
        return 'svaradi';
    }
    return 'unknown';
}

/**
 * Validates the indeclinable nature of a word
 * @param {string} word - Word to validate
 * @param {Object} context - Context with inflection information
 * @returns {Object} Validation result
 */
function validateAvyaya(word, context) {
    const is_avyaya = applySutra1_1_37(word, context).avyaya_status;
    
    return {
        is_avyaya,
        should_be_invariant: is_avyaya,
        category: getAvyayaCategory(word, context),
        explanation: is_avyaya ? 
            'Word should remain unchanged across all inflections' :
            'Word is not avyaya and may inflect normally'
    };
}

/**
 * Comprehensive test for sutra 1.1.37
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Test result
 */
function testSutra1_1_37(word, context) {
    const analysis = applySutra1_1_37(word, context);
    const validation = validateAvyaya(word, context);
    
    return {
        word,
        sutra: '1.1.37',
        analysis,
        validation,
        context,
        timestamp: new Date().toISOString()
    };
}

export {
    applySutra1_1_37,
    isNipata,
    isSvaradi,
    getAvyayaCategory,
    validateAvyaya,
    testSutra1_1_37
};
