/**
 * Comprehensive test cases for Sutra 1.1.10: नाज्झलौ
 * Testing vowel-consonant homogeneity restrictions
 */

import { 
  checkHomogeneityRestriction,
  analyzePhonemeTypes,
  getHomogeneityExamples
} from './index.js';

describe('Sutra 1.1.10: नाज्झलौ - Comprehensive Tests', () => {
  
  describe('Core Homogeneity Restrictions', () => {
    it('should prevent vowel-consonant homogeneity', () => {
      // Vowel vs consonant - never homogeneous
      expect(checkHomogeneityRestriction('a', 'k')).toBe(false);
      expect(checkHomogeneityRestriction('i', 't')).toBe(false);
      expect(checkHomogeneityRestriction('u', 'p')).toBe(false);
      expect(checkHomogeneityRestriction('e', 'c')).toBe(false);
      expect(checkHomogeneityRestriction('o', 'ṭ')).toBe(false);
    });

    it('should handle Devanagari vowel-consonant pairs', () => {
      expect(checkHomogeneityRestriction('अ', 'क')).toBe(false);
      expect(checkHomogeneityRestriction('इ', 'त')).toBe(false);
      expect(checkHomogeneityRestriction('उ', 'प')).toBe(false);
      expect(checkHomogeneityRestriction('ए', 'च')).toBe(false);
      expect(checkHomogeneityRestriction('ओ', 'ट')).toBe(false);
    });

    it('should not restrict vowel-vowel combinations', () => {
      // Vowel vs vowel - requires further analysis (not restricted by this sutra)
      expect(checkHomogeneityRestriction('a', 'i')).not.toBe(false);
      expect(checkHomogeneityRestriction('e', 'o')).not.toBe(false);
      expect(checkHomogeneityRestriction('अ', 'इ')).not.toBe(false);
    });

    it('should not restrict consonant-consonant combinations', () => {
      // Consonant vs consonant - requires further analysis
      expect(checkHomogeneityRestriction('k', 't')).not.toBe(false);
      expect(checkHomogeneityRestriction('p', 'c')).not.toBe(false);
      expect(checkHomogeneityRestriction('क', 'त')).not.toBe(false);
    });
  });

  describe('Phoneme Type Analysis', () => {
    it('should correctly identify phoneme types', () => {
      const analysis1 = analyzePhonemeTypes('a', 'k');
      expect(analysis1.phoneme1Type).toBe('vowel');
      expect(analysis1.phoneme2Type).toBe('consonant');
      expect(analysis1.restriction).toBe('vowel_consonant_incompatible');

      const analysis2 = analyzePhonemeTypes('क', 'अ');
      expect(analysis2.phoneme1Type).toBe('consonant');
      expect(analysis2.phoneme2Type).toBe('vowel');
      expect(analysis2.restriction).toBe('vowel_consonant_incompatible');
    });

    it('should handle same-type phonemes', () => {
      const vowelAnalysis = analyzePhonemeTypes('a', 'i');
      expect(vowelAnalysis.phoneme1Type).toBe('vowel');
      expect(vowelAnalysis.phoneme2Type).toBe('vowel');
      expect(vowelAnalysis.restriction).toBe('none');

      const consonantAnalysis = analyzePhonemeTypes('k', 't');
      expect(consonantAnalysis.phoneme1Type).toBe('consonant');
      expect(consonantAnalysis.phoneme2Type).toBe('consonant');
      expect(consonantAnalysis.restriction).toBe('none');
    });
  });

  describe('Real-world Sanskrit Examples', () => {
    it('should prevent homogeneity in actual Sanskrit contexts', () => {
      // Common vowel-consonant pairs that cannot be savarṇa
      const examples = [
        ['a', 'k'], ['i', 'g'], ['u', 'ṅ'], ['ṛ', 'c'], ['ḷ', 'j'],
        ['e', 't'], ['o', 'd'], ['ai', 'n'], ['au', 'p'], ['aḥ', 'b']
      ];

      examples.forEach(([vowel, consonant]) => {
        expect(checkHomogeneityRestriction(vowel, consonant)).toBe(false);
        expect(checkHomogeneityRestriction(consonant, vowel)).toBe(false);
      });
    });

    it('should handle complex phonemes', () => {
      // Aspirated consonants vs vowels
      expect(checkHomogeneityRestriction('a', 'kh')).toBe(false);
      expect(checkHomogeneityRestriction('ā', 'gh')).toBe(false);
      
      // Long vowels vs consonants
      expect(checkHomogeneityRestriction('ī', 't')).toBe(false);
      expect(checkHomogeneityRestriction('ū', 'd')).toBe(false);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle invalid inputs', () => {
      expect(checkHomogeneityRestriction('', 'k')).toBe(false);
      expect(checkHomogeneityRestriction('a', '')).toBe(false);
      expect(checkHomogeneityRestriction('', '')).toBe(false);
      expect(checkHomogeneityRestriction(null, 'k')).toBe(false);
      expect(checkHomogeneityRestriction('a', null)).toBe(false);
    });

    it('should handle mixed scripts', () => {
      expect(checkHomogeneityRestriction('a', 'क')).toBe(false);
      expect(checkHomogeneityRestriction('अ', 'k')).toBe(false);
    });

    it('should handle unknown phonemes gracefully', () => {
      expect(checkHomogeneityRestriction('x', 'y')).toBe(false);
      expect(checkHomogeneityRestriction('z', 'a')).toBe(false);
    });
  });

  describe('Integration with Homogeneity Rules', () => {
    it('should provide examples for educational purposes', () => {
      const examples = getHomogeneityExamples();
      
      expect(examples.vowelConsonantPairs).toBeDefined();
      expect(examples.vowelConsonantPairs.length).toBeGreaterThan(0);
      
      expect(examples.allowedVowelPairs).toBeDefined();
      expect(examples.allowedConsonantPairs).toBeDefined();
    });

    it('should correctly categorize phoneme relationships', () => {
      // This sutra specifically prevents vowel-consonant homogeneity
      // but doesn't determine positive homogeneity for same-type phonemes
      
      const vowelConsonantResult = checkHomogeneityRestriction('a', 'k');
      expect(vowelConsonantResult).toBe(false); // Definitely not homogeneous
      
      const vowelVowelResult = checkHomogeneityRestriction('a', 'i');
      expect(typeof vowelVowelResult).toBe('boolean'); // Requires further analysis
      
      const consonantConsonantResult = checkHomogeneityRestriction('k', 't');
      expect(typeof consonantConsonantResult).toBe('boolean'); // Requires further analysis
    });
  });

  describe('Performance and Robustness', () => {
    it('should handle large inputs efficiently', () => {
      const start = Date.now();
      
      for (let i = 0; i < 1000; i++) {
        checkHomogeneityRestriction('a', 'k');
        checkHomogeneityRestriction('i', 't');
        checkHomogeneityRestriction('u', 'p');
      }
      
      const end = Date.now();
      expect(end - start).toBeLessThan(100); // Should be very fast
    });

    it('should be consistent across multiple calls', () => {
      const testPairs = [['a', 'k'], ['i', 't'], ['u', 'p'], ['e', 'c']];
      
      testPairs.forEach(([vowel, consonant]) => {
        const result1 = checkHomogeneityRestriction(vowel, consonant);
        const result2 = checkHomogeneityRestriction(vowel, consonant);
        const result3 = checkHomogeneityRestriction(vowel, consonant);
        
        expect(result1).toBe(result2);
        expect(result2).toBe(result3);
        expect(result1).toBe(false); // All should be false
      });
    });
  });

  describe('Linguistic Accuracy', () => {
    it('should align with traditional grammar rules', () => {
      // According to traditional Sanskrit grammar,
      // vowels and consonants can never be savarṇa
      
      const traditionalExamples = [
        // Place of articulation pairs that still cannot be homogeneous
        ['a', 'h'],   // Both guttural, but vowel vs consonant
        ['i', 'y'],   // Both palatal, but vowel vs consonant  
        ['u', 'v'],   // Both labial, but vowel vs consonant
        ['ṛ', 'r'],   // Both cerebral, but vowel vs consonant
        ['ḷ', 'l']    // Both dental, but vowel vs consonant
      ];

      traditionalExamples.forEach(([vowel, consonant]) => {
        expect(checkHomogeneityRestriction(vowel, consonant)).toBe(false);
      });
    });

    it('should respect classical commentaries', () => {
      // Even phonemes with identical place and effort cannot be homogeneous
      // if one is vowel and other is consonant
      
      expect(checkHomogeneityRestriction('a', 'k')).toBe(false); // Both kaṇṭhya
      expect(checkHomogeneityRestriction('i', 'c')).toBe(false); // Both tālavya
      expect(checkHomogeneityRestriction('u', 'p')).toBe(false); // Both oṣṭhya
      expect(checkHomogeneityRestriction('ṛ', 'ṭ')).toBe(false); // Both mūrdhanya
      expect(checkHomogeneityRestriction('ḷ', 't')).toBe(false); // Both dantya
    });
  });
});
