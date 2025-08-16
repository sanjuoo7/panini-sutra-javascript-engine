/**
 * Test suite for Sutra 1.3.71: मिथ्योपपदात् कृञोऽभ्यासे
 * Tests कृ with मिथ्या उपपद in abhyāsa sense taking Ātmanepada
 */

import { sutra1371 } from './index.js';

describe('Sutra 1.3.71: मिथ्योपपदात् कृञोऽभ्यासे', () => {
  
  describe('Input Validation', () => {
    test('should handle null/undefined input', () => {
      const result = sutra1371(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle empty string', () => {
      const result = sutra1371('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle non-string input', () => {
      const result = sutra1371(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });
  
  describe('Positive Cases - मिथ्या + कृ Construction', () => {
    test('should apply for मिथ्या + कृ in abhyāsa context', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.construction).toBe('मिथ्या + कृ');
    });
    
    test('should apply with IAST input', () => {
      const result = sutra1371('mithyākaroti', {
        root: 'kṛ',
        upapada: 'mithyā',
        meaning: 'repeatedly speaks falsehood'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
    
    test('should detect मिथ्या pattern in word', () => {
      const result = sutra1371('मिथ्याकुर्वे', {
        root: 'कृ',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedMithyaUpapada).toBe(true);
    });
    
    test('should apply with repetition meaning', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'repeatedly utters wrong statements'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
    
    test('should apply with falsehood meaning', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'speaks lies and falsehood'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
  });
  
  describe('Pattern Detection', () => {
    test('should detect कृ pattern without explicit root', () => {
      const result = sutra1371('मिथ्याकरोति', {
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should detect कर variations', () => {
      const result = sutra1371('मिथ्याकरयति', {
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should detect mithyā in IAST', () => {
      const result = sutra1371('mithyākurvate', {
        root: 'kṛ',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedMithyaUpapada).toBe(true);
    });
    
    test('should default to abhyāsa sense with मिथ्या + कृ', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
  });
  
  describe('Meaning Analysis', () => {
    test('should detect repetition keywords', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'does repeated actions'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
    
    test('should detect falsehood keywords', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'speaks untrue things'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
    
    test('should detect Sanskrit keywords', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'अभ्यास से असत्य वचन करता है'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
    
    test('should detect utterance context', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'wrongly uttering statements'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
  });
  
  describe('Negative Cases - Wrong Root', () => {
    test('should not apply for different root', () => {
      const result = sutra1371('मिथ्यागच्छति', {
        root: 'गम्',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not कृ');
    });
    
    test('should not apply for भू root', () => {
      const result = sutra1371('मिथ्याभवति', {
        root: 'भू',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not कृ');
    });
  });
  
  describe('Negative Cases - No मिथ्या उपपद', () => {
    test('should not apply without मिथ्या upapada', () => {
      const result = sutra1371('करोति', {
        root: 'कृ',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('मिथ्या उपपद');
    });
    
    test('should not apply with different upapada', () => {
      const result = sutra1371('सत्यकरोति', {
        root: 'कृ',
        upapada: 'सत्य',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('मिथ्या उपपद');
    });
    
    test('should not apply with प्र upapada', () => {
      const result = sutra1371('प्रकरोति', {
        root: 'कृ',
        upapada: 'प्र',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('मिथ्या उपपद');
    });
  });
  
  describe('Negative Cases - Wrong Sense', () => {
    test('should not apply without abhyāsa sense', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        hasAbhyasaSense: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Abhyāsa sense');
    });
    
    test('should not apply for simple making meaning', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'simply makes something'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Abhyāsa sense');
    });
    
    test('should not apply for truth-telling meaning', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'tells the truth clearly'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Abhyāsa sense');
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle IAST script detection', () => {
      const result = sutra1371('mithyākurvate', {
        root: 'kṛ',
        upapada: 'mithyā',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should handle mixed script input', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'kṛ', // IAST root with Devanagari word
        upapada: 'mithyā',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should handle kar root variation', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'kar',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should maintain high confidence for valid cases', () => {
      const result = sutra1371('मिथ्याकुर्वे', {
        root: 'कृ',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should handle complex compound words', () => {
      const result = sutra1371('मिथ्याकारकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'repeatedly makes false statements'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAbhyasaSense).toBe(true);
    });
  });
  
  describe('Return Value Structure', () => {
    test('should return complete analysis object', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('construction');
      expect(result.sutra).toBe('1.3.71');
      expect(result.construction).toBe('मिथ्या + कृ');
    });
    
    test('should provide detection details', () => {
      const result = sutra1371('मिथ्याकरोति', {
        root: 'कृ',
        upapada: 'मिथ्या',
        meaning: 'speaks lies repeatedly'
      });
      
      expect(result).toHaveProperty('detectedRoot');
      expect(result).toHaveProperty('detectedMithyaUpapada');
      expect(result).toHaveProperty('detectedAbhyasaSense');
      expect(result).toHaveProperty('construction');
    });
  });
  
  describe('Error Handling', () => {
    test('should handle analysis errors gracefully', () => {
      const result = sutra1371('invalid-sanskrit', {
        root: 'कृ',
        upapada: 'मिथ्या',
        hasAbhyasaSense: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('confidence');
    });
  });
});
