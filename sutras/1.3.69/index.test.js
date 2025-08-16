/**
 * Test suite for Sutra 1.3.69: गृधिवञ्च्योः प्रलम्भने
 * Tests causative forms of गृध् and वञ्च् in deception context taking Ātmanepada
 */

import { sutra1369 } from './index.js';

describe('Sutra 1.3.69: गृधिवञ्च्योः प्रलम्भने', () => {
  
  describe('Input Validation', () => {
    test('should handle null/undefined input', () => {
      const result = sutra1369(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle empty string', () => {
      const result = sutra1369('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle non-string input', () => {
      const result = sutra1369(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });
  
  describe('Positive Cases - गृध् Root', () => {
    test('should apply for गृध् causative in Devanagari', () => {
      const result = sutra1369('गृध्य', {
        root: 'गृध्',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.overridesFruit).toBe(true);
    });
    
    test('should apply for gṛdh causative in IAST', () => {
      const result = sutra1369('gṛdhayati', {
        root: 'gṛdh',
        isCausative: true,
        meaning: 'to deceive by coveting'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedDeceptionSense).toBe(true);
    });
    
    test('should apply with deception meaning context', () => {
      const result = sutra1369('गृध्यते', {
        root: 'गृध्',
        isCausative: true,
        meaning: 'causes to covet for deception'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });
  
  describe('Positive Cases - वञ्च् Root', () => {
    test('should apply for वञ्च् causative in Devanagari', () => {
      const result = sutra1369('वञ्चय', {
        root: 'वञ्च्',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should apply for vañc causative in IAST', () => {
      const result = sutra1369('vañcayate', {
        root: 'vañc',
        isCausative: true,
        meaning: 'tricks someone through deception'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should detect वञ्च् pattern in word', () => {
      const result = sutra1369('वञ्चयामि', {
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });
  
  describe('Pattern Detection', () => {
    test('should detect गृध pattern without explicit root', () => {
      const result = sutra1369('गृधयति', {
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should detect causative patterns', () => {
      const result = sutra1369('गृध्यापयति', {
        root: 'गृध्',
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedCausative).toBe(true);
    });
    
    test('should detect deception in meaning context', () => {
      const result = sutra1369('वञ्चयति', {
        root: 'वञ्च्',
        isCausative: true,
        meaning: 'cheats and tricks others'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedDeceptionSense).toBe(true);
    });
  });
  
  describe('Negative Cases - Wrong Root', () => {
    test('should not apply for different root', () => {
      const result = sutra1369('करोति', {
        root: 'कृ',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not गृध्');
    });
    
    test('should not apply for भू root', () => {
      const result = sutra1369('भावयति', {
        root: 'भू',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not गृध्');
    });
  });
  
  describe('Negative Cases - Non-Causative', () => {
    test('should not apply for non-causative गृध्', () => {
      const result = sutra1369('गृध्नाति', {
        root: 'गृध्',
        isCausative: false,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Causative formation');
    });
    
    test('should not apply for simple वञ्च्', () => {
      const result = sutra1369('वञ्चति', {
        root: 'वञ्च्',
        isCausative: false,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Causative formation');
    });
  });
  
  describe('Negative Cases - Wrong Meaning', () => {
    test('should not apply without deception sense', () => {
      const result = sutra1369('गृध्यति', {
        root: 'गृध्',
        isCausative: true,
        isDeceptionSense: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Deception sense');
    });
    
    test('should not apply for neutral meaning', () => {
      const result = sutra1369('वञ्चयति', {
        root: 'वञ्च्',
        isCausative: true,
        meaning: 'simple movement'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Deception sense');
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle IAST script detection', () => {
      const result = sutra1369('gṛdhayati', {
        root: 'gṛdh',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should default to deception sense when no meaning specified', () => {
      const result = sutra1369('गृध्य', {
        root: 'गृध्',
        isCausative: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedDeceptionSense).toBe(true);
    });
    
    test('should handle mixed script input', () => {
      const result = sutra1369('गृधयति', {
        root: 'gṛdh', // IAST root with Devanagari word
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should maintain high confidence for valid cases', () => {
      const result = sutra1369('वञ्चयते', {
        root: 'वञ्च्',
        isCausative: true,
        isDeceptionSense: true
      });
      expect(result.confidence).toBeGreaterThan(0.9);
    });
  });
  
  describe('Return Value Structure', () => {
    test('should return complete analysis object', () => {
      const result = sutra1369('गृध्य', {
        root: 'गृध्',
        isCausative: true,
        isDeceptionSense: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('overridesFruit');
      expect(result.sutra).toBe('1.3.69');
    });
    
    test('should provide detection details', () => {
      const result = sutra1369('वञ्चयति', {
        root: 'वञ्च्',
        isCausative: true,
        meaning: 'deceives through tricks'
      });
      
      expect(result).toHaveProperty('detectedRoot');
      expect(result).toHaveProperty('detectedCausative');
      expect(result).toHaveProperty('detectedDeceptionSense');
    });
  });
  
  describe('Error Handling', () => {
    test('should handle analysis errors gracefully', () => {
      // This test might need to be adjusted based on actual error conditions
      const result = sutra1369('invalid-sanskrit', {
        root: 'गृध्',
        isCausative: true,
        isDeceptionSense: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('confidence');
    });
  });
});
