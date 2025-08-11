/**
 * Tests for Vṛddham Analysis Utilities
 * @fileoverview Comprehensive test suite for Sanskrit वृद्धम् classification functions
 */

import {
  TYAD_ADI_WORDS,
  ENG_VOWELS,
  VRDDHAM_TYPES,
  isVrddhamPhonetic,
  isEngVowel,
  analyzeFirstVowel,
  isTyadAdi,
  isVrddhamLexical,
  isVrddhamEastern,
  analyzeVrddham,
  isVrddham,
  getVrddhamExamples,
  getAllTyadAdiWords,
  getAllEngVowels
} from './vrddham-analysis.js';

describe('Vṛddham Analysis Utilities', () => {
  describe('Constants and Structure', () => {
    it('should have correct TYAD_ADI_WORDS structure', () => {
      expect(TYAD_ADI_WORDS).toHaveProperty('iast');
      expect(TYAD_ADI_WORDS).toHaveProperty('devanagari');
      expect(Array.isArray(TYAD_ADI_WORDS.iast)).toBe(true);
      expect(Array.isArray(TYAD_ADI_WORDS.devanagari)).toBe(true);
      expect(TYAD_ADI_WORDS.iast.length).toBeGreaterThan(0);
      expect(TYAD_ADI_WORDS.devanagari.length).toBeGreaterThan(0);
    });

    it('should have correct ENG_VOWELS structure', () => {
      expect(ENG_VOWELS).toHaveProperty('iast');
      expect(ENG_VOWELS).toHaveProperty('devanagari');
      expect(ENG_VOWELS.iast).toEqual(['e', 'o']);
      expect(ENG_VOWELS.devanagari).toContain('ए');
      expect(ENG_VOWELS.devanagari).toContain('ओ');
    });

    it('should have correct VRDDHAM_TYPES structure', () => {
      expect(VRDDHAM_TYPES).toHaveProperty('PHONETIC');
      expect(VRDDHAM_TYPES).toHaveProperty('LEXICAL');
      expect(VRDDHAM_TYPES).toHaveProperty('EASTERN_REGIONAL');
    });
  });

  describe('Phonetic Vṛddham Analysis (Sutra 1.1.73)', () => {
    describe('isVrddhamPhonetic', () => {
      it('should identify words with vṛddhi as first vowel', () => {
        expect(isVrddhamPhonetic('ātmā')).toBe(true);
        expect(isVrddhamPhonetic('आत्मा')).toBe(true);
        expect(isVrddhamPhonetic('aiśvarya')).toBe(true);
        expect(isVrddhamPhonetic('ऐश्वर्य')).toBe(true);
        expect(isVrddhamPhonetic('auṣadha')).toBe(true);
        expect(isVrddhamPhonetic('औषध')).toBe(true);
      });

      it('should reject words with non-vṛddhi first vowels', () => {
        expect(isVrddhamPhonetic('rama')).toBe(false);
        expect(isVrddhamPhonetic('राम')).toBe(false);
        expect(isVrddhamPhonetic('guru')).toBe(false);
        expect(isVrddhamPhonetic('गुरु')).toBe(false);
        expect(isVrddhamPhonetic('indra')).toBe(false);
        expect(isVrddhamPhonetic('इन्द्र')).toBe(false);
      });

      it('should handle words with consonant clusters before first vowel', () => {
        expect(isVrddhamPhonetic('krāma')).toBe(true);  // ka + rā -> first vowel is ā
        expect(isVrddhamPhonetic('prāṇa')).toBe(true);  // pa + rā -> first vowel is ā
        expect(isVrddhamPhonetic('krama')).toBe(false); // ka + ra -> first vowel is a
      });

      it('should handle invalid inputs gracefully', () => {
        expect(isVrddhamPhonetic('')).toBe(false);
        expect(isVrddhamPhonetic(null)).toBe(false);
        expect(isVrddhamPhonetic(undefined)).toBe(false);
        expect(isVrddhamPhonetic(123)).toBe(false);
      });
    });

    describe('analyzeFirstVowel', () => {
      it('should correctly identify first vowel and its properties', () => {
        const result = analyzeFirstVowel('ātmā');
        expect(result.firstVowel).toBe('ā');
        expect(result.isVrddhi).toBe(true);
        expect(result.isEngVowel).toBe(false);
        expect(result.position).toBe(0);
      });

      it('should handle words with multiple vowels', () => {
        const result = analyzeFirstVowel('aiśvarya');
        expect(result.firstVowel).toBe('ai');
        expect(result.isVrddhi).toBe(true);
        expect(result.allVowels.length).toBeGreaterThan(1);
      });

      it('should handle words starting with consonants', () => {
        const result = analyzeFirstVowel('rama');
        expect(result.firstVowel).toBe('a');
        expect(result.isVrddhi).toBe(false);
        expect(result.position).toBeGreaterThan(0);
      });
    });
  });

  describe('Lexical Vṛddham Analysis (Sutra 1.1.74)', () => {
    describe('isTyadAdi', () => {
      it('should identify words in त्यदादि list (IAST)', () => {
        expect(isTyadAdi('tyad')).toBe(true);
        expect(isTyadAdi('tyena')).toBe(true);
        expect(isTyadAdi('tysya')).toBe(true);
        expect(isTyadAdi('tyam')).toBe(true);
      });

      it('should identify words in त्यदादि list (Devanagari)', () => {
        expect(isTyadAdi('त्यद्')).toBe(true);
        expect(isTyadAdi('त्येन')).toBe(true);
        expect(isTyadAdi('त्यस्य')).toBe(true);
        expect(isTyadAdi('त्यम्')).toBe(true);
      });

      it('should reject words not in त्यदादि list', () => {
        expect(isTyadAdi('rama')).toBe(false);
        expect(isTyadAdi('राम')).toBe(false);
        expect(isTyadAdi('guru')).toBe(false);
        expect(isTyadAdi('गुरु')).toBe(false);
      });

      it('should handle invalid inputs', () => {
        expect(isTyadAdi('')).toBe(false);
        expect(isTyadAdi(null)).toBe(false);
        expect(isTyadAdi(undefined)).toBe(false);
      });
    });

    describe('isVrddhamLexical', () => {
      it('should be equivalent to isTyadAdi', () => {
        const testWords = ['tyad', 'त्यद्', 'rama', 'राम'];
        testWords.forEach(word => {
          expect(isVrddhamLexical(word)).toBe(isTyadAdi(word));
        });
      });
    });
  });

  describe('Eastern Regional Vṛddham Analysis (Sutra 1.1.75)', () => {
    describe('isEngVowel', () => {
      it('should identify e and o vowels (IAST)', () => {
        expect(isEngVowel('e')).toBe(true);
        expect(isEngVowel('o')).toBe(true);
        expect(isEngVowel('a')).toBe(false);
        expect(isEngVowel('i')).toBe(false);
        expect(isEngVowel('u')).toBe(false);
      });

      it('should identify ए and ओ vowels (Devanagari)', () => {
        expect(isEngVowel('ए')).toBe(true);
        expect(isEngVowel('ओ')).toBe(true);
        expect(isEngVowel('े')).toBe(true); // diacritical form
        expect(isEngVowel('ो')).toBe(true); // diacritical form
        expect(isEngVowel('अ')).toBe(false);
        expect(isEngVowel('इ')).toBe(false);
      });

      it('should handle invalid inputs', () => {
        expect(isEngVowel('')).toBe(false);
        expect(isEngVowel(null)).toBe(false);
        expect(isEngVowel(undefined)).toBe(false);
      });
    });

    describe('isVrddhamEastern', () => {
      it('should identify words with e/o as first vowel when Eastern tradition enabled', () => {
        const context = { tradition: 'eastern' };
        expect(isVrddhamEastern('ekādaśa', context)).toBe(true);
        expect(isVrddhamEastern('एकादश', context)).toBe(true);
        expect(isVrddhamEastern('ojas', context)).toBe(true);
        expect(isVrddhamEastern('ओजस्', context)).toBe(true);
      });

      it('should reject words with e/o when Eastern tradition not enabled', () => {
        const context = {}; // no tradition specified
        expect(isVrddhamEastern('ekādaśa', context)).toBe(false);
        expect(isVrddhamEastern('ojas', context)).toBe(false);
      });

      it('should work with different context flags', () => {
        expect(isVrddhamEastern('ekādaśa', { region: 'prācya' })).toBe(true);
        expect(isVrddhamEastern('ekādaśa', { allowEasternRules: true })).toBe(true);
        expect(isVrddhamEastern('ekādaśa', { includeOptionalRules: true })).toBe(true);
      });

      it('should reject words with non-eng first vowels even with Eastern tradition', () => {
        const context = { tradition: 'eastern' };
        expect(isVrddhamEastern('rama', context)).toBe(false);
        expect(isVrddhamEastern('guru', context)).toBe(false);
      });
    });
  });

  describe('Comprehensive Vṛddham Analysis', () => {
    describe('analyzeVrddham', () => {
      it('should provide complete analysis for phonetic vṛddham', () => {
        const result = analyzeVrddham('ātmā');
        expect(result.isVrddham).toBe(true);
        expect(result.vrddhamTypes).toContain(VRDDHAM_TYPES.PHONETIC);
        expect(result.classifications.phonetic).toBe(true);
        expect(result.classifications.lexical).toBe(false);
        expect(result.classifications.eastern).toBe(false);
        expect(result.confidence).toBe(1.0);
        expect(result.sutraReferences).toContain('1.1.73');
      });

      it('should provide complete analysis for lexical vṛddham', () => {
        const result = analyzeVrddham('tyad');
        expect(result.isVrddham).toBe(true);
        expect(result.vrddhamTypes).toContain(VRDDHAM_TYPES.LEXICAL);
        expect(result.classifications.phonetic).toBe(false);
        expect(result.classifications.lexical).toBe(true);
        expect(result.classifications.eastern).toBe(false);
        expect(result.confidence).toBe(0.9);
        expect(result.sutraReferences).toContain('1.1.74');
      });

      it('should provide complete analysis for Eastern vṛddham', () => {
        const context = { tradition: 'eastern' };
        const result = analyzeVrddham('ekādaśa', context);
        expect(result.isVrddham).toBe(true);
        expect(result.vrddhamTypes).toContain(VRDDHAM_TYPES.EASTERN_REGIONAL);
        expect(result.classifications.phonetic).toBe(false);
        expect(result.classifications.lexical).toBe(false);
        expect(result.classifications.eastern).toBe(true);
        expect(result.confidence).toBe(0.8);
        expect(result.sutraReferences).toContain('1.1.75');
      });

      it('should handle words with multiple vṛddham classifications', () => {
        // Create a hypothetical word that could match multiple criteria
        const result = analyzeVrddham('ātmā'); // phonetic vṛddham
        expect(result.vrddhamTypes.length).toBeGreaterThan(0);
        expect(result.confidence).toBeGreaterThan(0);
      });

      it('should handle non-vṛddham words', () => {
        const result = analyzeVrddham('rama');
        expect(result.isVrddham).toBe(false);
        expect(result.vrddhamTypes.length).toBe(0);
        expect(result.confidence).toBe(0);
        expect(result.reasoning).toContain('Word does not qualify as vṛddham under any criteria');
      });

      it('should handle invalid inputs gracefully', () => {
        const result = analyzeVrddham('');
        expect(result.isVrddham).toBe(false);
        expect(result.reasoning).toContain('Invalid input: word must be a non-empty string');
      });
    });

    describe('isVrddham', () => {
      it('should be a simplified wrapper for analyzeVrddham', () => {
        expect(isVrddham('ātmā')).toBe(true);
        expect(isVrddham('tyad')).toBe(true);
        expect(isVrddham('ekādaśa', { tradition: 'eastern' })).toBe(true);
        expect(isVrddham('rama')).toBe(false);
      });
    });
  });

  describe('Utility Functions', () => {
    describe('getVrddhamExamples', () => {
      it('should provide comprehensive examples', () => {
        const examples = getVrddhamExamples();
        expect(examples).toHaveProperty('phonetic');
        expect(examples).toHaveProperty('lexical');
        expect(examples).toHaveProperty('eastern');
        expect(examples).toHaveProperty('traditionalNote');
        
        expect(Array.isArray(examples.phonetic.examples)).toBe(true);
        expect(Array.isArray(examples.lexical.examples)).toBe(true);
        expect(Array.isArray(examples.eastern.examples)).toBe(true);
        
        expect(examples.phonetic.examples.length).toBeGreaterThan(0);
        expect(examples.lexical.examples.length).toBeGreaterThan(0);
        expect(examples.eastern.examples.length).toBeGreaterThan(0);
      });
    });

    describe('getAllTyadAdiWords', () => {
      it('should return all त्यदादि words', () => {
        const words = getAllTyadAdiWords();
        expect(words).toHaveProperty('iast');
        expect(words).toHaveProperty('devanagari');
        expect(words).toHaveProperty('combined');
        
        expect(Array.isArray(words.iast)).toBe(true);
        expect(Array.isArray(words.devanagari)).toBe(true);
        expect(Array.isArray(words.combined)).toBe(true);
        
        expect(words.iast.length).toBeGreaterThan(0);
        expect(words.devanagari.length).toBeGreaterThan(0);
        expect(words.combined.length).toBe(words.iast.length + words.devanagari.length);
      });
    });

    describe('getAllEngVowels', () => {
      it('should return all एङ् vowels', () => {
        const vowels = getAllEngVowels();
        expect(vowels).toHaveProperty('iast');
        expect(vowels).toHaveProperty('devanagari');
        expect(vowels).toHaveProperty('combined');
        
        expect(vowels.iast).toEqual(['e', 'o']);
        expect(vowels.devanagari).toContain('ए');
        expect(vowels.devanagari).toContain('ओ');
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle null and undefined inputs gracefully', () => {
      expect(isVrddhamPhonetic(null)).toBe(false);
      expect(isTyadAdi(undefined)).toBe(false);
      expect(isEngVowel(null)).toBe(false);
      expect(isVrddham(undefined)).toBe(false);
    });

    it('should handle empty strings appropriately', () => {
      expect(isVrddhamPhonetic('')).toBe(false);
      expect(isTyadAdi('')).toBe(false);
      expect(isEngVowel('')).toBe(false);
      expect(isVrddham('')).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(isVrddhamPhonetic(123)).toBe(false);
      expect(isTyadAdi([])).toBe(false);
      expect(isEngVowel({})).toBe(false);
      expect(isVrddham(123)).toBe(false);
    });
  });

  describe('Integration with Real Sanskrit Examples', () => {
    it('should correctly analyze traditional Sanskrit words', () => {
      const phoneticExamples = ['ātmā', 'आत्मा', 'aiśvarya', 'ऐश्वर्य', 'auṣadha', 'औषध'];
      phoneticExamples.forEach(word => {
        expect(isVrddham(word)).toBe(true);
        const analysis = analyzeVrddham(word);
        expect(analysis.classifications.phonetic).toBe(true);
      });

      const lexicalExamples = ['tyad', 'त्यद्', 'tyena', 'त्येन'];
      lexicalExamples.forEach(word => {
        expect(isVrddham(word)).toBe(true);
        const analysis = analyzeVrddham(word);
        expect(analysis.classifications.lexical).toBe(true);
      });

      const easternExamples = ['ekādaśa', 'एकादश', 'ojas', 'ओजस्'];
      const easternContext = { tradition: 'eastern' };
      easternExamples.forEach(word => {
        expect(isVrddham(word, easternContext)).toBe(true);
        const analysis = analyzeVrddham(word, easternContext);
        expect(analysis.classifications.eastern).toBe(true);
      });
    });

    it('should handle complex Sanskrit words correctly', () => {
      expect(isVrddham('rāmāyaṇa')).toBe(true); // First vowel is 'ā' which is vṛddhi
      expect(isVrddham('mahābhārata')).toBe(false); // First vowel is 'a', not vṛddhi
      expect(isVrddham('bhagavadgītā')).toBe(false); // First vowel is 'a'
      
      // But words starting with vṛddhi should work
      expect(isVrddham('ārya')).toBe(true);
      expect(isVrddham('āśrama')).toBe(true);
    });

    it('should respect context settings appropriately', () => {
      const word = 'etad';
      expect(isVrddham(word)).toBe(false); // No context
      expect(isVrddham(word, { tradition: 'standard' })).toBe(false);
      expect(isVrddham(word, { tradition: 'eastern' })).toBe(true);
      expect(isVrddham(word, { allowEasternRules: true })).toBe(true);
    });
  });
});
