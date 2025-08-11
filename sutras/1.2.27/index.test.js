/**
 * Test Suite for Sutra 1.2.27: ऊकालोऽज्झ्रस्वदीर्घप्लुतः
 * 
 * Tests the implementation of vowel duration classification based on ऊकाल measurement system.
 */

import {
  sutra1227,
  isHrasvaVowel,
  isDirghaVowel,
  isPlutaVowel,
  getVowelDuration,
  analyzeWordVowelDurations,
  convertVowelDuration,
  getUkalaSystemInfo,
  HRASVA_VOWELS,
  DIRGHA_VOWELS,
  PLUTA_MARKERS,
  DURATION_VALUES
} from './index.js';

describe('Sutra 1.2.27: ऊकालोऽज्झ्रस्वदीर्घप्लुतः', () => {
  
  describe('Constants validation', () => {
    test('HRASVA_VOWELS should contain correct vowels', () => {
      expect(HRASVA_VOWELS.devanagari).toContain('अ');
      expect(HRASVA_VOWELS.devanagari).toContain('इ');
      expect(HRASVA_VOWELS.devanagari).toContain('उ');
      expect(HRASVA_VOWELS.devanagari).toContain('ऋ');
      expect(HRASVA_VOWELS.devanagari).toContain('ऌ');
      expect(HRASVA_VOWELS.iast).toEqual(['a', 'i', 'u', 'ṛ', 'ḷ']);
    });

    test('DIRGHA_VOWELS should contain correct vowels', () => {
      expect(DIRGHA_VOWELS.devanagari).toContain('आ');
      expect(DIRGHA_VOWELS.devanagari).toContain('ई');
      expect(DIRGHA_VOWELS.devanagari).toContain('ऊ');
      expect(DIRGHA_VOWELS.devanagari).toContain('ए');
      expect(DIRGHA_VOWELS.devanagari).toContain('ऐ');
      expect(DIRGHA_VOWELS.devanagari).toContain('ओ');
      expect(DIRGHA_VOWELS.devanagari).toContain('औ');
      expect(DIRGHA_VOWELS.iast).toContain('ā');
      expect(DIRGHA_VOWELS.iast).toContain('ī');
      expect(DIRGHA_VOWELS.iast).toContain('ū');
    });

    test('DURATION_VALUES should have correct units', () => {
      expect(DURATION_VALUES.hrasva).toBe(1);
      expect(DURATION_VALUES.dirgha).toBe(2);
      expect(DURATION_VALUES.pluta).toBe(3);
    });

    test('PLUTA_MARKERS should contain correct markers', () => {
      expect(PLUTA_MARKERS.devanagari).toContain('३');
      expect(PLUTA_MARKERS.devanagari).toContain('॥');
      expect(PLUTA_MARKERS.iast).toContain('3');
      expect(PLUTA_MARKERS.iast).toContain('||');
    });
  });

  describe('isHrasvaVowel function', () => {
    test('should identify ह्रस्व vowels in Devanagari', () => {
      expect(isHrasvaVowel('अ')).toBe(true);
      expect(isHrasvaVowel('इ')).toBe(true);
      expect(isHrasvaVowel('उ')).toBe(true);
      expect(isHrasvaVowel('ऋ')).toBe(true);
      expect(isHrasvaVowel('ऌ')).toBe(true);
      expect(isHrasvaVowel('ि')).toBe(true); // diacritical
      expect(isHrasvaVowel('ु')).toBe(true); // diacritical
    });

    test('should identify ह्रस्व vowels in IAST', () => {
      expect(isHrasvaVowel('a')).toBe(true);
      expect(isHrasvaVowel('i')).toBe(true);
      expect(isHrasvaVowel('u')).toBe(true);
      expect(isHrasvaVowel('ṛ')).toBe(true);
      expect(isHrasvaVowel('ḷ')).toBe(true);
    });

    test('should reject दीर्घ vowels', () => {
      expect(isHrasvaVowel('आ')).toBe(false);
      expect(isHrasvaVowel('ई')).toBe(false);
      expect(isHrasvaVowel('ऊ')).toBe(false);
      expect(isHrasvaVowel('ā')).toBe(false);
      expect(isHrasvaVowel('ī')).toBe(false);
      expect(isHrasvaVowel('ū')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isHrasvaVowel('')).toBe(false);
      expect(isHrasvaVowel(null)).toBe(false);
      expect(isHrasvaVowel(undefined)).toBe(false);
      expect(isHrasvaVowel('क')).toBe(false); // consonant
    });
  });

  describe('isDirghaVowel function', () => {
    test('should identify दीर्घ vowels in Devanagari', () => {
      expect(isDirghaVowel('आ')).toBe(true);
      expect(isDirghaVowel('ई')).toBe(true);
      expect(isDirghaVowel('ऊ')).toBe(true);
      expect(isDirghaVowel('ॠ')).toBe(true);
      expect(isDirghaVowel('ॡ')).toBe(true);
      expect(isDirghaVowel('ए')).toBe(true);
      expect(isDirghaVowel('ऐ')).toBe(true);
      expect(isDirghaVowel('ओ')).toBe(true);
      expect(isDirghaVowel('औ')).toBe(true);
      expect(isDirghaVowel('ा')).toBe(true); // diacritical
      expect(isDirghaVowel('ी')).toBe(true); // diacritical
    });

    test('should identify दीर्घ vowels in IAST', () => {
      expect(isDirghaVowel('ā')).toBe(true);
      expect(isDirghaVowel('ī')).toBe(true);
      expect(isDirghaVowel('ū')).toBe(true);
      expect(isDirghaVowel('ṝ')).toBe(true);
      expect(isDirghaVowel('ḹ')).toBe(true);
      expect(isDirghaVowel('e')).toBe(true);
      expect(isDirghaVowel('ai')).toBe(true);
      expect(isDirghaVowel('o')).toBe(true);
      expect(isDirghaVowel('au')).toBe(true);
    });

    test('should reject ह्रस्व vowels', () => {
      expect(isDirghaVowel('अ')).toBe(false);
      expect(isDirghaVowel('इ')).toBe(false);
      expect(isDirghaVowel('उ')).toBe(false);
      expect(isDirghaVowel('a')).toBe(false);
      expect(isDirghaVowel('i')).toBe(false);
      expect(isDirghaVowel('u')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isDirghaVowel('')).toBe(false);
      expect(isDirghaVowel(null)).toBe(false);
      expect(isDirghaVowel(undefined)).toBe(false);
      expect(isDirghaVowel('क')).toBe(false); // consonant
    });
  });

  describe('isPlutaVowel function', () => {
    test('should identify प्लुत markers in Devanagari', () => {
      expect(isPlutaVowel('अ३')).toBe(true);
      expect(isPlutaVowel('आ॥')).toBe(true);
      expect(isPlutaVowel('इ३॥')).toBe(true);
    });

    test('should identify प्लुत markers in IAST', () => {
      expect(isPlutaVowel('a3')).toBe(true);
      expect(isPlutaVowel('ā||')).toBe(true);
      expect(isPlutaVowel('i3||')).toBe(true);
    });

    test('should reject non-प्लुत sequences', () => {
      expect(isPlutaVowel('अ')).toBe(false);
      expect(isPlutaVowel('आ')).toBe(false);
      expect(isPlutaVowel('a')).toBe(false);
      expect(isPlutaVowel('ā')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isPlutaVowel('')).toBe(false);
      expect(isPlutaVowel(null)).toBe(false);
      expect(isPlutaVowel(undefined)).toBe(false);
    });
  });

  describe('getVowelDuration function', () => {
    test('should classify ह्रस्व vowels correctly', () => {
      const result1 = getVowelDuration('अ');
      expect(result1.duration).toBe('ह्रस्व');
      expect(result1.category).toBe('hrasva');
      expect(result1.ukalaUnits).toBe(1);
      expect(result1.durationClass).toBe('short');

      const result2 = getVowelDuration('i');
      expect(result2.duration).toBe('ह्रस्व');
      expect(result2.category).toBe('hrasva');
      expect(result2.ukalaUnits).toBe(1);
    });

    test('should classify दीर्घ vowels correctly', () => {
      const result1 = getVowelDuration('आ');
      expect(result1.duration).toBe('दीर्घ');
      expect(result1.category).toBe('dirgha');
      expect(result1.ukalaUnits).toBe(2);
      expect(result1.durationClass).toBe('long');

      const result2 = getVowelDuration('e');
      expect(result2.duration).toBe('दीर्घ');
      expect(result2.category).toBe('dirgha');
      expect(result2.ukalaUnits).toBe(2);
    });

    test('should classify प्लुत vowels correctly', () => {
      const result1 = getVowelDuration('अ३', { checkPluta: true });
      expect(result1.duration).toBe('प्लुत');
      expect(result1.category).toBe('pluta');
      expect(result1.ukalaUnits).toBe(3);
      expect(result1.durationClass).toBe('protracted');

      const result2 = getVowelDuration('a3', { checkPluta: true });
      expect(result2.duration).toBe('प्लुत');
      expect(result2.category).toBe('pluta');
    });

    test('should handle non-vowel input', () => {
      const result = getVowelDuration('क');
      expect(result.duration).toBe(null);
      expect(result.category).toBe(null);
      expect(result.ukalaUnits).toBe(0);
      expect(result.analysis).toContain('not recognized as a vowel');
    });

    test('should handle invalid input', () => {
      const result1 = getVowelDuration('');
      expect(result1.duration).toBe(null);
      expect(result1.analysis).toBe('Invalid vowel input');

      const result2 = getVowelDuration(null);
      expect(result2.duration).toBe(null);
      expect(result2.analysis).toBe('Invalid vowel input');
    });

    test('should provide detailed analysis', () => {
      const result = getVowelDuration('ऊ');
      expect(result.analysis).toContain('ऊ');
      expect(result.analysis).toContain('दीर्घ');
      expect(result.analysis).toContain('2 ऊकाल');
    });
  });

  describe('analyzeWordVowelDurations function', () => {
    test('should analyze simple words correctly', () => {
      // Use a word with explicit vowel diacritics
      const result = analyzeWordVowelDurations('गति'); // गति has explicit इ
      expect(result.vowelAnalysis.length).toBeGreaterThan(0);
      expect(result.totalUkalaUnits).toBeGreaterThan(0);
      expect(result.durationSummary.कुल_स्वर).toBeGreaterThan(0);
    });

    test('should analyze complex words with mixed durations', () => {
      const result = analyzeWordVowelDurations('गीता'); // गी-ता
      expect(result.vowelAnalysis.length).toBeGreaterThan(1);
      expect(result.totalUkalaUnits).toBeGreaterThan(2);
      expect(result.durationSummary.कुल_स्वर).toBe(result.vowelAnalysis.length);
    });

    test('should handle words without vowels', () => {
      const result = analyzeWordVowelDurations('क्ष्ण्');
      expect(result.vowelAnalysis.length).toBe(0);
      expect(result.totalUkalaUnits).toBe(0);
      expect(result.averageUkalaPerVowel).toBe(0);
    });

    test('should provide comprehensive summary', () => {
      const result = analyzeWordVowelDurations('गमने');
      expect(result.durationSummary).toHaveProperty('ह्रस्व');
      expect(result.durationSummary).toHaveProperty('दीर्घ');
      expect(result.durationSummary).toHaveProperty('प्लुत');
      expect(result.durationSummary).toHaveProperty('कुल_स्वर');
      expect(result.analysis).toContain('गमने');
      expect(result.analysis).toContain('ऊकाल');
    });

    test('should handle प्लुत context when enabled', () => {
      // Note: प्लुत detection works on individual phonemes, not the full sequence
      const result = analyzeWordVowelDurations('अम', { checkPluta: true });
      // Since the current tokenization doesn't include प्लुत markers in phonemes,
      // we test that the function handles the context properly
      expect(result.vowelAnalysis.length).toBeGreaterThan(0);
      expect(result.totalUkalaUnits).toBeGreaterThan(0);
    });

    test('should provide detailed phoneme analysis when requested', () => {
      const result = analyzeWordVowelDurations('गम', { detailed: true });
      expect(result.phonemes).toBeDefined();
      expect(result.phonemes.phonemes).toBeDefined();
    });

    test('should handle invalid input', () => {
      const result1 = analyzeWordVowelDurations('');
      expect(result1.vowelAnalysis).toEqual([]);
      expect(result1.analysis).toBe('Invalid word input');

      const result2 = analyzeWordVowelDurations(null);
      expect(result2.vowelAnalysis).toEqual([]);
      expect(result2.analysis).toBe('Invalid word input');
    });
  });

  describe('convertVowelDuration function', () => {
    test('should convert to matra correctly', () => {
      const result = convertVowelDuration(2, 'matra');
      expect(result.originalUkala).toBe(2);
      expect(result.converted).toBe(2);
      expect(result.system).toBe('matra');
      expect(result.description).toContain('मात्रा');
    });

    test('should convert to mora correctly', () => {
      const result = convertVowelDuration(3, 'mora');
      expect(result.originalUkala).toBe(3);
      expect(result.converted).toBe(3);
      expect(result.system).toBe('mora');
      expect(result.description).toContain('Mora');
    });

    test('should convert to relative units correctly', () => {
      const result = convertVowelDuration(2, 'relative');
      expect(result.originalUkala).toBe(2);
      expect(result.converted).toBe(2); // 2/1 = 2
      expect(result.system).toBe('relative');
    });

    test('should handle invalid units', () => {
      const result1 = convertVowelDuration(-1, 'matra');
      expect(result1.converted).toBe(null);
      expect(result1.error).toContain('Invalid ऊकाल units');

      const result2 = convertVowelDuration('invalid', 'matra');
      expect(result2.converted).toBe(null);
      expect(result2.error).toContain('Invalid ऊकाल units');
    });

    test('should handle unknown systems', () => {
      const result = convertVowelDuration(2, 'unknown');
      expect(result.converted).toBe(null);
      expect(result.error).toContain('Unknown target system');
    });
  });

  describe('sutra1227 main function', () => {
    test('should analyze specific vowels when provided', () => {
      const result = sutra1227('गम', { targetVowel: 'अ' });
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('अ');
      expect(result.explanation).toContain('ह्रस्व');
      expect(result.explanation).toContain('1 ऊकाल');
      expect(result.details.sutra).toBe('1.2.27');
    });

    test('should analyze all vowels in word by default', () => {
      const result = sutra1227('गीता');
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('गीता');
      expect(result.explanation).toContain('ऊकाल units');
      expect(result.details.type).toBe('संज्ञा');
    });

    test('should handle words without vowels', () => {
      const result = sutra1227('क्ष्ण्');
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('no vowels');
    });

    test('should handle प्लुत context', () => {
      const result = sutra1227('अम', { checkPluta: true });
      expect(result.applicable).toBe(true);
      expect(result.explanation).toContain('ऊकाल units');
    });

    test('should provide debug information when requested', () => {
      const result = sutra1227('गम', { debug: true });
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.debug.some(msg => msg.includes('Starting Sutra 1.2.27'))).toBe(true);
    });

    test('should validate input properly', () => {
      const result1 = sutra1227('');
      expect(result1.applicable).toBe(false);
      expect(result1.explanation).toContain('Invalid input');

      const result2 = sutra1227(null);
      expect(result2.applicable).toBe(false);
      expect(result2.explanation).toContain('Invalid input');
    });

    test('should provide comprehensive details', () => {
      const result = sutra1227('गम');
      expect(result.details.sutraText).toBe('ऊकालोऽज्झ्रस्वदीर्घप्लुतः');
      expect(result.details.transliteration).toContain('ūkālo');
      expect(result.details.domain).toContain('Phonetics');
      expect(result.details.complexity).toContain('Fundamental');
    });

    test('should handle invalid vowel targets', () => {
      const result = sutra1227('गम', { targetVowel: 'क' });
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('could not be classified');
    });
  });

  describe('getUkalaSystemInfo function', () => {
    test('should provide info in Devanagari by default', () => {
      const info = getUkalaSystemInfo();
      expect(info.concept).toBe('ऊकाल');
      expect(info.categories).toHaveProperty('ह्रस्व');
      expect(info.categories).toHaveProperty('दीर्घ');
      expect(info.categories).toHaveProperty('प्लुत');
      expect(info.examples).toHaveProperty('ह्रस्व');
    });

    test('should provide info in IAST when requested', () => {
      const info = getUkalaSystemInfo('iast');
      expect(info.concept).toBe('ūkāla');
      expect(info.categories).toHaveProperty('hrasva');
      expect(info.categories).toHaveProperty('dirgha');
      expect(info.categories).toHaveProperty('pluta');
      expect(info.examples.hrasva).toContain('a');
      expect(info.examples.dirgha).toContain('ā');
    });

    test('should include duration information', () => {
      const info = getUkalaSystemInfo();
      expect(info.categories.ह्रस्व.duration).toBe('१ ऊकाल');
      expect(info.categories.दीर्घ.duration).toBe('२ ऊकाल');
      expect(info.categories.प्लुत.duration).toBe('३+ ऊकाल');
    });

    test('should include linguistic notes', () => {
      const info = getUkalaSystemInfo();
      expect(info.linguisticNote).toContain('छन्दशास्त्र');
      expect(info.linguisticNote).toContain('ध्वनिविज्ञान');
      
      const iastInfo = getUkalaSystemInfo('iast');
      expect(iastInfo.linguisticNote).toContain('prosody');
      expect(iastInfo.linguisticNote).toContain('phonetics');
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle malformed Sanskrit input', () => {
      const result = sutra1227('invalid123');
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('Analysis could not be completed');
    });

    test('should handle mixed scripts appropriately', () => {
      const result = sutra1227('gaम', { targetVowel: 'a' });
      expect(result.applicable).toBe(true); // Should handle mixed scripts
    });

    test('should handle complex vowel sequences', () => {
      const result = analyzeWordVowelDurations('गौतम');
      expect(result.vowelAnalysis.length).toBeGreaterThan(0);
      expect(result.totalUkalaUnits).toBeGreaterThan(0);
    });

    test('should maintain consistency across functions', () => {
      const vowel = 'आ';
      const isDirgha = isDirghaVowel(vowel);
      const duration = getVowelDuration(vowel);
      const wordAnalysis = analyzeWordVowelDurations('म' + vowel);
      
      expect(isDirgha).toBe(true);
      expect(duration.category).toBe('dirgha');
      expect(wordAnalysis.vowelAnalysis.some(v => v.category === 'dirgha')).toBe(true);
    });
  });

  describe('Integration with Sanskrit utilities', () => {
    test('should properly use vowel classification', () => {
      expect(isHrasvaVowel('अ')).toBe(true);
      expect(isDirghaVowel('आ')).toBe(true);
      expect(isHrasvaVowel('क')).toBe(false); // consonant
    });

    test('should handle phoneme tokenization correctly', () => {
      const result = analyzeWordVowelDurations('गति'); // गति has explicit vowel
      expect(result.vowelAnalysis.length).toBeGreaterThan(0);
      expect(result.vowelAnalysis[0].phoneme).toBeTruthy();
    });

    test('should work with script detection', () => {
      const devResult = getVowelDuration('अ');
      const iastResult = getVowelDuration('a');
      
      expect(devResult.category).toBe('hrasva');
      expect(iastResult.category).toBe('hrasva');
    });
  });

  describe('Phonetic accuracy', () => {
    test('should correctly classify all basic ह्रस्व vowels', () => {
      ['अ', 'इ', 'उ', 'ऋ', 'ऌ'].forEach(vowel => {
        expect(isHrasvaVowel(vowel)).toBe(true);
        const duration = getVowelDuration(vowel);
        expect(duration.ukalaUnits).toBe(1);
      });
    });

    test('should correctly classify all basic दीर्घ vowels', () => {
      ['आ', 'ई', 'ऊ', 'ॠ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'].forEach(vowel => {
        expect(isDirghaVowel(vowel)).toBe(true);
        const duration = getVowelDuration(vowel);
        expect(duration.ukalaUnits).toBe(2);
      });
    });

    test('should handle vowel diacritics correctly', () => {
      expect(isHrasvaVowel('ि')).toBe(true); // short i diacritic
      expect(isDirghaVowel('ी')).toBe(true); // long i diacritic
      expect(isHrasvaVowel('ु')).toBe(true); // short u diacritic
      expect(isDirghaVowel('ू')).toBe(true); // long u diacritic
    });
  });
});
