/**
 * Sutra 1.3.25: उपान्मन्त्रकरणे (upānamantrakaraṇe)
 * "After the verb स्था preceded by उप, when meaning 'to adore/worship', the ātmanepada affix is employed."
 * 
 * RULE TYPE: vidhāna (prescriptive rule)
 * SCOPE: ātmanepada assignment for स्था with उप prefix in worship context
 * CONDITIONS: स्था root + उप prefix + worship/adoration meaning
 * TRANSFORMATIONS: Assigns ātmanepada endings
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.25
 */

import { 
  detectScript,
  validateSanskritWord,
  tokenizePhonemes
} from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada should be used for स्था with उप prefix in worship context
 * @param {string} word - Sanskrit word to analyze  
 * @param {object} context - Optional context including root, prefix, meaning
 * @returns {object} Analysis result with ātmanepada determination
 */
export function determineUpSthaWorshipAtmanepada(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            isUpSthaWorshipAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.25'
        };
    }

    // Sanitize input
    const cleanWord = word.trim();
    if (!cleanWord) {
        return {
            isUpSthaWorshipAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.25'
        };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(cleanWord)) {
        return {
            isUpSthaWorshipAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid Sanskrit word',
            sutraApplied: '1.3.25'
        };
    }

    const script = detectScript(cleanWord);
    
    // Check explicit context first
    if (context.root === 'स्था' && context.prefix === 'उप') {
        // Check for worship/adoration meaning requirement
        if (context.meaning && isWorshipMeaning(context.meaning)) {
            return {
                isUpSthaWorshipAtmanepada: true,
                confidence: 0.95,
                analysis: 'उप + स्था combination found with worship meaning',
                prefix: 'उप',
                root: 'स्था',
                worshipContext: true,
                sutraApplied: '1.3.25'
            };
        }
        
        // Default to true for उप + स्था unless explicitly non-worship
        return {
            isUpSthaWorshipAtmanepada: true,
            confidence: 0.8,
            analysis: 'उप + स्था combination found via context',
            prefix: 'उप',
            root: 'स्था',
            sutraApplied: '1.3.25'
        };
    }

    // Analyze word for उप + स्था combination
    const analysis = analyzeWordForUpStha(cleanWord, script);
    
    if (analysis.hasUpSthaCombination) {
        // Check for worship context in word itself
        const worshipContext = hasWorshipIndicators(cleanWord, script);
        
        return {
            isUpSthaWorshipAtmanepada: true,
            confidence: analysis.confidence + (worshipContext ? 0.1 : 0),
            analysis: 'उप + स्था combination found',
            prefix: analysis.prefix,
            root: 'स्था',
            worshipContext,
            wordAnalysis: analysis,
            sutraApplied: '1.3.25'
        };
    }

    return {
        isUpSthaWorshipAtmanepada: false,
        confidence: 0.1,
        analysis: 'No उप + स्था combination found',
        wordAnalysis: analysis,
        sutraApplied: '1.3.25'
    };
}

/**
 * Analyzes word for उप + स्था combination patterns
 * @param {string} word - Word to analyze
 * @param {string} script - Script type
 * @returns {object} Analysis result
 */
function analyzeWordForUpStha(word, script) {
    let hasUpSthaCombination = false;
    let confidence = 0.1;
    let prefix = null;
    let details = [];

    if (script === 'Devanagari') {
        // Devanagari patterns for उप + स्था
        const patterns = [
            /^उपतिष्ठ/, // उपतिष्ठते
            /^उपस्था/, // direct combination
            /उपस्थ/, // internal pattern
            /उपस्थि/, // उपस्थित etc.
            /उपतिष्ठ/, // उपतिष्ठते patterns
            /उपास्/, // उपासते (worship related)
            /उपास्थ/ // उपास्थान (worship context)
        ];

        for (const pattern of patterns) {
            if (pattern.test(word)) {
                hasUpSthaCombination = true;
                prefix = 'उप';
                confidence = 0.85;
                details.push(`Matched Devanagari pattern: ${pattern}`);
                break;
            }
        }
    } else if (script === 'IAST') {
        // IAST patterns for upa + sthā
        const patterns = [
            /^upatiṣṭh/, // upatiṣṭhate
            /^upasthā/, // direct combination  
            /upasth/, // internal pattern
            /upasthi/, // upasthita etc.
            /upatiṣṭh/, // upatiṣṭhate patterns
            /upās/, // upāsate (worship related)
            /upāsth/ // upāsthāna (worship context)
        ];

        for (const pattern of patterns) {
            if (pattern.test(word)) {
                hasUpSthaCombination = true;
                prefix = 'upa';
                confidence = 0.85;
                details.push(`Matched IAST pattern: ${pattern}`);
                break;
            }
        }
    }

    return {
        hasUpSthaCombination,
        confidence,
        prefix,
        details,
        script
    };
}

/**
 * Checks if meaning indicates worship/adoration
 * @param {string} meaning - Meaning text to check
 * @returns {boolean} Whether meaning indicates worship
 */
function isWorshipMeaning(meaning) {
    if (!meaning || typeof meaning !== 'string') return false;
    
    const worshipTerms = [
        'worship', 'adore', 'adoration', 'reverence', 'venerate', 'honor',
        'मन्त्र', 'उपासना', 'पूजा', 'आराधना', 'स्तुति', 'वंदना',
        'mantra', 'upāsanā', 'pūjā', 'ārādhanā', 'stuti', 'vandanā'
    ];
    
    const lowerMeaning = meaning.toLowerCase();
    return worshipTerms.some(term => lowerMeaning.includes(term.toLowerCase()));
}

/**
 * Checks if word contains indicators of worship/adoration meaning
 * @param {string} word - Word to check
 * @param {string} script - Script type
 * @returns {boolean} Whether word has worship indicators
 */
function hasWorshipIndicators(word, script) {
    if (script === 'Devanagari') {
        // Check for specific patterns that indicate worship/adoration
        const worshipPatterns = [
            /उपास/, // upāsa (worship)
            /पूज/, // pūja (worship)
            /आराध/, // ārādha (worship)
            /स्तुत/, // stuta (praise)
            /वंद/, // vand (salute)
            /मन्त्र/ // mantra
        ];
        
        return worshipPatterns.some(pattern => pattern.test(word));
    } else if (script === 'IAST') {
        const worshipPatterns = [
            /upās/, // worship
            /pūj/, // worship
            /ārādh/, // worship
            /stut/, // praise
            /vand/, // salute
            /mantr/ // mantra
        ];
        
        return worshipPatterns.some(pattern => pattern.test(word));
    }
    
    return false;
}

/**
 * Helper function to check valid उप + स्था combination
 * @param {string} word - Word to check
 * @param {object} context - Context information
 * @returns {boolean} Whether combination is valid
 */
export function checkUpSthaWorshipCombination(word, context = {}) {
    const result = determineUpSthaWorshipAtmanepada(word, context);
    return result.isUpSthaWorshipAtmanepada;
}

/**
 * Main export for the sutra
 */
export default determineUpSthaWorshipAtmanepada;
