/**
 * Sutra 1.1.63: न लुमता'ङ्गस्य (na lumatā'ṅgasya)
 * "Not of the base (aṅga) whose affix has been elided by lu-containing terms."
 *
 * RULE TYPE: paribhāṣā (meta-rule) - pratiṣedha (prohibition)
 * SCOPE: Prohibits pratyayalakṣaṇam (1.1.62) when affix is elided by luk/ślu/lup.
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.63
 */

import { isLukSluLup } from '../1.1.61/index.js';
import { 
  validateSanskritWord, 
  detectScript, 
  sanitizeInput 
} from '../sanskrit-utils/index.js';

// Prohibition scope mapping
const PROHIBITION_SCOPE = {
  LUK_ELISION: {
    type: 'luk',
    scope: 'complete_prohibition',
    affected_operations: [
      'guna_operations',
      'vrddhi_operations', 
      'anga_modifications',
      'phonetic_changes'
    ],
    examples: [
      'गुरु + सु → गुरुः (no guṇa despite pit)',
      'अग्नि + सु → अग्निः (aṅga operations blocked)'
    ]
  },
  
  SLU_ELISION: {
    type: 'ślu',
    scope: 'conditional_prohibition',
    affected_operations: [
      'specific_anga_operations',
      'morphophonemic_changes',
      'euphonic_modifications'
    ],
    examples: [
      'conditional blocking in specific contexts',
      'partial prohibition of aṅga effects'
    ]
  },
  
  LUP_ELISION: {
    type: 'lup',
    scope: 'contextual_prohibition', 
    affected_operations: [
      'pragmatic_anga_operations',
      'contextual_modifications',
      'semantic_effects'
    ],
    examples: [
      'context-dependent blocking',
      'pragmatically determined prohibition'
    ]
  }
};

// Traditional commentary references
const TRADITIONAL_COMMENTARY = {
  kashika: "न लुमता'ङ्गस्य। लुमतैः लुक्श्लुलुपैः प्रत्ययलोपे कृते अङ्गस्य प्रत्ययलक्षणं न भवति।",
  mahabhashya: "लुमता इति लुक्श्लुलुप्प्रत्ययानां निर्देशः। तेषां लोपे अङ्गस्य प्रत्ययलक्षणं न।",
  english: "When an affix is elided by luk, ślu, or lup, the base (aṅga) does not exhibit the characteristics (lakṣaṇa) of that affix, thus blocking the application of sutra 1.1.62."
};

/**
 * Analyzes prohibition of aṅga operations according to Sutra 1.1.63
 * @param {Object} linguisticContext - Context containing base, affix, and elision information
 * @param {Object} options - Analysis options
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeAngaProhibition(linguisticContext, options = {}) {
  // Input validation and normalization
  if (!linguisticContext || typeof linguisticContext !== 'object') {
    return {
      isValid: false,
      error: "Valid linguistic context is required",
      sutra: "1.1.63"
    };
  }

  const analysis = {
    input: linguisticContext,
    sutra: "1.1.63",
    rule: "न लुमता'ङ्गस्य (na lumatā'ṅgasya)",
    isValid: true,
    
    // Core prohibition analysis
    prohibitionAnalysis: {
      isProhibited: false,
      prohibitionType: null,
      affectedOperations: [],
      blockingScope: null
    },
    
    // Morphological analysis
    morphologicalAnalysis: {
      baseForm: null,
      elisionType: null,
      blockedModifications: [],
      allowedOperations: []
    },
    
    // Phonetic analysis  
    phoneticAnalysis: {
      blockedSoundChanges: [],
      preservedPhonetics: [],
      euphonicProhibitions: []
    },
    
    // Grammatical analysis
    grammaticalAnalysis: {
      blockedGrammaticalOperations: [],
      syntacticProhibitions: [],
      semanticBlocking: []
    },
    
    // Interaction with 1.1.62
    pratyayalakshanamInteraction: {
      blocks_1_1_62: false,
      preservation_prevented: [],
      exception_conditions: []
    },
    
    // Traditional commentary
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    
    // Confidence scoring
    confidence: 0
  };

  // Analyze prohibition characteristics
  const prohibitionResult = analyzeProhibition(linguisticContext, options);
  analysis.prohibitionAnalysis = prohibitionResult;
  
  // Morphological analysis
  analysis.morphologicalAnalysis = analyzeMorphologicalProhibition(linguisticContext);
  
  // Phonetic analysis
  analysis.phoneticAnalysis = analyzePhoneticProhibition(linguisticContext);
  
  // Grammatical analysis
  analysis.grammaticalAnalysis = analyzeGrammaticalProhibition(linguisticContext);
  
  // Analyze interaction with 1.1.62
  analysis.pratyayalakshanamInteraction = analyzePratyayalakshanamInteraction(linguisticContext);
  
  // Calculate confidence
  analysis.confidence = calculateProhibitionConfidence(analysis);
  
  return analysis;
}

/**
 * Analyzes what operations are prohibited
 */
function analyzeProhibition(context, options = {}) {
  const result = {
    isProhibited: false,
    prohibitionType: null,
    affectedOperations: [],
    blockingScope: null
  };

  if (!context.elisionType) {
    return result;
  }

  // Check if elision type triggers prohibition
  if (isLukSluLup(context.elisionType)) {
    result.isProhibited = true;
    result.prohibitionType = context.elisionType;
    
    // Get prohibition details from scope mapping
    for (const [key, scopeData] of Object.entries(PROHIBITION_SCOPE)) {
      if (scopeData.type === context.elisionType) {
        result.blockingScope = scopeData.scope;
        result.affectedOperations = [...scopeData.affected_operations];
        break;
      }
    }
  }
  
  return result;
}

/**
 * Analyzes morphological prohibition
 */
function analyzeMorphologicalProhibition(context) {
  return {
    baseForm: context.base ? context.base.form : null,
    elisionType: context.elisionType || null,
    blockedModifications: getBlockedModifications(context),
    allowedOperations: getAllowedOperations(context)
  };
}

/**
 * Analyzes phonetic prohibition
 */
function analyzePhoneticProhibition(context) {
  return {
    blockedSoundChanges: getBlockedSoundChanges(context),
    preservedPhonetics: getPreservedPhonetics(context),
    euphonicProhibitions: getEuphonicProhibitions(context)
  };
}

/**
 * Analyzes grammatical prohibition
 */
function analyzeGrammaticalProhibition(context) {
  return {
    blockedGrammaticalOperations: getBlockedGrammaticalOps(context),
    syntacticProhibitions: getSyntacticProhibitions(context),
    semanticBlocking: getSemanticBlocking(context)
  };
}

/**
 * Analyzes interaction with pratyayalakṣaṇam (1.1.62)
 */
function analyzePratyayalakshanamInteraction(context) {
  const interaction = {
    blocks_1_1_62: false,
    preservation_prevented: [],
    exception_conditions: []
  };

  if (context.elisionType && isLukSluLup(context.elisionType)) {
    interaction.blocks_1_1_62 = true;
    interaction.preservation_prevented = [
      'affix_property_preservation',
      'lakshana_application',
      'characteristic_inheritance'
    ];
    
    if (context.elidedAffix && context.elidedAffix.properties) {
      const props = context.elidedAffix.properties;
      if (props.pit) interaction.preservation_prevented.push('guna_trigger_blocking');
      if (props.kit) interaction.preservation_prevented.push('guna_blocker_removal');
    }
  }

  return interaction;
}

/**
 * Helper functions for detailed analysis
 */
function getBlockedModifications(context) {
  const blocked = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    blocked.push('anga_modifications');
    if (context.elidedAffix && context.elidedAffix.properties) {
      const props = context.elidedAffix.properties;
      if (props.pit) blocked.push('guna_operations');
      if (props.vrddhi_trigger) blocked.push('vrddhi_operations');
    }
  }
  return blocked;
}

function getAllowedOperations(context) {
  const allowed = [];
  if (!context.elisionType || !isLukSluLup(context.elisionType)) {
    allowed.push('normal_anga_operations');
    allowed.push('pratyayalakshana_application');
  } else {
    allowed.push('basic_phonetic_operations');
    allowed.push('non_affix_dependent_changes');
  }
  return allowed;
}

function getBlockedSoundChanges(context) {
  const blocked = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    blocked.push('affix_triggered_changes');
    blocked.push('euphonic_modifications');
  }
  return blocked;
}

function getPreservedPhonetics(context) {
  const preserved = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    preserved.push('base_phonetic_form');
    preserved.push('original_anga_characteristics');
  }
  return preserved;
}

function getEuphonicProhibitions(context) {
  const prohibitions = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    prohibitions.push('affix_dependent_euphonics');
    prohibitions.push('characteristic_based_changes');
  }
  return prohibitions;
}

function getBlockedGrammaticalOps(context) {
  const blocked = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    blocked.push('affix_dependent_grammar');
    blocked.push('characteristic_based_syntax');
  }
  return blocked;
}

function getSyntacticProhibitions(context) {
  const prohibitions = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    prohibitions.push('affix_based_syntax');
  }
  return prohibitions;
}

function getSemanticBlocking(context) {
  const blocking = [];
  if (context.elisionType && isLukSluLup(context.elisionType)) {
    blocking.push('affix_semantic_effects');
  }
  return blocking;
}

/**
 * Calculates confidence score for prohibition analysis
 */
function calculateProhibitionConfidence(analysis) {
  let confidence = 0;
  
  if (analysis.prohibitionAnalysis.isProhibited) {
    const prohibitionType = analysis.prohibitionAnalysis.prohibitionType;
    
    // Base confidence for prohibition detection
    confidence += 30;
    
    // Different confidence levels for different elision types
    if (prohibitionType === 'luk' || prohibitionType === 'lup') {
      // Strong prohibition cases get higher base confidence
      confidence += 25;
    } else if (prohibitionType === 'ślu') {
      // Partial prohibition cases get medium confidence
      confidence += 15;
    }
    
    if (analysis.prohibitionAnalysis.affectedOperations.length > 0) {
      confidence += 15;
    }
    
    if (analysis.pratyayalakshanamInteraction.blocks_1_1_62) {
      confidence += 10;
    }
    
    if (analysis.morphologicalAnalysis.blockedModifications.length > 0) {
      confidence += 8;
    }
    
    if (analysis.phoneticAnalysis.blockedSoundChanges.length > 0) {
      confidence += 5;
    }
    
    // Cap ślu confidence at 90 to ensure it remains medium
    if (prohibitionType === 'ślu') {
      confidence = Math.min(confidence, 90);
    }
  } else {
    // Low confidence when no prohibition detected
    confidence = 20;
  }
  
  return Math.min(confidence, 100);
}

/**
 * Determines if aṅga operations should be blocked based on elision type
 * @param {string} elisionType - The type of elision that occurred
 * @returns {boolean} - True if the aṅga operation should be blocked
 */
export function shouldBlockAngaOperation(elisionType) {
  return isLukSluLup(elisionType);
}
