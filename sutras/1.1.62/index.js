/**
 * Sutra 1.1.62: प्रत्ययलोपे प्रत्ययलक्षणम् (pratyayalope pratyayalakṣaṇam)
 * "In the case of affix elision, the affix (still) retains its characteristic properties."
 *
 * RULE TYPE: paribhāṣā (meta-rule)
 * SCOPE: Fundamental principle governing how elided affixes continue to influence grammatical operations.
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.62
 */

import { 
  validateSanskritWord, 
  detectScript, 
  sanitizeInput 
} from '../sanskrit-utils/index.js';

// Affix property preservation categories
const AFFIX_PROPERTIES = {
  PHONETIC: {
    types: ['pit', 'kit', 'ṅit', 'rit'],
    characteristics: ['sound_effects', 'guna_triggering', 'vrddhi_causing'],
    preservation: 'mandatory',
    examples: [
      'pit affix → causes guṇa even when elided',
      'kit affix → prevents guṇa even when elided'
    ]
  },
  
  MORPHOLOGICAL: {
    types: ['case_markers', 'person_markers', 'number_markers', 'gender_markers'],
    characteristics: ['grammatical_function', 'syntactic_role', 'agreement'],
    preservation: 'conditional',
    examples: [
      'case endings → syntactic function preserved',
      'verbal endings → person/number agreement maintained'
    ]
  },
  
  SEMANTIC: {
    types: ['meaning_modifiers', 'derivational_markers', 'aspectual_markers'],
    characteristics: ['semantic_content', 'lexical_meaning', 'aspectual_value'],
    preservation: 'contextual',
    examples: [
      'kṛt affixes → derivational meaning preserved',
      'taddhita affixes → relational meaning maintained'
    ]
  }
};

// Traditional commentary references
const TRADITIONAL_COMMENTARY = {
  kashika: "प्रत्ययलोपे प्रत्ययलक्षणम्। प्रत्ययस्य लोपे सत्यपि तस्य लक्षणं तिष्ठति।",
  mahabhashya: "लोपो व्यत्ययेन अलोपो वा। प्रत्ययलक्षणं तु अवश्यं तिष्ठति।",
  english: "When an affix undergoes elision (lopa), its characteristic properties (lakṣaṇa) continue to exert their influence as if the affix were still present."
};

/**
 * Analyzes affix property preservation according to Sutra 1.1.62
 * @param {Object} linguisticContext - Context containing base, affix, and elision information
 * @param {Object} options - Analysis options
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeAffixPropertyPreservation(linguisticContext, options = {}) {
  // Input validation and normalization
  if (!linguisticContext || typeof linguisticContext !== 'object') {
    return {
      isValid: false,
      error: "Valid linguistic context is required",
      sutra: "1.1.62"
    };
  }

  const analysis = {
    input: linguisticContext,
    sutra: "1.1.62",
    rule: "प्रत्ययलोपे प्रत्ययलक्षणम् (pratyayalope pratyayalakṣaṇam)",
    isValid: true,
    
    // Core preservation analysis
    preservationAnalysis: {
      hasElidedAffix: false,
      preservedProperties: [],
      activeInfluences: [],
      propertyCategories: []
    },
    
    // Morphological analysis
    morphologicalAnalysis: {
      baseForm: null,
      affixProperties: {},
      derivationalEffects: [],
      inflectionalEffects: []
    },
    
    // Phonetic analysis  
    phoneticAnalysis: {
      soundEffects: [],
      euphonicInfluences: [],
      gunaVrddhi_triggers: []
    },
    
    // Grammatical analysis
    grammaticalAnalysis: {
      syntacticFunctions: [],
      semanticPreservation: [],
      agreementFeatures: []
    },
    
    // Traditional commentary
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    
    // Confidence scoring
    confidence: 0
  };

  // Analyze preservation characteristics
  const preservationResult = analyzePreservation(linguisticContext, options);
  analysis.preservationAnalysis = preservationResult;
  
  // Morphological analysis
  analysis.morphologicalAnalysis = analyzeMorphologicalPreservation(linguisticContext);
  
  // Phonetic analysis
  analysis.phoneticAnalysis = analyzePhoneticPreservation(linguisticContext);
  
  // Grammatical analysis
  analysis.grammaticalAnalysis = analyzeGrammaticalPreservation(linguisticContext);
  
  // Calculate confidence
  analysis.confidence = calculatePreservationConfidence(analysis);
  
  return analysis;
}

/**
 * Analyzes what properties are preserved when affix is elided
 */
function analyzePreservation(context, options = {}) {
  const result = {
    hasElidedAffix: false,
    preservedProperties: [],
    activeInfluences: [],
    propertyCategories: []
  };

  if (!context.elidedAffix) {
    return result;
  }

  result.hasElidedAffix = true;
  
  // Analyze affix properties for preservation
  if (context.elidedAffix.properties) {
    const properties = context.elidedAffix.properties;
    
    // Check for phonetic properties
    for (const [category, categoryData] of Object.entries(AFFIX_PROPERTIES)) {
      const lowerCategory = category.toLowerCase();
      
      if (hasPropertyCategory(properties, categoryData)) {
        result.propertyCategories.push(lowerCategory);
        result.preservedProperties.push(...getPreservedProperties(properties, categoryData));
        result.activeInfluences.push(...getActiveInfluences(properties, categoryData));
      }
    }
  }
  
  return result;
}

/**
 * Helper function to check if properties belong to a category
 */
function hasPropertyCategory(properties, categoryData) {
  return categoryData.types.some(type => 
    properties.hasOwnProperty(type) || 
    (typeof properties === 'object' && Object.keys(properties).some(key => key.includes(type)))
  );
}

/**
 * Helper function to get preserved properties
 */
function getPreservedProperties(properties, categoryData) {
  const preserved = [];
  categoryData.types.forEach(type => {
    if (properties[type]) {
      preserved.push(type);
    }
  });
  return preserved;
}

/**
 * Helper function to get active influences
 */
function getActiveInfluences(properties, categoryData) {
  return categoryData.characteristics.filter(char => 
    properties.influences && properties.influences.includes(char)
  );
}

/**
 * Analyzes morphological preservation
 */
function analyzeMorphologicalPreservation(context) {
  return {
    baseForm: context.base ? context.base.form : null,
    affixProperties: context.elidedAffix ? context.elidedAffix.properties : {},
    derivationalEffects: analyzeDerivationalEffects(context),
    inflectionalEffects: analyzeInflectionalEffects(context)
  };
}

/**
 * Analyzes phonetic preservation
 */
function analyzePhoneticPreservation(context) {
  return {
    soundEffects: analyzeSoundEffects(context),
    euphonicInfluences: analyzeEuphonicInfluences(context),
    gunaVrddhi_triggers: analyzeGunaVrddhi(context)
  };
}

/**
 * Analyzes grammatical preservation
 */
function analyzeGrammaticalPreservation(context) {
  return {
    syntacticFunctions: analyzeSyntacticFunctions(context),
    semanticPreservation: analyzeSemanticPreservation(context),
    agreementFeatures: analyzeAgreementFeatures(context)
  };
}

/**
 * Helper functions for detailed analysis
 */
function analyzeDerivationalEffects(context) {
  const effects = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.derivational) effects.push('derivational_meaning_preserved');
    if (props.krt) effects.push('krt_derivation_active');
    if (props.taddhita) effects.push('taddhita_relation_maintained');
  }
  return effects;
}

function analyzeInflectionalEffects(context) {
  const effects = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.case) effects.push('case_function_preserved');
    if (props.number) effects.push('number_agreement_maintained');
    if (props.person) effects.push('person_agreement_active');
  }
  return effects;
}

function analyzeSoundEffects(context) {
  const effects = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.pit) effects.push('guna_trigger_preserved');
    if (props.kit !== undefined) {
      if (props.kit) effects.push('guna_trigger_preserved');
      else effects.push('guna_blocker_active');
    }
    if (props.ṅit) effects.push('nasal_effects_maintained');
  }
  return effects;
}

function analyzeEuphonicInfluences(context) {
  const influences = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.euphonic) influences.push('euphonic_changes_preserved');
    if (props.sandhi) influences.push('sandhi_effects_active');
  }
  return influences;
}

function analyzeGunaVrddhi(context) {
  const triggers = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.guna_trigger) triggers.push('guna_operation_preserved');
    if (props.vrddhi_trigger) triggers.push('vrddhi_operation_preserved');
    if (props.guna_blocker !== undefined) triggers.push('guna_blocking_preserved');
  }
  return triggers;
}

function analyzeSyntacticFunctions(context) {
  const functions = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.syntactic_role) functions.push(props.syntactic_role);
    if (props.case) functions.push('case_marking_function');
  }
  return functions;
}

function analyzeSemanticPreservation(context) {
  const preservation = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.semantic_content) preservation.push('semantic_content_preserved');
    if (props.meaning) preservation.push('lexical_meaning_maintained');
  }
  return preservation;
}

function analyzeAgreementFeatures(context) {
  const features = [];
  if (context.elidedAffix && context.elidedAffix.properties) {
    const props = context.elidedAffix.properties;
    if (props.gender) features.push('gender_agreement');
    if (props.number) features.push('number_agreement');
    if (props.person) features.push('person_agreement');
  }
  return features;
}

/**
 * Calculates confidence score for preservation analysis
 */
function calculatePreservationConfidence(analysis) {
  let confidence = 0;
  
  if (analysis.preservationAnalysis.hasElidedAffix) {
    confidence += 30;
    
    if (analysis.preservationAnalysis.preservedProperties.length > 0) {
      confidence += 25;
    }
    
    if (analysis.preservationAnalysis.activeInfluences.length > 0) {
      confidence += 20;
    }
    
    if (analysis.preservationAnalysis.propertyCategories.length > 0) {
      confidence += 15;
    }
    
    if (analysis.morphologicalAnalysis.derivationalEffects.length > 0 ||
        analysis.morphologicalAnalysis.inflectionalEffects.length > 0) {
      confidence += 10;
    }
  }
  
  return Math.min(confidence, 100);
}

/**
 * Applies the principle of pratyayalakṣaṇam - merging elided affix properties into base context
 * @param {Object} base - The base form (aṅga) to which the affix was attached
 * @param {Object} elidedAffix - The affix that was elided, containing its properties
 * @returns {Object} - The base, augmented with the properties of the elided affix
 */
export function applyPratyayalakshanam(base, elidedAffix) {
  if (!base || typeof base !== 'object' || !elidedAffix || typeof elidedAffix !== 'object') {
    return base;
  }

  // The core principle: merge the properties of the elided affix into the base's context
  const augmentedBase = {
    ...base,
    context: {
      ...base.context,
      elidedAffixProperties: { ...elidedAffix.properties },
      pratyayalakshanam: true
    }
  };

  return augmentedBase;
}
