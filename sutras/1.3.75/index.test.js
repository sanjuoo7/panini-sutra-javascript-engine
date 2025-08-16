/**
 * Test Suite for Sutra 1.3.75: समुदाङ्भ्यो यमोऽग्रन्थे (samudāṅgbhyo yamo'granthe)
 * Tests the implementation of यम् with prefixes in non-book contexts
 */

import { sutra1375, checkYamPrefixAtmanepada } from './index.js';

describe('Sutra 1.3.75: समुदाङ्भ्यो यमोऽग्रन्थे (यम् with prefixes)', () => {
  
  describe('Basic Functionality', () => {
    
    test('should apply for सम् + यम् in non-book context', () => {
      const result = sutra1375('संयच्छते', {
        root: 'यम्',
        upasarga: 'सम्',
        isBookContext: false,
        benefitsAgent: true,
        meaning: 'restrains for oneself'
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should apply for उद् + यम् in non-book context', () => {
      const result = sutra1375('उद्यच्छते', {
        root: 'यम्',
        upasarga: 'उद्',
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.details.detectedPrefix).toBe('उद्');
    });
    
    test('should apply for आङ् + यम् in non-book context', () => {
      const result = sutra1375('आयच्छते', {
        root: 'यम्',
        upasarga: 'आ',
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.details.detectedPrefix).toBe('आङ्');
    });
    
  });
  
  describe('Required Conditions', () => {
    
    test('should reject non-यम् roots', () => {
      const result = sutra1375('संगच्छति', {
        root: 'गम्',
        upasarga: 'सम्',
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('यम्');
    });
    
    test('should reject यम् without required prefixes', () => {
      const result = sutra1375('प्रयच्छति', {
        root: 'यम्',
        upasarga: 'प्र',
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('prefix');
    });
    
    test('should reject in book context', () => {
      const result = sutra1375('संयच्छति', {
        root: 'यम्',
        upasarga: 'सम्',
        isBookContext: true,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('book');
    });
    
    test('should reject without agent benefit', () => {
      const result = sutra1375('संयच्छति', {
        root: 'यम्',
        upasarga: 'सम्',
        isBookContext: false,
        benefitsAgent: false
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('agent');
    });
    
  });
  
  describe('IAST Script Support', () => {
    
    test('should handle IAST forms', () => {
      const result = sutra1375('saṃyacchate', {
        root: 'yam',
        upasarga: 'sam',
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.detectedScript).toBe('IAST');
    });
    
    test('should detect prefix patterns in IAST', () => {
      const result = sutra1375('udyacchate', {
        benefitsAgent: true,
        isBookContext: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasRequiredPrefix).toBe(true);
    });
    
  });
  
  describe('Pattern Recognition', () => {
    
    test('should detect सं prefix variant', () => {
      const result = sutra1375('संयमते', {
        benefitsAgent: true,
        isBookContext: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasRequiredPrefix).toBe(true);
    });
    
    test('should detect उत् prefix variant', () => {
      const result = sutra1375('उत्यमते', {
        benefitsAgent: true,
        isBookContext: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasRequiredPrefix).toBe(true);
    });
    
    test('should detect यच्छ root pattern', () => {
      const result = sutra1375('संयच्छते', {
        upasarga: 'सम्',
        benefitsAgent: true,
        isBookContext: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasYamRoot).toBe(true);
    });
    
  });
  
  describe('Book Context Detection', () => {
    
    test('should detect book context from meaning (ग्रन्थ)', () => {
      const result = sutra1375('संयच्छति', {
        root: 'यम्',
        upasarga: 'सम्',
        benefitsAgent: true,
        meaning: 'ग्रन्थ संकलन करना'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isNonBookContext).toBe(false);
    });
    
    test('should detect book context from English meaning', () => {
      const result = sutra1375('samyacchati', {
        root: 'yam',
        upasarga: 'sam',
        benefitsAgent: true,
        meaning: 'compiling a book'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isNonBookContext).toBe(false);
    });
    
    test('should allow non-book meanings', () => {
      const result = sutra1375('संयच्छते', {
        root: 'यम्',
        upasarga: 'सम्',
        benefitsAgent: true,
        meaning: 'controls desires'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.isNonBookContext).toBe(true);
    });
    
  });
  
  describe('Semantic Analysis', () => {
    
    test('should detect agent benefit from स्वार्थ', () => {
      const result = sutra1375('संयच्छते', {
        root: 'यम्',
        upasarga: 'सम्',
        isBookContext: false,
        meaning: 'स्वार्थ में संयम करना'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
    test('should detect agent benefit from English keywords', () => {
      const result = sutra1375('udyacchate', {
        root: 'yam',
        upasarga: 'ud',
        isBookContext: false,
        meaning: 'strives for oneself'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.benefitsAgent).toBe(true);
    });
    
  });
  
  describe('Edge Cases', () => {
    
    test('should handle missing context gracefully', () => {
      const result = sutra1375('संयच्छते');
      
      expect(result.applies).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });
    
    test('should handle partial context', () => {
      const result = sutra1375('उद्यमते', {
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasYamRoot).toBe(true);
      expect(result.details.hasRequiredPrefix).toBe(true);
    });
    
  });
  
  describe('Input Validation', () => {
    
    test('should reject null input', () => {
      const result = sutra1375(null);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should reject empty string', () => {
      const result = sutra1375('');
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
  });
  
  describe('Function Aliases', () => {
    
    test('should work with alternate export name', () => {
      const result = checkYamPrefixAtmanepada('संयच्छते', {
        root: 'यम्',
        upasarga: 'सम्',
        isBookContext: false,
        benefitsAgent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.sutra).toBe('1.3.75');
    });
    
  });
  
});
