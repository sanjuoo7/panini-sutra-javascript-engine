import { isVrddhi, analyzeVowel, applySutra111 } from './index.js';
import TransliterationUtil from '../shared/transliteration.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Simple function to extract the first vowel-like sound from a word in IAST.
function getFirstIastVowel(word) {
  const vowelRegex = /ai|au|ā|a|i|ī|u|ū|ṛ|ṝ|ḷ|ḹ|e|o/;
  const match = word.match(vowelRegex);
  return match ? match[0] : undefined;
}

describe('Sutra 1.1.1: vṛddhirādaic (IAST)', () => {
  iastTestCases.forEach(({ word, expected }) => {
    const firstVowel = getFirstIastVowel(word);

    test(`should return ${expected} for the first vowel of "${word}" (vowel: ${firstVowel})`, () => {
      if (firstVowel) {
        expect(isVrddhi(firstVowel)).toBe(expected);
      } else {
        fail(`Could not find a vowel in "${word}"`);
      }
    });
  });
});

describe('Sutra 1.1.1: vṛddhirādaic (Devanagari)', () => {
    devanagariTestCases.forEach(({ word, expected }) => {
        const firstVowel = TransliterationUtil.getFirstDevanagariVowel(word);
        const iastVowel = firstVowel ? TransliterationUtil.transliterate(firstVowel) : undefined;

        test(`should return ${expected} for the first vowel of "${word}" (vowel: ${iastVowel})`, () => {
            if (iastVowel) {
                expect(isVrddhi(iastVowel)).toBe(expected);
            } else {
                fail(`Could not find or transliterate a vowel in "${word}"`);
            }
        });
    });
});

// Enhanced test coverage for analyzeVowel function
describe('analyzeVowel Function Tests', () => {
    describe('IAST vowel analysis', () => {
        test('should provide detailed analysis for vṛddhi vowels', () => {
            const analysis = analyzeVowel('ā');
            expect(analysis.vowel).toBe('ā');
            expect(analysis.isVrddhi).toBe(true);
            expect(analysis.script).toBe('IAST'); // Actual return value
            expect(analysis.category).toBe('long-a');
            expect(analysis.explanation).toContain('vṛddhi vowel');
            expect(analysis.traditionalClassification).toBe('vṛddhi');
        });

        test('should provide detailed analysis for diphthongs', () => {
            const aiAnalysis = analyzeVowel('ai');
            expect(aiAnalysis.vowel).toBe('ai');
            expect(aiAnalysis.isVrddhi).toBe(true);
            expect(aiAnalysis.category).toBe('diphthong-ai');
            expect(aiAnalysis.traditionalClassification).toBe('vṛddhi');

            const auAnalysis = analyzeVowel('au');
            expect(auAnalysis.vowel).toBe('au');
            expect(auAnalysis.isVrddhi).toBe(true);
            expect(auAnalysis.category).toBe('diphthong-au');
            expect(auAnalysis.traditionalClassification).toBe('vṛddhi');
        });

        test('should correctly identify non-vṛddhi vowels', () => {
            const analysis = analyzeVowel('a');
            expect(analysis.vowel).toBe('a');
            expect(analysis.isVrddhi).toBe(false);
            expect(analysis.script).toBe('IAST'); // Actual return value
            expect(analysis.explanation).toContain('not a vṛddhi vowel');
            expect(analysis.traditionalClassification).toBe('non-vṛddhi');
        });
    });

    describe('Devanagari vowel analysis', () => {
        test('should provide detailed analysis for Devanagari vṛddhi vowels', () => {
            const analysis = analyzeVowel('आ');
            expect(analysis.vowel).toBe('आ');
            expect(analysis.isVrddhi).toBe(true);
            expect(analysis.script).toBe('Devanagari'); // Actual return value
            expect(analysis.category).toBe('long-a');
            expect(analysis.explanation).toContain('vṛddhi vowel');
            expect(analysis.traditionalClassification).toBe('vṛddhi');
        });

        test('should handle Devanagari diphthongs', () => {
            const aiAnalysis = analyzeVowel('ऐ');
            expect(aiAnalysis.isVrddhi).toBe(true);
            expect(aiAnalysis.category).toBe('diphthong-ai');

            const auAnalysis = analyzeVowel('औ');
            expect(auAnalysis.isVrddhi).toBe(true);
            expect(auAnalysis.category).toBe('diphthong-au');
        });
    });

    describe('Error handling', () => {
        test('should handle invalid inputs gracefully', () => {
            const analysis = analyzeVowel('');
            expect(analysis.vowel).toBe('');
            expect(analysis.isVrddhi).toBe(false);
            expect(analysis.explanation).toContain('Invalid or empty vowel');
        });

        test('should handle null and undefined inputs', () => {
            expect(() => analyzeVowel(null)).not.toThrow();
            expect(() => analyzeVowel(undefined)).not.toThrow();
        });
    });
});

// Enhanced test coverage for applySutra111 function
describe('applySutra111 Function Tests', () => {
    describe('Single vowel analysis', () => {
        test('should provide complete sutra application for vṛddhi vowels', () => {
            const result = applySutra111('ā');
            
            // Check actual structure based on implementation
            expect(result.input).toBe('ā');
            expect(result.sutraApplied).toBe('1.1.1');
            expect(result.sutraName).toBe('vṛddhirādaic');
            expect(result.classification).toBe('vṛddhi');
            expect(result.isVrddhi).toBe(true);
            expect(result.category).toBe('long-a');
            expect(result.script).toBe('IAST');
            expect(result.explanation).toContain('vṛddhi vowel');
            expect(result.traditionalDefinition).toBe('ā, ai, au are called vṛddhi vowels');
        });

        test('should handle non-vṛddhi vowels correctly', () => {
            const result = applySutra111('a');
            
            expect(result.isVrddhi).toBe(false);
            expect(result.classification).toBe('non-vṛddhi');
            expect(result.explanation).toContain('not a vṛddhi vowel');
        });
    });

    describe('Word analysis', () => {
        test('should analyze single vowel from words with vṛddhi vowels', () => {
            const result = applySutra111('ā'); // single vowel analysis
            
            expect(result.input).toBe('ā');
            expect(result.isVrddhi).toBe(true);
            expect(result.classification).toBe('vṛddhi');
            expect(result.category).toBe('long-a');
            expect(result.script).toBe('IAST');
        });

        test('should handle single vowels without vṛddhi', () => {
            const result = applySutra111('a'); // no vṛddhi vowel
            
            expect(result.isVrddhi).toBe(false);
            expect(result.classification).toBe('non-vṛddhi');
            expect(result.explanation).toContain('not a vṛddhi vowel');
        });
    });

    describe('Single vowel analysis variations', () => {
        test('should analyze different vṛddhi vowels', () => {
            const result1 = applySutra111('ā');
            const result2 = applySutra111('ai');
            const result3 = applySutra111('au');
            
            expect(result1.isVrddhi).toBe(true);
            expect(result2.isVrddhi).toBe(true);
            expect(result3.isVrddhi).toBe(true);
            expect(result1.category).toBe('long-a');
            expect(result2.category).toBe('diphthong-ai');
            expect(result3.category).toBe('diphthong-au');
        });

        test('should handle different non-vṛddhi vowels', () => {
            const result = applySutra111('i');
            
            expect(result.isVrddhi).toBe(false);
            expect(result.classification).toBe('non-vṛddhi');
            expect(result.explanation).toContain('not a vṛddhi vowel');
        });
    });

    describe('Error handling', () => {
        test('should handle invalid inputs gracefully', () => {
            const result = applySutra111(null);
            
            expect(result.isVrddhi).toBe(false);
            expect(result.classification).toBe('non-vṛddhi');
            expect(result.explanation).toContain('Invalid or empty vowel input');
        });

        test('should handle non-string inputs', () => {
            const result = applySutra111(123);
            
            expect(result.isVrddhi).toBe(false);
            expect(result.classification).toBe('non-vṛddhi');
            expect(result.explanation).toContain('Invalid or empty vowel input');
        });
    });

    describe('Integration with examples', () => {
        test('should work with traditional Sanskrit examples', () => {
            const examples = ['ā', 'ai', 'au', 'a', 'i', 'u'];
            
            examples.forEach(vowel => {
                const result = applySutra111(vowel);
                expect(result).toHaveProperty('input');
                expect(result).toHaveProperty('sutraApplied');
                expect(result).toHaveProperty('classification');
                expect(result).toHaveProperty('isVrddhi');
                expect(result).toHaveProperty('explanation');
                expect(result.sutraApplied).toBe('1.1.1');
                expect(result.sutraName).toBe('vṛddhirādaic');
            });
        });
    });
});
