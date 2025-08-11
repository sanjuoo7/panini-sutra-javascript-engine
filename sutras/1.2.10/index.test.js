/**
 * Test Suite for Sutra 1.2.10: हलन्ताच्च
 * 
 * Tests the implementation of Sutra 1.2.10 which makes सन् affixes कित् 
 * after हल्-ending (consonant-ending) roots.
 * 
 * Test Categories:
 * 1. Positive cases (सन् after हल्-ending roots)
 * 2. Negative cases (non-applicability) 
 * 3. Edge cases and error handling
 * 4. Integration with kit-designation utility
 * 5. Multi-script support (Devanagari and IAST)
 * 
 * Created: December 2025
 */

import { 
  sutra1210, 
  checkSutra1210Applicability, 
  analyzeSutra1210,
  metadata 
} from './index.js';

describe('Sutra 1.2.10: हलन्ताच्च (halantācca)', () => {

  describe('Positive Cases - हल्-ending roots with सन् affixes', () => {
    
    test('should apply to भज् root with सन् affix', () => {
      const result = sutra1210('भजिषति', { 
        root: 'भज्', 
        affix: 'सि',
        debug: true 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('हलन्ताच्च');
      expect(result.details.analysis.rootEndsWithHal).toBe(true);
      expect(result.details.analysis.affixIsSan).toBe(true);
    });

    test('should apply to हन् root with सन् affix', () => {
      const result = sutra1210('जिघांसति', { 
        root: 'हन्', 
        affix: 'स',
        debug: true 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('हलन्ताच्च');
      expect(result.details.root).toBe('हन्');
      expect(result.details.affix).toBe('स');
    });

    test('should apply to गम् root with सन् affix', () => {
      const result = sutra1210('जिगमिषति', { 
        root: 'गम्', 
        affix: 'सि',
        debug: true 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('सन् affix "सि" is कित्');
      expect(result.details.analysis.rootEndsWithHal).toBe(true);
    });

    test('should apply to यम् root with सन् affix', () => {
      const result = sutra1210('यियमिषति', { 
        root: 'यम्', 
        affix: 'सि' 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.details.type).toBe('कित्त्वातिदेश');
    });

    test('should apply to कृष् root with सन् affix', () => {
      const result = sutra1210('चिकर्षति', { 
        root: 'कृष्', 
        affix: 'सि' 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('हल्-ending root');
    });
  });

  describe('Positive Cases - IAST script', () => {
    
    test('should apply to bhaj root with san affix in IAST', () => {
      const result = sutra1210('bhajiṣati', { 
        root: 'bhaj', 
        affix: 'si' 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.details.analysis.script).toBe('IAST');
      expect(result.explanation).toContain('halantācca');
    });

    test('should apply to han root with san affix in IAST', () => {
      const result = sutra1210('jighāṃsati', { 
        root: 'han', 
        affix: 's' 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.details.analysis.rootEndsWithHal).toBe(true);
    });

    test('should apply to gam root with san affix in IAST', () => {
      const result = sutra1210('jigamiṣati', { 
        root: 'gam', 
        affix: 'si' 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('san affix');
    });
  });

  describe('Negative Cases - Non-applicability', () => {
    
    test('should not apply to vowel-ending roots', () => {
      // इक्-ending roots should use Sutra 1.2.9, not 1.2.10
      const result = sutra1210('कृ', { 
        root: 'कृ', 
        affix: 'स' 
      });
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('does not end with a consonant');
    });

    test('should not apply to roots ending with vowels', () => {
      const result = sutra1210('भू', { 
        root: 'भू', 
        affix: 'सि' 
      });
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('does not end with a consonant');
    });

    test('should not apply with non-सन् affixes', () => {
      const result = sutra1210('भजति', { 
        root: 'भज्', 
        affix: 'ति' 
      });
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('is not a सन्');
    });

    test('should not apply to क्त्वा affixes', () => {
      const result = sutra1210('भज्', { 
        root: 'भज्', 
        affix: 'क्त्वा' 
      });
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('is not a सन्');
    });

    test('should not apply to तिप् affixes', () => {
      const result = sutra1210('भजति', { 
        root: 'भज्', 
        affix: 'तिप्' 
      });
      
      expect(result.applicable).toBe(false);
      expect(result.details.analysis.affixIsSan).toBe(false);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    
    test('should handle empty input gracefully', () => {
      const result = sutra1210('');
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('empty');
    });

    test('should handle null input gracefully', () => {
      const result = sutra1210(null);
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('Invalid input');
    });

    test('should handle undefined input gracefully', () => {
      const result = sutra1210(undefined);
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('Invalid input');
    });

    test('should handle non-Sanskrit input', () => {
      const result = sutra1210('hello');
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('does not end with a consonant');
    });

    test('should handle whitespace-only input', () => {
      const result = sutra1210('   ');
      
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('empty');
    });

    test('should handle missing root or affix gracefully', () => {
      const result = sutra1210('भजति');
      
      // Should attempt to parse but may not be applicable
      expect(result).toHaveProperty('applicable');
      expect(result).toHaveProperty('explanation');
    });

    test('should handle complex words with morphological analysis', () => {
      const result = sutra1210('जिगमिषति');
      
      // Should attempt to identify root and affix
      expect(result).toHaveProperty('applicable');
      expect(result.debug).toBeDefined();
    });
  });

  describe('checkSutra1210Applicability Function', () => {
    
    test('should return true for valid हल्-ending root + सन् combinations', () => {
      expect(checkSutra1210Applicability('भज्', 'सि')).toBe(true);
      expect(checkSutra1210Applicability('हन्', 'स')).toBe(true);
      expect(checkSutra1210Applicability('गम्', 'सन्')).toBe(true);
    });

    test('should return false for invalid combinations', () => {
      expect(checkSutra1210Applicability('कृ', 'सि')).toBe(false); // vowel-ending root
      expect(checkSutra1210Applicability('भज्', 'ति')).toBe(false); // non-सन् affix
      expect(checkSutra1210Applicability('भू', 'स')).toBe(false); // vowel-ending root
    });

    test('should return false for empty inputs', () => {
      expect(checkSutra1210Applicability('', 'सि')).toBe(false);
      expect(checkSutra1210Applicability('भज्', '')).toBe(false);
      expect(checkSutra1210Applicability('', '')).toBe(false);
    });

    test('should return false for null/undefined inputs', () => {
      expect(checkSutra1210Applicability(null, 'सि')).toBe(false);
      expect(checkSutra1210Applicability('भज्', null)).toBe(false);
      expect(checkSutra1210Applicability(undefined, undefined)).toBe(false);
    });

    test('should work with IAST script', () => {
      expect(checkSutra1210Applicability('bhaj', 'si')).toBe(true);
      expect(checkSutra1210Applicability('han', 's')).toBe(true);
      expect(checkSutra1210Applicability('kṛ', 'si')).toBe(false); // vowel-ending
    });
  });

  describe('analyzeSutra1210 Function', () => {
    
    test('should provide detailed analysis for applicable cases', () => {
      const analysis = analyzeSutra1210('भज्', 'सि');
      
      expect(analysis.applies).toBe(true);
      expect(analysis.conditions.rootEndsWithHal).toBe(true);
      expect(analysis.conditions.affixIsSan).toBe(true);
      expect(analysis.reasoning).toContain('Root "भज्" ends with हल् (consonant)');
      expect(analysis.reasoning).toContain('Affix "सि" is सन् (desiderative)');
      expect(analysis.reasoning.some(r => r.includes('Sutra 1.2.10 applies:'))).toBe(true);
    });

    test('should provide detailed analysis for non-applicable cases', () => {
      const analysis = analyzeSutra1210('कृ', 'ति');
      
      expect(analysis.applies).toBe(false);
      expect(analysis.conditions.rootEndsWithHal).toBe(false);
      expect(analysis.conditions.affixIsSan).toBe(false);
      expect(analysis.reasoning.some(r => r.includes('does not end with हल् (consonant)'))).toBe(true);
      expect(analysis.reasoning.some(r => r.includes('is not सन् (desiderative)'))).toBe(true);
      expect(analysis.reasoning.some(r => r.includes('does not apply'))).toBe(true);
    });

    test('should handle invalid inputs in analysis', () => {
      const analysis = analyzeSutra1210('', '');
      
      expect(analysis.applies).toBe(false);
      expect(analysis.reasoning).toContain('Invalid input: both root and affix required');
    });

    test('should provide analysis for mixed validity', () => {
      const analysis = analyzeSutra1210('भज्', 'ति');
      
      expect(analysis.applies).toBe(false);
      expect(analysis.conditions.rootEndsWithHal).toBe(true);
      expect(analysis.conditions.affixIsSan).toBe(false);
    });

    test('should work with IAST script in analysis', () => {
      const analysis = analyzeSutra1210('bhaj', 'si');
      
      expect(analysis.applies).toBe(true);
      expect(analysis.conditions.rootEndsWithHal).toBe(true);
      expect(analysis.conditions.affixIsSan).toBe(true);
    });
  });

  describe('Integration with Kit-Designation Utility', () => {
    
    test('should integrate with shared kit-designation functions', () => {
      const result = sutra1210('भजिषति', { 
        root: 'भज्', 
        affix: 'सि',
        debug: true 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.debug.some(msg => msg.includes('kit-designation') || msg.includes('हल्-ending'))).toBe(true);
    });

    test('should use kit-designation as fallback', () => {
      // Test a case where kit-designation utility is used
      const result = sutra1210('भजिसति', { 
        root: 'भज्', 
        affix: 'सन्',
        debug: true 
      });
      
      expect(result.applicable).toBe(true);
    });

    test('should handle kit-designation utility errors gracefully', () => {
      // Test with potentially problematic input
      const result = sutra1210('invalid', { 
        root: '', 
        affix: '',
        debug: true 
      });
      
      expect(result).toHaveProperty('applicable');
      expect(result).toHaveProperty('explanation');
    });
  });

  describe('Debug and Context Features', () => {
    
    test('should provide debug information when requested', () => {
      const result = sutra1210('भजिषति', { 
        root: 'भज्', 
        affix: 'सि',
        debug: true 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.debug.some(msg => msg.includes('[1.2.10]'))).toBe(true);
    });

    test('should not include debug information when not requested', () => {
      const result = sutra1210('भजिषति', { 
        root: 'भज्', 
        affix: 'सि',
        debug: false 
      });
      
      expect(result.debug).toEqual([]);
    });

    test('should include comprehensive details object', () => {
      const result = sutra1210('भजिषति', { 
        root: 'भज्', 
        affix: 'सि' 
      });
      
      expect(result.details).toBeDefined();
      expect(result.details.sutra).toBe('1.2.10');
      expect(result.details.sutraText).toBe('हलन्ताच्च');
      expect(result.details.transliteration).toBe('halantācca');
      expect(result.details.type).toBe('कित्त्वातिदेश');
      expect(result.details.root).toBe('भज्');
      expect(result.details.affix).toBe('सि');
      expect(result.details.analysis).toBeDefined();
    });
  });

  describe('Metadata and Exports', () => {
    
    test('should export correct metadata', () => {
      expect(metadata).toBeDefined();
      expect(metadata.sutra).toBe('1.2.10');
      expect(metadata.sutraText).toBe('हलन्ताच्च');
      expect(metadata.transliteration).toBe('halantācca');
      expect(metadata.category).toBe('कित्त्वातिदेश');
      expect(metadata.dependencies).toContain('1.2.9');
      expect(metadata.relatedSutras).toContain('1.2.8');
      expect(metadata.relatedSutras).toContain('1.2.9');
    });

    test('should have complete implementation metadata', () => {
      expect(metadata.implementation).toBeDefined();
      expect(metadata.implementation.status).toBe('Complete');
      expect(metadata.implementation.functions).toContain('sutra1210');
      expect(metadata.implementation.functions).toContain('checkSutra1210Applicability');
      expect(metadata.implementation.functions).toContain('analyzeSutra1210');
      expect(metadata.implementation.utilities).toContain('endsWithHal');
      expect(metadata.implementation.utilities).toContain('isSanAffix');
    });

    test('should define scope and conditions correctly', () => {
      expect(metadata.scope).toBeDefined();
      expect(metadata.scope.conditions).toContain('हल्-ending roots');
      expect(metadata.scope.conditions).toContain('सन् affix');
      expect(metadata.scope.effects).toContain('कित् designation');
    });
  });

  describe('Comparison with Related Sutras', () => {
    
    test('should complement Sutra 1.2.9 (इको झल्)', () => {
      // 1.2.9 applies to इक्-ending roots, 1.2.10 to हल्-ending roots
      
      // This should NOT apply to 1.2.10 (vowel-ending root)
      const vowelResult = sutra1210('कृषति', { 
        root: 'कृ', 
        affix: 'स' 
      });
      expect(vowelResult.applicable).toBe(false);
      
      // This SHOULD apply to 1.2.10 (consonant-ending root)
      const consonantResult = sutra1210('भजिषति', { 
        root: 'भज्', 
        affix: 'सि' 
      });
      expect(consonantResult.applicable).toBe(true);
    });

    test('should be distinct from Sutra 1.2.8 specificity', () => {
      // 1.2.8 is for specific roots with क्त्वा/सन्
      // 1.2.10 is general for हल्-ending roots with सन्
      
      const result = sutra1210('गमिषति', { 
        root: 'गम्', 
        affix: 'सि' 
      });
      
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('हलन्ताच्च');
    });
  });

  describe('Performance and Robustness', () => {
    
    test('should handle multiple rapid calls efficiently', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        sutra1210('भजिषति', { root: 'भज्', affix: 'सि' });
      }
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
    });

    test('should handle various root-affix combinations', () => {
      const testCases = [
        { root: 'भज्', affix: 'सि', expected: true },
        { root: 'हन्', affix: 'स', expected: true },
        { root: 'गम्', affix: 'सन्', expected: true },
        { root: 'कृ', affix: 'सि', expected: false },
        { root: 'भू', affix: 'स', expected: false },
        { root: 'भज्', affix: 'ति', expected: false }
      ];
      
      testCases.forEach(({ root, affix, expected }) => {
        const result = checkSutra1210Applicability(root, affix);
        expect(result).toBe(expected);
      });
    });

    test('should maintain consistency across script types', () => {
      // Same logical combinations in different scripts should behave consistently
      const devResult = checkSutra1210Applicability('भज्', 'सि');
      const iastResult = checkSutra1210Applicability('bhaj', 'si');
      
      expect(devResult).toBe(iastResult);
      expect(devResult).toBe(true);
    });
  });
});
