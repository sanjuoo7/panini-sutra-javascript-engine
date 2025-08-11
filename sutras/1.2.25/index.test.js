/**
 * Tests for Sutra 1.2.25: तृषिमृषिकृशेः काश्यपस्य
 * Tests the optional कित् designation prevention for सेट् क्त्वा after specific roots
 * according to ऋषि काश्यप's opinion
 */

import {
  isKashyapaRoot,
  isKitPreventedByKashyapa,
  analyzeKashyapaException,
  sutra1225,
  getKashyapaRoots,
  getKashyapaExamples,
  KASHYAPA_ROOTS,
  ROOT_VARIANTS
} from './index.js';

describe('Sutra 1.2.25: तृषिमृषिकृशेः काश्यपस्य', () => {
  
  describe('Constants and Data Structures', () => {
    test('should have correct Kashyapa roots', () => {
      expect(KASHYAPA_ROOTS.devanagari).toEqual(['तृष्', 'मृष्', 'कृश्']);
      expect(KASHYAPA_ROOTS.iast).toEqual(['tṛṣ', 'mṛṣ', 'kṛś']);
    });

    test('should have comprehensive root variants', () => {
      expect(ROOT_VARIANTS).toHaveProperty('तृष्');
      expect(ROOT_VARIANTS).toHaveProperty('मृष्');
      expect(ROOT_VARIANTS).toHaveProperty('कृश्');
      expect(ROOT_VARIANTS).toHaveProperty('tṛṣ');
      expect(ROOT_VARIANTS).toHaveProperty('mṛṣ');
      expect(ROOT_VARIANTS).toHaveProperty('kṛś');
    });
  });

  describe('isKashyapaRoot function', () => {
    describe('Devanagari roots', () => {
      test('should identify the three specific roots', () => {
        expect(isKashyapaRoot('तृष्')).toBe(true);
        expect(isKashyapaRoot('मृष्')).toBe(true);
        expect(isKashyapaRoot('कृश्')).toBe(true);
      });

      test('should identify root variants', () => {
        expect(isKashyapaRoot('तृष')).toBe(true);
        expect(isKashyapaRoot('तर्ष्')).toBe(true);
        expect(isKashyapaRoot('मृष')).toBe(true);
        expect(isKashyapaRoot('मर्ष्')).toBe(true);
        expect(isKashyapaRoot('कृश')).toBe(true);
        expect(isKashyapaRoot('कर्श्')).toBe(true);
      });

      test('should reject non-Kashyapa roots', () => {
        expect(isKashyapaRoot('गम्')).toBe(false);
        expect(isKashyapaRoot('कृ')).toBe(false);
        expect(isKashyapaRoot('भू')).toBe(false);
        expect(isKashyapaRoot('रुद्')).toBe(false);
        expect(isKashyapaRoot('विद्')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify the three specific roots', () => {
        expect(isKashyapaRoot('tṛṣ')).toBe(true);
        expect(isKashyapaRoot('mṛṣ')).toBe(true);
        expect(isKashyapaRoot('kṛś')).toBe(true);
      });

      test('should identify root variants', () => {
        expect(isKashyapaRoot('tarṣ')).toBe(true);
        expect(isKashyapaRoot('marṣ')).toBe(true);
        expect(isKashyapaRoot('karś')).toBe(true);
      });

      test('should reject non-Kashyapa roots', () => {
        expect(isKashyapaRoot('gam')).toBe(false);
        expect(isKashyapaRoot('kṛ')).toBe(false);
        expect(isKashyapaRoot('bhū')).toBe(false);
        expect(isKashyapaRoot('rud')).toBe(false);
        expect(isKashyapaRoot('vid')).toBe(false);
      });
    });

    describe('Input validation', () => {
      test('should handle invalid inputs gracefully', () => {
        expect(isKashyapaRoot('')).toBe(false);
        expect(isKashyapaRoot('   ')).toBe(false);
        expect(isKashyapaRoot(null)).toBe(false);
        expect(isKashyapaRoot(undefined)).toBe(false);
        expect(isKashyapaRoot(123)).toBe(false);
      });
    });
  });

  describe('isKitPreventedByKashyapa function', () => {
    describe('Positive cases (कित् prevention)', () => {
      test('should prevent कित् for Kashyapa roots with सेट् क्त्वा (Devanagari)', () => {
        // Mock सेट् क्त्वा context
        const setKtvaContext = { hasSetAugment: true };
        
        expect(isKitPreventedByKashyapa('तृष्', 'इक्त्वा', setKtvaContext)).toBe(true);
        expect(isKitPreventedByKashyapa('मृष्', 'इक्त्वा', setKtvaContext)).toBe(true);
        expect(isKitPreventedByKashyapa('कृश्', 'इक्त्वा', setKtvaContext)).toBe(true);
      });

      test('should prevent कित् for Kashyapa roots with सेट् क्त्वा (IAST)', () => {
        const setKtvaContext = { hasSetAugment: true };
        
        expect(isKitPreventedByKashyapa('tṛṣ', 'iktvā', setKtvaContext)).toBe(true);
        expect(isKitPreventedByKashyapa('mṛṣ', 'iktvā', setKtvaContext)).toBe(true);
        expect(isKitPreventedByKashyapa('kṛś', 'iktvā', setKtvaContext)).toBe(true);
      });
    });

    describe('Negative cases (no कित् prevention)', () => {
      test('should not prevent कित् for non-Kashyapa roots', () => {
        const setKtvaContext = { hasSetAugment: true };
        
        expect(isKitPreventedByKashyapa('गम्', 'इक्त्वा', setKtvaContext)).toBe(false);
        expect(isKitPreventedByKashyapa('कृ', 'इक्त्वा', setKtvaContext)).toBe(false);
        expect(isKitPreventedByKashyapa('gam', 'iktvā', setKtvaContext)).toBe(false);
        expect(isKitPreventedByKashyapa('kṛ', 'iktvā', setKtvaContext)).toBe(false);
      });

      test('should not prevent कित् for Kashyapa roots with non-सेट् क्त्वा', () => {
        const nonSetContext = { hasSetAugment: false };
        
        expect(isKitPreventedByKashyapa('तृष्', 'क्त्वा', nonSetContext)).toBe(false);
        expect(isKitPreventedByKashyapa('मृष्', 'क्त्वा', nonSetContext)).toBe(false);
        expect(isKitPreventedByKashyapa('tṛṣ', 'ktvā', nonSetContext)).toBe(false);
      });

      test('should not prevent कित् for Kashyapa roots with non-क्त्वा affixes', () => {
        const setContext = { hasSetAugment: true };
        
        expect(isKitPreventedByKashyapa('तृष्', 'ति', setContext)).toBe(false);
        expect(isKitPreventedByKashyapa('मृष्', 'त', setContext)).toBe(false);
        expect(isKitPreventedByKashyapa('tṛṣ', 'ti', setContext)).toBe(false);
      });
    });

    describe('Input validation', () => {
      test('should handle invalid inputs gracefully', () => {
        expect(isKitPreventedByKashyapa('', 'क्त्वा')).toBe(false);
        expect(isKitPreventedByKashyapa('तृष्', '')).toBe(false);
        expect(isKitPreventedByKashyapa(null, 'क्त्वा')).toBe(false);
        expect(isKitPreventedByKashyapa('तृष्', null)).toBe(false);
      });
    });
  });

  describe('analyzeKashyapaException function', () => {
    describe('Detailed analysis for valid combinations', () => {
      test('should provide comprehensive analysis for तृष् + सेट् क्त्वा', () => {
        const result = analyzeKashyapaException('तृष्', 'इक्त्वा', { 
          hasSetAugment: true,
          applyKashyapaOpinion: true 
        });
        
        expect(result.applies).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.isOptional).toBe(true);
        expect(result.confidence).toBeGreaterThan(0.8);
        expect(result.analysis.isKashyapaRoot).toBe(true);
        expect(result.analysis.isSetKtva).toBe(true);
        expect(result.analysis.sutraReference).toBe('1.2.25');
        expect(result.analysis.opinion).toBe('काश्यप (Kashyapa)');
        expect(result.explanation).toContain('ऋषि काश्यप');
      });

      test('should handle optional application correctly', () => {
        // When Kashyapa opinion is not applied
        const result1 = analyzeKashyapaException('मृष्', 'इक्त्वा', { 
          hasSetAugment: true,
          applyKashyapaOpinion: false 
        });
        
        expect(result1.applies).toBe(true);
        expect(result1.preventsKit).toBe(false);
        expect(result1.explanation).toContain('not being applied');

        // When Kashyapa opinion is applied (default)
        const result2 = analyzeKashyapaException('मृष्', 'इक्त्वा', { 
          hasSetAugment: true 
        });
        
        expect(result2.applies).toBe(true);
        expect(result2.preventsKit).toBe(true);
      });
    });

    describe('Analysis for invalid combinations', () => {
      test('should reject non-Kashyapa roots', () => {
        const result = analyzeKashyapaException('गम्', 'इक्त्वा', { hasSetAugment: true });
        
        expect(result.applies).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.confidence).toBe(0);
        expect(result.analysis.isKashyapaRoot).toBe(false);
        expect(result.explanation).toContain('not one of the three roots');
      });

      test('should reject non-सेट् क्त्वा affixes', () => {
        const result = analyzeKashyapaException('तृष्', 'क्त्वा', { hasSetAugment: false });
        
        expect(result.applies).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.analysis.isKashyapaRoot).toBe(true);
        expect(result.analysis.isSetKtva).toBe(false);
        expect(result.explanation).toContain('not a सेट् क्त्वा affix');
      });
    });

    describe('Debug output', () => {
      test('should provide detailed debug information when enabled', () => {
        const result = analyzeKashyapaException('कृश्', 'इक्त्वा', { 
          hasSetAugment: true,
          debug: true 
        });
        
        expect(result.debug).toBeDefined();
        expect(Array.isArray(result.debug)).toBe(true);
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug.some(msg => msg.includes('Analyzing Sutra 1.2.25'))).toBe(true);
      });

      test('should not include debug when disabled', () => {
        const result = analyzeKashyapaException('कृश्', 'इक्त्वा', { 
          hasSetAugment: true,
          debug: false 
        });
        
        expect(result.debug).toBeUndefined();
      });
    });
  });

  describe('sutra1225 main function', () => {
    describe('Valid applications', () => {
      test('should apply sutra correctly with proper context', () => {
        const result = sutra1225('तर्षित्वा', {
          root: 'तृष्',
          affix: 'इक्त्वा',
          hasSetAugment: true,
          applyKashyapaOpinion: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.transformed).toBe('तर्षित्वा');
        expect(result.explanation).toContain('ऋषि काश्यप');
        expect(result.details.sutra).toBe('1.2.25');
        expect(result.details.type).toBe('अतिदेश');
      });

      test('should handle IAST input correctly', () => {
        const result = sutra1225('tarṣitvā', {
          root: 'tṛṣ',
          affix: 'iktvā',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.explanation).toContain('काश्यप');
      });
    });

    describe('Invalid applications', () => {
      test('should handle missing root/affix information', () => {
        const result = sutra1225('someword');
        
        expect(result.applicable).toBe(false);
        expect(result.explanation).toContain('requires explicit root and affix identification');
      });

      test('should handle invalid Sanskrit input', () => {
        const result = sutra1225('xyz123', {
          root: 'तृष्',
          affix: 'क्त्वा'
        });
        
        expect(result.applicable).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit word');
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug output when enabled', () => {
        const result = sutra1225('तर्षित्वा', {
          root: 'तृष्',
          affix: 'इक्त्वा',
          hasSetAugment: true,
          debug: true
        });
        
        expect(result.debug).toBeDefined();
        expect(Array.isArray(result.debug)).toBe(true);
        expect(result.debug.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Helper functions', () => {
    describe('getKashyapaRoots', () => {
      test('should return Devanagari roots by default', () => {
        const roots = getKashyapaRoots();
        expect(roots).toEqual(['तृष्', 'मृष्', 'कृश्']);
      });

      test('should return IAST roots when requested', () => {
        const roots = getKashyapaRoots('iast');
        expect(roots).toEqual(['tṛṣ', 'mṛṣ', 'kṛś']);
      });

      test('should return Devanagari roots for invalid script', () => {
        const roots = getKashyapaRoots('invalid');
        expect(roots).toEqual(['तृष्', 'मृष्', 'कृश्']);
      });
    });

    describe('getKashyapaExamples', () => {
      test('should provide comprehensive examples', () => {
        const examples = getKashyapaExamples();
        
        expect(examples).toHaveLength(3);
        examples.forEach(example => {
          expect(example).toHaveProperty('root');
          expect(example).toHaveProperty('affix');
          expect(example).toHaveProperty('combination');
          expect(example).toHaveProperty('meaning');
          expect(example).toHaveProperty('kashyapaEffect');
          expect(example).toHaveProperty('traditionalNote');
        });
      });

      test('should provide IAST examples when requested', () => {
        const examples = getKashyapaExamples('iast');
        
        expect(examples).toHaveLength(3);
        expect(examples[0].affix).toBe('ktvā');
        expect(examples[0].root).toBeTruthy(); // Valid IAST root
        expect(typeof examples[0].root).toBe('string');
        expect(examples[0].root.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration and edge cases', () => {
    test('should maintain consistency with other अतिदेश sutras', () => {
      // Test that this sutra follows the same pattern as other exception rules
      const result = analyzeKashyapaException('तृष्', 'इक्त्वा', { hasSetAugment: true });
      
      expect(result.isOptional).toBe(true); // All अतिदेश rules should be optional
      expect(result.analysis.type).toBe('अतिदेश');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThan(1); // Optional rules should have < 1 confidence
    });

    test('should handle whitespace and normalization', () => {
      expect(isKashyapaRoot(' तृष् ')).toBe(true);
      expect(isKashyapaRoot(' tṛṣ ')).toBe(true);
    });

    test('should demonstrate morphological effects', () => {
      const result = analyzeKashyapaException('मृष्', 'इक्त्वा', { 
        hasSetAugment: true,
        applyKashyapaOpinion: true 
      });
      
      expect(result.analysis.morphologicalEffect).toContain('Prevents accent retraction');
      expect(result.analysis.traditionalContext).toContain('difference of grammatical opinion');
    });
  });
});
