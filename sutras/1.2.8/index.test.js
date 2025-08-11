/**
 * Tests for Sutra 1.2.8: रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च
 * 
 * Tests कित् designation for क्त्वा and सन् affixes after specific roots:
 * रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्
 */

import sutra128, {
  analyzeKitDesignationSutra128,
  appliesSutra128,
  getSutra128Roots,
  getSutra128Affixes,
  getSutra128Examples
} from './index.js';

describe('Sutra 1.2.8: रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च', () => {

  describe('Core कित् designation functionality', () => {
    
    test('should designate क्त्वा as कित् after Sutra 1.2.8 roots', () => {
      // Devanagari tests
      expect(analyzeKitDesignationSutra128('रुद्', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('विद्', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('मुष्', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('गृह्', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('स्वप्', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('प्रच्छ्', 'क्त्वा').isKit).toBe(true);

      // IAST tests
      expect(analyzeKitDesignationSutra128('rud', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('vid', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('muṣ', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('gṛh', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('svap', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('pracch', 'ktvā').isKit).toBe(true);
    });

    test('should designate सन् as कित् after Sutra 1.2.8 roots', () => {
      // Devanagari tests
      expect(analyzeKitDesignationSutra128('रुद्', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('विद्', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('मुष्', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('गृह्', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('स्वप्', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('प्रच्छ्', 'सन्').isKit).toBe(true);

      // IAST tests
      expect(analyzeKitDesignationSutra128('rud', 'san').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('vid', 'san').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('muṣ', 'san').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('gṛh', 'san').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('svap', 'san').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('pracch', 'san').isKit).toBe(true);
    });

    test('should not designate other affixes as कित् after Sutra 1.2.8 roots', () => {
      // Test with non-क्त्वा/सन् affixes
      expect(analyzeKitDesignationSutra128('रुद्', 'ति').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('विद्', 'त').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('मुष्', 'अन्त').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('गृह्', 'तवत्').isKit).toBe(false);

      // IAST
      expect(analyzeKitDesignationSutra128('rud', 'ti').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('vid', 'ta').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('svap', 'anta').isKit).toBe(false);
    });

    test('should not apply to non-Sutra 1.2.8 roots', () => {
      // Test with other roots
      expect(analyzeKitDesignationSutra128('कृ', 'क्त्वा').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('गम्', 'सन्').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('दा', 'क्त्वा').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('नी', 'सन्').isKit).toBe(false);

      // IAST
      expect(analyzeKitDesignationSutra128('kṛ', 'ktvā').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('gam', 'san').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('dā', 'ktvā').isKit).toBe(false);
      expect(analyzeKitDesignationSutra128('nī', 'san').isKit).toBe(false);
    });
  });

  describe('Root variant handling', () => {
    
    test('should handle root variants correctly', () => {
      // Test variants from kit-designation utility
      expect(analyzeKitDesignationSutra128('रुद', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('विद', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('गृह', 'क्त्वा').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('ग्रह्', 'सन्').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('स्वप', 'क्त्वा').isKit).toBe(true);

      // IAST variants
      expect(analyzeKitDesignationSutra128('ruda', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('vida', 'san').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('gṛha', 'ktvā').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('grah', 'san').isKit).toBe(true);
    });
  });

  describe('Affix variant handling', () => {
    
    test('should handle क्त्वा variants', () => {
      expect(analyzeKitDesignationSutra128('रुद्', 'क्त्व').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('विद्', 'त्वा').isKit).toBe(true);
      
      // IAST
      expect(analyzeKitDesignationSutra128('rud', 'ktva').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('vid', 'tvā').isKit).toBe(true);
    });

    test('should handle सन् variants', () => {
      expect(analyzeKitDesignationSutra128('मुष्', 'स').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('गृह्', 'सि').isKit).toBe(true);
      
      // IAST
      expect(analyzeKitDesignationSutra128('muṣ', 'sa').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('gṛh', 'si').isKit).toBe(true);
    });
  });

  describe('appliesSutra128 function', () => {
    
    test('should correctly identify applicable combinations', () => {
      expect(appliesSutra128('रुद्', 'क्त्वा')).toBe(true);
      expect(appliesSutra128('विद्', 'सन्')).toBe(true);
      expect(appliesSutra128('मुष्', 'क्त्वा')).toBe(true);
      
      expect(appliesSutra128('rud', 'ktvā')).toBe(true);
      expect(appliesSutra128('vid', 'san')).toBe(true);
    });

    test('should reject non-applicable combinations', () => {
      expect(appliesSutra128('कृ', 'क्त्वा')).toBe(false);
      expect(appliesSutra128('रुद्', 'ति')).toBe(false);
      expect(appliesSutra128('गम्', 'सन्')).toBe(false);
      
      expect(appliesSutra128('kṛ', 'ktvā')).toBe(false);
      expect(appliesSutra128('rud', 'ti')).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(appliesSutra128('', 'क्त्वा')).toBe(false);
      expect(appliesSutra128('रुद्', '')).toBe(false);
      expect(appliesSutra128(null, 'क्त्वा')).toBe(false);
      expect(appliesSutra128('रुद्', null)).toBe(false);
    });
  });

  describe('Utility functions', () => {
    
    describe('getSutra128Roots', () => {
      
      test('should return correct roots in different scripts', () => {
        const devanagariRoots = getSutra128Roots('devanagari');
        expect(devanagariRoots).toEqual(['रुद्', 'विद्', 'मुष्', 'गृह्', 'स्वप्', 'प्रच्छ्']);
        
        const iastRoots = getSutra128Roots('iast');
        expect(iastRoots).toEqual(['rud', 'vid', 'muṣ', 'gṛh', 'svap', 'pracch']);
        
        const meanings = getSutra128Roots('meanings');
        expect(meanings).toHaveLength(6);
        expect(meanings[0]).toMatch(/weep|cry/);
        expect(meanings[1]).toMatch(/know|find/);
      });

      test('should return both scripts by default', () => {
        const both = getSutra128Roots();
        expect(both).toHaveProperty('devanagari');
        expect(both).toHaveProperty('iast');
        expect(both).toHaveProperty('meanings');
        expect(both.devanagari).toHaveLength(6);
        expect(both.iast).toHaveLength(6);
      });
    });

    describe('getSutra128Affixes', () => {
      
      test('should return correct affixes in different scripts', () => {
        const devanagariAffixes = getSutra128Affixes('devanagari');
        expect(devanagariAffixes).toEqual(['क्त्वा', 'सन्']);
        
        const iastAffixes = getSutra128Affixes('iast');
        expect(iastAffixes).toEqual(['ktvā', 'san']);
        
        const descriptions = getSutra128Affixes('descriptions');
        expect(descriptions).toHaveLength(2);
        expect(descriptions[0]).toMatch(/Absolutive|gerund/);
        expect(descriptions[1]).toMatch(/Desiderative/);
      });
    });

    describe('getSutra128Examples', () => {
      
      test('should provide practical examples', () => {
        const examples = getSutra128Examples();
        expect(examples).toHaveLength(4);
        
        examples.forEach(example => {
          expect(example).toHaveProperty('root');
          expect(example).toHaveProperty('affix');
          expect(example).toHaveProperty('result');
          expect(example).toHaveProperty('meaning');
          expect(example).toHaveProperty('explanation');
        });
      });

      test('should provide script-specific examples', () => {
        const devExamples = getSutra128Examples('devanagari');
        expect(typeof devExamples[0].root).toBe('string');
        expect(devExamples[0].root).toMatch(/[रुद्विद्मुष्गृह्स्वप्प्रच्छ्]/);
        
        const iastExamples = getSutra128Examples('iast');
        expect(typeof iastExamples[0].root).toBe('string');
        expect(iastExamples[0].root).toMatch(/[rudvidmuṣgṛhsvappracch]/);
      });
    });
  });

  describe('Main sutra128 function', () => {
    
    test('should handle separate root and affix parameters', () => {
      const result = sutra128('रुद्', 'क्त्वा');
      expect(result.isKit).toBe(true);
      expect(result.applies).toBe(true);
      expect(result.sutra).toBe('1.2.8');
    });

    test('should handle combined root+affix input', () => {
      const result1 = sutra128('रुद्+क्त्वा');
      expect(result1.isKit).toBe(true);
      
      const result2 = sutra128('विद्-सन्');
      expect(result2.isKit).toBe(true);
      
      const result3 = sutra128('मुष्_क्त्वा');
      expect(result3.isKit).toBe(true);
    });

    test('should provide comprehensive analysis', () => {
      const result = sutra128('स्वप्', 'क्त्वा');
      expect(result).toHaveProperty('isKit');
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('root');
      expect(result).toHaveProperty('affix');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('effect');
    });

    test('should handle invalid inputs gracefully', () => {
      const result1 = sutra128('invalidinput');
      expect(result1).toHaveProperty('error');
      
      const result2 = sutra128('', '');
      expect(result2).toHaveProperty('error');
      
      const result3 = sutra128(null, null);
      expect(result3).toHaveProperty('error');
    });
  });

  describe('Response format validation', () => {
    
    test('should return consistent response format for valid inputs', () => {
      const result = analyzeKitDesignationSutra128('रुद्', 'क्त्वा');
      
      expect(result).toHaveProperty('isKit');
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('root');
      expect(result).toHaveProperty('affix');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('effect');
      
      expect(typeof result.isKit).toBe('boolean');
      expect(typeof result.applies).toBe('boolean');
      expect(typeof result.root).toBe('string');
      expect(typeof result.affix).toBe('string');
      expect(typeof result.sutra).toBe('string');
      expect(typeof result.description).toBe('string');
      expect(typeof result.effect).toBe('string');
    });

    test('should return consistent error format for invalid inputs', () => {
      const result = analyzeKitDesignationSutra128(null, null);
      
      expect(result).toHaveProperty('isKit');
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('error');
      
      expect(result.isKit).toBe(false);
      expect(result.applies).toBe(false);
      expect(typeof result.error).toBe('string');
    });
  });

  describe('Integration with kit-designation utility', () => {
    
    test('should leverage shared utility functions', () => {
      // These tests verify that our sutra correctly uses the shared utilities
      const result1 = analyzeKitDesignationSutra128('रुद्', 'क्त्वा');
      const result2 = analyzeKitDesignationSutra128('कृ', 'क्त्वा');
      const result3 = analyzeKitDesignationSutra128('रुद्', 'ति');
      
      expect(result1.isKit).toBe(true);  // Should work
      expect(result2.isKit).toBe(false); // Wrong root
      expect(result3.isKit).toBe(false); // Wrong affix
      
      expect(result1.applies).toBe(true);
      expect(result2.applies).toBe(false);
      expect(result3.applies).toBe(false);
    });
  });

  describe('Linguistic accuracy tests', () => {
    
    test('should handle classical Sanskrit examples', () => {
      // Test classical formations
      const examples = [
        { root: 'रुद्', affix: 'क्त्वा', expected: true, note: 'ruditvā - having wept' },
        { root: 'विद्', affix: 'सन्', expected: true, note: 'vividiṣā - desire to know' },
        { root: 'मुष्', affix: 'क्त्वा', expected: true, note: 'muṣitvā - having stolen' },
        { root: 'गृह्', affix: 'सन्', expected: true, note: 'jigṛkṣā - desire to seize' },
        { root: 'स्वप्', affix: 'क्त्वा', expected: true, note: 'suptvā - having slept' },
        { root: 'प्रच्छ्', affix: 'सन्', expected: true, note: 'pipṛcchiṣā - desire to ask' }
      ];

      examples.forEach(({ root, affix, expected, note }) => {
        const result = analyzeKitDesignationSutra128(root, affix);
        expect(result.isKit).toBe(expected);
        expect(result.applies).toBe(true);
      });
    });

    test('should maintain morphological consistency', () => {
      // Ensure that कित् designation prevents guṇa/vṛddhi as expected
      const kitResult = analyzeKitDesignationSutra128('रुद्', 'क्त्वा');
      expect(kitResult.isKit).toBe(true);
      expect(kitResult.effect).toMatch(/preventing guṇa\/vṛddhi/);
    });
  });

  describe('Performance and edge cases', () => {
    
    test('should handle large batch processing efficiently', () => {
      const testCases = [];
      const roots = getSutra128Roots('devanagari');
      const affixes = getSutra128Affixes('devanagari');
      
      // Generate test cases
      roots.forEach(root => {
        affixes.forEach(affix => {
          testCases.push([root, affix]);
        });
      });
      
      const startTime = Date.now();
      const results = testCases.map(([root, affix]) => 
        analyzeKitDesignationSutra128(root, affix)
      );
      const endTime = Date.now();
      
      // All should be कित्
      results.forEach(result => {
        expect(result.isKit).toBe(true);
        expect(result.applies).toBe(true);
      });
      
      // Should complete reasonably quickly (less than 100ms for 12 combinations)
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should handle whitespace and formatting variations', () => {
      expect(analyzeKitDesignationSutra128('  रुद्  ', '  क्त्वा  ').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('\tविद्\t', '\tसन्\t').isKit).toBe(true);
      expect(analyzeKitDesignationSutra128('\nमुष्\n', '\nक्त्वा\n').isKit).toBe(true);
    });
  });
});
