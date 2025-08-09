/**
 * Test cases for Sutra 1.1.21: आद्यन्तवदेकस्मिन्
 * Testing the paribhāṣā for single-letter operations
 */

import { 
  isSingleLetterOperation,
  applyAdyantavat,
  shouldApplyToSinglePhoneme,
  getSingleLetterExamples,
  isParibhashaApplicable
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
});
