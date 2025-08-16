/**
 * Test suite for Sutra 1.3.70: लियः सम्माननशालिनीकरणयोश्च
 * Tests causative forms of लि in respect, subduing, and deception contexts taking Ātmanepada
 */

import { sutra1370 } from './index.js';

describe('Sutra 1.3.70: लियः सम्माननशालिनीकरणयोश्च', () => {
  
  describe('Input Validation', () => {
    test('should handle null/undefined input', () => {
      const result = sutra1370(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle empty string', () => {
      const result = sutra1370('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle non-string input', () => {
      const result = sutra1370(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });
  
  describe('Positive Cases - Respect Sense (सम्मानन)', () => {
    test('should apply for लि causative in respect context', () => {
      const result = sutra1370('लिय', {
        root: 'लि',
        isCausative: true,
        isRespectSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedSenses).toContain('respect');
    });
    
    test('should apply with respect meaning in IAST', () => {
      const result = sutra1370('līyate', {
        root: 'li',
        isCausative: true,
        meaning: 'causes to adhere with respect'
      });
      expect(result.applies).toBe(true);
      expect(result.validSenses.respect).toBe(true);
    });
    
    test('should detect respect keywords in meaning', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        meaning: 'honor and revere the deity'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses).toContain('respect');
    });
    
    test('should handle Sanskrit respect terms', () => {
      const result = sutra1370('लिययति', {
        root: 'लि',
        isCausative: true,
        meaning: 'सम्मानन through worship'
      });
      expect(result.applies).toBe(true);
      expect(result.validSenses.respect).toBe(true);
    });
  });
  
  describe('Positive Cases - Subduing Sense (शालिनीकरण)', () => {
    test('should apply for लि causative in subduing context', () => {
      const result = sutra1370('लिय', {
        root: 'लि',
        isCausative: true,
        isSubduingSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedSenses).toContain('subduing');
    });
    
    test('should apply with subduing meaning', () => {
      const result = sutra1370('līyate', {
        root: 'li',
        isCausative: true,
        meaning: 'subdue and control the enemy'
      });
      expect(result.applies).toBe(true);
      expect(result.validSenses.subduing).toBe(true);
    });
    
    test('should detect subduing keywords', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        meaning: 'conquer and dominate the opponents'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses).toContain('subduing');
    });
    
    test('should handle Sanskrit subduing terms', () => {
      const result = sutra1370('लिययते', {
        root: 'लि',
        isCausative: true,
        meaning: 'शालिनीकरण of the rivals'
      });
      expect(result.applies).toBe(true);
      expect(result.validSenses.subduing).toBe(true);
    });
  });
  
  describe('Positive Cases - Deception Sense (प्रलम्भ continuation)', () => {
    test('should apply for लि causative in deception context', () => {
      const result = sutra1370('लिय', {
        root: 'लि',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedSenses).toContain('deception');
    });
    
    test('should apply with deception meaning', () => {
      const result = sutra1370('līyate', {
        root: 'li',
        isCausative: true,
        meaning: 'deceive through false adherence'
      });
      expect(result.applies).toBe(true);
      expect(result.validSenses.deception).toBe(true);
    });
    
    test('should detect deception keywords', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        meaning: 'trick and cheat others'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses).toContain('deception');
    });
  });
  
  describe('Multiple Senses', () => {
    test('should handle multiple valid senses', () => {
      const result = sutra1370('लिययते', {
        root: 'लि',
        isCausative: true,
        meaning: 'respect while subduing the enemy'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses.length).toBeGreaterThan(1);
      expect(result.validSenses.respect).toBe(true);
      expect(result.validSenses.subduing).toBe(true);
    });
    
    test('should handle all three senses', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        isRespectSense: true,
        isSubduingSense: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses).toEqual(['respect', 'subduing', 'deception']);
    });
  });
  
  describe('Pattern Detection', () => {
    test('should detect लि pattern without explicit root', () => {
      const result = sutra1370('लियति', {
        isCausative: true,
        isRespectSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should detect causative patterns', () => {
      const result = sutra1370('लिआपयति', {
        root: 'लि',
        isRespectSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedCausative).toBe(true);
    });
    
    test('should infer valid sense when none specified', () => {
      const result = sutra1370('लियते', {
        root: 'लि',
        isCausative: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses).toContain('inferred');
    });
  });
  
  describe('Negative Cases - Wrong Root', () => {
    test('should not apply for different root', () => {
      const result = sutra1370('करोति', {
        root: 'कृ',
        isCausative: true,
        isRespectSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not लि');
    });
    
    test('should not apply for गम् root', () => {
      const result = sutra1370('गमयति', {
        root: 'गम्',
        isCausative: true,
        isRespectSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not लि');
    });
  });
  
  describe('Negative Cases - Non-Causative', () => {
    test('should not apply for non-causative लि', () => {
      const result = sutra1370('लिनाति', {
        root: 'लि',
        isCausative: false,
        isRespectSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Causative formation');
    });
    
    test('should not apply for simple लि forms', () => {
      const result = sutra1370('लिंपति', {
        root: 'लि',
        isCausative: false,
        isSubduingSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Causative formation');
    });
  });
  
  describe('Negative Cases - Wrong Meaning', () => {
    test('should not apply without valid sense', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        isRespectSense: false,
        isSubduingSense: false,
        isDeceptionSense: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Required sense not found');
    });
    
    test('should not apply for unrelated meaning', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        meaning: 'simple movement without any special context'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Required sense not found');
    });
    
    test('should not apply for neutral adhesion meaning', () => {
      const result = sutra1370('लियते', {
        root: 'लि',
        isCausative: true,
        meaning: 'causes to stick to surface'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Required sense not found');
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle IAST script detection', () => {
      const result = sutra1370('līyate', {
        root: 'li',
        isCausative: true,
        isRespectSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should handle mixed script input', () => {
      const result = sutra1370('लियति', {
        root: 'li', // IAST root with Devanagari word
        isCausative: true,
        isSubduingSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should maintain high confidence for valid cases', () => {
      const result = sutra1370('लिययते', {
        root: 'लि',
        isCausative: true,
        isRespectSense: true
      });
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should handle complex meanings with multiple keywords', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        meaning: 'respectfully subdue through honored control'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedSenses.length).toBeGreaterThan(1);
    });
  });
  
  describe('Return Value Structure', () => {
    test('should return complete analysis object', () => {
      const result = sutra1370('लिय', {
        root: 'लि',
        isCausative: true,
        isRespectSense: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('detectedSenses');
      expect(result).toHaveProperty('validSenses');
      expect(result.sutra).toBe('1.3.70');
    });
    
    test('should provide detailed sense analysis', () => {
      const result = sutra1370('लियति', {
        root: 'लि',
        isCausative: true,
        meaning: 'respect and honor'
      });
      
      expect(result).toHaveProperty('detectedRoot');
      expect(result).toHaveProperty('detectedCausative');
      expect(result).toHaveProperty('detectedSenses');
      expect(result).toHaveProperty('validSenses');
      expect(result.validSenses).toHaveProperty('respect');
      expect(result.validSenses).toHaveProperty('subduing');
      expect(result.validSenses).toHaveProperty('deception');
    });
  });
  
  describe('Error Handling', () => {
    test('should handle analysis errors gracefully', () => {
      const result = sutra1370('invalid-sanskrit', {
        root: 'लि',
        isCausative: true,
        isRespectSense: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('confidence');
    });
  });
});
