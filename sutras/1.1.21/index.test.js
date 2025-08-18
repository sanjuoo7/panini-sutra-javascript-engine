/**
 * Test cases for Sutra 1.1.21: आद्यन्तवदेकस्मिन्
 * Testing the paribhāṣā for single-letter operations
 */

import { 
  isSingleLetterOperation,
  applyAdyantavat,
  shouldApplyToSinglePhoneme,
  getSingleLetterExamples,
  isParibhashaApplicable,
  analyzeAdyantavat
} from './index.js';

describe('Sutra 1.1.21: आद्यन्तवदेकस्मिन्', () => {
  describe('isSingleLetterOperation', () => {
    it('should identify single letters as eligible for operation', () => {
      expect(isSingleLetterOperation('a')).toBe(true);
      expect(isSingleLetterOperation('k')).toBe(true);
      expect(isSingleLetterOperation('अ')).toBe(true);
      expect(isSingleLetterOperation('क्')).toBe(true);
    });

    it('should handle positional operations on multi-character strings', () => {
      const initialContext = { operationType: 'substitution', position: 'initial' };
      const finalContext = { operationType: 'substitution', position: 'final' };
      
      expect(isSingleLetterOperation('rama', initialContext)).toBe(true);
      expect(isSingleLetterOperation('rama', finalContext)).toBe(true);
    });

    it('should reject non-positional multi-character operations', () => {
      const context = { operationType: 'substitution' };
      
      expect(isSingleLetterOperation('rama', context)).toBe(false);
      expect(isSingleLetterOperation('gacchati', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isSingleLetterOperation('')).toBe(false);
      expect(isSingleLetterOperation(null)).toBe(false);
    });
  });

  describe('applyAdyantavat', () => {
    it('should apply ādi-anta logic to single letters', () => {
      const context = { operationType: 'vowel-change', targetPosition: 'initial' };
      const result = applyAdyantavat('a', context);
      
      expect(result.applied).toBe(true);
      expect(result.result).toBe('a');
      expect(result.treatAs).toBe('initial');
      expect(result.reason).toContain('ādyantavat');
    });

    it('should treat single letters as both initial and final by default', () => {
      const result = applyAdyantavat('i');
      
      expect(result.applied).toBe(true);
      expect(result.treatAs).toBe('both_initial_and_final');
    });

    it('should reject multi-character inputs', () => {
      const result = applyAdyantavat('rama');
      
      expect(result.applied).toBe(false);
      expect(result.reason).toContain('Not a single letter');
    });

    it('should handle Devanagari single letters', () => {
      const result = applyAdyantavat('अ');
      
      expect(result.applied).toBe(true);
      expect(result.result).toBe('अ');
    });

    it('should handle edge cases', () => {
      expect(applyAdyantavat('').applied).toBe(false);
      expect(applyAdyantavat(null).applied).toBe(false);
    });
  });

  describe('shouldApplyToSinglePhoneme', () => {
    it('should approve rules for single phonemes with positional scope', () => {
      const context = { ruleScope: 'initial' };
      
      expect(shouldApplyToSinglePhoneme('a', 'vowel-lengthening', context)).toBe(true);
      expect(shouldApplyToSinglePhoneme('k', 'consonant-change', { ruleScope: 'final' })).toBe(true);
      expect(shouldApplyToSinglePhoneme('त्', 'visarga-rule', { ruleScope: 'positional' })).toBe(true);
    });

    it('should reject rules without appropriate scope', () => {
      const context = { ruleScope: 'middle' };
      
      expect(shouldApplyToSinglePhoneme('a', 'some-rule', context)).toBe(false);
      expect(shouldApplyToSinglePhoneme('k', 'other-rule', {})).toBe(false);
    });

    it('should reject multi-character phonemes', () => {
      const context = { ruleScope: 'initial' };
      
      expect(shouldApplyToSinglePhoneme('rama', 'some-rule', context)).toBe(false);
      expect(shouldApplyToSinglePhoneme('गच्छति', 'some-rule', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(shouldApplyToSinglePhoneme('', 'rule', { ruleScope: 'initial' })).toBe(false);
      expect(shouldApplyToSinglePhoneme('a', '', { ruleScope: 'initial' })).toBe(false);
      expect(shouldApplyToSinglePhoneme('a', 'rule', null)).toBe(false);
    });
  });

  describe('getSingleLetterExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getSingleLetterExamples();
      
      expect(examples).toContain('a');
      expect(examples).toContain('i');
      expect(examples).toContain('u');
      expect(examples).toContain('k');
      expect(examples).toContain('t');
      expect(examples).toContain('p');
    });

    it('should return IAST examples when explicitly requested', () => {
      const examples = getSingleLetterExamples('IAST');
      
      expect(examples).toContain('a');
      expect(examples).toContain('k');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getSingleLetterExamples('Devanagari');
      
      expect(examples).toContain('अ');
      expect(examples).toContain('इ');
      expect(examples).toContain('उ');
      expect(examples).toContain('क्');
      expect(examples).toContain('त्');
      expect(examples).toContain('प्');
    });

    it('should return arrays of appropriate length', () => {
      const iastExamples = getSingleLetterExamples('IAST');
      const devanagariExamples = getSingleLetterExamples('Devanagari');
      
      expect(iastExamples.length).toBeGreaterThan(0);
      expect(devanagariExamples.length).toEqual(iastExamples.length);
    });
  });

  describe('isParibhashaApplicable', () => {
    it('should be applicable for single-letter inputs', () => {
      expect(isParibhashaApplicable('a')).toBe(true);
      expect(isParibhashaApplicable('क्')).toBe(true);
    });

    it('should be applicable for phoneme-level operations', () => {
      const context = { targetType: 'phoneme' };
      
      expect(isParibhashaApplicable('rama', context)).toBe(true);
      expect(isParibhashaApplicable('गच्छति', context)).toBe(true);
    });

    it('should be applicable for positional operations', () => {
      const positionalContext = { operationScope: 'positional' };
      const singleLetterContext = { operationScope: 'single-letter' };
      
      expect(isParibhashaApplicable('word', positionalContext)).toBe(true);
      expect(isParibhashaApplicable('letter', singleLetterContext)).toBe(true);
    });

    it('should not be applicable for other operation types', () => {
      const context = { targetType: 'word', operationScope: 'global' };
      
      expect(isParibhashaApplicable('sentence', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isParibhashaApplicable('')).toBe(false);
      expect(isParibhashaApplicable(null)).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should guide vowel operations on single letters', () => {
      // Single vowel gets ādi-anta treatment
      const result = applyAdyantavat('a', { operationType: 'guṇa', targetPosition: 'initial' });
      
      expect(result.applied).toBe(true);
      expect(result.treatAs).toBe('initial');
    });

    it('should guide consonant operations', () => {
      // Single consonant operations
      expect(shouldApplyToSinglePhoneme('k', 'aspiration', { ruleScope: 'positional' })).toBe(true);
      expect(shouldApplyToSinglePhoneme('त्', 'visarga-change', { ruleScope: 'final' })).toBe(true);
    });

    it('should apply to sandhi contexts', () => {
      // In sandhi, single letters at boundaries get special treatment
      const context = { operationType: 'sandhi', position: 'final' };
      
      expect(isSingleLetterOperation('रामः', context)).toBe(true); // final position
    });

    it('should work with affix operations', () => {
      // Affixes often involve single-letter operations
      const context = { targetType: 'phoneme', operationScope: 'single-letter' };
      
      expect(isParibhashaApplicable('स्', context)).toBe(true);
      expect(isParibhashaApplicable('त्', context)).toBe(true);
    });

    it('should guide morphological analysis', () => {
      // Single phonemes in morphological contexts
      expect(shouldApplyToSinglePhoneme('अ', 'vowel-gradation', { ruleScope: 'initial' })).toBe(true);
      expect(shouldApplyToSinglePhoneme('इ', 'vowel-change', { ruleScope: 'final' })).toBe(true);
    });
  });

  describe('analyzeAdyantavat (Comprehensive Analysis)', () => {
    describe('Valid Single-Letter Inputs', () => {
      it('should analyze single vowel correctly', () => {
        const result = analyzeAdyantavat('a');
        
        expect(result.isValid).toBe(true);
        expect(result.applies).toBe(true);
        expect(result.input).toBe('a');
        expect(result.normalizedInput).toBe('a');
        expect(result.analysis).toBeDefined();
        expect(result.analysis.morphological.inputType).toBe('single-letter');
        expect(result.analysis.morphological.isPhoneme).toBe(true);
        expect(result.analysis.semantic.paribhashaType).toBe('operational-guidance');
        expect(result.analysis.syntactic.ruleType).toBe('paribhāṣā');
        expect(result.confidence).toBeGreaterThan(0.9);
        expect(result.metadata.sutraNumber).toBe('1.1.21');
      });

      it('should analyze single consonant correctly', () => {
        const result = analyzeAdyantavat('k');
        
        expect(result.isValid).toBe(true);
        expect(result.applies).toBe(true);
        expect(result.analysis.morphological.inputType).toBe('single-letter');
        expect(result.analysis.semantic.domain).toBe('single-letter-operations');
        expect(result.confidence).toBeGreaterThan(0.9);
      });

      it('should analyze Devanagari single letters correctly', () => {
        const result = analyzeAdyantavat('अ');
        
        expect(result.isValid).toBe(true);
        expect(result.applies).toBe(true);
        expect(result.analysis.morphological.script).toBe('Devanagari');
        expect(result.analysis.morphological.isPhoneme).toBe(true);
      });

      it('should handle consonant with halanta correctly', () => {
        const result = analyzeAdyantavat('क्');
        
        expect(result.isValid).toBe(true);
        expect(result.applies).toBe(true);
        expect(result.analysis.morphological.isPhoneme).toBe(true);
      });

      it('should provide traditional commentary references', () => {
        const result = analyzeAdyantavat('a');
        
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
        expect(result.metadata.traditionalExplanation).toContain('एकस्मिन् वर्णे आद्यन्तवत्');
        expect(result.metadata.modernExplanation).toContain('paribhāṣā establishes');
      });
    });

    describe('Context-Aware Analysis', () => {
      it('should analyze with initial position context', () => {
        const result = analyzeAdyantavat('a', { position: 'initial', operationType: 'vowel-change' });
        
        expect(result.applies).toBe(true);
        expect(result.analysis.syntactic.treatmentMode).toBe('treat-as-initial');
        expect(result.analysis.syntactic.applicableOperations).toContain('vowel-change');
        expect(result.analysis.syntactic.applicableOperations).toContain('initial-position-operations');
      });

      it('should analyze with final position context', () => {
        const result = analyzeAdyantavat('k', { position: 'final', operationType: 'consonant-change' });
        
        expect(result.applies).toBe(true);
        expect(result.analysis.syntactic.treatmentMode).toBe('treat-as-final');
        expect(result.analysis.syntactic.applicableOperations).toContain('final-position-operations');
      });

      it('should analyze with phoneme-level context', () => {
        const result = analyzeAdyantavat('राम', { targetType: 'phoneme' });
        
        expect(result.applies).toBe(true);
        expect(result.analysis.morphological.inputType).toBe('multi-character');
        expect(result.analysis.syntactic.applicableOperations).toContain('phoneme-level-operations');
      });

      it('should provide enhanced analysis with usage examples', () => {
        const result = analyzeAdyantavat('a', { 
          includeUsageExamples: true,
          includeRelatedRules: true 
        });
        
        expect(result.applies).toBe(true);
        expect(result.metadata.usageExamples).toBeDefined();
        expect(result.metadata.relatedRules).toBeDefined();
        expect(result.metadata.relatedRules.length).toBeGreaterThan(0);
      });
    });

    describe('Non-Applicable Cases', () => {
      it('should handle multi-character input without context', () => {
        const result = analyzeAdyantavat('rama');
        
        expect(result.isValid).toBe(true);
        expect(result.applies).toBe(false);
        expect(result.analysis.morphological.inputType).toBe('non-applicable');
        expect(result.analysis.semantic.paribhashaType).toBe('not-applicable');
        expect(result.confidence).toBeLessThan(0.5);
      });

      it('should handle invalid Sanskrit input', () => {
        const result = analyzeAdyantavat('xyz');
        
        expect(result.isValid).toBe(false);
        expect(result.applies).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
        expect(result.confidence).toBe(0);
      });

      it('should handle empty or null input', () => {
        const result1 = analyzeAdyantavat('');
        const result2 = analyzeAdyantavat(null);
        const result3 = analyzeAdyantavat(undefined);
        
        [result1, result2, result3].forEach(result => {
          expect(result.isValid).toBe(false);
          expect(result.applies).toBe(false);
          expect(result.errors).toContain('Input is required');
          expect(result.confidence).toBe(0);
        });
      });
    });

    describe('Treatment Mode Analysis', () => {
      it('should default to both-initial-and-final for single letters', () => {
        const result = analyzeAdyantavat('i');
        
        expect(result.analysis.syntactic.treatmentMode).toBe('treat-as-both-initial-and-final');
      });

      it('should respect explicit position context', () => {
        const initialResult = analyzeAdyantavat('u', { targetPosition: 'initial' });
        const finalResult = analyzeAdyantavat('u', { targetPosition: 'final' });
        
        expect(initialResult.analysis.syntactic.treatmentMode).toBe('treat-as-initial');
        expect(finalResult.analysis.syntactic.treatmentMode).toBe('treat-as-final');
      });
    });

    describe('Script Handling', () => {
      it('should handle script variations consistently', () => {
        const resultIAST = analyzeAdyantavat('a');
        const resultDev = analyzeAdyantavat('अ');
        
        expect(resultIAST.applies).toBe(resultDev.applies);
        expect(resultIAST.analysis.semantic.domain).toBe(resultDev.analysis.semantic.domain);
        expect(resultIAST.confidence).toBe(resultDev.confidence);
      });
    });

    describe('Confidence Scoring', () => {
      it('should assign high confidence to applicable cases', () => {
        const result1 = analyzeAdyantavat('a');
        const result2 = analyzeAdyantavat('k', { position: 'initial' });
        
        expect(result1.confidence).toBeGreaterThan(0.9);
        expect(result2.confidence).toBeGreaterThan(0.9);
      });

      it('should assign low confidence to non-applicable cases', () => {
        const result = analyzeAdyantavat('rama');
        expect(result.confidence).toBeLessThan(0.5);
      });

      it('should assign zero confidence to invalid inputs', () => {
        const result = analyzeAdyantavat('invalid');
        expect(result.confidence).toBe(0);
      });
    });
  });
});
