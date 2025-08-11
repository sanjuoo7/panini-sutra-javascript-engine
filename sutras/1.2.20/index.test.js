/**
 * Test Suite for Sutra 1.2.20: ऋत इद्धातोः
 * 
 * Tests the implementation of the rule that prevents कित् designation 
 * for सेट् निष्ठा affixes after roots ending in ऋ vowel.
 */

import {
  sutra1220,
  endsWithRVowel,
  isSutra1220Root,
  hasSetAugment,
  isSetNishtha,
  getSutra1220Roots,
  getSutra1220Examples,
  preventsKitBySutra1220,
  isREndingRoot
} from './index.js';

describe('Sutra 1.2.20: ऋत इद्धातोः', () => {
  
  describe('endsWithRVowel function', () => {
    describe('Devanagari roots', () => {
      test('should identify कृ root (ends with ऋ)', () => {
        expect(endsWithRVowel('कृ')).toBe(true);
        expect(endsWithRVowel('कॄ')).toBe(true);
      });

      test('should identify भृ root (ends with ऋ)', () => {
        expect(endsWithRVowel('भृ')).toBe(true);
        expect(endsWithRVowel('भॄ')).toBe(true);
      });

      test('should identify पृ root (ends with ऋ)', () => {
        expect(endsWithRVowel('पृ')).toBe(true);
        expect(endsWithRVowel('पॄ')).toBe(true);
      });

      test('should identify तृ root (ends with ऋ)', () => {
        expect(endsWithRVowel('तृ')).toBe(true);
        expect(endsWithRVowel('तॄ')).toBe(true);
      });

      test('should identify स्तृ root (ends with ऋ)', () => {
        expect(endsWithRVowel('स्तृ')).toBe(true);
        expect(endsWithRVowel('स्तॄ')).toBe(true);
      });

      test('should reject roots not ending with ऋ', () => {
        expect(endsWithRVowel('गम्')).toBe(false);
        expect(endsWithRVowel('पठ्')).toBe(false);
        expect(endsWithRVowel('नम्')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify kṛ root (ends with ṛ)', () => {
        expect(endsWithRVowel('kṛ')).toBe(true);
        expect(endsWithRVowel('kṝ')).toBe(true);
      });

      test('should identify bhṛ root (ends with ṛ)', () => {
        expect(endsWithRVowel('bhṛ')).toBe(true);
        expect(endsWithRVowel('bhṝ')).toBe(true);
      });

      test('should identify pṛ root (ends with ṛ)', () => {
        expect(endsWithRVowel('pṛ')).toBe(true);
        expect(endsWithRVowel('pṝ')).toBe(true);
      });

      test('should identify tṛ root (ends with ṛ)', () => {
        expect(endsWithRVowel('tṛ')).toBe(true);
        expect(endsWithRVowel('tṝ')).toBe(true);
      });

      test('should identify stṛ root (ends with ṛ)', () => {
        expect(endsWithRVowel('stṛ')).toBe(true);
        expect(endsWithRVowel('stṝ')).toBe(true);
      });

      test('should reject roots not ending with ṛ', () => {
        expect(endsWithRVowel('gam')).toBe(false);
        expect(endsWithRVowel('paṭh')).toBe(false);
        expect(endsWithRVowel('nam')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      test('should handle invalid inputs', () => {
        expect(endsWithRVowel('')).toBe(false);
        expect(endsWithRVowel(null)).toBe(false);
        expect(endsWithRVowel(undefined)).toBe(false);
        expect(endsWithRVowel(123)).toBe(false);
      });
    });
  });

  describe('isSutra1220Root function', () => {
    describe('Valid ऋ-ending roots', () => {
      test('should identify कृ and variants', () => {
        expect(isSutra1220Root('कृ')).toBe(true);
        expect(isSutra1220Root('कॄ')).toBe(true);
      });

      test('should identify भृ and variants', () => {
        expect(isSutra1220Root('भृ')).toBe(true);
        expect(isSutra1220Root('भॄ')).toBe(true);
      });

      test('should identify IAST forms', () => {
        expect(isSutra1220Root('kṛ')).toBe(true);
        expect(isSutra1220Root('bhṛ')).toBe(true);
        expect(isSutra1220Root('pṛ')).toBe(true);
        expect(isSutra1220Root('tṛ')).toBe(true);
      });
    });

    describe('Invalid roots', () => {
      test('should reject non-ऋ-ending roots', () => {
        expect(isSutra1220Root('गम्')).toBe(false);
        expect(isSutra1220Root('पठ्')).toBe(false);
        expect(isSutra1220Root('शीङ्')).toBe(false); // From Sutra 1.2.19
      });

      test('should reject ऋ-ending roots not in the database', () => {
        expect(isSutra1220Root('मूर्')).toBe(false); // not ऋ-ending
        expect(isSutra1220Root('ऋ')).toBe(false); // just the vowel
      });
    });
  });

  describe('hasSetAugment function', () => {
    describe('Context-based detection', () => {
      test('should detect सेट् augment from context', () => {
        expect(hasSetAugment('क्त', { hasSetAugment: true })).toBe(true);
        expect(hasSetAugment('kta', { hasItAugment: true })).toBe(true);
        expect(hasSetAugment('क्त', { augment: 'सेट्' })).toBe(true);
        expect(hasSetAugment('kta', { augment: 'iṭ' })).toBe(true);
      });
    });

    describe('Form-based detection', () => {
      test('should detect सेट् augment from affix form in Devanagari', () => {
        expect(hasSetAugment('इत')).toBe(true);
        expect(hasSetAugment('इक्त')).toBe(true);
      });

      test('should detect iṭ augment from affix form in IAST', () => {
        expect(hasSetAugment('ita')).toBe(true);
        expect(hasSetAugment('ikta')).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject affixes without सेट् augment', () => {
        expect(hasSetAugment('त')).toBe(false);
        expect(hasSetAugment('क्त')).toBe(false);
        expect(hasSetAugment('ta')).toBe(false);
        expect(hasSetAugment('kta')).toBe(false);
      });

      test('should handle invalid inputs', () => {
        expect(hasSetAugment('')).toBe(false);
        expect(hasSetAugment(null)).toBe(false);
        expect(hasSetAugment(undefined)).toBe(false);
      });
    });
  });

  describe('isSetNishtha function', () => {
    describe('Positive cases', () => {
      test('should identify सेट् निष्ठा affixes with context', () => {
        expect(isSetNishtha('इक्त', { hasSetAugment: true })).toBe(true);
        expect(isSetNishtha('ikta', { hasItAugment: true })).toBe(true);
      });

      test('should identify सेट् निष्ठा from form patterns', () => {
        expect(isSetNishtha('इत')).toBe(true);
        expect(isSetNishtha('ita')).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject non-निष्ठा affixes', () => {
        expect(isSetNishtha('अ')).toBe(false);
        expect(isSetNishtha('ति')).toBe(false);
        expect(isSetNishtha('a')).toBe(false);
        expect(isSetNishtha('ti')).toBe(false);
      });

      test('should reject निष्ठा without सेट्', () => {
        expect(isSetNishtha('त')).toBe(false);
        expect(isSetNishtha('क्त')).toBe(false);
        expect(isSetNishtha('ta')).toBe(false);
        expect(isSetNishtha('kta')).toBe(false);
      });
    });
  });

  describe('sutra1220 main function', () => {
    describe('Positive cases - rule application', () => {
      test('should prevent कित् for कृ + सेट् निष्ठा', () => {
        const result = sutra1220('कृत', { root: 'कृ', affix: 'इत' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('does NOT receive कित् designation');
      });

      test('should prevent कित् for भृ + सेट् निष्ठा', () => {
        const result = sutra1220('भृत', { root: 'भृ', affix: 'इत' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('does NOT receive कित् designation');
      });

      test('should handle IAST forms', () => {
        const result = sutra1220('kṛta', { root: 'kṛ', affix: 'ita' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('does NOT receive कित् designation');
      });

      test('should handle mixed scripts', () => {
        const result = sutra1220('कृता', { root: 'कृ', affix: 'ita' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
      });
    });

    describe('Example word recognition', () => {
      test('should recognize common example forms', () => {
        const result1 = sutra1220('कृत');
        expect(result1.applicable).toBe(true);
        expect(result1.preventsKit).toBe(true);

        const result2 = sutra1220('भृत');
        expect(result2.applicable).toBe(true);
        expect(result2.preventsKit).toBe(true);

        const result3 = sutra1220('पूर्त');
        expect(result3.applicable).toBe(true);
        expect(result3.preventsKit).toBe(true);
      });

      test('should recognize IAST example forms', () => {
        const result1 = sutra1220('kṛta');
        expect(result1.applicable).toBe(true);
        expect(result1.preventsKit).toBe(true);

        const result2 = sutra1220('bhṛta');
        expect(result2.applicable).toBe(true);
        expect(result2.preventsKit).toBe(true);

        const result3 = sutra1220('pūrta');
        expect(result3.applicable).toBe(true);
        expect(result3.preventsKit).toBe(true);
      });
    });

    describe('Negative cases - rule not applicable', () => {
      test('should not apply to non-ऋ-ending roots', () => {
        const result = sutra1220('गत', { root: 'गम्', affix: 'इत' });
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('does not end with ऋ vowel');
      });

      test('should not apply to non-सेट् निष्ठा', () => {
        const result = sutra1220('कृत', { root: 'कृ', affix: 'त' });
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('is not सेट् निष्ठा');
      });

      test('should not apply to non-निष्ठा words', () => {
        const result = sutra1220('करोति');
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('does not contain निष्ठा pattern');
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug information when requested', () => {
        const result = sutra1220('कृत', { root: 'कृ', affix: 'इत', debug: true });
        expect(result.debug).toBeDefined();
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug[0]).toContain('[1.2.20]');
      });

      test('should not include debug information when not requested', () => {
        const result = sutra1220('कृत', { root: 'कृ', affix: 'इत' });
        expect(result.debug).toEqual([]);
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        const result = sutra1220('');
        expect(result.applicable).toBe(false);
        expect(result.error).toBe('Invalid input');
      });

      test('should handle invalid Sanskrit words', () => {
        const result = sutra1220('xyz123');
        expect(result.applicable).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit word');
      });
    });

    describe('Result structure', () => {
      test('should return complete analysis object', () => {
        const result = sutra1220('कृत', { root: 'कृ', affix: 'इत' });
        
        expect(result).toHaveProperty('applicable');
        expect(result).toHaveProperty('preventsKit');
        expect(result).toHaveProperty('explanation');
        expect(result).toHaveProperty('debug');
        expect(result).toHaveProperty('details');
        
        expect(result.details).toHaveProperty('sutra');
        expect(result.details).toHaveProperty('sutraText');
        expect(result.details).toHaveProperty('transliteration');
        expect(result.details).toHaveProperty('translation');
        expect(result.details).toHaveProperty('type');
        expect(result.details).toHaveProperty('category');
        expect(result.details).toHaveProperty('rootsAffected');
        expect(result.details).toHaveProperty('morphology');
        
        expect(result.details.sutra).toBe('1.2.20');
        expect(result.details.type).toBe('अतिदेश (exception rule)');
      });
    });
  });

  describe('Utility functions', () => {
    describe('getSutra1220Roots', () => {
      test('should return Devanagari roots', () => {
        const roots = getSutra1220Roots('Devanagari');
        expect(roots).toHaveProperty('कृ');
        expect(roots).toHaveProperty('भृ');
        expect(roots).toHaveProperty('पृ');
        expect(roots['कृ']).toContain('कृ');
      });

      test('should return IAST roots by default', () => {
        const roots = getSutra1220Roots();
        expect(roots).toHaveProperty('kṛ');
        expect(roots).toHaveProperty('bhṛ');
        expect(roots).toHaveProperty('pṛ');
        expect(roots['kṛ']).toContain('kṛ');
      });
    });

    describe('getSutra1220Examples', () => {
      test('should return example forms', () => {
        const examples = getSutra1220Examples();
        expect(examples).toHaveProperty('kṛ');
        expect(examples).toHaveProperty('bhṛ');
        expect(examples['kṛ']).toHaveProperty('past_participle');
        expect(examples['kṛ']['past_participle']).toBe('kṛta');
      });
    });

    describe('preventsKitBySutra1220', () => {
      test('should correctly identify preventing conditions', () => {
        expect(preventsKitBySutra1220('कृ', 'इत')).toBe(true);
        expect(preventsKitBySutra1220('kṛ', 'ita')).toBe(true);
        expect(preventsKitBySutra1220('गम्', 'इत')).toBe(false);
        expect(preventsKitBySutra1220('कृ', 'त')).toBe(false);
      });
    });

    describe('isREndingRoot alias', () => {
      test('should work as alias for endsWithRVowel', () => {
        expect(isREndingRoot('कृ')).toBe(true);
        expect(isREndingRoot('kṛ')).toBe(true);
        expect(isREndingRoot('गम्')).toBe(false);
        expect(isREndingRoot('gam')).toBe(false);
      });
    });
  });

  describe('Integration tests', () => {
    test('should work consistently across all functions', () => {
      const testCases = [
        { root: 'कृ', affix: 'इत', word: 'कृत', expected: true },
        { root: 'भृ', affix: 'इत', word: 'भृत', expected: true },
        { root: 'kṛ', affix: 'ita', word: 'kṛta', expected: true },
        { root: 'bhṛ', affix: 'ita', word: 'bhṛta', expected: true },
        { root: 'गम्', affix: 'इत', word: 'गत', expected: false },
        { root: 'कृ', affix: 'त', word: 'कृत', expected: false }
      ];

      testCases.forEach(({ root, affix, word, expected }) => {
        const rootCheck = isSutra1220Root(root);
        const affixCheck = isSetNishtha(affix);
        const combinedCheck = preventsKitBySutra1220(root, affix);
        const sutraResult = sutra1220(word, { root, affix });

        if (expected) {
          expect(combinedCheck).toBe(true);
          expect(sutraResult.applicable).toBe(true);
          expect(sutraResult.preventsKit).toBe(true);
        } else {
          expect(sutraResult.applicable).toBe(false);
        }
      });
    });

    test('should handle cross-script consistency', () => {
      // Test the same logical concept across scripts
      const devResult = sutra1220('कृत', { root: 'कृ', affix: 'इत' });
      const iastResult = sutra1220('kṛta', { root: 'kṛ', affix: 'ita' });

      expect(devResult.applicable).toBe(iastResult.applicable);
      expect(devResult.preventsKit).toBe(iastResult.preventsKit);
      expect(devResult.details.sutra).toBe(iastResult.details.sutra);
    });
  });
});
