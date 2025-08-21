// Sutra 1.2.62: विशाखयोश्च (viśākhayoś ca) - Comprehensive Implementation
// Sanskrit Sutra: विशाखयोश्च
// Translation: And also of Viśākhā (in the dual) - extends chandas optionality to Viśākhā nakshatra
// Domain: Vedic Prosody and Optional Singular-Dual Number in Metrical Contexts

// Import dependencies for comprehensive analysis and legacy compatibility
import { applySutra1_2_62 as utilitySutra1_2_62 } from '../sanskrit-utils/number-determination.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

/**
 * Applies Sutra 1.2.62: विशाखयोश्च
 * Determines optional singular representation for Viśākhā dual star in chandas contexts
 */
export function sutra_1_2_62(input, context) {
    // Phase 1: Input Validation and Normalization
    const result = createSutraResult('1.2.62', input, 'विशाखयोश्च');
    
    if (!validateSanskritInput(input)) {
        return Object.assign(result, {
            applied: false,
            reason: 'invalid_input',
            explanation: 'Input must be a valid non-empty Sanskrit term',
            confidence: 0
        });
    }
    
    const contextValidation = validateContext(context);
    if (!contextValidation.isValid) {
        return Object.assign(result, {
            applied: false,
            reason: 'invalid_context',
            explanation: contextValidation.reasons.join('; '),
            confidence: 0
        });
    }
    
    const normalizedInput = normalizeInput(input);
    logDebug(context, `1.2.62: Processing normalized input: ${normalizedInput}`);
    
    // Phase 2: Chandas Context Verification
    const chandasAnalysis = analyzeChandasContext(normalizedInput, context);
    if (!chandasAnalysis.validChandas) {
        return Object.assign(result, {
            applied: false,
            reason: chandasAnalysis.reason,
            explanation: chandasAnalysis.explanation,
            confidence: 0,
            chandasAnalysis
        });
    }
    
    // Phase 3: Nakshatra Domain Validation
    const domainAnalysis = validateNakshatraDomain(normalizedInput, context);
    if (!domainAnalysis.validDomain) {
        return Object.assign(result, {
            applied: false,
            reason: domainAnalysis.reason,
            explanation: domainAnalysis.explanation,
            confidence: 0,
            domainAnalysis
        });
    }
    
    // Phase 4: Viśākhā Star Recognition
    const visakhayaAnalysis = analyzeVisakhayaStar(normalizedInput, context);
    if (!visakhayaAnalysis.isVisakha) {
        return Object.assign(result, {
            applied: false,
            reason: visakhayaAnalysis.reason,
            explanation: visakhayaAnalysis.explanation,
            confidence: 0,
            visakhayaAnalysis
        });
    }
    
    // Phase 5: Metrical Constraint Analysis
    const metricalAnalysis = analyzeMetricalConstraints(normalizedInput, context, chandasAnalysis);
    
    // Phase 6: Optional Number Determination
    const numberAnalysis = determineOptionalNumber(normalizedInput, context, visakhayaAnalysis, metricalAnalysis);
    
    // Phase 7: Prior Result Integration
    const integrationAnalysis = integratePriorResults(context, numberAnalysis);
    
    // Phase 8: Final Application Decision
    return finalizeApplication(result, {
        chandasAnalysis,
        domainAnalysis,
        visakhayaAnalysis,
        metricalAnalysis,
        numberAnalysis,
        integrationAnalysis,
        normalizedInput,
        context,
        contextValidation
    });
}

// === UTILITY FUNCTIONS ===

function createSutraResult(sutraId, input, sanskritText) {
    return {
        sutra: sutraId,
        input: input,
        sanskritText: sanskritText,
        applied: false,
        timestamp: new Date().toISOString()
    };
}

function validateSanskritInput(input) {
    return input !== null && input !== undefined && 
           typeof input === 'string' && input.trim().length > 0;
}

function validateContext(context) {
    if (!context) {
        return {
            isValid: false,
            reasons: ['Context is required for Sutra 1.2.62 analysis'],
            chandasContext: false
        };
    }
    
    const validation = {
        isValid: true,
        reasons: [],
        chandasContext: false
    };
    
    // Check if this is explicitly chandas context
    if (context.type === 'chandas' || context.domain === 'vedic' || 
        context.metrical || context.meter || context.chandas) {
        validation.chandasContext = true;
    }
    
    // Warn about required context for optimal analysis
    if (!validation.chandasContext) {
        validation.reasons.push('No explicit chandas context detected - analysis may be incomplete');
    }
    
    return validation;
}

function normalizeInput(input) {
    return input.trim().toLowerCase();
}

function logDebug(context, message) {
    if (context.debug) {
        console.log(`[DEBUG] ${message}`);
    }
}

function analyzeChandasContext(input, context) {
    const analysis = {
        validChandas: false,
        contextType: null,
        metricalFeatures: {},
        reason: null,
        explanation: ''
    };
    
    if (!context || !context.chandas) {
        analysis.reason = 'missing_chandas_flag';
        analysis.explanation = 'Sutra 1.2.62 requires chandas (Vedic/metrical) context flag';
        return analysis;
    }
    
    if (context.metrical) {
        analysis.contextType = 'explicit_metrical';
        analysis.metricalFeatures = context.metrical;
    } else if (context.vedic) {
        analysis.contextType = 'vedic_context';
    } else if (context.chandas === true) {
        analysis.contextType = 'basic_chandas';
    }
    
    if (context.chandas === false) {
        analysis.reason = 'chandas_explicitly_false';
        analysis.explanation = 'Chandas context explicitly disabled';
        return analysis;
    }
    
    analysis.validChandas = true;
    analysis.explanation = `Valid chandas context detected: ${analysis.contextType}`;
    
    // Extract metrical features if available
    if (context.meter) {
        analysis.metricalFeatures.meter = context.meter;
    }
    if (context.metrical && context.metrical.meter) {
        analysis.metricalFeatures.meter = context.metrical.meter;
    }
    
    return analysis;
}

function validateNakshatraDomain(input, context) {
    const analysis = {
        validDomain: false,
        domainType: null,
        astronomicalContext: false,
        reason: null,
        explanation: ''
    };
    
    // Check for explicit nakshatra domain
    if (context.domain === 'nakshatra') {
        analysis.validDomain = true;
        analysis.domainType = 'explicit_domain';
    } else if (context.semanticCategory === 'nakshatra') {
        analysis.validDomain = true;
        analysis.domainType = 'semantic_category';
    } else if (context.astronomical) {
        analysis.validDomain = true;
        analysis.domainType = 'astronomical_context';
        analysis.astronomicalContext = true;
    }
    
    if (!analysis.validDomain) {
        analysis.reason = 'invalid_domain';
        analysis.explanation = 'Sutra 1.2.62 requires nakshatra/astronomical domain context';
        return analysis;
    }
    
    analysis.explanation = `Valid nakshatra domain: ${analysis.domainType}`;
    return analysis;
}

function analyzeVisakhayaStar(input, context) {
    const analysis = {
        isVisakha: false,
        recognitionType: null,
        confidence: 0,
        scriptForm: 'unknown',
        scriptMatch: 'unknown',
        formVariants: [],
        reason: null,
        explanation: ''
    };
    
    const normalizedInput = input.toLowerCase().trim();
    
    // Define comprehensive Viśākhā patterns
    const visakhayaPatterns = {
        iast: [
            'viśākhā', 'viśākha', 'viśākhāḥ', 'viśākhe', 'viśākhayoḥ',
            'viśākhāyāḥ', 'viśākhāyām', 'viśākhābhyām'
        ],
        devanagari: [
            'विशाखा', 'विशाखाः', 'विशाखे', 'विशाखयोः',
            'विशाखायाः', 'विशाखायाम्', 'विशाखाभ्याम्'
        ],
        romanized: [
            'vishakha', 'visaakha', 'vishakhaa', 'vishākha', 'visākha',
            'vishākhā', 'visakha', 'visakhaa', 'vishakaa'
        ],
        mixed: [
            'viśāखा', 'विशākhā', 'viशाkhā', 'viśāखा', 'विśākha'
        ],
        partial: [
            'viśākh', 'vishak', 'विशाख', 'visakh', 'viśāk'
        ]
    };
    
    // Check exact matches first (highest confidence)
    for (const [scriptType, patterns] of Object.entries(visakhayaPatterns)) {
        if (scriptType === 'partial') continue;
        
        for (const pattern of patterns) {
            if (normalizedInput === pattern.toLowerCase()) {
                analysis.isVisakha = true;
                analysis.recognitionType = `exact_${scriptType}`;
                analysis.confidence = scriptType === 'mixed' ? 0.85 : 0.95;
                analysis.scriptForm = scriptType;
                analysis.scriptMatch = scriptType;
                analysis.formVariants.push(pattern);
                analysis.explanation = `Exact ${scriptType} match for Viśākhā: ${pattern}`;
                return analysis;
            }
        }
    }
    
    // Check partial matches (lower confidence)
    for (const pattern of visakhayaPatterns.partial) {
        if (normalizedInput === pattern.toLowerCase()) {
            analysis.isVisakha = true;
            analysis.recognitionType = 'partial_match';
            analysis.confidence = 0.55;
            analysis.scriptForm = 'mixed';
            analysis.scriptMatch = 'partial';
            analysis.formVariants.push(pattern);
            analysis.explanation = `Partial match for Viśākhā: ${pattern}`;
            return analysis;
        }
    }
    
    // Check fuzzy matches for common variations
    const fuzzyPatterns = [
        { pattern: /vi[śs][āa]kh[āa]?/i, confidence: 0.8, type: 'fuzzy_iast' },
        { pattern: /विशाख/i, confidence: 0.8, type: 'fuzzy_devanagari' },
        { pattern: /vish?[āa]?kh?[āa]?/i, confidence: 0.6, type: 'fuzzy_romanized' }
    ];
    
    for (const fuzzy of fuzzyPatterns) {
        if (fuzzy.pattern.test(normalizedInput)) {
            analysis.isVisakha = true;
            analysis.recognitionType = fuzzy.type;
            analysis.confidence = fuzzy.confidence;
            analysis.scriptForm = 'fuzzy';
            analysis.scriptMatch = fuzzy.type.split('_')[1];
            analysis.formVariants.push(normalizedInput);
            analysis.explanation = `Fuzzy match for Viśākhā using ${fuzzy.type} pattern`;
            return analysis;
        }
    }
    
    // No match found
    analysis.reason = 'not_visakha_star';
    analysis.explanation = `Input "${input}" is not recognized as Viśākhā nakshatra`;
    return analysis;
}

function analyzeMetricalConstraints(input, context, chandasAnalysis) {
    const analysis = {
        metricalCompatibility: true,
        prosodyAnalysis: {},
        constraints: [],
        flexibility: 1.0,
        recommendations: []
    };
    
    // Check multiple sources for meter information
    let meter = null;
    if (chandasAnalysis.metricalFeatures.meter) {
        meter = chandasAnalysis.metricalFeatures.meter;
    } else if (context.meter) {
        meter = context.meter;
    } else if (context.metrical && context.metrical.meter) {
        meter = context.metrical.meter;
    }
    
    if (meter) {
        analysis.prosodyAnalysis.meter = meter;
        
        const meterConstraints = {
            'gayatri': { syllables: 24, flexibility: 0.9 },
            'trishtubh': { syllables: 44, flexibility: 0.8 },
            'jagati': { syllables: 48, flexibility: 0.8 },
            'anushtubh': { syllables: 32, flexibility: 0.7 },
            'brihati': { syllables: 36, flexibility: 0.8 }
        };
        
        if (meterConstraints[meter.toLowerCase()]) {
            const constraint = meterConstraints[meter.toLowerCase()];
            analysis.constraints.push(`Meter ${meter} suggests ${constraint.syllables} syllables`);
            analysis.flexibility = constraint.flexibility;
        }
    }
    
    const syllableAnalysis = analyzeVisakhayaSyllables(input);
    analysis.prosodyAnalysis.syllables = syllableAnalysis;
    
    if (syllableAnalysis.count >= 4) {
        analysis.recommendations.push('Longer forms favor dual interpretation in metrical contexts');
    } else {
        analysis.recommendations.push('Shorter forms may prefer singular in compressed meter');
    }
    
    return analysis;
}

function analyzeVisakhayaSyllables(input) {
    // Basic syllable estimation for Viśākhā forms
    const syllablePatterns = {
        'viśākhā': { count: 4, pattern: 'vi-śā-khā' },
        'विशाखा': { count: 4, pattern: 'वि-शा-खा' },
        'vishakha': { count: 4, pattern: 'vi-sha-kha' },
        'viśākhe': { count: 4, pattern: 'vi-śā-khe' }
    };
    
    const normalized = input.toLowerCase().trim();
    if (syllablePatterns[normalized]) {
        return syllablePatterns[normalized];
    }
    
    // Estimate based on length and vowel count
    const vowelCount = (normalized.match(/[aeiouāīūṛḷēō]/g) || []).length;
    if (vowelCount > 0) {
        return { count: Math.max(vowelCount, 3), pattern: 'estimated-pattern' };
    }
    
    return { count: 4, pattern: 'estimated-4-syllables' };
}

function determineOptionalNumber(input, context, visakhayaAnalysis, metricalAnalysis) {
    const analysis = {
        numberOptions: [],
        optionalSingular: false,
        defaultForm: null,
        precedence: [],
        confidence: 0,
        reasoning: []
    };
    
    // Base options: dual comes first by default for Viśākhā in chandas
    analysis.numberOptions = ['dual', 'singular'];
    analysis.optionalSingular = true;
    
    const factors = [];
    
    if (visakhayaAnalysis.scriptForm === 'iast') {
        factors.push({ factor: 'iast_standard', weight: 0.9, favors: 'dual' });
    } else if (visakhayaAnalysis.scriptForm === 'devanagari') {
        factors.push({ factor: 'devanagari_traditional', weight: 0.8, favors: 'dual' });
    }
    
    if (metricalAnalysis.flexibility > 0.8) {
        factors.push({ factor: 'high_metrical_flexibility', weight: 0.7, favors: 'either' });
    } else if (metricalAnalysis.flexibility <= 0.7) {
        factors.push({ factor: 'constrained_meter', weight: 0.8, favors: 'singular' });
    }
    
    if (visakhayaAnalysis.confidence > 0.9) {
        factors.push({ factor: 'high_recognition_confidence', weight: 0.9, favors: 'either' });
    }
    
    const singularWeight = factors.filter(f => f.favors === 'singular').reduce((sum, f) => sum + f.weight, 0);
    const dualWeight = factors.filter(f => f.favors === 'dual').reduce((sum, f) => sum + f.weight, 0);
    
    if (singularWeight > dualWeight) {
        analysis.precedence = ['singular', 'dual'];
        analysis.defaultForm = 'singular';
        analysis.numberOptions = ['singular', 'dual'];
    } else {
        analysis.precedence = ['dual', 'singular'];
        analysis.defaultForm = 'dual';
    }
    
    analysis.confidence = Math.max(singularWeight, dualWeight, 0.8) / (factors.length || 1);
    analysis.reasoning = factors.map(f => `${f.factor}: favors ${f.favors}`);
    
    return analysis;
}

function integratePriorResults(context, numberAnalysis) {
    const analysis = {
        priorIntegration: false,
        conflicts: [],
        enhancements: [],
        finalOptions: [...numberAnalysis.numberOptions]
    };
    
    if (!context.priorResults || !Array.isArray(context.priorResults)) {
        analysis.priorIntegration = false;
        return analysis;
    }
    
    context.priorResults.forEach(prior => {
        if (prior.sutra === '1.2.60' && prior.applied) {
            analysis.enhancements.push('Prior 1.2.60 nakshatra analysis supports dual options');
        }
        
        if (prior.sutra === '1.2.58' && prior.applied) {
            if (prior.numberOptions && prior.numberOptions.includes('plural')) {
                analysis.conflicts.push('Prior 1.2.58 class plural may conflict with dual focus');
            }
        }
        
        if (prior.sutra === '1.2.63' && prior.applied) {
            analysis.enhancements.push('Prior 1.2.63 enforced dual precedence maintained');
            analysis.finalOptions = ['dual'];
        }
    });
    
    analysis.priorIntegration = analysis.enhancements.length > 0 || analysis.conflicts.length > 0;
    return analysis;
}

function finalizeApplication(result, analyses) {
    const {
        chandasAnalysis,
        domainAnalysis,
        visakhayaAnalysis,
        metricalAnalysis,
        numberAnalysis,
        integrationAnalysis,
        normalizedInput,
        context,
        contextValidation
    } = analyses;
    
    const explanationParts = [
        'Sutra 1.2.62 applied:',
        `Viśākhā star recognized (${visakhayaAnalysis.recognitionType})`,
        `in chandas context (${chandasAnalysis.contextType})`,
        `with optional ${numberAnalysis.defaultForm === 'singular' ? 'singular-dual' : 'dual-singular'} flexibility`
    ];
    
    if (metricalAnalysis.constraints.length > 0) {
        explanationParts.push(`considering metrical constraints: ${metricalAnalysis.constraints[0]}`);
    }
    
    return Object.assign(result, {
        applied: true,
        
        numberOptions: integrationAnalysis.finalOptions,
        optionalSingular: integrationAnalysis.finalOptions.includes('singular'),
        optionalDual: integrationAnalysis.finalOptions.includes('dual'),
        defaultForm: numberAnalysis.defaultForm,
        precedence: numberAnalysis.precedence,
        confidence: Math.min(visakhayaAnalysis.confidence * 0.7 + numberAnalysis.confidence * 0.3 + 
            (contextValidation.chandasContext ? 0.1 : 0) +
            (context.vedic ? 0.05 : 0) +
            (context.astronomical ? 0.05 : 0) +
            (metricalAnalysis.prosodyAnalysis.meter ? 0.05 : 0) +
            // Penalty for partial matches
            (visakhayaAnalysis.recognitionType === 'partial_match' ? -0.25 : 0), 0.95),
        explanation: explanationParts.join(' '),
        
        chandasAnalysis,
        domainAnalysis,
        visakhayaAnalysis,
        metricalAnalysis,
        numberAnalysis,
        integrationAnalysis,
        
        alternatives: generateAlternativeForms(normalizedInput, numberAnalysis),
        prosodyGuidance: generateProsodyGuidance(metricalAnalysis, numberAnalysis),
        
        sutraType: 'optional_number_chandas',
        processingPhases: 8,
        timestamp: new Date().toISOString()
    });
}

function generateAlternativeForms(input, numberAnalysis) {
    const alternatives = [];
    
    numberAnalysis.numberOptions.forEach(option => {
        if (option === 'singular') {
            alternatives.push({
                form: convertToSingularForm(input),
                number: 'singular',
                usage: 'chandas_compression',
                confidence: 0.8
            });
        } else if (option === 'dual') {
            alternatives.push({
                form: convertToDualForm(input),
                number: 'dual',
                usage: 'traditional_dual',
                confidence: 0.9
            });
        }
    });
    
    return alternatives;
}

function convertToSingularForm(input) {
    const singularMap = {
        'viśākhāḥ': 'viśākhā',
        'viśākhe': 'viśākhā',
        'विशाखाः': 'विशाखा',
        'विशाखे': 'विशाखा',
        'vishakhaah': 'vishakha',
        'vishakhe': 'vishakha'
    };
    
    const normalized = input.toLowerCase();
    return singularMap[normalized] || input;
}

function convertToDualForm(input) {
    const dualMap = {
        'viśākhā': 'viśākhe',
        'विशाखा': 'विशाखे',
        'vishakha': 'vishakhe',
        'viśākha': 'viśākhe'
    };
    
    const normalized = input.toLowerCase();
    return dualMap[normalized] || input + 'e';
}

function generateProsodyGuidance(metricalAnalysis, numberAnalysis) {
    const guidance = {
        recommendations: [],
        metricalSuggestions: []
    };
    
    if (metricalAnalysis.constraints.length > 0) {
        guidance.recommendations.push(`Consider metrical constraints: ${metricalAnalysis.constraints.join(', ')}`);
    }
    
    if (numberAnalysis.defaultForm === 'singular') {
        guidance.metricalSuggestions.push('Singular form supports syllable compression in tight meters');
    } else {
        guidance.metricalSuggestions.push('Dual form maintains traditional astronomical reference');
    }
    
    if (metricalAnalysis.flexibility < 0.8) {
        guidance.recommendations.push('Constrained meter context - consider singular for better fit');
    }
    
    return guidance;
}

export default sutra_1_2_62;
