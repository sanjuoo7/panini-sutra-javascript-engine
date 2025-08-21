/**
 * Test Suite for Sutra 1.3.62: पूर्ववत् सन्
 * "For the desiderative (सन्), [use the pada] as before [i.e., as for the primitive root]"
 * This is an atideśa (extension rule) that carries over pada selection from base verbs to their desiderative forms.
 */
import { sutra1362 } from './index.js';

describe('Sutra 1.3.62: पूर्ववत् सन्', () => {
  
  describe('Positive Cases: Ātmanepada Carry-over', () => {
    test('should apply when desiderative and base verb is Ātmanepada', () => {
      const result = sutra1362('चिक्रीडते', { 
        isDesiderative: true, 
        baseAtmanepada: true 
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.sutraApplied).toBe('1.3.62');
      expect(result.reason).toContain('Atideśa');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should apply with explicit desiderative context', () => {
      const result = sutra1362('बुभुक्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'bhuj',
        meaning: 'desires to eat'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.details.isSan).toBe(true);
      expect(result.details.baseAt).toBe(true);
    });

    test('should handle Devanagari desiderative forms', () => {
      const result = sutra1362('पिपासते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'पा',
        meaning: 'desires to drink'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should apply with san affix indication', () => {
      const result = sutra1362('चिकीर्षते', { 
        affix: 'san', 
        baseAtmanepada: true,
        baseRoot: 'kṛ',
        meaning: 'desires to do'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should apply with Devanagari san affix', () => {
      const result = sutra1362('जिज्ञासते', { 
        affixes: 'सन्', 
        baseAtmanepada: true,
        baseRoot: 'ज्ञा',
        meaning: 'desires to know'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle multiple affix formats', () => {
      const result = sutra1362('विविक्षते', { 
        affixes: ['san', 'सन्'], 
        baseWouldBeAtmanepada: true,
        baseRoot: 'vic',
        meaning: 'desires to separate'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should apply with classical examples', () => {
      const result = sutra1362('लिप्सते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'labh',
        meaning: 'desires to obtain'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle IAST input correctly', () => {
      const result = sutra1362('cikīrṣate', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'kṛ'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });

  describe('Negative Cases: No Ātmanepada Carry-over', () => {
    test('should not apply when base verb is not Ātmanepada', () => {
      const result = sutra1362('चिक्रीडति', { 
        isDesiderative: true, 
        baseAtmanepada: false 
      });
      expect(result.applies).toBe(false);
      expect(result.isAtmanepada).toBe(false);
      expect(result.reason).toContain('not Ātmanepada');
    });

    test('should not apply to non-desiderative forms', () => {
      const result = sutra1362('क्रीडति', { 
        isDesiderative: false, 
        baseAtmanepada: true 
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Not desiderative');
    });

    test('should not apply when no desiderative indication', () => {
      const result = sutra1362('गच्छति', { 
        baseAtmanepada: true 
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Not desiderative');
    });

    test('should not apply to parasmaipada base verbs', () => {
      const result = sutra1362('जिगमिषति', { 
        isDesiderative: true, 
        baseAtmanepada: false,
        baseRoot: 'gam',
        meaning: 'desires to go'
      });
      expect(result.applies).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply when base pada is unclear', () => {
      const result = sutra1362('चिकीर्षति', { 
        isDesiderative: true 
        // no baseAtmanepada specified
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('not Ātmanepada');
    });
  });

  describe('Edge Cases and Complex Scenarios', () => {
    test('should handle ambiguous pada cases with low confidence', () => {
      const result = sutra1362('चिक्रीडते', { 
        isDesiderative: true, 
        baseAtmanepada: false 
      });
      expect(result.applies).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should handle mixed script contexts', () => {
      const result = sutra1362('चिकीर्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'kṛ', // IAST root with Devanagari form
        meaning: 'desires to do'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should provide detailed analysis in result', () => {
      const result = sutra1362('बुभुक्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'bhuj',
        semanticField: 'consumption'
      });
      expect(result.details).toBeDefined();
      expect(result.details.isSan).toBe(true);
      expect(result.details.baseAt).toBe(true);
    });

    test('should handle contextual semantic information', () => {
      const result = sutra1362('मुमुक्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'muc',
        meaning: 'desires liberation',
        semanticField: 'spiritual'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });

  describe('Input Validation', () => {
    test('should handle invalid input gracefully', () => {
      const result = sutra1362(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
      expect(result.confidence).toBe(0);
    });

    test('should handle undefined input', () => {
      const result = sutra1362(undefined);
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = sutra1362('');
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    test('should handle whitespace-only input', () => {
      const result = sutra1362('   ');
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = sutra1362(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = sutra1362('xyz123', { 
        isDesiderative: true, 
        baseAtmanepada: true 
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Unknown script'); // Actually gets caught as unknown script first
    });

    test('should handle unknown script', () => {
      const result = sutra1362('καλός', { 
        isDesiderative: true, 
        baseAtmanepada: true 
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Unknown script');
    });
  });

  describe('Classical Examples', () => {
    test('should classify bubhukṣate (desires to eat)', () => {
      const result = sutra1362('बुभुक्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'भुज्',
        meaning: 'desires to eat',
        example: 'classical'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.75);
    });

    test('should classify jijñāsate (desires to know)', () => {
      const result = sutra1362('जिज्ञासते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'ज्ञा',
        meaning: 'desires to know'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should classify lipsate (desires to obtain)', () => {
      const result = sutra1362('लिप्सते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'लभ्',
        meaning: 'desires to obtain'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle mumukṣate (desires liberation)', () => {
      const result = sutra1362('मुमुक्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'मुच्',
        meaning: 'desires liberation',
        context: 'philosophical'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });

  describe('Multi-script Support', () => {
    test('should handle IAST desiderative forms', () => {
      const result = sutra1362('bubhukṣate', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'bhuj'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle Devanagari desiderative forms', () => {
      const result = sutra1362('बुभुक्षते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'भुज्'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle mixed script contexts', () => {
      const result = sutra1362('जिज्ञासते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'jñā', // IAST root
        affix: 'सन्' // Devanagari affix
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });

  describe('Confidence Assessment', () => {
    test('should provide high confidence for clear cases', () => {
      const result = sutra1362('चिक्रीडते', { 
        isDesiderative: true, 
        baseAtmanepada: true,
        baseRoot: 'क्रीड्',
        certainty: 'high'
      });
      expect(result.confidence).toBeGreaterThan(0.75);
    });

    test('should provide medium confidence for unclear base pada', () => {
      const result = sutra1362('चिक्रीडति', { 
        isDesiderative: true, 
        baseAtmanepada: false
      });
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should provide zero confidence for invalid cases', () => {
      const result = sutra1362('गच्छति', { 
        isDesiderative: false, 
        baseAtmanepada: true 
      });
      expect(result.confidence).toBe(0);
    });
  });
});
