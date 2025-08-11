/**
 * Test Suite for Sutra 1.2.28: अचश्च (acaśaca)
 * 
 * Tests the interpretive rule that limits duration terminology 
 * (ह्रस्व, दीर्घ, प्लुत) to vowels only.
 */

import sutra1228, {
  canHaveDurationProperty,
  validateDurationClassification,
  analyzeDurationScope,
  validateGrammaticalRuleScope
} from './index.js';

describe('Sutra 1.2.28: अचश्च (acaśaca)', () => {
  
  describe('canHaveDurationProperty()', () => {
    test('should return true for vowels', () => {
      // IAST vowels
      expect(canHaveDurationProperty('a')).toBe(true);
      expect(canHaveDurationProperty('ā')).toBe(true);
      expect(canHaveDurationProperty('i')).toBe(true);
      expect(canHaveDurationProperty('ī')).toBe(true);
      expect(canHaveDurationProperty('u')).toBe(true);
      expect(canHaveDurationProperty('ū')).toBe(true);
      expect(canHaveDurationProperty('e')).toBe(true);
      expect(canHaveDurationProperty('o')).toBe(true);
      expect(canHaveDurationProperty('ai')).toBe(true);
      expect(canHaveDurationProperty('au')).toBe(true);
      
      // Devanagari vowels
      expect(canHaveDurationProperty('अ')).toBe(true);
      expect(canHaveDurationProperty('आ')).toBe(true);
      expect(canHaveDurationProperty('इ')).toBe(true);
      expect(canHaveDurationProperty('ई')).toBe(true);
      expect(canHaveDurationProperty('उ')).toBe(true);
      expect(canHaveDurationProperty('ऊ')).toBe(true);
      expect(canHaveDurationProperty('ए')).toBe(true);
      expect(canHaveDurationProperty('ओ')).toBe(true);
    });

    test('should return false for consonants', () => {
      // IAST consonants
      expect(canHaveDurationProperty('k')).toBe(false);
      expect(canHaveDurationProperty('g')).toBe(false);
      expect(canHaveDurationProperty('c')).toBe(false);
      expect(canHaveDurationProperty('j')).toBe(false);
      expect(canHaveDurationProperty('t')).toBe(false);
      expect(canHaveDurationProperty('d')).toBe(false);
      expect(canHaveDurationProperty('p')).toBe(false);
      expect(canHaveDurationProperty('b')).toBe(false);
      expect(canHaveDurationProperty('m')).toBe(false);
      expect(canHaveDurationProperty('n')).toBe(false);
      expect(canHaveDurationProperty('r')).toBe(false);
      expect(canHaveDurationProperty('l')).toBe(false);
      expect(canHaveDurationProperty('v')).toBe(false);
      expect(canHaveDurationProperty('s')).toBe(false);
      expect(canHaveDurationProperty('h')).toBe(false);
      
      // Devanagari consonants
      expect(canHaveDurationProperty('क')).toBe(false);
      expect(canHaveDurationProperty('ग')).toBe(false);
      expect(canHaveDurationProperty('च')).toBe(false);
      expect(canHaveDurationProperty('ज')).toBe(false);
      expect(canHaveDurationProperty('त')).toBe(false);
      expect(canHaveDurationProperty('द')).toBe(false);
      expect(canHaveDurationProperty('प')).toBe(false);
      expect(canHaveDurationProperty('ब')).toBe(false);
      expect(canHaveDurationProperty('म')).toBe(false);
    });

    test('should return false for invalid input', () => {
      expect(canHaveDurationProperty('')).toBe(false);
      expect(canHaveDurationProperty(null)).toBe(false);
      expect(canHaveDurationProperty(undefined)).toBe(false);
      expect(canHaveDurationProperty(123)).toBe(false);
    });
  });

  describe('validateDurationClassification()', () => {
    test('should validate correct vowel-duration combinations', () => {
      const result1 = validateDurationClassification('a', 'ह्रस्व');
      expect(result1.isValid).toBe(true);
      expect(result1.reason).toContain('correctly applied to vowel');

      const result2 = validateDurationClassification('ā', 'दीर्घ');
      expect(result2.isValid).toBe(true);
      expect(result2.reason).toContain('correctly applied to vowel');

      const result3 = validateDurationClassification('अ', 'short');
      expect(result3.isValid).toBe(true);
      expect(result3.reason).toContain('correctly applied to vowel');
    });

    test('should reject duration terms applied to consonants', () => {
      const result1 = validateDurationClassification('k', 'ह्रस्व');
      expect(result1.isValid).toBe(false);
      expect(result1.reason).toContain('cannot be applied to consonant');
      expect(result1.reason).toContain('अचश्च');

      const result2 = validateDurationClassification('प', 'दीर्घ');
      expect(result2.isValid).toBe(false);
      expect(result2.reason).toContain('cannot be applied to consonant');

      const result3 = validateDurationClassification('m', 'pluta');
      expect(result3.isValid).toBe(false);
      expect(result3.reason).toContain('cannot be applied to consonant');
    });

    test('should reject invalid duration terms', () => {
      const result = validateDurationClassification('a', 'invalid_term');
      expect(result.isValid).toBe(false);
      expect(result.reason).toContain('not a recognized duration term');
    });

    test('should handle missing input', () => {
      const result1 = validateDurationClassification('', 'ह्रस्व');
      expect(result1.isValid).toBe(false);
      expect(result1.reason).toContain('Missing phoneme');

      const result2 = validateDurationClassification('a', '');
      expect(result2.isValid).toBe(false);
      expect(result2.reason).toContain('Missing phoneme or duration type');
    });
  });

  describe('analyzeDurationScope()', () => {
    test('should analyze Sanskrit words correctly', () => {
      const result = analyzeDurationScope('rama');
      
      expect(result.word).toBe('rama');
      expect(result.script).toBe('IAST');
      expect(result.totalPhonemes).toBe(4);
      expect(result.vowels).toEqual(['a', 'a']);
      expect(result.consonants).toEqual(['r', 'm']);
      expect(result.durationEligible).toEqual(['a', 'a']);
      expect(result.durationIneligible).toEqual(['r', 'm']);
      expect(result.sutraApplication).toBe('1.2.28');
    });

    test('should analyze Devanagari words correctly', () => {
      const result = analyzeDurationScope('राम');
      
      expect(result.word).toBe('राम');
      expect(result.script).toBe('Devanagari');
      expect(result.totalPhonemes).toBeGreaterThan(0);
      expect(result.durationEligible.length).toBeGreaterThan(0);
      expect(result.scopeStatistics).toHaveProperty('vowelPercentage');
      expect(result.scopeStatistics).toHaveProperty('consonantPercentage');
    });

    test('should calculate scope statistics', () => {
      const result = analyzeDurationScope('aeiou');
      
      expect(result.scopeStatistics.vowelPercentage).toBe(100);
      expect(result.scopeStatistics.consonantPercentage).toBe(0);
      expect(result.scopeStatistics.durationApplicableCount).toBe(5);
      expect(result.scopeStatistics.durationInapplicableCount).toBe(0);
    });

    test('should throw error for invalid input', () => {
      expect(() => analyzeDurationScope('')).toThrow('Invalid input');
      expect(() => analyzeDurationScope(null)).toThrow('Invalid input');
    });
  });

  describe('validateGrammaticalRuleScope()', () => {
    test('should validate rules that correctly apply duration terms to vowels', () => {
      const result = validateGrammaticalRuleScope(
        'ह्रस्व vowels undergo lengthening', 
        'a'
      );
      
      expect(result.compliesWithSutra1228).toBe(true);
      expect(result.violations).toHaveLength(0);
      expect(result.recommendations[0]).toContain('correctly applies');
    });

    test('should detect violations when duration terms applied to consonants', () => {
      const result = validateGrammaticalRuleScope(
        'ह्रस्व consonants are shortened', 
        'k'
      );
      
      expect(result.compliesWithSutra1228).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
      expect(result.violations[0]).toContain('consonant');
      expect(result.recommendations[0]).toContain('vowels (अच्) only');
    });

    test('should handle rules without duration terms', () => {
      const result = validateGrammaticalRuleScope(
        'consonants undergo doubling', 
        'k'
      );
      
      expect(result.isValid).toBe(true);
      expect(result.compliesWithSutra1228).toBe(true);
      expect(result.recommendations[0]).toContain('not applicable');
    });

    test('should handle missing input', () => {
      const result = validateGrammaticalRuleScope('', 'a');
      expect(result.violations[0]).toBe('Missing rule or target');
    });
  });

  describe('sutra1228() - Main Function', () => {
    test('should perform default scope analysis', () => {
      const result = sutra1228('karma');
      
      expect(result.sutra).toBe('1.2.28');
      expect(result.sutraText).toBe('अचश्च');
      expect(result.rule).toContain('Duration terms');
      expect(result.rule).toContain('vowels only');
      expect(result.analysis).toBeTruthy();
      expect(result.analysis.durationEligible.length).toBeGreaterThan(0);
      expect(result.guidance).toBeTruthy();
      expect(result.guidance.principle).toContain('अच्');
    });

    test('should perform validation analysis', () => {
      const result = sutra1228('a', { 
        type: 'validation', 
        durationType: 'ह्रस्व' 
      });
      
      expect(result.compliance).toBeTruthy();
      expect(result.compliance.isValid).toBe(true);
      expect(result.interpretation).toContain('correctly applied');
    });

    test('should perform rule validation analysis', () => {
      const result = sutra1228('a', { 
        type: 'rule_validation', 
        rule: 'ह्रस्व vowels are basic' 
      });
      
      expect(result.compliance).toBeTruthy();
      expect(result.compliance.compliesWithSutra1228).toBe(true);
      expect(result.interpretation).toContain('PASSED');
    });

    test('should throw error for missing required context', () => {
      expect(() => sutra1228('a', { 
        type: 'validation' 
      })).toThrow('Duration type required');

      expect(() => sutra1228('a', { 
        type: 'rule_validation' 
      })).toThrow('Rule text required');
    });

    test('should handle IAST input', () => {
      const result = sutra1228('deva');
      expect(result.script).toBe('IAST');
      expect(result.analysis.vowels.length).toBeGreaterThan(0);
    });

    test('should handle Devanagari input', () => {
      const result = sutra1228('देव');
      expect(result.script).toBe('Devanagari');
      expect(result.analysis.vowels.length).toBeGreaterThan(0);
    });

    test('should provide guidance for practical application', () => {
      const result = sutra1228('test');
      
      expect(result.guidance.principle).toContain('Duration terms');
      expect(result.guidance.principle).toContain('अच्');
      expect(result.guidance.application).toContain('restrict duration classifications');
      expect(result.guidance.examples.correct).toContain('vowel');
      expect(result.guidance.examples.incorrect).toContain('consonant');
      expect(result.guidance.examples.incorrect).toContain('not applicable');
    });

    test('should throw error for invalid input', () => {
      expect(() => sutra1228('')).toThrow('Invalid input');
      expect(() => sutra1228(null)).toThrow('Invalid input');
      expect(() => sutra1228(undefined)).toThrow('Invalid input');
    });
  });

  describe('Integration with Sutra 1.2.27', () => {
    test('should work with duration functions from 1.2.27', () => {
      const result = sutra1228('ācārya');
      
      expect(result.analysis).toBeTruthy();
      expect(result.analysis.vowels.length).toBeGreaterThan(0);
      
      // Should properly identify duration-eligible vowels
      expect(result.analysis.durationEligible.length).toBe(result.analysis.vowels.length);
    });

    test('should validate that only vowels can have duration properties', () => {
      const vowelResult = sutra1228('ā', { type: 'validation', durationType: 'दीर्घ' });
      expect(vowelResult.compliance.isValid).toBe(true);
      
      // Consonants should be rejected for duration classification
      const consonantValidation = validateDurationClassification('k', 'ह्रस्व');
      expect(consonantValidation.isValid).toBe(false);
      expect(consonantValidation.reason).toContain('अचश्च');
    });
  });

  describe('Edge Cases', () => {
    test('should handle single character input', () => {
      const vowelResult = sutra1228('a');
      expect(vowelResult.analysis.vowels).toEqual(['a']);
      expect(vowelResult.analysis.consonants).toEqual([]);

      const consonantResult = sutra1228('k');
      expect(consonantResult.analysis.vowels).toEqual([]);
      expect(consonantResult.analysis.consonants).toEqual(['k']);
    });

    test('should handle vowel-only words', () => {
      const result = sutra1228('aeiou');
      expect(result.analysis.vowels.length).toBe(5);
      expect(result.analysis.consonants.length).toBe(0);
      expect(result.analysis.scopeStatistics.vowelPercentage).toBe(100);
    });

    test('should handle consonant-only sequences', () => {
      const result = sutra1228('kṣtr');
      expect(result.analysis.vowels.length).toBe(0);
      expect(result.analysis.consonants.length).toBeGreaterThan(0);
      expect(result.analysis.scopeStatistics.vowelPercentage).toBe(0);
    });

    test('should handle mixed script edge cases', () => {
      // This should handle basic detection even if mixed
      const result = sutra1228('test');
      expect(result.script).toBe('IAST');
      expect(result.analysis).toBeTruthy();
    });
  });
});
