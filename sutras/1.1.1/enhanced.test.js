/**
 * Enhanced Test Suite for Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic)
 * 
 * Comprehensive testing with direct function validation, reduced external dependencies,
 * and enhanced coverage of edge cases and multi-vowel scenarios.
 */

import { 
  isVrddhi, 
  vrddhiVowels, 
  vrddhiVowelsDevanagari,
  getAllVrddhiVowels,
  analyzeVowel,
  applySutra111
} from './index.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

describe('Sutra 1.1.1: Enhanced Direct Function Testing', () => {
  
  describe('isVrddhi() - Core Classification Function', () => {
    
    describe('Valid vṛddhi vowels', () => {
      test('should identify IAST vṛddhi vowels correctly', () => {
        expect(isVrddhi('ā')).toBe(true);
        expect(isVrddhi('ai')).toBe(true);
        expect(isVrddhi('au')).toBe(true);
      });

      test('should identify Devanagari vṛddhi vowels correctly', () => {
        expect(isVrddhi('आ')).toBe(true);
        expect(isVrddhi('ऐ')).toBe(true);
        expect(isVrddhi('औ')).toBe(true);
      });
    });

    describe('Non-vṛddhi vowels', () => {
      test('should correctly reject IAST non-vṛddhi vowels', () => {
        expect(isVrddhi('a')).toBe(false);
        expect(isVrddhi('i')).toBe(false);
        expect(isVrddhi('u')).toBe(false);
        expect(isVrddhi('e')).toBe(false);
        expect(isVrddhi('o')).toBe(false);
        expect(isVrddhi('ī')).toBe(false);
        expect(isVrddhi('ū')).toBe(false);
        expect(isVrddhi('ṛ')).toBe(false);
      });

      test('should correctly reject Devanagari non-vṛddhi vowels', () => {
        expect(isVrddhi('अ')).toBe(false);
        expect(isVrddhi('इ')).toBe(false);
        expect(isVrddhi('उ')).toBe(false);
        expect(isVrddhi('ए')).toBe(false);
        expect(isVrddhi('ओ')).toBe(false);
        expect(isVrddhi('ई')).toBe(false);
        expect(isVrddhi('ऊ')).toBe(false);
        expect(isVrddhi('ऋ')).toBe(false);
      });
    });

    describe('Edge cases and error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        expect(isVrddhi('')).toBe(false);
        expect(isVrddhi(null)).toBe(false);
        expect(isVrddhi(undefined)).toBe(false);
        expect(isVrddhi('xyz')).toBe(false);
        expect(isVrddhi('123')).toBe(false);
      });
    });
  });

  describe('analyzeVowel() - Comprehensive Analysis Function', () => {
    
    describe('Valid vṛddhi vowel analysis', () => {
      test('should analyze IAST ā correctly', () => {
        const analysis = analyzeVowel('ā');
        expect(analysis.isValid).toBe(true);
        expect(analysis.isVrddhi).toBe(true);
        expect(analysis.script).toBe('IAST');
        expect(analysis.category).toBe('long-a');
        expect(analysis.explanation).toContain('vṛddhi vowel');
        expect(analysis.traditionalClassification).toBe('vṛddhi');
      });

      test('should analyze Devanagari आ correctly', () => {
        const analysis = analyzeVowel('आ');
        expect(analysis.isValid).toBe(true);
        expect(analysis.isVrddhi).toBe(true);
        expect(analysis.script).toBe('Devanagari');
        expect(analysis.category).toBe('long-a');
        expect(analysis.explanation).toContain('vṛddhi vowel');
      });

      test('should analyze IAST ai correctly', () => {
        const analysis = analyzeVowel('ai');
        expect(analysis.isValid).toBe(true);
        expect(analysis.isVrddhi).toBe(true);
        expect(analysis.script).toBe('IAST');
        expect(analysis.category).toBe('diphthong-ai');
      });

      test('should analyze IAST au correctly', () => {
        const analysis = analyzeVowel('au');
        expect(analysis.isValid).toBe(true);
        expect(analysis.isVrddhi).toBe(true);
        expect(analysis.script).toBe('IAST');
        expect(analysis.category).toBe('diphthong-au');
      });
    });

    describe('Non-vṛddhi vowel analysis', () => {
      test('should analyze non-vṛddhi vowels correctly', () => {
        const analysis = analyzeVowel('a');
        expect(analysis.isValid).toBe(true);
        expect(analysis.isVrddhi).toBe(false);
        expect(analysis.script).toBe('IAST');
        expect(analysis.category).toBe(null);
        expect(analysis.explanation).toContain('not a vṛddhi vowel');
        expect(analysis.traditionalClassification).toBe('non-vṛddhi');
      });
    });

    describe('Error handling and edge cases', () => {
      test('should handle empty string gracefully', () => {
        const analysis = analyzeVowel('');
        expect(analysis.isValid).toBe(false);
        expect(analysis.isVrddhi).toBe(false);
        expect(analysis.script).toBe(null);
        expect(analysis.explanation).toContain('Invalid or empty');
      });

      test('should handle null input gracefully', () => {
        const analysis = analyzeVowel(null);
        expect(analysis.isValid).toBe(false);
        expect(analysis.isVrddhi).toBe(false);
      });

      test('should handle undefined input gracefully', () => {
        const analysis = analyzeVowel(undefined);
        expect(analysis.isValid).toBe(false);
        expect(analysis.isVrddhi).toBe(false);
      });

      test('should handle non-string input gracefully', () => {
        const analysis = analyzeVowel(123);
        expect(analysis.isValid).toBe(false);
        expect(analysis.isVrddhi).toBe(false);
      });
    });
  });

  describe('applySutra111() - Application Interface', () => {
    
    test('should apply sutra to vṛddhi vowels correctly', () => {
      const result = applySutra111('ā');
      expect(result.input).toBe('ā');
      expect(result.sutraApplied).toBe('1.1.1');
      expect(result.sutraName).toBe('vṛddhirādaic');
      expect(result.classification).toBe('vṛddhi');
      expect(result.isVrddhi).toBe(true);
      expect(result.category).toBe('long-a');
      expect(result.traditionalDefinition).toContain('ā, ai, au are called vṛddhi');
      expect(Array.isArray(result.examples)).toBe(true);
    });

    test('should apply sutra to non-vṛddhi vowels correctly', () => {
      const result = applySutra111('a');
      expect(result.classification).toBe('non-vṛddhi');
      expect(result.isVrddhi).toBe(false);
      expect(result.category).toBe(null);
      expect(result.examples).toEqual([]);
    });

    test('should handle invalid input gracefully', () => {
      const result = applySutra111('');
      expect(result.classification).toBe('non-vṛddhi');
      expect(result.isVrddhi).toBe(false);
    });
  });

  describe('getAllVrddhiVowels() - Data Structure Function', () => {
    
    test('should return correct structure', () => {
      const vowels = getAllVrddhiVowels();
      expect(vowels).toHaveProperty('iast');
      expect(vowels).toHaveProperty('devanagari');
      expect(vowels).toHaveProperty('combined');
      expect(Array.isArray(vowels.iast)).toBe(true);
      expect(Array.isArray(vowels.devanagari)).toBe(true);
      expect(Array.isArray(vowels.combined)).toBe(true);
    });

    test('should contain correct vṛddhi vowels', () => {
      const vowels = getAllVrddhiVowels();
      expect(vowels.iast).toEqual(['ā', 'ai', 'au']);
      expect(vowels.devanagari).toEqual(['आ', 'ऐ', 'औ']);
      expect(vowels.combined).toEqual(['ā', 'ai', 'au', 'आ', 'ऐ', 'औ']);
    });
  });

  describe('Multi-vowel word scenarios', () => {
    
    test('should handle words with multiple vṛddhi vowels', () => {
      // Test individual vowels from complex words
      expect(isVrddhi('ai')).toBe(true); // from kailāsa
      expect(isVrddhi('ā')).toBe(true);  // from kailāsa
      expect(isVrddhi('au')).toBe(true); // from auṣadha
    });

    test('should analyze vowels from authentic Sanskrit words', () => {
      const testCases = [
        { vowel: 'ā', word: 'rāma', meaning: 'Rama' },
        { vowel: 'ai', word: 'vaidya', meaning: 'physician' },
        { vowel: 'au', word: 'gaura', meaning: 'fair/white' }
      ];

      testCases.forEach(({ vowel, word, meaning }) => {
        const analysis = analyzeVowel(vowel);
        expect(analysis.isVrddhi).toBe(true);
        expect(analysis.isValid).toBe(true);
      });
    });
  });

  describe('Cross-script consistency', () => {
    
    test('should maintain consistency between IAST and Devanagari', () => {
      const pairs = [
        ['ā', 'आ'],
        ['ai', 'ऐ'],
        ['au', 'औ']
      ];

      pairs.forEach(([iast, devanagari]) => {
        expect(isVrddhi(iast)).toBe(true);
        expect(isVrddhi(devanagari)).toBe(true);
        
        const iastAnalysis = analyzeVowel(iast);
        const devanagariAnalysis = analyzeVowel(devanagari);
        
        expect(iastAnalysis.isVrddhi).toBe(devanagariAnalysis.isVrddhi);
        expect(iastAnalysis.category).toBe(devanagariAnalysis.category);
      });
    });
  });

  describe('Performance and data integrity', () => {
    
    test('should maintain data structure integrity', () => {
      expect(vrddhiVowels).toEqual(['ā', 'ai', 'au']);
      expect(vrddhiVowelsDevanagari).toEqual(['आ', 'ऐ', 'औ']);
      expect(vrddhiVowels.length).toBe(3);
      expect(vrddhiVowelsDevanagari.length).toBe(3);
    });

    test('should handle rapid successive calls efficiently', () => {
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        isVrddhi('ā');
        isVrddhi('ai');
        isVrddhi('au');
      }
      const end = performance.now();
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });
  });
});

describe('Integration with existing test cases', () => {
  
  describe('Backward compatibility with existing IAST tests', () => {
    iastTestCases.slice(0, 10).forEach(({ word, expected }) => {
      test(`should maintain compatibility: ${word} → ${expected}`, () => {
        // Extract first vowel logic (simplified for direct testing)
        const vowelMatch = word.match(/ai|au|ā|a|i|ī|u|ū|ṛ|ṝ|ḷ|ḹ|e|o/);
        if (vowelMatch) {
          const firstVowel = vowelMatch[0];
          expect(isVrddhi(firstVowel)).toBe(expected);
        }
      });
    });
  });

  describe('Backward compatibility with existing Devanagari tests', () => {
    devanagariTestCases.slice(0, 10).forEach(({ word, expected }) => {
      test(`should maintain compatibility: ${word} → ${expected}`, () => {
        // Extract first vowel logic (simplified for direct testing)
        const vowelMatch = word.match(/[आऐऔअइईउऊऋएओ]/);
        if (vowelMatch) {
          const firstVowel = vowelMatch[0];
          expect(isVrddhi(firstVowel)).toBe(expected);
        }
      });
    });
  });
});

describe('Enhanced linguistic accuracy validation', () => {
  
  const authenticSanskritExamples = [
    // Traditional grammatical examples
    { vowel: 'ā', context: 'kāra (action)', linguistic: 'verbal noun formation' },
    { vowel: 'ai', context: 'veda → vaida (relating to Vedas)', linguistic: 'taddhita derivation' },
    { vowel: 'au', context: 'kuru → kaurava (descendant of Kuru)', linguistic: 'patronymic formation' }
  ];

  test('should correctly classify vowels in traditional linguistic contexts', () => {
    authenticSanskritExamples.forEach(({ vowel, context, linguistic }) => {
      const analysis = analyzeVowel(vowel);
      expect(analysis.isVrddhi).toBe(true);
      expect(analysis.isValid).toBe(true);
      expect(['long-a', 'diphthong-ai', 'diphthong-au']).toContain(analysis.category);
    });
  });
});
