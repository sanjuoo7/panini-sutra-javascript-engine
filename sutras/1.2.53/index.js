/**
 * Sutra 1.2.53: तदशिष्यं संज्ञाप्रमाणत्वात्
 * tadaśiṣyaṃ saṃjñāpramāṇatvāt
 * 
 * "That (which has technical designation) is not to be taught (separately), 
 * because of the authority of technical terms"
 * 
 * This sutra establishes that items which already have authoritative technical 
 * designation (saṃjñā) need not be separately taught or elided, as their 
 * technical status provides sufficient authority for their grammatical behavior.
 * 
 * Key Principles:
 * 1. Technical Authority: Items with saṃjñā designation have inherent authority
 * 2. Non-elision (aśiṣyam): Such items should not be elided or separately taught
 * 3. Designation Primacy: Technical terms take precedence over general rules
 * 4. Systematic Classification: Part of broader aśiṣyam classification system
 * 
 * Traditional Commentary:
 * - Kāśikā: तत् संज्ञाप्रमाणत्वात् अशिष्यम् - "That is not to be taught due to technical term authority"
 * - Meaning: Technical designations provide sufficient grammatical authority
 */

import { 
  detectScript
} from '../sanskrit-utils/script-detection.js';

import { 
  classifyAshishya 
} from '../sanskrit-utils/non-elision-classification.js';

// Valid technical term categories
const TECHNICAL_TERM_CATEGORIES = {
  grammatical: ['प्रातिपदिक', 'धातु', 'प्रत्यय', 'विभक्ति', 'तिङ्', 'सुप्'],
  phonetic: ['स्वर', 'व्यञ्जन', 'संयोग', 'संधि', 'वृद्धि', 'गुण'],
  semantic: ['कारक', 'उपपद', 'समास', 'तद्धित', 'कृत्', 'स्त्री'],
  metrical: ['छन्द', 'गण', 'लघु', 'गुरु', 'यति', 'प्रास'],
  logical: ['हेतु', 'साध्य', 'उदाहरण', 'उपनय', 'निगमन', 'पक्ष']
};

// Authority sources for technical designations
const AUTHORITY_SOURCES = {
  paninian: ['पाणिनि', 'अष्टाध्यायी', 'mahābhāṣya', 'kāśikā'],
  traditional: ['व्याकरण', 'निरुक्त', 'शिक्षा', 'छन्द'],
  philosophical: ['न्याय', 'वैशेषिक', 'सांख्य', 'योग'],
  lexical: ['निघण्टु', 'कोश', 'अमरकोश', 'मेदिनी']
};

// Types of designation authority
const DESIGNATION_AUTHORITY_TYPES = {
  primary: 'मुख्य_संज्ञा',      // Primary technical designation
  secondary: 'गौण_संज्ञा',      // Secondary/derived designation  
  contextual: 'प्रसङ्ग_संज्ञा',   // Context-dependent designation
  conventional: 'रूढ़_संज्ञा',   // Conventional/established designation
  etymological: 'निरुक्त_संज्ञा' // Etymology-based designation
};

/**
 * Main function implementing Sutra 1.2.53
 * तदशिष्यं संज्ञाप्रमाणत्वात् - Technical designation authority for non-elision
 */
export function sutra1253(item, context = {}) {
  // Phase 1: Input Validation and Analysis
  const inputValidation = validateInput(item, context);
  if (!inputValidation.isValid) {
    return {
      applies: false,
      error: inputValidation.error,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: {
        inputValidation: inputValidation,
        traditionalNote: 'संज्ञास्य प्रामाणिकता व्याकरणे अत्यावश्यकम्'
      }
    };
  }

  // Initialize comprehensive analysis structure
  const analysis = {
    sutra: '1.2.53',
    sutraText: 'तदशिष्यं संज्ञाप्रमाणत्वात्',
    applies: false,
    
    // Input Analysis
    inputAnalysis: {
      itemType: typeof item,
      hasItemProperties: Object.keys(item || {}).length > 0,
      contextProvided: Object.keys(context).length > 0,
      script: item && typeof item === 'string' ? detectScript(item).toLowerCase() : 'object'
    },

    // Input Validation
    inputValidation: inputValidation,

    // Technical Designation Analysis
    designationAnalysis: {
      hasTechnicalDesignation: false,
      designationType: null,
      designationCategory: null,
      authoritySource: null,
      authorityType: null,
      designationReasoning: ''
    },

    // Authority Analysis
    authorityAnalysis: {
      hasAuthoritySource: false,
      authorityStrength: 0.0,
      authorityEvidence: [],
      praman_type: null, // Type of authority (āgama, pratyakṣa, anumāna, etc.)
      traditional_support: false
    },

    // Non-elision Analysis (aśiṣyam)
    nonElisionAnalysis: {
      qualifiesForAshishya: false,
      elisionPrevention: false,
      logicalRetention: true,
      phoneticRetention: true,
      ashishyaReasoning: ''
    },

    // Confidence Assessment
    confidence: {
      overall: 0.0,
      designationDetection: 0.0,
      authorityValidation: 0.0,
      ashishyaClassification: 0.0,
      traditional: 0.9, // High traditional confidence
      factors: []
    }
  };

  // Phase 2: Technical Designation Detection
  const designationClassification = classifyTechnicalDesignation(item, context, analysis);
  
  if (!designationClassification.hasTechnicalDesignation) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.ashishyaReasoning = 'no_technical_designation_detected';
    
    // Calculate confidence even for non-applying cases
    calculateConfidence(analysis);
    
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 3: Authority Validation
  const authorityValidation = validateDesignationAuthority(item, context, analysis);
  
  if (!authorityValidation.hasValidAuthority) {
    analysis.applies = false;
    analysis.nonElisionAnalysis.ashishyaReasoning = 'insufficient_designation_authority';
    
    // Calculate confidence even for non-applying cases
    calculateConfidence(analysis);
    
    return {
      applies: false,
      item: item,
      nonElidable: false,
      logicalPresence: true,
      phoneticPresence: true,
      analysis: analysis,
      confidence: analysis.confidence
    };
  }

  // Phase 4: Non-elision Classification (aśiṣyam)
  const ashishyaClassification = classifyNonElision(item, context, analysis);

  // Phase 5: Apply Comprehensive Classification
  const finalClassification = applyTechnicalDesignationRule(
    item, context, ashishyaClassification, analysis
  );

  // Calculate confidence
  calculateConfidence(analysis);

  analysis.applies = true;
  analysis.nonElisionAnalysis.ashishyaReasoning = 'technical_designation_with_authority';

  return {
    applies: true,
    item: item,
    nonElidable: finalClassification.nonElidable,
    logicalPresence: finalClassification.logicalPresence,
    phoneticPresence: finalClassification.phoneticPresence,
    designationAuthority: analysis.authorityAnalysis.authoritySource,
    technicalStatus: analysis.designationAnalysis.designationType,
    analysis: analysis,
    confidence: analysis.confidence,
    // Legacy compatibility
    applied: true,
    sutraApplied: '1.2.53',
    reasons: finalClassification.reasons || []
  };
}

/**
 * Validates input parameters for the sutra
 */
function validateInput(item, context) {
  const validation = {
    isValid: true,
    error: null,
    itemType: typeof item,
    traditionalNote: 'संज्ञास्य प्रामाणिकता व्याकरणे अत्यावश्यकम्'
  };

  // Item can be string, object, or primitive - all valid for technical term analysis
  if (item === null || item === undefined) {
    validation.isValid = false;
    validation.error = 'null_or_undefined_item';
    validation.details = 'Item to be analyzed cannot be null or undefined';
    return validation;
  }

  // Context must be an object if provided
  if (context !== null && context !== undefined && typeof context !== 'object') {
    validation.isValid = false;
    validation.error = 'invalid_context_type';
    validation.details = 'Context must be an object or null/undefined';
    return validation;
  }

  return validation;
}

/**
 * Classifies whether the item has technical designation
 */
function classifyTechnicalDesignation(item, context, analysis) {
  let hasTechnicalDesignation = false;
  let designationType = null;
  let designationCategory = null;
  let authoritySource = null;
  let designationReasoning = '';

  // Check explicit technical term flag
  if (typeof item === 'object' && item.technicalTerm === true) {
    hasTechnicalDesignation = true;
    designationType = 'explicit_technical_flag';
    designationReasoning = 'Explicitly marked as technical term';
  }

  // Check for saṃjñā property (even if technicalTerm is already true, for categorization)
  if (typeof item === 'object' && item.samjna) {
    hasTechnicalDesignation = true;
    designationType = 'explicit_samjna_property'; // Override if present
    designationReasoning = `Explicit saṃjñā designation: ${item.samjna}`;
    
    // Classify category of saṃjñā
    for (const [category, terms] of Object.entries(TECHNICAL_TERM_CATEGORIES)) {
      if (terms.includes(item.samjna)) {
        designationCategory = category;
        break;
      }
    }
  }

  // Check context designation
  if (!hasTechnicalDesignation && context.designation) {
    hasTechnicalDesignation = true;
    designationType = 'context_designation';
    designationReasoning = `Context-provided designation: ${context.designation}`;
  }

  // Check for authority source
  if (context.authoritySource) {
    authoritySource = context.authoritySource;
  } else if (typeof item === 'object' && item.authoritySource) {
    authoritySource = item.authoritySource;
  }

  // Check string-based technical term recognition
  if (!hasTechnicalDesignation && typeof item === 'string') {
    const stringAnalysis = analyzeStringForTechnicalDesignation(item);
    if (stringAnalysis.isTechnicalTerm) {
      hasTechnicalDesignation = true;
      designationType = 'string_pattern_recognition';
      designationCategory = stringAnalysis.category;
      designationReasoning = stringAnalysis.reasoning;
    }
  }

  // Check semantic properties
  if (!hasTechnicalDesignation && typeof item === 'object') {
    const semanticAnalysis = analyzeSemanticTechnicalProperties(item);
    if (semanticAnalysis.isTechnicalTerm) {
      hasTechnicalDesignation = true;
      designationType = 'semantic_property_analysis';
      designationCategory = semanticAnalysis.category;
      designationReasoning = semanticAnalysis.reasoning;
    }
  }

  // Update analysis
  analysis.designationAnalysis.hasTechnicalDesignation = hasTechnicalDesignation;
  analysis.designationAnalysis.designationType = designationType;
  analysis.designationAnalysis.designationCategory = designationCategory;
  analysis.designationAnalysis.authoritySource = authoritySource;
  analysis.designationAnalysis.designationReasoning = designationReasoning;

  return {
    hasTechnicalDesignation: hasTechnicalDesignation,
    designationType: designationType,
    category: designationCategory
  };
}

/**
 * Analyzes string for technical designation patterns
 */
function analyzeStringForTechnicalDesignation(str) {
  // Common technical term patterns in Sanskrit grammar
  const technicalPatterns = [
    { pattern: /^(प्रातिपदिक|धातु|प्रत्यय|विभक्ति)/, category: 'grammatical', confidence: 0.9 },
    { pattern: /^(स्वर|व्यञ्जन|संयोग|संधि)/, category: 'phonetic', confidence: 0.85 },
    { pattern: /^(कारक|उपपद|समास|तद्धित)/, category: 'semantic', confidence: 0.8 },
    { pattern: /^(छन्द|गण|लघु|गुरु)/, category: 'metrical', confidence: 0.75 },
    { pattern: /(संज्ञा|नाम|अभिधान)$/, category: 'designation', confidence: 0.7 }
  ];

  for (const { pattern, category, confidence } of technicalPatterns) {
    if (pattern.test(str)) {
      return {
        isTechnicalTerm: true,
        category: category,
        confidence: confidence,
        reasoning: `Matches technical pattern: ${pattern.source}`
      };
    }
  }

  // Check for compound technical terms
  if (str.length > 6 && (str.includes('व्याकरण') || str.includes('शास्त्र'))) {
    return {
      isTechnicalTerm: true,
      category: 'grammatical',
      confidence: 0.6,
      reasoning: 'Contains grammatical/scientific compound elements'
    };
  }

  return {
    isTechnicalTerm: false,
    category: null,
    confidence: 0.0,
    reasoning: 'No technical designation patterns detected'
  };
}

/**
 * Analyzes semantic properties for technical designation
 */
function analyzeSemanticTechnicalProperties(item) {
  const technicalProperties = [
    'isGrammaticalTerm', 'isPaniniTerm', 'isVyakaranaTerm',
    'isPhoneticTerm', 'isSemanticTerm', 'isMetricalTerm',
    'hasDefinition', 'isSystemicTerm', 'isTerminological'
  ];

  for (const prop of technicalProperties) {
    if (item[prop] === true) {
      return {
        isTechnicalTerm: true,
        category: 'semantic_property',
        reasoning: `Has technical property: ${prop}`
      };
    }
  }

  // Check for definitional properties
  if (item.definition || item.vyakhya || item.nirukti) {
    return {
      isTechnicalTerm: true,
      category: 'definitional',
      reasoning: 'Has definitional/explanatory properties'
    };
  }

  return {
    isTechnicalTerm: false,
    category: null,
    reasoning: 'No semantic technical properties detected'
  };
}

/**
 * Validates the authority of the technical designation
 */
function validateDesignationAuthority(item, context, analysis) {
  let hasValidAuthority = false;
  let authorityStrength = 0.0;
  let authorityEvidence = [];
  let praman_type = null;
  let traditional_support = false;

  const authoritySource = analysis.designationAnalysis.authoritySource;

  // Check explicit authority sources
  if (authoritySource) {
    for (const [sourceType, sources] of Object.entries(AUTHORITY_SOURCES)) {
      if (sources.includes(authoritySource.toLowerCase())) {
        hasValidAuthority = true;
        authorityStrength = getAuthorityStrength(sourceType);
        authorityEvidence.push(`${sourceType}_authority: ${authoritySource}`);
        praman_type = getAuthorityType(sourceType);
        traditional_support = sourceType === 'traditional' || sourceType === 'paninian';
        break;
      }
    }
  }

  // Check contextual authority indicators
  if (!hasValidAuthority && context.authority) {
    hasValidAuthority = true;
    authorityStrength = 0.7;
    authorityEvidence.push(`context_authority: ${context.authority}`);
    praman_type = 'contextual_designation';
  }

  // Check for implicit authority from context designation
  if (!hasValidAuthority && analysis.designationAnalysis.designationType === 'context_designation') {
    hasValidAuthority = true;
    authorityStrength = 0.65;
    authorityEvidence.push('implicit_context_designation_authority');
    praman_type = 'contextual_designation';
  }

  // Check system-level authority (if part of established system)
  if (!hasValidAuthority && analysis.designationAnalysis.designationCategory) {
    hasValidAuthority = true;
    authorityStrength = 0.6;
    authorityEvidence.push(`systemic_authority: ${analysis.designationAnalysis.designationCategory}`);
    praman_type = 'systemic_classification';
  }

  // Default authority for explicit technical terms
  if (!hasValidAuthority && analysis.designationAnalysis.designationType === 'explicit_technical_flag') {
    hasValidAuthority = true;
    authorityStrength = 0.5;
    authorityEvidence.push('explicit_technical_declaration');
    praman_type = 'explicit_designation';
  }

  // Update analysis
  analysis.authorityAnalysis.hasAuthoritySource = hasValidAuthority;
  analysis.authorityAnalysis.authorityStrength = authorityStrength;
  analysis.authorityAnalysis.authorityEvidence = authorityEvidence;
  analysis.authorityAnalysis.praman_type = praman_type;
  analysis.authorityAnalysis.traditional_support = traditional_support;

  return {
    hasValidAuthority: hasValidAuthority,
    authorityStrength: authorityStrength,
    evidence: authorityEvidence
  };
}

/**
 * Gets authority strength based on source type
 */
function getAuthorityStrength(sourceType) {
  const strengthMap = {
    paninian: 1.0,
    traditional: 0.9,
    philosophical: 0.7,
    lexical: 0.6
  };
  return strengthMap[sourceType] || 0.5;
}

/**
 * Gets authority type (pramāṇa type) based on source
 */
function getAuthorityType(sourceType) {
  const typeMap = {
    paninian: 'āgama_pramāṇa',      // Scriptural authority
    traditional: 'paramparā_pramāṇa', // Traditional authority
    philosophical: 'anumāna_pramāṇa', // Inferential authority
    lexical: 'vyavahāra_pramāṇa'     // Usage-based authority
  };
  return typeMap[sourceType] || 'sāmānya_pramāṇa';
}

/**
 * Classifies non-elision status based on technical designation
 */
function classifyNonElision(item, context, analysis) {
  let qualifiesForAshishya = false;
  let elisionPrevention = false;
  let logicalRetention = true;
  let phoneticRetention = true;
  let ashishyaReasoning = '';

  // Items with technical designation qualify for aśiṣyam status
  if (analysis.designationAnalysis.hasTechnicalDesignation && 
      analysis.authorityAnalysis.hasAuthoritySource) {
    
    qualifiesForAshishya = true;
    elisionPrevention = true;
    ashishyaReasoning = 'technical_designation_with_authority';
    
    // High authority sources ensure both logical and phonetic retention
    if (analysis.authorityAnalysis.authorityStrength >= 0.8) {
      logicalRetention = true;
      phoneticRetention = true;
    } else {
      // Lower authority may allow phonetic flexibility in some contexts
      logicalRetention = true;
      phoneticRetention = context.allowPhoneticVariation !== true;
    }
  }

  // Update analysis
  analysis.nonElisionAnalysis.qualifiesForAshishya = qualifiesForAshishya;
  analysis.nonElisionAnalysis.elisionPrevention = elisionPrevention;
  analysis.nonElisionAnalysis.logicalRetention = logicalRetention;
  analysis.nonElisionAnalysis.phoneticRetention = phoneticRetention;
  analysis.nonElisionAnalysis.ashishyaReasoning = ashishyaReasoning;

  return {
    qualifiesForAshishya: qualifiesForAshishya,
    elisionPrevention: elisionPrevention,
    logicalRetention: logicalRetention,
    phoneticRetention: phoneticRetention
  };
}

/**
 * Applies the technical designation rule comprehensively
 */
function applyTechnicalDesignationRule(item, context, ashishyaClassification, analysis) {
  const result = {
    nonElidable: ashishyaClassification.qualifiesForAshishya,
    logicalPresence: ashishyaClassification.logicalRetention,
    phoneticPresence: ashishyaClassification.phoneticRetention,
    reasons: []
  };

  // Build comprehensive reasoning
  if (result.nonElidable) {
    result.reasons.push('technical-designation-authority');
    
    if (analysis.authorityAnalysis.traditional_support) {
      result.reasons.push('traditional-grammar-support');
    }
    
    if (analysis.designationAnalysis.designationCategory) {
      result.reasons.push(`${analysis.designationAnalysis.designationCategory}-category-membership`);
    }
    
    if (analysis.authorityAnalysis.praman_type) {
      result.reasons.push(`${analysis.authorityAnalysis.praman_type}-validation`);
    }
  }

  return result;
}

/**
 * Calculates confidence scores for the analysis
 */
function calculateConfidence(analysis) {
  let overall = 0.0;
  let designationDetection = 0.0;
  let authorityValidation = 0.0;
  let ashishyaClassification = 0.0;
  let traditional = 0.9; // High traditional confidence for well-established sutra
  
  const factors = [];

  // Designation detection confidence
  if (analysis.designationAnalysis.hasTechnicalDesignation) {
    switch (analysis.designationAnalysis.designationType) {
      case 'explicit_technical_flag':
        designationDetection = 0.95;
        factors.push('explicit_technical_flag_high_confidence');
        break;
      case 'explicit_samjna_property':
        designationDetection = 0.9;
        factors.push('explicit_samjna_high_confidence');
        break;
      case 'context_designation':
        designationDetection = 0.8;
        factors.push('context_designation_good_confidence');
        break;
      case 'string_pattern_recognition':
        designationDetection = 0.7;
        factors.push('string_pattern_moderate_confidence');
        break;
      case 'semantic_property_analysis':
        designationDetection = 0.6;
        factors.push('semantic_property_moderate_confidence');
        break;
      default:
        designationDetection = 0.5;
        factors.push('designation_detection_uncertain');
    }
  } else {
    designationDetection = 0.1;
    factors.push('no_technical_designation_detected');
  }

  // Authority validation confidence
  authorityValidation = analysis.authorityAnalysis.authorityStrength;
  if (authorityValidation >= 0.8) {
    factors.push('high_authority_validation');
  } else if (authorityValidation >= 0.6) {
    factors.push('moderate_authority_validation');
  } else if (authorityValidation > 0) {
    factors.push('low_authority_validation');
  } else {
    factors.push('no_authority_validation');
  }

  // Aśiṣyam classification confidence
  if (analysis.nonElisionAnalysis.qualifiesForAshishya) {
    ashishyaClassification = 0.85;
    factors.push('ashishya_classification_applied');
  } else {
    ashishyaClassification = 0.8; // High confidence in non-application
    factors.push('ashishya_classification_not_applicable');
  }

  // Calculate overall confidence
  overall = (designationDetection * 0.3 + authorityValidation * 0.3 + ashishyaClassification * 0.2 + traditional * 0.2);

  // Update analysis
  analysis.confidence.overall = overall;
  analysis.confidence.designationDetection = designationDetection;
  analysis.confidence.authorityValidation = authorityValidation;
  analysis.confidence.ashishyaClassification = ashishyaClassification;
  analysis.confidence.traditional = traditional;
  analysis.confidence.factors = factors;
}

// Legacy compatibility functions
export function applySutra1_2_53(item, context = {}) {
  const result = sutra1253(item, context);
  
  // Map to legacy format with utility integration
  const utilityResult = classifyAshishya(item, { 
    ...context, 
    ashishyaFlags: { s1_2_53: true } 
  });
  
  return {
    sutra: '1.2.53',
    applied: result.applies,
    nonElidable: result.nonElidable,
    logicalPresence: result.logicalPresence,
    phoneticPresence: result.phoneticPresence,
    reasons: result.reasons || utilityResult.reasons,
    sutrasApplied: utilityResult.sutrasApplied,
    explanation: utilityResult.explanation,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

// Additional analysis functions for educational/research use  
export function analyzeTechnicalDesignation(item, context = {}) {
  const result = sutra1253(item, { ...context, analysis_depth: 'detailed' });
  return {
    has_technical_designation: result.applies,
    designation_type: result.analysis?.designationAnalysis?.designationType || result.technicalStatus,
    authority_source: result.analysis?.designationAnalysis?.authoritySource || result.designationAuthority,
    ashishya_status: result.nonElidable,
    analysis: result.analysis,
    confidence: result.confidence
  };
}

export function checkDesignationAuthority(item, context = {}) {
  // Standalone function to check designation authority
  const dummyAnalysis = {
    designationAnalysis: {
      hasTechnicalDesignation: false,
      designationType: null,
      designationCategory: null,
      authoritySource: null,
      designationReasoning: ''
    },
    authorityAnalysis: {
      hasAuthoritySource: false,
      authorityStrength: 0.0,
      authorityEvidence: [],
      praman_type: null,
      traditional_support: false
    }
  };
  
  classifyTechnicalDesignation(item, context, dummyAnalysis);
  const validation = validateDesignationAuthority(item, context, dummyAnalysis);
  
  return {
    has_valid_authority: validation.hasValidAuthority,
    authority_strength: validation.authorityStrength,
    evidence: validation.evidence,
    authority_type: dummyAnalysis.authorityAnalysis.praman_type
  };
}

export default sutra1253;
