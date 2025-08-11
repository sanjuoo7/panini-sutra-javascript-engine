import { 
  TEMPORAL_CONTEXTS,
  inheritsTemporalContext,
  analyzeTemporalInheritance,
  getTemporalScope,
  checkOperationSequence,
  hasExplicitTemporalMarkers,
  checkContextualRelationship,
  getTemporalInheritanceExamples
} from './index.js';

describe('Sutra 1.1.70: तपरस्तत्कालस्य', () => {
  describe('inheritsTemporalContext function', () => {
    describe('Sequential operation inheritance', () => {
      it('should inherit context for operations in grammatical sequence', () => {
        expect(inheritsTemporalContext('suffix-addition', 'stem-formation')).toBe(true);
        expect(inheritsTemporalContext('case-inflection', 'suffix-addition')).toBe(true);
        expect(inheritsTemporalContext('consonant-assimilation', 'vowel-coalescence')).toBe(true);
        expect(inheritsTemporalContext('accent-modification', 'syllable-restructuring')).toBe(true);
      });

      it('should inherit context when explicitly marked as in sequence', () => {
        expect(inheritsTemporalContext('operation2', 'operation1', { inSequence: true })).toBe(true);
        expect(inheritsTemporalContext('operation2', 'operation1', { followsPrevious: true })).toBe(true);
        expect(inheritsTemporalContext('operation2', 'operation1', { isContiguous: true })).toBe(true);
      });
    });

    describe('Contextual relationship inheritance', () => {
      it('should inherit context for operations on same element', () => {
        expect(inheritsTemporalContext('vowel-change', 'consonant-change', { sameElement: true })).toBe(true);
        expect(inheritsTemporalContext('accent-shift', 'vowel-lengthening', { sameWord: true })).toBe(true);
        expect(inheritsTemporalContext('suffix-mod', 'root-mod', { sameMorpheme: true })).toBe(true);
      });

      it('should inherit context for related grammatical operations', () => {
        expect(inheritsTemporalContext('rule2', 'rule1', { sameCategory: true })).toBe(true);
        expect(inheritsTemporalContext('rule2', 'rule1', { relatedRules: true })).toBe(true);
        expect(inheritsTemporalContext('rule2', 'rule1', { samePrakarana: true })).toBe(true);
      });

      it('should inherit context for sequential rule application', () => {
        expect(inheritsTemporalContext('rule2', 'rule1', { ruleSequence: true })).toBe(true);
        expect(inheritsTemporalContext('rule2', 'rule1', { followsImmediately: true })).toBe(true);
        expect(inheritsTemporalContext('rule2', 'rule1', { causedBy: true })).toBe(true);
      });
    });

    describe('Non-inheritance cases', () => {
      it('should not inherit context for unrelated operations', () => {
        expect(inheritsTemporalContext('unrelated-op', 'other-op')).toBe(false);
        expect(inheritsTemporalContext('independent-rule', 'other-rule')).toBe(false);
      });

      it('should not inherit context with explicit temporal markers', () => {
        expect(inheritsTemporalContext('तदा operation', 'previous-op')).toBe(false);
        expect(inheritsTemporalContext('तत्काले rule', 'previous-rule')).toBe(false);
        expect(inheritsTemporalContext('operation', 'previous', { explicitTiming: 'immediate' })).toBe(false);
        expect(inheritsTemporalContext('operation', 'previous', { independentTiming: true })).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(inheritsTemporalContext('', 'previous')).toBe(false);
        expect(inheritsTemporalContext('current', '')).toBe(false);
        expect(inheritsTemporalContext(null, 'previous')).toBe(false);
        expect(inheritsTemporalContext('current', undefined)).toBe(false);
        expect(inheritsTemporalContext(123, 'previous')).toBe(false);
        expect(inheritsTemporalContext('current', 456)).toBe(false);
      });
    });
  });

  describe('checkOperationSequence function', () => {
    describe('Sandhi sequences', () => {
      it('should identify sandhi operation sequences', () => {
        expect(checkOperationSequence('consonant-assimilation', 'vowel-coalescence')).toBe(true);
        expect(checkOperationSequence('visarga-modification', 'consonant-assimilation')).toBe(true);
        expect(checkOperationSequence('anusvara-conversion', 'visarga-modification')).toBe(true);
      });
    });

    describe('Morphological sequences', () => {
      it('should identify morphological operation sequences', () => {
        expect(checkOperationSequence('suffix-addition', 'stem-formation')).toBe(true);
        expect(checkOperationSequence('case-inflection', 'suffix-addition')).toBe(true);
        expect(checkOperationSequence('verbal-conjugation', 'case-inflection')).toBe(true);
      });
    });

    describe('Phonological sequences', () => {
      it('should identify phonological operation sequences', () => {
        expect(checkOperationSequence('consonant-gemination', 'vowel-strengthening')).toBe(true);
        expect(checkOperationSequence('accent-modification', 'consonant-gemination')).toBe(true);
        expect(checkOperationSequence('syllable-restructuring', 'accent-modification')).toBe(true);
      });
    });

    describe('Context-based sequences', () => {
      it('should recognize explicit sequence markers', () => {
        expect(checkOperationSequence('op2', 'op1', { inSequence: true })).toBe(true);
        expect(checkOperationSequence('op2', 'op1', { followsPrevious: true })).toBe(true);
        expect(checkOperationSequence('op2', 'op1', { isContiguous: true })).toBe(true);
      });
    });

    describe('Non-sequential cases', () => {
      it('should not identify non-adjacent operations as sequential', () => {
        expect(checkOperationSequence('case-inflection', 'stem-formation')).toBe(false);
        expect(checkOperationSequence('anusvara-conversion', 'vowel-coalescence')).toBe(false);
      });
    });
  });

  describe('hasExplicitTemporalMarkers function', () => {
    describe('Devanagari temporal markers', () => {
      it('should identify immediate temporal markers', () => {
        expect(hasExplicitTemporalMarkers('तदा operation')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्र modification')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्काले change')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्प्रसङ्गे rule')).toBe(true);
      });

      it('should identify subsequent temporal markers', () => {
        expect(hasExplicitTemporalMarkers('ततः operation')).toBe(true);
        expect(hasExplicitTemporalMarkers('तदनन्तरम् change')).toBe(true);
        expect(hasExplicitTemporalMarkers('तदुत्तरम् rule')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्पश्चात् modification')).toBe(true);
      });

      it('should identify concurrent temporal markers', () => {
        expect(hasExplicitTemporalMarkers('तत्समकालम् operation')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्समये change')).toBe(true);
        expect(hasExplicitTemporalMarkers('तदैव rule')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्सह modification')).toBe(true);
      });

      it('should identify conditional temporal markers', () => {
        expect(hasExplicitTemporalMarkers('तत्र चेत् operation')).toBe(true);
        expect(hasExplicitTemporalMarkers('तदा चेत् change')).toBe(true);
        expect(hasExplicitTemporalMarkers('तत्काले चेत् rule')).toBe(true);
        expect(hasExplicitTemporalMarkers('तस्मिन्काले modification')).toBe(true);
      });
    });

    describe('IAST temporal markers', () => {
      it('should identify IAST temporal markers', () => {
        expect(hasExplicitTemporalMarkers('tadā operation')).toBe(true);
        expect(hasExplicitTemporalMarkers('tatra modification')).toBe(true);
        expect(hasExplicitTemporalMarkers('tatkāle change')).toBe(true);
        expect(hasExplicitTemporalMarkers('tatprasaṅge rule')).toBe(true);
      });
    });

    describe('Context-based temporal markers', () => {
      it('should identify temporal markers in context description', () => {
        expect(hasExplicitTemporalMarkers('operation', { description: 'तदा applied' })).toBe(true);
        expect(hasExplicitTemporalMarkers('rule', { description: 'ततः follows' })).toBe(true);
      });

      it('should identify explicit timing context', () => {
        expect(hasExplicitTemporalMarkers('operation', { explicitTiming: 'immediate' })).toBe(true);
        expect(hasExplicitTemporalMarkers('rule', { independentTiming: true })).toBe(true);
        expect(hasExplicitTemporalMarkers('change', { overrideTiming: true })).toBe(true);
      });
    });

    describe('No temporal markers', () => {
      it('should return false for operations without temporal markers', () => {
        expect(hasExplicitTemporalMarkers('simple operation')).toBe(false);
        expect(hasExplicitTemporalMarkers('regular rule')).toBe(false);
        expect(hasExplicitTemporalMarkers('normal change')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(hasExplicitTemporalMarkers('')).toBe(false);
        expect(hasExplicitTemporalMarkers(null)).toBe(false);
        expect(hasExplicitTemporalMarkers(undefined)).toBe(false);
        expect(hasExplicitTemporalMarkers(123)).toBe(false);
      });
    });
  });

  describe('checkContextualRelationship function', () => {
    describe('Same element relationships', () => {
      it('should identify relationships for same linguistic element', () => {
        expect(checkContextualRelationship('op1', 'op2', { sameElement: true })).toBe(true);
        expect(checkContextualRelationship('op1', 'op2', { sameWord: true })).toBe(true);
        expect(checkContextualRelationship('op1', 'op2', { sameMorpheme: true })).toBe(true);
      });
    });

    describe('Same category relationships', () => {
      it('should identify relationships for same grammatical category', () => {
        expect(checkContextualRelationship('rule1', 'rule2', { sameCategory: true })).toBe(true);
        expect(checkContextualRelationship('rule1', 'rule2', { relatedRules: true })).toBe(true);
        expect(checkContextualRelationship('rule1', 'rule2', { samePrakarana: true })).toBe(true);
      });
    });

    describe('Sequential relationships', () => {
      it('should identify sequential rule relationships', () => {
        expect(checkContextualRelationship('rule2', 'rule1', { ruleSequence: true })).toBe(true);
        expect(checkContextualRelationship('rule2', 'rule1', { followsImmediately: true })).toBe(true);
        expect(checkContextualRelationship('rule2', 'rule1', { causedBy: true })).toBe(true);
      });
    });

    describe('No relationship', () => {
      it('should return false when no contextual relationship exists', () => {
        expect(checkContextualRelationship('unrelated1', 'unrelated2', {})).toBe(false);
        expect(checkContextualRelationship('op1', 'op2', { unrelatedContext: true })).toBe(false);
      });
    });
  });

  describe('analyzeTemporalInheritance function', () => {
    describe('Inheritance analysis', () => {
      it('should provide complete analysis for inheriting operations', () => {
        const result = analyzeTemporalInheritance('suffix-addition', 'stem-formation');
        expect(result.operation).toBe('suffix-addition');
        expect(result.previousOperation).toBe('stem-formation');
        expect(result.inheritsContext).toBe(true);
        expect(result.temporalScope).toBe(TEMPORAL_CONTEXTS.INHERITED);
        expect(result.inheritanceType).toBe('sequential');
        expect(result.reasoning).toContain('Operation inherits temporal context from predecessor');
        expect(result.reasoning).toContain('Follows principle: तपरस्तत्कालस्य (those after are of that time)');
        expect(result.contextualFactors).toContain('Operations are in recognized grammatical sequence');
        expect(result.sutraReference).toBe('1.1.70');
      });

      it('should analyze contextual inheritance', () => {
        const result = analyzeTemporalInheritance('operation2', 'operation1', { sameElement: true });
        expect(result.inheritsContext).toBe(true);
        expect(result.inheritanceType).toBe('contextual');
        expect(result.contextualFactors).toContain('Operations have contextual relationship');
        expect(result.contextualFactors).toContain('Operations apply to same linguistic element');
      });

      it('should analyze combined sequential-contextual inheritance', () => {
        const result = analyzeTemporalInheritance('suffix-addition', 'stem-formation', { sameWord: true });
        expect(result.inheritsContext).toBe(true);
        expect(result.inheritanceType).toBe('sequential-contextual');
        expect(result.contextualFactors).toContain('Operations are in recognized grammatical sequence');
        expect(result.contextualFactors).toContain('Operations have contextual relationship');
      });

      it('should analyze immediate following', () => {
        const result = analyzeTemporalInheritance('op2', 'op1', { followsImmediately: true });
        expect(result.inheritsContext).toBe(true);
        expect(result.contextualFactors).toContain('Operations follow immediately in sequence');
      });
    });

    describe('Non-inheritance analysis', () => {
      it('should analyze operations with explicit temporal markers', () => {
        const result = analyzeTemporalInheritance('तदा operation', 'previous-op');
        expect(result.inheritsContext).toBe(false);
        expect(result.temporalScope).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
        expect(result.reasoning).toContain('Operation has explicit temporal markers');
        expect(result.contextualFactors).toContain('Explicit temporal specification overrides inheritance');
      });

      it('should analyze independent operations', () => {
        const result = analyzeTemporalInheritance('independent-op', 'other-op');
        expect(result.inheritsContext).toBe(false);
        expect(result.reasoning).toContain('Operation does not inherit temporal context');
        expect(result.reasoning).toContain('Operation is temporally independent');
        expect(result.contextualFactors).toContain('No contextual relationship with predecessor');
      });
    });

    describe('Additional context analysis', () => {
      it('should include rule type information', () => {
        const result = analyzeTemporalInheritance('op1', 'op2', { ruleType: 'sandhi' });
        expect(result.contextualFactors).toContain('Rule type: sandhi');
      });

      it('should include linguistic level information', () => {
        const result = analyzeTemporalInheritance('op1', 'op2', { linguisticLevel: 'phonological' });
        expect(result.contextualFactors).toContain('Linguistic level: phonological');
      });
    });

    describe('Error handling', () => {
      it('should handle invalid operation input', () => {
        const result = analyzeTemporalInheritance('', 'valid-op');
        expect(result.inheritsContext).toBe(false);
        expect(result.reasoning).toContain('Invalid operation: must be a non-empty string');
      });

      it('should handle invalid previous operation input', () => {
        const result = analyzeTemporalInheritance('valid-op', '');
        expect(result.inheritsContext).toBe(false);
        expect(result.reasoning).toContain('Invalid previous operation: must be a non-empty string');
      });

      it('should handle null/undefined inputs', () => {
        const result1 = analyzeTemporalInheritance(null, 'op');
        expect(result1.inheritsContext).toBe(false);
        
        const result2 = analyzeTemporalInheritance('op', undefined);
        expect(result2.inheritsContext).toBe(false);
      });
    });
  });

  describe('getTemporalScope function', () => {
    describe('Explicit temporal scope', () => {
      it('should return immediate scope', () => {
        expect(getTemporalScope('तदा operation', { explicitTiming: 'immediate' })).toBe(TEMPORAL_CONTEXTS.IMMEDIATE);
      });

      it('should return extended scope', () => {
        expect(getTemporalScope('operation', { explicitTiming: 'extended' })).toBe(TEMPORAL_CONTEXTS.EXTENDED);
      });

      it('should return conditional scope', () => {
        expect(getTemporalScope('operation', { explicitTiming: 'conditional' })).toBe(TEMPORAL_CONTEXTS.CONDITIONAL);
      });

      it('should return absolute scope for explicit markers', () => {
        expect(getTemporalScope('तत्काले operation')).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
      });
    });

    describe('Inherited temporal scope', () => {
      it('should return inherited scope', () => {
        expect(getTemporalScope('operation', { inheritsFromPrevious: true })).toBe(TEMPORAL_CONTEXTS.INHERITED);
        expect(getTemporalScope('operation', { followsPrevious: true })).toBe(TEMPORAL_CONTEXTS.INHERITED);
      });
    });

    describe('Relative temporal scope', () => {
      it('should return relative scope', () => {
        expect(getTemporalScope('operation', { relativeToOther: true })).toBe(TEMPORAL_CONTEXTS.RELATIVE);
        expect(getTemporalScope('operation', { dependsOnContext: true })).toBe(TEMPORAL_CONTEXTS.RELATIVE);
      });
    });

    describe('Default scope', () => {
      it('should return absolute scope by default', () => {
        expect(getTemporalScope('simple operation')).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
        expect(getTemporalScope('regular rule', {})).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(getTemporalScope('')).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
        expect(getTemporalScope(null)).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
        expect(getTemporalScope(undefined)).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
        expect(getTemporalScope(123)).toBe(TEMPORAL_CONTEXTS.ABSOLUTE);
      });
    });
  });

  describe('getTemporalInheritanceExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getTemporalInheritanceExamples();
      
      expect(examples.principle).toBeDefined();
      expect(examples.sequentialOperations).toBeDefined();
      expect(examples.contextualInheritance).toBeDefined();
      expect(examples.traditionalNote).toBeDefined();
      
      expect(examples.sequentialOperations.examples).toHaveLength(3);
      expect(examples.contextualInheritance.examples).toHaveLength(2);
    });

    it('should include traditional sequential operation examples', () => {
      const examples = getTemporalInheritanceExamples();
      const sequentialExamples = examples.sequentialOperations.examples;
      
      const sequences = sequentialExamples.map(ex => ex.sequence);
      expect(sequences).toContainEqual(['vowel-coalescence', 'accent-shift']);
      expect(sequences).toContainEqual(['stem-formation', 'suffix-addition']);
      expect(sequences).toContainEqual(['consonant-assimilation', 'vowel-modification']);
      
      sequentialExamples.forEach(ex => {
        expect(ex.inheritance).toContain('inherit');
        expect(ex.result).toBeDefined();
      });
    });

    it('should include traditional contextual inheritance examples', () => {
      const examples = getTemporalInheritanceExamples();
      const contextualExamples = examples.contextualInheritance.examples;
      
      contextualExamples.forEach(ex => {
        expect(ex.operation).toBeDefined();
        expect(ex.predecessor).toBeDefined();
        expect(ex.context).toBeDefined();
        expect(ex.reasoning).toContain('तपरस्तत्कालस्य');
      });
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const testCases = [
        { 
          current: 'suffix-addition', 
          previous: 'stem-formation', 
          context: {},
          expectedInheritance: true 
        },
        { 
          current: 'तदा operation', 
          previous: 'previous-op', 
          context: {},
          expectedInheritance: false 
        },
        { 
          current: 'operation2', 
          previous: 'operation1', 
          context: { sameElement: true },
          expectedInheritance: true 
        },
        { 
          current: 'independent-op', 
          previous: 'other-op', 
          context: {},
          expectedInheritance: false 
        }
      ];

      testCases.forEach(testCase => {
        const { current, previous, context, expectedInheritance } = testCase;
        
        const inherits = inheritsTemporalContext(current, previous, context);
        const analysis = analyzeTemporalInheritance(current, previous, context);
        const scope = getTemporalScope(current, context);
        
        expect(inherits).toBe(expectedInheritance);
        expect(analysis.inheritsContext).toBe(expectedInheritance);
        
        if (expectedInheritance) {
          expect(analysis.temporalScope).toBe(TEMPORAL_CONTEXTS.INHERITED);
        } else {
          expect(analysis.temporalScope).not.toBe(TEMPORAL_CONTEXTS.INHERITED);
        }
      });
    });

    it('should handle script detection consistently', () => {
      const devanagariOp = 'तत्काले operation';
      const iastOp = 'tatkāle operation';
      
      const devResult = analyzeTemporalInheritance(devanagariOp, 'previous');
      const iastResult = analyzeTemporalInheritance(iastOp, 'previous');
      
      expect(devResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
      expect(devResult.inheritsContext).toBe(iastResult.inheritsContext);
    });
  });
});
