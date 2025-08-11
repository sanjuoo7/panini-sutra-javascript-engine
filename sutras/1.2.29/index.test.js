/**
 * Tests for Sutra 1.2.29: उच्चैरुदात्तः
 * 
 * Tests the implementation of the definitional rule for udātta (high tone) accent
 */

import {
  sutra1229,
  isUdatta,
  applyUdattaDesignation,
  analyzeUdattaDesignation
} from './index.js';

describe('Sutra 1.2.29: उच्चैरुदात्तः (uccairudāttaḥ)', () => {

  describe('Core functionality - sutra1229', () => {
    test('should identify vowels with explicit udātta marks', () => {
      const result = sutra1229('á');
      expect(result.applies).toBe(true);
      expect(result.designation).toBe('उदात्त');
      expect(result.reason).toContain('explicit udātta accent mark');
      expect(result.analysis.hasUdattaMark).toBe(true);
      expect(result.analysis.confidence).toBe(1.0);
    });

    test('should work with long vowels with udātta marks', () => {
      const result = sutra1229('ā́');
      expect(result.applies).toBe(true);
      expect(result.designation).toBe('उदात्त');
      expect(result.baseVowel).toBe('ā');
    });

    test('should work with complex vowels (diphthongs)', () => {
      const result = sutra1229('aí');
      expect(result.applies).toBe(true);
      expect(result.designation).toBe('उदात्त');
      expect(result.baseVowel).toBe('ai');
    });

    test('should reject vowels with anudātta marks', () => {
      const result = sutra1229('à');
      expect(result.applies).toBe(false);
      expect(result.designation).toBe(null);
      expect(result.reason).toContain('anudātta accent');
      expect(result.analysis.toneHeight).toBe('low');
    });

    test('should reject unmarked vowels in default mode', () => {
      const result = sutra1229('a');
      expect(result.applies).toBe(false);
      expect(result.designation).toBe(null);
      expect(result.reason).toContain('lacks explicit udātta marking');
    });

    test('should handle vowels with svarita marks', () => {
      const result = sutra1229('â');
      expect(result.applies).toBe(false);
      expect(result.designation).toBe(null);
      expect(result.reason).toContain('lacks explicit udātta marking');
    });
  });

  describe('Input validation', () => {
    test('should reject non-string input', () => {
      const result = sutra1229(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should reject empty string', () => {
      const result = sutra1229('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should reject consonants', () => {
      const result = sutra1229('k');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid vowel input');
    });

    test('should reject non-vowel strings', () => {
      const result = sutra1229('xyz');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid vowel input');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle script specification', () => {
      const result = sutra1229('á', { script: 'IAST' });
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });

    test('should handle strict accent marking mode', () => {
      const result = sutra1229('a', { strictAccentMarking: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('lacks explicit udātta marking');
    });

    test('should handle phonetic context with high tone detection', () => {
      const context = {
        phoneticContext: 'Root with udātta accent on final vowel',
        detectHighTone: true
      };
      const result = sutra1229('a', context);
      expect(result.applies).toBe(true);
      expect(result.reason).toContain('Phonetic context suggests high tone');
      // The method property is not exposed in the main analysis object
      expect(result.reason).toContain('udātta');
    });

    test('should handle phonetic context without high tone indicators', () => {
      const context = {
        phoneticContext: 'Normal phonetic environment',
        detectHighTone: true
      };
      const result = sutra1229('a', context);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('lacks explicit udātta marking');
    });

    test('should detect high tone from acute accent notation', () => {
      const context = {
        phoneticContext: 'Vowel with acute accent marking high tone',
        detectHighTone: true
      };
      const result = sutra1229('a', context);
      expect(result.applies).toBe(true);
      expect(result.analysis.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('All vowel types', () => {
    const udattaVowels = ['á', 'í', 'ú', 'é', 'ó', 'ā́', 'ī́', 'ū́', 'aí', 'aú', 'ṛ́', 'ṝ́'];
    
    test.each(udattaVowels)('should recognize %s as udātta', (vowel) => {
      const result = sutra1229(vowel);
      expect(result.applies).toBe(true);
      expect(result.designation).toBe('उदात्त');
    });

    const nonUdattaVowels = ['a', 'i', 'u', 'e', 'o', 'ā', 'ī', 'ū', 'ai', 'au', 'ṛ', 'ṝ'];
    
    test.each(nonUdattaVowels)('should not recognize unmarked %s as udātta', (vowel) => {
      const result = sutra1229(vowel);
      expect(result.applies).toBe(false);
      expect(result.designation).toBe(null);
    });

    const anudattaVowels = ['à', 'ì', 'ù', 'è', 'ò', 'ā̀', 'ī̀', 'ū̀', 'aì', 'aù'];
    
    test.each(anudattaVowels)('should explicitly reject %s as udātta (anudātta)', (vowel) => {
      const result = sutra1229(vowel);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('anudātta');
    });
  });

  describe('Response structure', () => {
    test('should return complete response structure for positive case', () => {
      const result = sutra1229('á');
      
      expect(result).toHaveProperty('applies', true);
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra', '1.2.29');
      expect(result).toHaveProperty('designation', 'उदात्त');
      expect(result).toHaveProperty('input', 'á');
      expect(result).toHaveProperty('baseVowel', 'a');
      expect(result).toHaveProperty('script');
      expect(result).toHaveProperty('accentMarks');
      expect(result).toHaveProperty('analysis');
      expect(result).toHaveProperty('examples');
      
      expect(result.analysis).toHaveProperty('hasUdattaMark');
      expect(result.analysis).toHaveProperty('accentType');
      expect(result.analysis).toHaveProperty('toneHeight');
      expect(result.analysis).toHaveProperty('confidence');
    });

    test('should return appropriate structure for negative case', () => {
      const result = sutra1229('a');
      
      expect(result.applies).toBe(false);
      expect(result.designation).toBe(null);
      expect(result.examples).toBe(null);
      expect(result.reason).toBeDefined();
    });
  });

  describe('Examples generation', () => {
    test('should generate appropriate examples for udātta vowels', () => {
      const result = sutra1229('á');
      
      expect(result.examples).toBeDefined();
      expect(result.examples.baseVowel).toBe('a');
      expect(result.examples.udattaForm.normalize('NFD')).toContain('\u0301'); // acute accent
      expect(result.examples.usage).toContain('udātta');
      expect(result.examples.description).toContain('1.2.29');
      expect(result.examples.traditionalExample).toBeDefined();
    });

    test('should provide traditional examples for common vowels', () => {
      const resultA = sutra1229('á');
      expect(resultA.examples.traditionalExample).toContain('अग्ने́');
      
      const resultI = sutra1229('í');
      expect(resultI.examples.traditionalExample).toContain('अग्नि́');
    });
  });

  describe('Convenience functions', () => {
    test('isUdatta should work as a simple boolean check', () => {
      expect(isUdatta('á')).toBe(true);
      expect(isUdatta('a')).toBe(false);
      expect(isUdatta('à')).toBe(false);
    });

    test('isUdatta should accept context options', () => {
      const context = {
        phoneticContext: 'udātta accent specified',
        detectHighTone: true
      };
      expect(isUdatta('a', context)).toBe(true);
    });

    test('applyUdattaDesignation should add udātta accent', () => {
      const aResult = applyUdattaDesignation('a');
      const iResult = applyUdattaDesignation('i');
      const aLongResult = applyUdattaDesignation('ā');
      
      // Check for acute accent (á, í, ā́) - normalize and compare  
      expect(aResult.normalize('NFD')).toContain('\u0301'); // acute combining
      expect(iResult.normalize('NFD')).toContain('\u0301');
      expect(aLongResult.normalize('NFD')).toContain('\u0301');
    });

    test('applyUdattaDesignation should reject non-vowels', () => {
      expect(() => applyUdattaDesignation('k')).toThrow('Input must be a vowel');
    });

    test('applyUdattaDesignation should work with different scripts', () => {
      expect(applyUdattaDesignation('a', 'DEVANAGARI')).toBe('a\u0951');
    });
  });

  describe('analyzeUdattaDesignation', () => {
    test('should provide comprehensive analysis', () => {
      const result = analyzeUdattaDesignation('á');
      
      expect(result).toHaveProperty('sutraReference');
      expect(result).toHaveProperty('traditionalInterpretation');
      expect(result.sutraReference.number).toBe('1.2.29');
      expect(result.sutraReference.sanskrit).toBe('उच्चैरुदात्तः');
      expect(result.traditionalInterpretation.principle).toContain('उच्चैः');
    });

    test('should include all basic analysis properties', () => {
      const result = analyzeUdattaDesignation('á');
      
      expect(result.applies).toBe(true);
      expect(result.designation).toBe('उदात्त');
      expect(result.sutra).toBe('1.2.29');
    });
  });

  describe('Multi-script support', () => {
    test('should handle IAST script correctly', () => {
      const result = sutra1229('á', { script: 'IAST' });
      expect(result.script).toBe('IAST');
      expect(result.applies).toBe(true);
    });

    test('should auto-detect script when not specified', () => {
      const result = sutra1229('á');
      expect(result.script).toBe('IAST');
    });

    // Note: Full Devanagari testing would require actual Devanagari input
    // This tests the framework is in place
    test('should accept Devanagari script specification', () => {
      const result = sutra1229('á', { script: 'Devanagari' });
      expect(result.script).toBe('Devanagari');
    });
  });

  describe('Edge cases', () => {
    test('should handle vowels with multiple accent marks gracefully', () => {
      // This vowel has both udātta (acute) and anudātta (grave) marks
      // Technically invalid, but should handle gracefully
      const result = sutra1229('á̀');
      expect(result.applies).toBe(false); // Should be invalid input
      expect(result.reason).toContain('Invalid vowel input');
    });

    test('should handle very long vowel input', () => {
      const result = sutra1229('ṝ́');
      expect(result.applies).toBe(true);
      expect(result.baseVowel).toBe('ṝ');
    });

    test('should handle special characters around vowel', () => {
      const result = sutra1229(' á ');
      expect(result.applies).toBe(true);
      expect(result.baseVowel.trim()).toBe('a');
    });
  });

  describe('Performance and consistency', () => {
    test('should be consistent across multiple calls', () => {
      const vowel = 'á';
      const result1 = sutra1229(vowel);
      const result2 = sutra1229(vowel);
      const result3 = sutra1229(vowel);
      
      expect(result1.applies).toBe(result2.applies);
      expect(result2.applies).toBe(result3.applies);
      expect(result1.designation).toBe(result2.designation);
    });

    test('should handle rapid successive calls', () => {
      const vowels = ['á', 'í', 'ú', 'é', 'ó'];
      const results = vowels.map(v => sutra1229(v));
      
      results.forEach(result => {
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('उदात्त');
      });
    });
  });
});
