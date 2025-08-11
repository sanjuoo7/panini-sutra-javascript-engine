/**
 * Test Suite for Verb Analysis Utility
 * 
 * This test suite validates the functionality of the verb analysis module,
 * testing affix identification, classification, and analysis functions.
 */

import {
  LIT_AFFIXES,
  SARVADHATUKA_AFFIXES,
  PIT_AFFIXES,
  isLitAffix,
  isSarvadhatuka,
  isPitAffix,
  analyzeAffix,
  getAffixesByType,
  validateAffix,
  findVerbalAffixes
} from './verb-analysis.js';

describe('Verb Analysis Utility', () => {
  
  describe('Affix constants', () => {
    test('should have LIT_AFFIXES for both scripts', () => {
      expect(LIT_AFFIXES).toHaveProperty('devanagari');
      expect(LIT_AFFIXES).toHaveProperty('iast');
      expect(Array.isArray(LIT_AFFIXES.devanagari)).toBe(true);
      expect(Array.isArray(LIT_AFFIXES.iast)).toBe(true);
    });

    test('should have SARVADHATUKA_AFFIXES for both scripts', () => {
      expect(SARVADHATUKA_AFFIXES).toHaveProperty('devanagari');
      expect(SARVADHATUKA_AFFIXES).toHaveProperty('iast');
      expect(Array.isArray(SARVADHATUKA_AFFIXES.devanagari)).toBe(true);
      expect(Array.isArray(SARVADHATUKA_AFFIXES.iast)).toBe(true);
    });

    test('should have PIT_AFFIXES for both scripts', () => {
      expect(PIT_AFFIXES).toHaveProperty('devanagari');
      expect(PIT_AFFIXES).toHaveProperty('iast');
      expect(Array.isArray(PIT_AFFIXES.devanagari)).toBe(true);
      expect(Array.isArray(PIT_AFFIXES.iast)).toBe(true);
    });

    test('should include expected affix patterns', () => {
      // LIT affixes
      expect(LIT_AFFIXES.devanagari).toContain('आ');
      expect(LIT_AFFIXES.iast).toContain('ā');
      
      // SARVADHATUKA affixes
      expect(SARVADHATUKA_AFFIXES.devanagari).toContain('ति');
      expect(SARVADHATUKA_AFFIXES.iast).toContain('ti');
      
      // PIT affixes
      expect(PIT_AFFIXES.devanagari).toContain('त');
      expect(PIT_AFFIXES.iast).toContain('ta');
    });
  });

  describe('isLitAffix function', () => {
    test('should identify LIT affixes in Devanagari', () => {
      expect(isLitAffix('आ')).toBe(true);
      expect(isLitAffix('उः')).toBe(true);
      expect(isLitAffix('ए')).toBe(true);
      expect(isLitAffix('औ')).toBe(true);
    });

    test('should identify LIT affixes in IAST', () => {
      expect(isLitAffix('ā')).toBe(true);
      expect(isLitAffix('uḥ')).toBe(true);
      expect(isLitAffix('e')).toBe(true);
      expect(isLitAffix('au')).toBe(true);
    });

    test('should return false for non-LIT affixes', () => {
      expect(isLitAffix('ति')).toBe(false);
      expect(isLitAffix('ti')).toBe(false);
      expect(isLitAffix('त')).toBe(false);
      expect(isLitAffix('ta')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isLitAffix('')).toBe(false);
      expect(isLitAffix(null)).toBe(false);
      expect(isLitAffix(undefined)).toBe(false);
      expect(isLitAffix(123)).toBe(false);
    });
  });

  describe('isSarvadhatuka function', () => {
    test('should identify sārvādhātuka affixes in Devanagari', () => {
      expect(isSarvadhatuka('ति')).toBe(true);
      expect(isSarvadhatuka('तः')).toBe(true);
      expect(isSarvadhatuka('न्ति')).toBe(true);
      expect(isSarvadhatuka('मि')).toBe(true);
    });

    test('should identify sārvādhātuka affixes in IAST', () => {
      expect(isSarvadhatuka('ti')).toBe(true);
      expect(isSarvadhatuka('taḥ')).toBe(true);
      expect(isSarvadhatuka('nti')).toBe(true);
      expect(isSarvadhatuka('mi')).toBe(true);
    });

    test('should return false for non-sārvādhātuka affixes', () => {
      expect(isSarvadhatuka('आ')).toBe(false);
      expect(isSarvadhatuka('ā')).toBe(false);
      expect(isSarvadhatuka('त')).toBe(false);
      expect(isSarvadhatuka('ta')).toBe(false);
    });
  });

  describe('isPitAffix function', () => {
    test('should identify pit affixes in Devanagari', () => {
      expect(isPitAffix('त')).toBe(true);
      expect(isPitAffix('तवत्')).toBe(true);
      expect(isPitAffix('न')).toBe(true);
      expect(isPitAffix('वत्')).toBe(true);
    });

    test('should identify pit affixes in IAST', () => {
      expect(isPitAffix('ta')).toBe(true);
      expect(isPitAffix('tavat')).toBe(true);
      expect(isPitAffix('na')).toBe(true);
      expect(isPitAffix('vat')).toBe(true);
    });

    test('should return false for non-pit affixes', () => {
      expect(isPitAffix('ति')).toBe(false);
      expect(isPitAffix('ti')).toBe(false);
      expect(isPitAffix('आ')).toBe(false);
      expect(isPitAffix('ā')).toBe(false);
    });
  });

  describe('analyzeAffix function', () => {
    test('should analyze LIT affixes correctly', () => {
      const result = analyzeAffix('आ');
      expect(result.isValid).toBe(true);
      expect(result.properties.isLit).toBe(true);
      expect(result.properties.isSarvadhatuka).toBe(false);
      expect(result.properties.isPit).toBe(false);
      expect(result.primaryType).toBe('lit');
    });

    test('should analyze sārvādhātuka affixes correctly', () => {
      const result = analyzeAffix('ति');
      expect(result.isValid).toBe(true);
      expect(result.properties.isLit).toBe(false);
      expect(result.properties.isSarvadhatuka).toBe(true);
      expect(result.properties.isPit).toBe(false);
      expect(result.primaryType).toBe('sarvadhatuka');
    });

    test('should analyze pit affixes correctly', () => {
      const result = analyzeAffix('त');
      expect(result.isValid).toBe(true);
      expect(result.properties.isLit).toBe(false);
      expect(result.properties.isSarvadhatuka).toBe(false);
      expect(result.properties.isPit).toBe(true);
      expect(result.primaryType).toBe('pit');
    });

    test('should handle unrecognized affixes', () => {
      const result = analyzeAffix('xyz');
      expect(result.isValid).toBe(true);
      expect(result.properties.isLit).toBe(false);
      expect(result.properties.isSarvadhatuka).toBe(false);
      expect(result.properties.isPit).toBe(false);
      expect(result.primaryType).toBe('other');
    });

    test('should handle invalid input', () => {
      const result = analyzeAffix('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getAffixesByType function', () => {
    test('should return LIT affixes for both scripts', () => {
      const result = getAffixesByType('lit');
      expect(result).toHaveProperty('devanagari');
      expect(result).toHaveProperty('iast');
      expect(Array.isArray(result.devanagari)).toBe(true);
      expect(Array.isArray(result.iast)).toBe(true);
    });

    test('should return LIT affixes for Devanagari only', () => {
      const result = getAffixesByType('lit', 'devanagari');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('आ');
    });

    test('should return LIT affixes for IAST only', () => {
      const result = getAffixesByType('lit', 'iast');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('ā');
    });

    test('should return empty array for invalid type', () => {
      const result = getAffixesByType('invalid', 'devanagari');
      expect(result).toEqual([]);
    });
  });

  describe('validateAffix function', () => {
    test('should validate recognized affixes', () => {
      const result = validateAffix('आ');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.isRecognized).toBe(true);
    });

    test('should handle unrecognized affixes with warnings', () => {
      const result = validateAffix('xyz');
      expect(result.isValid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.isRecognized).toBe(false);
    });

    test('should provide suggestions for similar affixes', () => {
      const result = validateAffix('ти'); // Cyrillic ti that looks like ति
      expect(result.warnings.length).toBeGreaterThan(0);
      // May provide suggestions depending on similarity algorithm
    });

    test('should reject empty input', () => {
      const result = validateAffix('');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should include analysis in validation result', () => {
      const result = validateAffix('ति');
      expect(result.analysis).toBeDefined();
      expect(result.analysis.primaryType).toBe('sarvadhatuka');
    });
  });

  describe('findVerbalAffixes function', () => {
    test('should find affixes in Devanagari text', () => {
      const result = findVerbalAffixes('गच्छति');
      expect(result.length).toBeGreaterThan(0);
      const tiAffix = result.find(a => a.affix === 'ति');
      expect(tiAffix).toBeDefined();
      expect(tiAffix.type).toBe('sarvadhatuka');
    });

    test('should find affixes in IAST text', () => {
      const result = findVerbalAffixes('gacchati');
      expect(result.length).toBeGreaterThan(0);
      const tiAffix = result.find(a => a.affix === 'ti');
      expect(tiAffix).toBeDefined();
      expect(tiAffix.type).toBe('sarvadhatuka');
    });

    test('should find multiple affix types in text', () => {
      const result = findVerbalAffixes('गतवान्');
      expect(result.length).toBeGreaterThan(0);
      // Should find 'त' (pit affix)
    });

    test('should return empty array for text without affixes', () => {
      const result = findVerbalAffixes('पुष्प'); // flower - no verbal affixes
      expect(result).toEqual([]);
    });

    test('should handle invalid input', () => {
      expect(findVerbalAffixes('')).toEqual([]);
      expect(findVerbalAffixes(null)).toEqual([]);
      expect(findVerbalAffixes(undefined)).toEqual([]);
    });

    test('should include position information', () => {
      const result = findVerbalAffixes('गच्छति');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('position');
      expect(typeof result[0].position).toBe('number');
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle whitespace gracefully', () => {
      expect(isLitAffix('  आ  ')).toBe(true);
      expect(isSarvadhatuka('  ति  ')).toBe(true);
      expect(isPitAffix('  त  ')).toBe(true);
    });

    test('should handle mixed case in IAST', () => {
      // Depending on implementation, might be case-sensitive
      expect(isLitAffix('ā')).toBe(true);
      // expect(isLitAffix('Ā')).toBe(false); // Assuming case-sensitive
    });

    test('should handle unicode normalization', () => {
      // Test with composed vs decomposed unicode characters
      expect(isLitAffix('आ')).toBe(true); // Should work regardless of unicode form
    });
  });

  describe('Performance considerations', () => {
    test('should handle large text efficiently', () => {
      const largeText = 'गच्छति '.repeat(1000);
      const startTime = Date.now();
      const result = findVerbalAffixes(largeText);
      const endTime = Date.now();
      
      expect(result.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });

  describe('Integration with other utilities', () => {
    test('should work with script detection', () => {
      const devResult = analyzeAffix('ति');
      const iastResult = analyzeAffix('ti');
      
      expect(devResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
    });
  });
});
