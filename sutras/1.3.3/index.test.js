import { isFinalConsonantItMarker } from './index.js';

// Test data for different types of consonant endings
const POSITIVE_IAST = [
  'gam', 'pat', 'bhaj', 'vad', 'labh',
  'car', 'yuj', 'budh', 'kṣip', 'grah', 'han', 'rāj'
];

const POSITIVE_DEV = [
  'गम्', 'पत्', 'भज्', 'वद्', 'लभ्',
  'चर्', 'युज्', 'बुध्', 'क्षिप्', 'ग्रह्', 'हन्', 'राज्'
];

const NEGATIVE_IAST = [
  'bhū', 'kṛ', 'nī', 'sthā', // vowel endings
  'gaja', 'rama', 'deva', 'guru', 'śiṣya', 'māla', 'katha', 'gīta',
  '', null, 'xyz123', 'अ', 'इ', 'उ'
];

const NEGATIVE_DEV = [
  'गज', 'राम', 'देव', 'गुरु', 'शिष्य', 'माला', 'कथा', 'गीता', // inherent a vowel endings
  '', null, '123'
];

const EDGE_CASES = [
  // Words with visarga and anusvara (these are consonant endings)
  { word: 'rāmaḥ', expected: true, reason: 'visarga-consonant' },
  { word: 'रामः', expected: true, reason: 'visarga-consonant' },
  { word: 'gajaṃ', expected: true, reason: 'anusvara-consonant' },
  { word: 'गजं', expected: true, reason: 'anusvara-consonant' },
  
  // Explicit halanta cases
  { word: 'राम्', expected: true, reason: 'explicit-halanta' },
  { word: 'गज्', expected: true, reason: 'explicit-halanta' }
];

describe('Sutra 1.3.3: हलन्त्यम् (halantyam)', () => {
  
  describe('Positive cases - Final consonants as it-markers (IAST)', () => {
    POSITIVE_IAST.forEach(word => {
      test(`"${word}" should have final consonant as it-marker`, () => {
        const result = isFinalConsonantItMarker(word);
        expect(result.isIt).toBe(true);
        expect(result.reason).toBe('final-consonant-it-marker');
        expect(result.consonant).toBeTruthy();
        expect(result.script).toBe('IAST');
        expect(result.consonantType).toBeTruthy();
      });
    });
  });

  describe('Positive cases - Final consonants as it-markers (Devanagari)', () => {
    POSITIVE_DEV.forEach(word => {
      test(`"${word}" should have final consonant as it-marker`, () => {
        const result = isFinalConsonantItMarker(word);
        expect(result.isIt).toBe(true);
        expect(result.reason).toBe('final-consonant-it-marker');
        expect(result.consonant).toBeTruthy();
        expect(result.script).toBe('Devanagari');
        expect(result.consonantType).toBeTruthy();
      });
    });
  });

  describe('Negative cases - Non-consonant endings (IAST)', () => {
    NEGATIVE_IAST.forEach(word => {
      test(`"${word}" should not be a final consonant it-marker`, () => {
        const result = isFinalConsonantItMarker(word);
        expect(result.isIt).toBe(false);
        expect(['not-consonant-ending', 'invalid-input', 'empty-input']).toContain(result.reason);
      });
    });
  });

  describe('Negative cases - Non-consonant endings (Devanagari)', () => {
    NEGATIVE_DEV.forEach(word => {
      test(`"${word}" should not be a final consonant it-marker`, () => {
        const result = isFinalConsonantItMarker(word);
        expect(result.isIt).toBe(false);
        expect(['not-consonant-ending', 'invalid-input', 'empty-input', 'vowel-ending-with-inherent-a']).toContain(result.reason);
      });
    });
  });

  describe('Edge cases - Special consonant endings', () => {
    EDGE_CASES.forEach(({ word, expected, reason }) => {
      test(`"${word}" should ${expected ? 'be' : 'not be'} final consonant it-marker (${reason})`, () => {
        const result = isFinalConsonantItMarker(word);
        expect(result.isIt).toBe(expected);
        if (expected) {
          expect(result.reason).toBe('final-consonant-it-marker');
          expect(result.consonant).toBeTruthy();
        }
      });
    });
  });

  describe('Consonant type classification', () => {
    const consonantTests = [
      { word: 'pak', expectedType: 'velar', desc: 'velar consonant' },
      { word: 'yaj', expectedType: 'palatal', desc: 'palatal consonant' }, 
      { word: 'kaṭ', expectedType: 'retroflex', desc: 'retroflex consonant' },
      { word: 'ghat', expectedType: 'dental', desc: 'dental consonant' },
      { word: 'gup', expectedType: 'labial', desc: 'labial consonant' },
      { word: 'car', expectedType: 'semivowel', desc: 'semivowel' },
      { word: 'paś', expectedType: 'sibilant', desc: 'sibilant' }
    ];

    consonantTests.forEach(({ word, expectedType, desc }) => {
      test(`"${word}" should be classified as ${desc}`, () => {
        const result = isFinalConsonantItMarker(word);
        expect(result.isIt).toBe(true);
        expect(result.consonantType).toBe(expectedType);
      });
    });
  });

  describe('Return value structure validation', () => {
    test('should return proper structure for valid consonant-ending word', () => {
      const result = isFinalConsonantItMarker('gam');
      
      expect(result).toHaveProperty('isIt', true);
      expect(result).toHaveProperty('consonant', 'm');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'final-consonant-it-marker');
      expect(result).toHaveProperty('consonantType');
    });

    test('should return proper structure for vowel-ending word', () => {
      const result = isFinalConsonantItMarker('bhū');
      
      expect(result).toHaveProperty('isIt', false);
      expect(result).toHaveProperty('consonant', 'ū');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'not-consonant-ending');
      expect(result).toHaveProperty('consonantType', null);
    });

    test('should return proper structure for invalid input', () => {
      const result = isFinalConsonantItMarker(null);
      
      expect(result).toHaveProperty('isIt', false);
      expect(result).toHaveProperty('consonant', null);
      expect(result).toHaveProperty('script', null);
      expect(result).toHaveProperty('reason', 'invalid-input');
      expect(result).toHaveProperty('consonantType', null);
    });
  });

  describe('Integration with existing classification system', () => {
    test('should correctly identify dhātu roots ending in consonants', () => {
      const consonantRoots = ['gam', 'pat'];
      const vowelRoots = ['bhū', 'kṛ'];
      
      consonantRoots.forEach(root => {
        const result = isFinalConsonantItMarker(root);
        expect(result.isIt).toBe(true);
        expect(result.reason).toBe('final-consonant-it-marker');
      });

      vowelRoots.forEach(root => {
        const result = isFinalConsonantItMarker(root);
        expect(result.isIt).toBe(false);
        expect(result.reason).toBe('not-consonant-ending');
      });
    });

    test('should work with multi-script inputs', () => {
      const pairs = [
        { iast: 'gam', dev: 'गम्' },
        { iast: 'pat', dev: 'पत्' }
      ];

      pairs.forEach(({ iast, dev }) => {
        const iastResult = isFinalConsonantItMarker(iast);
        const devResult = isFinalConsonantItMarker(dev);
        
        expect(iastResult.isIt).toBe(devResult.isIt);
        expect(iastResult.consonantType).toBe(devResult.consonantType);
      });
    });
  });
});
