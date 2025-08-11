/**
 * Test cases for Sutra 1.2.19: निष्ठा शीङ्स्विदिमिदिक्ष्विदिधृषः
 * Testing the prevention of कित् designation for सेट् निष्ठा affixes after specific roots
 */

import {
  sutra1219,
  isSutra1219Root,
  hasSetAugment,
  isSetNishtha,
  getSutra1219Roots,
  getSutra1219Examples,
  preventsKitBySutra1219,
  isSpecificNishthaExceptionVerb
} from './index.js';

describe('Sutra 1.2.19: निष्ठा शीङ्स्विदिमिदिक्ष्विदिधृषः', () => {
  
  describe('isSutra1219Root function', () => {
    describe('Devanagari roots', () => {
      test('should identify शीङ् root and variants', () => {
        expect(isSutra1219Root('शीङ्')).toBe(true);
        expect(isSutra1219Root('शी')).toBe(true);
        expect(isSutra1219Root('शय्')).toBe(true);
        expect(isSutra1219Root('शेते')).toBe(true);
      });

      test('should identify स्विद् root and variants', () => {
        expect(isSutra1219Root('स्विद्')).toBe(true);
        expect(isSutra1219Root('स्विद')).toBe(true);
        expect(isSutra1219Root('स्वेद्')).toBe(true);
      });

      test('should identify मिद् root and variants', () => {
        expect(isSutra1219Root('मिद्')).toBe(true);
        expect(isSutra1219Root('मिद')).toBe(true);
        expect(isSutra1219Root('मेद्')).toBe(true);
      });

      test('should identify क्ष्विद् root and variants', () => {
        expect(isSutra1219Root('क्ष्विद्')).toBe(true);
        expect(isSutra1219Root('क्ष्विद')).toBe(true);
        expect(isSutra1219Root('क्ष्वेद्')).toBe(true);
      });

      test('should identify दृश् root and variants', () => {
        expect(isSutra1219Root('दृश्')).toBe(true);
        expect(isSutra1219Root('दृश')).toBe(true);
        expect(isSutra1219Root('दर्श्')).toBe(true);
        expect(isSutra1219Root('पश्य्')).toBe(true);
      });
    });

    describe('IAST roots', () => {
      test('should identify śīṅ root and variants', () => {
        expect(isSutra1219Root('śīṅ')).toBe(true);
        expect(isSutra1219Root('śī')).toBe(true);
        expect(isSutra1219Root('śay')).toBe(true);
        expect(isSutra1219Root('śete')).toBe(true);
      });

      test('should identify svid root and variants', () => {
        expect(isSutra1219Root('svid')).toBe(true);
        expect(isSutra1219Root('svida')).toBe(true);
        expect(isSutra1219Root('sved')).toBe(true);
      });

      test('should identify mid root and variants', () => {
        expect(isSutra1219Root('mid')).toBe(true);
        expect(isSutra1219Root('mida')).toBe(true);
        expect(isSutra1219Root('med')).toBe(true);
      });

      test('should identify kṣvid root and variants', () => {
        expect(isSutra1219Root('kṣvid')).toBe(true);
        expect(isSutra1219Root('kṣvida')).toBe(true);
        expect(isSutra1219Root('kṣved')).toBe(true);
      });

      test('should identify dṛś root and variants', () => {
        expect(isSutra1219Root('dṛś')).toBe(true);
        expect(isSutra1219Root('dṛśa')).toBe(true);
        expect(isSutra1219Root('darś')).toBe(true);
        expect(isSutra1219Root('paśy')).toBe(true);
      });
    });

    describe('Non-Sutra 1.2.19 roots', () => {
      test('should reject other roots', () => {
        expect(isSutra1219Root('कृ')).toBe(false);
        expect(isSutra1219Root('गम्')).toBe(false);
        expect(isSutra1219Root('भू')).toBe(false);
        expect(isSutra1219Root('कृष्')).toBe(false);
        
        // IAST
        expect(isSutra1219Root('kṛ')).toBe(false);
        expect(isSutra1219Root('gam')).toBe(false);
        expect(isSutra1219Root('bhū')).toBe(false);
        expect(isSutra1219Root('kṛṣ')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      test('should handle invalid inputs', () => {
        expect(isSutra1219Root('')).toBe(false);
        expect(isSutra1219Root(null)).toBe(false);
        expect(isSutra1219Root(undefined)).toBe(false);
        expect(isSutra1219Root(123)).toBe(false);
      });
    });
  });

  describe('hasSetAugment function', () => {
    describe('Context-based detection', () => {
      test('should detect सेट् augment from context', () => {
        expect(hasSetAugment('क्त', { hasSetAugment: true })).toBe(true);
        expect(hasSetAugment('kta', { hasItAugment: true })).toBe(true);
        expect(hasSetAugment('क्त', { augment: 'सेट्' })).toBe(true);
        expect(hasSetAugment('kta', { augment: 'seṭ' })).toBe(true);
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
        expect(hasSetAugment('क्त')).toBe(false);
        expect(hasSetAugment('kta')).toBe(false);
        expect(hasSetAugment('त')).toBe(false);
        expect(hasSetAugment('ta')).toBe(false);
      });

      test('should handle invalid inputs', () => {
        expect(hasSetAugment('')).toBe(false);
        expect(hasSetAugment(null)).toBe(false);
        expect(hasSetAugment(undefined)).toBe(false);
        expect(hasSetAugment(123)).toBe(false);
      });
    });
  });

  describe('isSetNishtha function', () => {
    describe('Positive cases', () => {
      test('should identify सेट् निष्ठा affixes with context', () => {
        expect(isSetNishtha('क्त', { hasSetAugment: true })).toBe(true);
        expect(isSetNishtha('क्तवत्', { hasItAugment: true })).toBe(true);
        expect(isSetNishtha('kta', { augment: 'iṭ' })).toBe(true);
        expect(isSetNishtha('ktavat', { augment: 'seṭ' })).toBe(true);
      });

      test('should identify सेट् निष्ठा from form patterns', () => {
        expect(isSetNishtha('इत')).toBe(true);
        expect(isSetNishtha('इक्त')).toBe(true);
        expect(isSetNishtha('ita')).toBe(true);
        expect(isSetNishtha('ikta')).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject non-निष्ठा affixes', () => {
        expect(isSetNishtha('ति', { hasSetAugment: true })).toBe(false);
        expect(isSetNishtha('सि', { hasItAugment: true })).toBe(false);
        expect(isSetNishtha('ti', { augment: 'iṭ' })).toBe(false);
        expect(isSetNishtha('si', { augment: 'seṭ' })).toBe(false);
      });

      test('should reject निष्ठा without सेट्', () => {
        expect(isSetNishtha('क्त')).toBe(false);
        expect(isSetNishtha('क्तवत्')).toBe(false);
        expect(isSetNishtha('kta')).toBe(false);
        expect(isSetNishtha('ktavat')).toBe(false);
      });
    });
  });

  describe('sutra1219 main function', () => {
    describe('Positive cases - rule application', () => {
      test('should prevent कित् for शीङ् + सेट् निष्ठा', () => {
        const result = sutra1219('शयित', {
          root: 'शीङ्',
          affix: 'क्त',
          hasSetAugment: true
        });

        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('does NOT receive कित् designation');
        expect(result.details.rootsAffected).toContain('शीङ्');
      });

      test('should prevent कित् for स्विद् + सेट् निष्ठा', () => {
        const result = sutra1219('स्विन्न', {
          root: 'स्विद्',
          affix: 'क्त',
          augment: 'सेट्'
        });

        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.details.morphology.hasSetAugment).toBe(true);
      });

      test('should handle IAST forms', () => {
        const result = sutra1219('dṛṣṭa', {
          root: 'dṛś',
          affix: 'kta',
          hasItAugment: true
        });

        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.explanation).toContain('dṛś');
      });
    });

    describe('Example word recognition', () => {
      test('should recognize common example forms', () => {
        const result1 = sutra1219('शयित');
        expect(result1.applicable).toBe(true);
        expect(result1.preventsKit).toBe(true);

        const result2 = sutra1219('स्विन्न');
        expect(result2.applicable).toBe(true);
        expect(result2.preventsKit).toBe(true);

        const result3 = sutra1219('दृष्ट');
        expect(result3.applicable).toBe(true);
        expect(result3.preventsKit).toBe(true);
      });

      test('should recognize IAST example forms', () => {
        const result1 = sutra1219('śayita');
        expect(result1.applicable).toBe(true);
        expect(result1.preventsKit).toBe(true);

        const result2 = sutra1219('svinna');
        expect(result2.applicable).toBe(true);
        expect(result2.preventsKit).toBe(true);
      });
    });

    describe('Negative cases - rule not applicable', () => {
      test('should not apply to other roots', () => {
        const result = sutra1219('कृत', {
          root: 'कृ',
          affix: 'क्त',
          hasSetAugment: true
        });

        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('is not from Sutra 1.2.19');
      });

      test('should not apply to non-सेट् निष्ठा', () => {
        const result = sutra1219('शयित', {
          root: 'शीङ्',
          affix: 'क्त'
          // No सेट् augment
        });

        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('is not सेट् निष्ठा');
      });

      test('should not apply to non-निष्ठा words', () => {
        const result = sutra1219('शेते');
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('does not contain निष्ठा affix');
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug information when requested', () => {
        const result = sutra1219('शयित', {
          root: 'शीङ्',
          affix: 'क्त',
          hasSetAugment: true,
          debug: true
        });

        expect(result.debug).toBeDefined();
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug.some(msg => msg.includes('[1.2.19]'))).toBe(true);
      });

      test('should not include debug information when not requested', () => {
        const result = sutra1219('शयित', {
          root: 'शीङ्',
          affix: 'क्त',
          hasSetAugment: true
        });

        expect(result.debug).toEqual([]);
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        const result = sutra1219('');
        expect(result.applicable).toBe(false);
        expect(result.error).toBe('Invalid input');
      });

      test('should handle invalid Sanskrit words', () => {
        const result = sutra1219('xyz123');
        expect(result.applicable).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit word');
      });
    });
  });

  describe('Utility functions', () => {
    describe('getSutra1219Roots', () => {
      test('should return Devanagari roots', () => {
        const roots = getSutra1219Roots('Devanagari');
        expect(roots).toHaveProperty('शीङ्');
        expect(roots).toHaveProperty('स्विद्');
        expect(roots).toHaveProperty('मिद्');
        expect(roots).toHaveProperty('क्ष्विद्');
        expect(roots).toHaveProperty('दृश्');
      });

      test('should return IAST roots by default', () => {
        const roots = getSutra1219Roots();
        expect(roots).toHaveProperty('śīṅ');
        expect(roots).toHaveProperty('svid');
        expect(roots).toHaveProperty('mid');
        expect(roots).toHaveProperty('kṣvid');
        expect(roots).toHaveProperty('dṛś');
      });
    });

    describe('getSutra1219Examples', () => {
      test('should return example forms', () => {
        const examples = getSutra1219Examples('Devanagari');
        expect(examples['शीङ्'].past_participle).toBe('शयित');
        expect(examples['स्विद्'].past_participle).toBe('स्विन्न');
        expect(examples['दृश्'].past_participle).toBe('दृष्ट');
      });
    });

    describe('preventsKitBySutra1219', () => {
      test('should correctly identify preventing conditions', () => {
        expect(preventsKitBySutra1219('शीङ्', 'क्त', { hasSetAugment: true })).toBe(true);
        expect(preventsKitBySutra1219('कृ', 'क्त', { hasSetAugment: true })).toBe(false);
        expect(preventsKitBySutra1219('शीङ्', 'ति', { hasSetAugment: true })).toBe(false);
      });
    });

    describe('isSpecificNishthaExceptionVerb alias', () => {
      test('should work as alias for isSutra1219Root', () => {
        expect(isSpecificNishthaExceptionVerb('शीङ्')).toBe(true);
        expect(isSpecificNishthaExceptionVerb('कृ')).toBe(false);
      });
    });
  });

  describe('Integration tests', () => {
    test('should work consistently across all functions', () => {
      const root = 'शीङ्';
      const affix = 'क्त';
      const context = { hasSetAugment: true };

      expect(isSutra1219Root(root)).toBe(true);
      expect(isSetNishtha(affix, context)).toBe(true);
      expect(preventsKitBySutra1219(root, affix, context)).toBe(true);

      const result = sutra1219('test', { root, affix, ...context });
      expect(result.applicable).toBe(true);
      expect(result.preventsKit).toBe(true);
    });

    test('should handle cross-script consistency', () => {
      const devanagariResult = sutra1219('शयित', {
        root: 'शीङ्',
        affix: 'क्त',
        hasSetAugment: true
      });

      const iastResult = sutra1219('śayita', {
        root: 'śīṅ',
        affix: 'kta',
        hasItAugment: true
      });

      expect(devanagariResult.applicable).toBe(iastResult.applicable);
      expect(devanagariResult.preventsKit).toBe(iastResult.preventsKit);
    });
  });
});
