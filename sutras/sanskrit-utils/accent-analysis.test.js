/**
 * Tests for Accent Analysis Utilities
 * 
 * Tests the functionality for analyzing Vedic Sanskrit accents
 * according to Panini's system defined in Sutras 1.2.29-1.2.31
 */

import {
  ACCENT_TYPES,
  ACCENT_MARKERS,
  analyzeVowelAccent,
  isUdattaMark,
  isAnudattaMark, 
  isSvaritaMark,
  isUdatta,
  isAnudatta,
  isSvarita,
  applyUdatta,
  applyAnudatta,
  applySvarita,
  getAccentVariants
} from './accent-analysis.js';

describe('Accent Analysis Utilities', () => {
  
  describe('Constants', () => {
    test('ACCENT_TYPES should be defined correctly', () => {
      expect(ACCENT_TYPES.UDATTA).toBe('udātta');
      expect(ACCENT_TYPES.ANUDATTA).toBe('anudātta');
      expect(ACCENT_TYPES.SVARITA).toBe('svarita');
    });

    test('ACCENT_MARKERS should contain IAST and Devanagari markers', () => {
      expect(ACCENT_MARKERS.IAST).toBeDefined();
      expect(ACCENT_MARKERS.DEVANAGARI).toBeDefined();
      
      expect(ACCENT_MARKERS.IAST.UDATTA).toBe('́');
      expect(ACCENT_MARKERS.IAST.ANUDATTA).toBe('̀');
      expect(ACCENT_MARKERS.IAST.SVARITA).toBe('̂');
    });
  });

  describe('analyzeVowelAccent', () => {
    test('should analyze IAST vowels with accent marks', () => {
      const udattaResult = analyzeVowelAccent('á');
      expect(udattaResult.isValid).toBe(true);
      expect(udattaResult.accentType).toBe(ACCENT_TYPES.UDATTA);
      expect(udattaResult.baseVowel).toBe('a');
      expect(udattaResult.isUdatta).toBe(true);

      const anudattaResult = analyzeVowelAccent('à');  
      expect(anudattaResult.isValid).toBe(true);
      expect(anudattaResult.accentType).toBe(ACCENT_TYPES.ANUDATTA);
      expect(anudattaResult.baseVowel).toBe('a');
      expect(anudattaResult.isAnudatta).toBe(true);

      const svaritaResult = analyzeVowelAccent('â');
      expect(svaritaResult.isValid).toBe(true);
      expect(svaritaResult.accentType).toBe(ACCENT_TYPES.SVARITA);
      expect(svaritaResult.baseVowel).toBe('a');
      expect(svaritaResult.isSvarita).toBe(true);
    });

    test('should handle vowels without accent marks', () => {
      const result = analyzeVowelAccent('a');
      expect(result.isValid).toBe(true);
      expect(result.accentType).toBe(ACCENT_TYPES.SVARITA); // Default to svarita
      expect(result.baseVowel).toBe('a');
      expect(result.isSvarita).toBe(false); // Only true if explicitly marked
    });

    test('should handle vowels without accent marks in strict mode', () => {
      const result = analyzeVowelAccent('a', { strict: true });
      expect(result.isValid).toBe(true);
      expect(result.accentType).toBe(null); // No accent determined in strict mode
      expect(result.baseVowel).toBe('a');
    });

    test('should reject non-vowel input', () => {
      const result = analyzeVowelAccent('k');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('not a vowel');
    });

    test('should reject invalid input', () => {
      const result = analyzeVowelAccent('');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid vowel input');
    });

    test('should work with long vowels', () => {
      const result = analyzeVowelAccent('ā́');
      expect(result.isValid).toBe(true);
      expect(result.accentType).toBe(ACCENT_TYPES.UDATTA);
      expect(result.baseVowel).toBe('ā');
    });

    test('should work with complex vowels', () => {
      const result = analyzeVowelAccent('aí');
      expect(result.isValid).toBe(true);
      expect(result.accentType).toBe(ACCENT_TYPES.UDATTA);
      expect(result.baseVowel).toBe('ai');
    });
  });

  describe('Accent mark detection functions', () => {
    test('isUdattaMark should identify udātta marks correctly', () => {
      expect(isUdattaMark('́', 'IAST')).toBe(true);
      expect(isUdattaMark('\u0951', 'DEVANAGARI')).toBe(true);
      expect(isUdattaMark('̀', 'IAST')).toBe(false);
    });

    test('isAnudattaMark should identify anudātta marks correctly', () => {
      expect(isAnudattaMark('̀', 'IAST')).toBe(true);
      expect(isAnudattaMark('\u0952', 'DEVANAGARI')).toBe(true);
      expect(isAnudattaMark('́', 'IAST')).toBe(false);
    });

    test('isSvaritaMark should identify svarita marks correctly', () => {
      expect(isSvaritaMark('̂', 'IAST')).toBe(true);
      expect(isSvaritaMark('\u1CDA', 'DEVANAGARI')).toBe(true);
      expect(isSvaritaMark('́', 'IAST')).toBe(false);
    });
  });

  describe('Accent classification functions', () => {
    test('isUdatta should identify udātta vowels correctly', () => {
      expect(isUdatta('á')).toBe(true);
      expect(isUdatta('ī́')).toBe(true);
      expect(isUdatta('à')).toBe(false);
      expect(isUdatta('a')).toBe(false);
    });

    test('isAnudatta should identify anudātta vowels correctly', () => {
      expect(isAnudatta('à')).toBe(true);
      expect(isAnudatta('ū̀')).toBe(true);
      expect(isAnudatta('á')).toBe(false);
      expect(isAnudatta('a')).toBe(false);
    });

    test('isSvarita should identify svarita vowels correctly', () => {
      expect(isSvarita('â')).toBe(true);
      expect(isSvarita('a')).toBe(true); // Unmarked = svarita in non-strict mode
      expect(isSvarita('á')).toBe(false);
      expect(isSvarita('à')).toBe(false);
    });

    test('accent functions should work with options', () => {
      expect(isSvarita('a', { strict: false })).toBe(true);
      expect(isSvarita('a', { strict: true })).toBe(false);
    });
  });

  describe('Accent application functions', () => {
    test('applyUdatta should add udātta accent', () => {
      const aResult = applyUdatta('a');
      const iResult = applyUdatta('i');
      const aLongResult = applyUdatta('ā');
      
      // Check for acute accent using Unicode normalization
      expect(aResult.normalize('NFD')).toContain('\u0301');
      expect(iResult.normalize('NFD')).toContain('\u0301');
      expect(aLongResult.normalize('NFD')).toContain('\u0301');
    });

    test('applyAnudatta should add anudātta accent', () => {
      expect(applyAnudatta('a')).toBe('à');
      expect(applyAnudatta('i')).toBe('ì');
      expect(applyAnudatta('ū')).toBe('ū̀');
    });

    test('applySvarita should add svarita accent', () => {
      const aResult = applySvarita('a');
      const eResult = applySvarita('e');
      const oResult = applySvarita('o');
      
      // Check for circumflex accent using Unicode normalization
      expect(aResult.normalize('NFD')).toContain('\u0302');
      expect(eResult.normalize('NFD')).toContain('\u0302');
      expect(oResult.normalize('NFD')).toContain('\u0302');
    });

    test('accent application should reject non-vowels', () => {
      expect(() => applyUdatta('k')).toThrow('Input must be a vowel');
      expect(() => applyAnudatta('t')).toThrow('Input must be a vowel');
      expect(() => applySvarita('p')).toThrow('Input must be a vowel');
    });

    test('accent application should work with different scripts', () => {
      expect(applyUdatta('a', 'DEVANAGARI')).toBe('a\u0951');
      expect(applyAnudatta('a', 'DEVANAGARI')).toBe('a\u0952');
      expect(applySvarita('a', 'DEVANAGARI')).toBe('a\u1CDA');
    });
  });

  describe('getAccentVariants', () => {
    test('should return all accent variants of a vowel', () => {
      const variants = getAccentVariants('a');
      expect(variants.base).toBe('a');
      
      // Check using Unicode normalization
      expect(variants.udatta.normalize('NFD')).toContain('\u0301'); // acute
      expect(variants.anudatta.normalize('NFD')).toContain('\u0300'); // grave  
      expect(variants.svarita.normalize('NFD')).toContain('\u0302'); // circumflex
    });

    test('should work with long vowels', () => {
      const variants = getAccentVariants('ā');
      expect(variants.base).toBe('ā');
      expect(variants.udatta).toBe('ā́');
      expect(variants.anudatta).toBe('ā̀');
      expect(variants.svarita).toBe('ā̂');
    });

    test('should work with different scripts', () => {
      const variants = getAccentVariants('a', 'DEVANAGARI');
      expect(variants.base).toBe('a');
      expect(variants.udatta).toBe('a\u0951');
      expect(variants.anudatta).toBe('a\u0952');
      expect(variants.svarita).toBe('a\u1CDA');
    });

    test('should reject non-vowels', () => {
      expect(() => getAccentVariants('k')).toThrow('Input must be a vowel');
    });
  });

  describe('Complex accent scenarios', () => {
    test('should handle multiple accent marks correctly', () => {
      // This is technically invalid, but function should handle gracefully
      const result = analyzeVowelAccent('á̀'); // Both udātta and anudātta
      expect(result.isValid).toBe(false); // Should be invalid
      expect(result.error).toContain('Input is not a vowel'); // Our function now rejects this as invalid
    });

    test('should work with diphthongs', () => {
      expect(isUdatta('aí')).toBe(true);
      expect(isAnudatta('aù')).toBe(true);
      expect(isSvarita('ai')).toBe(true); // Unmarked diphthong
    });

    test('should handle edge case vowels', () => {
      expect(isUdatta('ṛ́')).toBe(true);
      expect(isAnudatta('ḷ̀')).toBe(true);
      expect(isSvarita('ṝ')).toBe(true);
    });
  });

  describe('Integration with script detection', () => {
    test('should auto-detect script correctly', () => {
      const iastResult = analyzeVowelAccent('á');
      expect(iastResult.script).toBe('IAST');

      // Note: For full Devanagari test, we'd need actual Devanagari vowels
      // This tests the integration point
      expect(iastResult.isValid).toBe(true);
    });
  });
});
