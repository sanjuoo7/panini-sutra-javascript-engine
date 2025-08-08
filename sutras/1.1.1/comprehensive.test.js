/**
 * Comprehensive test suite for Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic)
 * 
 * This sutra defines the term "vṛddhi" - the vowels ā, ai, au are called vṛddhi.
 * This is the foundational sutra for understanding vowel categories in Sanskrit grammar.
 * 
 * Enhanced with comprehensive Sanskrit examples and morphological analysis.
 */

import { 
  isVrddhi, 
  vrddhiVowels, 
  vrddhiVowelsDevanagari,
  getAllVrddhiVowels,
  analyzeVowel,
  applySutra111
} from './index.js';
import { isValidVrddhiTransformation } from '../1.1.3/index.js';
import TransliterationUtil from '../utils.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Comprehensive Sanskrit examples for vṛddhi vowel testing
const comprehensiveVrddhiExamples = [
  // ā (आ) vowel examples - long-a vṛddhi
  { vowel: 'ā', script: 'IAST', word: 'rāma', meaning: 'Rama (name)', analysis: 'Long-a vṛddhi vowel in divine name', category: 'long-a', isVrddhi: true },
  { vowel: 'आ', script: 'Devanagari', word: 'राम', meaning: 'Rama (name)', analysis: 'Long-a vṛddhi vowel in Devanagari', category: 'long-a', isVrddhi: true },
  { vowel: 'ā', script: 'IAST', word: 'kāraṇa', meaning: 'cause/reason', analysis: 'Philosophical term with vṛddhi vowel', category: 'long-a', isVrddhi: true },
  { vowel: 'आ', script: 'Devanagari', word: 'कारण', meaning: 'cause/reason', analysis: 'Philosophical term with vṛddhi vowel in Devanagari', category: 'long-a', isVrddhi: true },
  { vowel: 'ā', script: 'IAST', word: 'ānanda', meaning: 'bliss/joy', analysis: 'Spiritual term with vṛddhi ā', category: 'long-a', isVrddhi: true },
  
  // ai (ऐ) vowel examples - diphthong vṛddhi  
  { vowel: 'ai', script: 'IAST', word: 'vaidya', meaning: 'physician', analysis: 'Professional term with vṛddhi ai diphthong', category: 'diphthong-ai', isVrddhi: true },
  { vowel: 'ऐ', script: 'Devanagari', word: 'वैद्य', meaning: 'physician', analysis: 'Medical professional with vṛddhi vowel in Devanagari', category: 'diphthong-ai', isVrddhi: true },
  { vowel: 'ai', script: 'IAST', word: 'aikya', meaning: 'unity/oneness', analysis: 'Philosophical concept with vṛddhi ai vowel', category: 'diphthong-ai', isVrddhi: true },
  { vowel: 'ऐ', script: 'Devanagari', word: 'ऐक्य', meaning: 'unity/oneness', analysis: 'Unity concept with vṛddhi vowel in Devanagari', category: 'diphthong-ai', isVrddhi: true },
  { vowel: 'ai', script: 'IAST', word: 'kailāsa', meaning: 'Mount Kailash', analysis: 'Sacred mountain with vṛddhi ai diphthong', category: 'diphthong-ai', isVrddhi: true },

  // au (औ) vowel examples - diphthong vṛddhi
  { vowel: 'au', script: 'IAST', word: 'gaura', meaning: 'fair/white', analysis: 'Color adjective with vṛddhi au diphthong', category: 'diphthong-au', isVrddhi: true },
  { vowel: 'औ', script: 'Devanagari', word: 'गौर', meaning: 'fair/white', analysis: 'Color term with vṛddhi vowel in Devanagari', category: 'diphthong-au', isVrddhi: true },
  { vowel: 'au', script: 'IAST', word: 'mauna', meaning: 'silence', analysis: 'Spiritual practice with vṛddhi au vowel', category: 'diphthong-au', isVrddhi: true },
  { vowel: 'औ', script: 'Devanagari', word: 'मौन', meaning: 'silence', analysis: 'Silence concept with vṛddhi vowel in Devanagari', category: 'diphthong-au', isVrddhi: true },
  { vowel: 'au', script: 'IAST', word: 'auṣadha', meaning: 'medicine', analysis: 'Medical term with vṛddhi au diphthong', category: 'diphthong-au', isVrddhi: true }
];

const nonVrddhiExamples = [
  // Non-vṛddhi vowels for comparison
  { vowel: 'a', word: 'gaja', meaning: 'elephant', analysis: 'Short-a is not vṛddhi', isVrddhi: false },
  { vowel: 'i', word: 'giri', meaning: 'mountain', analysis: 'Short-i is not vṛddhi', isVrddhi: false },
  { vowel: 'u', word: 'guru', meaning: 'teacher', analysis: 'Short-u is not vṛddhi', isVrddhi: false },
  { vowel: 'ī', word: 'nadī', meaning: 'river', analysis: 'Long-ī is not vṛddhi', isVrddhi: false },
  { vowel: 'ū', word: 'sūrya', meaning: 'sun', analysis: 'Long-ū is not vṛddhi', isVrddhi: false },
  { vowel: 'ṛ', word: 'ṛṣi', meaning: 'sage', analysis: 'Vocalic-ṛ is not vṛddhi', isVrddhi: false },
  { vowel: 'e', word: 'deva', meaning: 'god', analysis: 'Vowel-e is not vṛddhi', isVrddhi: false },
  { vowel: 'o', word: 'loka', meaning: 'world', analysis: 'Vowel-o is not vṛddhi', isVrddhi: false }
];

const transformationExamples = [
  // Valid vṛddhi transformations
  { original: 'a', transformed: 'ā', valid: true, example: 'kar → kār (to do → agent)', process: 'a to ā vṛddhi' },
  { original: 'i', transformed: 'ai', valid: true, example: 'vid → vaidya (to know → knower)', process: 'i to ai vṛddhi' },
  { original: 'u', transformed: 'au', valid: true, example: 'śuc → śauca (to be pure → purity)', process: 'u to au vṛddhi' },
  { original: 'ī', transformed: 'ai', valid: true, example: 'nī → naiya (to lead → leader)', process: 'ī to ai vṛddhi' },
  { original: 'ū', transformed: 'au', valid: true, example: 'sū → sāva (to generate → generator)', process: 'ū to au vṛddhi' },
  
  // Invalid transformations
  { original: 'a', transformed: 'ai', valid: false, example: 'incorrect transformation', process: 'invalid vṛddhi' },
  { original: 'i', transformed: 'ā', valid: false, example: 'incorrect transformation', process: 'invalid vṛddhi' },
  { original: 'u', transformed: 'ai', valid: false, example: 'incorrect transformation', process: 'invalid vṛddhi' }
];

const literaryExamples = [
  // Examples from Sanskrit literature
  { word: 'rāmāyaṇa', vowel: 'ā', source: 'Epic literature', analysis: 'Epic title with vṛddhi ā', context: 'Classical Sanskrit' },
  { word: 'bhārata', vowel: 'ā', source: 'Epic literature', analysis: 'Epic name with vṛddhi vowel', context: 'Mahābhārata' },
  { word: 'gītā', vowel: 'ā', source: 'Philosophical text', analysis: 'Sacred text with vṛddhi ending', context: 'Bhagavad Gītā' },
  { word: 'śaiva', vowel: 'ai', source: 'Religious tradition', analysis: 'Sectarian term with vṛddhi ai vowel', context: 'Śaivism' },
  { word: 'vaiṣṇava', vowel: 'ai', source: 'Religious tradition', analysis: 'Devotional tradition with vṛddhi ai', context: 'Vaiṣṇavism' },
  { word: 'gaura', vowel: 'au', source: 'Descriptive literature', analysis: 'Color adjective with vṛddhi in poetry', context: 'Sanskrit poetry' }
];

// Simple function to extract the first vowel-like sound from a word in IAST.
function getFirstIastVowel(word) {
  const vowelRegex = /ai|au|ā|a|i|ī|u|ū|ṛ|ṝ|ḷ|ḹ|e|o/;
  const match = word.match(vowelRegex);
  return match ? match[0] : undefined;
}

describe('Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic) - Comprehensive Sanskrit Testing', () => {
  
  describe('Core Function Tests', () => {
    test('isVrddhi should correctly identify vṛddhi vowels in IAST', () => {
      expect(isVrddhi('ā')).toBe(true);
      expect(isVrddhi('ai')).toBe(true);
      expect(isVrddhi('au')).toBe(true);
      expect(isVrddhi('a')).toBe(false);
      expect(isVrddhi('i')).toBe(false);
      expect(isVrddhi('u')).toBe(false);
      expect(isVrddhi('e')).toBe(false);
      expect(isVrddhi('o')).toBe(false);
    });

    test('isVrddhi should correctly identify vṛddhi vowels in Devanagari', () => {
      expect(isVrddhi('आ')).toBe(true);
      expect(isVrddhi('ऐ')).toBe(true);
      expect(isVrddhi('औ')).toBe(true);
      expect(isVrddhi('अ')).toBe(false);
      expect(isVrddhi('इ')).toBe(false);
      expect(isVrddhi('उ')).toBe(false);
      expect(isVrddhi('ए')).toBe(false);
      expect(isVrddhi('ओ')).toBe(false);
    });

    test('getAllVrddhiVowels should return complete vowel sets', () => {
      const vowels = getAllVrddhiVowels();
      expect(vowels.iast).toEqual(['ā', 'ai', 'au']);
      expect(vowels.devanagari).toEqual(['आ', 'ऐ', 'औ']);
      expect(vowels.combined).toHaveLength(6);
    });
  });

  describe('Comprehensive Vṛddhi Vowel Examples', () => {
    comprehensiveVrddhiExamples.forEach((example, index) => {
      test(`${example.vowel} in ${example.word} (${example.meaning}) - ${example.script}`, () => {
        expect(isVrddhi(example.vowel)).toBe(example.isVrddhi);
        
        // Additional validation
        expect(example.analysis).toContain('vṛddhi');
        expect(['long-a', 'diphthong-ai', 'diphthong-au']).toContain(example.category);
        expect(['IAST', 'Devanagari']).toContain(example.script);
      });
    });
  });

  describe('Non-Vṛddhi Vowel Examples', () => {
    nonVrddhiExamples.forEach((example, index) => {
      test(`${example.vowel} in ${example.word} (${example.meaning}) should not be vṛddhi`, () => {
        expect(isVrddhi(example.vowel)).toBe(example.isVrddhi);
        expect(example.analysis).toContain('not vṛddhi');
      });
    });
  });

  describe('Vowel Analysis Function', () => {
    test('analyzeVowel should provide detailed analysis for vṛddhi vowels', () => {
      const analysis = analyzeVowel('ā');
      expect(analysis.isVrddhi).toBe(true);
      expect(analysis.category).toBe('long-a');
      expect(analysis.script).toBe('IAST');
      expect(analysis.explanation).toContain('vṛddhi vowel');
    });

    test('analyzeVowel should handle Devanagari vowels', () => {
      const analysis = analyzeVowel('ऐ');
      expect(analysis.isVrddhi).toBe(true);
      expect(analysis.category).toBe('diphthong-ai');
      expect(analysis.script).toBe('Devanagari');
    });

    test('analyzeVowel should handle invalid inputs', () => {
      const analysis = analyzeVowel('');
      expect(analysis.isValid).toBe(false);
      expect(analysis.isVrddhi).toBe(false);
      expect(analysis.explanation).toContain('Invalid');
    });
  });

  describe('Vṛddhi Transformation Validation', () => {
    transformationExamples.forEach((example, index) => {
      test(`${example.original} → ${example.transformed}: ${example.process}`, () => {
        const result = isValidVrddhiTransformation(example.original, example.transformed);
        expect(result).toBe(example.valid);
      });
    });
  });

  describe('Sutra Application', () => {
    test('applySutra111 should provide comprehensive analysis', () => {
      const result = applySutra111('ā');
      expect(result.sutraApplied).toBe('1.1.1');
      expect(result.sutraName).toBe('vṛddhirādaic');
      expect(result.classification).toBe('vṛddhi');
      expect(result.isVrddhi).toBe(true);
      expect(result.traditionalDefinition).toContain('ā, ai, au');
      expect(result.examples).toBeDefined();
    });

    test('applySutra111 should classify non-vṛddhi vowels correctly', () => {
      const result = applySutra111('i');
      expect(result.classification).toBe('non-vṛddhi');
      expect(result.isVrddhi).toBe(false);
    });
  });

  describe('Literary and Cultural Examples', () => {
    literaryExamples.forEach((example, index) => {
      test(`${example.word} from ${example.source} - ${example.context}`, () => {
        expect(isVrddhi(example.vowel)).toBe(true);
        expect(example.analysis).toContain('vṛddhi');
        expect(['Epic literature', 'Philosophical text', 'Religious tradition', 'Descriptive literature']).toContain(example.source);
      });
    });
  });

  describe('Original Test Suite Integration (IAST)', () => {
    iastTestCases.forEach(({ word, expected }) => {
      const firstVowel = getFirstIastVowel(word);

      test(`should return ${expected} for the first vowel of "${word}" (vowel: ${firstVowel})`, () => {
        expect(firstVowel).toBeDefined();
        expect(isVrddhi(firstVowel)).toBe(expected);
      });
    });
  });

  describe('Original Test Suite Integration (Devanagari)', () => {
    devanagariTestCases.forEach(({ word, expected }) => {
      const firstVowel = TransliterationUtil.getFirstDevanagariVowel(word);
      const iastVowel = firstVowel ? TransliterationUtil.transliterate(firstVowel) : undefined;

      test(`should return ${expected} for the first vowel of "${word}" (vowel: ${iastVowel})`, () => {
        expect(iastVowel).toBeDefined();
        expect(isVrddhi(iastVowel)).toBe(expected);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle null and undefined inputs', () => {
      expect(isVrddhi(null)).toBe(false);
      expect(isVrddhi(undefined)).toBe(false);
      expect(isVrddhi('')).toBe(false);
    });

    test('should handle invalid vowel strings', () => {
      expect(isVrddhi('xyz')).toBe(false);
      expect(isVrddhi('123')).toBe(false);
      expect(isVrddhi('क')).toBe(false); // consonant
    });

    test('should handle mixed script inputs gracefully', () => {
      expect(isVrddhi('āआ')).toBe(false); // mixed script not recognized
    });
  });

  describe('Performance and Consistency', () => {
    test('function consistency across multiple calls', () => {
      const testVowels = ['ā', 'ai', 'au', 'a', 'i', 'u'];
      testVowels.forEach(vowel => {
        const results = [];
        for (let i = 0; i < 10; i++) {
          results.push(isVrddhi(vowel));
        }
        expect(results.every(r => r === results[0])).toBe(true);
      });
    });

    test('performance with large number of calls', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        isVrddhi('ā');
        isVrddhi('ai');
        isVrddhi('au');
        isVrddhi('a');
      }
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(100); // Should be very fast
    });
  });

  describe('Sanskrit Grammar Integration', () => {
    test('should support grammatical analysis of Sanskrit words', () => {
      const testCases = [
        { word: 'kāraṇa', expectedVowel: 'ā', expectedCategory: 'long-a' },
        { word: 'vaidya', expectedVowel: 'ai', expectedCategory: 'diphthong-ai' },
        { word: 'gaura', expectedVowel: 'au', expectedCategory: 'diphthong-au' }
      ];
      
      testCases.forEach(({ word, expectedVowel, expectedCategory }) => {
        const firstVowel = getFirstIastVowel(word);
        expect(firstVowel).toBe(expectedVowel);
        const analysis = analyzeVowel(firstVowel);
        expect(analysis.isValid).toBe(true);
        expect(analysis.category).toBe(expectedCategory);
      });
    });

    test('should distinguish between primary and secondary vṛddhi vowels', () => {
      // Primary vṛddhi: ā, ai, au
      expect(isVrddhi('ā')).toBe(true);
      expect(isVrddhi('ai')).toBe(true);
      expect(isVrddhi('au')).toBe(true);
      
      // These are the only vṛddhi vowels according to 1.1.1
      expect(vrddhiVowels).toHaveLength(3);
      expect(vrddhiVowelsDevanagari).toHaveLength(3);
    });
  });
});
