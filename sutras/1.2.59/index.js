/**
 * Sutra 1.2.59: अस्मदो द्वायोश्च (asmado dvāyoś ca)
 * "And for the pronoun asmad (I/we) likewise (plural optionally, even when singular or dual sense)"
 * 
 * This sutra extends the optional plural principle from class nouns (1.2.58) to the first-person pronoun asmad.
 * The pronoun asmad can optionally take plural forms even when expressing singular or dual meaning.
 * 
 * Implementation Philosophy:
 * - Comprehensive analysis of asmad pronoun forms and variants
 * - Multi-script support (IAST, Devanagari, romanized)
 * - Context-aware semantic analysis and number option generation
 * - Integration with prior sutra results while maintaining independent analysis
 * - Advanced confidence assessment and linguistic justification
 * 
 * @fileoverview Comprehensive implementation of Pāṇinian pronoun number optionality
 * @author AI Agent (following systematic Phase 3a enhancement methodology)
 * @version 2.0.0 - Comprehensive Architecture
 */

// Import dependencies for comprehensive analysis
import { extendOptionalNumberWithAsmad } from '../sanskrit-utils/number-determination.js';

// === CORE CONSTANTS AND LINGUISTIC DATA ===

/**
 * Comprehensive asmad pronoun forms across scripts and variations
 */
const ASMAD_PRONOUN_FORMS = {
  // Primary forms
  primary: new Set([
    'asmad',     // IAST base form
    'अस्मद्',     // Devanagari base form  
    'asmān',     // Alternative IAST form
    'अस्मान्',    // Alternative Devanagari form
  ]),
  
  // Inflected forms that could appear in context
  inflected: new Set([
    'aham',      // First person singular nominative
    'अहम्',      // Devanagari first person singular
    'vayam',     // First person plural nominative
    'वयम्',      // Devanagari first person plural
    'mama',      // First person singular genitive
    'मम',        // Devanagari first person singular genitive
    'asmākam',   // First person plural genitive
    'अस्माकम्',   // Devanagari first person plural genitive
  ]),
  
  // Romanized variations for broader compatibility
  romanized: new Set([
    'asmad',
    'asman',
    'asmat',
    'aham',
    'vayam',
    'mama',
    'asmakam'
  ])
};

/**
 * Semantic context indicators for number analysis
 */
const SEMANTIC_NUMBER_INDICATORS = {
  singular: new Set([
    'eka',       // one
    'एक',        // one (Devanagari)
    'single',
    'individual',
    'self',
    'स्वयम्'      // self (Devanagari)
  ]),
  
  dual: new Set([
    'dvā',       // two
    'द्वा',       // two (Devanagari) 
    'ubhau',     // both
    'उभौ',       // both (Devanagari)
    'yugmam',    // pair
    'युग्मम्'     // pair (Devanagari)
  ]),
  
  plural: new Set([
    'bahu',      // many
    'बहु',        // many (Devanagari)
    'sarva',     // all
    'सर्व',       // all (Devanagari)
    'multiple',
    'group',
    'collective'
  ])
};

/**
 * Optional plural application conditions for asmad
 */
const ASMAD_OPTIONALITY_CONDITIONS = {
  semantic_emphasis: 'semantic_emphasis',
  stylistic_variation: 'stylistic_variation', 
  contextual_plurality: 'contextual_plurality',
  traditional_usage: 'traditional_usage',
  dvandva_coordination: 'dvandva_coordination',
  honorific_plurality: 'honorific_plurality'
};

// === MAIN SUTRA FUNCTION ===

/**
 * Applies Sutra 1.2.59: Optional plural for asmad pronoun
 * @param {string|Object} term - The term to analyze (asmad or related pronoun)
 * @param {Object} priorResult - Result from previous sutra application (e.g., 1.2.58)
 * @param {Object} context - Additional linguistic and semantic context
 * @returns {Object} - Comprehensive analysis result with number options
 */
export function sutra1259(term, priorResult, context = {}) {
  // Initialize comprehensive analysis structure
  const analysis = {
    sutra: '1.2.59',
    sutraText: 'अस्मदो द्वायोश्च',
    applied: false,
    term: term,
    numberOptions: [],
    priorIntegration: !!priorResult,

    // Detailed analysis phases
    inputAnalysis: {
      isValid: false,
      termType: null,
      hasContext: false,
      hasPriorResult: false,
      script: null,
      inputComplexity: null
    },

    // Asmad Pronoun Analysis
    asmadPronounAnalysis: {
      isAsmadPronoun: false,
      pronounForm: null,
      pronounType: null,
      pronounStrength: 0.0,
      pronounJustification: '',
      formMatches: []
    },

    // Semantic Number Analysis  
    semanticNumberAnalysis: {
      semanticNumber: null,
      numberIndicators: [],
      numberStrength: 0.0,
      numberJustification: '',
      contextualFactors: []
    },

    // Optional Plural Analysis
    optionalPluralAnalysis: {
      optionalityApplies: false,
      optionalityType: null,
      optionalityConditions: [],
      dvandvaCoordination: false,
      honorificPlurality: false,
      optionalityStrength: 0.0,
      optionalityJustification: ''
    },

    // Number Option Analysis
    numberOptionAnalysis: {
      baseNumber: 'singular',
      availableOptions: ['singular'],
      priorOptions: [],
      enhancedOptions: [],
      optionalOptions: [],
      numberFlexibility: 0.0,
      optionJustifications: {}
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      asmadPronounDetection: 0.0,
      semanticNumberAssessment: 0.0,
      optionalPluralApplicability: 0.0,
      numberOptionGeneration: 0.0,
      traditional: 0.0,
      factors: []
    }
  };

  // Phase 1: Input Validation and Basic Analysis
  const inputValidation = validateInput(term, priorResult, context, analysis);
  if (!inputValidation.isValid) {
    analysis.applied = false;
    analysis.confidence.overall = 0.1;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['singular'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 2: Asmad Pronoun Identification and Classification
  const asmadPronounClassification = classifyAsmadPronoun(term, context, analysis);
  
  if (!asmadPronounClassification.isAsmadPronoun) {
    analysis.applied = false;
    analysis.optionalPluralAnalysis.optionalityJustification = 'not_asmad_pronoun';
    analysis.confidence.overall = 0.2;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['singular'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Semantic Number Analysis and Context Assessment
  const semanticNumberAssessment = assessSemanticNumber(term, context, analysis);

  // Phase 4: Optional Plural Applicability Assessment
  const optionalPluralEvaluation = evaluateAsmadOptionalPluralApplicability(term, context, analysis);

  if (!optionalPluralEvaluation.optionalityApplies) {
    analysis.applied = false;
    analysis.optionalPluralAnalysis.optionalityJustification = 'optional_plural_not_applicable';
    analysis.confidence.overall = 0.4;
    return {
      applied: false,
      term: term,
      numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : ['singular'],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 5: Number Option Generation and Integration
  analysis.applied = true;
  
  // Start with prior result options if available
  let baseOptions = priorResult ? [...(priorResult.numberOptions || [])] : ['singular'];
  analysis.numberOptionAnalysis.priorOptions = [...baseOptions];
  
  // Ensure plural is available for asmad
  if (!baseOptions.includes('plural')) {
    baseOptions.push('plural');
  }
  
  analysis.numberOptions = baseOptions;
  analysis.numberOptionAnalysis.availableOptions = [...baseOptions];
  analysis.numberOptionAnalysis.enhancedOptions = ['plural'];
  analysis.numberOptionAnalysis.optionalOptions = ['plural'];
  
  // Generate option justifications
  analysis.numberOptionAnalysis.optionJustifications = {
    singular: 'Base singular form for asmad pronoun',
    plural: 'Strong optional plural for asmad pronoun (अस्मदो द्वायोश्च)'
  };
  
  if (baseOptions.includes('dual')) {
    analysis.numberOptionAnalysis.optionJustifications.dual = 'Dual form extended with optional plural';
  }

  // Calculate number flexibility
  analysis.numberOptionAnalysis.numberFlexibility = 0.9; // High flexibility for asmad

  // Phase 6: Comprehensive Confidence Assessment
  const confidenceAssessment = assessConfidence(analysis);

  // Return comprehensive result
  return {
    applied: true,
    term: term,
    numberOptions: analysis.numberOptions,
    analysis: analysis,
    confidence: analysis.confidence,
    sutra: '1.2.59',
    priorResult: priorResult,
    explanation: analysis.optionalPluralAnalysis.optionalityJustification || 'Asmad pronoun allows optional plural'
  };
}

// === ANALYSIS HELPER FUNCTIONS ===

/**
 * Validates input parameters and initializes basic analysis
 */
function validateInput(term, priorResult, context, analysis) {
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
  inputComplexity = determineAsmadInputComplexity(term, context);

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
function determineAsmadInputComplexity(term, context) {
  if (typeof term === 'string' && term.length < 6 && (!context || !context.semanticNumber)) {
    return 'simple';
  } else if (typeof term === 'object' && term && (term.pronounProperties || term.properties)) {
    return 'complex';
  } else {
    return 'moderate';
  }
}

/**
 * Classifies asmad pronoun presence and characteristics
 */
function classifyAsmadPronoun(term, context, analysis) {
  let isAsmadPronoun = false;
  let pronounForm = null;
  let pronounType = null;
  let pronounStrength = 0.0;
  let pronounJustification = '';
  let formMatches = [];

  // Check for explicit asmad pronoun flag
  if (typeof term === 'object' && term.isAsmadPronoun === true) {
    isAsmadPronoun = true;
    pronounType = 'explicit_asmad_pronoun';
    pronounJustification = 'Explicitly marked as asmad pronoun';
    pronounStrength = 0.95;
    pronounForm = 'explicit';
  }

  // Check context asmad pronoun specification
  if (!isAsmadPronoun && context && context.isAsmadPronoun === true) {
    isAsmadPronoun = true;
    pronounType = 'context_asmad_pronoun';
    pronounJustification = 'Context-specified asmad pronoun';
    pronounStrength = 0.9;
    pronounForm = 'contextual';
  }

  // Check asmadOptional context flag as implicit asmad pronoun indicator
  if (!isAsmadPronoun && context && context.asmadOptional === true) {
    isAsmadPronoun = true;
    pronounType = 'context_asmad_pronoun';
    pronounJustification = 'Context asmadOptional flag indicates asmad pronoun';
    pronounStrength = 0.9;
    pronounForm = 'contextual';
  }

  // Check string-based asmad pronoun pattern recognition
  if (!isAsmadPronoun && typeof term === 'string') {
    const asmadAnalysis = analyzeStringForAsmadPronounPatterns(term);
    if (asmadAnalysis.isAsmadPronoun) {
      isAsmadPronoun = true;
      pronounType = 'string_pattern_recognition';
      pronounForm = asmadAnalysis.form;
      pronounJustification = asmadAnalysis.identification;
      pronounStrength = asmadAnalysis.confidence;
      formMatches = asmadAnalysis.matches;
    }
  }

  // Check semantic asmad pronoun properties
  if (!isAsmadPronoun && typeof term === 'object') {
    const semanticAnalysis = analyzeSemanticAsmadPronounProperties(term);
    if (semanticAnalysis.isAsmadPronoun) {
      isAsmadPronoun = true;
      pronounType = 'semantic_asmad_pronoun';
      pronounForm = semanticAnalysis.form;
      pronounJustification = semanticAnalysis.identification;
      pronounStrength = semanticAnalysis.confidence;
    }
  }

  // Update analysis
  analysis.asmadPronounAnalysis = {
    isAsmadPronoun,
    pronounForm,
    pronounType,
    pronounStrength,
    pronounJustification,
    formMatches
  };

  return {
    isAsmadPronoun: isAsmadPronoun,
    pronounStrength: pronounStrength
  };
}

/**
 * Analyzes string for asmad pronoun patterns
 */
function analyzeStringForAsmadPronounPatterns(str) {
  const normalizedStr = str.trim().toLowerCase();
  const matches = [];
  let bestMatch = null;
  let bestConfidence = 0;

  // Check primary forms
  for (const form of ASMAD_PRONOUN_FORMS.primary) {
    if (form.toLowerCase() === normalizedStr) {
      const confidence = 0.95;
      matches.push({ form, type: 'primary', confidence });
      if (confidence > bestConfidence) {
        bestMatch = { form: 'primary', confidence, identification: `Primary asmad form: ${form}` };
        bestConfidence = confidence;
      }
    }
  }

  // Check inflected forms
  if (!bestMatch) {
    for (const form of ASMAD_PRONOUN_FORMS.inflected) {
      if (form.toLowerCase() === normalizedStr) {
        const confidence = 0.85;
        matches.push({ form, type: 'inflected', confidence });
        if (confidence > bestConfidence) {
          bestMatch = { form: 'inflected', confidence, identification: `Inflected asmad form: ${form}` };
          bestConfidence = confidence;
        }
      }
    }
  }

  // Check romanized forms
  if (!bestMatch) {
    for (const form of ASMAD_PRONOUN_FORMS.romanized) {
      if (form.toLowerCase() === normalizedStr) {
        const confidence = 0.75;
        matches.push({ form, type: 'romanized', confidence });
        if (confidence > bestConfidence) {
          bestMatch = { form: 'romanized', confidence, identification: `Romanized asmad form: ${form}` };
          bestConfidence = confidence;
        }
      }
    }
  }

  if (bestMatch) {
    return {
      isAsmadPronoun: true,
      form: bestMatch.form,
      confidence: bestMatch.confidence,
      identification: bestMatch.identification,
      matches: matches
    };
  }

  return {
    isAsmadPronoun: false,
    form: null,
    confidence: 0.0,
    identification: '',
    matches: []
  };
}

/**
 * Analyzes semantic properties for asmad pronoun indicators
 */
function analyzeSemanticAsmadPronounProperties(term) {
  let isAsmadPronoun = false;
  let form = null;
  let confidence = 0.0;
  let identification = '';

  // Check for asmad pronoun semantic properties
  if (term.pronounType === 'firstPerson' || term.person === 'first') {
    isAsmadPronoun = true;
    form = 'semantic_first_person';
    confidence = 0.8;
    identification = 'First person pronoun detected';
  }

  // Check for specific asmad-related properties
  if (!isAsmadPronoun && (term.asmadProperties || term.pronounClass === 'asmad')) {
    isAsmadPronoun = true;
    form = 'semantic_asmad_class';
    confidence = 0.9;
    identification = 'Asmad pronoun class detected';
  }

  // Check for first-person indicators
  if (!isAsmadPronoun && term.properties && term.properties.firstPerson) {
    isAsmadPronoun = true;
    form = 'semantic_first_person_property';
    confidence = 0.75;
    identification = 'First person property detected';
  }

  return {
    isAsmadPronoun,
    form,
    confidence,
    identification
  };
}

/**
 * Assesses semantic number characteristics
 */
function assessSemanticNumber(term, context, analysis) {
  let semanticNumber = null;
  let numberIndicators = [];
  let numberStrength = 0.0;
  let numberJustification = '';
  let contextualFactors = [];

  // Check for explicit semantic number specification
  if (context.semanticNumber) {
    semanticNumber = context.semanticNumber;
    numberStrength = 0.9;
    numberJustification = 'Explicit semantic number specification';
    contextualFactors.push('explicit_semantic_number');
  }

  // Check for number indicators in context
  if (!semanticNumber) {
    for (const [number, indicators] of Object.entries(SEMANTIC_NUMBER_INDICATORS)) {
      for (const indicator of indicators) {
        if (context.description && context.description.includes(indicator)) {
          semanticNumber = number;
          numberIndicators.push(indicator);
          numberStrength = 0.7;
          numberJustification = `Semantic number indicator: ${indicator}`;
          contextualFactors.push('contextual_number_indicator');
          break;
        }
      }
      if (semanticNumber) break;
    }
  }

  // Check for grammatical number from prior result
  if (!semanticNumber && analysis.inputAnalysis.hasPriorResult) {
    // Infer semantic number from prior analysis
    semanticNumber = 'context_dependent';
    numberStrength = 0.6;
    numberJustification = 'Semantic number inferred from prior context';
    contextualFactors.push('prior_result_inference');
  }

  // Default semantic number for asmad
  if (!semanticNumber) {
    semanticNumber = 'default_first_person';
    numberStrength = 0.5;
    numberJustification = 'Default semantic number for asmad pronoun';
    contextualFactors.push('asmad_default');
  }

  // Update analysis
  analysis.semanticNumberAnalysis = {
    semanticNumber,
    numberIndicators,
    numberStrength,
    numberJustification,
    contextualFactors
  };

  return {
    hasSemanticNumber: true,
    numberStrength: numberStrength
  };
}

/**
 * Evaluates optional plural applicability for asmad
 */
function evaluateAsmadOptionalPluralApplicability(term, context, analysis) {
  let optionalityApplies = false;
  let optionalityType = null;
  let optionalityConditions = [];
  let dvandvaCoordination = false;
  let honorificPlurality = false;
  let optionalityStrength = 0.0;
  let optionalityJustification = '';

  // Check for explicit optionality specification
  if (context.optionalPlural === true || context.asmadOptional === true) {
    optionalityApplies = true;
    optionalityType = 'explicit_optionality';
    optionalityStrength = 0.95;
    optionalityJustification = 'Explicit asmad optional plural specification';
    optionalityConditions.push(ASMAD_OPTIONALITY_CONDITIONS.semantic_emphasis);
  }

  // Check for dvandva coordination (compound coordination)
  if (context.dvandva === true || context.coordination === true) {
    if (!optionalityApplies) {
      optionalityApplies = true;
      optionalityType = 'dvandva_coordination';
      optionalityStrength = 0.85;
      optionalityJustification = 'Dvandva coordination allows optional plural';
    }
    dvandvaCoordination = true;
    optionalityConditions.push(ASMAD_OPTIONALITY_CONDITIONS.dvandva_coordination);
  }

  // Check for honorific plurality
  if (context.honorific === true || context.respectful === true) {
    if (!optionalityApplies) {
      optionalityApplies = true;
      optionalityType = 'honorific_plurality';
      optionalityStrength = 0.8;
      optionalityJustification = 'Honorific usage allows optional plural';
    }
    honorificPlurality = true;
    optionalityConditions.push(ASMAD_OPTIONALITY_CONDITIONS.honorific_plurality);
  }

  // Check for stylistic variation conditions
  if (context.stylisticVariation === true) {
    if (!optionalityApplies) {
      optionalityApplies = true;
      optionalityType = 'stylistic_variation';
      optionalityStrength = 0.75;
      optionalityJustification = 'Stylistic variation allows optional plural';
    }
    optionalityConditions.push(ASMAD_OPTIONALITY_CONDITIONS.stylistic_variation);
  }

  // Default optionality for asmad (the core principle of this sutra)
  if (!optionalityApplies && 
      analysis.asmadPronounAnalysis.pronounStrength >= 0.7) {
    optionalityApplies = true;
    optionalityType = 'default_asmad_optionality';
    optionalityStrength = 0.8;
    optionalityJustification = 'Default asmad optionality (अस्मदो द्वायोश्च)';
    optionalityConditions.push(ASMAD_OPTIONALITY_CONDITIONS.traditional_usage);
  }

  // Update analysis
  analysis.optionalPluralAnalysis = {
    optionalityApplies,
    optionalityType,
    optionalityConditions,
    dvandvaCoordination,
    honorificPlurality,
    optionalityStrength,
    optionalityJustification
  };

  return {
    optionalityApplies: optionalityApplies,
    optionalityStrength: optionalityStrength
  };
}

/**
 * Assesses overall confidence in the analysis
 */
function assessConfidence(analysis) {
  let overall = 0.0;
  let asmadPronounDetection = 0.0;
  let semanticNumberAssessment = 0.0;
  let optionalPluralApplicability = 0.0;
  let numberOptionGeneration = 0.0;
  let traditional = 0.85; // High traditional confidence for this well-established sutra
  const factors = [];

  // Asmad pronoun detection confidence
  asmadPronounDetection = analysis.asmadPronounAnalysis.pronounStrength;
  if (asmadPronounDetection >= 0.9) {
    factors.push('high_asmad_pronoun_confidence');
  } else if (asmadPronounDetection >= 0.7) {
    factors.push('moderate_asmad_pronoun_confidence');
  } else {
    factors.push('low_asmad_pronoun_confidence');
  }

  // Semantic number assessment confidence
  semanticNumberAssessment = analysis.semanticNumberAnalysis.numberStrength;
  if (semanticNumberAssessment >= 0.8) {
    factors.push('high_semantic_number_confidence');
  } else if (semanticNumberAssessment >= 0.6) {
    factors.push('moderate_semantic_number_confidence');
  } else {
    factors.push('low_semantic_number_confidence');
  }

  // Optional plural applicability confidence
  optionalPluralApplicability = analysis.optionalPluralAnalysis.optionalityStrength;
  if (optionalPluralApplicability >= 0.8) {
    factors.push('high_optionality_confidence');
  } else if (optionalPluralApplicability >= 0.6) {
    factors.push('moderate_optionality_confidence');
  } else {
    factors.push('low_optionality_confidence');
  }

  // Number option generation confidence
  numberOptionGeneration = analysis.numberOptionAnalysis.numberFlexibility;
  if (numberOptionGeneration >= 0.8) {
    factors.push('high_flexibility_confidence');
  } else if (numberOptionGeneration >= 0.5) {
    factors.push('moderate_flexibility_confidence');
  } else {
    factors.push('low_flexibility_confidence');
  }

  // Calculate overall confidence
  overall = (asmadPronounDetection * 0.35 + semanticNumberAssessment * 0.2 + 
            optionalPluralApplicability * 0.25 + numberOptionGeneration * 0.1 + traditional * 0.1);

  // Update analysis
  analysis.confidence = {
    overall,
    asmadPronounDetection,
    semanticNumberAssessment,
    optionalPluralApplicability,
    numberOptionGeneration,
    traditional,
    factors
  };

  return analysis.confidence;
}

// === LEGACY COMPATIBILITY LAYER ===

/**
 * Legacy compatibility function
 * @param {string|Object} term - The term to analyze
 * @param {Object} priorResult - Result from previous sutra
 * @param {Object} context - Additional context
 * @returns {Object} - Legacy-compatible result
 */
export function applySutra1_2_59(term, priorResult, context = {}) {
  // Handle parameter ambiguity - if priorResult looks like context, treat it as context
  let actualPriorResult = priorResult;
  let actualContext = context;
  
  if (priorResult && typeof priorResult === 'object' && 
      (priorResult.isAsmadPronoun !== undefined || priorResult.asmadOptional !== undefined) &&
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
        sutra: '1.2.59', 
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

  const result = sutra1259(term, actualPriorResult, actualContext);
  
  // Handle malformed context (ensure context is object)
  const safeContext = (actualContext && typeof actualContext === 'object') ? actualContext : {};
  
  const legacyResult = {
    applied: result.applied,
    term: result.term,
    numberOptions: result.numberOptions,
    analysis: result.analysis,
    confidence: result.confidence
  };

  // Integrate with existing asmad utility for legacy compatibility
  try {
    const utilityResult = extendOptionalNumberWithAsmad(term, priorResult, safeContext);
    
    // Merge results, prioritizing our comprehensive analysis but preserving utility compatibility
    return {
      ...utilityResult,  // Start with utility base
      ...legacyResult,   // Override with our comprehensive analysis
      // Ensure our enhanced analysis takes priority
      applied: result.applied,
      analysis: result.analysis,
      confidence: result.confidence,
      numberOptions: result.numberOptions
    };
  } catch (error) {
    // Fallback if utility fails
    return legacyResult;
  }
}

// Export both functions for compatibility
export default applySutra1_2_59;
