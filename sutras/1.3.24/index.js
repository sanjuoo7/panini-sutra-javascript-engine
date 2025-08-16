/**
 * Sutra 1.3.24: उदोऽनूर्द्ध्वकर्मणि (udo'nūrdhvakarmaṇi)
 * "After the verb स्था preceded by उद्, when not meaning 'to rise up or get up', the ātmanepada affix is employed."
 * 
 * RULE TYPE: vidhāna (prescriptive rule)
 * SCOPE: ātmanepada assignment for स्था with उद् prefix
 * CONDITIONS: स्था root + उद् prefix + semantic exclusion for rising/getting up
 * TRANSFORMATIONS: Assigns ātmanepada endings
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.24
 */

import { 
  detectScript,
  validateSanskritWord,
  tokenizePhonemes
} from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada should be used for स्था with उद् prefix
 * @param {string} word - Sanskrit word to analyze  
 * @param {object} context - Optional context including root, prefix, meaning
 * @returns {object} Analysis result with ātmanepada determination
 */
export function determineUdSthaAtmanepada(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            isUdSthaAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.24'
        };
    }

    // Sanitize input
    const cleanWord = word.trim();
    if (!cleanWord) {
        return {
            isUdSthaAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.24'
        };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(cleanWord)) {
        return {
            isUdSthaAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid Sanskrit word',
            sutraApplied: '1.3.24'
        };
    }

    const script = detectScript(cleanWord);
    
    // Check explicit context first
    if (context.root === 'स्था' && context.prefix === 'उद्') {
        // Check for exclusion - rising/getting up meaning
        if (context.meaning && isRisingMeaning(context.meaning)) {
            return {
                isUdSthaAtmanepada: false,
                confidence: 0.9,
                analysis: 'Excluded: rising/getting up meaning',
                exclusion: 'अनूर्द्ध्वकर्मणि',
                sutraApplied: '1.3.24'
            };
        }
        
        return {
            isUdSthaAtmanepada: true,
            confidence: 0.9,
            analysis: 'उद् + स्था combination found via context',
            prefix: 'उद्',
            root: 'स्था',
            sutraApplied: '1.3.24'
        };
    }

    // Analyze word for उद् + स्था combination
    const analysis = analyzeWordForUdStha(cleanWord, script);
    
    if (analysis.hasUdSthaCombination) {
        // Check for semantic exclusion in word itself
        if (hasRisingIndicators(cleanWord, script)) {
            return {
                isUdSthaAtmanepada: false,
                confidence: 0.8,
                analysis: 'Excluded: contains rising/getting up indicators',
                exclusion: 'अनूर्द्ध्वकर्मणि',
                wordAnalysis: analysis,
                sutraApplied: '1.3.24'
            };
        }

        return {
            isUdSthaAtmanepada: true,
            confidence: analysis.confidence,
            analysis: 'उद् + स्था combination found',
            prefix: analysis.prefix,
            root: 'स्था',
            wordAnalysis: analysis,
            sutraApplied: '1.3.24'
        };
    }

    return {
        isUdSthaAtmanepada: false,
        confidence: 0.1,
        analysis: 'No उद् + स्था combination found',
        wordAnalysis: analysis,
        sutraApplied: '1.3.24'
    };
}

/**
 * Analyzes word for उद् + स्था combination patterns
 * @param {string} word - Word to analyze
 * @param {string} script - Script type
 * @returns {object} Analysis result
 */
function analyzeWordForUdStha(word, script) {
    let hasUdSthaCombination = false;
    let confidence = 0.1;
    let prefix = null;
    let details = [];

    if (script === 'Devanagari') {
        // Devanagari patterns for उद् + स्था
        const patterns = [
            /^उत्तिष्ठ/, // उत्तिष्ठते
            /^उत्स्था/, // direct combination
            /^उद्स्था/, // with द्
            /उत्स्थ/, // internal pattern
            /उत्स्थि/, // उत्स्थित etc.
            /उत्तिष्ठ/ // उत्तिष्ठते, उत्तिष्ठति patterns
        ];

        for (const pattern of patterns) {
            if (pattern.test(word)) {
                hasUdSthaCombination = true;
                prefix = 'उद्';
                confidence = 0.85;
                details.push(`Matched Devanagari pattern: ${pattern}`);
                break;
            }
        }
    } else if (script === 'IAST') {
        // IAST patterns for ud + sthā
        const patterns = [
            /^uttiṣṭh/, // uttiṣṭhate
            /^utsthā/, // direct combination  
            /^udsthā/, // with d
            /utsth/, // internal pattern
            /utsthi/, // utsthita etc.
            /uttiṣṭh/ // uttiṣṭhate patterns
        ];

        for (const pattern of patterns) {
            if (pattern.test(word)) {
                hasUdSthaCombination = true;
                prefix = 'ud';
                confidence = 0.85;
                details.push(`Matched IAST pattern: ${pattern}`);
                break;
            }
        }
    }

    return {
        hasUdSthaCombination,
        confidence,
        prefix,
        details,
        script
    };
}

/**
 * Checks if meaning indicates rising/getting up (exclusion)
 * @param {string} meaning - Meaning text to check
 * @returns {boolean} Whether meaning indicates exclusion
 */
function isRisingMeaning(meaning) {
    if (!meaning || typeof meaning !== 'string') return false;
    
    const risingTerms = [
        'rise', 'rising', 'get up', 'getting up', 'stand up', 'standing up',
        'उत्थान', 'उत्पत्ति', 'ऊर्ध्व', 'ऊपर', 'उपर', 'उत्थित',
        'utthāna', 'utpatti', 'ūrdhva'
    ];
    
    const lowerMeaning = meaning.toLowerCase();
    return risingTerms.some(term => lowerMeaning.includes(term.toLowerCase()));
}

/**
 * Checks if word contains indicators of rising/getting up meaning
 * @param {string} word - Word to check
 * @param {string} script - Script type
 * @returns {boolean} Whether word has rising indicators
 */
function hasRisingIndicators(word, script) {
    if (script === 'Devanagari') {
        // Check for specific patterns that indicate rising/getting up
        const risingPatterns = [
            /उत्थान/, // utthāna (rising)
            /ऊर्ध्व/, // ūrdhva (upward)
            /उत्पत्/, // utpat (flying up)
        ];
        
        return risingPatterns.some(pattern => pattern.test(word));
    } else if (script === 'IAST') {
        const risingPatterns = [
            /utthāna/, // rising
            /ūrdhva/, // upward
            /utpat/, // flying up
        ];
        
        return risingPatterns.some(pattern => pattern.test(word));
    }
    
    return false;
}

/**
 * Helper function to check valid उद् + स्था combination
 * @param {string} word - Word to check
 * @param {object} context - Context information
 * @returns {boolean} Whether combination is valid
 */
export function checkUdSthaCombination(word, context = {}) {
    const result = determineUdSthaAtmanepada(word, context);
    return result.isUdSthaAtmanepada;
}

/**
 * Main export for the sutra
 */
export default determineUdSthaAtmanepada;
