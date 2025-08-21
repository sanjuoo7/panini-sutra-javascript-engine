// Sutra 1.2.61: छन्दसि पुनर्वस्वोरेकवचनम् (chandasi punarvasvor ekavacanam) - Comprehensive Implementation
// Sanskrit Sutra: छन्दसि पुनर्वस्वोरेकवचनम्
// Translation: In chandas (Vedic metrical contexts), singular Punarvasu is optionally employed for its dual form
// Domain: Vedic Prosody and Optional Singular-Dual Number in Metrical Contexts

// Import dependencies for comprehensive analysis and legacy compatibility
import { applySutra1_2_61 as utilitySutra1_2_61 } from '../sanskrit-utils/number-determination.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

/**
 * Applies Sutra 1.2.61: छन्दसि पुनर्वस्वोरेकवचनम्
 * Determines optional singular representation for Punarvasu dual star in chandas contexts
 */
export function sutra_1_2_61(input, context) {
    // Phase 1: Input Validation and Normalization
    const result = createSutraResult('1.2.61', input, 'छन्दसि पुनर्वस्वोरेकवचनम्');
    
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
    logDebug(context, `1.2.61: Processing normalized input: ${normalizedInput}`);
    
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
    
    // Phase 4: Punarvasu Star Recognition and Analysis
    const punarvasuAnalysis = analyzePunarvasuRecognition(normalizedInput, context);
    if (!punarvasuAnalysis.isPunarvasu) {
        return Object.assign(result, {
            applied: false,
            reason: punarvasuAnalysis.reason,
            explanation: punarvasuAnalysis.explanation,
            confidence: 0,
            punarvasuAnalysis
        });
    }
    
    // Phase 5: Metrical Constraint Analysis
    const metricalAnalysis = analyzeMetricalConstraints(normalizedInput, context, chandasAnalysis);
    
    // Phase 6: Optional Number Determination
    const numberAnalysis = determineOptionalNumber(normalizedInput, context, punarvasuAnalysis, metricalAnalysis);
    
    // Phase 7: Prior Result Integration
    const integrationAnalysis = integratePriorResults(context, numberAnalysis);
    
    // Phase 8: Final Application Decision
    return finalizeApplication(result, {
        chandasAnalysis,
        domainAnalysis,
        punarvasuAnalysis,
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
    if (!input || typeof input !== 'string') return false;
    if (!input.trim()) return false;
    return true;
}

function validateContext(context) {
    if (!context) {
        return {
            isValid: false,
            reasons: ['Context is required for Sutra 1.2.61 analysis'],
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
        analysis.explanation = 'Sutra 1.2.61 requires chandas (Vedic/metrical) context flag';
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
    
    if (context.meter) {
        analysis.metricalFeatures.meter = context.meter;
    }
    
    if (context.prosody) {
        analysis.metricalFeatures.prosody = context.prosody;
    }
    
    analysis.validChandas = true;
    analysis.explanation = `Valid chandas context (${analysis.contextType})`;
    return analysis;
}

function validateNakshatraDomain(input, context) {
    const analysis = {
        validDomain: false,
        domainType: null,
        reason: null,
        explanation: ''
    };
    
    if (context.domain === 'nakshatra') {
        analysis.domainType = 'explicit_domain';
        analysis.validDomain = true;
    } else if (context.semanticCategory === 'nakshatra') {
        analysis.domainType = 'semantic_category';
        analysis.validDomain = true;
    } else if (context.astronomical) {
        analysis.domainType = 'astronomical_context';
        analysis.validDomain = true;
    } else {
        analysis.reason = 'missing_nakshatra_domain';
        analysis.explanation = 'Sutra 1.2.61 requires nakshatra domain specification';
        return analysis;
    }
    
    analysis.explanation = `Valid nakshatra domain (${analysis.domainType})`;
    return analysis;
}

function analyzePunarvasuRecognition(input, context) {
    const analysis = {
        isPunarvasu: false,
        recognitionType: null,
        scriptForm: null,
        variants: [],
        confidence: 0,
        reason: null,
        explanation: ''
    };
    
    const punarvasuVariants = {
        iast: [
            'punarvasu', 'punarvasū', 'punarvasu̱', 'punarvasū̱',
            'punar-vasu', 'punar-vasū', 'punar vasu', 'punar vasū'
        ],
        devanagari: [
            'पुनर्वसु', 'पुनर्वसू', 'पुनर्वसु̱', 'पुनर्वसू̱',
            'पुनर्-वसु', 'पुनर्-वसू', 'पुनर् वसु', 'पुनर् वसू'
        ],
        romanized: [
            'punarvasu', 'punarwasu', 'punar-vasu', 'punar-wasu',
            'punur-vasu', 'punur-wasu', 'punar vasu', 'punar wasu'
        ],
        traditional: [
            'punarvasū', 'puṇarvasū', 'punarwasū', 'puṇarwasū'
        ]
    };
    
    const inputLower = input.toLowerCase().trim();
    
    if (punarvasuVariants.iast.some(v => inputLower === v.toLowerCase())) {
        analysis.isPunarvasu = true;
        analysis.recognitionType = 'iast_standard';
        analysis.scriptForm = 'iast';
        analysis.confidence = 0.95;
    }
    else if (punarvasuVariants.devanagari.some(v => input === v)) {
        analysis.isPunarvasu = true;
        analysis.recognitionType = 'devanagari_standard';
        analysis.scriptForm = 'devanagari';
        analysis.confidence = 0.95;
    }
    else if (punarvasuVariants.romanized.some(v => inputLower === v.toLowerCase())) {
        analysis.isPunarvasu = true;
        analysis.recognitionType = 'romanized_variant';
        analysis.scriptForm = 'romanized';
        analysis.confidence = 0.85;
    }
    else if (punarvasuVariants.traditional.some(v => inputLower === v.toLowerCase())) {
        analysis.isPunarvasu = true;
        analysis.recognitionType = 'traditional_variant';
        analysis.scriptForm = 'traditional';
        analysis.confidence = 0.80;
    }
    else if (inputLower.includes('punarvasu') || inputLower.includes('punar-vasu') || 
             input.includes('पुनर्वसु') || inputLower.includes('punarwasu')) {
        analysis.isPunarvasu = true;
        analysis.recognitionType = 'partial_match';
        analysis.confidence = 0.60;
    }
    
    if (analysis.isPunarvasu) {
        analysis.explanation = `Recognized as Punarvasu variant (${analysis.recognitionType}, confidence: ${analysis.confidence})`;
        
        Object.entries(punarvasuVariants).forEach(([script, variants]) => {
            variants.forEach(variant => {
                if (inputLower === variant.toLowerCase() || input === variant) {
                    analysis.variants.push({ script, variant, exact: true });
                }
            });
        });
    } else {
        analysis.reason = 'not_punarvasu_star';
        analysis.explanation = 'Input does not match Punarvasu star name variants';
    }
    
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
    
    const syllableAnalysis = analyzePunarvasuSyllables(input);
    analysis.prosodyAnalysis.syllables = syllableAnalysis;
    
    if (syllableAnalysis.count >= 4) {
        analysis.recommendations.push('Longer forms favor dual interpretation in metrical contexts');
    } else {
        analysis.recommendations.push('Shorter forms may prefer singular in compressed meter');
    }
    
    return analysis;
}

function analyzePunarvasuSyllables(input) {
    const syllablePatterns = {
        'punarvasu': { count: 4, pattern: 'pu-nar-va-su' },
        'punarvasū': { count: 4, pattern: 'pu-nar-va-sū' },
        'पुनर्वसु': { count: 4, pattern: 'pu-nar-va-su' },
        'पुनर्वसू': { count: 4, pattern: 'pu-nar-va-sū' }
    };
    
    const inputLower = input.toLowerCase();
    for (const [form, analysis] of Object.entries(syllablePatterns)) {
        if (inputLower === form.toLowerCase() || input === form) {
            return analysis;
        }
    }
    
    return { count: 4, pattern: 'estimated-4-syllables' };
}

function determineOptionalNumber(input, context, punarvasuAnalysis, metricalAnalysis) {
    const analysis = {
        numberOptions: [],
        optionalSingular: false,
        defaultForm: null,
        precedence: [],
        confidence: 0,
        reasoning: []
    };
    
    // Base options: dual comes first by default for Punarvasu in chandas
    analysis.numberOptions = ['dual', 'singular'];
    analysis.optionalSingular = true;
    
    const factors = [];
    
    if (punarvasuAnalysis.scriptForm === 'iast') {
        factors.push({ factor: 'iast_standard', weight: 0.9, favors: 'dual' });
    } else if (punarvasuAnalysis.scriptForm === 'devanagari') {
        factors.push({ factor: 'devanagari_traditional', weight: 0.8, favors: 'dual' });
    }
    
    if (metricalAnalysis.flexibility > 0.8) {
        factors.push({ factor: 'high_metrical_flexibility', weight: 0.7, favors: 'either' });
    } else if (metricalAnalysis.flexibility <= 0.7) {
        factors.push({ factor: 'constrained_meter', weight: 0.8, favors: 'singular' });
    }
    
    if (punarvasuAnalysis.confidence > 0.9) {
        factors.push({ factor: 'high_recognition_confidence', weight: 0.9, favors: 'either' });
    }
    
    const singularWeight = factors.filter(f => f.favors === 'singular').reduce((sum, f) => sum + f.weight, 0);
    const dualWeight = factors.filter(f => f.favors === 'dual').reduce((sum, f) => sum + f.weight, 0);
    
    if (dualWeight > singularWeight) {
        analysis.precedence = ['dual', 'singular'];
        analysis.defaultForm = 'dual';
    } else if (singularWeight > dualWeight) {
        analysis.precedence = ['singular', 'dual'];
        analysis.defaultForm = 'singular';
        // Reorder options when singular is favored
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
        punarvasuAnalysis,
        metricalAnalysis,
        numberAnalysis,
        integrationAnalysis,
        normalizedInput,
        context,
        contextValidation
    } = analyses;
    
    const explanationParts = [
        'Sutra 1.2.61 applied:',
        `Punarvasu star recognized (${punarvasuAnalysis.recognitionType})`,
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
        confidence: Math.min(punarvasuAnalysis.confidence * 0.7 + numberAnalysis.confidence * 0.3 + 
            (contextValidation.chandasContext ? 0.1 : 0) +
            (context.vedic ? 0.05 : 0) +
            (context.astronomical ? 0.05 : 0) +
            (metricalAnalysis.prosodyAnalysis.meter ? 0.05 : 0), 0.95),
        explanation: explanationParts.join(' '),
        
        chandasAnalysis,
        domainAnalysis,
        punarvasuAnalysis,
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
        'punarvasū': 'punarvasu',
        'पुनर्वसू': 'पुनर्वसु',
        'punarwasū': 'punarwasu'
    };
    
    return singularMap[input] || input;
}

function convertToDualForm(input) {
    const dualMap = {
        'punarvasu': 'punarvasū',
        'पुनर्वसु': 'पुनर्वसू',
        'punarwasu': 'punarwasū'
    };
    
    return dualMap[input] || input + 'ū';
}

function generateProsodyGuidance(metricalAnalysis, numberAnalysis) {
    const guidance = {
        recommendations: [...metricalAnalysis.recommendations],
        metricalFit: metricalAnalysis.flexibility,
        preferredForm: numberAnalysis.defaultForm
    };
    
    if (metricalAnalysis.flexibility < 0.7) {
        guidance.recommendations.push('Consider singular form for tight metrical constraints');
    } else if (metricalAnalysis.flexibility > 0.9) {
        guidance.recommendations.push('Both forms acceptable in flexible metrical context');
    }
    
    return guidance;
}

export default sutra_1_2_61;
