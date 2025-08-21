/**
 * Sutra 1.2.63: तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य (Comprehensive Implementation)
 * 
 * "In a dvandva (coordinative) compound consisting of Tiṣya and Punarvasū in the nakṣatra sense, 
 * the plural (interpretation) is replaced by (or must be) the dual."
 * 
 * This is a niyama (restrictive rule) that mandates dual number for the specific Tiṣya+Punarvasū 
 * compound, overriding any previous plural number assignments from earlier sutras (1.2.58-1.2.62).
 * 
 * @fileoverview Comprehensive implementation with 8-phase analysis, multi-script support, 
 * and advanced confidence scoring for Tiṣya-Punarvasū dvandva dual enforcement.
 */

// === IMPORTS ===
import { applySutra1_2_63 as applySutra1_2_63Legacy } from '../sanskrit-utils/number-determination.js';

// === CONSTANTS ===

const SUTRA_ID = '1.2.63';
const SANSKRIT_TEXT = 'तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य';
const SUTRA_TYPE = 'dual_enforcement_niyama';

// Tiṣya (Pushya) nakshatra patterns
const TISYA_PATTERNS = {
    iast: ['tiṣya', 'tiśya', 'tisya'],
    devanagari: ['तिष्य', 'तिश्य'],
    romanized: ['tishya', 'tisya', 'pushya'],
    alternative: ['puṣya', 'पुष्य', 'pushya'],
    partial: ['tiṣ', 'tish', 'push', 'पुष्']
};

// Punarvasū nakshatra patterns
const PUNARVASU_PATTERNS = {
    iast: ['punarvasū', 'punarvasu', 'punarvasuḥ'],
    devanagari: ['पुनर्वसू', 'पुनर्वसु', 'पुनर्वसुः'],
    romanized: ['punarvasu', 'punarvasuu', 'punarwasu'],
    alternative: ['punarvasuḥ', 'punarvasu'],
    partial: ['punar', 'punarvs', 'वसू', 'वसु']
};

// Domain validation patterns
const VALID_DOMAINS = new Set([
    'nakshatra', 'astronomical', 'astral', 'celestial', 'astronomy', 'jyotish', 'vedic_astronomy'
]);

const VALID_SEMANTIC_CATEGORIES = new Set([
    'nakshatra', 'star', 'constellation', 'astronomical_object'
]);

const VALID_CONTEXTS = new Set([
    'astral', 'astronomical', 'vedic', 'vedic_astronomy', 'celestial', 'nakshatra', 'jyotish'
]);

// Compound separator patterns
const COMPOUND_SEPARATORS = /[+\s]+|च|ca|and|&/;

// === MAIN FUNCTION ===

/**
 * Applies Sutra 1.2.63: तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य
 * Enforces dual number for Tiṣya-Punarvasū dvandva compounds in nakshatra contexts
 */
export function sutra_1_2_63(input, context = {}) {
    const startTime = Date.now();
    
    // Initialize result with comprehensive structure
    const result = createSutraResult(SUTRA_ID, input, SANSKRIT_TEXT);
    
    try {
        // Phase 1: Input Validation
        const inputValidation = validateSanskritInput(input);
        if (!inputValidation.valid) {
            return Object.assign(result, {
                applied: false,
                reason: 'invalid_input',
                explanation: inputValidation.reason,
                confidence: 0
            });
        }
        
        // Phase 2: Context Validation
        const contextValidation = validateContext(context);
        if (!contextValidation.valid) {
            return Object.assign(result, {
                applied: false,
                reason: 'invalid_context',
                explanation: contextValidation.reasons.join('; '),
                confidence: 0
            });
        }
        
        const normalizedInput = normalizeInput(input);
        logDebug(context, `1.2.63: Processing normalized input: ${normalizedInput}`);
        
        // Phase 3: Domain Validation
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
        
        // Phase 4: Dvandva Recognition and Analysis
        const dvandvaAnalysis = analyzeDvandvaCompound(normalizedInput, context);
        if (!dvandvaAnalysis.isDvandva) {
            // Special case: check if it's a single nakshatra that should be in dvandva
            if (typeof normalizedInput === 'string' && 
                (containsTisyaPattern(normalizedInput) || containsPunarvasuPattern(normalizedInput))) {
                return Object.assign(result, {
                    applied: false,
                    reason: 'incomplete_nakshatra_pair',
                    explanation: 'Single nakshatra found; dvandva compound requires both Tiṣya and Punarvasū',
                    confidence: 0,
                    domainAnalysis,
                    dvandvaAnalysis
                });
            }
            
            return Object.assign(result, {
                applied: false,
                reason: dvandvaAnalysis.reason,
                explanation: dvandvaAnalysis.explanation,
                confidence: 0,
                domainAnalysis,
                dvandvaAnalysis
            });
        }
        
        // Phase 5: Nakshatra Recognition and Analysis
        const nakshatraAnalysis = analyzeTisyaPunarvasuRecognition(normalizedInput, context, dvandvaAnalysis);
        if (!nakshatraAnalysis.hasRequiredNakshatras) {
            // Check if it's a compound with incomplete nakshatra pair
            if (dvandvaAnalysis.isDvandva && dvandvaAnalysis.members.length >= 1 &&
                (nakshatraAnalysis.hasTisya || nakshatraAnalysis.hasPunarvasu)) {
                return Object.assign(result, {
                    applied: false,
                    reason: 'incomplete_nakshatra_pair',
                    explanation: 'Dvandva compound needs both Tiṣya and Punarvasū nakshatras',
                    confidence: 0,
                    domainAnalysis,
                    dvandvaAnalysis,
                    nakshatraAnalysis
                });
            }
            
            return Object.assign(result, {
                applied: false,
                reason: nakshatraAnalysis.reason,
                explanation: nakshatraAnalysis.explanation,
                confidence: 0,
                domainAnalysis,
                dvandvaAnalysis,
                nakshatraAnalysis
            });
        }
        
        // Phase 6: Number Analysis and Dual Enforcement
        const numberAnalysis = analyzeDualEnforcement(normalizedInput, context, dvandvaAnalysis, nakshatraAnalysis);
        
        // Phase 7: Prior Result Integration
        const integrationAnalysis = integratePriorResults(context, numberAnalysis);
        
        // Phase 8: Final Application and Result Generation
        const finalResult = generateFinalResult(
            normalizedInput, context, domainAnalysis, dvandvaAnalysis, 
            nakshatraAnalysis, numberAnalysis, integrationAnalysis
        );
        
        // Calculate overall confidence
        const confidence = calculateOverallConfidence(
            domainAnalysis, dvandvaAnalysis, nakshatraAnalysis, numberAnalysis
        );
        
        // Generate comprehensive result
        const comprehensiveResult = Object.assign(result, {
            applied: true,
            replaced: finalResult.replaced,
            originalNumber: finalResult.originalNumber,
            finalNumber: 'dual',
            confidence,
            reason: finalResult.reason,
            explanation: finalResult.explanation,
            
            // Analysis phases
            domainAnalysis,
            dvandvaAnalysis,
            nakshatraAnalysis,
            numberAnalysis,
            integrationAnalysis,
            
            // Additional comprehensive features
            alternativeForms: generateAlternativeForms(normalizedInput, context),
            recommendations: generateRecommendations(finalResult, context),
            replacementAnalysis: generateReplacementAnalysis(finalResult),
            prosodicAnalysis: context.context === 'metrical' ? generateProsodicAnalysis(normalizedInput) : undefined,
            
            // Metadata
            processingPhases: 8,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
            debugInfo: context.debug ? generateDebugInfo(
                domainAnalysis, dvandvaAnalysis, nakshatraAnalysis, numberAnalysis
            ) : undefined
        });
        
        return comprehensiveResult;
        
    } catch (error) {
        logDebug(context, `1.2.63: Error during processing: ${error.message}`);
        return Object.assign(result, {
            applied: false,
            reason: 'processing_error',
            explanation: `Error during sutra application: ${error.message}`,
            confidence: 0,
            error: context.debug ? error.message : undefined
        });
    }
}

// === UTILITY FUNCTIONS ===

function createSutraResult(sutraId, input, sanskritText) {
    return {
        sutraId,
        sanskritText,
        sutraType: SUTRA_TYPE,
        input: input,
        applied: false,
        confidence: 0,
        reason: null,
        explanation: ''
    };
}

function validateSanskritInput(input) {
    if (input === null || input === undefined) {
        return { valid: false, reason: 'Input is null or undefined' };
    }
    
    if (typeof input === 'string' && input.trim() === '') {
        return { valid: false, reason: 'Input is empty string' };
    }
    
    if (typeof input === 'object' && (!input.members || !Array.isArray(input.members))) {
        return { valid: false, reason: 'Object input must have members array' };
    }
    
    return { valid: true };
}

function validateContext(context) {
    const reasons = [];
    
    if (typeof context !== 'object' || context === null) {
        reasons.push('Context must be an object');
        return { valid: false, reasons };
    }
    
    return { valid: true, reasons: [] };
}

function normalizeInput(input) {
    if (typeof input === 'string') {
        return input.trim().toLowerCase();
    }
    
    if (typeof input === 'object' && input.members) {
        return input;
    }
    
    return input;
}

function logDebug(context, message) {
    if (context.debug) {
        console.log(message);
    }
}

function containsTisyaPattern(input) {
    const normalized = input.toLowerCase().trim();
    for (const patterns of Object.values(TISYA_PATTERNS)) {
        for (const pattern of patterns) {
            if (normalized.includes(pattern.toLowerCase())) {
                return true;
            }
        }
    }
    return false;
}

function containsPunarvasuPattern(input) {
    const normalized = input.toLowerCase().trim();
    for (const patterns of Object.values(PUNARVASU_PATTERNS)) {
        for (const pattern of patterns) {
            if (normalized.includes(pattern.toLowerCase())) {
                return true;
            }
        }
    }
    return false;
}

function validateNakshatraDomain(input, context) {
    const analysis = {
        validDomain: false,
        domainType: null,
        contextualSupport: false,
        reason: null,
        explanation: ''
    };
    
    // Check explicit domain
    if (context.domain && VALID_DOMAINS.has(context.domain)) {
        analysis.validDomain = true;
        analysis.domainType = context.domain;
        analysis.reason = 'explicit_domain_valid';
        analysis.explanation = `Valid nakshatra domain: ${context.domain}`;
        
        // Check for contextual support
        if (context.context && VALID_CONTEXTS.has(context.context)) {
            analysis.contextualSupport = true;
        }
        
        return analysis;
    }
    
    // Check semantic category
    if (context.semanticCategory && VALID_SEMANTIC_CATEGORIES.has(context.semanticCategory)) {
        analysis.validDomain = true;
        analysis.domainType = 'semantic_category';
        analysis.reason = 'semantic_category_valid';
        analysis.explanation = `Valid semantic category: ${context.semanticCategory}`;
        return analysis;
    }
    
    // Check context indicators
    if (context.context && VALID_CONTEXTS.has(context.context)) {
        analysis.validDomain = true;
        analysis.domainType = 'contextual';
        analysis.contextualSupport = true;
        analysis.reason = 'context_indicates_nakshatra';
        analysis.explanation = `Context indicates nakshatra domain: ${context.context}`;
        return analysis;
    }
    
    // Domain validation failed
    analysis.reason = 'invalid_domain';
    analysis.explanation = 'Required nakshatra/astronomical domain not found';
    return analysis;
}

function analyzeDvandvaCompound(input, context) {
    const analysis = {
        isDvandva: false,
        compoundType: null,
        hasConjunction: false,
        mixedScript: false,
        members: [],
        separators: [],
        reason: null,
        explanation: ''
    };
    
    // Handle structured compound objects
    if (typeof input === 'object' && input.type && input.members) {
        if (input.type === 'dvandva') {
            analysis.isDvandva = true;
            analysis.compoundType = 'structured_object';
            analysis.members = input.members.map(m => m.lemma || m);
            analysis.reason = 'structured_dvandva_object';
            analysis.explanation = 'Recognized as structured dvandva object';
            return analysis;
        } else {
            analysis.reason = 'not_dvandva_compound';
            analysis.explanation = `Compound type is ${input.type}, not dvandva`;
            return analysis;
        }
    }
    
    // Handle string compounds
    if (typeof input === 'string') {
        // Check for conjunction patterns first (more specific)
        if (/\s+च\s+|\s+ca\s+|\s+and\s+/.test(input)) {
            analysis.isDvandva = true;
            analysis.compoundType = 'string_conjunction';
            analysis.hasConjunction = true;
            analysis.members = input.split(/\s*(?:च|ca|and)\s*/).filter(Boolean);
            analysis.separators.push('च/ca/and');
        }
        // Check for plus separator
        else if (input.includes('+')) {
            analysis.isDvandva = true;
            analysis.compoundType = 'string_plus';
            analysis.members = input.split('+').map(s => s.trim());
            analysis.separators.push('+');
        }
        // Check for space separator
        else if (input.includes(' ')) {
            analysis.isDvandva = true;
            analysis.compoundType = 'string_space';
            analysis.members = input.split(/\s+/).filter(Boolean);
            analysis.separators.push(' ');
        }
        
        if (analysis.isDvandva) {
            // Check for mixed script
            const hasDevanagari = /[\u0900-\u097F]/.test(input);
            const hasLatin = /[a-zA-Z]/.test(input);
            analysis.mixedScript = hasDevanagari && hasLatin;
            
            analysis.reason = 'string_compound_recognized';
            analysis.explanation = `Recognized as ${analysis.compoundType} compound`;
            return analysis;
        }
    }
    
    // Not recognized as dvandva
    analysis.reason = 'not_dvandva_pattern';
    analysis.explanation = 'Input does not match dvandva compound patterns';
    return analysis;
}

function analyzeTisyaPunarvasuRecognition(input, context, dvandvaAnalysis) {
    const analysis = {
        hasRequiredNakshatras: false,
        hasTisya: false,
        hasPunarvasu: false,
        tisyaPatterns: [],
        punarvasuPatterns: [],
        recognitionType: null,
        scriptMatch: null,
        mixedScript: false,
        hasAlternativeNames: false,
        isComplete: false,
        confidence: 0,
        reason: null,
        explanation: ''
    };
    
    const members = dvandvaAnalysis.members || [];
    
    // For single-member compounds, check if it's one of our required nakshatras
    // and allow contextual inference of the companion
    if (members.length === 1) {
        const singleMember = members[0].toLowerCase().trim();
        const isTisya = containsTisyaPattern(singleMember);
        const isPunarvasu = containsPunarvasuPattern(singleMember);
        
        if (isTisya || isPunarvasu) {
            // Allow single nakshatra if context suggests this is part of tiṣya-punarvasu compound
            if (context.domain === 'nakshatra' || context.semanticCategory === 'nakshatra') {
                // Infer the companion nakshatra
                analysis.hasTisya = isTisya;
                analysis.hasPunarvasu = isPunarvasu;
                analysis.hasRequiredNakshatras = true; // Allow inference
                analysis.isComplete = false; // Mark as incomplete but applicable
                analysis.confidence = 0.75; // Lower confidence for inference
                analysis.reason = 'single_nakshatra_with_context';
                analysis.explanation = `Single ${isTisya ? 'Tiṣya' : 'Punarvasū'} detected with nakshatra context - inferring companion`;
                
                // Add the detected pattern
                if (isTisya) {
                    analysis.tisyaPatterns.push({ pattern: singleMember, scriptType: 'inferred' });
                } else {
                    analysis.punarvasuPatterns.push({ pattern: singleMember, scriptType: 'inferred' });
                }
                
                return analysis;
            }
        }
        
        analysis.reason = 'incomplete_nakshatra_pair';
        analysis.explanation = 'Need both Tiṣya and Punarvasū for dvandva compound';
        return analysis;
    }
    
    if (members.length < 2) {
        analysis.reason = 'incomplete_nakshatra_pair';
        analysis.explanation = 'Need both Tiṣya and Punarvasū for dvandva compound';
        return analysis;
    }
    
    // Check each member for Tiṣya patterns
    for (const member of members) {
        const normalizedMember = member.toLowerCase().trim();
        
        // Check Tiṣya patterns
        if (!analysis.hasTisya) {
            for (const [scriptType, patterns] of Object.entries(TISYA_PATTERNS)) {
                if (scriptType === 'partial') continue;
                
                for (const pattern of patterns) {
                    if (normalizedMember === pattern.toLowerCase() || 
                        normalizedMember.includes(pattern.toLowerCase())) {
                        analysis.hasTisya = true;
                        analysis.tisyaPatterns.push({ pattern, scriptType });
                        analysis.recognitionType = `exact_${scriptType}`;
                        analysis.scriptMatch = scriptType;
                        break;
                    }
                }
                if (analysis.hasTisya) break;
            }
            
            // Check partial patterns if exact match not found
            if (!analysis.hasTisya) {
                for (const pattern of TISYA_PATTERNS.partial) {
                    if (normalizedMember.includes(pattern.toLowerCase())) {
                        analysis.hasTisya = true;
                        analysis.tisyaPatterns.push({ pattern, scriptType: 'partial' });
                        analysis.recognitionType = 'partial_match';
                        break;
                    }
                }
            }
        }
        
        // Check Punarvasū patterns
        if (!analysis.hasPunarvasu) {
            for (const [scriptType, patterns] of Object.entries(PUNARVASU_PATTERNS)) {
                if (scriptType === 'partial') continue;
                
                for (const pattern of patterns) {
                    if (normalizedMember === pattern.toLowerCase() || 
                        normalizedMember.includes(pattern.toLowerCase())) {
                        analysis.hasPunarvasu = true;
                        analysis.punarvasuPatterns.push({ pattern, scriptType });
                        if (!analysis.recognitionType) {
                            analysis.recognitionType = `exact_${scriptType}`;
                            analysis.scriptMatch = scriptType;
                        }
                        break;
                    }
                }
                if (analysis.hasPunarvasu) break;
            }
            
            // Check partial patterns if exact match not found
            if (!analysis.hasPunarvasu) {
                for (const pattern of PUNARVASU_PATTERNS.partial) {
                    if (normalizedMember.includes(pattern.toLowerCase())) {
                        analysis.hasPunarvasu = true;
                        analysis.punarvasuPatterns.push({ pattern, scriptType: 'partial' });
                        if (!analysis.recognitionType) {
                            analysis.recognitionType = 'partial_match';
                        }
                        break;
                    }
                }
            }
        }
    }
    
    // Check for alternative names
    const hasAlternativeTisya = analysis.tisyaPatterns.some(p => p.scriptType === 'alternative');
    const hasAlternativePunarvasu = analysis.punarvasuPatterns.some(p => p.scriptType === 'alternative');
    analysis.hasAlternativeNames = hasAlternativeTisya || hasAlternativePunarvasu;
    
    // Check for mixed script
    const hasDevanagari = analysis.tisyaPatterns.some(p => p.scriptType === 'devanagari') || 
                         analysis.punarvasuPatterns.some(p => p.scriptType === 'devanagari');
    const hasLatin = analysis.tisyaPatterns.some(p => p.scriptType === 'iast' || p.scriptType === 'romanized') || 
                    analysis.punarvasuPatterns.some(p => p.scriptType === 'iast' || p.scriptType === 'romanized');
    analysis.mixedScript = hasDevanagari && hasLatin;
    
    // Determine overall recognition
    analysis.hasRequiredNakshatras = analysis.hasTisya && analysis.hasPunarvasu;
    analysis.isComplete = analysis.hasRequiredNakshatras;
    
    if (analysis.hasRequiredNakshatras) {
        // Calculate confidence based on recognition quality
        let confidence = 0.95;
        
        if (analysis.recognitionType === 'partial_match') {
            confidence = 0.70;
        } else if (analysis.recognitionType?.includes('romanized')) {
            confidence = 0.85;
        } else if (analysis.hasAlternativeNames) {
            confidence = 0.90;
        }
        
        // Boost for explicit domain
        if (context.domain === 'nakshatra') {
            confidence += 0.05;
        }
        
        analysis.confidence = Math.min(confidence, 1.0);
        analysis.reason = 'required_nakshatras_found';
        analysis.explanation = `Both Tiṣya and Punarvasū recognized with ${analysis.recognitionType} matching`;
    } else {
        if (!analysis.hasTisya && !analysis.hasPunarvasu) {
            analysis.reason = 'nakshatras_not_matched';
            analysis.explanation = 'Neither Tiṣya nor Punarvasū found in compound';
        } else if (!analysis.hasTisya) {
            analysis.reason = 'tisya_not_found';
            analysis.explanation = 'Tiṣya nakshatra not found in compound';
        } else {
            analysis.reason = 'punarvasu_not_found';
            analysis.explanation = 'Punarvasū nakshatra not found in compound';
        }
    }
    
    return analysis;
}

function analyzeDualEnforcement(input, context, dvandvaAnalysis, nakshatraAnalysis) {
    const analysis = {
        enforced: true,
        replaced: false,
        originalNumber: null,
        finalNumber: 'dual',
        contextNumber: null,
        memberNumbers: [],
        replacementType: null,
        confidence: 1.0,
        reason: null,
        explanation: ''
    };
    
    // Check context number
    if (context.number) {
        analysis.contextNumber = context.number;
    }
    
    // Check member numbers from structured compounds
    if (dvandvaAnalysis.compoundType === 'structured_object' && typeof input === 'object') {
        for (const member of input.members || []) {
            if (member.number) {
                analysis.memberNumbers.push(member.number);
            }
        }
    }
    
    // Determine if replacement is needed
    const hasPlural = analysis.contextNumber === 'plural' || 
                     analysis.memberNumbers.includes('plural');
    
    if (hasPlural) {
        analysis.replaced = true;
        analysis.originalNumber = 'plural';
        analysis.replacementType = 'plural_to_dual';
        analysis.reason = 'plural_replaced_with_dual';
        analysis.explanation = 'Plural number replaced with mandatory dual for Tiṣya+Punarvasū dvandva';
    } else {
        analysis.replaced = false;
        analysis.reason = 'dual_enforced';
        analysis.explanation = 'Dual number enforced for Tiṣya+Punarvasū dvandva';
    }
    
    return analysis;
}

function integratePriorResults(context, numberAnalysis) {
    const analysis = {
        hasPriorResults: false,
        overridesPrior: [],
        complementsPrior: [],
        conflictsPrior: [],
        noPriorResults: false,
        explanation: ''
    };
    
    if (!context.priorResults || typeof context.priorResults !== 'object') {
        analysis.noPriorResults = true;
        analysis.explanation = 'No prior results to integrate';
        return analysis;
    }
    
    const priorKeys = Object.keys(context.priorResults);
    analysis.hasPriorResults = priorKeys.length > 0;
    
    if (priorKeys.length === 0) {
        analysis.noPriorResults = true;
        analysis.explanation = 'Empty prior results object';
        return analysis;
    }
    
    for (const [sutraId, priorResult] of Object.entries(context.priorResults)) {
        if (!priorResult || typeof priorResult !== 'object') continue;
        
        switch (sutraId) {
            case '1.2.58':
                if (priorResult.applied && priorResult.number === 'plural') {
                    analysis.overridesPrior.push('1.2.58');
                }
                break;
                
            case '1.2.59':
                if (priorResult.applied) {
                    analysis.overridesPrior.push('1.2.59');
                }
                break;
                
            case '1.2.60':
                if (priorResult.applied) {
                    analysis.overridesPrior.push('1.2.60');
                }
                break;
                
            case '1.2.61':
                if (!priorResult.applied) {
                    analysis.complementsPrior.push('1.2.61');
                }
                break;
                
            case '1.2.62':
                if (priorResult.applied && priorResult.number === 'singular') {
                    analysis.conflictsPrior.push('1.2.62');
                }
                break;
        }
    }
    
    analysis.explanation = `Integrated with ${priorKeys.length} prior results`;
    return analysis;
}

function generateFinalResult(input, context, domainAnalysis, dvandvaAnalysis, nakshatraAnalysis, numberAnalysis, integrationAnalysis) {
    return {
        replaced: numberAnalysis.replaced,
        originalNumber: numberAnalysis.originalNumber,
        finalNumber: 'dual',
        reason: numberAnalysis.reason,
        explanation: numberAnalysis.explanation
    };
}

function calculateOverallConfidence(domainAnalysis, dvandvaAnalysis, nakshatraAnalysis, numberAnalysis) {
    let confidence = 1.0;
    
    // Domain confidence factor
    if (domainAnalysis.domainType === 'nakshatra') {
        confidence *= 1.0;
    } else if (domainAnalysis.domainType === 'semantic_category') {
        confidence *= 0.95;
    } else {
        confidence *= 0.90;
    }
    
    // Compound recognition confidence
    if (dvandvaAnalysis.compoundType === 'structured_object') {
        confidence *= 1.0;
    } else if (dvandvaAnalysis.compoundType?.includes('string')) {
        confidence *= 0.95;
    }
    
    // Nakshatra recognition confidence
    confidence *= nakshatraAnalysis.confidence;
    
    // Boost for exact domain match
    if (domainAnalysis.domainType === 'nakshatra') {
        confidence += 0.05;
    }
    
    return Math.min(Math.round(confidence * 1000) / 1000, 1.0); // Round to 3 decimal places, cap at 1.0
}

function generateAlternativeForms(input, context) {
    return {
        dual: {
            iast: 'tiṣyapunarvasū',
            devanagari: 'तिष्यपुनर्वसू',
            romanized: 'tishyapunarvasu'
        },
        representations: [
            'tiṣya-punarvasū',
            'तिष्य-पुनर्वसू',
            'Tiṣya and Punarvasū',
            'Pushya-Punarvasu'
        ]
    };
}

function generateRecommendations(finalResult, context) {
    const recommendations = {
        primary: 'use_dual_form',
        explanation: 'Use dual number forms for this Tiṣya+Punarvasū compound'
    };
    
    if (finalResult.replaced) {
        recommendations.note = 'Plural interpretation has been replaced with mandatory dual';
    }
    
    return recommendations;
}

function generateReplacementAnalysis(finalResult) {
    if (!finalResult.replaced) {
        return undefined;
    }
    
    return {
        replacementType: 'plural_to_dual',
        originalNumber: finalResult.originalNumber,
        enforcedNumber: 'dual',
        mandatory: true,
        reason: 'niyama_rule_enforcement'
    };
}

function generateProsodicAnalysis(input) {
    return {
        syllableCount: input.length, // Simplified
        metricalWeight: 'medium',
        recommendations: ['Suitable for most Vedic meters when used in dual form']
    };
}

function generateDebugInfo(domainAnalysis, dvandvaAnalysis, nakshatraAnalysis, numberAnalysis) {
    return {
        phases: {
            'Phase 3': domainAnalysis,
            'Phase 4': dvandvaAnalysis,
            'Phase 5': nakshatraAnalysis,
            'Phase 6': numberAnalysis
        },
        processingNotes: [
            'Domain validation successful',
            'Dvandva compound recognized',
            'Both required nakshatras found',
            'Dual enforcement applied'
        ]
    };
}

// Export the main function
export default sutra_1_2_63;
