/**
 * Sutra 1.3.26: अकर्मकाच्च (akarmakācca)
 * "And (ātmanepada is used) when (the verb) is intransitive."
 * 
 * RULE TYPE: vidhāna (prescriptive rule)
 * SCOPE: extends ātmanepada assignment for intransitive verbs
 * CONDITIONS: extends previous rules (1.3.24-1.3.25) to intransitive usage
 * TRANSFORMATIONS: Assigns ātmanepada endings for intransitive constructions
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.26
 */

import { 
  detectScript,
  validateSanskritWord,
  tokenizePhonemes
} from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada should be used for intransitive constructions
 * @param {string} word - Sanskrit word to analyze  
 * @param {object} context - Optional context including transitivity, meaning, root
 * @returns {object} Analysis result with ātmanepada determination
 */
export function determineIntransitiveAtmanepada(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            isIntransitiveAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.26'
        };
    }

    // Sanitize input
    const cleanWord = word.trim();
    if (!cleanWord) {
        return {
            isIntransitiveAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid input',
            sutraApplied: '1.3.26'
        };
    }

    // Validate Sanskrit word
    if (!validateSanskritWord(cleanWord)) {
        return {
            isIntransitiveAtmanepada: false,
            confidence: 0,
            analysis: 'Invalid Sanskrit word',
            sutraApplied: '1.3.26'
        };
    }

    const script = detectScript(cleanWord);
    
    // Check explicit context first
    if (context.transitivity === 'intransitive' || context.isIntransitive) {
        // Check if it's related to previous sutras (उद्/उप + स्था)
        if (context.root === 'स्था' && (context.prefix === 'उद्' || context.prefix === 'उप')) {
            return {
                isIntransitiveAtmanepada: true,
                confidence: 0.95,
                analysis: 'Intransitive usage with previous sutra context',
                transitivity: 'intransitive',
                extendsPreviousRule: true,
                sutraApplied: '1.3.26'
            };
        }
        
        // General intransitive context
        return {
            isIntransitiveAtmanepada: true,
            confidence: 0.85,
            analysis: 'Intransitive usage indicated',
            transitivity: 'intransitive',
            sutraApplied: '1.3.26'
        };
    }

    // Analyze word for intransitive patterns
    const analysis = analyzeWordForIntransitivity(cleanWord, script, context);
    
    if (analysis.isIntransitive) {
        return {
            isIntransitiveAtmanepada: true,
            confidence: analysis.confidence,
            analysis: 'Intransitive construction detected',
            transitivity: 'intransitive',
            wordAnalysis: analysis,
            sutraApplied: '1.3.26'
        };
    }

    return {
        isIntransitiveAtmanepada: false,
        confidence: 0.1,
        analysis: 'No clear intransitive construction found',
        wordAnalysis: analysis,
        sutraApplied: '1.3.26'
    };
}

/**
 * Analyzes word for intransitive construction patterns
 * @param {string} word - Word to analyze
 * @param {string} script - Script type
 * @param {object} context - Additional context
 * @returns {object} Analysis result
 */
function analyzeWordForIntransitivity(word, script, context) {
    let isIntransitive = false;
    let confidence = 0.1;
    let indicators = [];
    let details = [];

    // Check for intransitive verbal endings
    if (script === 'Devanagari') {
        // Devanagari intransitive patterns
        const intransitivePatterns = [
            /ते$/, // ātmanepada 3rd person endings
            /से$/, // ātmanepada 2nd person endings
            /ए$/, // ātmanepada 1st person endings
            /न्ते$/, // ātmanepada plural endings
            /ध्वे$/, // ātmanepada 2nd person plural
            /महे$/, // ātmanepada 1st person plural
            /त्ते$/, // specific ātmanepada forms
            /स्व$/, // intransitive participle endings
            /न्त$/, // participle forms that can be intransitive
        ];

        for (const pattern of intransitivePatterns) {
            if (pattern.test(word)) {
                isIntransitive = true;
                confidence = Math.max(confidence, 0.7);
                indicators.push('ātmanepada ending pattern');
                details.push(`Matched Devanagari pattern: ${pattern}`);
                break;
            }
        }

        // Check for specific intransitive constructions
        const intransitiveRoots = [
            /स्था/, /गम्/, /पत्/, /श्री/, /वृध्/, /क्षि/, /नश्/, /मुद्/
        ];

        for (const root of intransitiveRoots) {
            if (root.test(word)) {
                confidence = Math.max(confidence, 0.6);
                indicators.push('potentially intransitive root');
                details.push(`Found root pattern: ${root}`);
            }
        }

    } else if (script === 'IAST') {
        // IAST intransitive patterns
        const intransitivePatterns = [
            /te$/, // ātmanepada 3rd person
            /se$/, // ātmanepada 2nd person
            /e$/, // ātmanepada 1st person
            /nte$/, // ātmanepada plural
            /dhve$/, // ātmanepada 2nd person plural
            /mahe$/, // ātmanepada 1st person plural
            /tte$/, // specific ātmanepada forms
        ];

        for (const pattern of intransitivePatterns) {
            if (pattern.test(word)) {
                isIntransitive = true;
                confidence = Math.max(confidence, 0.7);
                indicators.push('ātmanepada ending pattern');
                details.push(`Matched IAST pattern: ${pattern}`);
                break;
            }
        }

        // Check for intransitive root patterns
        const intransitiveRoots = [
            /sthā/, /gam/, /pat/, /śrī/, /vṛdh/, /kṣi/, /naś/, /mud/
        ];

        for (const root of intransitiveRoots) {
            if (root.test(word)) {
                confidence = Math.max(confidence, 0.6);
                indicators.push('potentially intransitive root');
                details.push(`Found root pattern: ${root}`);
            }
        }
    }

    // Check meaning context for intransitive indicators
    if (context.meaning) {
        const intransitiveMeanings = [
            'become', 'remain', 'stay', 'exist', 'appear', 'shine', 'grow',
            'fall', 'go', 'come', 'rise', 'flourish', 'rejoice',
            'भू', 'स्था', 'गम्', 'पत्', 'श्री', 'वृध्', 'आस्', 'तिष्ठ्'
        ];

        const lowerMeaning = context.meaning.toLowerCase();
        for (const meaning of intransitiveMeanings) {
            if (lowerMeaning.includes(meaning.toLowerCase())) {
                confidence = Math.max(confidence, 0.6);
                indicators.push('intransitive meaning context');
                details.push(`Found intransitive meaning: ${meaning}`);
            }
        }
    }

    return {
        isIntransitive,
        confidence,
        indicators,
        details,
        script
    };
}

/**
 * Checks if construction is clearly intransitive
 * @param {string} word - Word to check
 * @param {object} context - Context information
 * @returns {boolean} Whether construction is intransitive
 */
export function isIntransitiveConstruction(word, context = {}) {
    const result = determineIntransitiveAtmanepada(word, context);
    return result.isIntransitiveAtmanepada;
}

/**
 * Helper function to extend previous sutra rules with intransitive condition
 * @param {string} word - Word to check
 * @param {object} context - Context from previous sutras
 * @returns {object} Analysis extending previous rules
 */
export function extendWithIntransitive(word, context = {}) {
    const intransitiveResult = determineIntransitiveAtmanepada(word, {
        ...context,
        transitivity: 'intransitive'
    });

    return {
        ...intransitiveResult,
        extendsRule: true,
        originalContext: context
    };
}

/**
 * Main export for the sutra
 */
export default determineIntransitiveAtmanepada;
