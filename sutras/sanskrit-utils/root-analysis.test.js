/**
 * Test Suite for Root Analysis Utility
 * 
 * This test suite validates the functionality of the root analysis module,
 * testing root identification, variant recognition, and analysis functions.
 */

import {
  SPECIFIC_ROOTS,
  ROOT_VARIANTS,
  IT_AUGMENT_PATTERNS,
  isVijRoot,
  isUrnaRoot,
  isIndhiRoot,
  isBhuRoot,
  isIndhiBhavatiRoot,
  getRootVariants,
  normalizeRoot,
  analyzeRoot,
  hasItAugment,
  findSpecificRoots,
  validateRoot
} from './root-analysis.js';

describe('Root Analysis Utility', () => {
  
  describe('Root constants', () => {
    test('should have SPECIFIC_ROOTS with expected roots', () => {
      expect(SPECIFIC_ROOTS).toHaveProperty('vij');
      expect(SPECIFIC_ROOTS).toHaveProperty('urna');
      expect(SPECIFIC_ROOTS).toHaveProperty('indhi');
      expect(SPECIFIC_ROOTS).toHaveProperty('bhu');
      
      expect(SPECIFIC_ROOTS.vij.devanagari).toBe('विज्');
      expect(SPECIFIC_ROOTS.vij.iast).toBe('vij');
      expect(SPECIFIC_ROOTS.urna.devanagari).toBe('ऊर्ण');
      expect(SPECIFIC_ROOTS.urna.iast).toBe('ūrṇa');
      expect(SPECIFIC_ROOTS.indhi.devanagari).toBe('इन्धि');
      expect(SPECIFIC_ROOTS.indhi.iast).toBe('indhi');
      expect(SPECIFIC_ROOTS.bhu.devanagari).toBe('भू');
      expect(SPECIFIC_ROOTS.bhu.iast).toBe('bhū');
    });

    test('should have ROOT_VARIANTS for both scripts', () => {
      expect(ROOT_VARIANTS).toHaveProperty('devanagari');
      expect(ROOT_VARIANTS).toHaveProperty('iast');
      
      expect(ROOT_VARIANTS.devanagari).toHaveProperty('विज्');
      expect(ROOT_VARIANTS.devanagari).toHaveProperty('ऊर्ण');
      expect(ROOT_VARIANTS.devanagari).toHaveProperty('इन्धि');
      expect(ROOT_VARIANTS.devanagari).toHaveProperty('भू');
      
      expect(ROOT_VARIANTS.iast).toHaveProperty('vij');
      expect(ROOT_VARIANTS.iast).toHaveProperty('ūrṇa');
      expect(ROOT_VARIANTS.iast).toHaveProperty('indhi');
      expect(ROOT_VARIANTS.iast).toHaveProperty('bhū');
    });

    test('should have IT_AUGMENT_PATTERNS for both scripts', () => {
      expect(IT_AUGMENT_PATTERNS).toHaveProperty('devanagari');
      expect(IT_AUGMENT_PATTERNS).toHaveProperty('iast');
      expect(Array.isArray(IT_AUGMENT_PATTERNS.devanagari)).toBe(true);
      expect(Array.isArray(IT_AUGMENT_PATTERNS.iast)).toBe(true);
    });
  });

  describe('isVijRoot function', () => {
    test('should identify विज् root in Devanagari', () => {
      expect(isVijRoot('विज्')).toBe(true);
      expect(isVijRoot('विञ्ज्')).toBe(true); // variant
      expect(isVijRoot('वैज्')).toBe(true); // variant
    });

    test('should identify vij root in IAST', () => {
      expect(isVijRoot('vij')).toBe(true);
      expect(isVijRoot('viñj')).toBe(true); // variant
      expect(isVijRoot('vaij')).toBe(true); // variant
    });

    test('should return false for non-विज् roots', () => {
      expect(isVijRoot('भू')).toBe(false);
      expect(isVijRoot('bhū')).toBe(false);
      expect(isVijRoot('गम्')).toBe(false);
      expect(isVijRoot('gam')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isVijRoot('')).toBe(false);
      expect(isVijRoot(null)).toBe(false);
      expect(isVijRoot(undefined)).toBe(false);
      expect(isVijRoot(123)).toBe(false);
    });
  });

  describe('isUrnaRoot function', () => {
    test('should identify ऊर्ण root in Devanagari', () => {
      expect(isUrnaRoot('ऊर्ण')).toBe(true);
      expect(isUrnaRoot('ऊर्ण्')).toBe(true); // variant
      expect(isUrnaRoot('ऊर्णु')).toBe(true); // variant
    });

    test('should identify ūrṇa root in IAST', () => {
      expect(isUrnaRoot('ūrṇa')).toBe(true);
      expect(isUrnaRoot('ūrṇ')).toBe(true); // variant
      expect(isUrnaRoot('urṇa')).toBe(true); // variant
      expect(isUrnaRoot('urṇ')).toBe(true); // variant
    });

    test('should return false for non-ऊर्ण roots', () => {
      expect(isUrnaRoot('भू')).toBe(false);
      expect(isUrnaRoot('bhū')).toBe(false);
      expect(isUrnaRoot('विज्')).toBe(false);
      expect(isUrnaRoot('vij')).toBe(false);
    });
  });

  describe('isIndhiRoot function', () => {
    test('should identify इन्धि root in Devanagari', () => {
      expect(isIndhiRoot('इन्धि')).toBe(true);
      expect(isIndhiRoot('इध्')).toBe(true); // variant
      expect(isIndhiRoot('इन्ध्')).toBe(true); // variant
      expect(isIndhiRoot('एध्')).toBe(true); // variant
    });

    test('should identify indhi root in IAST', () => {
      expect(isIndhiRoot('indhi')).toBe(true);
      expect(isIndhiRoot('idh')).toBe(true); // variant
      expect(isIndhiRoot('indh')).toBe(true); // variant
      expect(isIndhiRoot('edh')).toBe(true); // variant
    });

    test('should return false for non-इन्धि roots', () => {
      expect(isIndhiRoot('भू')).toBe(false);
      expect(isIndhiRoot('bhū')).toBe(false);
      expect(isIndhiRoot('विज्')).toBe(false);
      expect(isIndhiRoot('vij')).toBe(false);
    });
  });

  describe('isBhuRoot function', () => {
    test('should identify भू root in Devanagari', () => {
      expect(isBhuRoot('भू')).toBe(true);
      expect(isBhuRoot('भु')).toBe(true); // variant
      expect(isBhuRoot('भव्')).toBe(true); // variant
      expect(isBhuRoot('भुव्')).toBe(true); // variant
    });

    test('should identify bhū root in IAST', () => {
      expect(isBhuRoot('bhū')).toBe(true);
      expect(isBhuRoot('bhu')).toBe(true); // variant
      expect(isBhuRoot('bhav')).toBe(true); // variant
      expect(isBhuRoot('bhuv')).toBe(true); // variant
    });

    test('should return false for non-भू roots', () => {
      expect(isBhuRoot('इन्धि')).toBe(false);
      expect(isBhuRoot('indhi')).toBe(false);
      expect(isBhuRoot('विज्')).toBe(false);
      expect(isBhuRoot('vij')).toBe(false);
    });
  });

  describe('isIndhiBhavatiRoot function', () => {
    test('should identify both इन्धि and भू roots', () => {
      expect(isIndhiBhavatiRoot('इन्धि')).toBe(true);
      expect(isIndhiBhavatiRoot('भू')).toBe(true);
      expect(isIndhiBhavatiRoot('indhi')).toBe(true);
      expect(isIndhiBhavatiRoot('bhū')).toBe(true);
    });

    test('should identify variants of both roots', () => {
      expect(isIndhiBhavatiRoot('इध्')).toBe(true);
      expect(isIndhiBhavatiRoot('भव्')).toBe(true);
      expect(isIndhiBhavatiRoot('idh')).toBe(true);
      expect(isIndhiBhavatiRoot('bhav')).toBe(true);
    });

    test('should return false for other roots', () => {
      expect(isIndhiBhavatiRoot('विज्')).toBe(false);
      expect(isIndhiBhavatiRoot('vij')).toBe(false);
      expect(isIndhiBhavatiRoot('गम्')).toBe(false);
      expect(isIndhiBhavatiRoot('gam')).toBe(false);
    });
  });

  describe('getRootVariants function', () => {
    test('should return variants for विज् root', () => {
      const variants = getRootVariants('विज्');
      expect(Array.isArray(variants)).toBe(true);
      expect(variants).toContain('विज्');
      expect(variants).toContain('विञ्ज्');
      expect(variants).toContain('वैज्');
    });

    test('should return variants for vij root', () => {
      const variants = getRootVariants('vij');
      expect(Array.isArray(variants)).toBe(true);
      expect(variants).toContain('vij');
      expect(variants).toContain('viñj');
      expect(variants).toContain('vaij');
    });

    test('should return empty array for unrecognized root', () => {
      const variants = getRootVariants('unknown');
      expect(variants).toEqual([]);
    });

    test('should handle invalid input', () => {
      expect(getRootVariants('')).toEqual([]);
      expect(getRootVariants(null)).toEqual([]);
      expect(getRootVariants(undefined)).toEqual([]);
    });
  });

  describe('normalizeRoot function', () => {
    test('should normalize variants to base form', () => {
      expect(normalizeRoot('विञ्ज्')).toBe('विज्');
      expect(normalizeRoot('viñj')).toBe('vij');
      expect(normalizeRoot('इध्')).toBe('इन्धि');
      expect(normalizeRoot('idh')).toBe('indhi');
      expect(normalizeRoot('भव्')).toBe('भू');
      expect(normalizeRoot('bhav')).toBe('bhū');
    });

    test('should return base form unchanged', () => {
      expect(normalizeRoot('विज्')).toBe('विज्');
      expect(normalizeRoot('vij')).toBe('vij');
      expect(normalizeRoot('इन्धि')).toBe('इन्धि');
      expect(normalizeRoot('indhi')).toBe('indhi');
    });

    test('should return null for unrecognized root', () => {
      expect(normalizeRoot('unknown')).toBe(null);
      expect(normalizeRoot('गम्')).toBe(null);
      expect(normalizeRoot('gam')).toBe(null);
    });
  });

  describe('analyzeRoot function', () => {
    test('should analyze विज् root correctly', () => {
      const result = analyzeRoot('विज्');
      expect(result.isValid).toBe(true);
      expect(result.isRecognized).toBe(true);
      expect(result.baseForm).toBe('विज्');
      expect(result.properties.isVij).toBe(true);
      expect(result.properties.isUrna).toBe(false);
      expect(result.properties.isIndhi).toBe(false);
      expect(result.properties.isBhu).toBe(false);
      expect(result.rootInfo).toBeDefined();
      expect(result.rootInfo.meaning).toBe('to separate, to abandon');
    });

    test('should analyze भू root correctly', () => {
      const result = analyzeRoot('भू');
      expect(result.isValid).toBe(true);
      expect(result.isRecognized).toBe(true);
      expect(result.baseForm).toBe('भू');
      expect(result.properties.isBhu).toBe(true);
      expect(result.properties.isIndhiBhavati).toBe(true);
      expect(result.rootInfo.meaning).toBe('to become, to be');
    });

    test('should analyze root variants correctly', () => {
      const result = analyzeRoot('विञ्ज्');
      expect(result.isValid).toBe(true);
      expect(result.isRecognized).toBe(true);
      expect(result.baseForm).toBe('विज्');
      expect(result.properties.isVij).toBe(true);
    });

    test('should handle unrecognized roots', () => {
      const result = analyzeRoot('unknown');
      expect(result.isValid).toBe(true);
      expect(result.isRecognized).toBe(false);
      expect(result.baseForm).toBe(null);
      expect(result.properties.isVij).toBe(false);
    });

    test('should handle invalid input', () => {
      const result = analyzeRoot('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('hasItAugment function', () => {
    test('should detect iṭ augment patterns in Devanagari', () => {
      expect(hasItAugment('इतगत')).toBe(true); // starts with इत
      expect(hasItAugment('इष्यति')).toBe(true); // starts with इष्य
      expect(hasItAugment('इत्वा')).toBe(true); // starts with इत्व
    });

    test('should detect iṭ augment patterns in IAST', () => {
      expect(hasItAugment('itgata')).toBe(true); // starts with it
      expect(hasItAugment('iṣyati')).toBe(true); // starts with iṣy
      expect(hasItAugment('itvā')).toBe(true); // starts with itv
    });

    test('should return false for roots without iṭ augment', () => {
      expect(hasItAugment('गच्छति')).toBe(false);
      expect(hasItAugment('gacchati')).toBe(false);
      expect(hasItAugment('भवति')).toBe(false);
      expect(hasItAugment('bhavati')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(hasItAugment('')).toBe(false);
      expect(hasItAugment(null)).toBe(false);
      expect(hasItAugment(undefined)).toBe(false);
    });
  });

  describe('findSpecificRoots function', () => {
    test('should find roots in Devanagari text', () => {
      const result = findSpecificRoots('विज्भूगम्');
      expect(result.length).toBeGreaterThan(0);
      
      const vijRoot = result.find(r => r.type === 'vij');
      const bhuRoot = result.find(r => r.type === 'bhu');
      
      expect(vijRoot).toBeDefined();
      expect(bhuRoot).toBeDefined();
    });

    test('should find roots in IAST text', () => {
      const result = findSpecificRoots('vijbhūgam');
      expect(result.length).toBeGreaterThan(0);
      
      const vijRoot = result.find(r => r.type === 'vij');
      const bhuRoot = result.find(r => r.type === 'bhu');
      
      expect(vijRoot).toBeDefined();
      expect(bhuRoot).toBeDefined();
    });

    test('should include position and metadata', () => {
      const result = findSpecificRoots('विज्');
      expect(result.length).toBe(1);
      expect(result[0]).toHaveProperty('position');
      expect(result[0]).toHaveProperty('meaning');
      expect(result[0]).toHaveProperty('sutra');
      expect(result[0].meaning).toBe('to separate, to abandon');
    });

    test('should return empty array for text without specific roots', () => {
      const result = findSpecificRoots('कमल');
      expect(result).toEqual([]);
    });
  });

  describe('validateRoot function', () => {
    test('should validate recognized roots', () => {
      const result = validateRoot('विज्');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.analysis.isRecognized).toBe(true);
    });

    test('should handle unrecognized roots with warnings', () => {
      const result = validateRoot('unknown');
      expect(result.isValid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.analysis.isRecognized).toBe(false);
    });

    test('should provide suggestions for similar roots', () => {
      const result = validateRoot('vir'); // Close to 'vij'
      expect(result.warnings.length).toBeGreaterThan(0);
      // May provide suggestions depending on similarity algorithm
    });

    test('should reject empty input', () => {
      const result = validateRoot('');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle whitespace gracefully', () => {
      expect(isVijRoot('  विज्  ')).toBe(true);
      expect(isBhuRoot('  भू  ')).toBe(true);
      expect(normalizeRoot('  विञ्ज्  ')).toBe('विज्');
    });

    test('should handle unicode normalization', () => {
      // Test with composed vs decomposed unicode characters
      expect(isIndhiRoot('इन्धि')).toBe(true); // Should work regardless of unicode form
    });

    test('should be case-sensitive for IAST', () => {
      expect(isVijRoot('vij')).toBe(true);
      expect(isVijRoot('VIJ')).toBe(false); // Assuming case-sensitive
    });
  });

  describe('Performance considerations', () => {
    test('should handle large text efficiently', () => {
      const largeText = 'विज्भू '.repeat(1000);
      const startTime = Date.now();
      const result = findSpecificRoots(largeText);
      const endTime = Date.now();
      
      expect(result.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});
