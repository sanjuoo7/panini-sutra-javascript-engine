/**
 * Test Suite for Conjunct Analysis Utility
 * 
 * This test suite validates the functionality of the conjunct analysis module,
 * testing conjunct detection, pattern matching, and analysis functions.
 */

import {
  CONJUNCT_PATTERNS,
  hasConjunct,
  findConjuncts,
  isConjunctPattern,
  analyzeConjunctUsage,
  getConjunctPatterns,
  validateConjunctPattern
} from './conjunct-analysis.js';

describe('Conjunct Analysis Utility', () => {
  
  describe('CONJUNCT_PATTERNS constant', () => {
    test('should have patterns for both scripts', () => {
      expect(CONJUNCT_PATTERNS).toHaveProperty('devanagari');
      expect(CONJUNCT_PATTERNS).toHaveProperty('iast');
      expect(Array.isArray(CONJUNCT_PATTERNS.devanagari)).toBe(true);
      expect(Array.isArray(CONJUNCT_PATTERNS.iast)).toBe(true);
    });

    test('should have substantial pattern databases', () => {
      expect(CONJUNCT_PATTERNS.devanagari.length).toBeGreaterThan(100);
      expect(CONJUNCT_PATTERNS.iast.length).toBeGreaterThan(100);
    });

    test('should include common conjunct patterns', () => {
      // Devanagari patterns
      expect(CONJUNCT_PATTERNS.devanagari).toContain('क्त');
      expect(CONJUNCT_PATTERNS.devanagari).toContain('स्त');
      expect(CONJUNCT_PATTERNS.devanagari).toContain('न्त');
      
      // IAST patterns
      expect(CONJUNCT_PATTERNS.iast).toContain('kt');
      expect(CONJUNCT_PATTERNS.iast).toContain('st');
      expect(CONJUNCT_PATTERNS.iast).toContain('nt');
    });
  });

  describe('hasConjunct function', () => {
    test('should detect conjuncts in Devanagari text', () => {
      expect(hasConjunct('क्त')).toBe(true);
      expect(hasConjunct('संस्कृत')).toBe(true);
      expect(hasConjunct('अन्त')).toBe(true);
      expect(hasConjunct('कम्पन')).toBe(true);
    });

    test('should detect conjuncts in IAST text', () => {
      expect(hasConjunct('kt')).toBe(true);
      expect(hasConjunct('saṃskṛta')).toBe(true);
      expect(hasConjunct('anta')).toBe(true);
      expect(hasConjunct('kampana')).toBe(true);
    });

    test('should return false for text without conjuncts', () => {
      expect(hasConjunct('अ')).toBe(false);
      expect(hasConjunct('कम')).toBe(false);
      expect(hasConjunct('a')).toBe(false);
      expect(hasConjunct('kama')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(hasConjunct('')).toBe(false);
      expect(hasConjunct(null)).toBe(false);
      expect(hasConjunct(undefined)).toBe(false);
      expect(hasConjunct(123)).toBe(false);
    });
  });

  describe('findConjuncts function', () => {
    test('should find all conjuncts with positions', () => {
      const result = findConjuncts('संस्कृत');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('pattern');
      expect(result[0]).toHaveProperty('position');
      expect(result[0]).toHaveProperty('script');
    });

    test('should find multiple conjuncts in text', () => {
      const result = findConjuncts('अन्तर्राष्ट्रीय');
      expect(result.length).toBeGreaterThan(1);
    });

    test('should return empty array for text without conjuncts', () => {
      const result = findConjuncts('कमल');
      expect(result).toEqual([]);
    });

    test('should handle invalid input', () => {
      expect(findConjuncts('')).toEqual([]);
      expect(findConjuncts(null)).toEqual([]);
      expect(findConjuncts(undefined)).toEqual([]);
    });
  });

  describe('isConjunctPattern function', () => {
    test('should validate known conjunct patterns', () => {
      expect(isConjunctPattern('क्त')).toBe(true);
      expect(isConjunctPattern('kt')).toBe(true);
      expect(isConjunctPattern('स्त')).toBe(true);
      expect(isConjunctPattern('st')).toBe(true);
    });

    test('should reject non-conjunct patterns', () => {
      expect(isConjunctPattern('क')).toBe(false);
      expect(isConjunctPattern('k')).toBe(false);
      expect(isConjunctPattern('अ')).toBe(false);
      expect(isConjunctPattern('a')).toBe(false);
    });

    test('should handle script specification', () => {
      expect(isConjunctPattern('क्त', 'Devanagari')).toBe(true);
      expect(isConjunctPattern('kt', 'IAST')).toBe(true);
      expect(isConjunctPattern('क्त', 'IAST')).toBe(false);
      expect(isConjunctPattern('kt', 'Devanagari')).toBe(false);
    });
  });

  describe('analyzeConjunctUsage function', () => {
    test('should provide comprehensive analysis', () => {
      const result = analyzeConjunctUsage('संस्कृत');
      expect(result).toHaveProperty('hasConjuncts');
      expect(result).toHaveProperty('conjunctCount');
      expect(result).toHaveProperty('uniqueConjuncts');
      expect(result).toHaveProperty('conjunctDensity');
      expect(result).toHaveProperty('script');
      expect(result).toHaveProperty('analysis');
    });

    test('should correctly count conjuncts', () => {
      const result = analyzeConjunctUsage('अन्त');
      expect(result.hasConjuncts).toBe(true);
      expect(result.conjunctCount).toBeGreaterThan(0);
      expect(Array.isArray(result.uniqueConjuncts)).toBe(true);
    });

    test('should handle text without conjuncts', () => {
      const result = analyzeConjunctUsage('कमल');
      expect(result.hasConjuncts).toBe(false);
      expect(result.conjunctCount).toBe(0);
      expect(result.uniqueConjuncts).toEqual([]);
    });
  });

  describe('getConjunctPatterns function', () => {
    test('should return Devanagari patterns only', () => {
      const patterns = getConjunctPatterns('devanagari');
      expect(Array.isArray(patterns)).toBe(true);
      expect(patterns.length).toBeGreaterThan(100);
      expect(patterns).toContain('क्त');
    });

    test('should return IAST patterns only', () => {
      const patterns = getConjunctPatterns('iast');
      expect(Array.isArray(patterns)).toBe(true);
      expect(patterns.length).toBeGreaterThan(100);
      expect(patterns).toContain('kt');
    });

    test('should return both scripts by default', () => {
      const patterns = getConjunctPatterns();
      expect(patterns).toHaveProperty('devanagari');
      expect(patterns).toHaveProperty('iast');
      expect(Array.isArray(patterns.devanagari)).toBe(true);
      expect(Array.isArray(patterns.iast)).toBe(true);
    });
  });

  describe('validateConjunctPattern function', () => {
    test('should validate correct patterns', () => {
      const result = validateConjunctPattern('क्त');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.isRecognized).toBe(true);
    });

    test('should identify invalid patterns', () => {
      const result = validateConjunctPattern('');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should provide warnings for unrecognized patterns', () => {
      const result = validateConjunctPattern('xyz');
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    test('should validate Devanagari patterns properly', () => {
      const result = validateConjunctPattern('क्त');
      expect(result.script).toBe('Devanagari');
      expect(result.isRecognized).toBe(true);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle empty strings gracefully', () => {
      expect(hasConjunct('')).toBe(false);
      expect(findConjuncts('')).toEqual([]);
      expect(isConjunctPattern('')).toBe(false);
    });

    test('should handle whitespace-only input', () => {
      expect(hasConjunct('   ')).toBe(false);
      expect(findConjuncts('   ')).toEqual([]);
      expect(isConjunctPattern('   ')).toBe(false);
    });

    test('should handle non-string input types', () => {
      expect(hasConjunct(123)).toBe(false);
      expect(hasConjunct({})).toBe(false);
      expect(hasConjunct([])).toBe(false);
    });

    test('should trim input appropriately', () => {
      expect(hasConjunct('  क्त  ')).toBe(true);
      expect(isConjunctPattern('  क्त  ')).toBe(true);
    });
  });

  describe('Integration with script detection', () => {
    test('should work correctly with mixed scripts', () => {
      // This would be handled by script detection logic
      const result1 = findConjuncts('संस्कृत');
      const result2 = findConjuncts('saṃskṛta');
      
      expect(result1.length).toBeGreaterThan(0);
      expect(result2.length).toBeGreaterThan(0);
      expect(result1[0].script).toBe('Devanagari');
      expect(result2[0].script).toBe('IAST');
    });
  });

  describe('Performance considerations', () => {
    test('should handle large text efficiently', () => {
      const largeText = 'संस्कृत '.repeat(1000);
      const startTime = Date.now();
      const result = analyzeConjunctUsage(largeText);
      const endTime = Date.now();
      
      expect(result.hasConjuncts).toBe(true);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});
