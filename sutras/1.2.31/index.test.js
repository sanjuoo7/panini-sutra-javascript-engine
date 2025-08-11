/**
 * Test suite for Sutra 1.2.31: समाहारः स्वरितः (samāhāraḥ svaritaḥ)
 * Tests the implementation of svarita (combined tone) accent designation
 */

import { describe, test, expect } from '@jest/globals';
import sutra1231, { 
  isSvarita, 
  applySvaritaDesignation, 
  analyzeSvaritaDesignation,
  analyzeAccentTrilogyClassification
} from './index.js';

describe('Sutra 1.2.31: समाहारः स्वरितः (samāhāraḥ svaritaḥ)', () => {
  
  describe('Basic Functionality', () => {
    test('should identify explicit svarita vowels in IAST', () => {
      const testCases = [
        'â',    // a with circumflex accent
        'î',    // i with circumflex accent
        'û',    // u with circumflex accent
        'ê',    // e with circumflex accent
        'ô',    // o with circumflex accent
        'ā̂',    // ā with circumflex accent
        'ī̂',    // ī with circumflex accent
        'ū̂',    // ū with circumflex accent
        'ṛ̂',    // ṛ with circumflex accent
        'ṝ̂'     // ṝ with circumflex accent
      ];

      testCases.forEach(vowel => {
        const result = sutra1231(vowel);
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('स्वरित');
        expect(result.analysis.hasSvaritaMark).toBe(true);
        expect(result.analysis.toneHeight).toBe('circumflex');
        expect(result.reason).toContain('svarita accent mark');
      });
    });

    test('should identify explicit svarita vowels in Devanagari', () => {
      const testCases = [
        'अ᳚ ',    // अ with svarita mark
        'इ᳚ ',    // इ with svarita mark
        'उ᳚ ',    // उ with svarita mark
        'ए᳚ ',    // ए with svarita mark
        'ओ᳚ ',    // ओ with svarita mark
        'आ᳚ ',    // आ with svarita mark
        'ई᳚ ',    // ई with svarita mark
        'ऊ᳚ ',    // ऊ with svarita mark
        'ऋ᳚ ',    // ऋ with svarita mark
        'ऌ᳚ '     // ऌ with svarita mark
      ];

      testCases.forEach(vowel => {
        const result = sutra1231(vowel.trim(), { script: 'Devanagari' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('स्वरित');
        expect(result.analysis.hasSvaritaMark).toBe(true);
        expect(result.analysis.toneHeight).toBe('circumflex');
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
        const result = sutra1231(vowel);
        expect(result.applies).toBe(false);
        expect(result.designation).toBe(null);
        expect(result.analysis.toneHeight).toBe('high');
        expect(result.reason).toContain('udātta accent');
      });
    });

    test('should reject vowels with anudātta accent', () => {
      const testCases = [
        'à',    // a with grave accent (anudātta)
        'ì',    // i with grave accent (anudātta)
        'ù',    // u with grave accent (anudātta)
        'è',    // e with grave accent (anudātta)
        'ò',    // o with grave accent (anudātta)
        'ā̀',    // ā with grave accent (anudātta)
        'ī̀',    // ī with grave accent (anudātta)
        'ū̀'     // ū with grave accent (anudātta)
      ];

      testCases.forEach(vowel => {
        const result = sutra1231(vowel);
        expect(result.applies).toBe(false);
        expect(result.designation).toBe(null);
        expect(result.analysis.toneHeight).toBe('low');
        expect(result.reason).toContain('anudātta accent');
      });
    });

    test('should handle unmarked vowels with allowUnmarkedSvarita=true', () => {
      const testCases = ['a', 'i', 'u', 'e', 'o', 'ā', 'ī', 'ū', 'ṛ', 'ṝ'];

      testCases.forEach(vowel => {
        const result = sutra1231(vowel, { allowUnmarkedSvarita: true });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('स्वरित');
        expect(['neutral_circumflex', 'circumflex']).toContain(result.analysis.toneHeight);
        expect(result.reason).toContain('defaults to svarita');
      });
    });

    test('should reject unmarked vowels with allowUnmarkedSvarita=false', () => {
      const testCases = ['a', 'i', 'u', 'e', 'o', 'ā', 'ī', 'ū', 'ṛ', 'ṝ'];

      testCases.forEach(vowel => {
        const result = sutra1231(vowel, { allowUnmarkedSvarita: false });
        expect(result.applies).toBe(false);
        expect(result.designation).toBe(null);
        expect(result.analysis.toneHeight).toBe('neutral');
        expect(result.reason).toContain('lacks explicit svarita marking');
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
        const result = sutra1231(input);
        expect(result.applies).toBe(false);
        expect(result.reason).toMatch(/Invalid|vowel/i);
      });
    });

    test('should handle non-vowel characters gracefully', () => {
      const nonVowels = ['k', 'g', 'c', 'j', 't', 'd', 'p', 'b', 'm', 'n', 'r', 'l', 'v', 's', 'h'];

      nonVowels.forEach(char => {
        const result = sutra1231(char);
        expect(result.applies).toBe(false);
        expect(result.reason).toContain('Invalid vowel input');
      });
    });

    test('should handle empty and whitespace strings', () => {
      const emptyInputs = ['', ' ', '\t', '\n', '   '];

      emptyInputs.forEach(input => {
        const result = sutra1231(input);
        expect(result.applies).toBe(false);
        expect(result.reason).toMatch(/Invalid input|Invalid vowel input/);
      });
    });
  });

  describe('Combined Tone Detection', () => {
    test('should detect combined tone from phonetic context when enabled', () => {
      const contextTests = [
        {
          vowel: 'a',
          context: 'svarita accent pattern',
          expectedApplies: true
        },
        {
          vowel: 'i',
          context: 'circumflex accent context',
          expectedApplies: true
        },
        {
          vowel: 'u',
          context: 'combined tone environment',
          expectedApplies: true
        },
        {
          vowel: 'e',
          context: 'udātta anudātta sequence',
          expectedApplies: true
        }
      ];

      contextTests.forEach(({ vowel, context, expectedApplies }) => {
        const result = sutra1231(vowel, {
          phoneticContext: context,
          detectCombinedTone: true
        });
        expect(result.applies).toBe(expectedApplies);
        if (expectedApplies) {
          expect(result.analysis.method).toBe('phonetic_combination');
          expect(result.reason).toContain('Phonetic context suggests tone combination');
        }
      });
    });

    test('should ignore phonetic context when detection disabled', () => {
      const vowel = 'a';
      const context = 'svarita accent pattern';

      const result = sutra1231(vowel, {
        phoneticContext: context,
        detectCombinedTone: false,
        allowUnmarkedSvarita: true
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.method).toBe('default_unmarked');
    });

    test('should handle invalid phonetic context gracefully', () => {
      const vowel = 'a';
      const invalidContexts = [null, undefined, '', 123, [], {}];

      invalidContexts.forEach(context => {
        const result = sutra1231(vowel, {
          phoneticContext: context,
          detectCombinedTone: true,
          allowUnmarkedSvarita: true
        });
        expect(result.applies).toBe(true);
        expect(result.analysis.method).toBe('default_unmarked');
      });
    });
  });

  describe('Script Detection and Handling', () => {
    test('should auto-detect IAST script', () => {
      const iastVowels = ['â', 'î', 'û', 'ê', 'ô'];

      iastVowels.forEach(vowel => {
        const result = sutra1231(vowel);
        expect(result.script).toBe('IAST');
      });
    });

    test('should auto-detect Devanagari script', () => {
      const devanagariVowels = ['अ᳚', 'इ᳚ ', 'उ᳚ ', 'ए᳚ ', 'ओ᳚ '];

      devanagariVowels.forEach(vowel => {
        const result = sutra1231(vowel.trim());
        expect(result.script).toBe('Devanagari');
      });
    });

    test('should respect explicit script parameter', () => {
      const vowel = 'â';
      
      const iastResult = sutra1231(vowel, { script: 'IAST' });
      expect(iastResult.script).toBe('IAST');

      const devanagariResult = sutra1231(vowel, { script: 'Devanagari' });
      expect(devanagariResult.script).toBe('Devanagari');
    });
  });

  describe('Strict Accent Marking Mode', () => {
    test('should require explicit accent marks in strict mode', () => {
      const unmarkedVowels = ['a', 'i', 'u', 'e', 'o'];

      unmarkedVowels.forEach(vowel => {
        const strictResult = sutra1231(vowel, { 
          strictAccentMarking: true,
          allowUnmarkedSvarita: false 
        });
        expect(strictResult.applies).toBe(false);
      });
    });

    test('should accept explicit svarita marks in strict mode', () => {
      const svaritaVowels = ['â', 'î', 'û', 'ê', 'ô'];

      svaritaVowels.forEach(vowel => {
        const result = sutra1231(vowel, { strictAccentMarking: true });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('स्वरित');
      });
    });
  });

  describe('Convenience Functions', () => {
    describe('isSvarita()', () => {
      test('should return boolean for svarita qualification', () => {
        expect(isSvarita('â')).toBe(true);
        expect(isSvarita('á')).toBe(false);
        expect(isSvarita('à')).toBe(false);
        expect(isSvarita('a', { allowUnmarkedSvarita: true })).toBe(true);
        expect(isSvarita('invalid')).toBe(false);
      });

      test('should accept context parameters', () => {
        expect(isSvarita('a', { 
          phoneticContext: 'svarita pattern',
          detectCombinedTone: true 
        })).toBe(true);

        expect(isSvarita('a', { 
          phoneticContext: 'udātta pattern',
          detectCombinedTone: true,
          allowUnmarkedSvarita: false
        })).toBe(false);
      });
    });

    describe('applySvaritaDesignation()', () => {
      test('should apply svarita accent to vowels', () => {
        const aResult = applySvaritaDesignation('a');
        const iResult = applySvaritaDesignation('i');
        const uResult = applySvaritaDesignation('u');
        
        // Check for circumflex accent (â, î, û) - normalize and compare
        expect(aResult.normalize('NFD')).toContain('\u0302'); // circumflex combining
        expect(iResult.normalize('NFD')).toContain('\u0302');
        expect(uResult.normalize('NFD')).toContain('\u0302');
        expect(applySvaritaDesignation('ā')).toMatch(/ā[\u0302]/); // ā with circumflex
      });

      test('should handle different scripts', () => {
        const devanagariResult = applySvaritaDesignation('अ', 'Devanagari');
        expect(devanagariResult).toContain('अ');
        expect(devanagariResult).toMatch(/अ[\u1CDA]/); // अ with svarita mark
      });

      test('should throw error for non-vowels', () => {
        expect(() => applySvaritaDesignation('k')).toThrow();
        expect(() => applySvaritaDesignation('consonant')).toThrow();
      });
    });

    describe('analyzeSvaritaDesignation()', () => {
      test('should provide comprehensive analysis', () => {
        const result = analyzeSvaritaDesignation('â');
        
        expect(result).toHaveProperty('sutraReference');
        expect(result.sutraReference.number).toBe('1.2.31');
        expect(result.sutraReference.sanskrit).toBe('समाहारः स्वरितः');
        
        expect(result).toHaveProperty('traditionalInterpretation');
        expect(result.traditionalInterpretation.principle).toContain('समाहार');
        expect(result.traditionalInterpretation.principle).toContain('स्वरित');

        expect(result).toHaveProperty('accentSystem');
        expect(result.accentSystem.svarita).toContain('स्वरित');
      });

      test('should include analysis details', () => {
        const result = analyzeSvaritaDesignation('â');
        
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('स्वरित');
        expect(result.analysis.hasSvaritaMark).toBe(true);
        expect(result.analysis.toneHeight).toBe('circumflex');
        expect(result.analysis.confidence).toBeGreaterThan(0.5);
      });
    });

    describe('analyzeAccentTrilogyClassification()', () => {
      test('should classify vowels across all three sutras', async () => {
        const udattaResult = await analyzeAccentTrilogyClassification('á');
        expect(udattaResult.primaryClassification).toBe('udātta');
        expect(udattaResult.accentSystemComplete.udatta).toBe(true);

        const anudattaResult = await analyzeAccentTrilogyClassification('à');
        expect(anudattaResult.primaryClassification).toBe('anudātta');
        expect(anudattaResult.accentSystemComplete.anudatta).toBe(true);

        const svaritaResult = await analyzeAccentTrilogyClassification('â');
        expect(svaritaResult.primaryClassification).toBe('svarita');
        expect(svaritaResult.accentSystemComplete.svarita).toBe(true);
      });

      test('should provide sutra results for all three sutras', async () => {
        const result = await analyzeAccentTrilogyClassification('â');
        
        expect(result.sutraResults).toBeDefined();
        expect(Object.keys(result.sutraResults)).toContain('1.2.29');
        expect(Object.keys(result.sutraResults)).toContain('1.2.30');
        expect(Object.keys(result.sutraResults)).toContain('1.2.31');
        
        expect(result.sutraResults['1.2.31'].applies).toBe(true);
        expect(result.sutraResults['1.2.29'].applies).toBe(false);
        expect(result.sutraResults['1.2.30'].applies).toBe(false);
      });
    });
  });

  describe('Examples and Usage', () => {
    test('should provide appropriate examples for svarita vowels', () => {
      const result = sutra1231('â');
      
      expect(result.examples).toBeDefined();
      expect(result.examples.baseVowel).toBe('a');
      expect(result.examples.svaritaForm.normalize('NFD')).toContain('\u0302');
      expect(result.examples.usage).toContain('svarita');
      expect(result.examples.description).toContain('1.2.31');
      expect(result.examples.traditionalExample).toContain('अ͡ग्नि');
      expect(result.examples.combinationPattern).toContain('समाहार');
    });

    test('should not provide examples for non-svarita vowels', () => {
      const result = sutra1231('á'); // udātta
      expect(result.examples).toBe(null);
    });

    test('should generate examples in appropriate script', () => {
      const iastResult = sutra1231('â', { script: 'IAST' });
      expect(iastResult.examples.script).toBe('IAST');

      const devanagariResult = sutra1231('अ᳚ ', { script: 'Devanagari' });
      expect(devanagariResult.examples.script).toBe('Devanagari');
    });
  });

  describe('Integration with Related Sutras', () => {
    test('should complement Sutras 1.2.29 and 1.2.30', () => {
      // Test that udātta, anudātta, and svarita are mutually exclusive
      const testVowels = ['a', 'i', 'u', 'e', 'o'];
      
      testVowels.forEach(vowel => {
        const udattaVowel = vowel + '\u0301'; // acute accent
        const anudattaVowel = vowel + '\u0300'; // grave accent
        const svaritaVowel = vowel + '\u0302'; // circumflex accent
        
        const udattaResult = sutra1231(udattaVowel);
        const anudattaResult = sutra1231(anudattaVowel);
        const svaritaResult = sutra1231(svaritaVowel);
        
        expect(udattaResult.applies).toBe(false);
        expect(anudattaResult.applies).toBe(false);
        expect(svaritaResult.applies).toBe(true);
        
        expect(udattaResult.reason).toContain('udātta');
        expect(anudattaResult.reason).toContain('anudātta');
        expect(svaritaResult.reason).toContain('svarita');
      });
    });

    test('should complete the three-fold accent system', () => {
      const vowel = 'a';
      
      // Test all three accent types
      const results = {
        udatta: sutra1231(vowel + '\u0301'),     // acute
        anudatta: sutra1231(vowel + '\u0300'),   // grave
        svarita: sutra1231(vowel + '\u0302')     // circumflex
      };
      
      // Only svarita should apply for this sutra
      expect(results.udatta.applies).toBe(false);
      expect(results.anudatta.applies).toBe(false);
      expect(results.svarita.applies).toBe(true);
      
      // Each should recognize its respective accent type
      expect(results.udatta.analysis.toneHeight).toBe('high');
      expect(results.anudatta.analysis.toneHeight).toBe('low');
      expect(results.svarita.analysis.toneHeight).toBe('circumflex');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle mixed accent marks gracefully', () => {
      const mixedAccents = [
        'a\u0301\u0302', // both acute and circumflex
        'i\u0300\u0302', // both grave and circumflex
        'u\u0301\u0300'  // both acute and grave
      ];

      mixedAccents.forEach(vowel => {
        const result = sutra1231(vowel);
        expect(result).toHaveProperty('applies');
        expect(result).toHaveProperty('reason');
        expect(result.reason).toBeDefined();
      });
    });

    test('should handle very long input strings', () => {
      const longString = 'a'.repeat(1000) + 'â';
      const result = sutra1231(longString);
      
      // Should still process but may not apply due to multiple characters
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
    });

    test('should handle Unicode normalization', () => {
      // Test different Unicode representations of the same character
      const composed = 'â'; // precomposed
      const decomposed = 'a\u0302'; // base + combining circumflex
      
      const composedResult = sutra1231(composed);
      const decomposedResult = sutra1231(decomposed);
      
      expect(composedResult.applies).toBe(decomposedResult.applies);
      expect(composedResult.designation).toBe(decomposedResult.designation);
    });
  });

  describe('Performance and Efficiency', () => {
    test('should process large batches efficiently', () => {
      const testVowels = [];
      for (let i = 0; i < 1000; i++) {
        testVowels.push('â', 'î', 'û', 'ê', 'ô');
      }

      const startTime = Date.now();
      testVowels.forEach(vowel => sutra1231(vowel));
      const endTime = Date.now();

      // Should process 5000 vowels in reasonable time (less than 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
    });

    test('should handle repeated calls with same input', () => {
      const vowel = 'â';
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        results.push(sutra1231(vowel));
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

  describe('Default Behavior Analysis', () => {
    test('should handle different allowUnmarkedSvarita settings', () => {
      const unmarkedVowel = 'a';
      
      const allowedResult = sutra1231(unmarkedVowel, { allowUnmarkedSvarita: true });
      const strictResult = sutra1231(unmarkedVowel, { allowUnmarkedSvarita: false });
      
      expect(allowedResult.applies).toBe(true);
      expect(strictResult.applies).toBe(false);
      
      expect(allowedResult.reason).toContain('defaults to svarita');
      expect(strictResult.reason).toContain('lacks explicit svarita marking');
    });

    test('should use traditional interpretation by default', () => {
      const unmarkedVowel = 'a';
      const result = sutra1231(unmarkedVowel); // default allowUnmarkedSvarita: true
      
      expect(result.applies).toBe(true);
      expect(result.designation).toBe('स्वरित');
      expect(result.reason).toContain('defaults to svarita');
      expect(result.analysis.method).toBe('default_unmarked');
    });
  });
});
