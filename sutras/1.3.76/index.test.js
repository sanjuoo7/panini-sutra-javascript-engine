/**
 * Test Suite for Sutra 1.3.76: अनुपसर्गाज्ज्ञः (anupasargājjñaḥ)
 * Tests the implementation of ज्ञा without prefix for Ātmanepada
 */

import { sutra1376, checkJnaNoPrefixAtmanepada } from './index.js';

describe('Sutra 1.3.76: अनुपसर्गाज्ज्ञः (ज्ञा without prefix)', () => {
  
  describe('Basic Functionality', () => {
    
    test('should apply for ज्ञा without prefix with agent benefit', () => {
      const result = sutra1376('जानाते', {
        root: 'ज्ञा',
        hasPrefix: false,
        benefitsAgent: true,
        meaning: 'knows for oneself'
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should reject ज्ञा with prefix', () => {
      const result = sutra1376('अभिजानाति', {
        root: 'ज्ञा',
        upasarga: 'अभि',
        hasPrefix: true,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('उपसर्ग');
    });
    
    test('should reject non-ज्ञा roots', () => {
      const result = sutra1376('गच्छते', {
        root: 'गम्',
        hasPrefix: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('ज्ञा');
    });
    
    test('should reject without agent benefit', () => {
      const result = sutra1376('जानाति', {
        root: 'ज्ञा',
        hasPrefix: false,
        benefitsAgent: false
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('agent');
    });
    
  });
  
  describe('IAST Script Support', () => {
    
    test('should handle IAST forms', () => {
      const result = sutra1376('jānāte', {
        root: 'jñā',
        hasPrefix: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.detectedScript).toBe('IAST');
    });
    
    test('should detect ज्ञा root in IAST', () => {
      const result = sutra1376('jñāyate', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasJnaRoot).toBe(true);
    });
    
  });
  
  describe('Prefix Detection', () => {
    
    test('should detect अति prefix', () => {
      const result = sutra1376('अतिजानाति', {
        root: 'ज्ञा',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.hasNoPrefix).toBe(false);
    });
    
    test('should detect प्र prefix', () => {
      const result = sutra1376('प्रजानाति', {
        root: 'ज्ञा',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.hasNoPrefix).toBe(false);
    });
    
    test('should detect वि prefix in IAST', () => {
      const result = sutra1376('vijānāti', {
        root: 'jñā',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.hasNoPrefix).toBe(false);
    });
    
    test('should allow unprefixed forms', () => {
      const result = sutra1376('जानाते', {
        root: 'ज्ञा',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasNoPrefix).toBe(true);
    });
    
  });
  
  describe('Root Pattern Recognition', () => {
    
    test('should detect ज्ञ pattern', () => {
      const result = sutra1376('ज्ञायते', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasJnaRoot).toBe(true);
    });
    
    test('should detect जान pattern', () => {
      const result = sutra1376('जानते', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasJnaRoot).toBe(true);
    });
    
    test('should detect jāna pattern in IAST', () => {
      const result = sutra1376('jānate', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasJnaRoot).toBe(true);
    });
    
  });
  
  describe('Semantic Analysis', () => {
    
    test('should detect agent benefit from स्वार्थ', () => {
      const result = sutra1376('जानाते', {
        root: 'ज्ञा',
        hasPrefix: false,
        meaning: 'स्वार्थ में जानना'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
    test('should detect agent benefit from English keywords', () => {
      const result = sutra1376('jānāte', {
        root: 'jñā',
        hasPrefix: false,
        meaning: 'knows for oneself'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
    test('should detect self-knowledge meaning', () => {
      const result = sutra1376('जानते', {
        root: 'ज्ञा',
        hasPrefix: false,
        meaning: 'gains self-knowledge'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
  });
  
  describe('Context Validation', () => {
    
    test('should handle explicit hasPrefix false', () => {
      const result = sutra1376('जानाते', {
        root: 'ज्ञा',
        hasPrefix: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasNoPrefix).toBe(true);
    });
    
    test('should handle explicit upasarga context', () => {
      const result = sutra1376('प्रजानाति', {
        root: 'ज्ञा',
        upasarga: 'प्र',
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.hasNoPrefix).toBe(false);
    });
    
  });
  
  describe('Edge Cases', () => {
    
    test('should handle missing context gracefully', () => {
      const result = sutra1376('जानाते');
      
      expect(result.applies).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });
    
    test('should handle partial context', () => {
      const result = sutra1376('ज्ञायते', {
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasJnaRoot).toBe(true);
      expect(result.details.hasNoPrefix).toBe(true);
    });
    
  });
  
  describe('Input Validation', () => {
    
    test('should reject null input', () => {
      const result = sutra1376(null);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should reject empty string', () => {
      const result = sutra1376('');
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
  });
  
  describe('Function Aliases', () => {
    
    test('should work with alternate export name', () => {
      const result = checkJnaNoPrefixAtmanepada('जानाते', {
        root: 'ज्ञा',
        hasPrefix: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.sutra).toBe('1.3.76');
    });
    
  });
  
});
