/**
 * Tests for Temporal Analysis Utilities
 * 
 * Tests the utilities for analyzing temporal inheritance and contextual scope
 * in grammatical operations. Based on Sutra 1.1.70: तपरस्तत्कालस्य
 */

import {
  VIDHI_TYPES,
  TEMPORAL_CONTEXTS,
  TEMPORAL_MARKERS,
  GRAMMATICAL_SEQUENCES,
  TEMPORAL_CONFIDENCE_LEVELS,
  inheritsTemporalContext,
  checkOperationSequence,
  hasExplicitTemporalMarkers,
  checkContextualRelationship,
  analyzeTemporalInheritance,
  getTemporalScope,
  getTemporalInheritanceExamples
} from './temporal-analysis.js';

describe('Temporal Analysis Utilities', () => {
  describe('Constants', () => {
    test('VIDHI_TYPES should have expected rule types', () => {
      expect(VIDHI_TYPES.SUFFIX_RULE).toBe('suffix-rule');
      expect(VIDHI_TYPES.PHONETIC_RULE).toBe('phonetic-rule');
      expect(VIDHI_TYPES.MORPHOLOGICAL_RULE).toBe('morphological-rule');
      expect(VIDHI_TYPES.SANDHI_RULE).toBe('sandhi-rule');
    });

    test('TEMPORAL_CONTEXTS should have expected context types', () => {
      expect(TEMPORAL_CONTEXTS.INHERITED).toBe('inherited');
      expect(TEMPORAL_CONTEXTS.IMMEDIATE).toBe('immediate');
      expect(TEMPORAL_CONTEXTS.INDEPENDENT).toBe('independent');
      expect(TEMPORAL_CONTEXTS.CONDITIONAL).toBe('conditional');
    });

    test('TEMPORAL_MARKERS should have both scripts', () => {
      expect(TEMPORAL_MARKERS.devanagari).toBeDefined();
      expect(TEMPORAL_MARKERS.iast).toBeDefined();
      expect(TEMPORAL_MARKERS.devanagari.immediate).toContain('तदा');
      expect(TEMPORAL_MARKERS.iast.immediate).toContain('tadā');
    });

    test('GRAMMATICAL_SEQUENCES should have sequence types', () => {
      expect(GRAMMATICAL_SEQUENCES.sandhiSequences).toContain('vowel-coalescence');
      expect(GRAMMATICAL_SEQUENCES.morphologicalSequences).toContain('stem-formation');
      expect(GRAMMATICAL_SEQUENCES.phonologicalSequences).toContain('vowel-strengthening');
    });

    test('TEMPORAL_CONFIDENCE_LEVELS should have numeric values', () => {
      expect(TEMPORAL_CONFIDENCE_LEVELS.CERTAIN).toBe(1.0);
      expect(TEMPORAL_CONFIDENCE_LEVELS.VERY_HIGH).toBe(0.95);
      expect(TEMPORAL_CONFIDENCE_LEVELS.HIGH).toBe(0.9);
      expect(TEMPORAL_CONFIDENCE_LEVELS.LOW).toBe(0.5);
    });
  });

  describe('inheritsTemporalContext', () => {
    test('should return true for sequential operations', () => {
      const current = 'vowel-coalescence';
      const previous = 'consonant-assimilation';
      const context = { inSequence: true };
      
      expect(inheritsTemporalContext(current, previous, context)).toBe(true);
    });

    test('should return true for contextually related operations', () => {
      const current = 'suffix-addition';
      const previous = 'stem-formation';
      const context = { sameWord: true };
      
      expect(inheritsTemporalContext(current, previous, context)).toBe(true);
    });

    test('should return false when explicit temporal markers present', () => {
      const current = 'accent-modification तदा';
      const previous = 'vowel-strengthening';
      const context = { sameWord: true };
      
      expect(inheritsTemporalContext(current, previous, context)).toBe(false);
    });

    test('should return false for unrelated operations', () => {
      const current = 'independent-rule';
      const previous = 'unrelated-operation';
      const context = {};
      
      expect(inheritsTemporalContext(current, previous, context)).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(inheritsTemporalContext('', 'previous', {})).toBe(false);
      expect(inheritsTemporalContext('current', '', {})).toBe(false);
      expect(inheritsTemporalContext(null, 'previous', {})).toBe(false);
      expect(inheritsTemporalContext('current', undefined, {})).toBe(false);
    });
  });

  describe('checkOperationSequence', () => {
    test('should detect adjacent sandhi operations', () => {
      const current = 'consonant-assimilation';
      const previous = 'vowel-coalescence';
      
      expect(checkOperationSequence(current, previous, {})).toBe(true);
    });

    test('should detect adjacent morphological operations', () => {
      const current = 'suffix-addition';
      const previous = 'stem-formation';
      
      expect(checkOperationSequence(current, previous, {})).toBe(true);
    });

    test('should detect explicit sequence context', () => {
      const current = 'operation1';
      const previous = 'operation2';
      const context = { inSequence: true };
      
      expect(checkOperationSequence(current, previous, context)).toBe(true);
    });

    test('should detect contiguous operations', () => {
      const current = 'operation1';
      const previous = 'operation2';
      const context = { isContiguous: true };
      
      expect(checkOperationSequence(current, previous, context)).toBe(true);
    });

    test('should return false for non-adjacent operations', () => {
      const current = 'vowel-coalescence';
      const previous = 'suffix-addition'; // Different sequence type
      
      expect(checkOperationSequence(current, previous, {})).toBe(false);
    });

    test('should return false for distant operations in same sequence', () => {
      const current = 'anusvara-conversion';
      const previous = 'vowel-coalescence'; // Same sequence but not adjacent
      
      expect(checkOperationSequence(current, previous, {})).toBe(false);
    });
  });

  describe('hasExplicitTemporalMarkers', () => {
    test('should detect Devanagari temporal markers', () => {
      expect(hasExplicitTemporalMarkers('operation तदा', {})).toBe(true);
      expect(hasExplicitTemporalMarkers('ततः operation', {})).toBe(true);
      expect(hasExplicitTemporalMarkers('तत्समकालम् operation', {})).toBe(true);
      expect(hasExplicitTemporalMarkers('operation तत्र चेत्', {})).toBe(true);
    });

    test('should detect IAST temporal markers', () => {
      expect(hasExplicitTemporalMarkers('operation tadā', {})).toBe(true);
      expect(hasExplicitTemporalMarkers('tataḥ operation', {})).toBe(true);
      expect(hasExplicitTemporalMarkers('tadaiva operation', {})).toBe(true);
      expect(hasExplicitTemporalMarkers('operation tatra cet', {})).toBe(true);
    });

    test('should detect markers in context description', () => {
      const context = { description: 'This operation happens तदा' };
      expect(hasExplicitTemporalMarkers('operation', context)).toBe(true);
    });

    test('should detect explicit timing context flags', () => {
      expect(hasExplicitTemporalMarkers('operation', { explicitTiming: true })).toBe(true);
      expect(hasExplicitTemporalMarkers('operation', { independentTiming: true })).toBe(true);
      expect(hasExplicitTemporalMarkers('operation', { overrideTiming: true })).toBe(true);
    });

    test('should return false for operations without markers', () => {
      expect(hasExplicitTemporalMarkers('simple-operation', {})).toBe(false);
      expect(hasExplicitTemporalMarkers('vowel-coalescence', {})).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(hasExplicitTemporalMarkers('', {})).toBe(false);
      expect(hasExplicitTemporalMarkers(null, {})).toBe(false);
      expect(hasExplicitTemporalMarkers(undefined, {})).toBe(false);
    });
  });

  describe('checkContextualRelationship', () => {
    test('should detect same element relationships', () => {
      expect(checkContextualRelationship('op1', 'op2', { sameElement: true })).toBe(true);
      expect(checkContextualRelationship('op1', 'op2', { sameWord: true })).toBe(true);
      expect(checkContextualRelationship('op1', 'op2', { sameMorpheme: true })).toBe(true);
    });

    test('should detect same category relationships', () => {
      expect(checkContextualRelationship('op1', 'op2', { sameCategory: true })).toBe(true);
      expect(checkContextualRelationship('op1', 'op2', { relatedRules: true })).toBe(true);
      expect(checkContextualRelationship('op1', 'op2', { samePrakarana: true })).toBe(true);
    });

    test('should detect sequential relationships', () => {
      expect(checkContextualRelationship('op1', 'op2', { ruleSequence: true })).toBe(true);
      expect(checkContextualRelationship('op1', 'op2', { followsImmediately: true })).toBe(true);
      expect(checkContextualRelationship('op1', 'op2', { causedBy: true })).toBe(true);
    });

    test('should return false for no relationship', () => {
      expect(checkContextualRelationship('op1', 'op2', {})).toBe(false);
    });
  });

  describe('analyzeTemporalInheritance', () => {
    test('should provide complete analysis for sequence inheritance', () => {
      const current = 'consonant-assimilation';
      const previous = 'vowel-coalescence';
      const context = { inSequence: true };
      
      const result = analyzeTemporalInheritance(current, previous, context);
      
      expect(result.currentOperation).toBe(current);
      expect(result.previousOperation).toBe(previous);
      expect(result.inheritsContext).toBe(true);
      expect(result.temporalRelationship).toBe(TEMPORAL_CONTEXTS.IMMEDIATE);
      expect(result.confidence).toBe(TEMPORAL_CONFIDENCE_LEVELS.HIGH);
      expect(result.sequenceAnalysis.isInSequence).toBe(true);
      expect(result.sequenceAnalysis.sequenceType).toBe('sandhiSequences');
      expect(result.sutraReference).toBe('1.1.70');
    });

    test('should analyze explicit temporal marker override', () => {
      const current = 'operation तदा';
      const previous = 'previous-operation';
      const context = { sameWord: true };
      
      const result = analyzeTemporalInheritance(current, previous, context);
      
      expect(result.inheritsContext).toBe(false);
      expect(result.temporalRelationship).toBe(TEMPORAL_CONTEXTS.INDEPENDENT);
      expect(result.confidence).toBe(TEMPORAL_CONFIDENCE_LEVELS.CERTAIN);
      expect(result.markerAnalysis.hasExplicitMarkers).toBe(true);
      expect(result.markerAnalysis.markersFound).toContain('तदा');
      expect(result.markerAnalysis.markerType).toBe('immediate');
    });

    test('should analyze contextual relationship inheritance', () => {
      const current = 'suffix-addition';
      const previous = 'stem-formation';
      const context = { sameWord: true };
      
      const result = analyzeTemporalInheritance(current, previous, context);
      
      expect(result.inheritsContext).toBe(true);
      expect(result.temporalRelationship).toBe(TEMPORAL_CONTEXTS.INHERITED);
      expect(result.confidence).toBe(TEMPORAL_CONFIDENCE_LEVELS.VERY_HIGH);
      expect(result.contextualAnalysis.hasRelationship).toBe(true);
      expect(result.contextualAnalysis.relationshipType).toBe('same-element');
      expect(result.contextualAnalysis.relationshipStrength).toBe('strong');
    });

    test('should handle invalid inputs gracefully', () => {
      const result = analyzeTemporalInheritance('', 'previous', {});
      
      expect(result.inheritsContext).toBe(false);
      expect(result.confidence).toBe(TEMPORAL_CONFIDENCE_LEVELS.VERY_LOW);
      expect(result.reasoning).toContain('Invalid input: operations must be non-empty strings');
    });

    test('should provide detailed reasoning', () => {
      const current = 'vowel-strengthening';
      const previous = 'consonant-gemination';
      const context = { inSequence: true };
      
      const result = analyzeTemporalInheritance(current, previous, context);
      
      expect(result.reasoning).toBeDefined();
      expect(result.reasoning.length).toBeGreaterThan(0);
      expect(result.reasoning.some(reason => reason.includes('sequence'))).toBe(true);
    });
  });

  describe('getTemporalScope', () => {
    test('should return absolute for explicit markers', () => {
      expect(getTemporalScope('operation तदा', {})).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
      expect(getTemporalScope('operation', { explicitTiming: true })).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
    });

    test('should return inherited for inherited context', () => {
      expect(getTemporalScope('operation', { isInheritedContext: true })).toBe(TEMPORAL_CONTEXTS.INHERITED);
      expect(getTemporalScope('operation', { followsPrevious: true })).toBe(TEMPORAL_CONTEXTS.INHERITED);
    });

    test('should return immediate for immediate context', () => {
      expect(getTemporalScope('operation', { isImmediate: true })).toBe(TEMPORAL_CONTEXTS.IMMEDIATE);
      expect(getTemporalScope('operation', { isContiguous: true })).toBe(TEMPORAL_CONTEXTS.IMMEDIATE);
    });

    test('should return conditional for conditional context', () => {
      expect(getTemporalScope('operation', { isConditional: true })).toBe(TEMPORAL_CONTEXTS.CONDITIONAL);
    });

    test('should return independent by default', () => {
      expect(getTemporalScope('operation', {})).toBe(TEMPORAL_CONTEXTS.INDEPENDENT);
    });

    test('should handle invalid inputs', () => {
      expect(getTemporalScope('', {})).toBe(TEMPORAL_CONTEXTS.INDEPENDENT);
      expect(getTemporalScope(null, {})).toBe(TEMPORAL_CONTEXTS.INDEPENDENT);
    });
  });

  describe('getTemporalInheritanceExamples', () => {
    test('should provide comprehensive examples', () => {
      const examples = getTemporalInheritanceExamples();
      
      expect(examples.inheritance).toBeDefined();
      expect(examples.override).toBeDefined();
      
      expect(examples.inheritance.description).toContain('तपरस्तत्कालस्य');
      expect(examples.inheritance.examples).toHaveLength(2);
      expect(examples.override.examples).toHaveLength(2);
    });

    test('should include traditional sequence examples', () => {
      const examples = getTemporalInheritanceExamples();
      
      const inheritanceExample = examples.inheritance.examples[0];
      expect(inheritanceExample.sequence).toContain('vowel-coalescence');
      expect(inheritanceExample.inheritance).toBe(true);
      expect(inheritanceExample.reasoning).toContain('temporal scope');
    });

    test('should include override examples', () => {
      const examples = getTemporalInheritanceExamples();
      
      const overrideExample = examples.override.examples[0];
      expect(overrideExample.inheritance).toBe(false);
      expect(overrideExample.markers).toBeDefined();
      expect(overrideExample.reasoning).toContain('overrides');
    });
  });

  describe('Integration Tests', () => {
    test('should work consistently across all functions', () => {
      const current = 'suffix-addition';
      const previous = 'stem-formation';
      const context = { sameWord: true };
      
      const inherits = inheritsTemporalContext(current, previous, context);
      const hasRelationship = checkContextualRelationship(current, previous, context);
      const analysis = analyzeTemporalInheritance(current, previous, context);
      const scope = getTemporalScope(current, context);
      
      // All should agree on inheritance
      expect(inherits).toBe(true);
      expect(hasRelationship).toBe(true);
      expect(analysis.inheritsContext).toBe(true);
      expect(scope).toBe(TEMPORAL_CONTEXTS.INHERITED);
    });

    test('should handle complex temporal scenarios', () => {
      const current = 'accent-modification तदा';
      const previous = 'vowel-coalescence';
      const context = { 
        sameWord: true,
        description: 'Operation with explicit timing marker'
      };
      
      const inherits = inheritsTemporalContext(current, previous, context);
      const hasMarkers = hasExplicitTemporalMarkers(current, context);
      const analysis = analyzeTemporalInheritance(current, previous, context);
      
      // Should not inherit due to explicit markers
      expect(inherits).toBe(false);
      expect(hasMarkers).toBe(true);
      expect(analysis.inheritsContext).toBe(false);
      expect(analysis.markerAnalysis.hasExplicitMarkers).toBe(true);
    });

    test('should handle edge cases consistently', () => {
      const current = '';
      const previous = 'valid-operation';
      const context = { sameWord: true };
      
      const inherits = inheritsTemporalContext(current, previous, context);
      const analysis = analyzeTemporalInheritance(current, previous, context);
      
      expect(inherits).toBe(false);
      expect(analysis.inheritsContext).toBe(false);
      expect(analysis.confidence).toBe(TEMPORAL_CONFIDENCE_LEVELS.VERY_LOW);
    });
  });
});
