/**
 * Tests for Phonetic Classification Utilities
 * 
 * Comprehensive test suite covering सवर्ण (homorganic) relationships,
 * articulatory classifications, and phonetic feature analysis.
 */

import {
  SAVARNA_GROUPS,
  IAST_SAVARNA_GROUPS,
  ARTICULATION_PLACES,
  areSavarna,
  getSavarnaGroup,
  getArticulationPlace,
  analyzePhoneticFeatures,
  validatePhoneticClassification
} from './phonetic-classification.js';

describe('Phonetic Classification Utilities', () => {
  
  describe('SAVARNA_GROUPS Constants', () => {
    test('should contain all major phoneme groups', () => {
      // Test guttural group
      expect(SAVARNA_GROUPS['क']).toContain('ख');
      expect(SAVARNA_GROUPS['क']).toContain('अ');
      expect(SAVARNA_GROUPS['क']).toContain('आ');
      
      // Test palatal group
      expect(SAVARNA_GROUPS['च']).toContain('ज');
      expect(SAVARNA_GROUPS['च']).toContain('इ');
      expect(SAVARNA_GROUPS['च']).toContain('ए');
      
      // Test retroflex group
      expect(SAVARNA_GROUPS['ट']).toContain('ड');
      expect(SAVARNA_GROUPS['ट']).toContain('ऋ');
      
      // Test dental group
      expect(SAVARNA_GROUPS['त']).toContain('द');
      expect(SAVARNA_GROUPS['त']).toContain('स');
      
      // Test labial group
      expect(SAVARNA_GROUPS['प']).toContain('ब');
      expect(SAVARNA_GROUPS['प']).toContain('उ');
      expect(SAVARNA_GROUPS['प']).toContain('ओ');
    });

    test('should have symmetric relationships', () => {
      // If क is savarna with ख, then ख should be savarna with क
      expect(SAVARNA_GROUPS['क']).toContain('ख');
      expect(SAVARNA_GROUPS['ख']).toContain('क');
      
      expect(SAVARNA_GROUPS['च']).toContain('ज');
      expect(SAVARNA_GROUPS['ज']).toContain('च');
    });
  });

  describe('IAST_SAVARNA_GROUPS Constants', () => {
    test('should contain corresponding IAST groups', () => {
      // Test guttural group
      expect(IAST_SAVARNA_GROUPS['k']).toContain('kh');
      expect(IAST_SAVARNA_GROUPS['k']).toContain('a');
      expect(IAST_SAVARNA_GROUPS['k']).toContain('ā');
      
      // Test palatal group
      expect(IAST_SAVARNA_GROUPS['c']).toContain('j');
      expect(IAST_SAVARNA_GROUPS['c']).toContain('i');
      expect(IAST_SAVARNA_GROUPS['c']).toContain('e');
      
      // Test retroflex group
      expect(IAST_SAVARNA_GROUPS['ṭ']).toContain('ḍ');
      expect(IAST_SAVARNA_GROUPS['ṭ']).toContain('ṛ');
    });
  });

  describe('areSavarna()', () => {
    test('should correctly identify savarna relationships in Devanagari', () => {
      // Guttural savarna
      expect(areSavarna('क', 'ख')).toBe(true);
      expect(areSavarna('क', 'अ')).toBe(true);
      expect(areSavarna('ग', 'आ')).toBe(true);
      
      // Palatal savarna
      expect(areSavarna('च', 'ज')).toBe(true);
      expect(areSavarna('च', 'इ')).toBe(true);
      expect(areSavarna('ञ', 'ए')).toBe(true);
      
      // Retroflex savarna
      expect(areSavarna('ट', 'ड')).toBe(true);
      expect(areSavarna('ण', 'ऋ')).toBe(true);
      
      // Dental savarna
      expect(areSavarna('त', 'द')).toBe(true);
      expect(areSavarna('न', 'स')).toBe(true);
      
      // Labial savarna
      expect(areSavarna('प', 'ब')).toBe(true);
      expect(areSavarna('म', 'उ')).toBe(true);
      expect(areSavarna('भ', 'औ')).toBe(true);
    });

    test('should correctly identify savarna relationships in IAST', () => {
      // Guttural savarna
      expect(areSavarna('k', 'kh')).toBe(true);
      expect(areSavarna('k', 'a')).toBe(true);
      expect(areSavarna('g', 'ā')).toBe(true);
      
      // Palatal savarna
      expect(areSavarna('c', 'j')).toBe(true);
      expect(areSavarna('c', 'i')).toBe(true);
      expect(areSavarna('ñ', 'e')).toBe(true);
      
      // Retroflex savarna
      expect(areSavarna('ṭ', 'ḍ')).toBe(true);
      expect(areSavarna('ṇ', 'ṛ')).toBe(true);
    });

    test('should correctly reject non-savarna relationships', () => {
      // Different places of articulation
      expect(areSavarna('क', 'च')).toBe(false);  // Guttural vs Palatal
      expect(areSavarna('त', 'प')).toBe(false);  // Dental vs Labial
      expect(areSavarna('ट', 'म')).toBe(false);  // Retroflex vs Labial
      
      // IAST
      expect(areSavarna('k', 'c')).toBe(false);
      expect(areSavarna('t', 'p')).toBe(false);
    });

    test('should handle invalid input gracefully', () => {
      expect(areSavarna('', 'क')).toBe(false);
      expect(areSavarna('क', '')).toBe(false);
      expect(areSavarna(null, 'क')).toBe(false);
      expect(areSavarna('क', null)).toBe(false);
      expect(areSavarna(undefined, 'क')).toBe(false);
    });

    test('should be symmetric', () => {
      expect(areSavarna('क', 'ख')).toBe(areSavarna('ख', 'क'));
      expect(areSavarna('च', 'इ')).toBe(areSavarna('इ', 'च'));
      expect(areSavarna('k', 'kh')).toBe(areSavarna('kh', 'k'));
    });
  });

  describe('getSavarnaGroup()', () => {
    test('should return correct savarna groups for Devanagari', () => {
      const gutturalGroup = getSavarnaGroup('क');
      expect(gutturalGroup).toContain('क');
      expect(gutturalGroup).toContain('ख');
      expect(gutturalGroup).toContain('अ');
      expect(gutturalGroup).toContain('आ');
      
      const palatalGroup = getSavarnaGroup('च');
      expect(palatalGroup).toContain('च');
      expect(palatalGroup).toContain('ज');
      expect(palatalGroup).toContain('इ');
      expect(palatalGroup).toContain('ए');
    });

    test('should return correct savarna groups for IAST', () => {
      const gutturalGroup = getSavarnaGroup('k');
      expect(gutturalGroup).toContain('k');
      expect(gutturalGroup).toContain('kh');
      expect(gutturalGroup).toContain('a');
      expect(gutturalGroup).toContain('ā');
    });

    test('should return null for invalid phonemes', () => {
      expect(getSavarnaGroup('')).toBe(null);
      expect(getSavarnaGroup(null)).toBe(null);
      expect(getSavarnaGroup(undefined)).toBe(null);
      expect(getSavarnaGroup('xyz')).toBe(null);
    });
  });

  describe('getArticulationPlace()', () => {
    test('should identify correct articulation places for Devanagari', () => {
      // Gutturals
      expect(getArticulationPlace('क')).toBe('guttural');
      expect(getArticulationPlace('अ')).toBe('guttural');
      
      // Palatals
      expect(getArticulationPlace('च')).toBe('palatal');
      expect(getArticulationPlace('इ')).toBe('palatal');
      
      // Retroflexes
      expect(getArticulationPlace('ट')).toBe('retroflex');
      expect(getArticulationPlace('ऋ')).toBe('retroflex');
      
      // Dentals
      expect(getArticulationPlace('त')).toBe('dental');
      expect(getArticulationPlace('स')).toBe('dental');
      
      // Labials
      expect(getArticulationPlace('प')).toBe('labial');
      expect(getArticulationPlace('उ')).toBe('labial');
    });

    test('should identify correct articulation places for IAST', () => {
      expect(getArticulationPlace('k')).toBe('guttural');
      expect(getArticulationPlace('c')).toBe('palatal');
      expect(getArticulationPlace('ṭ')).toBe('retroflex');
      expect(getArticulationPlace('t')).toBe('dental');
      expect(getArticulationPlace('p')).toBe('labial');
    });

    test('should return null for invalid phonemes', () => {
      expect(getArticulationPlace('')).toBe(null);
      expect(getArticulationPlace(null)).toBe(null);
      expect(getArticulationPlace('xyz')).toBe(null);
    });
  });

  describe('analyzePhoneticFeatures()', () => {
    test('should provide comprehensive analysis for valid phonemes', () => {
      const analysis = analyzePhoneticFeatures('क');
      
      expect(analysis.isValid).toBe(true);
      expect(analysis.phoneme).toBe('क');
      expect(analysis.script).toBe('Devanagari');
      expect(analysis.savarnaGroup).toContain('क');
      expect(analysis.articulationPlace).toBe('guttural');
      expect(analysis.isConsonant).toBe(true);
      expect(analysis.isVowel).toBe(false);
    });

    test('should identify vowels correctly', () => {
      const vowelAnalysis = analyzePhoneticFeatures('अ');
      
      expect(vowelAnalysis.isValid).toBe(true);
      expect(vowelAnalysis.isVowel).toBe(true);
      expect(vowelAnalysis.isConsonant).toBe(false);
      
      const iastVowelAnalysis = analyzePhoneticFeatures('a');
      expect(iastVowelAnalysis.isVowel).toBe(true);
    });

    test('should handle invalid input gracefully', () => {
      const invalidAnalysis = analyzePhoneticFeatures('');
      
      expect(invalidAnalysis.isValid).toBe(false);
      expect(invalidAnalysis.error).toBe('Invalid phoneme input');
    });

    test('should work with IAST script', () => {
      const iastAnalysis = analyzePhoneticFeatures('k');
      
      expect(iastAnalysis.isValid).toBe(true);
      expect(iastAnalysis.script).toBe('IAST');
      expect(iastAnalysis.savarnaGroup).toContain('k');
      expect(iastAnalysis.articulationPlace).toBe('guttural');
    });
  });

  describe('validatePhoneticClassification()', () => {
    test('should validate recognized phonemes', () => {
      const validation = validatePhoneticClassification('क');
      
      expect(validation.isValid).toBe(true);
      expect(validation.phoneme).toBe('क');
      expect(validation.hasSavarnaGroup).toBe(true);
      expect(validation.hasArticulationPlace).toBe(true);
      expect(validation.isRecognized).toBe(true);
    });

    test('should handle invalid phonemes', () => {
      const validation = validatePhoneticClassification('xyz');
      
      expect(validation.isValid).toBe(true);
      expect(validation.hasSavarnaGroup).toBe(false);
      expect(validation.hasArticulationPlace).toBe(false);
      expect(validation.isRecognized).toBe(false);
    });

    test('should handle empty input', () => {
      const validation = validatePhoneticClassification('');
      
      expect(validation.isValid).toBe(false);
    });
  });

  describe('Edge Cases and Comprehensive Coverage', () => {
    test('should handle all vowels correctly', () => {
      const vowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ए', 'ऐ', 'ओ', 'औ'];
      
      vowels.forEach(vowel => {
        const group = getSavarnaGroup(vowel);
        expect(group).not.toBe(null);
        expect(group).toContain(vowel);
        
        const place = getArticulationPlace(vowel);
        expect(place).not.toBe(null);
      });
    });

    test('should handle all consonants correctly', () => {
      const consonants = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 
                          'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
                          'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'];
      
      consonants.forEach(consonant => {
        const group = getSavarnaGroup(consonant);
        expect(group).not.toBe(null);
        expect(group).toContain(consonant);
        
        const place = getArticulationPlace(consonant);
        expect(place).not.toBe(null);
      });
    });

    test('should maintain consistency between Devanagari and IAST', () => {
      // Test parallel phonemes
      const pairs = [
        ['क', 'k'], ['च', 'c'], ['ट', 'ṭ'], ['त', 't'], ['प', 'p'],
        ['अ', 'a'], ['इ', 'i'], ['उ', 'u'], ['ऋ', 'ṛ'], ['ए', 'e'], ['ओ', 'o']
      ];
      
      pairs.forEach(([dev, iast]) => {
        const devPlace = getArticulationPlace(dev);
        const iastPlace = getArticulationPlace(iast);
        expect(devPlace).toBe(iastPlace);
      });
    });

    test('should handle semivowels and sibilants correctly', () => {
      // Semivowels
      expect(areSavarna('य', 'इ')).toBe(true);  // य is related to palatals
      expect(areSavarna('र', 'ऋ')).toBe(true);  // र is related to retroflexes
      expect(areSavarna('व', 'उ')).toBe(true);  // व is related to labials
      
      // Sibilants
      expect(areSavarna('श', 'इ')).toBe(true);  // श is palatal
      expect(areSavarna('ष', 'ऋ')).toBe(true);  // ष is retroflex
      expect(areSavarna('ह', 'अ')).toBe(true);  // ह is guttural
    });
  });
});
