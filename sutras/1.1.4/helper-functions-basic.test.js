/**
 * Basic Unit Tests for Internal Helper Functions - Sutra 1.1.4
 * 
 * Focused testing of key internal helper functions with realistic expectations.
 */

import {
  isMonosyllabic,
  hasCanonicalCVCStructure,
  getPhonologicalFeatures,
  hasFeature,
  shareFeature,
  analyzeAffixClassification,
  countSyllables,
  analyzeDhatuLopa,
  calculateClusterDifficulty
} from './index.js';

describe('Sutra 1.1.4: Basic Helper Functions Unit Tests', () => {

  describe('Basic Phonological Functions', () => {
    
    describe('isMonosyllabic()', () => {
      test('should identify monosyllabic dhātus correctly', () => {
        expect(isMonosyllabic('gam')).toBe(true);
        expect(isMonosyllabic('kṛ')).toBe(true);
        expect(isMonosyllabic('pac')).toBe(true);
      });

      test('should handle basic input validation', () => {
        expect(isMonosyllabic('gaccha')).toBe(false);
        expect(isMonosyllabic('')).toBe(false);
      });
    });

    describe('hasCanonicalCVCStructure()', () => {
      test('should identify canonical CVC structure correctly', () => {
        expect(hasCanonicalCVCStructure('gam')).toBe(true);
        expect(hasCanonicalCVCStructure('pac')).toBe(true);
      });

      test('should handle non-canonical structures', () => {
        expect(hasCanonicalCVCStructure('')).toBe(false);
        expect(hasCanonicalCVCStructure('a')).toBe(false);
      });
    });

    describe('countSyllables()', () => {
      test('should count syllables for valid strings', () => {
        expect(countSyllables('gam')).toBe(1);
        expect(countSyllables('kṛ')).toBe(1);
        expect(countSyllables('pac')).toBe(1);
      });

      test('should handle empty strings', () => {
        expect(countSyllables('')).toBe(0);
      });
    });
  });

  describe('Phonological Feature Analysis', () => {
    
    describe('getPhonologicalFeatures()', () => {
      test('should return features for known consonants', () => {
        const kFeatures = getPhonologicalFeatures('k');
        expect(kFeatures).toBeTruthy();
        if (kFeatures) {
          expect(kFeatures).toHaveProperty('place');
          expect(kFeatures).toHaveProperty('manner');
          expect(kFeatures).toHaveProperty('voice');
        }
      });

      test('should handle unknown sounds', () => {
        const result = getPhonologicalFeatures('xyz');
        expect(result).toBeNull();
      });
    });

    describe('hasFeature()', () => {
      test('should work with valid features', () => {
        const result = hasFeature('k', 'place', 'velar');
        expect(typeof result).toBe('boolean');
      });
    });

    describe('shareFeature()', () => {
      test('should compare features between sounds', () => {
        const result = shareFeature('k', 'g', 'place');
        expect(typeof result).toBe('boolean');
      });
    });

    describe('calculateClusterDifficulty()', () => {
      test('should calculate difficulty scores', () => {
        const difficulty = calculateClusterDifficulty('k', 't');
        expect(typeof difficulty).toBe('number');
        expect(difficulty).toBeGreaterThanOrEqual(0);
        expect(difficulty).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Morphological Analysis', () => {
    
    describe('analyzeAffixClassification()', () => {
      test('should classify known affixes', () => {
        const yaAnalysis = analyzeAffixClassification('ya');
        expect(yaAnalysis).toHaveProperty('classification');
        expect(yaAnalysis).toHaveProperty('confidence');
        expect(typeof yaAnalysis.confidence).toBe('number');

        const tiAnalysis = analyzeAffixClassification('ti');
        expect(tiAnalysis).toHaveProperty('classification');
        expect(tiAnalysis).toHaveProperty('confidence');
      });

      test('should handle unknown affixes', () => {
        const unknownAnalysis = analyzeAffixClassification('unknown');
        expect(unknownAnalysis).toHaveProperty('classification');
        expect(unknownAnalysis).toHaveProperty('confidence');
      });
    });
  });

  describe('Complex Analysis Functions', () => {
    
    describe('analyzeDhatuLopa()', () => {
      test('should provide comprehensive analysis', () => {
        const analysis = analyzeDhatuLopa('gam', 'ya');
        expect(analysis).toBeTruthy();
        expect(analysis).toHaveProperty('confidence');
        expect(typeof analysis.confidence).toBe('number');
        expect(analysis.confidence).toBeGreaterThan(0);
        expect(analysis.confidence).toBeLessThanOrEqual(1);
      });

      test('should handle different dhātu-affix combinations', () => {
        const gamYa = analyzeDhatuLopa('gam', 'ya');
        const pacTi = analyzeDhatuLopa('pac', 'ti');
        
        expect(gamYa).toBeTruthy();
        expect(pacTi).toBeTruthy();
        expect(typeof gamYa.confidence).toBe('number');
        expect(typeof pacTi.confidence).toBe('number');
      });

      test('should handle invalid inputs gracefully', () => {
        const invalidAnalysis = analyzeDhatuLopa('', '');
        expect(invalidAnalysis).toBeTruthy();
        expect(invalidAnalysis).toHaveProperty('confidence');
      });
    });
  });

  describe('Error Handling', () => {
    
    test('should handle empty string inputs without throwing', () => {
      expect(() => isMonosyllabic('')).not.toThrow();
      expect(() => hasCanonicalCVCStructure('')).not.toThrow();
      expect(() => analyzeDhatuLopa('', '')).not.toThrow();
    });

    test('should provide meaningful results for edge cases', () => {
      const edgeCases = [
        { dhatu: 'a', affix: 'a' },
        { dhatu: 'gam', affix: '' },
        { dhatu: '', affix: 'ya' }
      ];

      edgeCases.forEach(({ dhatu, affix }) => {
        const analysis = analyzeDhatuLopa(dhatu, affix);
        expect(analysis).toBeTruthy();
        expect(typeof analysis.confidence).toBe('number');
        expect(analysis.confidence).toBeGreaterThanOrEqual(0);
        expect(analysis.confidence).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Integration with Main Functions', () => {
    
    test('should integrate with classification functions', () => {
      const affixAnalysis = analyzeAffixClassification('ya');
      const lopaAnalysis = analyzeDhatuLopa('gam', 'ya');
      
      // Both should provide confidence scores
      expect(typeof affixAnalysis.confidence).toBe('number');
      expect(typeof lopaAnalysis.confidence).toBe('number');
      
      // Both should provide classification information
      expect(affixAnalysis).toHaveProperty('classification');
      expect(lopaAnalysis).toHaveProperty('hasLopa');
    });

    test('should provide consistent results across calls', () => {
      const result1 = analyzeDhatuLopa('gam', 'ya');
      const result2 = analyzeDhatuLopa('gam', 'ya');
      
      expect(result1.confidence).toBe(result2.confidence);
      expect(result1.hasLopa).toBe(result2.hasLopa);
    });
  });
});
