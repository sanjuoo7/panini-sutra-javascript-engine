/**
 * Comprehensive test suite for Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)
 *
 * Tests cover:
 * 1. Basic functionality and definition
 * 2. Comprehensive lopa analysis with morphological, phonetic, and grammatical aspects
 * 3. Script detection and validation
 * 4. Traditional commentary integration
 * 5. Edge cases and error handling
 */

import { getLopaDefinition, isLopa, analyzeLopa } from './index.js';

describe('Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)', () => {
  describe('getLopaDefinition()', () => {
    it('should return the correct definition of lopa', () => {
      const definition = getLopaDefinition();
      expect(definition).toBe("Lopa (elision) signifies disappearance or non-perception (adarśana).");
    });
  });

  describe('isLopa()', () => {
    // Positive cases: elements that represent lopa
    it('should return true for null (absolute disappearance)', () => {
      expect(isLopa(null)).toBe(true);
    });

    it('should return true for undefined (absolute disappearance)', () => {
      expect(isLopa(undefined)).toBe(true);
    });

    it('should return true for empty string (zero realization)', () => {
      expect(isLopa("")).toBe(true);
    });

    // Negative cases: elements that do not represent lopa
    it('should return false for non-empty string', () => {
      expect(isLopa("अ")).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(isLopa(0)).toBe(false);
      expect(isLopa(1)).toBe(false);
    });

    it('should return false for boolean values', () => {
      expect(isLopa(true)).toBe(false);
      expect(isLopa(false)).toBe(false);
    });

    it('should return false for objects and arrays', () => {
      expect(isLopa({})).toBe(false);
      expect(isLopa([])).toBe(false);
    });
  });

  describe('analyzeLopa() - Core Functionality', () => {
    it('should analyze null as absolute lopa', () => {
      const result = analyzeLopa(null);
      expect(result.isValid).not.toBe(false);
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('absolute_absence');
      expect(result.lopaAnalysis.adarshanaCharacteristics).toContain('complete_non_perception');
    });

    it('should analyze undefined as absolute lopa', () => {
      const result = analyzeLopa(undefined);
      expect(result.isValid).not.toBe(false);
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('absolute_absence');
    });

    it('should analyze empty string as absolute lopa', () => {
      const result = analyzeLopa('');
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('absolute_absence');
    });

    it('should provide sutra reference', () => {
      const result = analyzeLopa(null);
      expect(result.sutra).toBe('1.1.60');
      expect(result.rule).toBe('अदर्शनं लोपः (adarśanaṃ lopaḥ)');
    });
  });

  describe('analyzeLopa() - Lopa Type Classification', () => {
    it('should detect explicit lopa notation', () => {
      const result = analyzeLopa('∅');
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('explicit_notation');
      expect(result.lopaAnalysis.adarshanaCharacteristics).toContain('marked_deletion');
    });

    it('should detect lopa affixes in Sanskrit text', () => {
      const result = analyzeLopa('लुक्');
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('affix_elision');
      expect(result.lopaAnalysis.adarshanaCharacteristics).toContain('grammatical_deletion');
    });

    it('should detect श्लु affix', () => {
      const result = analyzeLopa('श्लु');
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('affix_elision');
    });

    it('should detect लुप् affix', () => {
      const result = analyzeLopa('लुप्');
      expect(result.lopaAnalysis.isLopa).toBe(true);
      expect(result.lopaAnalysis.lopaType).toBe('affix_elision');
    });

    it('should not detect lopa in regular Sanskrit words', () => {
      const result = analyzeLopa('घटः');
      expect(result.lopaAnalysis.isLopa).toBe(false);
      expect(result.lopaAnalysis.lopaType).toBe(null);
    });
  });

  describe('analyzeLopa() - Morphological Analysis', () => {
    it('should classify element types correctly', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.morphologicalAnalysis.elementType).toBe('absent_element');

      const singleCharResult = analyzeLopa('अ');
      expect(singleCharResult.morphologicalAnalysis.elementType).toBe('phoneme');

      const wordResult = analyzeLopa('घटः');
      expect(wordResult.morphologicalAnalysis.elementType).toBe('morpheme_or_word');
    });

    it('should analyze deletion context', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.morphologicalAnalysis.deletionContext).toBe('complete_deletion');

      const wordResult = analyzeLopa('घटः');
      expect(wordResult.morphologicalAnalysis.deletionContext).toBe('partial_or_conditional');
    });

    it('should analyze phoneme status', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.morphologicalAnalysis.phonemeStatus).toBe('deleted');

      const wordResult = analyzeLopa('घटः');
      expect(wordResult.morphologicalAnalysis.phonemeStatus).toBe('present');
    });
  });

  describe('analyzeLopa() - Phonetic Analysis', () => {
    it('should analyze perceptibility correctly', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.phoneticAnalysis.perceptibility).toBe('non_perceptible');

      const wordResult = analyzeLopa('अ');
      expect(wordResult.phoneticAnalysis.perceptibility).toBe('perceptible');
    });

    it('should analyze phonetic realization', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.phoneticAnalysis.phoneticRealization).toBe('zero_realization');

      const wordResult = analyzeLopa('अ');
      expect(wordResult.phoneticAnalysis.phoneticRealization).toBe('full_realization');
    });

    it('should analyze sandhi context', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.phoneticAnalysis.sandhi_context).toBe('sandhi_deletion');

      const wordResult = analyzeLopa('अ');
      expect(wordResult.phoneticAnalysis.sandhi_context).toBe('sandhi_preservation');
    });
  });

  describe('analyzeLopa() - Grammatical Analysis', () => {
    it('should analyze grammatical role', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.grammaticalAnalysis.grammaticalRole).toBe('no_grammatical_role');

      const wordResult = analyzeLopa('घटः');
      expect(nullResult.grammaticalAnalysis.functionalStatus).toBe('non_functional');
    });

    it('should analyze functional status', () => {
      const wordResult = analyzeLopa('घटः');
      expect(wordResult.grammaticalAnalysis.functionalStatus).toBe('functional');
    });

    it('should analyze derivational context', () => {
      const nullResult = analyzeLopa(null);
      expect(nullResult.grammaticalAnalysis.derivationalContext).toBe('derivational_absence');

      const wordResult = analyzeLopa('घटः');
      expect(wordResult.grammaticalAnalysis.derivationalContext).toBe('derivational_presence');
    });
  });

  describe('analyzeLopa() - Script Detection', () => {
    it('should detect Devanagari script', () => {
      const result = analyzeLopa('अदर्शन');
      expect(result.script).toBe('devanagari');
    });

    it('should detect IAST script', () => {
      const result = analyzeLopa('adarśana');
      expect(result.script).toBe('iast');
    });

    it('should handle mixed or unknown scripts', () => {
      const result = analyzeLopa('test123');
      expect(result.script).toBeDefined();
    });
  });

  describe('analyzeLopa() - Traditional Commentary', () => {
    it('should include Kashika commentary', () => {
      const result = analyzeLopa(null);
      expect(result.traditionalCommentary.kashika).toContain('अदर्शनं लोपः');
    });

    it('should include Mahabhashya commentary', () => {
      const result = analyzeLopa(null);
      expect(result.traditionalCommentary.mahabhashya).toContain('अदर्शनमिति लोपस्य संज्ञा');
    });

    it('should include English explanation', () => {
      const result = analyzeLopa(null);
      expect(result.traditionalCommentary.english).toContain('lopa');
      expect(result.traditionalCommentary.english).toContain('non-perception');
    });
  });

  describe('analyzeLopa() - Confidence Scoring', () => {
    it('should assign high confidence to clear lopa cases', () => {
      const result = analyzeLopa(null);
      expect(result.confidence).toBeGreaterThan(80);
    });

    it('should assign high confidence to explicit lopa notation', () => {
      const result = analyzeLopa('∅');
      expect(result.confidence).toBeGreaterThanOrEqual(60);
    });

    it('should assign low confidence to non-lopa cases', () => {
      const result = analyzeLopa('घटः');
      expect(result.confidence).toBeLessThan(20);
    });

    it('should cap confidence at 100', () => {
      const result = analyzeLopa('');
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('analyzeLopa() - Input Validation', () => {
    it('should handle various input types gracefully', () => {
      expect(() => analyzeLopa(0)).not.toThrow();
      expect(() => analyzeLopa(false)).not.toThrow();
      expect(() => analyzeLopa({})).not.toThrow();
      expect(() => analyzeLopa([])).not.toThrow();
    });

    it('should sanitize input properly', () => {
      const result = analyzeLopa('  अदर्शन  ');
      expect(typeof result.input).toBe('string');
      expect(result.input).not.toMatch(/^\s|\s$/);
    });

    it('should maintain input reference', () => {
      const input = 'test';
      const result = analyzeLopa(input);
      expect(result.input).toBeDefined();
    });
  });

  describe('analyzeLopa() - Context Analysis', () => {
    it('should provide affix elision context for luk/ślu/lup', () => {
      const result = analyzeLopa('लुक्');
      expect(result.lopaAnalysis.context).toBeDefined();
      expect(result.lopaAnalysis.context.types).toContain('luk');
    });

    it('should include examples in context', () => {
      const result = analyzeLopa('लुक्');
      expect(result.lopaAnalysis.context.examples).toBeDefined();
      expect(Array.isArray(result.lopaAnalysis.context.examples)).toBe(true);
    });
  });
});
