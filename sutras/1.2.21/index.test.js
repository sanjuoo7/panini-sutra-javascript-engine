/**
 * Test Suite for Sutra 1.2.21: अन्येभ्योऽपि दृश्यते
 * 
 * Tests the implementation of the rule that extends exceptions for कित् designation
 * beyond the specific cases of sutras 1.2.19-1.2.20, based on observed patterns.
 */

import {
  sutra1221,
  isSutra1221Root,
  hasConsonantClusterProperty,
  hasSetAugment,
  isSetNishtha,
  showsExceptionalBehavior,
  getSutra1221Roots,
  getSutra1221Examples,
  preventsKitBySutra1221,
  isExceptionalRoot,
  hasPhoneticProperty
} from './index.js';

describe('Sutra 1.2.21: अन्येभ्योऽपि दृश्यते', () => {
  
  describe('isSutra1221Root function', () => {
    describe('Devanagari exceptional roots', () => {
      test('should identify त्वक्ष् root (consonant cluster)', () => {
        expect(isSutra1221Root('त्वक्ष्')).toBe(true);
      });

      test('should identify रक्ष् root (क्ष cluster)', () => {
        expect(isSutra1221Root('रक्ष्')).toBe(true);
      });

      test('should identify लिख् root', () => {
        expect(isSutra1221Root('लिख्')).toBe(true);
      });

      test('should identify युज् root', () => {
        expect(isSutra1221Root('युज्')).toBe(true);
      });

      test('should identify भुज् root', () => {
        expect(isSutra1221Root('भुज्')).toBe(true);
      });

      test('should identify दुह् root', () => {
        expect(isSutra1221Root('दुह्')).toBe(true);
      });
    });

    describe('IAST exceptional roots', () => {
      test('should identify tvakṣ root', () => {
        expect(isSutra1221Root('tvakṣ')).toBe(true);
      });

      test('should identify rakṣ root', () => {
        expect(isSutra1221Root('rakṣ')).toBe(true);
      });

      test('should identify likh root', () => {
        expect(isSutra1221Root('likh')).toBe(true);
      });

      test('should identify yuj root', () => {
        expect(isSutra1221Root('yuj')).toBe(true);
      });

      test('should identify bhuj root', () => {
        expect(isSutra1221Root('bhuj')).toBe(true);
      });

      test('should identify duh root', () => {
        expect(isSutra1221Root('duh')).toBe(true);
      });
    });

    describe('Non-exceptional roots', () => {
      test('should reject ordinary roots', () => {
        expect(isSutra1221Root('गम्')).toBe(false);
        expect(isSutra1221Root('पठ्')).toBe(false);
        expect(isSutra1221Root('नम्')).toBe(false);
        expect(isSutra1221Root('कृ')).toBe(false); // This is from 1.2.20
        expect(isSutra1221Root('शीङ्')).toBe(false); // This is from 1.2.19
      });

      test('should handle invalid inputs', () => {
        expect(isSutra1221Root('')).toBe(false);
        expect(isSutra1221Root(null)).toBe(false);
        expect(isSutra1221Root(undefined)).toBe(false);
      });
    });
  });

  describe('hasConsonantClusterProperty function', () => {
    describe('Devanagari consonant clusters', () => {
      test('should identify क्ष् cluster', () => {
        expect(hasConsonantClusterProperty('रक्ष्')).toBe(true);
        expect(hasConsonantClusterProperty('त्वक्ष्')).toBe(true);
      });

      test('should identify ज् ending', () => {
        expect(hasConsonantClusterProperty('युज्')).toBe(true);
        expect(hasConsonantClusterProperty('भुज्')).toBe(true);
      });

      test('should identify ह् ending', () => {
        expect(hasConsonantClusterProperty('दुह्')).toBe(true);
        expect(hasConsonantClusterProperty('रुह्')).toBe(true);
      });

      test('should identify ण् ending', () => {
        expect(hasConsonantClusterProperty('क्षण्')).toBe(true);
      });

      test('should identify म् ending', () => {
        expect(hasConsonantClusterProperty('तम्')).toBe(true);
        expect(hasConsonantClusterProperty('दम्')).toBe(true);
      });

      test('should reject roots without relevant clusters', () => {
        expect(hasConsonantClusterProperty('गम्')).toBe(false); // म् is included but गम् is not exceptional
        expect(hasConsonantClusterProperty('पठ्')).toBe(false);
        expect(hasConsonantClusterProperty('कृ')).toBe(false);
      });
    });

    describe('IAST consonant clusters', () => {
      test('should identify kṣ cluster', () => {
        expect(hasConsonantClusterProperty('rakṣ')).toBe(true);
        expect(hasConsonantClusterProperty('tvakṣ')).toBe(true);
      });

      test('should identify j ending', () => {
        expect(hasConsonantClusterProperty('yuj')).toBe(true);
        expect(hasConsonantClusterProperty('bhuj')).toBe(true);
      });

      test('should identify h ending', () => {
        expect(hasConsonantClusterProperty('duh')).toBe(true);
        expect(hasConsonantClusterProperty('ruh')).toBe(true);
      });

      test('should identify ṇ ending', () => {
        expect(hasConsonantClusterProperty('kṣaṇ')).toBe(true);
      });

      test('should identify m ending', () => {
        expect(hasConsonantClusterProperty('tam')).toBe(true);
        expect(hasConsonantClusterProperty('dam')).toBe(true);
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
      test('should detect सेट् augment from affix form', () => {
        expect(hasSetAugment('इत')).toBe(true);
        expect(hasSetAugment('इक्त')).toBe(true);
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
      });

      test('should reject निष्ठा without सेट्', () => {
        expect(isSetNishtha('त')).toBe(false);
        expect(isSetNishtha('क्त')).toBe(false);
      });
    });
  });

  describe('showsExceptionalBehavior function', () => {
    describe('Known exceptional roots', () => {
      test('should identify known exceptional roots', () => {
        expect(showsExceptionalBehavior('त्वक्ष्', 'इत')).toBe(true);
        expect(showsExceptionalBehavior('युज्', 'इत')).toBe(true);
        expect(showsExceptionalBehavior('yuj', 'ita')).toBe(true);
      });
    });

    describe('Context-dependent behavior', () => {
      test('should consider textual source context', () => {
        expect(showsExceptionalBehavior('रक्ष्', 'इत', { 
          textualSource: 'classical' 
        })).toBe(true);
        
        expect(showsExceptionalBehavior('rakṣ', 'ita', { 
          usage: 'traditional' 
        })).toBe(true);
      });

      test('should consider semantic context', () => {
        expect(showsExceptionalBehavior('भुज्', 'इत', { 
          meaning: 'passive voice construction' 
        })).toBe(true);
        
        expect(showsExceptionalBehavior('duh', 'ita', { 
          meaning: 'perfective aspect' 
        })).toBe(true);
      });
    });

    describe('Non-exceptional cases', () => {
      test('should reject ordinary combinations', () => {
        expect(showsExceptionalBehavior('गम्', 'इत')).toBe(false);
        expect(showsExceptionalBehavior('पठ्', 'ita')).toBe(false);
      });

      test('should require both root and affix conditions', () => {
        expect(showsExceptionalBehavior('युज्', 'अ')).toBe(false);
        expect(showsExceptionalBehavior('', 'इत')).toBe(false);
      });
    });
  });

  describe('sutra1221 main function', () => {
    describe('Positive cases - rule application', () => {
      test('should prevent कित् for त्वक्ष् + सेट् निष्ठा', () => {
        const result = sutra1221('त्वष्ट', { root: 'त्वक्ष्', affix: 'इत' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('does NOT receive कित् designation');
      });

      test('should prevent कित् for युज् + सेट् निष्ठा', () => {
        const result = sutra1221('युक्त', { root: 'युज्', affix: 'इत' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('Sutra 1.2.21');
      });

      test('should handle IAST forms', () => {
        const result = sutra1221('yukta', { root: 'yuj', affix: 'ita' });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
      });

      test('should handle context-dependent cases', () => {
        const result = sutra1221('रक्षित', { 
          root: 'रक्ष्', 
          affix: 'इत',
          textualSource: 'classical'
        });
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
      });
    });

    describe('Example word recognition', () => {
      test('should recognize common example forms', () => {
        const result1 = sutra1221('त्वष्ट');
        expect(result1.applicable).toBe(true);
        expect(result1.preventsKit).toBe(true);

        const result2 = sutra1221('युक्त');
        expect(result2.applicable).toBe(true);
        expect(result2.preventsKit).toBe(true);

        const result3 = sutra1221('भुक्त');
        expect(result3.applicable).toBe(true);
        expect(result3.preventsKit).toBe(true);
      });

      test('should recognize IAST example forms', () => {
        const result1 = sutra1221('tvaṣṭa');
        expect(result1.applicable).toBe(true);
        expect(result1.preventsKit).toBe(true);

        const result2 = sutra1221('yukta');
        expect(result2.applicable).toBe(true);
        expect(result2.preventsKit).toBe(true);

        const result3 = sutra1221('bhukta');
        expect(result3.applicable).toBe(true);
        expect(result3.preventsKit).toBe(true);
      });
    });

    describe('Negative cases - rule not applicable', () => {
      test('should not apply to ordinary roots', () => {
        const result = sutra1221('गत', { root: 'गम्', affix: 'इत' });
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('does not show exceptional behavior');
      });

      test('should not apply to non-सेट् निष्ठा', () => {
        const result = sutra1221('युक्त', { root: 'युज्', affix: 'त' });
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('is not सेट् निष्ठा');
      });

      test('should not apply to non-निष्ठा words', () => {
        const result = sutra1221('युनक्ति');
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('does not contain निष्ठा pattern');
      });

      test('should not apply to roots from other sutras', () => {
        const result = sutra1221('कृत', { root: 'कृ', affix: 'इत' });
        expect(result.applicable).toBe(false); // This should be handled by 1.2.20
        expect(result.explanation).toContain('does not show exceptional behavior for Sutra 1.2.21');
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug information when requested', () => {
        const result = sutra1221('युक्त', { 
          root: 'युज्', 
          affix: 'इत', 
          debug: true,
          textualSource: 'classical'
        });
        expect(result.debug).toBeDefined();
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug[0]).toContain('[1.2.21]');
        expect(result.debug.join(' ')).toContain('textualSource=classical');
      });

      test('should not include debug information when not requested', () => {
        const result = sutra1221('युक्त', { root: 'युज्', affix: 'इत' });
        expect(result.debug).toEqual([]);
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        const result = sutra1221('');
        expect(result.applicable).toBe(false);
        expect(result.error).toBe('Invalid input');
      });

      test('should handle invalid Sanskrit words', () => {
        const result = sutra1221('xyz123');
        expect(result.applicable).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit word');
      });
    });

    describe('Result structure', () => {
      test('should return complete analysis object', () => {
        const result = sutra1221('युक्त', { 
          root: 'युज्', 
          affix: 'इत',
          textualSource: 'classical'
        });
        
        expect(result).toHaveProperty('applicable');
        expect(result).toHaveProperty('preventsKit');
        expect(result).toHaveProperty('explanation');
        expect(result).toHaveProperty('debug');
        expect(result).toHaveProperty('details');
        
        expect(result.details).toHaveProperty('sutra');
        expect(result.details).toHaveProperty('scope');
        expect(result.details).toHaveProperty('contextual');
        
        expect(result.details.sutra).toBe('1.2.21');
        expect(result.details.scope).toBe('विस्तार (extension) of sutras 1.2.19-1.2.20');
        expect(result.details.contextual.observational).toBe(true);
        expect(result.details.contextual.textualSource).toBe('classical');
      });
    });
  });

  describe('Utility functions', () => {
    describe('getSutra1221Roots', () => {
      test('should return Devanagari roots', () => {
        const roots = getSutra1221Roots('Devanagari');
        expect(roots).toHaveProperty('त्वक्ष्');
        expect(roots).toHaveProperty('युज्');
        expect(roots).toHaveProperty('भुज्');
        expect(roots['त्वक्ष्']).toContain('त्वक्ष्');
      });

      test('should return IAST roots by default', () => {
        const roots = getSutra1221Roots();
        expect(roots).toHaveProperty('tvakṣ');
        expect(roots).toHaveProperty('yuj');
        expect(roots).toHaveProperty('bhuj');
        expect(roots['tvakṣ']).toContain('tvakṣ');
      });
    });

    describe('getSutra1221Examples', () => {
      test('should return example forms', () => {
        const examples = getSutra1221Examples();
        expect(examples).toHaveProperty('tvakṣ');
        expect(examples).toHaveProperty('yuj');
        expect(examples['tvakṣ']).toHaveProperty('past_participle');
        expect(examples['yuj']['past_participle']).toBe('yukta');
      });
    });

    describe('preventsKitBySutra1221', () => {
      test('should correctly identify preventing conditions', () => {
        expect(preventsKitBySutra1221('युज्', 'इत')).toBe(true);
        expect(preventsKitBySutra1221('yuj', 'ita')).toBe(true);
        expect(preventsKitBySutra1221('गम्', 'इत')).toBe(false);
        expect(preventsKitBySutra1221('युज्', 'त')).toBe(false);
      });

      test('should consider context in prevention logic', () => {
        expect(preventsKitBySutra1221('रक्ष्', 'इत', { 
          textualSource: 'classical' 
        })).toBe(true);
        expect(preventsKitBySutra1221('रक्ष्', 'इत', {})).toBe(false);
      });
    });

    describe('Alias functions', () => {
      test('isExceptionalRoot should work as alias', () => {
        expect(isExceptionalRoot('युज्')).toBe(true);
        expect(isExceptionalRoot('yuj')).toBe(true);
        expect(isExceptionalRoot('गम्')).toBe(false);
      });

      test('hasPhoneticProperty should work as alias', () => {
        expect(hasPhoneticProperty('युज्')).toBe(true);
        expect(hasPhoneticProperty('yuj')).toBe(true);
        expect(hasPhoneticProperty('गम्')).toBe(false);
      });
    });
  });

  describe('Integration tests', () => {
    test('should work consistently across all functions', () => {
      const testCases = [
        { root: 'युज्', affix: 'इत', word: 'युक्त', expected: true },
        { root: 'भुज्', affix: 'इत', word: 'भुक्त', expected: true },
        { root: 'yuj', affix: 'ita', word: 'yukta', expected: true },
        { root: 'bhuj', affix: 'ita', word: 'bhukta', expected: true },
        { root: 'गम्', affix: 'इत', word: 'गत', expected: false },
        { root: 'युज्', affix: 'त', word: 'युक्त', expected: false }
      ];

      testCases.forEach(({ root, affix, word, expected }) => {
        const rootCheck = isSutra1221Root(root);
        const combinedCheck = preventsKitBySutra1221(root, affix);
        const sutraResult = sutra1221(word, { root, affix });

        if (expected) {
          expect(sutraResult.applicable).toBe(true);
          expect(sutraResult.preventsKit).toBe(true);
        } else {
          expect(sutraResult.applicable).toBe(false);
        }
      });
    });

    test('should handle cross-script consistency', () => {
      // Test the same logical concept across scripts
      const devResult = sutra1221('युक्त', { root: 'युज्', affix: 'इत' });
      const iastResult = sutra1221('yukta', { root: 'yuj', affix: 'ita' });

      expect(devResult.applicable).toBe(iastResult.applicable);
      expect(devResult.preventsKit).toBe(iastResult.preventsKit);
      expect(devResult.details.sutra).toBe(iastResult.details.sutra);
    });

    test('should distinguish from other sutras', () => {
      // This should NOT be handled by 1.2.21 (should be 1.2.20)
      const kṛResult = sutra1221('कृत', { root: 'कृ', affix: 'इत' });
      expect(kṛResult.applicable).toBe(false);
      
      // This should NOT be handled by 1.2.21 (should be 1.2.19)
      const śīṅResult = sutra1221('शयित', { root: 'शीङ्', affix: 'इत' });
      expect(śīṅResult.applicable).toBe(false);
      
      // This SHOULD be handled by 1.2.21
      const yujResult = sutra1221('युक्त', { root: 'युज्', affix: 'इत' });
      expect(yujResult.applicable).toBe(true);
    });
  });
});
