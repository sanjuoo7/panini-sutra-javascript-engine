import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.70: तपरस्तत्कालस्य
 * taparastatkālasya
 * 
 * "Those [rules/operations that come] after that [previous rule] 
 * are of that [same] time/context."
 * 
 * This sutra establishes the principle of temporal/contextual scope 
 * in grammatical operations - rules that follow maintain the same 
 * temporal or contextual application as their predecessor.
 */

/**
 * Represents different temporal/contextual scopes in Sanskrit grammar.
 */
const TEMPORAL_CONTEXTS = {
  ABSOLUTE: 'absolute',           // Independent temporal reference
  RELATIVE: 'relative',           // Relative to previous operation
  IMMEDIATE: 'immediate',         // Immediate sequence
  EXTENDED: 'extended',           // Extended temporal scope
  INHERITED: 'inherited',         // Inherited from previous rule
  CONDITIONAL: 'conditional',     // Context-dependent
  INDEPENDENT: 'independent'      // Temporally independent
};

/**
 * Traditional temporal markers and indicators in Sanskrit grammar.
 */
const TEMPORAL_MARKERS = {
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
 * Common grammatical sequences where temporal inheritance applies.
 */
const GRAMMATICAL_SEQUENCES = {
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
 * Determines if a grammatical operation inherits temporal context 
 * from its predecessor according to Sutra 1.1.70.
 * 
 * @param {string} currentOperation - The current grammatical operation
 * @param {string} previousOperation - The preceding operation
 * @param {Object} [context={}] - Contextual information
 * @returns {boolean} True if temporal inheritance applies
 */
function inheritsTemporalContext(currentOperation, previousOperation, context = {}) {
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
  
  // Apply Sutra 1.1.70 logic
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
function checkOperationSequence(current, previous, context = {}) {
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
function hasExplicitTemporalMarkers(operation, context = {}) {
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
function checkContextualRelationship(current, previous, context = {}) {
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
 * @param {string} operation - The operation to analyze
 * @param {string} previousOperation - The preceding operation
 * @param {Object} [context={}] - Context for analysis
 * @returns {Object} Analysis result with temporal context information
 */
function analyzeTemporalInheritance(operation, previousOperation, context = {}) {
  const result = {
    operation,
    previousOperation,
    script: detectScript(operation),
    inheritsContext: false,
    temporalScope: TEMPORAL_CONTEXTS.ABSOLUTE,
    inheritanceType: '',
    reasoning: [],
    contextualFactors: [],
    sutraReference: '1.1.70'
  };

  if (!operation || typeof operation !== 'string') {
    result.reasoning.push('Invalid operation: must be a non-empty string');
    return result;
  }

  if (!previousOperation || typeof previousOperation !== 'string') {
    result.reasoning.push('Invalid previous operation: must be a non-empty string');
    return result;
  }

  // Analyze inheritance
  const inherits = inheritsTemporalContext(operation, previousOperation, context);
  result.inheritsContext = inherits;

  if (inherits) {
    result.temporalScope = TEMPORAL_CONTEXTS.INHERITED;
    result.reasoning.push('Operation inherits temporal context from predecessor');
    result.reasoning.push('Follows principle: तपरस्तत्कालस्य (those after are of that time)');
    
    // Determine inheritance type
    if (checkOperationSequence(operation, previousOperation, context)) {
      result.inheritanceType = 'sequential';
      result.contextualFactors.push('Operations are in recognized grammatical sequence');
    }
    
    if (checkContextualRelationship(operation, previousOperation, context)) {
      result.inheritanceType = result.inheritanceType ? 'sequential-contextual' : 'contextual';
      result.contextualFactors.push('Operations have contextual relationship');
    }
    
    if (context.sameElement) {
      result.contextualFactors.push('Operations apply to same linguistic element');
    }
    
    if (context.followsImmediately) {
      result.contextualFactors.push('Operations follow immediately in sequence');
    }
    
  } else {
    result.reasoning.push('Operation does not inherit temporal context');
    
    if (hasExplicitTemporalMarkers(operation, context)) {
      result.temporalScope = TEMPORAL_CONTEXTS.ABSOLUTE;
      result.reasoning.push('Operation has explicit temporal markers');
      result.contextualFactors.push('Explicit temporal specification overrides inheritance');
    } else {
      result.temporalScope = TEMPORAL_CONTEXTS.INDEPENDENT;
      result.reasoning.push('Operation is temporally independent');
      result.contextualFactors.push('No contextual relationship with predecessor');
    }
  }

  // Additional context analysis
  if (context.ruleType) {
    result.contextualFactors.push(`Rule type: ${context.ruleType}`);
  }
  
  if (context.linguisticLevel) {
    result.contextualFactors.push(`Linguistic level: ${context.linguisticLevel}`);
  }

  return result;
}

/**
 * Determines the temporal scope of a grammatical operation.
 * 
 * @param {string} operation - The operation to analyze
 * @param {Object} [context={}] - Context information
 * @returns {string} The temporal scope type
 */
function getTemporalScope(operation, context = {}) {
  if (!operation || typeof operation !== 'string') {
    return TEMPORAL_CONTEXTS.ABSOLUTE;
  }

  // Check for explicit temporal markers
  if (hasExplicitTemporalMarkers(operation, context)) {
    if (context.explicitTiming === 'immediate') {
      return TEMPORAL_CONTEXTS.IMMEDIATE;
    } else if (context.explicitTiming === 'extended') {
      return TEMPORAL_CONTEXTS.EXTENDED;
    } else if (context.explicitTiming === 'conditional') {
      return TEMPORAL_CONTEXTS.CONDITIONAL;
    }
    return TEMPORAL_CONTEXTS.ABSOLUTE;
  }

  // Check context for inheritance indicators
  if (context.inheritsFromPrevious || context.followsPrevious) {
    return TEMPORAL_CONTEXTS.INHERITED;
  }

  // Check for relative temporal context
  if (context.relativeToOther || context.dependsOnContext) {
    return TEMPORAL_CONTEXTS.RELATIVE;
  }

  return TEMPORAL_CONTEXTS.ABSOLUTE;
}

/**
 * Provides traditional examples demonstrating Sutra 1.1.70.
 * 
 * @returns {Object} Examples of temporal context inheritance
 */
function getTemporalInheritanceExamples() {
  return {
    principle: 'तपरस्तत्कालस्य - Operations following maintain the same temporal context',
    
    sequentialOperations: {
      description: 'Sequential grammatical operations with temporal inheritance',
      examples: [
        {
          sequence: ['vowel-coalescence', 'accent-shift'],
          context: 'Sandhi operations in compound formation',
          inheritance: 'Accent shift inherits timing from vowel coalescence',
          result: 'Both operations apply simultaneously in same context'
        },
        {
          sequence: ['stem-formation', 'suffix-addition'],
          context: 'Morphological derivation process',
          inheritance: 'Suffix addition inherits temporal scope from stem formation',
          result: 'Unified temporal application in word formation'
        },
        {
          sequence: ['consonant-assimilation', 'vowel-modification'],
          context: 'Phonological changes in euphonic combination',
          inheritance: 'Vowel modification inherits temporal pattern of consonant change',
          result: 'Coherent phonological transformation'
        }
      ]
    },
    
    contextualInheritance: {
      description: 'Operations inheriting context from predecessors',
      examples: [
        {
          operation: 'secondary suffix addition',
          predecessor: 'primary suffix addition',
          context: 'Same morphological derivation',
          reasoning: 'तपरस्तत्कालस्य - maintains temporal scope of primary operation'
        },
        {
          operation: 'final accent assignment',
          predecessor: 'initial accent placement',
          context: 'Accentual pattern establishment',
          reasoning: 'तपरस्तत्कालस्य - Inherits accentual timing from initial placement'
        }
      ]
    },
    
    traditionalNote: 'This sutra ensures coherent temporal application of related grammatical operations, ' +
                    'preventing temporal fragmentation in complex linguistic processes.'
  };
}

export {
  TEMPORAL_CONTEXTS,
  inheritsTemporalContext,
  analyzeTemporalInheritance,
  getTemporalScope,
  checkOperationSequence,
  hasExplicitTemporalMarkers,
  checkContextualRelationship,
  getTemporalInheritanceExamples
};
