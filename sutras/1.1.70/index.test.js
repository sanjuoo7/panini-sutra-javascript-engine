import sutra1_1_70, { 
  checkTemporalInheritance,
  getExamples,
  TEMPORAL_CONTEXTS,
  TEMPORAL_MARKERS,
  GRAMMATICAL_SEQUENCES
} from './index.js';

// Import the shared utilities directly for testing the underlying functionality
import {
  inheritsTemporalContext,
  analyzeTemporalInheritance,
  getTemporalScope
} from '../sanskrit-utils/index.js';

describe('Sutra 1.1.70: तपरस्तत्कालस्य (Refactored)', () => {
  describe('Main sutra1_1_70 function', () => {
    it('should analyze temporal inheritance for basic operations', () => {
      const result = sutra1_1_70('suffix-addition', {
        priorOperation: 'stem-formation',
        operationSequence: ['stem-formation', 'suffix-addition'],
        grammaticalContext: 'morphological-derivation'
      });

      expect(result).toHaveProperty('targetOperation', 'suffix-addition');
      expect(result).toHaveProperty('inherits');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('analysis');
      expect(typeof result.inherits).toBe('boolean');
      expect(typeof result.confidence).toBe('number');
    });

    it('should handle operations without prior operation', () => {
      const result = sutra1_1_70('independent-operation');

      expect(result.targetOperation).toBe('independent-operation');
      expect(result.inherits).toBe(false);
      expect(result.confidence).toBe(1.0);
    });

    it('should throw error for invalid input', () => {
      expect(() => sutra1_1_70('')).toThrow('Target operation must be a valid string');
      expect(() => sutra1_1_70(null)).toThrow('Target operation must be a valid string');
      expect(() => sutra1_1_70(123)).toThrow('Target operation must be a valid string');
    });
  });

  describe('checkTemporalInheritance function', () => {
    it('should check inheritance using shared utilities', () => {
      const result = checkTemporalInheritance('suffix-addition', 'stem-formation', {
        operationSequence: ['stem-formation', 'suffix-addition']
      });

      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('inherits');
      expect(result).toHaveProperty('confidence');
    });
  });

  describe('getExamples function', () => {
    it('should return traditional examples', () => {
      const examples = getExamples();

      expect(examples).toHaveProperty('inheritance');
      expect(examples).toHaveProperty('override');
      expect(examples.inheritance.description).toContain('तपरस्तत्कालस्य');
      expect(examples.inheritance.examples).toHaveLength(2);
      expect(examples.override.examples).toHaveLength(2);
    });
  });

  describe('Exported constants', () => {
    it('should export TEMPORAL_CONTEXTS', () => {
      expect(TEMPORAL_CONTEXTS).toBeDefined();
      expect(TEMPORAL_CONTEXTS.ABSOLUTE).toBe('absolute');
      expect(TEMPORAL_CONTEXTS.INHERITED).toBe('inherited');
    });

    it('should export TEMPORAL_MARKERS', () => {
      expect(TEMPORAL_MARKERS).toBeDefined();
      expect(TEMPORAL_MARKERS.devanagari).toBeDefined();
      expect(TEMPORAL_MARKERS.iast).toBeDefined();
    });

    it('should export GRAMMATICAL_SEQUENCES', () => {
      expect(GRAMMATICAL_SEQUENCES).toBeDefined();
      expect(GRAMMATICAL_SEQUENCES.sandhiSequences).toBeDefined();
      expect(GRAMMATICAL_SEQUENCES.morphologicalSequences).toBeDefined();
    });
  });
});
