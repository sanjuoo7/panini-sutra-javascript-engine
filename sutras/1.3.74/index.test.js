/**
 * Test Suite for Sutra 1.3.74: णिचश्च (ṇicaśca)
 * Tests the implementation of causative verb Ātmanepada designation
 */

import { sutra1374, checkCausativeAtmanepada } from './index.js';

describe('Sutra 1.3.74: णिचश्च (Causative Ātmanepada)', () => {
  
  describe('Basic Functionality', () => {
    
    test('should identify causative verbs with agent benefit', () => {
      const result = sutra1374('गमयते', {
        root: 'गम्',
        hasCausative: true,
        benefitsAgent: true,
        meaning: 'makes go for own benefit'
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should reject non-causative verbs', () => {
      const result = sutra1374('गच्छति', {
        root: 'गम्',
        hasCausative: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.isAtmanepada).toBe(false);
      expect(result.reason).toContain('causative');
    });
    
    test('should reject causatives without agent benefit', () => {
      const result = sutra1374('गमयति', {
        root: 'गम्',
        hasCausative: true,
        benefitsAgent: false,
        meaning: 'makes another go'
      });
      
      expect(result.applies).toBe(false);
      expect(result.isAtmanepada).toBe(false);
      expect(result.reason).toContain('कर्त्रभिप्राय');
    });
    
  });
  
  describe('IAST Script Support', () => {
    
    test('should handle IAST causative forms', () => {
      const result = sutra1374('gamayate', {
        root: 'gam',
        hasCausative: true,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.details.detectedScript).toBe('IAST');
    });
    
    test('should detect causative patterns in IAST', () => {
      const result = sutra1374('pathayate', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasCausative).toBe(true);
    });
    
  });
  
  describe('Pattern Recognition', () => {
    
    test('should detect causative य pattern', () => {
      const result = sutra1374('बोधयते', {
        benefitsAgent: true,
        meaning: 'awakens for self'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasCausative).toBe(true);
    });
    
    test('should detect causative पय pattern', () => {
      const result = sutra1374('स्थापयते', {
        benefitsAgent: true,
        meaning: 'establishes for own purpose'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasCausative).toBe(true);
    });
    
    test('should detect आपय pattern', () => {
      const result = sutra1374('गमापयते', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasCausative).toBe(true);
    });
    
  });
  
  describe('Semantic Analysis', () => {
    
    test('should detect agent benefit from meaning keywords', () => {
      const result = sutra1374('गमयते', {
        hasCausative: true,
        meaning: 'makes go for oneself'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
    test('should detect स्वार्थ pattern', () => {
      const result = sutra1374('पठयते', {
        hasCausative: true,
        meaning: 'स्वार्थ में पढ़ाना'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
    test('should detect English agent benefit keywords', () => {
      const result = sutra1374('bodhayate', {
        hasCausative: true,
        meaning: 'awakens for own benefit'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
  });
  
  describe('Edge Cases', () => {
    
    test('should handle missing context gracefully', () => {
      const result = sutra1374('गमयते');
      
      expect(result.applies).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });
    
    test('should handle अफिx context', () => {
      const result = sutra1374('गमयते', {
        affix: 'णि',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasCausative).toBe(true);
    });
    
    test('should handle णिज् affix', () => {
      const result = sutra1374('कुर्वयते', {
        affix: 'णिज्',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasCausative).toBe(true);
    });
    
  });
  
  describe('Input Validation', () => {
    
    test('should reject null input', () => {
      const result = sutra1374(null);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should reject empty string', () => {
      const result = sutra1374('');
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should reject non-string input', () => {
      const result = sutra1374(123);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
  });
  
  describe('Function Aliases', () => {
    
    test('should work with alternate export name', () => {
      const result = checkCausativeAtmanepada('गमयते', {
        hasCausative: true,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.sutra).toBe('1.3.74');
    });
    
  });
  
  describe('Error Handling', () => {
    
    test('should handle validation errors gracefully', () => {
      const result = sutra1374('invalid123');
      
      expect(result.applies).toBe(false);
      expect(result.confidence).toBe(0);
    });
    
  });
  
});
