/**
 * Test suite for Sutra 1.2.30: नीचैरनुदात्तः (nīcairanudāttaḥ)
 * Tests the implementation of anudātta (low tone) accent designation
 */

import { describe, test, expect } from '@jest/globals';
import sutra1230, { 
  isAnudatta, 
  applyAnudattaDesignation, 
  analyzeAnudattaDesignation 
} from './index.js';

describe('Sutra 1.2.30: नीचैरनुदात्तः (nīcairanudāttaḥ)', () => {
  
  describe('Basic Functionality', () => {
    test('should identify explicit anudātta vowels in IAST', () => {
      const testCases = [
        'à',    // a with grave accent
        'ì',    // i with grave accent
        'ù',    // u with grave accent
        'è',    // e with grave accent
        'ò',    // o with grave accent
        'ā̀',    // ā with grave accent
        'ī̀',    // ī with grave accent
        'ū̀',    // ū with grave accent
        'aì',   // ai with grave accent on i
        'aù',   // au with grave accent on u
        'ṛ̀',    // ṛ with grave accent
        'ṝ̀'     // ṝ with grave accent
      ];

      testCases.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('अनुदात्त');
        expect(result.analysis.hasAnudattaMark).toBe(true);
        expect(result.analysis.toneHeight).toBe('low');
        expect(result.reason).toContain('anudātta accent mark');
      });
    });

    test('should identify explicit anudātta vowels in Devanagari', () => {
      const testCases = [
        'अ॒',    // अ with anudātta mark
        'इ॒',    // इ with anudātta mark
        'उ॒',    // उ with anudātta mark
        'ए॒',    // ए with anudātta mark
        'ओ॒',    // ओ with anudātta mark
        'आ॒',    // आ with anudātta mark
        'ई॒',    // ई with anudātta mark
        'ऊ॒',    // ऊ with anudātta mark
        'ऋ॒',    // ऋ with anudātta mark
        'ऌ॒'     // ऌ with anudātta mark
      ];

      testCases.forEach(vowel => {
        const result = sutra1230(vowel, { script: 'Devanagari' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('अनुदात्त');
        expect(result.analysis.hasAnudattaMark).toBe(true);
        expect(result.analysis.toneHeight).toBe('low');
        expect(result.script).toBe('Devanagari');
      });
    });

    test('should reject vowels with udātta accent', () => {
      const testCases = [
        'á',    // a with acute accent (udātta)
        'í',    // i with acute accent (udātta)
        'ú',    // u with acute accent (udātta)
        'é',    // e with acute accent (udātta)
        'ó',    // o with acute accent (udātta)
        'ā́',    // ā with acute accent (udātta)
        'ī́',    // ī with acute accent (udātta)
        'ū́'     // ū with acute accent (udātta)
      ];

      testCases.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result.applies).toBe(false);
        expect(result.designation).toBe(null);
        expect(result.analysis.toneHeight).toBe('high');
        expect(result.reason).toContain('udātta accent');
      });
    });

    test('should reject vowels with svarita accent', () => {
      const testCases = [
        'â',    // a with circumflex (svarita)
        'î',    // i with circumflex (svarita)
        'û',    // u with circumflex (svarita)
        'ê',    // e with circumflex (svarita)
        'ô',    // o with circumflex (svarita)
        'ā̂',    // ā with circumflex (svarita)
        'ī̂',    // ī with circumflex (svarita)
        'ū̂'     // ū with circumflex (svarita)
      ];

      testCases.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result.applies).toBe(false);
        expect(result.designation).toBe(null);
        expect(result.analysis.toneHeight).toBe('circumflex');
        expect(result.reason).toContain('svarita accent');
      });
    });

    test('should handle unmarked vowels appropriately', () => {
      const testCases = ['a', 'i', 'u', 'e', 'o', 'ā', 'ī', 'ū', 'ṛ', 'ṝ'];

      testCases.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result.applies).toBe(false);
        expect(result.designation).toBe(null);
        // Unmarked vowels might be treated as svarita by default in the utility
        expect(['neutral', 'circumflex']).toContain(result.analysis.toneHeight);
        expect(result.reason).toMatch(/lacks explicit anudātta marking|defaults to svarita|svarita accent/);
      });
    });
  });

  describe('Input Validation', () => {
    test('should reject invalid inputs', () => {
      const invalidInputs = [
        null,
        undefined,
        '',
        123,
        [],
        {},
        'consonant',
        'क',
        'p',
        'xyz'
      ];

      invalidInputs.forEach(input => {
        const result = sutra1230(input);
        expect(result.applies).toBe(false);
        expect(result.reason).toMatch(/Invalid|vowel/i);
      });
    });

    test('should handle non-vowel characters gracefully', () => {
      const nonVowels = ['k', 'g', 'c', 'j', 't', 'd', 'p', 'b', 'm', 'n', 'r', 'l', 'v', 's', 'h'];

      nonVowels.forEach(char => {
        const result = sutra1230(char);
        expect(result.applies).toBe(false);
        expect(result.reason).toContain('Invalid vowel input');
      });
    });

    test('should handle empty and whitespace strings', () => {
      const emptyInputs = ['', ' ', '\t', '\n', '   '];

      emptyInputs.forEach(input => {
        const result = sutra1230(input);
        expect(result.applies).toBe(false);
        expect(result.reason).toMatch(/Invalid input|Invalid vowel input/);
      });
    });
  });

  describe('Phonetic Context Analysis', () => {
    test('should detect low tone from phonetic context when enabled', () => {
      const contextTests = [
        {
          vowel: 'a',
          context: 'anudātta accent pattern',
          expectedApplies: true
        },
        {
          vowel: 'i',
          context: 'grave accent context',
          expectedApplies: true
        },
        {
          vowel: 'u',
          context: 'low tone environment',
          expectedApplies: true
        },
        {
          vowel: 'e',
          context: 'unaccented syllable',
          expectedApplies: true
        }
      ];

      contextTests.forEach(({ vowel, context, expectedApplies }) => {
        const result = sutra1230(vowel, {
          phoneticContext: context,
          detectLowTone: true
        });
        expect(result.applies).toBe(expectedApplies);
        if (expectedApplies) {
          expect(result.analysis.method).toBe('phonetic_context');
          expect(result.reason).toContain('Phonetic context suggests low tone');
        }
      });
    });

    test('should ignore phonetic context when detection disabled', () => {
      const vowel = 'a';
      const context = 'anudātta accent pattern';

      const result = sutra1230(vowel, {
        phoneticContext: context,
        detectLowTone: false
      });

      expect(result.applies).toBe(false);
      expect(['default_classification', 'default_svarita', 'explicit_svarita']).toContain(result.analysis.method);
    });

    test('should handle invalid phonetic context gracefully', () => {
      const vowel = 'a';
      const invalidContexts = [null, undefined, '', 123, [], {}];

      invalidContexts.forEach(context => {
        const result = sutra1230(vowel, {
          phoneticContext: context,
          detectLowTone: true
        });
        expect(result.applies).toBe(false);
        expect(['default_classification', 'default_svarita', 'explicit_svarita']).toContain(result.analysis.method);
      });
    });
  });

  describe('Script Detection and Handling', () => {
    test('should auto-detect IAST script', () => {
      const iastVowels = ['à', 'ì', 'ù', 'è', 'ò'];

      iastVowels.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result.script).toBe('IAST');
      });
    });

    test('should auto-detect Devanagari script', () => {
      const devanagariVowels = ['अ॒', 'इ॒', 'उ॒', 'ए॒', 'ओ॒'];

      devanagariVowels.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result.script).toBe('Devanagari');
      });
    });

    test('should respect explicit script parameter', () => {
      const vowel = 'à';
      
      const iastResult = sutra1230(vowel, { script: 'IAST' });
      expect(iastResult.script).toBe('IAST');

      const devanagariResult = sutra1230(vowel, { script: 'Devanagari' });
      expect(devanagariResult.script).toBe('Devanagari');
    });
  });

  describe('Strict Accent Marking Mode', () => {
    test('should require explicit accent marks in strict mode', () => {
      const unmarkedVowels = ['a', 'i', 'u', 'e', 'o'];

      unmarkedVowels.forEach(vowel => {
        const strictResult = sutra1230(vowel, { strictAccentMarking: true });
        expect(strictResult.applies).toBe(false);

        const nonStrictResult = sutra1230(vowel, { strictAccentMarking: false });
        expect(nonStrictResult.applies).toBe(false); // Still false for unmarked vowels
      });
    });

    test('should accept explicit anudātta marks in strict mode', () => {
      const anudattaVowels = ['à', 'ì', 'ù', 'è', 'ò'];

      anudattaVowels.forEach(vowel => {
        const result = sutra1230(vowel, { strictAccentMarking: true });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('अनुदात्त');
      });
    });
  });

  describe('Convenience Functions', () => {
    describe('isAnudatta()', () => {
      test('should return boolean for anudātta qualification', () => {
        expect(isAnudatta('à')).toBe(true);
        expect(isAnudatta('á')).toBe(false);
        expect(isAnudatta('a')).toBe(false);
        expect(isAnudatta('invalid')).toBe(false);
      });

      test('should accept context parameters', () => {
        expect(isAnudatta('a', { 
          phoneticContext: 'anudātta pattern',
          detectLowTone: true 
        })).toBe(true);

        expect(isAnudatta('a', { 
          phoneticContext: 'udātta pattern',
          detectLowTone: true 
        })).toBe(false);
      });
    });

    describe('applyAnudattaDesignation()', () => {
      test('should apply anudātta accent to vowels', () => {
        expect(applyAnudattaDesignation('a')).toBe('à');
        expect(applyAnudattaDesignation('i')).toBe('ì');
        expect(applyAnudattaDesignation('u')).toBe('ù');
        expect(applyAnudattaDesignation('ā')).toBe('ā̀');
      });

      test('should handle different scripts', () => {
        expect(applyAnudattaDesignation('अ', 'Devanagari')).toBe('अ॒');
        expect(applyAnudattaDesignation('इ', 'Devanagari')).toBe('इ॒');
      });

      test('should throw error for non-vowels', () => {
        expect(() => applyAnudattaDesignation('k')).toThrow();
        expect(() => applyAnudattaDesignation('consonant')).toThrow();
      });
    });

    describe('analyzeAnudattaDesignation()', () => {
      test('should provide comprehensive analysis', () => {
        const result = analyzeAnudattaDesignation('à');
        
        expect(result).toHaveProperty('sutraReference');
        expect(result.sutraReference.number).toBe('1.2.30');
        expect(result.sutraReference.sanskrit).toBe('नीचैरनुदात्तः');
        
        expect(result).toHaveProperty('traditionalInterpretation');
        expect(result.traditionalInterpretation.principle).toContain('नीचैः');
        expect(result.traditionalInterpretation.principle).toContain('अनुदात्त');
      });

      test('should include analysis details', () => {
        const result = analyzeAnudattaDesignation('à');
        
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('अनुदात्त');
        expect(result.analysis.hasAnudattaMark).toBe(true);
        expect(result.analysis.toneHeight).toBe('low');
        expect(result.analysis.confidence).toBeGreaterThan(0.5);
      });
    });
  });

  describe('Examples and Usage', () => {
    test('should provide appropriate examples for anudātta vowels', () => {
      const result = sutra1230('à');
      
      expect(result.examples).toBeDefined();
      expect(result.examples.baseVowel).toBe('a');
      expect(result.examples.anudattaForm).toBe('à');
      expect(result.examples.usage).toContain('anudātta');
      expect(result.examples.description).toContain('1.2.30');
      expect(result.examples.traditionalExample).toContain('तव̀');
    });

    test('should not provide examples for non-anudātta vowels', () => {
      const result = sutra1230('á'); // udātta
      expect(result.examples).toBe(null);
    });

    test('should generate examples in appropriate script', () => {
      const iastResult = sutra1230('à', { script: 'IAST' });
      expect(iastResult.examples.script).toBe('IAST');

      const devanagariResult = sutra1230('अ॒', { script: 'Devanagari' });
      expect(devanagariResult.examples.script).toBe('Devanagari');
    });
  });

  describe('Integration with Related Sutras', () => {
    test('should complement Sutra 1.2.29 (udātta)', () => {
      // Test that udātta and anudātta are mutually exclusive
      const testVowels = ['a', 'i', 'u', 'e', 'o'];
      
      testVowels.forEach(vowel => {
        const udattaVowel = vowel + '\u0301'; // acute accent
        const anudattaVowel = vowel + '\u0300'; // grave accent
        
        const udattaResult = sutra1230(udattaVowel);
        const anudattaResult = sutra1230(anudattaVowel);
        
        expect(udattaResult.applies).toBe(false);
        expect(anudattaResult.applies).toBe(true);
        
        expect(udattaResult.reason).toContain('udātta');
        expect(anudattaResult.reason).toContain('anudātta');
      });
    });

    test('should distinguish from Sutra 1.2.31 (svarita)', () => {
      const testVowels = ['a', 'i', 'u', 'e', 'o'];
      
      testVowels.forEach(vowel => {
        const svaritaVowel = vowel + '\u0302'; // circumflex accent
        const anudattaVowel = vowel + '\u0300'; // grave accent
        
        const svaritaResult = sutra1230(svaritaVowel);
        const anudattaResult = sutra1230(anudattaVowel);
        
        expect(svaritaResult.applies).toBe(false);
        expect(anudattaResult.applies).toBe(true);
        
        expect(svaritaResult.reason).toContain('svarita');
        expect(anudattaResult.reason).toContain('anudātta');
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle mixed accent marks gracefully', () => {
      const mixedAccents = [
        'a\u0301\u0300', // both acute and grave
        'i\u0302\u0300', // both circumflex and grave
        'u\u0301\u0302'  // both acute and circumflex
      ];

      mixedAccents.forEach(vowel => {
        const result = sutra1230(vowel);
        expect(result).toHaveProperty('applies');
        expect(result).toHaveProperty('reason');
        expect(result.reason).toBeDefined();
      });
    });

    test('should handle very long input strings', () => {
      const longString = 'a'.repeat(1000) + 'à';
      const result = sutra1230(longString);
      
      // Should still process but may not apply due to multiple characters
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
    });

    test('should handle Unicode normalization', () => {
      // Test different Unicode representations of the same character
      const composed = 'à'; // precomposed
      const decomposed = 'a\u0300'; // base + combining grave
      
      const composedResult = sutra1230(composed);
      const decomposedResult = sutra1230(decomposed);
      
      expect(composedResult.applies).toBe(decomposedResult.applies);
      expect(composedResult.designation).toBe(decomposedResult.designation);
    });
  });

  describe('Performance and Efficiency', () => {
    test('should process large batches efficiently', () => {
      const testVowels = [];
      for (let i = 0; i < 1000; i++) {
        testVowels.push('à', 'ì', 'ù', 'è', 'ò');
      }

      const startTime = Date.now();
      testVowels.forEach(vowel => sutra1230(vowel));
      const endTime = Date.now();

      // Should process 5000 vowels in reasonable time (less than 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
    });

    test('should handle repeated calls with same input', () => {
      const vowel = 'à';
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        results.push(sutra1230(vowel));
      }

      // All results should be identical
      const firstResult = results[0];
      results.forEach(result => {
        expect(result.applies).toBe(firstResult.applies);
        expect(result.designation).toBe(firstResult.designation);
        expect(result.reason).toBe(firstResult.reason);
      });
    });
  });
});
