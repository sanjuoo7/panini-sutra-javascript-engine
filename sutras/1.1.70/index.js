import { 
  detectScript, 
  validateSanskritWord,
  inheritsTemporalContext,
  analyzeTemporalInheritance,
  getTemporalScope,
  getTemporalInheritanceExamples,
  TEMPORAL_CONTEXTS,
  TEMPORAL_MARKERS,
  GRAMMATICAL_SEQUENCES
} from '../sanskrit-utils/index.js';

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
 * Main function implementing Sutra 1.1.70 using shared utilities
 * @param {string} targetOperation - The operation to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function sutra1_1_70(targetOperation, context = {}) {
  // Input validation
  if (!targetOperation || typeof targetOperation !== 'string') {
    throw new Error('Target operation must be a valid string');
  }

  const { 
    priorOperation = null,
    operationSequence = [],
    temporalMarkers = [],
    metalinguisticRules = [],
    grammaticalContext = null
  } = context;

  // Handle case where there's no prior operation
  if (!priorOperation) {
    return {
      targetOperation,
      inherits: false,
      confidence: 1.0,
      analysis: {
        scope: 'independent',
        scopeType: 'absolute',
        precedentOperation: null,
        temporalRelationship: 'none',
        reasoning: ['No precedent operation - temporally independent']
      }
    };
  }

  // Use shared temporal analysis utilities with correct signatures
  const analysis = analyzeTemporalInheritance(targetOperation, priorOperation, {
    operationSequence,
    temporalMarkers,
    grammaticalContext
  });

  // Check temporal inheritance using the shared utility (returns boolean)
  const inherits = inheritsTemporalContext(targetOperation, priorOperation, {
    operationSequence,
    temporalMarkers,
    grammaticalContext
  });

  // Get temporal scope using the shared utility (returns string)
  const scope = getTemporalScope(targetOperation, context);

  return {
    targetOperation,
    inherits,
    confidence: analysis.confidence,
    analysis: {
      ...analysis,
      scope,
      scopeType: scope === 'inherited' ? 'contextual' : 'absolute',
      precedentOperation: priorOperation,
      temporalRelationship: analysis.temporalRelationship
    }
  };
}

/**
 * Check if an operation inherits temporal context from its predecessor
 * @param {string} operation - Current operation
 * @param {string} predecessor - Previous operation
 * @param {Object} context - Context information
 * @returns {boolean} Whether inheritance applies
 */
export function checkTemporalInheritance(operation, predecessor, context = {}) {
  const inherits = inheritsTemporalContext(operation, predecessor, context);
  const analysis = analyzeTemporalInheritance(operation, predecessor || '', context);
  
  return {
    inherits,
    confidence: analysis.confidence,
    reasoning: analysis.reasoning,
    temporalRelationship: analysis.temporalRelationship
  };
}

/**
 * Get examples demonstrating this sutra
 * @returns {Object} Traditional examples
 */
export function getExamples() {
  return getTemporalInheritanceExamples();
}

// Re-export shared constants for convenience
export { 
  TEMPORAL_CONTEXTS, 
  TEMPORAL_MARKERS, 
  GRAMMATICAL_SEQUENCES 
};

export default sutra1_1_70;
