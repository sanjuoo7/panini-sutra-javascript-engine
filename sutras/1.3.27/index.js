/**
 * Sutra 1.3.27: उद्विभ्यां तपः (udvibhyāṃ tapaḥ)
 * "After the root तप् 'to shine/heat', when preceded by उद् or वि and used intransitively, the ātmanepada affix is employed."
 * 
 * RULE TYPE: vidhāna (prescriptive rule)
 * SCOPE: ātmanepada assignment for तप् with उद्/वि prefixes (intransitive)
 * CONDITIONS: तप् root + उद्/वि prefix + intransitive usage
 * TRANSFORMATIONS: Assigns ātmanepada endings
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.27
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada should be used for तप् with उद्/वि prefixes (intransitive)
 * @param {string} word - Sanskrit word to analyze  
 * @param {object} context - Optional context including root, prefix, transitivity
 * @returns {object} Analysis result with ātmanepada determination
 */
export function determineUdViTapAtmanepada(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            isUdViTapAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.27'
        };
    }

    // Sanitize input
    const cleanWord = word.trim();
    if (!cleanWord) {
        return {
            isUdViTapAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.27'
        };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(cleanWord)) {
        return {
            isUdViTapAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid Sanskrit word',
            sutraApplied: '1.3.27'
        };
    }

    const script = detectScript(cleanWord);
    
    // Check explicit context first
    if (context.root === 'तप्' && (context.prefix === 'उद्' || context.prefix === 'वि')) {
        // Must be intransitive
        if (context.transitivity !== 'intransitive' && !context.isIntransitive) {
            return {
                isUdViTapAtmanepada: false,
                confidence: 0.8,
                analysis: 'उद्/वि + तप् found but not intransitive',
                requiresIntransitive: true,
                sutraApplied: '1.3.27'
            };
        }
        
        return {
            isUdViTapAtmanepada: true,
            confidence: 0.95,
            analysis: 'उद्/वि + तप् combination found with intransitive usage',
            prefix: context.prefix,
            root: 'तप्',
            transitivity: 'intransitive',
            sutraApplied: '1.3.27'
        };
    }

    // Analyze word for उद्/वि + तप् combination
    const analysis = analyzeWordForUdViTap(cleanWord, script);
    
    if (analysis.hasUdViTapCombination) {
        // Check for intransitive indicators
        const intransitiveContext = analyzeIntransitiveUsage(cleanWord, script, context);
        
        if (!intransitiveContext.isIntransitive && !context.isIntransitive) {
            return {
                isUdViTapAtmanepada: false,
                confidence: 0.7,
                analysis: 'उद्/वि + तप् found but intransitive usage not confirmed',
                wordAnalysis: analysis,
                intransitiveAnalysis: intransitiveContext,
                requiresIntransitive: true,
                sutraApplied: '1.3.27'
            };
        }
        
        return {
            isUdViTapAtmanepada: true,
            confidence: analysis.confidence + (intransitiveContext.isIntransitive ? 0.1 : 0),
            analysis: 'उद्/वि + तप् combination found with intransitive usage',
            prefix: analysis.prefix,
            root: 'तप्',
            transitivity: 'intransitive',
            wordAnalysis: analysis,
            intransitiveAnalysis: intransitiveContext,
            sutraApplied: '1.3.27'
        };
    }

    return {
        isUdViTapAtmanepada: false,
        confidence: 0.1,
        analysis: 'No उद्/वि + तप् combination found',
        wordAnalysis: analysis,
        sutraApplied: '1.3.27'
    };
}

/**
 * Analyzes word for उद्/वि + तप् combination patterns
 * @param {string} word - Word to analyze
 * @param {string} script - Script type
 * @returns {object} Analysis result
 */
function analyzeWordForUdViTap(word, script) {
    let hasUdViTapCombination = false;
    let confidence = 0.1;
    let prefix = null;
    let details = [];

    if (script === 'Devanagari') {
        // Devanagari patterns for उद्/वि + तप्
        const udPatterns = [
            /^उत्तप/, // उत्तपते
            /^उद्तप/, // with द्
            /उत्तप/, // internal
            /उत्ताप/, // उत्तापते
        ];

        const viPatterns = [
            /^वितप/, // वितपते
            /^वीतप/, // variant
            /वितप/, // internal
            /वीताप/, // वीतापते
        ];

        for (const pattern of udPatterns) {
            if (pattern.test(word)) {
                hasUdViTapCombination = true;
                prefix = 'उद्';
                confidence = 0.85;
                details.push(`Matched Devanagari उद् pattern: ${pattern}`);
                break;
            }
        }

        if (!hasUdViTapCombination) {
            for (const pattern of viPatterns) {
                if (pattern.test(word)) {
                    hasUdViTapCombination = true;
                    prefix = 'वि';
                    confidence = 0.85;
                    details.push(`Matched Devanagari वि pattern: ${pattern}`);
                    break;
                }
            }
        }

    } else if (script === 'IAST') {
        // IAST patterns for ud/vi + tap
        const udPatterns = [
            /^uttap/, // uttapate
            /^udtap/, // with d
            /uttap/, // internal
            /uttāp/, // uttāpate
        ];

        const viPatterns = [
            /^vitap/, // vitapate
            /^vītap/, // variant
            /vitap/, // internal
            /vītāp/, // vītāpate
        ];

        for (const pattern of udPatterns) {
            if (pattern.test(word)) {
                hasUdViTapCombination = true;
                prefix = 'ud';
                confidence = 0.85;
                details.push(`Matched IAST ud pattern: ${pattern}`);
                break;
            }
        }

        if (!hasUdViTapCombination) {
            for (const pattern of viPatterns) {
                if (pattern.test(word)) {
                    hasUdViTapCombination = true;
                    prefix = 'vi';
                    confidence = 0.85;
                    details.push(`Matched IAST vi pattern: ${pattern}`);
                    break;
                }
            }
        }
    }

    return {
        hasUdViTapCombination,
        confidence,
        prefix,
        details,
        script
    };
}

/**
 * Analyzes intransitive usage indicators
 * @param {string} word - Word to analyze
 * @param {string} script - Script type
 * @param {object} context - Context information
 * @returns {object} Intransitive analysis result
 */
function analyzeIntransitiveUsage(word, script, context) {
    let isIntransitive = false;
    let confidence = 0.1;
    let indicators = [];

    // Check explicit context
    if (context.transitivity === 'intransitive' || context.isIntransitive) {
        isIntransitive = true;
        confidence = 0.9;
        indicators.push('explicit intransitive context');
        return { isIntransitive, confidence, indicators };
    }

    // Check ātmanepada endings
    if (script === 'Devanagari') {
        const atmanepadaPatterns = [
            /ते$/, /से$/, /ए$/, /न्ते$/, /ध्वे$/, /महे$/
        ];

        for (const pattern of atmanepadaPatterns) {
            if (pattern.test(word)) {
                isIntransitive = true;
                confidence = 0.8;
                indicators.push('ātmanepada ending (suggests intransitive)');
                break;
            }
        }
    } else if (script === 'IAST') {
        const atmanepadaPatterns = [
            /te$/, /se$/, /e$/, /nte$/, /dhve$/, /mahe$/
        ];

        for (const pattern of atmanepadaPatterns) {
            if (pattern.test(word)) {
                isIntransitive = true;
                confidence = 0.8;
                indicators.push('ātmanepada ending (suggests intransitive)');
                break;
            }
        }
    }

    // Check meaning context for intransitive तप् usage
    if (context.meaning) {
        const intransitiveTapMeanings = [
            'shine', 'glow', 'heat up', 'become hot', 'blaze', 'be heated',
            'तप्', 'ताप', 'उष्ण', 'दीप्त', 'ज्वल्', 'शुष्क'
        ];

        const lowerMeaning = context.meaning.toLowerCase();
        for (const meaning of intransitiveTapMeanings) {
            if (lowerMeaning.includes(meaning.toLowerCase())) {
                confidence = Math.max(confidence, 0.6);
                indicators.push('intransitive meaning for तप्');
                if (!isIntransitive) {
                    isIntransitive = true;
                }
            }
        }
    }

    return {
        isIntransitive,
        confidence,
        indicators
    };
}

/**
 * Helper function to check valid उद्/वि + तप् combination
 * @param {string} word - Word to check
 * @param {object} context - Context information
 * @returns {boolean} Whether combination is valid
 */
export function checkUdViTapCombination(word, context = {}) {
    const result = determineUdViTapAtmanepada(word, context);
    return result.isUdViTapAtmanepada;
}

/**
 * Main export for the sutra
 */
export default determineUdViTapAtmanepada;
