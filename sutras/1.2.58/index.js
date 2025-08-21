/**
 * Sutra 1.2.58: जात्याख्यायामेकस्मिन् बहुवचनमन्यतरस्याम्
 * In the case of a class-name in singular sense, plural may optionally be used
 * 
 * This sutra establishes the optional application (मन्यतरस्याम्) of plural endings
 * for class-denoting nouns (जात्याख्या) when used in a singular sense (एकस्मिन्).
 * This creates flexibility in expressing class concepts, allowing both singular
 * and plural forms to denote the same semantic content.
 * 
 * Traditional Commentary Integration:
 * The Kāśikā explains this as enabling the optional use of plural forms for
 * जातिवाचक (class-denoting) words even when referring to a single entity or
 * concept. This optionality allows for stylistic and contextual variations
 * in expression while maintaining semantic equivalence.
 * 
 * Implementation: Comprehensive class noun optional plural analysis system
 * Phase 1: Input validation and class noun identification
 * Phase 2: Singular sense determination and context analysis
 * Phase 3: Optional plural applicability assessment
 * Phase 4: Number option generation and confidence scoring
 * Phase 5: Legacy compatibility and result formatting
 */

import { determineOptionalNumber } from '../sanskrit-utils/number-determination.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

// Constants for class noun analysis
const CLASS_NOUN_CATEGORIES = {
  natural: ['जाति', 'प्रकार', 'वर्ग', 'समूह', 'गण'], // Natural class indicators
  artificial: ['तत्त्व', 'विषय', 'क्षेत्र', 'कार्य'], // Artificial class indicators
  abstract: ['भाव', 'गुण', 'धर्म', 'स्वभाव'], // Abstract class indicators
  collective: ['समुदाय', 'संग्रह', 'निकाय', 'मण्डल'], // Collective class indicators
  generic: ['सामान्य', 'सर्व', 'विश्व', 'सकल'] // Generic class indicators
};

const CLASS_NOUN_PATTERNS = {
  suffix_based: ['-त्व', '-ता', '-ना', '-मान्', '-वत्', '-मत्'],
  compound_based: ['जाति', 'वर्ग', 'गण', 'समूह', 'प्रकार'],
  semantic_based: ['देव', 'मनुष्य', 'पशु', 'पक्षी', 'वृक्ष']
};

const SINGULAR_SENSE_INDICATORS = {
  explicit: ['एक', 'एकल', 'एकमात्र', 'केवल'],
  implicit: ['समग्र', 'सम्पूर्ण', 'सकल', 'विश्व'],
  contextual: ['प्रतिनिधि', 'उदाहरण', 'नमूना', 'आदर्श']
};

const OPTIONAL_PLURAL_CONDITIONS = {
  semantic_equivalence: 'अर्थतुल्यता',
  stylistic_variation: 'शैलीविकल्प',
  contextual_emphasis: 'प्रसंगबल',
  traditional_usage: 'आगमप्रयोग'
};

/**
 * Main sutra function: Analyzes optional plural for class nouns in singular sense
 * @param {string|Object} term - The linguistic term to analyze
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive analysis result
 */
export function sutra1258(term, context = {}) {
  // Phase 1: Input Validation and Class Noun Identification
  const analysis = {
    sutra: '1.2.58',
    sutrasāra: 'जात्याख्यायामेकस्मिन् बहुवचनमन्यतरस्याम्',
    applied: false,
    term: term,
    numberOptions: [],

    // Input Analysis
    inputAnalysis: {
      isValid: false,
      termType: typeof term,
      hasContext: context && typeof context === 'object',
      contextProvided: false,
      script: 'unknown',
      inputComplexity: 'simple'
    },

    // Class Noun Analysis
    classNounAnalysis: {
      isClassNoun: false,
      classCategory: null,
      classType: null,
      classStrength: 0.0,
      classJustification: '',
      patternMatches: []
    },

    // Singular Sense Analysis
    singularSenseAnalysis: {
      hasSingularSense: false,
      senseType: null,
      senseStrength: 0.0,
      senseJustification: '',
      contextualFactors: []
    },

    // Optional Plural Analysis
    optionalPluralAnalysis: {
      optionalityApplies: false,
      optionalityType: null,
      optionalityConditions: [],
      semanticEquivalence: false,
      stylisticVariation: false,
      optionalityStrength: 0.0,
      optionalityJustification: ''
    },

    // Number Option Analysis
    numberOptionAnalysis: {
      baseNumber: 'singular',
      availableOptions: ['singular'],
      preferredOption: 'singular',
      optionalOptions: [],
      numberFlexibility: 0.0,
      optionJustifications: {}
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      classNounDetection: 0.0,
      singularSenseAssessment: 0.0,
      optionalPluralApplicability: 0.0,
      numberOptionGeneration: 0.0,
      traditional: 0.85,
      factors: []
    }
  };

  // Input validation
  if (!term || (typeof term !== 'string' && typeof term !== 'object')) {
    analysis.optionalPluralAnalysis.optionalityJustification = 'invalid_input';
    analysis.confidence.overall = 0.1;
    return {
      applied: false,
      term: term,
      numberOptions: [],
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  analysis.inputAnalysis.isValid = true;
  analysis.inputAnalysis.contextProvided = context && Object.keys(context).length > 0;
  analysis.inputAnalysis.script = detectScript(typeof term === 'string' ? term : term.text || '').toLowerCase();
  analysis.inputAnalysis.inputComplexity = determineInputComplexity(term, context);

  // Phase 2: Class Noun Identification and Classification
  const classNounClassification = classifyClassNoun(term, context, analysis);
  
  if (!classNounClassification.isClassNoun) {
    analysis.applied = false;
    analysis.optionalPluralAnalysis.optionalityJustification = 'not_a_class_noun';
    analysis.confidence.overall = 0.2;
    return {
      applied: false,
      term: term,
      numberOptions: ['singular'], // Default singular only
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Singular Sense Determination and Context Analysis
  const singularSenseAssessment = assessSingularSense(term, context, analysis);

  if (!singularSenseAssessment.hasSingularSense) {
    analysis.applied = false;
    analysis.optionalPluralAnalysis.optionalityJustification = 'no_singular_sense_detected';
    analysis.confidence.overall = 0.3;
    return {
      applied: false,
      term: term,
      numberOptions: ['plural'], // If no singular sense, default to plural only
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 4: Optional Plural Applicability Assessment
  const optionalPluralEvaluation = evaluateOptionalPluralApplicability(term, context, analysis);

  if (!optionalPluralEvaluation.optionalityApplies) {
    analysis.applied = false;
    analysis.optionalPluralAnalysis.optionalityJustification = 'optional_plural_not_applicable';
    analysis.confidence.overall = 0.4;
    return {
      applied: false,
      term: term,
      numberOptions: ['singular'], // Singular only if optionality doesn't apply
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 5: Number Option Generation and Confidence Assessment
  analysis.applied = true;
  analysis.numberOptions = ['singular', 'plural']; // Both options available

  // Apply class noun optional plural logic
  applyClassNounOptionalPluralLogic(analysis, context);

  // Calculate confidence
  calculateConfidence(analysis);

  // Generate comprehensive number options
  analysis.numberOptions = analysis.numberOptionAnalysis.availableOptions;

  return {
    applied: true,
    term: term,
    numberOptions: analysis.numberOptions,
    analysis: analysis,
    confidence: analysis.confidence
  };
}

/**
 * Determines input complexity for processing strategy
 */
function determineInputComplexity(term, context) {
  if (typeof term === 'string' && term.length < 8 && !context.classNounProperties) {
    return 'simple';
  } else if (typeof term === 'object' && term.classHierarchy) {
    return 'complex';
  } else {
    return 'moderate';
  }
}

/**
 * Classifies class noun presence and characteristics
 */
function classifyClassNoun(term, context, analysis) {
  let isClassNoun = false;
  let classCategory = null;
  let classType = null;
  let classStrength = 0.0;
  let classJustification = '';
  let patternMatches = [];

  // Check for explicit class noun flag
  if (typeof term === 'object' && term.isClassNoun === true) {
    isClassNoun = true;
    classType = 'explicit_class_noun';
    classJustification = 'Explicitly marked as class noun';
    classStrength = 0.9;
    classCategory = 'explicit';
  }

  // Check context class noun specification
  if (!isClassNoun && context.isClassNoun === true) {
    isClassNoun = true;
    classType = 'context_class_noun';
    classJustification = 'Context-specified class noun';
    classStrength = 0.85;
    classCategory = 'contextual';
  }

  // Check string-based class noun pattern recognition
  if (!isClassNoun && typeof term === 'string') {
    const classAnalysis = analyzeStringForClassNounPatterns(term);
    if (classAnalysis.isClassNoun) {
      isClassNoun = true;
      classType = 'string_pattern_recognition';
      classCategory = classAnalysis.category;
      classJustification = classAnalysis.identification;
      classStrength = classAnalysis.confidence;
      patternMatches = classAnalysis.patterns;
    }
  }

  // Check semantic class noun properties
  if (!isClassNoun && typeof term === 'object') {
    const semanticAnalysis = analyzeSemanticClassNounProperties(term);
    if (semanticAnalysis.isClassNoun) {
      isClassNoun = true;
      classType = 'semantic_class_noun';
      classCategory = semanticAnalysis.category;
      classJustification = semanticAnalysis.identification;
      classStrength = semanticAnalysis.confidence;
    }
  }

  // Update analysis
  analysis.classNounAnalysis.isClassNoun = isClassNoun;
  analysis.classNounAnalysis.classCategory = classCategory;
  analysis.classNounAnalysis.classType = classType;
  analysis.classNounAnalysis.classStrength = classStrength;
  analysis.classNounAnalysis.classJustification = classJustification;
  analysis.classNounAnalysis.patternMatches = patternMatches;

  return {
    isClassNoun: isClassNoun,
    classStrength: classStrength
  };
}

/**
 * Analyzes string for class noun patterns
 */
function analyzeStringForClassNounPatterns(str) {
  // Common class noun patterns in Sanskrit (order matters - more specific patterns first)
  const classNounPatterns = [
    { pattern: /(त्व|ता|ना)$/, category: 'abstract', confidence: 0.8, description: 'Abstract suffix pattern', priority: 'high' },
    { pattern: /(मान्|वान्|वत्|मत्)$/, category: 'possessive', confidence: 0.75, description: 'Possessive suffix pattern', priority: 'high' },
    { pattern: /(देव|मनुष्य|पशु|पक्षी)/, category: 'semantic', confidence: 0.9, description: 'Semantic class indicator', priority: 'medium' },
    { pattern: /(समुदाय|संग्रह|निकाय)/, category: 'collective', confidence: 0.8, description: 'Collective class indicator', priority: 'medium' },
    { pattern: /(जाति|वर्ग|गण|समूह)/, category: 'natural', confidence: 0.85, description: 'Natural class indicator', priority: 'medium' },
    { pattern: /(प्रकार|तत्त्व|विषय)/, category: 'artificial', confidence: 0.7, description: 'Artificial class indicator', priority: 'medium' }
  ];

  const matchedPatterns = [];
  let bestMatch = null;
  let bestConfidence = 0;
  let bestPriority = 'low';
  let bestPatternIndex = 999;

  const priorityValues = { 'high': 3, 'medium': 2, 'low': 1 };
  const highPrioritySemantics = ['देव']; // Special semantic elements that should maintain priority

  for (let i = 0; i < classNounPatterns.length; i++) {
    const { pattern, category, confidence, description, priority } = classNounPatterns[i];
    if (pattern.test(str)) {
      // Check for compound words - reduce semantic confidence unless it's a high-priority semantic element
      let adjustedConfidence = confidence;
      if (category === 'semantic' && !highPrioritySemantics.some(elem => str.includes(elem))) {
        if (str.includes('जाति') || str.includes('वर्ग') || str.includes('गण') || str.includes('समूह') || str.includes('समुदाय') || str.includes('संग्रह') || str.includes('निकाय') || str.includes('प्रकार') || str.includes('तत्त्व') || str.includes('विषय')) {
          // Reduce semantic confidence for compound words where structural element is present
          adjustedConfidence = confidence * 0.8;
        }
      }
      
      matchedPatterns.push({ pattern: pattern.source, category, confidence: adjustedConfidence, description, priority });
      
      // Priority-based selection: high priority wins, then confidence within same priority, then pattern order
      const currentPriorityValue = priorityValues[priority];
      const bestPriorityValue = priorityValues[bestPriority];
      
      if (currentPriorityValue > bestPriorityValue || 
          (currentPriorityValue === bestPriorityValue && adjustedConfidence > bestConfidence) ||
          (currentPriorityValue === bestPriorityValue && adjustedConfidence === bestConfidence && i < bestPatternIndex)) {
        bestMatch = { category, confidence: adjustedConfidence, description, priority };
        bestConfidence = adjustedConfidence;
        bestPriority = priority;
        bestPatternIndex = i;
      }
    }
  }

  if (bestMatch) {
    return {
      isClassNoun: true,
      category: bestMatch.category,
      confidence: bestMatch.confidence,
      identification: bestMatch.description,
      patterns: matchedPatterns
    };
  }

  return {
    isClassNoun: false,
    category: null,
    confidence: 0.0,
    identification: '',
    patterns: []
  };
}

/**
 * Analyzes semantic properties for class noun indicators
 */
function analyzeSemanticClassNounProperties(term) {
  let isClassNoun = false;
  let category = null;
  let confidence = 0.0;
  let identification = '';

  // Check for class noun semantic properties
  if (term.semanticCategory === 'class' || term.conceptType === 'class') {
    isClassNoun = true;
    category = 'semantic_class';
    confidence = 0.8;
    identification = 'Semantic class category detected';
  }

  // Check for type-related class functions
  if (!isClassNoun && (term.typeFunction || term.classFunction)) {
    const typeFunc = term.typeFunction || term.classFunction;
    if (['category', 'class', 'type', 'kind', 'group'].includes(typeFunc)) {
      isClassNoun = true;
      category = 'functional_class';
      confidence = 0.75;
      identification = `Type function: ${typeFunc}`;
    }
  }

  // Check for generic class indicators
  if (!isClassNoun && term.properties && term.properties.generic) {
    isClassNoun = true;
    category = 'generic_class';
    confidence = 0.7;
    identification = 'Generic class properties detected';
  }

  return {
    isClassNoun: isClassNoun,
    category: category,
    confidence: confidence,
    identification: identification
  };
}

/**
 * Assesses singular sense presence and characteristics
 */
function assessSingularSense(term, context, analysis) {
  let hasSingularSense = false;
  let senseType = null;
  let senseStrength = 0.0;
  let senseJustification = '';
  let contextualFactors = [];

  // Check for explicit singular sense specification
  if (context.singularSense === true || context.senseNumber === 'singular') {
    hasSingularSense = true;
    senseType = 'explicit_singular';
    senseStrength = 0.9;
    senseJustification = 'Explicit singular sense specified';
    contextualFactors.push('explicit_specification');
  }

  // Check for singular sense indicators in string
  if (!hasSingularSense && typeof term === 'string') {
    const singularAnalysis = analyzeStringForSingularSenseIndicators(term);
    if (singularAnalysis.hasSingularSense) {
      hasSingularSense = true;
      senseType = 'string_pattern_singular';
      senseStrength = singularAnalysis.confidence;
      senseJustification = singularAnalysis.identification;
      contextualFactors.push('string_pattern_detection');
    }
  }

  // Check for contextual singular sense
  if (!hasSingularSense && context.count === 'single' || context.number === 'singular') {
    hasSingularSense = true;
    senseType = 'contextual_singular';
    senseStrength = 0.8;
    senseJustification = 'Contextual singular sense from count/number specification';
    contextualFactors.push('contextual_specification');
  }

  // Default assumption for class nouns (often used in singular sense)
  if (!hasSingularSense && analysis.classNounAnalysis.isClassNoun) {
    hasSingularSense = true;
    senseType = 'default_class_singular';
    senseStrength = 0.6;
    senseJustification = 'Default singular sense for class nouns';
    contextualFactors.push('class_noun_default');
  }

  // Update analysis
  analysis.singularSenseAnalysis.hasSingularSense = hasSingularSense;
  analysis.singularSenseAnalysis.senseType = senseType;
  analysis.singularSenseAnalysis.senseStrength = senseStrength;
  analysis.singularSenseAnalysis.senseJustification = senseJustification;
  analysis.singularSenseAnalysis.contextualFactors = contextualFactors;

  return {
    hasSingularSense: hasSingularSense,
    senseStrength: senseStrength
  };
}

/**
 * Analyzes string for singular sense indicators
 */
function analyzeStringForSingularSenseIndicators(str) {
  // Common singular sense patterns in Sanskrit
  const singularSensePatterns = [
    { pattern: /(एक|एकल|एकमात्र)/, confidence: 0.9, description: 'Explicit singular indicator' },
    { pattern: /(केवल|मात्र|निरुपम)/, confidence: 0.8, description: 'Exclusive singular indicator' },
    { pattern: /(समग्र|सम्पूर्ण|सकल)/, confidence: 0.7, description: 'Comprehensive singular indicator' },
    { pattern: /(प्रतिनिधि|उदाहरण|नमूना)/, confidence: 0.75, description: 'Representative singular indicator' }
  ];

  for (const { pattern, confidence, description } of singularSensePatterns) {
    if (pattern.test(str)) {
      return {
        hasSingularSense: true,
        confidence: confidence,
        identification: description
      };
    }
  }

  return {
    hasSingularSense: false,
    confidence: 0.0,
    identification: ''
  };
}

/**
 * Evaluates optional plural applicability
 */
function evaluateOptionalPluralApplicability(term, context, analysis) {
  let optionalityApplies = false;
  let optionalityType = null;
  let optionalityConditions = [];
  let semanticEquivalence = false;
  let stylisticVariation = false;
  let optionalityStrength = 0.0;
  let optionalityJustification = '';

  // Check for explicit optionality specification
  if (context.optionalPlural === true || context.anyatarasyam === true) {
    optionalityApplies = true;
    optionalityType = 'explicit_optionality';
    optionalityStrength = 0.9;
    optionalityJustification = 'Explicit optional plural specification';
    optionalityConditions.push(OPTIONAL_PLURAL_CONDITIONS.contextual_emphasis);
  }

  // Check for explicit semantic equivalence specification
  if (context.semanticEquivalence === true) {
    if (!optionalityApplies) {
      optionalityApplies = true;
      optionalityType = 'semantic_equivalence';
      optionalityStrength = 0.8;
      optionalityJustification = 'Explicit semantic equivalence specification';
    }
    semanticEquivalence = true;
    optionalityConditions.push(OPTIONAL_PLURAL_CONDITIONS.semantic_equivalence);
  }

  // Check for semantic equivalence conditions (prioritize over default when strengths are high)
  if (!optionalityApplies && 
      analysis.classNounAnalysis.classStrength >= 0.8 &&
      analysis.singularSenseAnalysis.senseStrength >= 0.8) {
    optionalityApplies = true;
    optionalityType = 'semantic_equivalence';
    semanticEquivalence = true;
    optionalityStrength = 0.8;
    optionalityJustification = 'Semantic equivalence between singular and plural forms';
    optionalityConditions.push(OPTIONAL_PLURAL_CONDITIONS.semantic_equivalence);
  }

  // Default optionality for strong class nouns with singular sense (check after semantic equivalence)
  if (!optionalityApplies && 
      analysis.classNounAnalysis.classStrength >= 0.7 &&
      analysis.singularSenseAnalysis.senseStrength >= 0.6) {
    optionalityApplies = true;
    optionalityType = 'default_class_optionality';
    optionalityStrength = 0.65;
    optionalityJustification = 'Default optionality for strong class nouns with singular sense';
    optionalityConditions.push(OPTIONAL_PLURAL_CONDITIONS.traditional_usage);
  }

  // Check for stylistic variation conditions (can co-exist with other optionality types)
  if (context.stylisticVariation === true) {
    if (!optionalityApplies) {
      optionalityApplies = true;
      optionalityType = 'stylistic_variation';
      optionalityStrength = 0.65;
      optionalityJustification = 'Stylistic variation allowing optional plural';
    } else {
      // If already applied, only downgrade to stylistic if current strength is lower
      if (optionalityStrength < 0.65) {
        optionalityType = 'stylistic_variation';
        optionalityStrength = 0.65;
        optionalityJustification = 'Stylistic variation allowing optional plural';
      }
    }
    stylisticVariation = true;
    optionalityConditions.push(OPTIONAL_PLURAL_CONDITIONS.stylistic_variation);
  }

  // Update analysis
  analysis.optionalPluralAnalysis.optionalityApplies = optionalityApplies;
  analysis.optionalPluralAnalysis.optionalityType = optionalityType;
  analysis.optionalPluralAnalysis.optionalityConditions = optionalityConditions;
  analysis.optionalPluralAnalysis.semanticEquivalence = semanticEquivalence;
  analysis.optionalPluralAnalysis.stylisticVariation = stylisticVariation;
  analysis.optionalPluralAnalysis.optionalityStrength = optionalityStrength;
  analysis.optionalPluralAnalysis.optionalityJustification = optionalityJustification;

  return {
    optionalityApplies: optionalityApplies,
    optionalityStrength: optionalityStrength
  };
}

/**
 * Applies class noun optional plural logic
 */
function applyClassNounOptionalPluralLogic(analysis, context) {
  const classStrength = analysis.classNounAnalysis.classStrength;
  const senseStrength = analysis.singularSenseAnalysis.senseStrength;
  const optionalityStrength = analysis.optionalPluralAnalysis.optionalityStrength;

  // Determine available number options based on strengths
  let availableOptions = ['singular']; // Base singular option
  let preferredOption = 'singular';
  let optionalOptions = [];
  let numberFlexibility = 0.0;
  let optionJustifications = {
    singular: 'Base singular form for class noun'
  };

  // High strength class noun with strong optionality
  if (classStrength >= 0.8 && optionalityStrength >= 0.8) {
    availableOptions = ['singular', 'plural'];
    optionalOptions = ['plural'];
    numberFlexibility = 0.9;
    preferredOption = 'either'; // Equal preference
    optionJustifications.plural = 'Strong optional plural for class noun';
  }
  // Moderate strength with adequate optionality
  else if (classStrength >= 0.7 && optionalityStrength >= 0.65) {
    availableOptions = ['singular', 'plural'];
    optionalOptions = ['plural'];
    numberFlexibility = 0.7;
    preferredOption = 'singular'; // Slight preference for singular
    optionJustifications.plural = 'Moderate optional plural for class noun';
  }
  // Basic class noun with some optionality
  else if (classStrength >= 0.6 && optionalityStrength >= 0.6) {
    availableOptions = ['singular', 'plural'];
    optionalOptions = ['plural'];
    numberFlexibility = 0.5;
    preferredOption = 'singular';
    optionJustifications.plural = 'Basic optional plural for class noun';
  }

  // Context-specific adjustments
  if (context.preferPlural === true) {
    preferredOption = 'plural';
    numberFlexibility += 0.1;
  }

  if (context.forceSingular === true) {
    availableOptions = ['singular'];
    optionalOptions = [];
    numberFlexibility = 0.0;
    preferredOption = 'singular';
  }

  // Update analysis
  analysis.numberOptionAnalysis.baseNumber = 'singular';
  analysis.numberOptionAnalysis.availableOptions = availableOptions;
  analysis.numberOptionAnalysis.preferredOption = preferredOption;
  analysis.numberOptionAnalysis.optionalOptions = optionalOptions;
  analysis.numberOptionAnalysis.numberFlexibility = numberFlexibility;
  analysis.numberOptionAnalysis.optionJustifications = optionJustifications;
}

/**
 * Calculates comprehensive confidence assessment
 */
function calculateConfidence(analysis) {
  let overall = 0.0;
  let classNounDetection = 0.0;
  let singularSenseAssessment = 0.0;
  let optionalPluralApplicability = 0.0;
  let numberOptionGeneration = 0.0;
  let traditional = 0.85; // High traditional confidence for well-established sutra
  
  const factors = [];

  // Class noun detection confidence
  classNounDetection = analysis.classNounAnalysis.classStrength;
  if (classNounDetection >= 0.8) {
    factors.push('high_class_noun_confidence');
  } else if (classNounDetection >= 0.6) {
    factors.push('moderate_class_noun_confidence');
  } else {
    factors.push('low_class_noun_confidence');
  }

  // Singular sense assessment confidence
  singularSenseAssessment = analysis.singularSenseAnalysis.senseStrength;
  if (singularSenseAssessment >= 0.8) {
    factors.push('high_singular_sense_confidence');
  } else if (singularSenseAssessment >= 0.6) {
    factors.push('moderate_singular_sense_confidence');
  } else {
    factors.push('low_singular_sense_confidence');
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
  overall = (classNounDetection * 0.3 + singularSenseAssessment * 0.25 + 
            optionalPluralApplicability * 0.25 + numberOptionGeneration * 0.1 + traditional * 0.1);

  // Update analysis
  analysis.confidence.overall = overall;
  analysis.confidence.classNounDetection = classNounDetection;
  analysis.confidence.singularSenseAssessment = singularSenseAssessment;
  analysis.confidence.optionalPluralApplicability = optionalPluralApplicability;
  analysis.confidence.numberOptionGeneration = numberOptionGeneration;
  analysis.confidence.factors = factors;
}

/**
 * Legacy compatibility function
 * @param {string|Object} term - The term to analyze
 * @param {Object} context - Additional context
 * @returns {Object} - Legacy-compatible result
 */
export function applySutra1_2_58(term, context = {}) {
  // Handle null/undefined inputs
  if (!term) {
    return {
      applied: false,
      term: term,
      numberOptions: [],
      analysis: { sutra: '1.2.58', applied: false },
      confidence: { overall: 0.1 }
    };
  }

  const result = sutra1258(term, context);
  
  // Handle malformed context (ensure context is object)
  const safeContext = (context && typeof context === 'object') ? context : {};
  
  const legacyResult = {
    applied: result.applied,
    term: result.term,
    numberOptions: result.numberOptions,
    analysis: result.analysis,
    confidence: result.confidence
  };

  // Integrate with existing number determination utility for legacy compatibility
  try {
    const utilityResult = determineOptionalNumber(term, safeContext);
    
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
export default applySutra1_2_58;
