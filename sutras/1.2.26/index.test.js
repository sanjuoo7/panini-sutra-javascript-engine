/**
 * Test Suite for Sutra 1.2.26: रलो व्युपधाद्धलादेः संश्च
 * 
 * Tests the implementation of morphophonological conditions for optional कित् designation
 * with रल्-ending roots that have व्युपधा and begin with consonants.
 */

import {
  sutra1226,
  isRalPhoneme,
  isVyupadhaVowel,
  beginsWithConsonant,
  endsWithRal,
  hasVyupadha,
  meetsRalVyupadhaConditions,
  isKitByRalVyupadha,
  analyzeRalVyupadhaKit,
  getRalVyupadhaExamples,
  RAL_PRATYAHARA,
  VYUPADHA_VOWELS
} from './index.js';

describe('Sutra 1.2.26: रलो व्युपधाद्धलादेः संश्च', () => {
  
  describe('Constants validation', () => {
    test('RAL_PRATYAHARA should contain correct phonemes', () => {
      expect(RAL_PRATYAHARA.devanagari).toEqual(['र', 'ल']);
      expect(RAL_PRATYAHARA.iast).toEqual(['r', 'l']);
    });

    test('VYUPADHA_VOWELS should contain correct vowels', () => {
      expect(VYUPADHA_VOWELS.devanagari).toContain('इ');
      expect(VYUPADHA_VOWELS.devanagari).toContain('ी');
      expect(VYUPADHA_VOWELS.devanagari).toContain('उ');
      expect(VYUPADHA_VOWELS.devanagari).toContain('ू');
      expect(VYUPADHA_VOWELS.iast).toEqual(['i', 'ī', 'u', 'ū']);
    });
  });

  describe('isRalPhoneme function', () => {
    test('should identify र as रल् phoneme in Devanagari', () => {
      expect(isRalPhoneme('र')).toBe(true);
    });

    test('should identify ल as रल् phoneme in Devanagari', () => {
      expect(isRalPhoneme('ल')).toBe(true);
    });

    test('should identify r as रल् phoneme in IAST', () => {
      expect(isRalPhoneme('r')).toBe(true);
    });

    test('should identify l as रल् phoneme in IAST', () => {
      expect(isRalPhoneme('l')).toBe(true);
    });

    test('should reject non-रल् consonants', () => {
      expect(isRalPhoneme('क')).toBe(false);
      expect(isRalPhoneme('त')).toBe(false);
      expect(isRalPhoneme('k')).toBe(false);
      expect(isRalPhoneme('t')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isRalPhoneme('')).toBe(false);
      expect(isRalPhoneme(null)).toBe(false);
      expect(isRalPhoneme(undefined)).toBe(false);
    });
  });

  describe('isVyupadhaVowel function', () => {
    test('should identify व्युपधा vowels in Devanagari', () => {
      expect(isVyupadhaVowel('इ')).toBe(true);
      expect(isVyupadhaVowel('ी')).toBe(true);
      expect(isVyupadhaVowel('उ')).toBe(true);
      expect(isVyupadhaVowel('ू')).toBe(true);
      expect(isVyupadhaVowel('ि')).toBe(true); // diacritical
      expect(isVyupadhaVowel('ु')).toBe(true); // diacritical
    });

    test('should identify व्युपधा vowels in IAST', () => {
      expect(isVyupadhaVowel('i')).toBe(true);
      expect(isVyupadhaVowel('ī')).toBe(true);
      expect(isVyupadhaVowel('u')).toBe(true);
      expect(isVyupadhaVowel('ū')).toBe(true);
    });

    test('should reject non-व्युपधा vowels', () => {
      expect(isVyupadhaVowel('अ')).toBe(false);
      expect(isVyupadhaVowel('आ')).toBe(false);
      expect(isVyupadhaVowel('ए')).toBe(false);
      expect(isVyupadhaVowel('a')).toBe(false);
      expect(isVyupadhaVowel('ā')).toBe(false);
      expect(isVyupadhaVowel('e')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isVyupadhaVowel('')).toBe(false);
      expect(isVyupadhaVowel(null)).toBe(false);
      expect(isVyupadhaVowel(undefined)).toBe(false);
    });
  });

  describe('beginsWithConsonant function', () => {
    test('should identify consonant-initial roots in Devanagari', () => {
      expect(beginsWithConsonant('किर्')).toBe(true);
      expect(beginsWithConsonant('चुल्')).toBe(true);
      expect(beginsWithConsonant('धूर्')).toBe(true);
    });

    test('should identify consonant-initial roots in IAST', () => {
      expect(beginsWithConsonant('kir')).toBe(true);
      expect(beginsWithConsonant('cul')).toBe(true);
      expect(beginsWithConsonant('dhūr')).toBe(true);
    });

    test('should reject vowel-initial roots', () => {
      expect(beginsWithConsonant('अर्')).toBe(false);
      expect(beginsWithConsonant('इर्')).toBe(false);
      expect(beginsWithConsonant('ar')).toBe(false);
      expect(beginsWithConsonant('ir')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(beginsWithConsonant('')).toBe(false);
      expect(beginsWithConsonant(null)).toBe(false);
      expect(beginsWithConsonant(undefined)).toBe(false);
    });
  });

  describe('endsWithRal function', () => {
    test('should identify र-ending roots', () => {
      expect(endsWithRal('किर्')).toBe(true);
      expect(endsWithRal('धूर्')).toBe(true);
      expect(endsWithRal('kir')).toBe(true);
      expect(endsWithRal('dhūr')).toBe(true);
    });

    test('should identify ल-ending roots', () => {
      expect(endsWithRal('चुल्')).toBe(true);
      expect(endsWithRal('पल्')).toBe(true);
      expect(endsWithRal('cul')).toBe(true);
      expect(endsWithRal('pal')).toBe(true);
    });

    test('should reject non-रल् endings', () => {
      expect(endsWithRal('पच्')).toBe(false);
      expect(endsWithRal('गम्')).toBe(false);
      expect(endsWithRal('pac')).toBe(false);
      expect(endsWithRal('gam')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(endsWithRal('')).toBe(false);
      expect(endsWithRal(null)).toBe(false);
      expect(endsWithRal(undefined)).toBe(false);
    });
  });

  describe('hasVyupadha function', () => {
    test('should identify roots with व्युपधा correctly', () => {
      const result1 = hasVyupadha('किर्');
      expect(result1.hasVyupadha).toBe(true);
      expect(result1.penultimateVowel).toBe('ि'); // vowel diacritic, not independent vowel

      const result2 = hasVyupadha('चुल्');
      expect(result2.hasVyupadha).toBe(true);
      expect(result2.penultimateVowel).toBe('ु'); // vowel diacritic

      const result3 = hasVyupadha('kir');
      expect(result3.hasVyupadha).toBe(true);
      expect(result3.penultimateVowel).toBe('i');
    });

    test('should handle roots without व्युपधा', () => {
      const result1 = hasVyupadha('गम्');
      expect(result1.hasVyupadha).toBe(false);
      expect(result1.analysis).toContain('No व्युपधा vowel found');

      const result2 = hasVyupadha('पच्');
      expect(result2.hasVyupadha).toBe(false);
    });

    test('should handle roots with non-व्युपधा penultimate vowels', () => {
      // Test with 'े' vowel which is not व्युपधा type (not i/ī/u/ū)
      const result = hasVyupadha('गमेर्');
      expect(result.hasVyupadha).toBe(false);
      expect(result.penultimateVowel).toBe('े');
      expect(result.analysis).toContain('not the required type');
    });

    test('should handle invalid input', () => {
      const result1 = hasVyupadha('');
      expect(result1.hasVyupadha).toBe(false);
      expect(result1.analysis).toBe('Invalid input');

      const result2 = hasVyupadha('क');
      expect(result2.hasVyupadha).toBe(false);
      expect(result2.analysis).toContain('too short');
    });
  });

  describe('meetsRalVyupadhaConditions function', () => {
    test('should identify roots meeting all conditions', () => {
      const result1 = meetsRalVyupadhaConditions('किर्');
      expect(result1.meetsConditions).toBe(true);
      expect(result1.analysis.beginsWithConsonant).toBe(true);
      expect(result1.analysis.endsWithRal).toBe(true);
      expect(result1.analysis.hasVyupadha).toBe(true);

      const result2 = meetsRalVyupadhaConditions('चुल्');
      expect(result2.meetsConditions).toBe(true);

      const result3 = meetsRalVyupadhaConditions('dhūr');
      expect(result3.meetsConditions).toBe(true);
    });

    test('should identify roots missing conditions', () => {
      // Missing consonant-initial
      const result1 = meetsRalVyupadhaConditions('अर्');
      expect(result1.meetsConditions).toBe(false);
      expect(result1.analysis.beginsWithConsonant).toBe(false);

      // Missing रल् ending
      const result2 = meetsRalVyupadhaConditions('किच्');
      expect(result2.meetsConditions).toBe(false);
      expect(result2.analysis.endsWithRal).toBe(false);

      // Missing व्युपधा
      const result3 = meetsRalVyupadhaConditions('गमर्');
      expect(result3.meetsConditions).toBe(false);
      expect(result3.analysis.hasVyupadha).toBe(false);
    });

    test('should provide detailed analysis', () => {
      const result = meetsRalVyupadhaConditions('किर्');
      expect(result.analysis.explanation).toContain('meets all conditions');
      expect(result.analysis.explanation).toContain('हलादि + व्युपधा + रलान्त');
      expect(result.analysis.detailedAnalysis).toBeDefined();
    });

    test('should handle invalid input', () => {
      const result = meetsRalVyupadhaConditions('');
      expect(result.meetsConditions).toBe(false);
      expect(result.analysis.explanation).toBe('Invalid root input');
    });
  });

  describe('isKitByRalVyupadha function', () => {
    test('should apply to क्त्वा with qualifying roots', () => {
      expect(isKitByRalVyupadha('किर्', 'क्त्वा')).toBe(true);
      expect(isKitByRalVyupadha('चुल्', 'क्त्वा')).toBe(true);
      expect(isKitByRalVyupadha('kir', 'ktvā')).toBe(true);
    });

    test('should apply to सन् with qualifying roots', () => {
      expect(isKitByRalVyupadha('किर्', 'सन्')).toBe(true);
      expect(isKitByRalVyupadha('धूर्', 'सन्')).toBe(true);
      expect(isKitByRalVyupadha('dhūr', 'san')).toBe(true);
    });

    test('should not apply to other affixes', () => {
      expect(isKitByRalVyupadha('किर्', 'ति')).toBe(false);
      expect(isKitByRalVyupadha('चुल्', 'तुम्')).toBe(false);
      expect(isKitByRalVyupadha('kir', 'ta')).toBe(false);
    });

    test('should not apply to non-qualifying roots', () => {
      expect(isKitByRalVyupadha('गम्', 'क्त्वा')).toBe(false);
      expect(isKitByRalVyupadha('पच्', 'क्त्वा')).toBe(false);
      expect(isKitByRalVyupadha('अर्', 'क्त्वा')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(isKitByRalVyupadha('', 'क्त्वा')).toBe(false);
      expect(isKitByRalVyupadha('किर्', '')).toBe(false);
      expect(isKitByRalVyupadha(null, null)).toBe(false);
    });
  });

  describe('analyzeRalVyupadhaKit function', () => {
    test('should provide comprehensive analysis for qualifying combinations', () => {
      const result = analyzeRalVyupadhaKit('किर्', 'क्त्वा', { debug: true });
      
      expect(result.applies).toBe(true);
      expect(result.becomesKit).toBe(true);
      expect(result.isOptional).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.analysis.meetsRootConditions).toBe(true);
      expect(result.analysis.isValidAffix).toBe(true);
      expect(result.analysis.affixType).toBe('क्त्वा');
      expect(result.explanation).toContain('optionally designated as कित्');
    });

    test('should handle optional rule application', () => {
      const result1 = analyzeRalVyupadhaKit('चुल्', 'सन्', { applyOptionalRule: true });
      expect(result1.becomesKit).toBe(true);
      expect(result1.explanation).toContain('optionally designated as कित्');

      const result2 = analyzeRalVyupadhaKit('चुल्', 'सन्', { applyOptionalRule: false });
      expect(result2.applies).toBe(true);
      expect(result2.becomesKit).toBe(false);
      expect(result2.explanation).toContain('not being applied');
    });

    test('should reject non-qualifying root conditions', () => {
      const result = analyzeRalVyupadhaKit('गम्', 'क्त्वा');
      expect(result.applies).toBe(false);
      expect(result.becomesKit).toBe(false);
      expect(result.analysis.meetsRootConditions).toBe(false);
      expect(result.explanation).toContain('does not meet the morphophonological conditions');
    });

    test('should reject invalid affixes', () => {
      const result = analyzeRalVyupadhaKit('किर्', 'ति');
      expect(result.applies).toBe(false);
      expect(result.becomesKit).toBe(false);
      expect(result.analysis.isValidAffix).toBe(false);
      expect(result.explanation).toContain('not क्त्वा or सन्');
    });

    test('should provide debug information when requested', () => {
      const result = analyzeRalVyupadhaKit('धूर्', 'क्त्वा', { debug: true });
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.debug.some(msg => msg.includes('Analyzing Sutra 1.2.26'))).toBe(true);
    });

    test('should handle errors gracefully', () => {
      const result = analyzeRalVyupadhaKit(null, 'क्त्वा');
      expect(result.applies).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.explanation).toContain('does not meet');
    });
  });

  describe('sutra1226 main function', () => {
    test('should require explicit root and affix context', () => {
      const result = sutra1226('किरित्वा');
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('requires explicit root and affix identification');
    });

    test('should analyze correctly with context', () => {
      const result = sutra1226('किरित्वा', { 
        root: 'किर्', 
        affix: 'क्त्वा',
        debug: true 
      });
      expect(result.applicable).toBe(true);
      expect(result.transformed).toBe('किरित्वा');
      expect(result.explanation).toContain('optionally designated as कित्');
      expect(result.details.sutra).toBe('1.2.26');
      expect(result.details.type).toBe('अतिदेश');
    });

    test('should handle non-applicable cases with context', () => {
      const result = sutra1226('गत्वा', { 
        root: 'गम्', 
        affix: 'क्त्वा' 
      });
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('does not meet the morphophonological conditions');
    });

    test('should validate input properly', () => {
      const result1 = sutra1226('');
      expect(result1.applicable).toBe(false);
      expect(result1.explanation).toContain('Invalid input');

      const result2 = sutra1226(null);
      expect(result2.applicable).toBe(false);
      expect(result2.explanation).toContain('Invalid input');
    });

    test('should provide comprehensive details', () => {
      const result = sutra1226('चुलित्वा', { 
        root: 'चुल्', 
        affix: 'क्त्वा' 
      });
      expect(result.details.sutraText).toBe('रलो व्युपधाद्धलादेः संश्च');
      expect(result.details.transliteration).toContain('ralo vyupadhād');
      expect(result.details.domain).toContain('Morphophonology');
      expect(result.details.complexity).toContain('High');
    });

    test('should handle debug mode', () => {
      const result = sutra1226('धूरित्वा', { 
        root: 'धूर्', 
        affix: 'क्त्वा',
        debug: true 
      });
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
    });
  });

  describe('getRalVyupadhaExamples function', () => {
    test('should provide examples in Devanagari by default', () => {
      const examples = getRalVyupadhaExamples();
      expect(examples.length).toBeGreaterThan(0);
      expect(examples[0].root).toMatch(/[किचध]/);
      expect(examples[0].analysis).toContain('हलादि');
      expect(examples[0].analysis).toContain('व्युपधा');
      expect(examples[0].analysis).toContain('रलान्त');
    });

    test('should provide examples in IAST when requested', () => {
      const examples = getRalVyupadhaExamples('iast');
      expect(examples.length).toBeGreaterThan(0);
      expect(examples[0].root).toMatch(/[kcd]/);
      expect(examples[0].affixes).toContain('ktvā');
      expect(examples[0].affixes).toContain('san');
    });

    test('should include morphological information', () => {
      const examples = getRalVyupadhaExamples();
      expect(examples[0].kitEffect).toContain('Optional कित् designation');
      expect(examples[0].morphologicalNote).toContain('accent placement');
    });

    test('should provide meaningful root information', () => {
      const examples = getRalVyupadhaExamples();
      examples.forEach(example => {
        expect(example.root).toBeTruthy();
        expect(example.meaning).toBeTruthy();
        expect(example.analysis).toBeTruthy();
        expect(example.affixes).toBeTruthy();
      });
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle malformed Sanskrit input', () => {
      const result = sutra1226('invalid123', { root: 'invalid', affix: 'क्त्वा' });
      expect(result.applicable).toBe(false);
      expect(result.explanation).toContain('Analysis could not be completed');
    });

    test('should handle mixed scripts appropriately', () => {
      const result = analyzeRalVyupadhaKit('kir', 'क्त्वा');
      expect(result.applies).toBe(true); // Should handle mixed scripts
    });

    test('should handle complex root structures', () => {
      const complexRoot = 'प्रकिर्';
      const analysis = meetsRalVyupadhaConditions(complexRoot);
      expect(analysis.analysis.beginsWithConsonant).toBe(true);
      expect(analysis.analysis.endsWithRal).toBe(true);
    });

    test('should maintain consistency across functions', () => {
      const testRoot = 'चुल्';
      const testAffix = 'क्त्वा';
      
      const quickCheck = isKitByRalVyupadha(testRoot, testAffix);
      const detailedAnalysis = analyzeRalVyupadhaKit(testRoot, testAffix);
      const mainFunction = sutra1226('चुलित्वा', { root: testRoot, affix: testAffix });
      
      expect(quickCheck).toBe(true);
      expect(detailedAnalysis.applies).toBe(true);
      expect(mainFunction.applicable).toBe(true);
    });
  });

  describe('Integration with Sanskrit utilities', () => {
    test('should properly use pratyahara construction', () => {
      // Test that रल् identification works correctly
      expect(isRalPhoneme('र')).toBe(true);
      expect(isRalPhoneme('ल')).toBe(true);
      expect(isRalPhoneme('न')).toBe(false);
    });

    test('should properly use vowel classification', () => {
      // Test व्युपधा vowel identification
      expect(isVyupadhaVowel('इ')).toBe(true);
      expect(isVyupadhaVowel('उ')).toBe(true);
      expect(isVyupadhaVowel('अ')).toBe(false);
    });

    test('should handle phoneme tokenization correctly', () => {
      const result = hasVyupadha('किर्');
      expect(result.hasVyupadha).toBe(true);
      expect(result.vowelCount).toBeGreaterThan(0);
    });
  });
});
