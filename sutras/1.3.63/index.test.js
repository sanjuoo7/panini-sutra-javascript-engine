/**
 * Test Suite for Sutra 1.3.63: आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य
 * "When auxiliary कृ is used with a verb that (like an ām-pratyaya verb) is Ātmanepada, 
 * the construction with auxiliary कृ also takes Ātmanepada"
 */
import { sutra1363 } from './index.js';

describe('Sutra 1.3.63: आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य', () => {
  
  describe('Positive Cases: Auxiliary कृ with Ātmanepada', () => {
    test('should apply for auxiliary कृ with main having ām and Ātmanepada', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: true, 
        fruitToAgent: false 
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.sutraApplied).toBe('1.3.63');
    });

    test('should apply with IAST auxiliary root', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'kṛ', 
        mainHasAm: true, 
        mainAtmanepada: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should apply regardless of fruit-to-agent', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: true, 
        fruitToAgent: true 
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle baseAtmanepada as alternative', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        baseAtmanepada: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });

  describe('Negative Cases: Conditions Not Met', () => {
    test('should not apply when auxiliary is not कृ', () => {
      const result = sutra1363('गच्छति', { 
        auxiliaryRoot: 'gam', 
        mainHasAm: true, 
        mainAtmanepada: true 
      });
      expect(result.applies).toBe(false);
    });

    test('should not apply when main verb lacks ām', () => {
      const result = sutra1363('करोति', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: false, 
        mainAtmanepada: true 
      });
      expect(result.applies).toBe(false);
    });

    test('should not apply when main verb is not Ātmanepada', () => {
      const result = sutra1363('करोति', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: false 
      });
      expect(result.applies).toBe(false);
    });

    test('should not apply when no auxiliary context', () => {
      const result = sutra1363('करोति', { 
        mainHasAm: true, 
        mainAtmanepada: true 
      });
      expect(result.applies).toBe(false);
    });
  });

  describe('Input Validation', () => {
    test('should handle invalid input gracefully', () => {
      const result = sutra1363(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = sutra1363('');
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    test('should handle unknown script', () => {
      const result = sutra1363('xyz123', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: true 
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Unknown script');
    });
  });

  describe('Multi-script Support', () => {
    test('should handle IAST input', () => {
      const result = sutra1363('karote', { 
        auxiliaryRoot: 'kṛ', 
        mainHasAm: true, 
        mainAtmanepada: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle Devanagari input', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle mixed script contexts', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'kṛ', // IAST auxiliary
        mainHasAm: true, 
        mainAtmanepada: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });

  describe('Classical Examples', () => {
    test('should handle namaskāra constructions', () => {
      const result = sutra1363('नमस्करोते', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: true,
        meaning: 'performs obeisance'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should provide detailed analysis', () => {
      const result = sutra1363('करोते', { 
        auxiliaryRoot: 'कृ', 
        mainHasAm: true, 
        mainAtmanepada: true
      });
      expect(result.details).toBeDefined();
      expect(result.details.isAuxKri).toBe(true);
      expect(result.details.mainHasAm).toBe(true);
      expect(result.details.mainAt).toBe(true);
    });
  });
});