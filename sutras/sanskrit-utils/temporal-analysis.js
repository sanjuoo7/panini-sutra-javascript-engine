/**
 * Temporal Analysis Utilities
 * 
 * This module provides utilities for analyzing temporal inheritance and contextual
 * scope in grammatical operations. Based on Sutra 1.1.70: तपरस्तत्कालस्य
 * 
 * The principle is that grammatical rules/operations that follow maintain the same
 * temporal or contextual application as their predecessor unless explicitly overridden.
 * 
 * Used by: Sutra 1.1.70, and potentially other sutras dealing with 
 * sequential grammatical operations and contextual inheritance.
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * Types of grammatical rules (विधि) and their scope patterns
 */
export const VIDHI_TYPES = {
  SUFFIX_RULE: 'suffix-rule',           // Rules applying to suffixes
  PHONETIC_RULE: 'phonetic-rule',       // Phonetic change rules
  MORPHOLOGICAL_RULE: 'morphological-rule', // Morphological operations
  CATEGORY_RULE: 'category-rule',       // Category-based rules
  ACCENT_RULE: 'accent-rule',           // Accentual rules
  SANDHI_RULE: 'sandhi-rule'            // Euphonic combination rules
};

/**
 * Different temporal/contextual scopes in Sanskrit grammar
 */
export const TEMPORAL_CONTEXTS = {
  ABSOLUTE: 'absolute',           // Independent temporal reference
  RELATIVE: 'relative',           // Relative to previous operation
  IMMEDIATE: 'immediate',         // Immediate sequence
  EXTENDED: 'extended',           // Extended temporal scope
  INHERITED: 'inherited',         // Inherited from previous rule
  CONDITIONAL: 'conditional',     // Context-dependent
  INDEPENDENT: 'independent'      // Temporally independent
};

/**
 * Traditional temporal markers and indicators in Sanskrit grammar
 */
export const TEMPORAL_MARKERS = {
  devanagari: {
    immediate: ['तदा', 'तत्र', 'तत्काले', 'तत्प्रसङ्गे'],
    subsequent: ['ततः', 'तदनन्तरम्', 'तदुत्तरम्', 'तत्पश्चात्'],
    concurrent: ['तत्समकालम्', 'तत्समये', 'तदैव', 'तत्सह'],
    conditional: ['तत्र चेत्', 'तदा चेत्', 'तत्काले चेत्', 'तस्मिन्काले']
  },
  iast: {
    immediate: ['tadā', 'tatra', 'tatkāle', 'tatprasaṅge'],
    subsequent: ['tataḥ', 'tadanantaram', 'taduttaram', 'tatpaścāt'],
    concurrent: ['tatsamakālam', 'tatsamaye', 'tadaiva', 'tatsaha'],
    conditional: ['tatra cet', 'tadā cet', 'tatkāle cet', 'tasminkāle']
  }
};

/**
 * Common grammatical sequences where temporal inheritance applies
 */
export const GRAMMATICAL_SEQUENCES = {
  // Sandhi operations that maintain temporal scope
  sandhiSequences: [
    'vowel-coalescence',
    'consonant-assimilation', 
    'visarga-modification',
    'anusvara-conversion'
  ],
  
  // Morphological operations with temporal inheritance
  morphologicalSequences: [
    'stem-formation',
    'suffix-addition',
    'case-inflection',
    'verbal-conjugation'
  ],
  
  // Phonological changes that follow temporal patterns
  phonologicalSequences: [
    'vowel-strengthening',
    'consonant-gemination',
    'accent-modification',
    'syllable-restructuring'
  ]
};

/**
 * Confidence levels for temporal inheritance analysis
 */
export const TEMPORAL_CONFIDENCE_LEVELS = {
  CERTAIN: 1.0,        // Explicit sequence with clear markers
  VERY_HIGH: 0.95,     // Clear contextual relationship
  HIGH: 0.9,           // Strong indication of inheritance
  MEDIUM: 0.7,         // Probable inheritance
  LOW: 0.5,            // Uncertain inheritance
  VERY_LOW: 0.2        // Unlikely inheritance
};

/**
 * Determines if a grammatical operation inherits temporal context 
 * from its predecessor according to Sutra 1.1.70.
 * 
 * @param {string} currentOperation - The current grammatical operation
 * @param {string} previousOperation - The preceding operation
 * @param {Object} [context={}] - Contextual information
 * @returns {boolean} True if temporal inheritance applies
 */
export function inheritsTemporalContext(currentOperation, previousOperation, context = {}) {
  if (!currentOperation || !previousOperation || 
      typeof currentOperation !== 'string' || typeof previousOperation !== 'string') {
    return false;
  }

  // Check if operations are in a recognized sequence
  const isInSequence = checkOperationSequence(currentOperation, previousOperation, context);
  
  // Check for explicit temporal markers
  const hasTemporalMarkers = hasExplicitTemporalMarkers(currentOperation, context);
  
  // Check contextual relationship
  const hasContextualRelationship = checkContextualRelationship(currentOperation, previousOperation, context);
  
  // Apply Sutra 1.1.70 logic: inherit unless explicitly overridden
  return isInSequence || (!hasTemporalMarkers && hasContextualRelationship);
}

/**
 * Checks if two operations are part of a recognized grammatical sequence.
 * 
 * @param {string} current - Current operation
 * @param {string} previous - Previous operation  
 * @param {Object} [context={}] - Context information
 * @returns {boolean} True if operations are in sequence
 */
export function checkOperationSequence(current, previous, context = {}) {
  // Check all grammatical sequence types
  for (const [sequenceType, operations] of Object.entries(GRAMMATICAL_SEQUENCES)) {
    if (operations.includes(current) && operations.includes(previous)) {
      // Check if they're adjacent in the sequence
      const currentIndex = operations.indexOf(current);
      const previousIndex = operations.indexOf(previous);
      
      if (Math.abs(currentIndex - previousIndex) === 1) {
        return true;
      }
    }
  }
  
  // Check for explicit sequence markers in context
  if (context.inSequence || context.followsPrevious || context.isContiguous) {
    return true;
  }
  
  return false;
}

/**
 * Checks for explicit temporal markers that would override inheritance.
 * 
 * @param {string} operation - The operation to check
 * @param {Object} [context={}] - Context information
 * @returns {boolean} True if explicit temporal markers are present
 */
export function hasExplicitTemporalMarkers(operation, context = {}) {
  if (!operation || typeof operation !== 'string') {
    return false;
  }

  const script = detectScript(operation);
  const markers = script === 'Devanagari' ? TEMPORAL_MARKERS.devanagari : TEMPORAL_MARKERS.iast;
  
  // Check for any temporal markers in the operation description
  for (const markerType of Object.values(markers)) {
    for (const marker of markerType) {
      if (operation.includes(marker)) {
        return true;
      }
    }
  }
  
  // Check for temporal markers in context description (check both scripts)
  if (context.description) {
    const allMarkers = [...Object.values(TEMPORAL_MARKERS.devanagari).flat(), 
                       ...Object.values(TEMPORAL_MARKERS.iast).flat()];
    for (const marker of allMarkers) {
      if (context.description.includes(marker)) {
        return true;
      }
    }
  }
  
  // Check context for explicit temporal specifications
  return !!(context.explicitTiming || context.independentTiming || context.overrideTiming);
}

/**
 * Checks for contextual relationship between operations.
 * 
 * @param {string} current - Current operation
 * @param {string} previous - Previous operation
 * @param {Object} [context={}] - Context information
 * @returns {boolean} True if contextual relationship exists
 */
export function checkContextualRelationship(current, previous, context = {}) {
  // Operations on the same linguistic element
  if (context.sameElement || context.sameWord || context.sameMorpheme) {
    return true;
  }
  
  // Operations in the same grammatical category
  if (context.sameCategory || context.relatedRules || context.samePrakarana) {
    return true;
  }
  
  // Sequential rule application
  if (context.ruleSequence || context.followsImmediately || context.causedBy) {
    return true;
  }
  
  return false;
}

/**
 * Analyzes the temporal context inheritance for a grammatical operation
 * according to Sutra 1.1.70.
 * 
 * @param {string} currentOperation - The current operation to analyze
 * @param {string} previousOperation - The preceding operation
 * @param {Object} [context={}] - Contextual information
 * @returns {Object} Detailed temporal inheritance analysis
 */
export function analyzeTemporalInheritance(currentOperation, previousOperation, context = {}) {
  const result = {
    currentOperation,
    previousOperation,
    inheritsContext: false,
    temporalRelationship: TEMPORAL_CONTEXTS.INDEPENDENT,
    confidence: TEMPORAL_CONFIDENCE_LEVELS.LOW,
    reasoning: [],
    sequenceAnalysis: {
      isInSequence: false,
      sequenceType: null,
      sequencePosition: null
    },
    markerAnalysis: {
      hasExplicitMarkers: false,
      markersFound: [],
      markerType: null
    },
    contextualAnalysis: {
      hasRelationship: false,
      relationshipType: null,
      relationshipStrength: 'weak'
    },
    sutraReference: '1.1.70'
  };

  if (!currentOperation || !previousOperation || 
      typeof currentOperation !== 'string' || typeof previousOperation !== 'string') {
    result.reasoning.push('Invalid input: operations must be non-empty strings');
    result.confidence = TEMPORAL_CONFIDENCE_LEVELS.VERY_LOW;
    return result;
  }

  // Analyze sequence relationship
  const inSequence = checkOperationSequence(currentOperation, previousOperation, context);
  result.sequenceAnalysis.isInSequence = inSequence;
  
  if (inSequence) {
    result.reasoning.push('Operations are part of a recognized grammatical sequence');
    result.temporalRelationship = TEMPORAL_CONTEXTS.IMMEDIATE;
    result.confidence = TEMPORAL_CONFIDENCE_LEVELS.HIGH;
    
    // Determine sequence type
    for (const [sequenceType, operations] of Object.entries(GRAMMATICAL_SEQUENCES)) {
      if (operations.includes(currentOperation) && operations.includes(previousOperation)) {
        result.sequenceAnalysis.sequenceType = sequenceType;
        break;
      }
    }
  }

  // Analyze temporal markers
  const hasMarkers = hasExplicitTemporalMarkers(currentOperation, context);
  result.markerAnalysis.hasExplicitMarkers = hasMarkers;
  
  if (hasMarkers) {
    result.reasoning.push('Explicit temporal markers found - overrides inheritance');
    result.temporalRelationship = TEMPORAL_CONTEXTS.INDEPENDENT;
    result.confidence = TEMPORAL_CONFIDENCE_LEVELS.CERTAIN;
    
    // Find specific markers
    const script = detectScript(currentOperation);
    const markers = script === 'Devanagari' ? TEMPORAL_MARKERS.devanagari : TEMPORAL_MARKERS.iast;
    
    for (const [markerType, markerList] of Object.entries(markers)) {
      for (const marker of markerList) {
        if (currentOperation.includes(marker)) {
          result.markerAnalysis.markersFound.push(marker);
          result.markerAnalysis.markerType = markerType;
        }
      }
    }
  }

  // Analyze contextual relationship
  const hasRelationship = checkContextualRelationship(currentOperation, previousOperation, context);
  result.contextualAnalysis.hasRelationship = hasRelationship;
  
  if (hasRelationship) {
    result.reasoning.push('Contextual relationship detected between operations');
    
    // Determine relationship type and strength
    if (context.sameElement || context.sameWord) {
      result.contextualAnalysis.relationshipType = 'same-element';
      result.contextualAnalysis.relationshipStrength = 'strong';
    } else if (context.sameCategory || context.relatedRules) {
      result.contextualAnalysis.relationshipType = 'same-category';
      result.contextualAnalysis.relationshipStrength = 'medium';
    } else if (context.ruleSequence || context.followsImmediately) {
      result.contextualAnalysis.relationshipType = 'sequential';
      result.contextualAnalysis.relationshipStrength = 'strong';
    }
  }

  // Apply Sutra 1.1.70 logic
  const inherits = inheritsTemporalContext(currentOperation, previousOperation, context);
  result.inheritsContext = inherits;
  
  if (inherits) {
    // Prioritize contextual relationships over sequence relationships
    if (hasRelationship) {
      result.temporalRelationship = TEMPORAL_CONTEXTS.INHERITED;
      result.confidence = TEMPORAL_CONFIDENCE_LEVELS.VERY_HIGH;
    } else if (inSequence) {
      result.temporalRelationship = TEMPORAL_CONTEXTS.IMMEDIATE;
      result.confidence = TEMPORAL_CONFIDENCE_LEVELS.HIGH;
    } else {
      result.temporalRelationship = TEMPORAL_CONTEXTS.INHERITED;
      result.confidence = TEMPORAL_CONFIDENCE_LEVELS.MEDIUM;
    }
    
    result.reasoning.push('Temporal context inherited from previous operation');
  } else {
    result.reasoning.push('No temporal inheritance - operation is temporally independent');
    if (hasMarkers) {
      result.confidence = TEMPORAL_CONFIDENCE_LEVELS.CERTAIN;
    }
  }

  return result;
}

/**
 * Gets the temporal scope type for a given operation
 * @param {string} operation - The operation to analyze
 * @param {Object} [context={}] - Context information
 * @returns {string} The temporal scope type
 */
export function getTemporalScope(operation, context = {}) {
  if (!operation || typeof operation !== 'string') {
    return TEMPORAL_CONTEXTS.INDEPENDENT;
  }

  if (hasExplicitTemporalMarkers(operation, context)) {
    return TEMPORAL_CONTEXTS.ABSOLUTE;
  }

  if (context.isInheritedContext || context.followsPrevious) {
    return TEMPORAL_CONTEXTS.INHERITED;
  }

  if (context.isImmediate || context.isContiguous) {
    return TEMPORAL_CONTEXTS.IMMEDIATE;
  }

  if (context.isConditional) {
    return TEMPORAL_CONTEXTS.CONDITIONAL;
  }

  // Check for contextual relationships that imply inheritance
  if (context.sameWord || context.sameElement || context.sameCategory) {
    return TEMPORAL_CONTEXTS.INHERITED;
  }

  return TEMPORAL_CONTEXTS.INDEPENDENT;
}

/**
 * Provides examples of temporal inheritance patterns
 * @returns {Object} Examples demonstrating temporal analysis
 */
export function getTemporalInheritanceExamples() {
  return {
    inheritance: {
      description: 'तपरस्तत्कालस्य - Operations inheriting temporal context',
      examples: [
        {
          sequence: ['vowel-coalescence', 'consonant-assimilation'],
          context: 'Sandhi operations in sequence',
          inheritance: true,
          reasoning: 'Sequential sandhi operations maintain the same temporal scope'
        },
        {
          sequence: ['stem-formation', 'suffix-addition'],
          context: 'Morphological operations on same word',
          inheritance: true,
          reasoning: 'Morphological operations on the same element inherit context'
        }
      ]
    },
    override: {
      description: 'Operations with explicit temporal markers override inheritance',
      examples: [
        {
          operation: 'accent-modification',
          markers: ['तदा', 'tadā'],
          inheritance: false,
          reasoning: 'Explicit temporal marker overrides inheritance'
        },
        {
          operation: 'independent-rule',
          markers: ['तत्र चेत्', 'tatra cet'],
          inheritance: false,
          reasoning: 'Conditional marker indicates independent timing'
        }
      ]
    }
  };
}
