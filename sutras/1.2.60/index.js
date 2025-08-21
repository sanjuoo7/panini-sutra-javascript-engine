/**
 * Sutra 1.2.60: फल्गुनीप्रोष्ठपदानां च नक्षत्रे (phalgunīproṣṭhapadānāṃ ca nakṣatre)
 * "And for Phalgunī and Proṣṭhapadā in nakshatra contexts (dual optionally conveys plural sense)"
 * 
 * This sutra establishes special number rules for specific astronomical terms (nakshatras).
 * The dual forms of Phalgunī and Proṣṭhapadā can optionally convey plural meaning in nakshatra contexts.
 * 
 * Implementation Philosophy:
 * - Comprehensive astronomical terminology recognition across scripts (IAST, Devanagari, romanized)
 * - Context-aware domain validation ensuring proper nakshatra application
 * - Multi-form pattern matching for variant spellings and historical forms
 * - Semantic dual-to-plural optionality analysis with confidence assessment
 * - Integration with prior sutra results while maintaining astronomical specificity
 * - Advanced confidence scoring based on pattern strength and contextual factors
 * 
 * @fileoverview Comprehensive implementation of Pāṇinian astronomical dual optionality
 * @author AI Agent (following systematic Phase 3a enhancement methodology)
 * @version 2.0.0 - Comprehensive Architecture
 */

// Import dependencies for comprehensive analysis and legacy compatibility
import { applySutra1_2_60 as utilitySutra1_2_60 } from '../sanskrit-utils/number-determination.js';

// === CORE CONSTANTS AND ASTRONOMICAL DATA ===

/**
 * Comprehensive nakshatra forms across scripts and variant spellings
 */
const NAKSHATRA_FORMS = {
  // Phalgunī constellation variants
  phalguni: new Set([
    'phalgunī',      // Standard IAST
    'फाल्गुनी',       // Standard Devanagari
    'phalguṇī',      // Alternative IAST with ṇ
    'फल्गुनी',       // Alternative Devanagari
    'phalguni',      // Romanized without diacritics
    'falguni',       // Common romanization
    'fālgunī',       // Long ā variant
    'फाल्गुनि',       // Short i ending variant
    'pūrvaphalgunī', // Full astronomical name
    'uttaraphalgunī' // Full astronomical name  
  ]),
  
  // Proṣṭhapadā constellation variants
  prosthapada: new Set([
    'proṣṭhapadā',   // Standard IAST
    'प्रोष्ठपदा',      // Standard Devanagari
    'proshthapadā',  // Alternative transliteration
    'प्रोष्ठपदा',      // Standard Devanagari
    'proshthapada',  // Romanized without diacritics
    'prosthapada',   // Common romanization
    'proṣṭhapada',   // Alternative IAST
    'proshtapada',   // Simplified romanization
    'pūrvaproṣṭhapadā', // Full astronomical name
    'uttaraproṣṭhapadā' // Full astronomical name
  ])
};

/**
 * Nakshatra domain context indicators
 */
const NAKSHATRA_DOMAIN_INDICATORS = {
  explicit: new Set([
    'nakshatra',     // Direct domain specification
    'नक्षत्र',        // Devanagari domain
    'constellation', // English equivalent
    'star',          // Simplified reference
    'lunar_mansion', // Technical astronomical term
    'astral',        // Astrological context
    'jyotisha',      // Vedic astronomy context
    'ज्योतिष'        // Devanagari jyotisha
  ]),
  
  implicit: new Set([
    'astronomy',     // Related field
    'astrology',     // Related field  
    'calendar',      // Lunar calendar context
    'tithi',         // Lunar day context
    'yoga',          // Astrological combination
    'karana',        // Half lunar day
    'muhurta',       // Auspicious timing
    'panchanga'      // Astrological almanac
  ])
};

/**
 * Dual-to-plural optionality conditions
 */
const DUAL_PLURAL_CONDITIONS = {
  semantic_plurality: 'semantic_plurality',
  astronomical_grouping: 'astronomical_grouping', 
  contextual_emphasis: 'contextual_emphasis',
  traditional_usage: 'traditional_usage',
  collective_reference: 'collective_reference',
  stylistic_variation: 'stylistic_variation'
};

// === MAIN SUTRA FUNCTION ===

/**
 * Applies Sutra 1.2.60: Dual-plural optionality for specific nakshatras
 * @param {string|Object} term - The astronomical term to analyze (Phalgunī or Proṣṭhapadā)
 * @param {Object} priorResult - Result from previous sutra application
 * @param {Object} context - Nakshatra domain and astronomical context
 * @returns {Object} - Comprehensive analysis result with dual-plural options
 */
export function sutra1260(term, priorResult, context = {}) {
  // Initialize comprehensive analysis structure
  const analysis = {
    sutra: '1.2.60',
    sutraText: 'फल्गुनीप्रोष्ठपदानां च नक्षत्रे',
    applied: false,
    
    // Input Analysis
    inputAnalysis: {
      isValid: false,
      termType: null,
      hasContext: false,
      hasPriorResult: false,
      script: null,
      inputComplexity: null
    },

    // Nakshatra Analysis
    nakshatraAnalysis: {
      isNakshatra: false,
      nakshatraType: null,
      nakshatraForm: null,
      nakshatraStrength: 0.0,
      nakshatraJustification: '',
      variantMatches: []
    },

    // Domain Analysis  
    domainAnalysis: {
      isNakshatraDomain: false,
      domainType: null,
      domainIndicators: [],
      domainStrength: 0.0,
      domainJustification: '',
      contextualFactors: []
    },

    // Dual-Plural Analysis
    dualPluralAnalysis: {
      dualPluralApplies: false,
      optionalityType: null,
      optionalityConditions: [],
      semanticPlurality: false,
      optionalityStrength: 0.0,
      optionalityJustification: ''
    },

    // Number Option Analysis
    numberOptionAnalysis: {
      baseNumber: 'dual',
      availableOptions: ['dual'],
      priorOptions: [],
      enhancedOptions: [],
      priorityOrder: [],
      optionJustifications: {}
    },

    // Prior Result Integration
    priorResultIntegration: {
      hasPriorResult: false,
      priorSutra: null,
      integrationStrategies: [],
      conflictResolution: null,
      enhancementType: null
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      nakshatraRecognition: 0.0,
      domainValidation: 0.0,
      dualPluralApplicability: 0.0,
      numberOptionGeneration: 0.0,
      traditional: 0.0,
      factors: []
    }
  };

  // Phase 1: Input Validation and Basic Analysis
  const inputValidation = validateNakshatraInput(term, priorResult, context, analysis);
  if (!inputValidation.isValid) {
    analysis.applied = false;
    analysis.confidence.overall = 0.1;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['dual'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 2: Nakshatra Identification and Classification
  const nakshatraClassification = classifyNakshatra(term, context, analysis);
  
  if (!nakshatraClassification.isNakshatra) {
    analysis.applied = false;
    analysis.dualPluralAnalysis.optionalityJustification = 'not_phalguni_or_prosthapada';
    analysis.confidence.overall = 0.2;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['dual'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Domain Validation and Context Assessment
  const domainValidation = validateNakshatraDomain(term, context, analysis);
  
  if (!domainValidation.isNakshatraDomain) {
    analysis.applied = false;
    analysis.dualPluralAnalysis.optionalityJustification = 'not_nakshatra_domain';
    analysis.confidence.overall = 0.3;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['dual'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 4: Dual-Plural Optionality Assessment
  const dualPluralEvaluation = evaluateDualPluralOptionalityForNakshatra(term, context, analysis);

  if (!dualPluralEvaluation.dualPluralApplies) {
    analysis.applied = false;
    analysis.dualPluralAnalysis.optionalityJustification = 'dual_plural_not_applicable';
    analysis.confidence.overall = 0.4;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['dual'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 5: Number Option Generation and Enhancement
  const numberOptions = generateNakshatraNumberOptions(term, context, analysis, priorResult);

  // Phase 6: Prior Result Integration (if applicable)
  const priorIntegration = integratePriorNakshatraResults(priorResult, numberOptions, analysis);

  // Phase 7: Final Confidence Assessment
  const finalConfidence = calculateFinalNakshatraConfidence(analysis);

  // Construct final result
  analysis.applied = true;
  analysis.confidence = finalConfidence;

  return {
    applied: true,
    term: term,
    numberOptions: priorIntegration.finalOptions,
    analysis: analysis,
    confidence: finalConfidence,
    semanticPlural: analysis.dualPluralAnalysis.semanticPlurality,
    explanation: `Dual nakshatra ${analysis.nakshatraAnalysis.nakshatraType} optionally conveys plural sense (1.2.60)`
  };
}

// === ANALYSIS HELPER FUNCTIONS ===

/**
 * Validates input parameters and initializes basic analysis
 */
function validateNakshatraInput(term, priorResult, context, analysis) {
  let isValid = true;
  let termType = null;
  let hasContext = false;
  let hasPriorResult = false;
  let script = null;
  let inputComplexity = null;

  // Validate term
  if (!term) {
    isValid = false;
    termType = 'invalid';
  } else if (typeof term === 'string') {
    termType = 'string';
    // Detect script
    if (/[\u0900-\u097F]/.test(term)) {
      script = 'devanagari';
    } else if (/[a-zA-Z]/.test(term)) {
      script = 'latin';
    } else {
      script = 'unknown';
    }
  } else if (typeof term === 'object' && term !== null) {
    termType = 'object';
    script = 'mixed';
  } else {
    isValid = false;
    termType = 'invalid';
  }

  // Check context
  if (context && typeof context === 'object' && Object.keys(context).length > 0) {
    hasContext = true;
  }

  // Check prior result
  if (priorResult && typeof priorResult === 'object') {
    hasPriorResult = true;
  }

  // Determine input complexity
  inputComplexity = determineNakshatraInputComplexity(term, context);

  // Update analysis
  analysis.inputAnalysis = {
    isValid,
    termType,
    hasContext,
    hasPriorResult,
    script,
    inputComplexity
  };

  return { isValid };
}

/**
 * Determines input complexity for processing strategy
 */
function determineNakshatraInputComplexity(term, context) {
  if (typeof term === 'string' && term.length < 8 && (!context || Object.keys(context).length < 2)) {
    return 'simple';
  } else if (typeof term === 'object' && term && (term.astronomicalProperties || term.nakshatraData)) {
    return 'complex';
  } else {
    return 'moderate';
  }
}

/**
 * Classifies nakshatra presence and type (Phalgunī or Proṣṭhapadā)
 */
function classifyNakshatra(term, context, analysis) {
  let isNakshatra = false;
  let nakshatraType = null;
  let nakshatraForm = null;
  let nakshatraStrength = 0.0;
  let nakshatraJustification = '';
  let variantMatches = [];

  // Check for explicit nakshatra specification
  if (typeof term === 'object' && term.nakshatraType) {
    const explicitType = term.nakshatraType.toLowerCase();
    if (explicitType === 'phalguni' || explicitType === 'prosthapada') {
      isNakshatra = true;
      nakshatraType = explicitType;
      nakshatraForm = 'explicit';
      nakshatraJustification = 'Explicitly marked as target nakshatra';
      nakshatraStrength = 0.95;
    }
  }

  // Check string-based nakshatra pattern recognition
  if (!isNakshatra && typeof term === 'string') {
    const nakshatraAnalysis = analyzeStringForNakshatraPatterns(term);
    if (nakshatraAnalysis.isNakshatra) {
      isNakshatra = true;
      nakshatraType = nakshatraAnalysis.type;
      nakshatraForm = nakshatraAnalysis.form;
      nakshatraJustification = nakshatraAnalysis.identification;
      nakshatraStrength = nakshatraAnalysis.confidence;
      variantMatches = nakshatraAnalysis.matches;
    }
  }

  // Check context-based nakshatra hints
  if (!isNakshatra && context.nakshatraType) {
    const contextType = context.nakshatraType.toLowerCase();
    if (contextType === 'phalguni' || contextType === 'prosthapada') {
      isNakshatra = true;
      nakshatraType = contextType;
      nakshatraForm = 'contextual';
      nakshatraJustification = 'Context-specified nakshatra type';
      nakshatraStrength = 0.85;
    }
  }

  // Check object-based nakshatra properties  
  if (!isNakshatra && typeof term === 'object' && term.nakshatra) {
    const objectAnalysis = analyzeStringForNakshatraPatterns(term.nakshatra);
    if (objectAnalysis.isNakshatra) {
      isNakshatra = true;
      nakshatraType = objectAnalysis.type;
      nakshatraForm = 'object_property';
      nakshatraJustification = `Object nakshatra property: ${objectAnalysis.identification}`;
      nakshatraStrength = objectAnalysis.confidence * 0.9; // Slight reduction for object indirection
      variantMatches = objectAnalysis.matches;
    }
  }

  // Update analysis
  analysis.nakshatraAnalysis = {
    isNakshatra,
    nakshatraType,
    nakshatraForm,
    nakshatraStrength,
    nakshatraJustification,
    variantMatches
  };

  return {
    isNakshatra: isNakshatra,
    nakshatraStrength: nakshatraStrength
  };
}

/**
 * Analyzes string for Phalgunī or Proṣṭhapadā patterns
 */
function analyzeStringForNakshatraPatterns(str) {
  const normalizedStr = str.trim().toLowerCase();
  const matches = [];
  let bestMatch = null;
  let bestConfidence = 0;

  // Check Phalgunī forms
  for (const form of NAKSHATRA_FORMS.phalguni) {
    if (form.toLowerCase() === normalizedStr) {
      const confidence = 0.95;
      matches.push({ form, type: 'phalguni', confidence });
      if (confidence > bestConfidence) {
        bestMatch = { type: 'phalguni', form: 'exact', confidence, identification: `Exact Phalgunī form: ${form}` };
        bestConfidence = confidence;
      }
    } else if (normalizedStr.includes(form.toLowerCase().substring(0, 4)) && normalizedStr.length <= form.length + 3) {
      const confidence = 0.7;
      matches.push({ form, type: 'phalguni', confidence });
      if (confidence > bestConfidence) {
        bestMatch = { type: 'phalguni', form: 'partial', confidence, identification: `Partial Phalgunī match: ${form}` };
        bestConfidence = confidence;
      }
    }
  }

  // Check Proṣṭhapadā forms
  for (const form of NAKSHATRA_FORMS.prosthapada) {
    if (form.toLowerCase() === normalizedStr) {
      const confidence = 0.95;
      matches.push({ form, type: 'prosthapada', confidence });
      if (confidence > bestConfidence) {
        bestMatch = { type: 'prosthapada', form: 'exact', confidence, identification: `Exact Proṣṭhapadā form: ${form}` };
        bestConfidence = confidence;
      }
    } else if (normalizedStr.includes(form.toLowerCase().substring(0, 5)) && normalizedStr.length <= form.length + 3) {
      const confidence = 0.7;
      matches.push({ form, type: 'prosthapada', confidence });
      if (confidence > bestConfidence) {
        bestMatch = { type: 'prosthapada', form: 'partial', confidence, identification: `Partial Proṣṭhapadā match: ${form}` };
        bestConfidence = confidence;
      }
    }
  }

  if (bestMatch) {
    return {
      isNakshatra: true,
      type: bestMatch.type,
      form: bestMatch.form,
      confidence: bestMatch.confidence,
      identification: bestMatch.identification,
      matches: matches
    };
  }

  return {
    isNakshatra: false,
    type: null,
    form: null,
    confidence: 0.0,
    identification: '',
    matches: []
  };
}

/**
 * Validates nakshatra domain context
 */
function validateNakshatraDomain(term, context, analysis) {
  let isNakshatraDomain = false;
  let domainType = null;
  let domainIndicators = [];
  let domainStrength = 0.0;
  let domainJustification = '';
  let contextualFactors = [];

  // Check explicit domain specification
  if (context.domain === 'nakshatra' || context.semanticCategory === 'nakshatra') {
    isNakshatraDomain = true;
    domainType = 'explicit_nakshatra_domain';
    domainStrength = 0.95;
    domainJustification = 'Explicit nakshatra domain specification';
    domainIndicators.push('explicit_domain');
  }

  // Check implicit domain indicators
  if (!isNakshatraDomain) {
    for (const indicator of NAKSHATRA_DOMAIN_INDICATORS.explicit) {
      if (context[indicator] === true || 
          (typeof context.domain === 'string' && context.domain.toLowerCase().includes(indicator))) {
        isNakshatraDomain = true;
        domainType = 'explicit_indicator_domain';
        domainStrength = 0.9;
        domainJustification = `Explicit domain indicator: ${indicator}`;
        domainIndicators.push(indicator);
        break;
      }
    }
  }

  // Check implicit contextual factors
  if (!isNakshatraDomain) {
    for (const factor of NAKSHATRA_DOMAIN_INDICATORS.implicit) {
      if (context[factor] === true || 
          (typeof context.context === 'string' && context.context.toLowerCase().includes(factor))) {
        if (domainStrength < 0.7) {
          isNakshatraDomain = true;
          domainType = 'implicit_indicator_domain';
          domainStrength = 0.7;
          domainJustification = `Implicit domain factor: ${factor}`;
          domainIndicators.push(factor);
        }
        contextualFactors.push(factor);
      }
    }
  }

  // Check astronomical context clues
  if (!isNakshatraDomain && context.astronomical === true) {
    isNakshatraDomain = true;
    domainType = 'astronomical_context';
    domainStrength = 0.8;
    domainJustification = 'Astronomical context suggests nakshatra domain';
    domainIndicators.push('astronomical');
  }

  // Update analysis
  analysis.domainAnalysis = {
    isNakshatraDomain,
    domainType,
    domainIndicators,
    domainStrength,
    domainJustification,
    contextualFactors
  };

  return {
    isNakshatraDomain: isNakshatraDomain,
    domainStrength: domainStrength
  };
}

/**
 * Evaluates dual-plural optionality applicability for nakshatras
 */
function evaluateDualPluralOptionalityForNakshatra(term, context, analysis) {
  let dualPluralApplies = false;
  let optionalityType = null;
  let optionalityConditions = [];
  let semanticPlurality = false;
  let optionalityStrength = 0.0;
  let optionalityJustification = '';

  // Check for explicit dual-plural optionality specification
  if (context.dualPlural === true || context.semanticPlural === true) {
    dualPluralApplies = true;
    optionalityType = 'explicit_dual_plural';
    optionalityStrength = 0.95;
    optionalityJustification = 'Explicit dual-plural optionality specification';
    semanticPlurality = true;
    optionalityConditions.push(DUAL_PLURAL_CONDITIONS.semantic_plurality);
  }

  // Check for astronomical grouping context
  if (!dualPluralApplies && (context.grouping === true || context.constellation_pair === true)) {
    dualPluralApplies = true;
    optionalityType = 'astronomical_grouping';
    optionalityStrength = 0.85;
    optionalityJustification = 'Astronomical grouping allows dual-plural optionality';
    semanticPlurality = true;
    optionalityConditions.push(DUAL_PLURAL_CONDITIONS.astronomical_grouping);
  }

  // Check for contextual emphasis
  if (!dualPluralApplies && (context.emphasis === true || context.collective === true)) {
    dualPluralApplies = true;
    optionalityType = 'contextual_emphasis';
    optionalityStrength = 0.8;
    optionalityJustification = 'Contextual emphasis allows dual-plural optionality';
    semanticPlurality = true;
    optionalityConditions.push(DUAL_PLURAL_CONDITIONS.contextual_emphasis);
  }

  // Check for stylistic variation
  if (!dualPluralApplies && context.stylisticVariation === true) {
    dualPluralApplies = true;
    optionalityType = 'stylistic_variation';
    optionalityStrength = 0.75;
    optionalityJustification = 'Stylistic variation allows dual-plural optionality';
    semanticPlurality = true;
    optionalityConditions.push(DUAL_PLURAL_CONDITIONS.stylistic_variation);
  }

  // Default optionality for recognized nakshatras in nakshatra domain
  if (!dualPluralApplies && analysis.nakshatraAnalysis.isNakshatra && analysis.domainAnalysis.isNakshatraDomain) {
    dualPluralApplies = true;
    optionalityType = 'default_nakshatra_optionality';
    // Adjust strength based on nakshatra recognition form and strength
    const baseStrength = analysis.nakshatraAnalysis.nakshatraStrength || 0.7;
    const formFactor = analysis.nakshatraAnalysis.nakshatraForm === 'exact' ? 0.1 : 0.0;
    // For romanized forms without diacritics, reduce strength slightly
    const isRomanized = typeof term === 'string' && /^[a-z]+$/i.test(term) && !term.includes('ī') && !term.includes('ā');
    const romanizedPenalty = isRomanized ? 0.15 : 0.0;
    optionalityStrength = Math.max(0.6, Math.min(baseStrength + formFactor - romanizedPenalty, 0.8)); // Cap at 0.8
    optionalityJustification = 'Default dual-plural optionality for Phalgunī/Proṣṭhapadā in nakshatra domain';
    semanticPlurality = true;
    optionalityConditions.push(DUAL_PLURAL_CONDITIONS.traditional_usage);
  }

  // Update analysis
  analysis.dualPluralAnalysis = {
    dualPluralApplies,
    optionalityType,
    optionalityConditions,
    semanticPlurality,
    optionalityStrength,
    optionalityJustification
  };

  return {
    dualPluralApplies: dualPluralApplies,
    optionalityStrength: optionalityStrength
  };
}

/**
 * Generates number options for nakshatra terms
 */
function generateNakshatraNumberOptions(term, context, analysis, priorResult) {
  const baseOptions = ['dual']; // Default for nakshatra dual forms
  const enhancedOptions = [...baseOptions];
  const priorityOrder = [];
  const optionJustifications = {};

  // Add plural option based on dual-plural optionality
  if (analysis.dualPluralAnalysis.semanticPlurality) {
    enhancedOptions.push('plural');
    optionJustifications.plural = 'Dual nakshatra optionally conveys plural sense (1.2.60)';
  }

  // Establish priority order based on context and strength
  if (analysis.dualPluralAnalysis.optionalityStrength > 0.8) {
    priorityOrder.push('plural', 'dual');
  } else {
    priorityOrder.push('dual', 'plural');
  }

  // Add singular option if context suggests mixed usage
  if (context.mixedUsage === true || context.variableNumber === true) {
    enhancedOptions.push('singular');
    optionJustifications.singular = 'Context allows variable number usage';
    priorityOrder.push('singular');
  }

  // Update analysis
  analysis.numberOptionAnalysis = {
    baseNumber: 'dual',
    availableOptions: enhancedOptions,
    priorOptions: priorResult ? (priorResult.numberOptions || []) : [],
    enhancedOptions: enhancedOptions,
    priorityOrder: priorityOrder,
    optionJustifications: optionJustifications
  };

  return enhancedOptions;
}

/**
 * Integrates prior sutra results with nakshatra analysis
 */
function integratePriorNakshatraResults(priorResult, currentOptions, analysis) {
  let finalOptions = [...currentOptions];
  let integrationStrategies = [];
  let conflictResolution = null;
  let enhancementType = null;

  if (priorResult && priorResult.numberOptions) {
    const priorOptions = priorResult.numberOptions;
    
    // Strategy 1: Union of options (additive enhancement)
    const unionOptions = [...new Set([...priorOptions, ...currentOptions])];
    
    // Strategy 2: Intersection (conservative approach)
    const intersectionOptions = priorOptions.filter(opt => currentOptions.includes(opt));
    
    // Strategy 3: Prioritize nakshatra-specific analysis
    if (analysis.dualPluralAnalysis.optionalityStrength > 0.8) {
      finalOptions = unionOptions;
      enhancementType = 'nakshatra_priority_union';
      integrationStrategies.push('union_with_nakshatra_priority');
    } else if (intersectionOptions.length > 0) {
      // For nakshatra-specific rules, always include nakshatra options even with intersection
      const enhancedIntersection = [...new Set([...intersectionOptions, ...currentOptions])];
      finalOptions = enhancedIntersection;
      enhancementType = 'enhanced_intersection';
      integrationStrategies.push('enhanced_intersection_with_nakshatra_options');
    } else {
      finalOptions = unionOptions;
      enhancementType = 'fallback_union';
      integrationStrategies.push('fallback_union');
    }

    // Handle conflicts
    if (priorOptions.length > 0 && currentOptions.length > 0 && intersectionOptions.length === 0) {
      conflictResolution = 'nakshatra_specific_takes_precedence';
      finalOptions = currentOptions; // Nakshatra-specific rule takes precedence
    }
  }

  // Update analysis
  analysis.priorResultIntegration = {
    hasPriorResult: !!priorResult,
    priorSutra: priorResult ? priorResult.sutra : null,
    integrationStrategies,
    conflictResolution,
    enhancementType
  };

  return {
    finalOptions: finalOptions,
    enhancementType: enhancementType
  };
}

/**
 * Calculates final confidence assessment
 */
function calculateFinalNakshatraConfidence(analysis) {
  const weights = {
    nakshatraRecognition: 0.3,
    domainValidation: 0.25,
    dualPluralApplicability: 0.25,
    numberOptionGeneration: 0.1,
    traditional: 0.1
  };

  const confidence = {
    overall: 0.0,
    nakshatraRecognition: analysis.nakshatraAnalysis.nakshatraStrength,
    domainValidation: analysis.domainAnalysis.domainStrength,
    dualPluralApplicability: analysis.dualPluralAnalysis.optionalityStrength,
    numberOptionGeneration: 0.9, // High confidence in option generation
    traditional: 0.85, // Traditional grammar compliance
    factors: []
  };

  // Calculate weighted overall confidence
  confidence.overall = 
    confidence.nakshatraRecognition * weights.nakshatraRecognition +
    confidence.domainValidation * weights.domainValidation +
    confidence.dualPluralApplicability * weights.dualPluralApplicability +
    confidence.numberOptionGeneration * weights.numberOptionGeneration +
    confidence.traditional * weights.traditional;

  // Determine confidence factors
  if (confidence.nakshatraRecognition > 0.9) {
    confidence.factors.push('high_nakshatra_recognition');
  }
  if (confidence.domainValidation > 0.9) {
    confidence.factors.push('explicit_domain_validation');
  }
  if (confidence.dualPluralApplicability > 0.8) {
    confidence.factors.push('strong_dual_plural_applicability');
  }

  return confidence;
}

// === EXPORT FUNCTIONS ===

/**
 * Main exported function for Sutra 1.2.60 with parameter handling
 */
export function applySutra1_2_60(term, priorResult, context = {}) {
  // Handle parameter ambiguity - if priorResult looks like context, treat it as context
  let actualPriorResult = priorResult;
  let actualContext = context;
  
  if (priorResult && typeof priorResult === 'object' && 
      (priorResult.domain !== undefined || priorResult.semanticCategory !== undefined) &&
      !priorResult.numberOptions && !priorResult.applied) {
    // This looks like context, not priorResult
    actualPriorResult = null;
    actualContext = priorResult;
  }

  // Handle null/undefined inputs
  if (!term) {
    return {
      applied: false,
      term: term,
      numberOptions: actualPriorResult ? [...(actualPriorResult.numberOptions || [])] : [],
      analysis: { 
        sutra: '1.2.60', 
        applied: false,
        inputAnalysis: {
          isValid: false,
          termType: 'invalid',
          hasContext: false,
          hasPriorResult: !!actualPriorResult,
          script: null,
          inputComplexity: 'invalid'
        }
      },
      confidence: { overall: 0.1 }
    };
  }

  const result = sutra1260(term, actualPriorResult, actualContext);
  
  const legacyResult = {
    applied: result.applied,
    term: result.term,
    numberOptions: result.numberOptions,
    analysis: result.analysis,
    confidence: result.confidence,
    semanticPlural: result.semanticPlural,
    explanation: result.explanation
  };

  // Integrate with existing utility for legacy compatibility
  try {
    const utilityResult = utilitySutra1_2_60(term, actualContext);
    
    if (utilityResult.applied && result.applied) {
      // Both agree - enhance with comprehensive analysis
      return {
        applied: true,
        term: result.term,
        numberOptions: result.numberOptions,
        semanticPlural: result.semanticPlural || utilityResult.semanticPlural,
        explanation: result.explanation,
        analysis: result.analysis,
        confidence: result.confidence
      };
    } else if (result.applied) {
      // Comprehensive analysis succeeded where utility failed
      return legacyResult;
    } else {
      // Both failed - return comprehensive analysis for debugging
      return legacyResult;
    }
  } catch (error) {
    // Fallback if utility fails
    return legacyResult;
  }
}

// Legacy compatibility export
export function sutra_1_2_60(term, context = {}) {
  return applySutra1_2_60(term, null, context);
}

// Export both functions for compatibility
export default applySutra1_2_60;
