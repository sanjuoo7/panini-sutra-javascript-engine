/**
 * Sutra 1.1.49: षष्ठी स्थानेयोगा
 * ṣaṣṭhī sthāneyogā
 * "The genitive case (sixth case) has the force of 'in the place of'"
 * 
 * This sutra establishes a fundamental paribhasha (interpretive rule) that governs
 * how the genitive case (षष्ठी विभक्ति) should be interpreted in grammatical rules.
 * When a term appears in the genitive case in a sutra, it should be understood
 * as indicating substitution - meaning "in the place of".
 * 
 * This is crucial for understanding the interpretation of many grammatical rules
 * where substitution operations are described using the genitive case.
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';
const { genitivePatterns, substitutionTypes } = SanskritWordLists;

/**
 * Main function to apply Sutra 1.1.49
 * @param {string} genitiveExpression - Expression in genitive case
 * @param {Object} context - Additional context for analysis
 * @returns {Object} Analysis result showing substitution interpretation
 */
export function applySutra1_1_49(genitiveExpression, context = {}) {
    // Input validation
    if (typeof genitiveExpression !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: genitiveExpression must be a string'
        };
    }

    // Normalize input
    const normalized_expression = genitiveExpression.trim();

    if (normalized_expression.length === 0) {
        return {
            applies: false,
            reason: 'Empty expression after normalization'
        };
    }

    // Analyze the genitive expression
    const genitiveAnalysis = analyzeGenitiveExpression(normalized_expression, context);
    
    // Apply the paribhasha interpretation
    const substitutionInterpretation = interpretAsSubstitution(genitiveAnalysis, context);

    return {
        applies: true,
        original_expression: genitiveExpression,
        normalized_expression: normalized_expression,
        genitive_analysis: genitiveAnalysis,
        substitution_interpretation: substitutionInterpretation,
        paribhasha_type: 'case_interpretation',
        grammatical_function: 'substitution_indicator',
        source: 'sutra_1_1_49'
    };
}

/**
 * Analyzes a genitive expression to determine its grammatical structure
 * @param {string} expression - Genitive expression to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Analysis of genitive expression
 */
function analyzeGenitiveExpression(expression, context = {}) {
    // Common genitive endings in Sanskrit (as array to ensure length-based matching)
    const genitivePatternsData = genitivePatterns;

    // Find matching genitive pattern
    let matchedPattern = null;
    let stem = expression;
    
    for (const pattern of genitivePatternsData) {
        if (expression.endsWith(pattern.ending)) {
            matchedPattern = pattern;
            stem = expression.substring(0, expression.length - pattern.ending.length);
            break;
        }
    }

    return {
        full_expression: expression,
        stem: stem,
        genitive_ending: matchedPattern ? matchedPattern.ending : null,
        grammatical_info: matchedPattern || null,
        is_genitive: matchedPattern !== null,
        case_analysis: {
            case: 'genitive',
            case_number: 6,
            vibhakti: 'षष्ठी',
            force: 'substitution_indicator'
        }
    };
}

/**
 * Interprets a genitive expression according to the paribhasha
 * @param {Object} genitiveAnalysis - Analyzed genitive expression
 * @param {Object} context - Interpretation context
 * @returns {Object} Substitution interpretation
 */
function interpretAsSubstitution(genitiveAnalysis, context = {}) {
    if (!genitiveAnalysis.is_genitive) {
        return {
            interpretation_type: 'non_genitive',
            substitution_force: 'none',
            explanation: 'Expression does not appear to be in genitive case'
        };
    }

    const stem = genitiveAnalysis.stem;
    const interpretationType = determineSubstitutionType(stem, context);

    return {
        interpretation_type: 'sthane_yoga',
        original_stem: stem,
        substitution_force: 'in_place_of',
        meaning: `In the place of ${stem}`,
        explanation: `The genitive ${genitiveAnalysis.full_expression} indicates substitution - something replaces ${stem}`,
        grammatical_process: interpretationType.process,
        substitution_context: interpretationType.context,
        paribhasha_application: 'षष्ठी स्थानेयोगा applies'
    };
}

/**
 * Determines the type of substitution based on context
 * @param {string} stem - Stem of the genitive expression
 * @param {Object} context - Substitution context
 * @returns {Object} Substitution type information
 */
function determineSubstitutionType(stem, context = {}) {
    // Common substitution contexts in Sanskrit grammar
    const substitutionTypesData = substitutionTypes;

    // Determine type based on stem characteristics and context
    let substitutionType = 'general';
    
    // Check context first
    if (context.grammatical_category === 'affix') {
        substitutionType = 'affix';
    } else if (context.grammatical_category === 'root') {
        substitutionType = 'morpheme';
    } else if (context.grammatical_category === 'phoneme' || stem.length <= 2) {
        substitutionType = 'phoneme';
    } else if (context.level === 'word') {
        substitutionType = 'word';
    } else if (stem.length === 1) {
        substitutionType = 'phoneme';
    }

    return substitutionTypesData[substitutionType] || {
        process: 'general_substitution',
        context: 'grammatical_replacement',
        description: 'General substitution process'
    };
}

/**
 * Applies the paribhasha to interpret a grammatical rule
 * @param {string} sutraText - Text of the sutra containing genitive expressions
 * @param {Object} options - Interpretation options
 * @returns {Object} Interpreted rule
 */
export function interpretSutraWithParibhasha(sutraText, options = {}) {
    // Split text into words and identify genitive expressions
    const words = sutraText.split(/\s+/);
    const interpretations = [];
    
    for (const word of words) {
        const analysis = applySutra1_1_49(word, options);
        if (analysis.applies && analysis.genitive_analysis.is_genitive) {
            interpretations.push({
                word: word,
                interpretation: analysis.substitution_interpretation,
                force: 'substitution'
            });
        } else {
            interpretations.push({
                word: word,
                interpretation: null,
                force: 'literal'
            });
        }
    }

    return {
        original_sutra: sutraText,
        word_interpretations: interpretations,
        substitution_count: interpretations.filter(i => i.force === 'substitution').length,
        paribhasha_applied: 'षष्ठी स्थानेयोगा'
    };
}

/**
 * Validates whether a genitive usage follows the paribhasha
 * @param {string} genitiveForm - Genitive form to validate
 * @param {string} expectedMeaning - Expected substitution meaning
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export function validateGenitiveUsage(genitiveForm, expectedMeaning, context = {}) {
    const analysis = applySutra1_1_49(genitiveForm, context);
    
    if (!analysis.applies) {
        return {
            is_valid: false,
            reason: analysis.reason
        };
    }

    const interpretation = analysis.substitution_interpretation;
    const expectedSubstitution = `In the place of ${expectedMeaning}`;
    const matches = interpretation.meaning === expectedSubstitution;

    return {
        is_valid: matches,
        genitive_form: genitiveForm,
        interpreted_meaning: interpretation.meaning,
        expected_meaning: expectedSubstitution,
        substitution_force: interpretation.substitution_force,
        reasoning: matches ? 
            `Correct: ${genitiveForm} properly indicates substitution` :
            `Interpretation mismatch: expected ${expectedSubstitution}`,
        paribhasha_compliance: matches ? 'compliant' : 'needs_review'
    };
}

/**
 * Analyzes the scope of genitive substitution in a grammatical context
 * @param {Array} genitiveExpressions - Array of genitive expressions
 * @param {Object} context - Grammatical context
 * @returns {Object} Scope analysis
 */
export function analyzeSubstitutionScope(genitiveExpressions, context = {}) {
    const analyses = genitiveExpressions.map(expr => applySutra1_1_49(expr, context));
    const validGenitives = analyses.filter(a => a.applies && a.genitive_analysis.is_genitive);
    
    return {
        total_expressions: genitiveExpressions.length,
        valid_genitives: validGenitives.length,
        substitution_patterns: validGenitives.map(a => ({
            expression: a.original_expression,
            stem: a.genitive_analysis.stem,
            substitution_type: a.substitution_interpretation.grammatical_process
        })),
        overall_substitution_force: validGenitives.length > 0 ? 'active' : 'inactive',
        paribhasha_scope: `षष्ठी स्थानेयोगा applies to ${validGenitives.length} expressions`
    };
}
